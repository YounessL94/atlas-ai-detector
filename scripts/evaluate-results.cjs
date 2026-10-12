const fs=require('node:fs');
function summarize(rows){
 const groups={};const ids=new Set();
 for(const row of rows){
  if(!row.id||ids.has(row.id))throw Error('Missing or duplicate sample id');ids.add(row.id);
  if(!['human','ai'].includes(row.origin)||!['image','text','video'].includes(row.modality)||!row.originEvidence)throw Error('Every sample requires known origin, modality and evidence');
  const group=groups[row.modality]??={samples:0,human:0,ai:0,falseAlarms:0,misses:0,indeterminate:0,errors:0,completed:0};group.samples++;group[row.origin]++;
  if(row.error){group.errors++;continue;}
  if(!['AI_LIKELY','INDETERMINATE','NO_SUFFICIENT_AI_SIGNAL'].includes(row.decision))throw Error('Invalid decision');group.completed++;
  if(row.decision==='INDETERMINATE')group.indeterminate++;
  if(row.origin==='human'&&row.decision==='AI_LIKELY')group.falseAlarms++;
  if(row.origin==='ai'&&row.decision==='NO_SUFFICIENT_AI_SIGNAL')group.misses++;
 }
 return {note:'Exploratory sample counts. No calibrated probability or commercial accuracy claim.',groups};
}
module.exports={summarize};
if(require.main===module){if(!process.argv[2])throw Error('Provide a JSON sample-results file');console.log(JSON.stringify(summarize(JSON.parse(fs.readFileSync(process.argv[2],'utf8'))),null,2));}
