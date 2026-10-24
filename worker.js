// NullDen relay: accounts, Nullbux economy, player profiles and owner admin tools, on Cloudflare Workers (the free plan is enough).
// Note: the free KV plan allows 1,000 writes a day, so play rewards are paid every 5 minutes to keep writes low.
// Setup: 1) Create a KV namespace and bind it to this Worker with the variable name DB.
//        2) Add two secrets: SECRET (any long random string; it signs login sessions) and OWNER_KEY (a private passphrase only you know).
//        3) The owner username is "zearyd" (change it with a variable named OWNER). That username is reserved: nobody can register it
//           without OWNER_KEY. Register it yourself from the site's Account page and type your owner key when asked.
//        4) Optional variable ALLOW = your site origin, e.g. https://YOUR-USERNAME.github.io
//        5) Deploy, then paste the Worker URL (no trailing slash) into API near the top of the accounts section in app.js.
const ITEMS=[['pup','Pixel Pup','🐶',60,'common'],['cap','Gamer Cap','🧢',90,'common'],['pot','Speed Potion','🧪',110,'common'],['gem','Gem','💎',250,'rare'],['ctl','Gold Controller','🕹️',400,'rare'],['orb','Crystal Orb','🔮',650,'epic'],['crn','Crown','👑',900,'epic'],['drg','Baby Dragon','🐉',1500,'legendary']];
const CRATE=300,day=()=>Math.floor(Date.now()/864e5);
const drift=id=>{let h=0;for(const c of id+day())h=(h*31+c.charCodeAt(0))%1000;return .85+.3*h/1000};
const price=i=>Math.max(1,Math.round(i[3]*drift(i[0])));
const enc=new TextEncoder(),hex=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join(''),unhex=s=>Uint8Array.from(s.match(/../g)||[],h=>parseInt(h,16));
const pbk=async(p,salt)=>hex(await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:100000,hash:'SHA-256'},await crypto.subtle.importKey('raw',enc.encode(p),'PBKDF2',false,['deriveBits']),256));
const hk=(env,use)=>crypto.subtle.importKey('raw',enc.encode(env.SECRET),{name:'HMAC',hash:'SHA-256'},false,[use]);
const mkTok=async(u,env,long)=>{const p=btoa(JSON.stringify({u,e:Date.now()+(long?30*864e5:12*36e5)}));return p+'.'+hex(await crypto.subtle.sign('HMAC',await hk(env,'sign'),enc.encode(p)))};
const who=async(req,env)=>{try{const[p,s]=(req.headers.get('authorization')||'').replace('Bearer ','').split('.');if(!await crypto.subtle.verify('HMAC',await hk(env,'verify'),unhex(s),enc.encode(p)))return null;const o=JSON.parse(atob(p));return o.e>Date.now()?o.u:null}catch(e){return null}};
const load=async(env,u)=>JSON.parse(await env.DB.get('u:'+u)||'null'),save=(env,r)=>env.DB.put('u:'+r.u,JSON.stringify(r));
const me=r=>({u:r.u,role:r.role||'',nb:r.nb,inv:r.inv,streak:r.streak,canDaily:r.ld!==day(),pub:r.pub!==false,gv:r.gv||0});
const clean=(s,n)=>String(s||'').replace(/[\u0000-\u001f<>]/g,'').trim().slice(0,n);
const nm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9_]/g,'').slice(0,16);
export default{async fetch(req,env){
const cors={'access-control-allow-origin':env.ALLOW||'*','access-control-allow-headers':'content-type,authorization','access-control-allow-methods':'GET,POST,OPTIONS'};
const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{...cors,'content-type':'application/json'}}),E=(m,s=400)=>J({error:m},s);
if(req.method==='OPTIONS')return new Response(null,{headers:cors});
const url=new URL(req.url),path=url.pathname.replace(/\/+$/,''),OWN=(env.OWNER||'zearyd').toLowerCase();
const get=async k=>JSON.parse(await env.DB.get(k)||'null'),live=async()=>{const g=await get('giveaway');return g&&g.ends>Date.now()?g:null};
try{
let b={};if(req.method==='POST'){try{b=await req.json()}catch(e){return E('Bad request')}}
if(path==='/shop')return J({items:[...ITEMS.map(i=>({id:i[0],n:i[1],e:i[2],r:i[4],p:price(i),s:Math.floor(price(i)/2)})),{id:'crate',n:'Mystery Crate',e:'📦',r:'crate',p:CRATE,s:0}]});
if(path==='/status'){const a=await get('announce');return J({a:a&&{id:a.id,text:a.text},g:await live()})}
if(path==='/signup'||path==='/login'){
 const u=String(b.u||'').toLowerCase().trim(),p=String(b.p||'');
 if(!/^[a-z0-9_]{3,16}$/.test(u))return E('Username: 3-16 letters, numbers or _');
 if(p.length<6||p.length>100)return E('Password must be 6-100 characters');
 let r=await load(env,u);
 if(path==='/signup'){
  if(r)return E('That username is taken',409);
  let role='';
  if(u===OWN){if(!env.OWNER_KEY||String(b.key||'')!==env.OWNER_KEY)return J({error:'This username is reserved for the owner. Enter the owner key.',needKey:true},403);role='owner'}
  const salt=crypto.getRandomValues(new Uint8Array(16));
  r={u,salt:hex(salt),h:await pbk(p,salt),nb:100,inv:{},ld:-1,streak:0,le:0,ed:0,ea:0,fails:0,lock:0,c:Date.now(),role,pub:true};await save(env,r)}
 else{if(!r)return E('Wrong username or password',401);if(r.banned)return E('This account is banned.',403);if(r.lock>Date.now())return E('Too many tries. Wait a minute.',429);
  if(await pbk(p,unhex(r.salt))!==r.h){r.fails++;if(r.fails>=5){r.lock=Date.now()+6e4;r.fails=0}await save(env,r);return E('Wrong username or password',401)}
  if(r.fails){r.fails=0;await save(env,r)}}
 return J({token:await mkTok(u,env,!!b.remember),me:me(r)})}
const u=await who(req,env);if(!u)return E('Please log in',401);
const r=await load(env,u);if(!r)return E('Account not found',404);if(r.banned)return E('This account is banned.',403);
const isO=r.role==='owner';
if(path==='/me')return J(me(r));
if(path==='/privacy'){r.pub=!!b.pub;await save(env,r);return J({me:me(r)})}
if(path==='/played'){const id=clean(b.id,100),name=clean(b.name,60);if(!id||!name)return E('Bad request');const l=JSON.parse(await env.DB.get('r:'+u)||'[]');await env.DB.put('r:'+u,JSON.stringify([{id,name,t:Date.now()},...l.filter(x=>x.id!==id)].slice(0,10)));return J({ok:1})}
if(path==='/search'){const q=nm(url.searchParams.get('q')),l=await env.DB.list({prefix:'u:'+q,limit:15}),out=[];
 for(const k of l.keys){const x=await load(env,k.name.slice(2));if(!x||(x.banned&&!isO))continue;out.push({u:x.u,role:x.role||'',pub:x.pub!==false,banned:isO?!!x.banned:undefined})}return J({users:out})}
if(path==='/profile'){const t=nm(url.searchParams.get('u')),x=await load(env,t);if(!x||(x.banned&&!isO))return E('No such player',404);
 const base={u:x.u,role:x.role||'',pub:x.pub!==false};if(!(isO||base.pub||t===u))return J({...base,private:true});
 return J({...base,nb:x.nb,inv:x.inv,rec:JSON.parse(await env.DB.get('r:'+t)||'[]'),joined:x.c||0,...(isO?{banned:!!x.banned}:{})})}
if(path==='/giveaway/claim'){const g=await live();if(!g)return E('No giveaway is running right now');if(r.gv===g.id)return E('You already claimed this one');
 r.gv=g.id;r.nb+=g.amount;g.claims=(g.claims||0)+1;await save(env,r);await env.DB.put('giveaway',JSON.stringify(g));return J({me:me(r),gain:g.amount})}
if(path.startsWith('/admin/')){if(!isO)return E('Owner only',403);
 if(path==='/admin/announce'){const t=clean(b.text,300);if(!t){await env.DB.delete('announce');return J({ok:1})}await env.DB.put('announce',JSON.stringify({id:Date.now(),text:t}));return J({ok:1})}
 if(path==='/admin/giveaway'){if(b.end){await env.DB.delete('giveaway');return J({ok:1})}
  const amount=Math.floor(+b.amount),mins=Math.floor(+b.minutes),title=clean(b.title,60)||'Giveaway';
  if(!(amount>=1&&amount<=1e6)||!(mins>=1&&mins<=10080))return E('Amount must be 1 to 1,000,000 and minutes 1 to 10,080');
  const g={id:Date.now().toString(36),title,amount,ends:Date.now()+mins*6e4,claims:0};await env.DB.put('giveaway',JSON.stringify(g));return J({g})}
 const t=nm(b.u),x=await load(env,t);if(!x)return E('No such account',404);
 if(path==='/admin/nb'){const n=Math.floor(+b.amount);if(!Number.isFinite(n))return E('Enter a number');x.nb=Math.max(0,Math.min(1e9,b.op==='add'?x.nb+n:n));await save(env,x);return J({nb:x.nb})}
 if(x.role==='owner')return E('That can’t be done to the owner account');
 if(path==='/admin/ban'){x.banned=!!b.ban;await save(env,x);return J({banned:x.banned})}
 if(path==='/admin/delete'){await env.DB.delete('u:'+t);await env.DB.delete('r:'+t);return J({ok:1})}
 return E('Not found',404)}
if(path==='/daily'){const d=day();if(r.ld===d)return E('Already claimed today');r.streak=r.ld===d-1?Math.min(r.streak+1,7):1;r.ld=d;const g=50+10*r.streak;r.nb+=g;await save(env,r);return J({me:me(r),gain:g})}
if(path==='/earn'){const d=day(),n=Date.now();if(r.ed!==d){r.ed=d;r.ea=0}if(n-r.le<295000||r.ea>=300)return J({me:me(r),gain:0});r.le=n;r.ea+=10;r.nb+=10;await save(env,r);return J({me:me(r),gain:10})}
if(path==='/buy'||path==='/sell'){const id=String(b.id||'');
 if(path==='/buy'){
  if(id==='crate'){if(r.nb<CRATE)return E('Not enough Nullbux');const x=Math.random(),rar=x<.6?'common':x<.88?'rare':x<.97?'epic':'legendary',pool=ITEMS.filter(i=>i[4]===rar),it=pool[Math.floor(Math.random()*pool.length)];r.nb-=CRATE;r.inv[it[0]]=(r.inv[it[0]]||0)+1;await save(env,r);return J({me:me(r),msg:'You got '+it[2]+' '+it[1]+'!'})}
  const it=ITEMS.find(i=>i[0]===id);if(!it)return E('Unknown item');const p=price(it);if(r.nb<p)return E('Not enough Nullbux');r.nb-=p;r.inv[id]=(r.inv[id]||0)+1;await save(env,r);return J({me:me(r),msg:'Bought '+it[2]+' '+it[1]})}
 const it=ITEMS.find(i=>i[0]===id);if(!it||!(r.inv[id]>0))return E('You don’t have that');const s=Math.floor(price(it)/2);r.inv[id]--;if(!r.inv[id])delete r.inv[id];r.nb+=s;await save(env,r);return J({me:me(r),msg:'Sold '+it[2]+' for '+s+' Nullbux'})}
return E('Not found',404)}catch(e){return E('Server error',500)}}}
