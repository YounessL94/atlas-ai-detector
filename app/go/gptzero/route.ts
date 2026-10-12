import {NextResponse} from 'next/server';
import {incrementMetric} from '@/lib/security';
export async function GET(){
 if(process.env.AFFILIATE_GPTZERO_ENABLED!=='1')return new NextResponse('Partner link is not active',{status:404,headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex'}});
 await incrementMetric('partner_gptzero_redirects');
 return new NextResponse(null,{status:302,headers:{Location:'https://gptzero.me/?via=youness','Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Robots-Tag':'noindex'}});
}
