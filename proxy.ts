import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  let response = NextResponse.next({request});
  response.headers.set('Cache-Control','private, no-store');
  if (!url || !key) return response;
  const supabase = createServerClient(url,key,{cookies:{
    getAll: () => request.cookies.getAll(),
    setAll(values,headers) {
      values.forEach(({name,value}) => request.cookies.set(name,value));
      response = NextResponse.next({request});
      values.forEach(({name,value,options}) => response.cookies.set(name,value,options));
      Object.entries(headers).forEach(([name,value]) => response.headers.set(name,value));
      response.headers.set('Cache-Control','private, no-store');
    }
  }});
  // Refresh and validate signatures. Each protected handler must also authorize its own user.
  await supabase.auth.getClaims();
  return response;
}

export const config = { matcher: ['/account/:path*','/fr/compte/:path*','/auth/:path*','/api/account/:path*'] };
