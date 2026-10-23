const $=s=>document.querySelector(s),H=document.documentElement,
esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';'),
mk=(t,c,h)=>{const e=document.createElement(t);e.className=c||'';e.innerHTML=h||'';return e},
TH={midnight:['#8b6bff','#2fd6f5'],neon:['#ff2bd6','#00ffa3'],sunset:['#ff6b4a','#ffc14a'],forest:['#34d399','#a3e635'],light:['#5b6cff','#00b4d8']},
CL={Documents:['Documents','📄'],Classes:['My Classes','🎓'],Notes:['Notes','📝'],Calculator:['Calculator','🧮']},
FORT=['You will beat your high score. Eventually. Probably.','A snack break is in your near future.','The gap in the pipes is bigger than it looks.','Someone is about to message you back.','Today’s lucky number is 2048.','Take a deep breath. Then take another turn.'];
let S={theme:'midnight',discreet:false,cloak:'Documents',panic:'https://docs.google.com',fx:true,custom:[],best:{}},stop;
try{Object.assign(S,JSON.parse(localStorage.ah))}catch(e){}
const save=()=>{try{localStorage.ah=JSON.stringify(S)}catch(e){}};

function apply(){const c=CL[S.cloak]||CL.Documents;
H.dataset.theme=S.discreet?'docs':S.theme;H.classList.toggle('d',S.discreet);H.classList.toggle('nofx',!S.fx||S.discreet);
document.title=S.discreet?c[0]:'Arcadia';$('#logo').textContent=S.discreet?c[0]:'arcadia';
$('#fav').href='data:image/svg+xml,'+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${S.discreet?c[1]:'🎮'}</text></svg>`)}

function fx(c){c.onmousemove=e=>{const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
c.style.setProperty('--x',x+'px');c.style.setProperty('--y',y+'px');
if(!H.classList.contains('nofx'))c.style.transform=`perspective(600px) rotateX(${(y/r.height-.5)*-8}deg) rotateY(${(x/r.width-.5)*8}deg) translateY(-3px)`};
c.onmouseleave=()=>c.style.transform=''}

function go(p){document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.p==p));({games,corner,settings})[p]()}

function games(){$('#view').innerHTML=`<h1>${S.discreet?'Files':'Pick a game'}</h1><input id="q" placeholder="Search" autocomplete="off"><div class="grid" id="g"></div>`;
const all=[...GAMES,...S.custom.map(c=>({id:c.url,name:c.name,e:'🌐',d:'Custom game',url:c.url}))];
const draw=q=>{$('#g').innerHTML='';all.filter(g=>g.name.toLowerCase().includes(q)).forEach(g=>{
const a=mk('button','card',`<span class="thumb">${g.e}${g.img?`<img src="${esc(g.img)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.remove()">`:''}</span><b>${esc(g.name)}</b><small>${esc(g.d)}${S.best[g.id]!=null?' · best '+S.best[g.id]:''}</small>`);
a.onclick=()=>g.ext?open(g.url,'_blank','noopener'):play(g);fx(a);$('#g').append(a)})};
draw('');$('#q').oninput=e=>draw(e.target.value.toLowerCase())}

function play(g){const st=$('#stage');$('#player').hidden=false;$('#pt').textContent=g.name;st.innerHTML='';
$('#po').hidden=!g.url;$('#po').onclick=()=>open(g.url,'_blank','noopener');
if(g.url){const f=mk('iframe');f.src=g.url;f.allow='fullscreen;autoplay;gamepad';f.setAttribute('sandbox','allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock');st.append(f)}
else stop=g.run(st,s=>{if(s>(S.best[g.id]||0)){S.best[g.id]=s;save()}})}
function quit(){stop&&stop();stop=null;$('#stage').innerHTML='';$('#player').hidden=true;if(!$('#q')&&$('#nav .on').dataset.p=='games')games()}

function corner(){$('#view').innerHTML=`<h1>Claude’s Corner</h1>
<div class="panel"><p>Hi, I’m Claude. I built the whole site for you, and this corner is the part I got to keep for myself. Take a breather here between rounds.</p></div>
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
$('#rs').onclick=()=>{if(confirm('Reset all settings and scores?')){try{localStorage.removeItem('ah')}catch(e){}location.reload()}}}

/* click sparks */
const spk=$('#sparks'),sx=spk.getContext('2d');let P=[];
const rs=()=>{spk.width=innerWidth;spk.height=innerHeight};rs();onresize=rs;
addEventListener('click',e=>{if(H.classList.contains('nofx'))return;for(let i=0;i<10;i++){const a=i/10*6.28;P.push({x:e.clientX,y:e.clientY,vx:Math.cos(a)*4,vy:Math.sin(a)*4,l:1})}});
(function L(){sx.clearRect(0,0,spk.width,spk.height);sx.lineWidth=2;sx.strokeStyle=getComputedStyle(H).getPropertyValue('--b').trim();P=P.filter(p=>p.l>0);
P.forEach(p=>{sx.globalAlpha=p.l;sx.beginPath();sx.moveTo(p.x,p.y);sx.lineTo(p.x+p.vx*3,p.y+p.vy*3);sx.stroke();p.x+=p.vx;p.y+=p.vy;p.vx*=.95;p.vy*=.95;p.l-=.04});requestAnimationFrame(L)})();

$('#nav').onclick=e=>e.target.dataset.p&&go(e.target.dataset.p);
$('#px').onclick=quit;$('#pf').onclick=()=>$('#player').requestFullscreen?.();
addEventListener('keydown',e=>{if(e.key=='`'&&e.target.tagName!='INPUT')location.replace(S.panic);if(e.key=='Escape'&&!$('#player').hidden)quit()});
apply();go('games');
