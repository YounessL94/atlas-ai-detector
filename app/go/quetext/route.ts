import {NextResponse} from 'next/server';
import {incrementMetric} from '@/lib/security';
export async function GET(){
 if(process.env.AFFILIATE_QUETEXT_ENABLED==='0')return new NextResponse('Partner link is not active',{status:404,headers:{'Cache-Control':'no-store','X-Robots-Tag':'noindex'}});
 await incrementMetric('partner_quetext_redirects');
 return new NextResponse(null,{status:302,headers:{Location:'https://www.quetext.com/pricing?fpr=youness-c37082','Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Robots-Tag':'noindex'}});
}
