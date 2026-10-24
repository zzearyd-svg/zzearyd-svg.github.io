const $=s=>document.querySelector(s),H=document.documentElement,
esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';'),
mk=(t,c,h)=>{const e=document.createElement(t);e.className=c||'';e.innerHTML=h||'';return e},
TH={midnight:['#8b6bff','#2fd6f5'],neon:['#ff2bd6','#00ffa3'],sunset:['#ff6b4a','#ffc14a'],forest:['#34d399','#a3e635'],light:['#5b6cff','#00b4d8']},
CL={Documents:['Documents','📄'],Classes:['My Classes','🎓'],Notes:['Notes','📝'],Calculator:['Calculator','🧮']},
FORT=['You will beat your high score. Eventually. Probably.','A snack break is in your near future.','The gap in the pipes is bigger than it looks.','Someone is about to message you back.','Today’s lucky number is 2048.','Take a deep breath. Then take another turn.'];
let S={theme:'midnight',discreet:false,cloak:'Documents',panic:'https://docs.google.com',fx:true,custom:[],best:{},fav:[],recent:[],thumbs:true,cont:true,calm:false,size:'normal',text:'normal',per:'120',sort:'pop',mobonly:false,autobar:false,awake:false,pkey:'`',pbtn:false,ctitle:'',ca:'#8b6bff',cb:'#2fd6f5',time:0,plays:{}},stop;
try{Object.assign(S,JSON.parse(localStorage.nd))}catch(e){}
const save=()=>{try{localStorage.nd=JSON.stringify(S)}catch(e){}};

