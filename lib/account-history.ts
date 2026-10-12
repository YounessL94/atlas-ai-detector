import { createClient } from './supabase/server';
import { redisPipeline } from './security';
import type { AnalysisResult } from './analysis';
export type HistoryEvent = {request_id:string;modality:string;status:string;created_at:string};
const key=(userId:string)=>'account:history:v1:'+userId;
// Only called after the server receives a completed provider result.
export async function recordCompletedAnalysis(result:AnalysisResult) {
  try {
    const client=await createClient();
    const {data,error}=await client.auth.getUser();
    if(error||!data.user)return;
    const event:HistoryEvent={request_id:result.requestId,modality:result.modality,status:'completed',created_at:new Date().toISOString()};
    const storageKey=key(data.user.id);
    const response=await redisPipeline([['ZADD',storageKey,Date.now(),JSON.stringify(event)],['ZREMRANGEBYRANK',storageKey,0,-21],['EXPIRE',storageKey,90*86400]]);
    if(!response||response.some(command=>command.error))throw new Error('History unavailable');
  } catch { console.error('Account history could not be recorded'); }
}
export async function readAccountHistory(userId:string):Promise<HistoryEvent[]> {
  const response=await redisPipeline([['ZREVRANGE',key(userId),0,19]]);
  if(!response||response[0]?.error||!Array.isArray(response[0]?.result))throw new Error('History unavailable');
  const cutoff=Date.now()-90*86400000;
  return response[0].result.map(value=>JSON.parse(String(value)) as HistoryEvent).filter(event=>Date.parse(event.created_at)>=cutoff);
}
