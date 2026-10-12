const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), Module = require('node:module'), ts = require('typescript');
const root = path.resolve(__dirname, '..'), resolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, ...rest) { return resolve.call(this, request.startsWith('@/') ? path.join(root, request.slice(2)) : request, parent, ...rest); };
require.extensions['.ts'] = (m, f) => m._compile(ts.transpileModule(fs.readFileSync(f, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, f);
const { NextRequest } = require('next/server'), { POST } = require('../app/api/analyze/route.ts');
const request = text => { const form = new FormData(); form.set('modality', 'text'); form.set('locale', 'fr'); form.set('text', text); return new NextRequest('http://localhost/api/analyze', { method: 'POST', body: form }); };
test('Text beta rejects excessive word count before provider or security network calls', async () => {
  const original = global.fetch, oldKey = process.env.WINSTON_API_KEY; process.env.WINSTON_API_KEY = 'isolated-test'; let calls = 0;
  global.fetch = async () => { calls++; throw Error('Unexpected network'); };
  try { const response = await POST(request(Array(501).fill('texte').join(' '))); assert.equal(response.status, 400); assert.match((await response.json()).error, /500 mots/); assert.equal(calls, 0); }
  finally { global.fetch = original; if (oldKey === undefined) delete process.env.WINSTON_API_KEY; else process.env.WINSTON_API_KEY = oldKey; }
});
test('Text beta fails closed when its global quota cannot be read', async () => {
  const keys = ['WINSTON_API_KEY','UPSTASH_REDIS_REST_URL','UPSTASH_REDIS_REST_TOKEN','TURNSTILE_SECRET_KEY']; const old = keys.map(k=>process.env[k]), original=global.fetch;
  process.env.WINSTON_API_KEY='isolated-test'; process.env.UPSTASH_REDIS_REST_URL='https://isolated-test.invalid'; process.env.UPSTASH_REDIS_REST_TOKEN='test'; delete process.env.TURNSTILE_SECRET_KEY;
  let providerCalls=0; global.fetch=async url=>{ if(String(url).includes('gowinston')) providerCalls++; throw Error('simulated quota outage'); };
  try { assert.equal((await POST(request('Un texte de vérification sans données privées. '.repeat(12)))).status,429); assert.equal(providerCalls,0); }
  finally {global.fetch=original;keys.forEach((k,i)=>{if(old[i]===undefined)delete process.env[k];else process.env[k]=old[i];});}
});
