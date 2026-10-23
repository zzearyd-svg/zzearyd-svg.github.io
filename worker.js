// Cloudflare Worker relay for the NullDen AI tab. Keeps your Groq key out of the public site.
// Setup: create a Worker, paste this file, add a secret named GROQ_KEY (your Groq key), optionally a variable
// ALLOW set to your site origin (e.g. https://YOUR-USERNAME.github.io), deploy, then paste the Worker URL into AI_PROXY in app.js.
const SYS="You are the NullDen Assistant, a friendly AI built into the NullDen games site. Help with anything: homework questions, writing, coding, game tips and recommendations, ideas, or just chatting. Be clear, honest and concise, and say so when you are unsure. Politely decline anything dangerous, hateful, sexual or illegal. Never ask for personal information.";
export default{async fetch(req,env){
const cors={'access-control-allow-origin':env.ALLOW||'*','access-control-allow-headers':'content-type','access-control-allow-methods':'POST,OPTIONS'};
if(req.method==='OPTIONS')return new Response(null,{headers:cors});
if(req.method!=='POST')return new Response('NullDen relay',{headers:cors});
let b;try{b=await req.json()}catch(e){return new Response('{"error":{"message":"Bad request"}}',{status:400,headers:cors})}
const msgs=(Array.isArray(b.messages)?b.messages:[]).slice(-20).map(m=>({role:m.role==='assistant'?'assistant':'user',content:String(m.content||'').slice(0,4000)}));
const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'content-type':'application/json',authorization:'Bearer '+env.GROQ_KEY},
body:JSON.stringify({model:'openai/gpt-oss-120b',messages:[{role:'system',content:SYS},...msgs],max_tokens:1500,reasoning_effort:'low'})});
return new Response(r.body,{status:r.status,headers:{...cors,'content-type':'application/json'}})}}
