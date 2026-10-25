// NullDen relay: accounts, Nullbux economy, player profiles, staff appeals and owner admin tools, on Cloudflare Workers.
// Setup: 1) Create a KV namespace and bind it to this Worker with the variable name DB.
//        2) Add two secrets: SECRET (any long random string; it signs login sessions) and OWNER_KEY (a private passphrase only you know).
//        3) The owner username is "zearyd" (change it with a variable named OWNER). That username is reserved: nobody can register it
//           without OWNER_KEY. Register it yourself from the site's Account page and type your owner key when asked.
//        4) Optional variable ALLOW = your site origin, e.g. https://YOUR-USERNAME.github.io
//        5) Deploy, then paste the Worker URL (no trailing slash) into API near the top of the accounts section in app.js.
// Note: the free KV plan allows 1,000 writes a day, so play rewards are paid every 5 minutes to keep writes low.
// Roles (low to high): moderator (appeals, ban/unban, delete forum posts), manager (+ announcements, giveaways, stats, News posts),
//        admin (+ Nullbux, items, passwords, appoint moderators/managers), owner (+ appoint admins, delete accounts). Old "staff" accounts count as moderators.
//        Forums use KV too: each post is one write and expires after 7 days. The feed route (/feed) proxies GameMonetize and caches it for an hour.
const ITEMS=[['pup','Pixel Pup','paw',60,'common'],['cap','Gamer Cap','cap',90,'common'],['pot','Speed Potion','flask',110,'common'],['gem','Gem','gem',250,'rare'],['ctl','Gold Controller','gamepad',400,'rare'],['orb','Crystal Orb','orb',650,'epic'],['crn','Crown','crown',900,'epic'],['drg','Baby Dragon','flame',1500,'legendary']];
const RANK={owner:4,admin:3,manager:2,moderator:1,staff:1},rk=x=>RANK[x&&x.role]||0,ROLES=['moderator','manager','admin'],CH={general:0,games:0,help:0,news:2};
const CRATE=300,day=()=>Math.floor(Date.now()/864e5);
const drift=id=>{let h=0;for(const c of id+day())h=(h*31+c.charCodeAt(0))%1000;return .85+.3*h/1000};
const price=i=>Math.max(1,Math.round(i[3]*drift(i[0])));
const enc=new TextEncoder(),hex=b=>[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join(''),unhex=s=>Uint8Array.from(s.match(/../g)||[],h=>parseInt(h,16));
const pbk=async(p,salt)=>hex(await crypto.subtle.deriveBits({name:'PBKDF2',salt,iterations:100000,hash:'SHA-256'},await crypto.subtle.importKey('raw',enc.encode(p),'PBKDF2',false,['deriveBits']),256));
const hk=(env,use)=>crypto.subtle.importKey('raw',enc.encode(env.SECRET),{name:'HMAC',hash:'SHA-256'},false,[use]);
const mkTok=async(u,env,long)=>{const p=btoa(JSON.stringify({u,e:Date.now()+(long?30*864e5:12*36e5)}));return p+'.'+hex(await crypto.subtle.sign('HMAC',await hk(env,'sign'),enc.encode(p)))};
const who=async(req,env)=>{try{const[p,s]=(req.headers.get('authorization')||'').replace('Bearer ','').split('.');if(!await crypto.subtle.verify('HMAC',await hk(env,'verify'),unhex(s),enc.encode(p)))return null;const o=JSON.parse(atob(p));return o.e>Date.now()?o.u:null}catch(e){return null}};
const load=async(env,u)=>JSON.parse(await env.DB.get('u:'+u)||'null'),save=(env,r)=>env.DB.put('u:'+r.u,JSON.stringify(r));
const me=r=>({u:r.u,role:r.role||'',nb:r.nb,inv:r.inv,streak:r.streak,canDaily:r.ld!==day(),pub:r.pub!==false,gv:r.gv||0,rk:rk(r)});
const clean=(s,n)=>String(s||'').replace(/[\u0000-\u001f<>]/g,'').trim().slice(0,n);
const nm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9_]/g,'').slice(0,16);
// password check with lockout (5 wrong tries = 1 minute lock); used by login and appeals
const chk=async(env,x,p)=>{if(x.lock>Date.now())return['Too many tries. Wait a minute.',429];if(await pbk(p,unhex(x.salt))!==x.h){x.fails=(x.fails||0)+1;if(x.fails>=5){x.lock=Date.now()+6e4;x.fails=0}await save(env,x);return['Wrong username or password',401]}if(x.fails){x.fails=0;await save(env,x)}return null};
export default{async fetch(req,env){
const cors={'access-control-allow-origin':env.ALLOW||'*','access-control-allow-headers':'content-type,authorization','access-control-allow-methods':'GET,POST,OPTIONS'};
const J=(o,s=200)=>new Response(JSON.stringify(o),{status:s,headers:{...cors,'content-type':'application/json'}}),E=(m,s=400)=>J({error:m},s);
if(req.method==='OPTIONS')return new Response(null,{headers:cors});
const url=new URL(req.url),path=url.pathname.replace(/\/+$/,''),OWN=(env.OWNER||'zearyd').toLowerCase();
const get=async k=>JSON.parse(await env.DB.get(k)||'null'),live=async()=>{const g=await get('giveaway');return g&&g.ends>Date.now()?g:null};
if(path==='/feed'){const pn=Math.min(20,Math.max(1,+url.searchParams.get('page')||1));try{const f=await fetch('https://gamemonetize.com/feed.php?format=0&num=50&page='+pn,{cf:{cacheTtl:3600,cacheEverything:true}});return new Response(await f.text(),{status:f.ok?200:502,headers:{...cors,'content-type':'application/json','cache-control':'public,max-age=3600'}})}catch(e){return E('Feed unavailable',502)}}
if(path!=='/shop'&&!env.DB)return E('Setup problem: the KV binding named DB is missing. Add it in the Worker’s Bindings tab, then deploy.',500);
if(path!=='/shop'&&!env.SECRET)return E('Setup problem: the secret named SECRET is missing. Add it under Variables and Secrets, then deploy.',500);
try{
let b={};if(req.method==='POST'){try{b=await req.json()}catch(e){return E('Bad request')}}
if(path==='/shop')return J({items:[...ITEMS.map(i=>({id:i[0],n:i[1],ic:i[2],r:i[4],p:price(i),s:Math.floor(price(i)/2)})),{id:'crate',n:'Mystery Crate',ic:'box',r:'crate',p:CRATE,s:0}]});
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
 else{if(!r)return E('Wrong username or password',401);const bad=await chk(env,r,p);if(bad)return E(bad[0],bad[1]);
  if(r.banned)return J({error:'This account is banned'+(r.banReason?': '+r.banReason:'')+'. You can appeal below.',banned:true},403)}
 return J({token:await mkTok(u,env,!!b.remember),me:me(r)})}
if(path==='/appeal'){
 const u=String(b.u||'').toLowerCase().trim(),msg=clean(b.msg,500);if(!msg)return E('Write a short message first');
 const x=await load(env,u);if(!x)return E('Wrong username or password',401);
 const bad=await chk(env,x,String(b.p||''));if(bad)return E(bad[0],bad[1]);
 if(!x.banned)return E('This account isn’t banned');
 const a=await get('a:'+u);if(a&&a.status==='pending')return E('You already have an appeal waiting for review');if(a&&Date.now()-a.t<864e5)return E('You can send another appeal tomorrow');
 await env.DB.put('a:'+u,JSON.stringify({u,msg,t:Date.now(),status:'pending',reason:x.banReason||''}));return J({ok:1})}
const u=await who(req,env);if(!u)return E('Please log in',401);
const r=await load(env,u);if(!r)return E('Account not found',404);if(r.banned)return E('This account is banned.',403);
const R=rk(r),isO=R>=4,isS=R>=1;
if(path==='/me')return J(me(r));
if(path==='/privacy'){r.pub=!!b.pub;await save(env,r);return J({me:me(r)})}
if(path==='/played'){const id=clean(b.id,100),name=clean(b.name,60);if(!id||!name)return E('Bad request');const l=JSON.parse(await env.DB.get('r:'+u)||'[]');await env.DB.put('r:'+u,JSON.stringify([{id,name,t:Date.now()},...l.filter(x=>x.id!==id)].slice(0,10)));return J({ok:1})}
if(path==='/search'){const q=nm(url.searchParams.get('q')),l=await env.DB.list({prefix:'u:'+q,limit:15}),out=[];
 for(const k of l.keys){const x=await load(env,k.name.slice(2));if(!x||(x.banned&&!isS))continue;out.push({u:x.u,role:x.role||'',pub:x.pub!==false,banned:isS?!!x.banned:undefined})}return J({users:out})}
if(path==='/profile'){const t=nm(url.searchParams.get('u')),x=await load(env,t);if(!x||(x.banned&&!isS))return E('No such player',404);
 const base={u:x.u,role:x.role||'',pub:x.pub!==false};if(!(isS||base.pub||t===u))return J({...base,private:true});
 return J({...base,nb:x.nb,inv:x.inv,rec:JSON.parse(await env.DB.get('r:'+t)||'[]'),joined:x.c||0,...(isS?{banned:!!x.banned,banReason:x.banReason||''}:{})})}
if(path==='/forum'){const c=String(url.searchParams.get('c')||'general');if(!(c in CH))return E('No such channel',404);
 const l=await env.DB.list({prefix:'f:'+c+':',limit:60});return J({msgs:l.keys.map(k=>({k:k.name,...k.metadata})).reverse(),canPost:R>=CH[c]})}
if(path==='/forum/post'){const c=String(b.c||''),m=clean(b.m,240);if(!(c in CH))return E('No such channel',404);if(R<CH[c])return E('Only managers and above can post here',403);if(!m)return E('Write a message first');
 const l=await env.DB.list({prefix:'f:'+c+':',limit:8});if(l.keys.some(k=>k.metadata&&k.metadata.u===u&&Date.now()-k.metadata.t<3000))return E('Slow down a little');
 const md={u,r:r.role||'',t:Date.now(),m};if(enc.encode(JSON.stringify(md)).length>1000)return E('That message is too long');
 await env.DB.put('f:'+c+':'+String(9e15-Date.now()).padStart(16,'0')+Math.random().toString(36).slice(2,5),'1',{metadata:md,expirationTtl:604800});return J({ok:1})}
if(path==='/forum/delete'){if(R<1)return E('Staff only',403);const k=String(b.k||'');if(!/^f:[a-z]+:/.test(k))return E('Bad request');await env.DB.delete(k);return J({ok:1})}
if(path==='/giveaway/claim'){const g=await live();if(!g)return E('No giveaway is running right now');if(r.gv===g.id)return E('You already claimed this one');
 r.gv=g.id;r.nb+=g.amount;g.claims=(g.claims||0)+1;await save(env,r);await env.DB.put('giveaway',JSON.stringify(g));return J({me:me(r),gain:g.amount})}
if(path.startsWith('/staff/')){if(!isS)return E('Staff only',403);
 if(path==='/staff/appeals'){const l=await env.DB.list({prefix:'a:',limit:50}),out=[];for(const k of l.keys){const a=await get(k.name);if(a)out.push(a)}
  out.sort((x,y)=>(x.status==='pending'?0:1)-(y.status==='pending'?0:1)||y.t-x.t);return J({appeals:out})}
 const t=nm(b.u),x=await load(env,t);if(!x)return E('No such account',404);
 if(path==='/staff/appeal'){const a=await get('a:'+t);if(!a)return E('Appeal not found',404);
  if(b.action==='approve'){x.banned=false;delete x.banReason;await save(env,x);await env.DB.delete('a:'+t);return J({ok:1})}
  if(b.action==='deny'){a.status='denied';a.note=clean(b.note,200);a.by=u;await env.DB.put('a:'+t,JSON.stringify(a));return J({ok:1})}
  return E('Bad action')}
 if(path==='/staff/ban'){if(rk(x)>=R)return E('You can’t do that to this account');
  x.banned=!!b.ban;if(x.banned)x.banReason=clean(b.reason,120);else{delete x.banReason;await env.DB.delete('a:'+t)}await save(env,x);return J({banned:x.banned})}
 return E('Not found',404)}
if(path.startsWith('/admin/')){const need=({announce:2,giveaway:2,stats:2,nb:3,item:3,pass:3,role:3,delete:4})[path.slice(7)]||4;if(R<need)return E('Your role can’t do that',403);
 if(path==='/admin/announce'){const t=clean(b.text,300);if(!t){await env.DB.delete('announce');return J({ok:1})}await env.DB.put('announce',JSON.stringify({id:Date.now(),text:t}));return J({ok:1})}
 if(path==='/admin/giveaway'){if(b.end){await env.DB.delete('giveaway');return J({ok:1})}
  const amount=Math.floor(+b.amount),mins=Math.floor(+b.minutes),title=clean(b.title,60)||'Giveaway';
  if(!(amount>=1&&amount<=1e6)||!(mins>=1&&mins<=10080))return E('Amount must be 1 to 1,000,000 and minutes 1 to 10,080');
  const g={id:Date.now().toString(36),title,amount,ends:Date.now()+mins*6e4,claims:0};await env.DB.put('giveaway',JSON.stringify(g));return J({g})}
 if(path==='/admin/stats'){const l=await env.DB.list({prefix:'u:',limit:1000}),al=await env.DB.list({prefix:'a:',limit:50});let p=0;for(const k of al.keys){const a=await get(k.name);if(a&&a.status==='pending')p++}return J({users:l.keys.length,more:l.list_complete===false,pending:p})}
 const t=nm(b.u),x=await load(env,t);if(!x)return E('No such account',404);
 if(x.u!==u?rk(x)>=R:!isO)return E('You can’t do that to this account',403);
 if(path==='/admin/nb'){const n=Math.floor(+b.amount);if(!Number.isFinite(n))return E('Enter a number');x.nb=Math.max(0,Math.min(1e9,b.op==='add'?x.nb+n:n));await save(env,x);return J({nb:x.nb})}
 if(path==='/admin/item'){const id=String(b.id||''),q=Math.floor(+b.qty);if(!ITEMS.some(i=>i[0]===id)||!Number.isFinite(q)||!q)return E('Pick an item and a quantity');
  x.inv[id]=Math.max(0,(x.inv[id]||0)+Math.max(-99,Math.min(99,q)));if(!x.inv[id])delete x.inv[id];await save(env,x);return J({ok:1})}
 if(path==='/admin/pass'){const p=String(b.p||'');if(p.length<6||p.length>100)return E('Password must be 6-100 characters');const salt=crypto.getRandomValues(new Uint8Array(16));x.salt=hex(salt);x.h=await pbk(p,salt);x.fails=0;x.lock=0;await save(env,x);return J({ok:1})}
 if(x.role==='owner')return E('That can’t be done to the owner account');
 if(path==='/admin/role'){const nr=ROLES.includes(b.role)?b.role:'';if(rk({role:nr})>=R)return E('You can’t give a role that high',403);x.role=nr;await save(env,x);return J({role:x.role})}
 if(path==='/admin/delete'){await env.DB.delete('u:'+t);await env.DB.delete('r:'+t);await env.DB.delete('a:'+t);return J({ok:1})}
 return E('Not found',404)}
if(path==='/daily'){const d=day();if(r.ld===d)return E('Already claimed today');r.streak=r.ld===d-1?Math.min(r.streak+1,7):1;r.ld=d;const g=50+10*r.streak;r.nb+=g;await save(env,r);return J({me:me(r),gain:g})}
if(path==='/earn'){const d=day(),n=Date.now();if(r.ed!==d){r.ed=d;r.ea=0}if(n-r.le<295000||r.ea>=300)return J({me:me(r),gain:0});r.le=n;r.ea+=10;r.nb+=10;await save(env,r);return J({me:me(r),gain:10})}
if(path==='/buy'||path==='/sell'){const id=String(b.id||'');
 if(path==='/buy'){
  if(id==='crate'){if(r.nb<CRATE)return E('Not enough Nullbux');const x=Math.random(),rar=x<.6?'common':x<.88?'rare':x<.97?'epic':'legendary',pool=ITEMS.filter(i=>i[4]===rar),it=pool[Math.floor(Math.random()*pool.length)];r.nb-=CRATE;r.inv[it[0]]=(r.inv[it[0]]||0)+1;await save(env,r);return J({me:me(r),msg:'You got '+it[1]+'!'})}
  const it=ITEMS.find(i=>i[0]===id);if(!it)return E('Unknown item');const p=price(it);if(r.nb<p)return E('Not enough Nullbux');r.nb-=p;r.inv[id]=(r.inv[id]||0)+1;await save(env,r);return J({me:me(r),msg:'Bought '+it[1]})}
 const it=ITEMS.find(i=>i[0]===id);if(!it||!(r.inv[id]>0))return E('You don’t have that');const s=Math.floor(price(it)/2);r.inv[id]--;if(!r.inv[id])delete r.inv[id];r.nb+=s;await save(env,r);return J({me:me(r),msg:'Sold '+it[1]+' for '+s+' Nullbux'})}
return E('Not found',404)}catch(e){console.error(e);return E('Server error: '+String((e&&e.message)||e).slice(0,120),500)}}}
