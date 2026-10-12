import { readAccountHistory } from '@/lib/account-history';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { SITE_CONFIG } from '@/lib/config';
import { checkRateLimit, getClientIp, hashIp, verifyTurnstileToken } from '@/lib/security';

const json = (body:unknown,status=200) => NextResponse.json(body,{status,headers:{'Cache-Control':'private, no-store'}});
export async function GET() {
  try {
    const client=await createClient(); const {data,error}=await client.auth.getUser();
    if(error || !data.user) return json({authenticated:false},401);
    const [credits,events,recentHistory]=await Promise.all([
      client.rpc('my_credit_balance'),
      client.from('analysis_events').select('request_id,modality,status,created_at').eq('user_id',data.user.id).order('created_at',{ascending:false}).limit(20),
      readAccountHistory(data.user.id)
    ]);
    if(credits.error || events.error || !Number.isSafeInteger(credits.data)) return json({error:'Account data temporarily unavailable'},503);
    return json({authenticated:true,email:data.user.email,balance:credits.data,events:[...recentHistory,...(events.data||[])].filter((event,index,list)=>list.findIndex(item=>item.request_id===event.request_id)===index).sort((a,b)=>Date.parse(b.created_at)-Date.parse(a.created_at)).slice(0,20)});
  } catch {return json({error:'Account service temporarily unavailable'},503);}
}
export async function POST(req:NextRequest) {
  if(req.headers.get('origin') !== new URL(req.url).origin) return json({error:'Invalid origin'},403);
  if(Number(req.headers.get('content-length')||0)>8192) return json({error:'Request too large'},413);
  try {
    const body=await req.json(); const client=await createClient();
    if(body.action==='signout') {const {error}=await client.auth.signOut();if(error) return json({error:'Sign-out could not be confirmed. Try again.'},503);return json({ok:true});}
    if(!['signin','signup'].includes(body.action)) return json({error:'Invalid action'},400);
    if(body.action==='signup' && process.env.ACCOUNTS_SIGNUP_ENABLED!=='1') return json({error:'Public registration is not available yet.'},503);
    if(typeof body.email!=='string'||body.email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)||typeof body.password!=='string'||body.password.length>128||body.password.length<(body.action==='signup'?12:1)) return json({error:'Check email and password (12 characters minimum for signup).'},400);
    const ip=getClientIp(req.headers);
    if(!(await verifyTurnstileToken(typeof body.token==='string'?body.token:null,ip))) return json({error:'Security verification required'},403);
    if(!(await checkRateLimit(hashIp(ip),[{name:`auth_${body.action}`,windowSec:3600,max:body.action==='signup'?3:10}],true)).allowed) return json({error:'Too many attempts. Try again later.'},429);
    if(body.action==='signup') {
      const {error}=await client.auth.signUp({email:body.email.trim(),password:body.password,options:{emailRedirectTo:`${SITE_CONFIG.url}/auth/confirm`}});
      if(error) return json({error:'Registration could not be completed. Try later or sign in if you already have an account.'},400);
      return json({confirmation:true});
    }
    const {error}=await client.auth.signInWithPassword({email:body.email.trim(),password:body.password});
    if(error) return json({error:'Sign-in failed. Check your credentials and email confirmation.'},401);
    return json({ok:true});
  } catch {return json({error:'Account service temporarily unavailable'},503);}
}
