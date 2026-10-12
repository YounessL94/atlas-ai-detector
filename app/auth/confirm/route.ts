import { NextRequest,NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
export async function GET(req:NextRequest) {
  const code=req.nextUrl.searchParams.get('code'); let valid=false;
  if(code) {try {const client=await createClient();const {error}=await client.auth.exchangeCodeForSession(code);valid=!error;}catch {}}
  const target=new URL(req.nextUrl.searchParams.get('locale')==='fr'?'/fr/compte':'/account',req.url); if(!valid)target.searchParams.set('confirmation','failed');
  const response=NextResponse.redirect(target);response.headers.set('Cache-Control','private, no-store');return response;
}
