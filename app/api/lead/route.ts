import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, hashIp, checkRateLimit, redisPipeline, incrementMetric, ConfigError } from '@/lib/security';

export const runtime = 'nodejs';

const TYPES = new Set(['pro', 'api', 'video', 'deepfake', 'kit', 'training']);
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(req: NextRequest) {
  try {
    if (Number(req.headers.get('content-length') || 0) > 4096) return json({ error: 'Request too large' }, 413);
    let body: any;
    try {
      body = await req.json();
    } catch {
      return json({ error: 'Invalid request' }, 400);
    }

    // Honeypot: bots fill hidden fields; pretend success.
    if (body?.company) return json({ success: true });

    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const type = typeof body?.type === 'string' && TYPES.has(body.type) ? body.type : null;
    const locale = body?.locale === 'fr' ? 'fr' : 'en';
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) return json({ error: 'Invalid email' }, 400);
    if (!type) return json({ error: 'Invalid waitlist' }, 400);

    const limit = await checkRateLimit(hashIp(getClientIp(req.headers)), [{ name: 'lead_hour', windowSec: 3600, max: 5 }], true);
    if (!limit.allowed) return json({ error: 'Too many requests' }, 429);

    const stored = await redisPipeline([
      ['SADD', `waitlist:${type}`, email],
      ['HSETNX', `waitlist:${type}:meta`, email, JSON.stringify({ locale, ts: new Date().toISOString() })]
    ]);

    if (!stored || stored.length !== 2 || stored.some(command => command.error || (command.result !== 0 && command.result !== 1))) throw new Error('Waitlist storage failed');
    await incrementMetric(`lead_${type}`);
    return json({ success: true });
  } catch (err) {
    console.error(err instanceof ConfigError ? 'Config error:' : 'Lead error:', (err as Error)?.message);
    return json({ error: 'Failed to record waitlist entry' }, 503);
  }
}