function apply(){const c=CL[S.cloak]||CL.Documents,t=S.ctitle||c[0],cu=S.theme=='custom'&&!S.discreet;
H.dataset.theme=S.discreet?'docs':S.theme;
['--a','--b'].forEach((k,i)=>cu?H.style.setProperty(k,[S.ca,S.cb][i]):H.style.removeProperty(k));
H.classList.toggle('d',S.discreet);H.classList.toggle('nofx',!S.fx||S.discreet);H.classList.toggle('calm',S.calm);
H.dataset.size=S.size;H.dataset.text=S.text;$('#panic').hidden=!S.pbtn;
document.title=S.discreet?t:'NullDen';$('#logo').textContent=S.discreet?t:'NullDen';
$('#fav').href='data:image/svg+xml,'+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${S.discreet?c[1]:'🎮'}</text></svg>`)}
function fx(c){c.onmousemove=e=>{const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
c.style.setProperty('--x',x+'px');c.style.setProperty('--y',y+'px');
if(!H.classList.contains('nofx'))c.style.transform=`perspective(600px) rotateX(${(y/r.height-.5)*-8}deg) rotateY(${(x/r.width-.5)*8}deg) translateY(-3px)`};
c.onmouseleave=()=>c.style.transform=''}

function go(p){document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.p==p));({games,corner,settings,shop,account,players,admin})[p]();const h=$('#view h1');if(h&&!h.children.length&&!H.classList.contains('nofx')&&!H.classList.contains('calm'))scramble(h)}

const CLID='p_27841169-43c3-4a47-aacd-af9abd43a2a3',IMG='https://static.playgama.com/p-img/pg/',
PG=typeof CAT!='undefined'?CAT.map(c=>({id:'pg:'+c[0],name:c[1],e:'🎮',g:c[3],d:c[3].split(',').slice(0,2).map(s=>s.replace(/-/g,' ')).join(' · '),img:c[2]?IMG+c[2]+'?width=448':'',m:c[4],url:c[5]||'https://playgama.com/export/game/'+c[0]+'?clid='+CLID})):[];
const GC={};PG.forEach(g=>g.g.split(',').forEach(x=>x&&(GC[x]=(GC[x]||0)+1)));
const CHIPS=Object.keys(GC).filter(x=>x!='mobile').sort((a,b)=>GC[b]-GC[a]).slice(0,24),PER=()=>+S.per||120;
let chip='All',shown=PER();

let IO;
function games(){const v=$('#view');clearInterval(RT);IO&&IO.disconnect();
const CH=[['All','All'],['Favorites','♥ Favorites'],['Recent','🕒 Recent'],['Mobile','📱 Phone-ready'],['Classics','Classics'],...CHIPS.map(x=>[x,x.replace(/-/g,' ')])];
v.innerHTML=`<section class="hero"><h1>${S.discreet?'Files':'Play <span class="rot" id="rot"></span>'}</h1><p class="sub"><b id="cnt">0</b> games ready<button class="surp" id="sur">🎲 Surprise me</button></p></section><div class="row top"><input id="q" placeholder="Search games (press / )" autocomplete="off"><select id="so">${[['pop','Popular'],['az','A to Z'],['za','Z to A'],['shuf','Shuffle']].map(o=>`<option value="${o[0]}"${S.sort==o[0]?' selected':''}>${o[1]}</option>`).join('')}</select></div><div class="chips">${CH.map(c=>`<button data-c="${c[0]}" class="${c[0]==chip?'on':''}">${c[1]}</button>`).join('')}</div><section id="cw" hidden><h2 class="sh">Continue playing</h2><div class="strip" id="st"></div></section><p class="rc" id="rc"></p><div class="grid" id="g"></div><button class="btn" id="more">Show more</button>`;
const all=[...S.custom.map(c=>({id:c.url,name:c.name,e:'🌐',d:'Custom game',url:c.url})),...PG,...GAMES],rk=new Map(all.map(g=>[g.id,Math.random()])),real=all.filter(g=>!g.ext);
if($('#rot'))RT=S.calm?($('#rot').textContent='games',0):rotText($('#rot'),['puzzles','racers','shooters','idle games','arcade hits','3D worlds'],2200);
countUp($('#cnt'),real.length);
let list=[],rendered=0;
const ok=g=>!(S.mobonly&&g.id.startsWith('pg:')&&!g.m)&&(chip=='All'||(chip=='Favorites'?S.fav.includes(g.id):chip=='Recent'?S.recent.includes(g.id):chip=='Mobile'?!!g.m:chip=='Classics'?!g.id.startsWith('pg:'):(g.g||'').split(',').includes(chip)));
const card=g=>{const pg=g.id.startsWith('pg:'),tag=pg?(g.g.split(',')[0]||'').replace(/-/g,' '):g.ext?'Link':g.d=='Custom game'?'Custom':'Classic',
img=g.img&&S.thumbs?`<img src="${esc(g.img)}" data-e="${g.e}" alt="" loading="lazy" referrerpolicy="no-referrer" onload="this.classList.add('ok')" onerror="this.replaceWith(this.dataset.e)">`:g.e;
const a=mk('button','card'+(pg?'':' cl'),`<span class="thumb">${img}${tag?`<i class="tag">${esc(tag)}</i>`:''}</span>${g.ext?'':`<span class="hrt${S.fav.includes(g.id)?' on':''}">♥</span>`}<b>${esc(g.name)}</b><small>${esc(g.d)}</small>`);
a.onclick=e=>{if(e.target.classList.contains('hrt'))return toggleFav(g.id,e.target);g.ext?open(g.url,'_blank','noopener'):play(g)};fx(a);return a};
const more=()=>{const g=$('#g');list.slice(rendered,shown).forEach(x=>g.append(card(x)));rendered=Math.min(shown,list.length);$('#more').hidden=rendered>=list.length;$('#more').textContent='Show more ('+(list.length-rendered)+' left)'};
const fill=()=>{while(!$('#more').hidden&&$('#more').getBoundingClientRect().top<innerHeight+800){shown+=PER();more()}};
const build=()=>{const q=$('#q').value.toLowerCase().trim();list=all.filter(g=>g.name.toLowerCase().includes(q)&&ok(g));
if(chip=='Recent')list.sort((x,y)=>S.recent.indexOf(x.id)-S.recent.indexOf(y.id));
else if(S.sort=='az')list.sort((x,y)=>x.name.localeCompare(y.name));else if(S.sort=='za')list.sort((x,y)=>y.name.localeCompare(x.name));else if(S.sort=='shuf')list.sort((x,y)=>rk.get(x.id)-rk.get(y.id));
const rec=S.cont&&chip=='All'&&!q?S.recent.map(id=>all.find(g=>g.id==id)).filter(Boolean).slice(0,8):[];
$('#cw').hidden=!rec.length;$('#st').innerHTML='';rec.forEach(g=>$('#st').append(card(g)));
const lab=((CH.find(c=>c[0]==chip)||[0,chip])[1]).replace(/^[^a-z0-9]+/i,'');
$('#rc').innerHTML=chip!='All'||q?`${list.length.toLocaleString()} games${chip!='All'?' in '+esc(lab):''}${q?' matching “'+esc(q)+'”':''}<button id="clr">Clear</button>`:'';
rendered=0;$('#g').innerHTML=list.length?'':'<small>'+(chip=='Favorites'?'No favorites yet. Tap the ♥ on a game.':chip=='Recent'?'Games you play will show up here.':'No games found.')+'</small>';more()};
const sync=()=>v.querySelectorAll('.chips button').forEach(b=>b.classList.toggle('on',b.dataset.c==chip));
$('#sur').onclick=()=>{const p=(list.length?list:all).filter(g=>!g.ext);play(p[Math.random()*p.length|0])};
v.querySelector('.chips').onclick=e=>{const b=e.target.closest('button');if(!b)return;chip=b.dataset.c;shown=PER();sync();b.scrollIntoView({inline:'center',block:'nearest',behavior:'smooth'});build()};
$('#rc').onclick=e=>{if(e.target.id=='clr'){chip='All';$('#q').value='';shown=PER();sync();build()}};
$('#so').onchange=()=>{S.sort=$('#so').value;save();shown=PER();build()};
$('#q').oninput=()=>{shown=PER();build()};
$('#more').onclick=()=>{shown+=PER();more()};
IO=new IntersectionObserver(es=>{if(es[0].isIntersecting)fill()},{rootMargin:'800px'});IO.observe($('#more'));
shown=PER();build()}
function play(g){const st=$('#stage');$('#player').hidden=false;$('#player').classList.remove('min');startEarn();startSession(g);$('#pt').textContent=g.name;if(!g.ext){S.recent=[g.id,...S.recent.filter(x=>x!=g.id)].slice(0,12);save()}$('#pl').onclick=()=>{const u=location.href.split('#')[0]+'#'+encodeURIComponent(g.id);navigator.clipboard&&navigator.clipboard.writeText(u);$('#pl').textContent='Copied!';setTimeout(()=>$('#pl').textContent='Copy link',1500)};st.innerHTML='';
$('#po').hidden=!g.url;$('#po').onclick=()=>open(g.url,'_blank','noopener');
if(g.url){const f=mk('iframe');f.src=g.url;f.allow='fullscreen;autoplay;gamepad;accelerometer;gyroscope;clipboard-write;encrypted-media;picture-in-picture';f.setAttribute('sandbox','allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock allow-modals allow-popups-to-escape-sandbox allow-presentation allow-orientation-lock');st.append(f)}
else stop=g.run(st,s=>{if(s>(S.best[g.id]||0)){S.best[g.id]=s;save()}})}
function quit(){endSession();clearInterval(EI);stop&&stop();stop=null;$('#stage').innerHTML='';$('#player').hidden=true;if(!$('#q')&&$('#nav .on').dataset.p=='games')games()}

function corner(){$('#view').innerHTML=`<h1>Claude’s Corner</h1>
<div class="panel"><p>You found the secret door! Hi, I’m Claude. I built the whole site for you, and this corner is the part I got to keep for myself. Take a breather here between rounds.</p></div>
<div class="two"><div class="panel"><h3>Reaction test</h3><div id="rt" class="rt">Click to start</div><small>Click when it turns green.</small></div>
<div class="panel"><h3>Claude’s fortune</h3><p id="ft" style="min-height:48px">Press the button for a prediction.</p><button class="btn" id="fb">Tell me</button></div></div>
<div class="panel"><h3>Breathe</h3><div class="breath"></div><small>Grow for four seconds, shrink for four. Do it three times.</small></div>`;
const r=$('#rt');let t0,to;
r.onclick=()=>{const s=r.dataset.s;if(s=='go'){r.dataset.s='';r.textContent=(Date.now()-t0)+' ms · click to retry'}
else if(s=='w'){clearTimeout(to);r.dataset.s='';r.textContent='Too soon · click to retry'}
else{r.dataset.s='w';r.textContent='Wait for green…';to=setTimeout(()=>{r.dataset.s='go';r.textContent='Click!';t0=Date.now()},1000+Math.random()*2500)}};
$('#fb').onclick=()=>$('#ft').textContent=FORT[rnd(FORT.length)]}

function settings(){const v=$('#view'),
T=(k,l)=>`<label class="row"><input type="checkbox" data-k="${k}"${S[k]?' checked':''}> ${l}</label>`,
Sl=(k,l,o)=>`<label class="row">${l} <select data-k="${k}">${o.map(x=>`<option value="${x[0]}"${S[k]==x[0]?' selected':''}>${x[1]}</option>`).join('')}</select></label>`,
hh=S.time/3600|0,mm=S.time%3600/60|0;
v.innerHTML=`<h1>Settings</h1>
<div class="panel"><h3>Theme</h3><div class="sw">${[...Object.keys(TH),'custom'].map(t=>`<button data-t="${t}" class="${t==S.theme?'on':''}" style="--a:${t=='custom'?S.ca:TH[t][0]};--b:${t=='custom'?S.cb:TH[t][1]}">${t}</button>`).join('')}</div><div class="row">Custom colors <input type="color" data-k="ca" value="${S.ca}"> <input type="color" data-k="cb" value="${S.cb}"></div></div>
<div class="panel"><h3>Display</h3>${Sl('size','Card size',[['compact','Compact'],['normal','Normal'],['large','Large']])}${Sl('text','Text size',[['small','Small'],['normal','Normal'],['large','Large']])}${Sl('per','Games per page',[['60','60'],['120','120'],['240','240']])}${T('thumbs','Show game images')}${T('cont','Show “Continue playing” on the home page')}${T('fx','Animated background, tilt and click sparks')}${T('calm','Reduce motion')}<div class="row"><button id="inst" hidden>Install NullDen as an app</button><small>On iPhone: Share, then Add to Home Screen.</small></div></div>
<div class="panel"><h3>Games</h3>${T('mobonly','Only show Playgama games that work on phones')}${T('autobar','Hide the top bar when a game starts')}${T('awake','Keep the screen on while playing')}</div>
<div class="panel"><h3>Discreet mode</h3>${T('discreet','Plain look, fake tab title and icon, no effects')}${Sl('cloak','Tab disguise',Object.keys(CL).map(c=>[c,c]))}<label class="row">Custom tab title <input data-k="ctitle" value="${esc(S.ctitle)}" maxlength="30" placeholder="Optional"></label><label class="row">Panic key <input id="pk" readonly value="${esc(S.pkey)}" size="6"> <small>click it, then press a key</small></label><label class="row">Panic jumps to <input id="pu" value="${esc(S.panic)}" size="28"></label>${T('pbtn','Show an on-screen panic button')}</div>
<div class="panel"><h3>Add a game</h3><div class="row"><input id="cn" placeholder="Name"><input id="cu" placeholder="https://example.com/game" size="28"><button class="btn" id="ca">Add game</button></div><small>Works with any page that allows embedding in an iframe.</small>${S.custom.map((c,i)=>`<div class="row"><b>${esc(c.name)}</b><small>${esc(c.url)}</small><button data-x="${i}">Remove</button></div>`).join('')}</div>
<div class="panel"><h3>Your stats</h3><p>Play time <b>${hh}h ${mm}m</b> · Games played <b>${Object.keys(S.plays).length}</b> · Favorites <b>${S.fav.length}</b></p></div>
<div class="panel"><h3>Backup and data</h3><div class="row"><button id="ex">Copy backup</button><button id="im">Restore backup</button><button id="cr">Clear recent</button><button id="cf">Clear favorites</button></div></div>
<div class="panel"><h3>Shortcuts</h3><p><kbd>/</kbd> search · <kbd>Esc</kbd> close a game · <kbd>${esc(S.pkey)}</kbd> panic</p></div>
<div class="panel"><button class="btn" id="rs">Reset everything</button></div>
<p class="credit">Made by Nathan (zearyd) and some help with Claude :)</p>`;
const sync=()=>v.querySelectorAll('[data-t]').forEach(b=>b.classList.toggle('on',b.dataset.t==S.theme));
v.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{S.theme=b.dataset.t;save();apply();sync()});
v.oninput=e=>{const t=e.target,k=t.dataset.k;if(!k)return;S[k]=t.type=='checkbox'?t.checked:t.value;if(k=='ca'||k=='cb')S.theme='custom';save();apply();sync()};
const pk=$('#pk');pk.onfocus=()=>pk.value='press a key';pk.onblur=()=>pk.value=S.pkey;pk.onkeydown=e=>{e.preventDefault();if(e.key=='Tab'||e.key=='Escape')return pk.blur();S.pkey=e.key;save();pk.blur()};
$('#pu').onchange=e=>{const u=e.target.value.trim();S.panic=/^https?:\/\//.test(u)?u:'https://'+u;save()};
$('#ca').onclick=()=>{const n=$('#cn').value.trim(),u=$('#cu').value.trim();if(n&&/^https?:\/\//.test(u)){S.custom.push({name:n,url:u});save();settings()}};
v.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{S.custom.splice(b.dataset.x,1);save();settings()});
if(DEF){$('#inst').hidden=false;$('#inst').onclick=()=>DEF.prompt()}
const KEYS=['theme','discreet','cloak','panic','fx','custom','best','fav','recent','thumbs','cont','calm','size','text','per','mobonly','autobar','awake','pkey','pbtn','ctitle','ca','cb','time','plays'];
$('#ex').onclick=()=>{const c=btoa(unescape(encodeURIComponent(JSON.stringify(S))));navigator.clipboard?navigator.clipboard.writeText(c).then(()=>toast('Backup copied')).catch(()=>prompt('Copy your backup code',c)):prompt('Copy your backup code',c)};
$('#im').onclick=()=>{const c=prompt('Paste your backup code');if(!c)return;try{const d=JSON.parse(decodeURIComponent(escape(atob(c.trim()))));KEYS.forEach(k=>{if(k in d)S[k]=d[k]});
if(!TH[S.theme]&&S.theme!='custom')S.theme='midnight';if(!/^https?:\/\//.test(S.panic))S.panic='https://docs.google.com';
S.custom=(Array.isArray(S.custom)?S.custom:[]).filter(x=>x&&typeof x.name=='string'&&/^https?:\/\//.test(x.url));['fav','recent'].forEach(k=>{if(!Array.isArray(S[k]))S[k]=[]});
['ca','cb'].forEach(k=>{if(!/^#[0-9a-f]{6}$/i.test(S[k]))S[k]='#8b6bff'});['plays','best'].forEach(k=>{if(!S[k]||typeof S[k]!='object')S[k]={}});S.time=+S.time||0;
save();apply();settings();toast('Backup restored')}catch(e){toast('That backup code didn’t work')}};
$('#cr').onclick=()=>{S.recent=[];save();toast('Recent games cleared')};$('#cf').onclick=()=>{S.fav=[];save();toast('Favorites cleared')};
$('#rs').onclick=()=>{if(confirm('Reset all settings, favorites and your sign-in on this device?')){try{['nd','nd_terms','nd_key','nd_tok'].forEach(k=>localStorage.removeItem(k));sessionStorage.removeItem('nd_tok')}catch(e){}location.reload()}}}
const API='';  /* paste your relay URL here, no trailing slash (see worker.js) */
/* React Bits style effects, in plain JS */
let RT;
function rotText(el,w,ms){let i=0;const t=()=>{el.textContent=w[i++%w.length];el.classList.remove('in');void el.offsetWidth;el.classList.add('in')};t();return setInterval(t,ms)}
function countUp(el,to){const s=performance.now(),f=n=>{const p=Math.min(1,(n-s)/1200);el.textContent=Math.round(to*(1-Math.pow(1-p,3))).toLocaleString();if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
function scramble(el){const t=el.textContent,C='!<>-_\\/[]{}=+*^?#',s=performance.now(),f=n=>{const p=(n-s)/700;if(p>=1)return el.textContent=t;el.textContent=[...t].map((c,i)=>c==' '||i<p*t.length?c:C[Math.random()*C.length|0]).join('');requestAnimationFrame(f)};requestAnimationFrame(f)}
function toggleFav(id,el){const i=S.fav.indexOf(id);i<0?S.fav.push(id):S.fav.splice(i,1);el.classList.toggle('on',i<0);save()}


/* Accounts and Nullbux (need the relay: see worker.js) */
let ME=null,TOK='',EI;try{TOK=localStorage.nd_tok||sessionStorage.nd_tok||''}catch(e){}
function toast(t){let e=$('#toast');if(!e){e=mk('div');e.id='toast';document.body.append(e)}e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),2400)}
function setMe(m){ME=m;$('#bux').textContent=m?(m.role=='owner'?'👑 ':'')+'🪙 '+m.nb.toLocaleString():'Log in';renderNotes()}
async function api(p,b,auth=1){if(!API)throw new Error('Accounts are not set up on this site yet.');
const r=await fetch(API+p,{method:b?'POST':'GET',headers:{...(b?{'content-type':'application/json'}:{}),...(TOK&&auth?{authorization:'Bearer '+TOK}:{})},body:b?JSON.stringify(b):undefined});
const j=await r.json().catch(()=>({}));if(!r.ok){const e=new Error(j.error||'Something went wrong');e.needKey=j.needKey;throw e}return j}
function startEarn(){clearInterval(EI);if(ME)EI=setInterval(()=>{if(document.visibilityState=='visible')api('/earn',{}).then(j=>setMe(j.me)).catch(()=>{})},300000)}
function account(){const v=$('#view');
if(ME){v.innerHTML=`<h1>${esc(ME.u)}${badge(ME.role)}</h1><div class="panel"><h3>Nullbux</h3><p class="big">🪙 ${ME.nb.toLocaleString()}</p><small>Daily streak: ${ME.streak}. Earn Nullbux with the daily reward and by playing games: 2 per minute, paid out every 5 minutes, up to 300 a day.</small><div class="row"><button class="btn" id="dl"${ME.canDaily?'':' disabled'}>${ME.canDaily?'Claim daily reward':'Claimed. Come back tomorrow'}</button><button id="lo">Log out</button></div></div><div class="panel"><h3>Privacy</h3><label class="row"><input type="checkbox" id="pp"${ME.pub?' checked':''}> Public profile: other players can see my Nullbux, inventory and recent games</label></div>${ME.role=='owner'?'<div class="panel"><h3>Owner tools</h3><button class="btn" id="ad">Open admin panel</button></div>':''}`;
$('#dl').onclick=async()=>{try{const j=await api('/daily',{});setMe(j.me);toast('+'+j.gain+' Nullbux');account()}catch(e){toast(e.message)}};
$('#lo').onclick=()=>{TOK='';try{localStorage.removeItem('nd_tok');sessionStorage.removeItem('nd_tok')}catch(e){}clearInterval(EI);setMe(null);account()};
$('#pp').onchange=async e=>{try{const j=await api('/privacy',{pub:e.target.checked});setMe(j.me)}catch(x){toast(x.message)}};
if($('#ad'))$('#ad').onclick=()=>go('admin');return}
v.innerHTML=`<h1>Account</h1><div class="panel"><h3>Log in or sign up</h3><div class="row"><input id="au" placeholder="Username" autocomplete="username" maxlength="16"></div><div class="row"><input id="ap" type="password" placeholder="Password (6+ characters)" autocomplete="current-password"></div><div class="row" id="kr" hidden><input id="ak" type="password" placeholder="Owner key" autocomplete="off"></div><label class="row"><input type="checkbox" id="rm"> Remember me on this device</label><div class="row"><button class="btn" id="li">Log in</button><button id="su">Sign up</button></div><small id="am">New accounts start with 100 Nullbux. There’s no email, so no password reset: don’t reuse a real password.</small></div>`;
const send=async p=>{try{const rm=$('#rm').checked,j=await api(p,{u:$('#au').value,p:$('#ap').value,remember:rm,key:$('#ak').value},0);TOK=j.token;try{(rm?localStorage:sessionStorage).nd_tok=TOK;(rm?sessionStorage:localStorage).removeItem('nd_tok')}catch(e){}setMe(j.me);account()}catch(e){$('#am').textContent=e.message;if(e.needKey)$('#kr').hidden=false}};
$('#li').onclick=()=>send('/login');$('#su').onclick=()=>send('/signup')}
async function shop(){const v=$('#view');
if(!ME){v.innerHTML='<h1>Shop</h1><div class="panel"><p>Log in to buy and sell items with Nullbux.</p><button class="btn" id="gl">Log in or sign up</button></div>';$('#gl').onclick=()=>go('account');return}
v.innerHTML='<h1>Shop</h1><p class="sub">Loading…</p>';let s;
try{s=await api('/shop',0,0)}catch(e){v.innerHTML='<h1>Shop</h1><div class="panel"><p>'+esc(e.message)+'</p></div>';return}
const act=async(p,id)=>{try{const j=await api(p,{id});setMe(j.me);if(j.msg)toast(j.msg);draw()}catch(e){toast(e.message)}};
const draw=()=>{const inv=s.items.filter(i=>ME.inv[i.id]);
v.innerHTML=`<h1>Shop</h1><p class="sub">Balance <b>🪙 ${ME.nb.toLocaleString()}</b> · prices change every day</p><div class="items">${s.items.map(i=>`<div class="item ${i.r}"><span class="ie">${i.e}</span><b>${esc(i.n)}</b><small>${i.r}</small><button class="btn" data-b="${i.id}"${ME.nb<i.p?' disabled':''}>🪙 ${i.p}</button></div>`).join('')}</div><h2 class="sh">Your inventory</h2><div class="items">${inv.length?inv.map(i=>`<div class="item ${i.r}"><span class="ie">${i.e}</span><b>${esc(i.n)} ×${ME.inv[i.id]}</b><button class="btn alt" data-s="${i.id}">Sell · 🪙 ${i.s}</button></div>`).join(''):'<small>Nothing yet. Buy something above!</small>'}</div>`;
v.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>act('/buy',b.dataset.b));v.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>act('/sell',b.dataset.s))};
draw()}
/* Players, owner admin panel, announcements and giveaways */
let ITM=null,ST={a:null,g:null};
async function items(){if(!ITM){const s=await api('/shop',0,0);ITM={};s.items.forEach(i=>ITM[i.id]=i)}return ITM}
const badge=r=>r=='owner'?' <span class="own">👑 Owner</span>':'';
async function loadStatus(){if(!API)return;try{ST=await api('/status',0,0);renderNotes()}catch(e){}}
function renderNotes(){const n=$('#notes');if(!n)return;const a=ST.a,g=ST.g;let h='';
if(a&&a.id!=(S.ann|0))h+=`<div class="note"><span>📣 ${esc(a.text)}</span><button data-n="a" title="Dismiss">✕</button></div>`;
if(g&&g.ends>Date.now())h+=`<div class="note gift"><span>🎁 ${esc(g.title)}: claim <b>${g.amount.toLocaleString()}</b> Nullbux</span>${ME&&ME.gv==g.id?'<small>Claimed</small>':`<button class="btn" data-n="g">${ME?'Claim':'Log in to claim'}</button>`}</div>`;
n.innerHTML=h;
n.onclick=async e=>{const k=e.target.dataset.n;if(k=='a'){S.ann=a.id;save();renderNotes()}if(k=='g'){if(!ME)return go('account');try{const j=await api('/giveaway/claim',{});setMe(j.me);toast('+'+j.gain.toLocaleString()+' Nullbux')}catch(x){toast(x.message)}}}}
function players(){const v=$('#view');
if(!ME){v.innerHTML='<h1>Players</h1><div class="panel"><p>Log in to search players and see their profiles.</p><button class="btn" id="gl">Log in or sign up</button></div>';$('#gl').onclick=()=>go('account');return}
v.innerHTML='<h1>Players</h1><div class="row"><input id="pq" placeholder="Search usernames" autocomplete="off" maxlength="16"></div><div id="pl" class="plist"></div><div id="pv"></div>';
let t;const run=async()=>{try{const j=await api('/search?q='+encodeURIComponent($('#pq').value.trim()));$('#pl').innerHTML=j.users.length?j.users.map(x=>`<button class="pchip" data-u="${esc(x.u)}">${esc(x.u)}${badge(x.role)}${x.banned?' 🚫':''}</button>`).join(''):'<small>No players found.</small>'}catch(e){$('#pl').innerHTML='<small>'+esc(e.message)+'</small>'}};
$('#pq').oninput=()=>{clearTimeout(t);t=setTimeout(run,300)};
$('#pl').onclick=e=>{const b=e.target.closest('[data-u]');if(b)showProfile(b.dataset.u,$('#pv'))};run()}
async function showProfile(u,el){el.innerHTML='<small>Loading…</small>';
try{const p=await api('/profile?u='+encodeURIComponent(u)),it=await items();
if(p.private){el.innerHTML=`<div class="panel"><h3>${esc(p.u)}${badge(p.role)}</h3><small>This profile is private.</small></div>`;return}
const inv=Object.keys(p.inv||{}).map(id=>it[id]?`<div class="item ${it[id].r}"><span class="ie">${it[id].e}</span><b>${esc(it[id].n)} ×${p.inv[id]}</b></div>`:'').join('');
el.innerHTML=`<div class="panel prof"><h3>${esc(p.u)}${badge(p.role)}${p.banned?' 🚫 banned':''}</h3><p class="big">🪙 ${p.nb.toLocaleString()}</p><small>${p.joined?'Joined '+new Date(p.joined).toLocaleDateString()+' · ':''}${p.pub?'Public profile':'Private profile'}</small><h4>Inventory</h4><div class="items">${inv||'<small>Empty</small>'}</div><h4>Recently played</h4>${p.rec.length?'<ul class="rl">'+p.rec.map(x=>`<li>${esc(x.name)} <small>${new Date(x.t).toLocaleString()}</small></li>`).join('')+'</ul>':'<small>Nothing yet</small>'}</div>`}catch(e){el.innerHTML='<small>'+esc(e.message)+'</small>'}}
function admin(){const v=$('#view');if(!ME||ME.role!='owner')return go('games');
v.innerHTML=`<h1>Admin</h1><div class="panel"><h3>Announcement</h3><div class="row"><input id="at" maxlength="300" placeholder="Message for everyone on the site" size="36"></div><div class="row"><button class="btn" id="as">Send to everyone</button><button id="ac">Clear</button></div><small>Shows as a banner for every visitor until they dismiss it.</small></div>
<div class="panel"><h3>Giveaway</h3><div class="row"><input id="gt" placeholder="Title" maxlength="60"><input id="ga" type="number" min="1" placeholder="Nullbux each"><input id="gm" type="number" min="1" placeholder="Minutes"></div><div class="row"><button class="btn" id="gs">Start giveaway</button><button id="ge">End giveaway</button></div><small>Each player can claim once while it runs.</small></div>
<div class="panel"><h3>Manage a player</h3><div class="row"><input id="mu" placeholder="Username" maxlength="16"><button class="btn" id="ml">Look up</button></div><div id="mv"></div></div>`;
const post=async(p,b,m)=>{try{await api(p,b);toast(m);loadStatus()}catch(e){toast(e.message)}};
$('#as').onclick=()=>post('/admin/announce',{text:$('#at').value},'Announcement sent');
$('#ac').onclick=()=>post('/admin/announce',{text:''},'Announcement cleared');
$('#gs').onclick=()=>post('/admin/giveaway',{title:$('#gt').value,amount:$('#ga').value,minutes:$('#gm').value},'Giveaway started');
$('#ge').onclick=()=>post('/admin/giveaway',{end:true},'Giveaway ended');
$('#ml').onclick=async()=>{const u=$('#mu').value.trim().toLowerCase(),mv=$('#mv');await showProfile(u,mv);if(!mv.querySelector('.prof'))return;
mv.insertAdjacentHTML('beforeend','<div class="row"><input id="mn" type="number" placeholder="Nullbux amount"><button id="mset">Set</button><button id="madd">Add</button></div><div class="row"><button id="mb">Ban / unban</button><button id="md" class="danger">Delete account</button></div>');
const nb=async op=>{try{await api('/admin/nb',{u,op,amount:$('#mn').value});toast('Updated');$('#ml').click()}catch(e){toast(e.message)}};
$('#mset').onclick=()=>nb('set');$('#madd').onclick=()=>nb('add');
$('#mb').onclick=async()=>{try{const p=await api('/profile?u='+encodeURIComponent(u));await api('/admin/ban',{u,ban:!p.banned});toast(p.banned?'Unbanned':'Banned');$('#ml').click()}catch(e){toast(e.message)}};
$('#md').onclick=async()=>{if(confirm('Delete '+u+' permanently?'))try{await api('/admin/delete',{u});toast('Deleted');mv.innerHTML=''}catch(e){toast(e.message)}}}}
$('#bux').onclick=()=>go('account');
if(TOK)api('/me').then(setMe).catch(e=>{if(e.message=='Please log in'||/banned/.test(e.message)){TOK='';try{localStorage.removeItem('nd_tok');sessionStorage.removeItem('nd_tok')}catch(x){}}});
loadStatus();setInterval(loadStatus,300000);

/* sessions, install prompt, panic button */
let TI,WL,PT0,DEF;
addEventListener('beforeinstallprompt',e=>{e.preventDefault();DEF=e});
const pb=mk('button','','✕');pb.id='panic';pb.title='Panic: leave this page';pb.hidden=true;pb.onclick=()=>location.replace(S.panic);document.body.append(pb);
const tb=mk('button','','↑');tb.id='top';tb.title='Back to top';tb.onclick=()=>scrollTo({top:0,behavior:S.calm?'auto':'smooth'});document.body.append(tb);addEventListener('scroll',()=>tb.classList.toggle('on',scrollY>900),{passive:true});
function startSession(g){S.plays[g.id]=(S.plays[g.id]||0)+1;PT0=Date.now();clearInterval(TI);if(ME&&!g.ext)api('/played',{id:g.id,name:g.name}).catch(()=>{});
TI=setInterval(()=>{const s=(Date.now()-PT0)/1000|0;$('#ptm').textContent=(s/60|0)+':'+String(s%60).padStart(2,'0');if(document.visibilityState=='visible'&&!(++S.time%15))save()},1000);
$('#pr').hidden=!g.url;$('#pr').onclick=()=>{const f=$('#stage iframe');if(f&&g.url)f.src=g.url};
if(S.autobar)$('#player').classList.add('min');
if(S.awake&&navigator.wakeLock)navigator.wakeLock.request('screen').then(l=>WL=l).catch(()=>{})}
function endSession(){clearInterval(TI);save();try{WL&&WL.release()}catch(e){}WL=null;$('#ptm').textContent=''}

/* click sparks */
const spk=$('#sparks'),sx=spk.getContext('2d');let P=[];
const rs=()=>{spk.width=innerWidth;spk.height=innerHeight};rs();onresize=rs;
addEventListener('click',e=>{if(H.classList.contains('nofx'))return;for(let i=0;i<10;i++){const a=i/10*6.28;P.push({x:e.clientX,y:e.clientY,vx:Math.cos(a)*4,vy:Math.sin(a)*4,l:1})}if(!run){run=1;requestAnimationFrame(L)}});
let run=0;function L(){sx.clearRect(0,0,spk.width,spk.height);sx.lineWidth=2;sx.strokeStyle=getComputedStyle(H).getPropertyValue('--b').trim();P=P.filter(p=>p.l>0);
P.forEach(p=>{sx.globalAlpha=p.l;sx.beginPath();sx.moveTo(p.x,p.y);sx.lineTo(p.x+p.vx*3,p.y+p.vy*3);sx.stroke();p.x+=p.vx;p.y+=p.vy;p.vx*=.95;p.vy*=.95;p.l-=.04});if(P.length)requestAnimationFrame(L);else run=0}

$('#nav').onclick=e=>e.target.dataset.p&&go(e.target.dataset.p);
$('#px').onclick=quit;$('#ph').onclick=()=>$('#player').classList.add('min');$('#ps').onclick=()=>$('#player').classList.remove('min');$('#pf').onclick=()=>$('#player').requestFullscreen?.();if(!document.documentElement.requestFullscreen)$('#pf').hidden=true;
addEventListener('keydown',e=>{if(e.key==S.pkey&&e.target.tagName!='INPUT')location.replace(S.panic);if(e.key=='Escape'&&!$('#player').hidden)quit();if(e.key=='/'&&e.target.tagName!='INPUT'&&$('#q')&&$('#player').hidden){e.preventDefault();$('#q').focus()}});
let ly=0;addEventListener('scroll',()=>{const y=scrollY,hd=$('header');if(y>90&&y>ly+6)hd.classList.add('hide');else if(y<ly-6||y<=90)hd.classList.remove('hide');ly=y},{passive:true});
let lc=0,lt;$('#logo').onclick=()=>{clearTimeout(lt);if(++lc>=5){lc=0;go('corner')}else lt=setTimeout(()=>lc=0,1500)};
apply();go('games');
const hid=decodeURIComponent(location.hash.slice(1));if(hid){const g0=[...GAMES,...PG].find(x=>x.id==hid);if(g0&&!g0.ext)play(g0)}
