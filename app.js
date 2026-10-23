const $=s=>document.querySelector(s),H=document.documentElement,
esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';'),
mk=(t,c,h)=>{const e=document.createElement(t);e.className=c||'';e.innerHTML=h||'';return e},
TH={midnight:['#8b6bff','#2fd6f5'],neon:['#ff2bd6','#00ffa3'],sunset:['#ff6b4a','#ffc14a'],forest:['#34d399','#a3e635'],light:['#5b6cff','#00b4d8']},
CL={Documents:['Documents','📄'],Classes:['My Classes','🎓'],Notes:['Notes','📝'],Calculator:['Calculator','🧮']},
FORT=['You will beat your high score. Eventually. Probably.','A snack break is in your near future.','The gap in the pipes is bigger than it looks.','Someone is about to message you back.','Today’s lucky number is 2048.','Take a deep breath. Then take another turn.'];
let S={theme:'midnight',discreet:false,cloak:'Documents',panic:'https://docs.google.com',fx:true,custom:[],best:{},fav:[],recent:[]},stop;
try{Object.assign(S,JSON.parse(localStorage.nd))}catch(e){}
const save=()=>{try{localStorage.nd=JSON.stringify(S)}catch(e){}};

function apply(){const c=CL[S.cloak]||CL.Documents;
H.dataset.theme=S.discreet?'docs':S.theme;H.classList.toggle('d',S.discreet);H.classList.toggle('nofx',!S.fx||S.discreet);
document.title=S.discreet?c[0]:'NullDen';$('#logo').textContent=S.discreet?c[0]:'NullDen';
$('#fav').href='data:image/svg+xml,'+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${S.discreet?c[1]:'🎮'}</text></svg>`)}

function fx(c){c.onmousemove=e=>{const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
c.style.setProperty('--x',x+'px');c.style.setProperty('--y',y+'px');
if(!H.classList.contains('nofx'))c.style.transform=`perspective(600px) rotateX(${(y/r.height-.5)*-8}deg) rotateY(${(x/r.width-.5)*8}deg) translateY(-3px)`};
c.onmouseleave=()=>c.style.transform=''}

function go(p){document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.p==p));({games,corner,settings,ai:assistant})[p]();const h=$('#view h1');if(h&&!h.children.length&&!H.classList.contains('nofx'))scramble(h)}

const CLID='p_27841169-43c3-4a47-aacd-af9abd43a2a3',IMG='https://static.playgama.com/p-img/pg/',
CHIPS=['puzzle','arcade','action','3d','simulation','adventure','racing','shooting','strategy','multiplayer','idle','sports'],
PG=typeof CAT!='undefined'?CAT.map(c=>({id:'pg:'+c[0],name:c[1],e:'🎮',g:c[3],d:c[3].split(',').slice(0,2).map(s=>s.replace(/-/g,' ')).join(' · '),img:c[2]?IMG+c[2]+'?width=448':'',url:c[4]||'https://playgama.com/export/game/'+c[0]+'?clid='+CLID})):[];
let chip='All',shown=120;

function games(){const v=$('#view');clearInterval(RT);
v.innerHTML=`<section class="hero"><h1>${S.discreet?'Files':'Play <span class="rot" id="rot"></span>'}</h1><p class="sub"><b id="cnt">0</b> games ready<button class="surp" id="sur">🎲 Surprise me</button></p></section><input id="q" placeholder="Search games (press / )" autocomplete="off"><div class="chips">${['All','Favorites','Recent','Classics',...CHIPS].map(c=>`<button class="${c==chip?'on':''}">${c}</button>`).join('')}</div><div class="grid" id="g"></div><button class="btn" id="more">Show more</button>`;
const all=[...S.custom.map(c=>({id:c.url,name:c.name,e:'🌐',d:'Custom game',url:c.url})),...GAMES,...PG];
if($('#rot'))RT=rotText($('#rot'),['puzzles','racers','shooters','idle games','arcade hits','3D worlds'],2200);
countUp($('#cnt'),GAMES.length+PG.length);
$('#sur').onclick=()=>{const p=all.filter(g=>!g.ext);play(p[Math.random()*p.length|0])};
const ok=g=>chip=='All'||(chip=='Favorites'?S.fav.includes(g.id):chip=='Recent'?S.recent.includes(g.id):chip=='Classics'?!g.id.startsWith('pg:'):(g.g||'').split(',').includes(chip));
const draw=()=>{const q=$('#q').value.toLowerCase(),list=all.filter(g=>g.name.toLowerCase().includes(q)&&ok(g));
if(chip=='Recent')list.sort((x,y)=>S.recent.indexOf(x.id)-S.recent.indexOf(y.id));
$('#g').innerHTML=list.length?'':'<small>'+(chip=='Favorites'?'No favorites yet. Tap the ♥ on a game.':chip=='Recent'?'Games you play will show up here.':'No games found.')+'</small>';
list.slice(0,shown).forEach(g=>{const a=mk('button','card',`<span class="thumb">${g.e}${g.img?`<img src="${esc(g.img)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">`:''}</span>${g.ext?'':`<span class="hrt${S.fav.includes(g.id)?' on':''}">♥</span>`}<b>${esc(g.name)}</b><small>${esc(g.d)}${S.best[g.id]!=null?' · best '+S.best[g.id]:''}</small>`);
a.onclick=e=>{if(e.target.classList.contains('hrt'))return toggleFav(g.id,e.target);g.ext?open(g.url,'_blank','noopener'):play(g)};fx(a);$('#g').append(a)});
$('#more').hidden=list.length<=shown;$('#more').textContent='Show more ('+(list.length-shown)+' left)'};
v.querySelector('.chips').onclick=e=>{if(e.target.tagName=='BUTTON'){chip=e.target.textContent;shown=120;v.querySelectorAll('.chips button').forEach(b=>b.classList.toggle('on',b.textContent==chip));draw()}};
$('#q').oninput=()=>{shown=120;draw()};$('#more').onclick=()=>{shown+=120;draw()};draw()}
function play(g){const st=$('#stage');$('#player').hidden=false;$('#player').classList.remove('min');$('#pt').textContent=g.name;if(!g.ext){S.recent=[g.id,...S.recent.filter(x=>x!=g.id)].slice(0,12);save()}$('#pl').onclick=()=>{const u=location.href.split('#')[0]+'#'+encodeURIComponent(g.id);navigator.clipboard&&navigator.clipboard.writeText(u);$('#pl').textContent='Copied!';setTimeout(()=>$('#pl').textContent='Copy link',1500)};st.innerHTML='';
$('#po').hidden=!g.url;$('#po').onclick=()=>open(g.url,'_blank','noopener');
if(g.url){const f=mk('iframe');f.src=g.url;f.allow='fullscreen;autoplay;gamepad;accelerometer;gyroscope;clipboard-write;encrypted-media;picture-in-picture';f.setAttribute('sandbox','allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock allow-modals allow-popups-to-escape-sandbox allow-presentation allow-orientation-lock');st.append(f)}
else stop=g.run(st,s=>{if(s>(S.best[g.id]||0)){S.best[g.id]=s;save()}})}
function quit(){stop&&stop();stop=null;$('#stage').innerHTML='';$('#player').hidden=true;if(!$('#q')&&$('#nav .on').dataset.p=='games')games()}

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

function settings(){const v=$('#view');
v.innerHTML=`<h1>Settings</h1>
<div class="panel"><h3>Theme</h3><div class="sw">${Object.keys(TH).map(t=>`<button data-t="${t}" class="${t==S.theme?'on':''}" style="--a:${TH[t][0]};--b:${TH[t][1]}">${t}</button>`).join('')}</div></div>
<div class="panel"><h3>Discreet mode</h3>
<label class="row"><input type="checkbox" id="dm" ${S.discreet?'checked':''}> Plain look, fake tab title and icon, no effects</label>
<label class="row">Tab disguise <select id="cl">${Object.keys(CL).map(c=>`<option ${c==S.cloak?'selected':''}>${c}</option>`).join('')}</select></label>
<label class="row">Panic key <kbd>&#96;</kbd> jumps to <input id="pu" value="${esc(S.panic)}" size="28"></label></div>
<div class="panel"><h3>Effects</h3><label class="row"><input type="checkbox" id="fx" ${S.fx?'checked':''}> Animated background, card tilt and click sparks</label></div>
<div class="panel"><h3>Add a game</h3><div class="row"><input id="cn" placeholder="Name"><input id="cu" placeholder="https://example.com/game" size="28"><button class="btn" id="ca">Add game</button></div>
<small>Works with any page that allows embedding in an iframe.</small>
${S.custom.map((c,i)=>`<div class="row"><b>${esc(c.name)}</b><small>${esc(c.url)}</small><button data-x="${i}">Remove</button></div>`).join('')}</div>
<div class="panel"><button class="btn" id="rs">Reset settings and scores</button></div>`;
v.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{S.theme=b.dataset.t;save();apply();settings()});
$('#dm').onchange=e=>{S.discreet=e.target.checked;save();apply()};
$('#cl').onchange=e=>{S.cloak=e.target.value;save();apply()};
$('#pu').onchange=e=>{const u=e.target.value.trim();S.panic=/^https?:\/\//.test(u)?u:'https://'+u;save()};
$('#fx').onchange=e=>{S.fx=e.target.checked;save();apply()};
$('#ca').onclick=()=>{const n=$('#cn').value.trim(),u=$('#cu').value.trim();if(n&&/^https?:\/\//.test(u)){S.custom.push({name:n,url:u});save();settings()}};
v.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{S.custom.splice(b.dataset.x,1);save();settings()});
$('#rs').onclick=()=>{if(confirm('Reset all settings and scores?')){try{['nd','nd_terms','nd_key'].forEach(k=>localStorage.removeItem(k))}catch(e){}location.reload()}}}


/* NullDen AI (Groq, openai/gpt-oss-120b). Never put a real API key in this file: the site is public. */
const AI_PROXY='',  /* paste your relay URL here (see worker.js) */
SYS="You are the NullDen Assistant, a friendly AI built into the NullDen games site. Help with anything: homework questions, writing, coding, game tips and recommendations, ideas, or just chatting. Be clear, honest and concise, and say so when you are unsure. Politely decline anything dangerous, hateful, sexual or illegal. Never ask for personal information.";
let chat=[],busy=0;
function assistant(){const v=$('#view'),key=()=>{try{return localStorage.nd_key||''}catch(e){return''}};
v.innerHTML=`<h1>NullDen AI</h1><div class="panel chat"><div id="msgs"></div><div class="row"><input id="aq" placeholder="Ask me anything" autocomplete="off"><button class="btn" id="as">Send</button><button id="ac">Clear</button></div><small>AI can be wrong. Don’t share personal info. Messages are sent to Groq to generate replies.</small></div>${AI_PROXY||key()?'':`<div class="panel"><h3>Connect the assistant</h3><p>No AI connection yet. Paste a Groq API key to try it. It is saved only in this browser. For everyone else, set up the relay in worker.js.</p><div class="row"><input id="ak" type="password" placeholder="gsk_…" size="30"><button class="btn" id="asv">Save key</button></div></div>`}`;
const draw=()=>{const m=$('#msgs');m.innerHTML='';[{role:'assistant',content:'Hi! I’m the NullDen assistant. Ask me anything: homework, coding, game tips, whatever you like.'},...chat].forEach(x=>{const d=mk('div','m '+(x.role=='user'?'u':'a'));d.textContent=x.content;m.append(d)});m.scrollTop=m.scrollHeight};
const send=async()=>{const t=$('#aq').value.trim();if(!t||busy)return;$('#aq').value='';
if(!AI_PROXY&&!key()){chat.push({role:'user',content:t},{role:'assistant',content:'Connect the assistant first: paste a key below.'});return draw()}
chat.push({role:'user',content:t},{role:'assistant',content:'…'});draw();busy=1;
const msgs=chat.slice(-21,-1).map(x=>({role:x.role,content:x.content.slice(0,4000)}));
try{const r=await fetch(AI_PROXY||'https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'content-type':'application/json',...(AI_PROXY?{}:{authorization:'Bearer '+key()})},
body:JSON.stringify(AI_PROXY?{messages:msgs}:{model:'openai/gpt-oss-120b',messages:[{role:'system',content:SYS},...msgs],max_tokens:1500,reasoning_effort:'low'})});
const j=await r.json();chat[chat.length-1].content=(j.choices&&j.choices[0].message.content||'').trim()||(j.error&&j.error.message)||'No reply, try again.'}
catch(e){chat[chat.length-1].content='Couldn’t reach the AI. Check your connection or setup.'}
busy=0;draw()};
$('#as').onclick=send;$('#aq').onkeydown=e=>e.key=='Enter'&&send();$('#ac').onclick=()=>{chat=[];draw()};
if($('#asv'))$('#asv').onclick=()=>{const k=$('#ak').value.trim();if(k){try{localStorage.nd_key=k}catch(e){}assistant()}};
draw()}


/* React Bits style effects, in plain JS */
let RT;
function rotText(el,w,ms){let i=0;const t=()=>{el.textContent=w[i++%w.length];el.classList.remove('in');void el.offsetWidth;el.classList.add('in')};t();return setInterval(t,ms)}
function countUp(el,to){const s=performance.now(),f=n=>{const p=Math.min(1,(n-s)/1200);el.textContent=Math.round(to*(1-Math.pow(1-p,3))).toLocaleString();if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
function scramble(el){const t=el.textContent,C='!<>-_\\/[]{}=+*^?#',s=performance.now(),f=n=>{const p=(n-s)/700;if(p>=1)return el.textContent=t;el.textContent=[...t].map((c,i)=>c==' '||i<p*t.length?c:C[Math.random()*C.length|0]).join('');requestAnimationFrame(f)};requestAnimationFrame(f)}
function toggleFav(id,el){const i=S.fav.indexOf(id);i<0?S.fav.push(id):S.fav.splice(i,1);el.classList.toggle('on',i<0);save()}

/* click sparks */
const spk=$('#sparks'),sx=spk.getContext('2d');let P=[];
const rs=()=>{spk.width=innerWidth;spk.height=innerHeight};rs();onresize=rs;
addEventListener('click',e=>{if(H.classList.contains('nofx'))return;for(let i=0;i<10;i++){const a=i/10*6.28;P.push({x:e.clientX,y:e.clientY,vx:Math.cos(a)*4,vy:Math.sin(a)*4,l:1})}});
(function L(){sx.clearRect(0,0,spk.width,spk.height);sx.lineWidth=2;sx.strokeStyle=getComputedStyle(H).getPropertyValue('--b').trim();P=P.filter(p=>p.l>0);
P.forEach(p=>{sx.globalAlpha=p.l;sx.beginPath();sx.moveTo(p.x,p.y);sx.lineTo(p.x+p.vx*3,p.y+p.vy*3);sx.stroke();p.x+=p.vx;p.y+=p.vy;p.vx*=.95;p.vy*=.95;p.l-=.04});requestAnimationFrame(L)})();

$('#nav').onclick=e=>e.target.dataset.p&&go(e.target.dataset.p);
$('#px').onclick=quit;$('#ph').onclick=()=>$('#player').classList.add('min');$('#ps').onclick=()=>$('#player').classList.remove('min');$('#pf').onclick=()=>$('#player').requestFullscreen?.();
addEventListener('keydown',e=>{if(e.key=='`'&&e.target.tagName!='INPUT')location.replace(S.panic);if(e.key=='Escape'&&!$('#player').hidden)quit();if(e.key=='/'&&e.target.tagName!='INPUT'&&$('#q')&&$('#player').hidden){e.preventDefault();$('#q').focus()}});
let lc=0,lt;$('#logo').onclick=()=>{clearTimeout(lt);if(++lc>=5){lc=0;go('corner')}else lt=setTimeout(()=>lc=0,1500)};
apply();go('games');
const hid=decodeURIComponent(location.hash.slice(1));if(hid){const g0=[...GAMES,...PG].find(x=>x.id==hid);if(g0&&!g0.ext)play(g0)}
