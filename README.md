# Atlas AI Detector

Atlas AI Detector: image analysis, limited video beta and local C2PA checks, EN + FR. Text detection uses Winston AI when configured, and is otherwise disabled. The text beta accepts up to 500 words per analysis.
Production: https://atlasaidetector.com

Stack: Next.js 16 (App Router, static pages) · Hive V3 media detection (optional V2 Enterprise image/text keys) · Cloudflare Turnstile · Upstash Redis (REST) · `@contentauth/c2pa-web` (client-side) · Vercel.

## Structure

- `app/(en)`, `app/(fr)/fr` — two root layouts (correct `<html lang>`), all pages statically generated from `lib/content.ts`
- `app/api/analyze` — validation → Turnstile → rate limits (per-IP minute/day, global day) → Hive
- `app/api/lead` — waitlists (`waitlist:{pro|api|video|deepfake}` Redis sets)
- `lib/analysis.ts` — Hive calls, response parsing, verdict normalization (AI_LIKELY / INDETERMINATE / NO_SUFFICIENT_AI_SIGNAL)
- `lib/c2pa-client.ts` — browser-side C2PA reading (Wasm from jsDelivr, version pinned to package.json)

## Environment

See `.env.example`. In production the API **fails closed** (HTTP 503) if Hive key, Turnstile secret, Upstash or `RATE_LIMIT_SALT` are missing — no fabricated results.
`NEXT_PUBLIC_*` values are inlined at build time: redeploy after changing them.

Hive: `HIVE_API_KEY` is a self-serve V3 key (thehive.ai → Service API Keys) and powers image and video detection (default quota ~100 req/day → `DAILY_GLOBAL_LIMIT=90`). AI **text** detection is only offered as a V2 Enterprise project → `HIVE_TEXT_API_KEY`; Without it, `WINSTON_API_KEY` (Winston AI, self-serve, EN/FR, 1 credit per word, prepaid) powers the text detector; with neither, the text detector shows an honest "not available yet" notice. Text has its own daily cap (`DAILY_TEXT_GLOBAL_LIMIT`, default 4, fails closed if quota storage fails).

## Local

```bash
npm install
HIVE_MOCK=1 npm run dev   # labelled fake results, dev only; Turnstile/Redis bypassed when unset
npm test
npm run typecheck && npm run build
```

Waitlist export: `SMEMBERS waitlist:pro` in the Upstash console. Usage metrics: `metrics:YYYY-MM-DD:*` keys (image_scans, text_scans, err_*, lead_*).

Video beta: non-fragmented MP4, max 4 MB, 5 seconds and 60 encoded frames. Server validates duration/sample tables before Hive. The fixed global video budget allows two attempts per day and fails closed on Redis errors. Reports show the maximum returned frame score and timestamped details; audio is not evaluated.

Free beta quotas per network IP: image 5/day, text 2/day, video 1/day. Shared daily capacity still applies. Winston additionally reserves words atomically against a cumulative 2,000-word trial ceiling; configure TEXT_TOTAL_WORD_BUDGET only after funding more credits. See docs/MONETIZATION-PLAN.md for remaining launch work.
