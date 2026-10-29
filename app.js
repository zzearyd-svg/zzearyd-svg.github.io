const $=s=>document.querySelector(s),H=document.documentElement,
esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';'),
mk=(t,c,h)=>{const e=document.createElement(t);e.className=c||'';e.innerHTML=h||'';return e},
TH={midnight:['#8b6bff','#2fd6f5'],neon:['#ff2bd6','#00ffa3'],sunset:['#ff6b4a','#ffc14a'],forest:['#34d399','#a3e635'],light:['#5b6cff','#00b4d8'],nebula:['#a855f7','#ec4899'],matrix:['#00c853','#39ff7a'],synth:['#ff2a6d','#05d9e8'],ember:['#ff6a00','#ffd000']},THBG={nebula:'galaxy',matrix:'matrix',synth:'dots',ember:'particles'},
CL={Documents:['Documents','doc'],Classes:['My Classes','grad'],Notes:['Notes','pencil'],Calculator:['Calculator','calc']},
FORT=['You will beat your high score. Eventually. Probably.','A snack break is in your near future.','The gap in the pipes is bigger than it looks.','Someone is about to message you back.','Today’s lucky number is 2048.','Take a deep breath. Then take another turn.'];
let S={theme:'midnight',discreet:false,cloak:'Documents',panic:'https://docs.google.com',fx:false,custom:[],best:{},fav:[],recent:[],thumbs:true,cont:true,calm:false,size:'normal',text:'normal',per:'120',sort:'pop',mobonly:false,autobar:false,awake:false,pkey:'`',pbtn:false,ctitle:'',ca:'#8b6bff',cb:'#2fd6f5',time:0,plays:{},bg:'default'},stop;
try{Object.assign(S,JSON.parse(localStorage.nd))}catch(e){}
const save=()=>{try{localStorage.nd=JSON.stringify(S)}catch(e){}};

const IC={
flag:'<path d="M5 21V4M5 4h11l-1.5 4L16 12H5"/>',reply:'<path d="M9 7L4 12l5 5M4 12h10a6 6 0 016 6"/>',fish:'<path d="M3 12c3-5 9-6 13-3l5-2v10l-5-2c-4 3-10 2-13-3z"/><path d="M8 11.5h.01"/>',ghost:'<path d="M5 20V11a7 7 0 0114 0v9l-2.3-2-2.4 2-2.3-2-2.4 2-2.3-2z"/><path d="M9.5 11h.01M14.5 11h.01"/>',moon:'<path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"/>',wand:'<path d="M5 19L15 9M14 4l1 2.5 2.5 1-2.5 1L14 11l-1-2.5-2.5-1 2.5-1zM19 13l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z"/>',headphones:'<path d="M4 15v-3a8 8 0 0116 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',rocket:'<path d="M12 3c3.5 2 5 6 4 11l-4 3-4-3c-1-5 .5-9 4-11z"/><circle cx="12" cy="10" r="1.5"/><path d="M8 15l-3 3 3 .5M16 15l3 3-3 .5"/>',key:'<circle cx="8" cy="14" r="3.5"/><path d="M10.5 11.5L20 4M16 8l2 2M18 6l2 2"/>',cube:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5L12 12l8-4.5M12 12v9"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',trophy:'<path d="M8 4h8v5a4 4 0 01-8 0zM8 6H5v1a3 3 0 003 3M16 6h3v1a3 3 0 01-3 3M12 13v4M8.5 20h7M10 17h4"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6L7 7M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/>',bolt:'<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>',chat:'<path d="M4 5.5h16v11H12l-4.5 3.5v-3.5H4z"/><path d="M8 10h8M8 13h5"/>',chevl:'<path d="M14.5 6l-6 6 6 6"/>',chevr:'<path d="M9.5 6l6 6-6 6"/>',
gamepad:'<rect x="2" y="7" width="20" height="11" rx="5.5"/><path d="M7 10.5v4M5 12.5h4"/><path d="M16 11.5h.01M18.5 14h.01"/>',
bag:'<path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-5.5 6.5-5.5s6.5 1.9 6.5 5.5"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17.5 14.5c2.8 0 4.5 1.6 4.5 4.5"/>',
user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.2 3.6-6.5 8-6.5s8 2.3 8 6.5"/>',
sliders:'<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',
heart:'<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>',
clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
phone:'<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
dice:'<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M8.5 8.5h.01M15.5 8.5h.01M12 12h.01M8.5 15.5h.01M15.5 15.5h.01"/>',
coin:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/>',
crown:'<path d="M3.5 18.5h17M4.5 7.5l4 4 3.5-6 3.5 6 4-4-1.5 11h-12z"/>',
shield:'<path d="M12 3l7.5 3v5.5c0 4.7-3.2 7.8-7.5 9.5-4.3-1.7-7.5-4.8-7.5-9.5V6z"/>',
ban:'<circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/>',
mega:'<path d="M4 10v4h3l6 4V6L7 10z"/><path d="M16.5 9.5a3.5 3.5 0 0 1 0 5"/>',
gift:'<rect x="3.5" y="8.5" width="17" height="4" rx="1"/><path d="M5 12.5V20h14v-7.5M12 8.5V20"/><path d="M12 8.5C9 8.5 7 7 8 5.5S11.5 5.5 12 8.5zM12 8.5c3 0 5-1.5 4-3S12.5 5.5 12 8.5z"/>',
up:'<path d="M12 19V5M5.5 11.5L12 5l6.5 6.5"/>',
x:'<path d="M6 6l12 12M18 6L6 18"/>',
refresh:'<path d="M19.5 12a7.5 7.5 0 1 1-2.3-5.4"/><path d="M19.5 4v4.5H15"/>',
max:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
ext:'<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
chevup:'<path d="M6 14.5l6-6 6 6"/>',
chevdown:'<path d="M6 9.5l6 6 6-6"/>',
link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
globe:'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17"/>',
paw:'<circle cx="7" cy="10" r="1.8"/><circle cx="11" cy="6.5" r="1.8"/><circle cx="15.5" cy="6.5" r="1.8"/><circle cx="19" cy="10" r="1.8"/><path d="M12 12c-3.3 0-6 3-6 5.5 0 2 1.8 3 3.8 2.4 1.5-.4 2.9-.4 4.4 0 2 .6 3.8-.4 3.8-2.4C18 15 15.3 12 12 12z"/>',
cap:'<path d="M3.5 15c0-5 3.8-8.5 8.5-8.5s8.5 3.5 8.5 8.5zM2.5 15.5h19M12 6.5V4"/>',
flask:'<path d="M9.5 3h5M10.5 3v6L5 18.5a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3L13.5 9V3M7.5 15h9"/>',
gem:'<path d="M7 4h10l4 5-9 11L3 9z"/><path d="M3 9h18M9.5 4L8 9l4 11 4-11-1.5-5"/>',
orb:'<circle cx="12" cy="11" r="7.5"/><path d="M8 8.5a5 5 0 0 1 4-2M7 20h10"/>',
flame:'<path d="M12 3c.5 3.5 4.5 5 4.5 10a4.5 4.5 0 0 1-9 0c0-2 1-3 2-4 .2 1.5 1 2.5 2 2.5C11 9 10.5 6 12 3z"/>',
box:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
inbox:'<path d="M3 13l3-8h12l3 8v6H3zM3 13h5l1 3h6l1-3h5"/>',
check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
doc:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
grad:'<path d="M2.5 9L12 4.5 21.5 9 12 13.5z"/><path d="M6 11v5c0 1.5 2.5 3 6 3s6-1.500 6-3v-5"/>',
pencil:'<path d="M4 20l1-4L16.5 4.5a2 2 0 0 1 3 3L8 19z"/>',
calc:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8.5 7.5h7M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01"/>'};
const ico=(n,s=18,x='')=>`<svg class="ic ${x}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n]||IC.gamepad}</svg>`;
const FAVN='data:image/svg+xml,'+encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#8b6bff'/><stop offset='1' stop-color='#2fd6f5'/></linearGradient></defs><rect width='64' height='64' rx='16' fill='url(#g)'/><text x='32' y='46' font-size='38' font-family='Arial' font-weight='700' text-anchor='middle' fill='#fff'>N</text></svg>");
const BGM=()=>S.bg=='default'?(THBG[S.theme]||'aurora'):S.bg;
function apply(){const c=CL[S.cloak]||CL.Documents,t=S.ctitle||c[0],cu=S.theme=='custom'&&!S.discreet;
H.dataset.theme=S.discreet?'docs':S.theme;
['--a','--b'].forEach((k,i)=>cu?H.style.setProperty(k,[S.ca,S.cb][i]):H.style.removeProperty(k));
H.classList.toggle('d',S.discreet);H.classList.toggle('nofx',!S.fx||S.discreet);H.classList.toggle('calm',S.calm);
H.dataset.size=S.size;H.dataset.text=S.text;H.dataset.bg=BGM();$('#panic').hidden=!S.pbtn;
document.title=S.discreet?t:'NullDen: Free Online Browser Games, No Download';$('#logo').textContent=S.discreet?t:'NullDen';
$('#fav').href=S.discreet?'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='-5 -5 34 34'><rect x='-5' y='-5' width='34' height='34' rx='7' fill='#fff'/><g fill='none' stroke='#1a73e8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>${IC[c[1]]}</g></svg>`):FAVN;
const DN={games:'Files',forum:'Shared',shop:'Templates',players:'People',account:'Account',settings:'Settings'};document.querySelectorAll('#nav button').forEach(b=>{const n=b.lastChild;if(n&&n.nodeType==3){b.dataset.o=b.dataset.o||n.textContent;n.textContent=S.discreet?DN[b.dataset.p]:b.dataset.o}});setTimeout(()=>{try{movePill()}catch(e){}});const mt=document.querySelector('meta[name=theme-color]');if(mt)mt.content=S.discreet?'#ffffff':'#0a0c1c';
startBg()}
function fx(c){c.onmousemove=e=>{const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
c.style.setProperty('--x',x+'px');c.style.setProperty('--y',y+'px');
if(!H.classList.contains('nofx'))c.style.transform=`perspective(600px) rotateX(${(y/r.height-.5)*-8}deg) rotateY(${(x/r.width-.5)*8}deg) translateY(-3px)`};
c.onmouseleave=()=>c.style.transform=''}

function go(p){clearInterval(FT);document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.p==(p=='trades'?'shop':p)));requestAnimationFrame(()=>{try{movePill()}catch(e){}});({games:home,forum,trades,corner,settings,shop,account,players,admin,appeals})[p]();const vw=$('#view');vw.classList.remove('vin');void vw.offsetWidth;vw.classList.add('vin');const h=$('#view h1');if(h&&!h.children.length&&!H.classList.contains('nofx')&&!H.classList.contains('calm'))blurIn(h)}

const CLID='p_27841169-43c3-4a47-aacd-af9abd43a2a3',IMG='https://static.playgama.com/p-img/pg/',
PG=typeof CAT!='undefined'?CAT.map(c=>({id:'pg:'+c[0],name:c[1],g:c[3],d:c[3].split(',').slice(0,2).map(s=>s.replace(/-/g,' ')).join(' · '),img:c[2]?IMG+c[2]+'?width=448':'',m:c[4],url:c[5]||'https://playgama.com/export/game/'+c[0]+'?clid='+CLID})):[];
const GC={};PG.forEach(g=>g.g.split(',').forEach(x=>x&&(GC[x]=(GC[x]||0)+1)));
const CHIPS=Object.keys(GC).filter(x=>x!='mobile').sort((a,b)=>GC[b]-GC[a]).slice(0,24),PER=()=>+S.per||120;
let chip='All',shown=PER();

const card=g=>{const pg=/^(pg|gm):/.test(g.id),tag=pg?(g.g.split(',')[0]||'').replace(/-/g,' '):g.ext?'Link':g.d=='Custom game'?'Custom':'Classic',
img=g.img&&S.thumbs?`<img src="${esc(g.img)}" alt="" loading="lazy" referrerpolicy="no-referrer" onload="this.classList.add('ok')" onerror="this.remove()">`:'';
const a=mk('button','card'+(pg?'':' cl'),`<span class="thumb">${ico(g.i||'gamepad',30,'fb')}${img}${tag?`<i class="tag">${esc(tag)}</i>`:''}</span>${g.ext?'':`<span class="hrt${S.fav.includes(g.id)?' on':''}">${ico('heart',15)}</span>`}<b>${esc(g.name)}</b><small>${esc(g.d)}</small>`);
a.onclick=e=>{const h=e.target.closest('.hrt');if(h)return toggleFav(g.id,h);g.ext?open(g.url,'_blank','noopener'):play(g)};fx(a);return a};
let IO;
function games(c0,q0){if(c0)chip=c0;const v=$('#view');clearInterval(RT);IO&&IO.disconnect();
const CH=[['All','All','All'],['Favorites',ico('heart',15)+' Favorites','Favorites'],['Recent',ico('clock',15)+' Recent','Recent'],['Mobile',ico('phone',15)+' Phone-ready','Phone-ready'],['Classics','Classics','Classics'],['GM','GameMonetize','GameMonetize'],...CHIPS.map(x=>{const n=x.replace(/-/g,' ');return[x,n,n]})];
v.innerHTML=`<section class="hero"><h1>${S.discreet?'Files':'Play <span class="rot" id="rot"></span>'}</h1><p class="sub"><b id="cnt">0</b> games ready<button class="surp sb" id="sur">${ico('dice',16)} Surprise me</button></p></section><div class="row top"><input id="q" placeholder="${S.discreet?'Search':(matchMedia('(hover:none)').matches?'Search games':'Search games (press / )')}" autocomplete="off"><select id="so">${[['pop','Popular'],['az','A to Z'],['za','Z to A'],['shuf','Shuffle']].map(o=>`<option value="${o[0]}"${S.sort==o[0]?' selected':''}>${o[1]}</option>`).join('')}</select></div><div class="chips">${CH.map(c=>`<button data-c="${c[0]}" class="${c[0]==chip?'on':''}">${c[1]}</button>`).join('')}</div><section id="cw" hidden><h2 class="sh">Continue playing</h2><div class="strip" id="st"></div></section><p class="rc" id="rc"></p><div class="grid" id="g"></div><button class="btn" id="more">Show more</button>`;
if(q0!=null){const i=$('#q');i.value=q0;i.focus()}
v.querySelector('.hero').insertAdjacentHTML('afterbegin','<button class="surp bk" id="bk">'+ico('chevl',14)+' All games</button>');$('#bk').onclick=()=>go('games');
const all=ALL(),rk=new Map(all.map(g=>[g.id,Math.random()])),real=all.filter(g=>!g.ext);
if($('#rot'))RT=S.calm?($('#rot').textContent='games',0):rotText($('#rot'),['puzzles','racers','shooters','idle games','arcade hits','3D worlds'],2200);
countUp($('#cnt'),real.length);
let list=[],rendered=0;
const ok=g=>!(S.mobonly&&g.id.startsWith('pg:')&&!g.m)&&(chip=='All'||(chip=='Favorites'?S.fav.includes(g.id):chip=='Recent'?S.recent.includes(g.id):chip=='Mobile'?!!g.m:chip=='GM'?g.id.startsWith('gm:'):chip=='Classics'?!/^(pg|gm):/.test(g.id):(g.g||'').split(',').includes(chip)));

const more=()=>{const g=$('#g');list.slice(rendered,shown).forEach((x,k)=>{const c=card(x);c.style.animationDelay=Math.min(k,28)*18+'ms';g.append(c)});rendered=Math.min(shown,list.length);$('#more').hidden=rendered>=list.length;$('#more').textContent='Show more ('+(list.length-rendered)+' left)'};
const fill=()=>{while(!$('#more').hidden&&$('#more').getBoundingClientRect().top<innerHeight+800){shown+=PER();more()}};
const build=()=>{const q=$('#q').value.toLowerCase().trim();list=all.filter(g=>g.name.toLowerCase().includes(q)&&ok(g));
if(chip=='Recent')list.sort((x,y)=>S.recent.indexOf(x.id)-S.recent.indexOf(y.id));
else if(S.sort=='az')list.sort((x,y)=>x.name.localeCompare(y.name));else if(S.sort=='za')list.sort((x,y)=>y.name.localeCompare(x.name));else if(S.sort=='shuf')list.sort((x,y)=>rk.get(x.id)-rk.get(y.id));
const rec=S.cont&&chip=='All'&&!q?S.recent.map(id=>all.find(g=>g.id==id)).filter(Boolean).slice(0,8):[];
$('#cw').hidden=!rec.length;$('#st').innerHTML='';rec.forEach(g=>$('#st').append(card(g)));
const lab=(CH.find(c=>c[0]==chip)||[0,0,chip])[2];
$('#rc').innerHTML=chip!='All'||q?`${list.length.toLocaleString()} games${chip!='All'?' in '+esc(lab):''}${q?' matching “'+esc(q)+'”':''}<button id="clr">Clear</button>`:'';
rendered=0;$('#g').innerHTML=list.length?'':'<small>'+(chip=='Favorites'?'No favorites yet. Tap the heart on a game.':chip=='Recent'?'Games you play will show up here.':'No games found.')+'</small>';more()};
const sync=()=>v.querySelectorAll('.chips button').forEach(b=>b.classList.toggle('on',b.dataset.c==chip));
$('#sur').onclick=()=>{const p=(list.length?list:all).filter(g=>!g.ext);play(p[Math.random()*p.length|0])};
v.querySelector('.chips').onclick=e=>{const b=e.target.closest('button');if(!b)return;chip=b.dataset.c;shown=PER();sync();b.scrollIntoView({inline:'center',block:'nearest',behavior:'smooth'});build()};
$('#rc').onclick=e=>{if(e.target.id=='clr'){chip='All';$('#q').value='';shown=PER();sync();build()}};
$('#so').onchange=()=>{S.sort=$('#so').value;save();shown=PER();build()};
$('#q').oninput=()=>{shown=PER();build()};
$('#more').onclick=()=>{shown+=PER();more()};
IO=new IntersectionObserver(es=>{if(es[0].isIntersecting)fill()},{rootMargin:'800px'});IO.observe($('#more'));
shown=PER();build()}
function play(g){const st=$('#stage');$('#player').hidden=false;$('#player').classList.remove('min');startEarn();startSession(g);$('#pt').textContent=S.discreet?(S.ctitle||(CL[S.cloak]||CL.Documents)[0]):g.name;if(!g.ext){S.recent=[g.id,...S.recent.filter(x=>x!=g.id)].slice(0,12);save()}$('#pl').onclick=()=>{const u=(!g.ext&&API&&/^[A-Za-z0-9:_.\-]{1,120}$/.test(g.id))?API.replace(/\/+$/,'')+'/g?id='+encodeURIComponent(g.id)+'&n='+encodeURIComponent(g.name)+(g.img?'&i='+encodeURIComponent(g.img.split('?')[0]):''):location.href.split('#')[0]+'#'+encodeURIComponent(g.id);navigator.clipboard&&navigator.clipboard.writeText(u);toast('Link copied')};st.innerHTML='';
$('#pb').onclick=()=>fbDlg({t:'compat',game:g.name});$('#po').hidden=!g.url;$('#po').onclick=()=>open(g.url,'_blank','noopener');
if(g.url){const f=mk('iframe');f.src=g.url;f.allow='fullscreen;autoplay;gamepad;accelerometer;gyroscope;clipboard-write;encrypted-media;picture-in-picture';f.setAttribute('sandbox',/^gm:/.test(g.id)?'allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-modals allow-presentation allow-orientation-lock':'allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock allow-modals allow-popups-to-escape-sandbox allow-presentation allow-orientation-lock');st.append(f)}
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
<div class="panel"><h3>Display</h3>${Sl('size','Card size',[['compact','Compact'],['normal','Normal'],['large','Large']])}${Sl('text','Text size',[['small','Small'],['normal','Normal'],['large','Large']])}${Sl('per','Games per page',[['60','60'],['120','120'],['240','240']])}${Sl('bg','Background',[['default','Theme default'],['aurora','Aurora'],['particles','Particles'],['dots','Dot grid'],['galaxy','Galaxy'],['matrix','Matrix rain'],['none','None']])}${T('thumbs','Show game images')}${T('cont','Show “Continue playing” on the home page')}${T('fx','Animated background, tilt and click sparks')}${T('calm','Reduce motion')}<div class="row"><button id="inst" hidden>Install NullDen as an app</button><small>On iPhone: Share, then Add to Home Screen.</small></div></div>
<div class="panel"><h3>Games</h3>${T('mobonly','Only show Playgama games that work on phones')}${T('autobar','Hide the top bar when a game starts')}${T('awake','Keep the screen on while playing')}</div>
<div class="panel"><h3>Discreet mode</h3>${T('discreet','Plain look, fake tab title and icon, no effects')}${Sl('cloak','Tab disguise',Object.keys(CL).map(c=>[c,c]))}<label class="row">Custom tab title <input data-k="ctitle" value="${esc(S.ctitle)}" maxlength="30" placeholder="Optional"></label><label class="row">Panic key <input id="pk" readonly value="${esc(S.pkey)}" size="6"> <small>click it, then press a key</small></label><label class="row">Panic jumps to <input id="pu" value="${esc(S.panic)}" size="28"></label>${T('pbtn','Show an on-screen panic button')}</div>
<div class="panel"><h3>Add a game</h3><div class="row"><input id="cn" placeholder="Name"><input id="cu" placeholder="https://example.com/game" size="28"><button class="btn" id="ca">Add game</button></div><small>Works with any page that allows embedding in an iframe.</small>${S.custom.map((c,i)=>`<div class="row"><b>${esc(c.name)}</b><small>${esc(c.url)}</small><button data-x="${i}">Remove</button></div>`).join('')}</div>
${achPanel()}<div class="panel"><h3>Help</h3><p>Answers about Nullbux, trading, the forums and fixing games are in the <a href="faq.html" target="_blank" rel="noopener">FAQ</a>. Not covered? <a href="#feedback">Send feedback</a>.</p></div><div class="panel"><h3>Your stats</h3><p>Play time <b>${hh}h ${mm}m</b> · Games played <b>${Object.keys(S.plays).length}</b> · Favorites <b>${S.fav.length}</b></p></div>
<div class="panel"><h3>Backup and data</h3><div class="row"><button id="ex">Copy backup</button><button id="im">Restore backup</button><button id="cr">Clear recent</button><button id="cf">Clear favorites</button></div></div>
<div class="panel"><h3>Shortcuts</h3><p><kbd>/</kbd> search · <kbd>Esc</kbd> close a game · <kbd>${esc(S.pkey)}</kbd> panic</p></div>
<div class="panel"><button class="btn" id="rs">Reset everything</button></div>
<p class="credit">Made by Nathan (zearyd) and some help with Claude :)</p>`;
const sync=()=>v.querySelectorAll('[data-t]').forEach(b=>b.classList.toggle('on',b.dataset.t==S.theme));
v.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{S.theme=b.dataset.t;if(S.bg!='default'&&THBG[S.theme]){S.bg=THBG[S.theme];const bs=v.querySelector('select[data-k=bg]');if(bs)bs.value=S.bg}save();apply();sync()});
v.oninput=e=>{const t=e.target,k=t.dataset.k;if(!k)return;S[k]=t.type=='checkbox'?t.checked:t.value;if(k=='ca'||k=='cb')S.theme='custom';save();apply();sync()};
const pk=$('#pk');pk.onfocus=()=>pk.value='press a key';pk.onblur=()=>pk.value=S.pkey;pk.onkeydown=e=>{e.preventDefault();if(e.key=='Tab'||e.key=='Escape')return pk.blur();S.pkey=e.key;save();pk.blur()};
$('#pu').onchange=e=>{const u=e.target.value.trim();S.panic=/^https?:\/\//.test(u)?u:'https://'+u;save()};
$('#ca').onclick=()=>{const n=$('#cn').value.trim(),u=$('#cu').value.trim();if(n&&/^https?:\/\//.test(u)){S.custom.push({name:n,url:u});save();settings()}};
v.querySelectorAll('[data-x]').forEach(b=>b.onclick=()=>{S.custom.splice(b.dataset.x,1);save();settings()});
if(DEF){$('#inst').hidden=false;$('#inst').onclick=()=>DEF.prompt()}
const KEYS=['theme','discreet','cloak','panic','fx','custom','best','fav','recent','thumbs','cont','calm','size','text','per','mobonly','autobar','awake','pkey','pbtn','ctitle','ca','cb','time','plays','bg','ach'];
$('#ex').onclick=()=>{const c=btoa(unescape(encodeURIComponent(JSON.stringify(S))));navigator.clipboard?navigator.clipboard.writeText(c).then(()=>toast('Backup copied')).catch(()=>prompt('Copy your backup code',c)):prompt('Copy your backup code',c)};
$('#im').onclick=()=>{const c=prompt('Paste your backup code');if(!c)return;try{const d=JSON.parse(decodeURIComponent(escape(atob(c.trim()))));KEYS.forEach(k=>{if(k in d)S[k]=d[k]});
if(!TH[S.theme]&&S.theme!='custom')S.theme='midnight';if(!['default','aurora','particles','dots','galaxy','matrix','none'].includes(S.bg))S.bg='default';if(!/^https?:\/\//.test(S.panic))S.panic='https://docs.google.com';
S.custom=(Array.isArray(S.custom)?S.custom:[]).filter(x=>x&&typeof x.name=='string'&&/^https?:\/\//.test(x.url));['fav','recent'].forEach(k=>{if(!Array.isArray(S[k]))S[k]=[]});
['ca','cb'].forEach(k=>{if(!/^#[0-9a-f]{6}$/i.test(S[k]))S[k]='#8b6bff'});['plays','best'].forEach(k=>{if(!S[k]||typeof S[k]!='object')S[k]={}});S.time=+S.time||0;
save();apply();settings();toast('Backup restored')}catch(e){toast('That backup code didn’t work')}};
$('#cr').onclick=()=>{S.recent=[];save();toast('Recent games cleared')};$('#cf').onclick=()=>{S.fav=[];save();toast('Favorites cleared')};
$('#rs').onclick=()=>{if(confirm('Reset all settings, favorites and your sign-in on this device?')){try{['nd','nd_terms','nd_key','nd_tok'].forEach(k=>localStorage.removeItem(k));sessionStorage.removeItem('nd_tok')}catch(e){}location.reload()}}}
const API='https://nullden.zzearyd.workers.dev/';  /* paste your relay URL here, no trailing slash (see worker.js) */
/* React Bits style effects, in plain JS */
let RT;
function rotText(el,w,ms){let i=0;const t=()=>{el.textContent=w[i++%w.length];el.classList.remove('in');void el.offsetWidth;el.classList.add('in')};t();return setInterval(t,ms)}
function countUp(el,to){const s=performance.now(),f=n=>{const p=Math.min(1,(n-s)/1200);el.textContent=Math.round(to*(1-Math.pow(1-p,3))).toLocaleString();if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)}
function scramble(el){const t=el.textContent,C='!<>-_\\/[]{}=+*^?#',s=performance.now(),f=n=>{const p=(n-s)/700;if(p>=1)return el.textContent=t;el.textContent=[...t].map((c,i)=>c==' '||i<p*t.length?c:C[Math.random()*C.length|0]).join('');requestAnimationFrame(f)};requestAnimationFrame(f)}
function toggleFav(id,el){const i=S.fav.indexOf(id);i<0?S.fav.push(id):S.fav.splice(i,1);el.classList.toggle('on',i<0);save()}


/* Accounts and Nullbux (need the relay: see worker.js) */
let ME=null,TOK='',EI;try{TOK=localStorage.nd_tok||sessionStorage.nd_tok||''}catch(e){}
function toast(t){let e=$('#toast');if(!e){e=mk('div');e.id='toast';document.body.append(e)}e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),2400)}
function setMe(m){setTimeout(()=>{try{ping();dailyDot();checkAch()}catch(e){}});const o=ME?ME.nb:null;ME=m;$('#bux').innerHTML=m?(m.role=='owner'?ico('crown',16)+' ':'')+ico('coin',16)+' '+m.nb.toLocaleString():'Log in';const st=$('#stf');st.hidden=!isStaff(m);st.innerHTML=isStaff(m)?ico('shield',18):'';if(m&&o!==null&&o!==m.nb){const b=$('#bux');b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')}renderNotes()}
async function api(p,b,auth=1){if(!API)throw new Error('Accounts are not set up on this site yet.');
const r=await fetch(API.replace(/\/+$/,'')+p,{method:b?'POST':'GET',headers:{...(b?{'content-type':'application/json'}:{}),...(TOK&&auth?{authorization:'Bearer '+TOK}:{})},body:b?JSON.stringify(b):undefined});
const j=await r.json().catch(()=>({}));if(!r.ok){const e=new Error(j.error||'Something went wrong');e.needKey=j.needKey;e.banned=j.banned;throw e}return j}
function startEarn(){clearInterval(EI);if(ME)EI=setInterval(()=>{if(document.visibilityState=='visible')api('/earn',{}).then(j=>setMe(j.me)).catch(()=>{})},300000)}
function account(){const v=$('#view');
if(ME){v.innerHTML=`<div class="acch">${avHtml(ME.av,ME.u,'lg')}<div><h1>${esc(ME.u)}${badge(ME.role)}</h1><button class="surp" id="avb">${ico('user',14)} Change avatar</button></div></div><div class="panel"><h3>Nullbux</h3><p class="big">${ico('coin',30)} ${ME.nb.toLocaleString()}</p><small>Daily streak: ${ME.streak}. Earn Nullbux with the daily reward and by playing games: 2 per minute, paid out every 5 minutes, up to 300 a day.</small><div class="row"><button class="btn" id="dl"${ME.canDaily?'':' disabled'}>${ME.canDaily?'Claim daily reward':'Claimed. Come back tomorrow'}</button><button id="lo">Log out</button></div></div><div class="panel"><h3>Privacy</h3><label class="row"><input type="checkbox" id="pp"${ME.pub?' checked':''}> Public profile: other players can see my Nullbux, inventory and recent games</label></div>${isStaff(ME)?'<div class="panel"><h3>Staff tools</h3><div class="row"><button class="btn" id="ad">Admin menu</button><button id="tap">Appeals</button></div></div>':''}`;
$('#dl').onclick=async()=>{try{const j=await api('/daily',{});setMe(j.me);toast('+'+j.gain+' Nullbux');account()}catch(e){toast(e.message)}};
$('#lo').onclick=()=>{TOK='';try{localStorage.removeItem('nd_tok');sessionStorage.removeItem('nd_tok')}catch(e){}clearInterval(EI);setMe(null);account()};
$('#pp').onchange=async e=>{try{const j=await api('/privacy',{pub:e.target.checked});setMe(j.me)}catch(x){toast(x.message)}};
if($('#avb'))$('#avb').onclick=avDlg;if($('#ad'))$('#ad').onclick=()=>go('admin');if($('#tap'))$('#tap').onclick=()=>go('appeals');return}
v.innerHTML=`<h1>Account</h1><div class="panel"><h3>Log in or sign up</h3><div class="row"><input id="au" placeholder="Username" autocomplete="username" maxlength="16"></div><div class="row"><input id="ap" type="password" placeholder="Password (6+ characters)" autocomplete="current-password"></div><div class="row" id="kr" hidden><input id="ak" type="password" placeholder="Owner key" autocomplete="off"></div><label class="row"><input type="checkbox" id="rm"> Remember me on this device</label><div class="row"><button class="btn" id="li">Log in</button><button id="su">Sign up</button></div><small id="am">New accounts start with 100 Nullbux. There’s no email, so no password reset: don’t reuse a real password.</small><div id="apl" hidden><h3>Appeal this ban</h3><div class="row"><textarea id="apm" maxlength="500" placeholder="Tell staff why the ban should be lifted"></textarea></div><div class="row"><button class="btn" id="aps">Send appeal</button></div></div></div>`;
const send=async p=>{try{const rm=$('#rm').checked,j=await api(p,{u:$('#au').value,p:$('#ap').value,remember:rm,key:$('#ak').value},0);TOK=j.token;try{(rm?localStorage:sessionStorage).nd_tok=TOK;(rm?sessionStorage:localStorage).removeItem('nd_tok')}catch(e){}setMe(j.me);account()}catch(e){$('#am').textContent=e.message;if(e.needKey)$('#kr').hidden=false;if(e.banned)$('#apl').hidden=false}};
$('#li').onclick=()=>send('/login');$('#su').onclick=()=>send('/signup');
$('#aps').onclick=async()=>{try{await api('/appeal',{u:$('#au').value,p:$('#ap').value,msg:$('#apm').value},0);$('#am').textContent='Appeal sent. Staff will review it.';$('#apl').hidden=true}catch(e){$('#am').textContent=e.message}}}
async function shop(){const v=$('#view');
if(!ME){v.innerHTML='<h1>Shop</h1><div class="panel"><p>Log in to buy and sell items with Nullbux.</p><button class="btn" id="gl">Log in or sign up</button></div>';$('#gl').onclick=()=>go('account');return}
v.innerHTML='<h1>Shop</h1><p class="sub">Loading…</p>';let s;
try{s=await api('/shop',0,0)}catch(e){v.innerHTML='<h1>Shop</h1><div class="panel"><p>'+esc(e.message)+'</p></div>';return}
const act=async(p,id)=>{try{const j=await api(p,{id});setMe(j.me);if(j.msg)toast(j.msg);draw()}catch(e){toast(e.message)}};
let cat='All';const CATS=[['All','All'],['deal','Deals'],['pets','Pets'],['gear','Gear'],['treasure','Treasures'],['fun','Fun'],['crates','Crates']];
const draw=()=>{const real=s.items.filter(i=>i.c!='crates'),inv=real.filter(i=>ME.inv[i.id]),list=s.items.filter(i=>cat=='All'||(cat=='deal'?i.d:i.c==cat)).sort((a,b)=>(a.c=='crates')-(b.c=='crates')||a.p-b.p);
v.innerHTML=`<h1>Shop</h1><p class="sub">Balance <b>${ico('coin',16)} ${ME.nb.toLocaleString()}</b> · prices and deals change every day · <a href="faq.html#how-shop-works" target="_blank" rel="noopener">How it works</a> <button class="surp" id="trd">${ico('users',14)} Trades</button></p><div class="chips" id="sc">${CATS.map(c=>`<button data-c="${c[0]}"${c[0]==cat?' class="on"':''}>${c[1]}</button>`).join('')}</div><div class="items">${list.map(i=>`<div class="item ${i.r}"><span class="ie">${ico(i.ic,40)}</span><b>${esc(i.n)}</b><small>${i.r=='crate'?'random item':i.r}${ME.inv[i.id]?' · owned ×'+ME.inv[i.id]:''}</small>${i.d?'<em class="deal">-25%</em>':''}<button class="btn" data-b="${i.id}"${ME.nb<i.p?' disabled':''}>${ico('coin',14)} ${i.d?'<s>'+i.o+'</s> ':''}${i.p}</button></div>`).join('')||'<small>No deals today.</small>'}</div><h2 class="sh">Your inventory <small>${inv.length} of ${real.length} collected</small></h2><div class="items">${inv.length?inv.map(i=>`<div class="item ${i.r}${ME.eq==i.id?' eq':''}"><span class="ie">${ico(i.ic,40)}</span><b>${esc(i.n)} ×${ME.inv[i.id]}</b><button class="btn alt" data-e="${i.id}">${ME.eq==i.id?'Unequip':'Equip'}</button><button class="btn alt" data-s="${i.id}">Sell · ${ico('coin',14)} ${i.s}</button></div>`).join(''):'<small>Nothing yet. Buy something above!</small>'}</div>`;
$('#trd').onclick=()=>go('trades');v.querySelector('#sc').onclick=e=>{const b=e.target.closest('[data-c]');if(b){cat=b.dataset.c;draw()}};
v.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>act('/buy',b.dataset.b));v.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>act('/sell',b.dataset.s));v.querySelectorAll('[data-e]').forEach(b=>b.onclick=()=>act('/equip',b.dataset.e))};
draw()}
/* Players, owner admin panel, announcements and giveaways */
let ITM=null,ST={a:null,g:null};
async function items(){if(!ITM){const s=await api('/shop',0,0);ITM={};s.items.forEach(i=>ITM[i.id]=i)}return ITM}
const RK=r=>({owner:4,admin:3,manager:2,moderator:1,staff:1})[r]||0,ROLEN={owner:'Owner',admin:'Admin',manager:'Manager',moderator:'Moderator',staff:'Moderator'},RI={owner:'crown',admin:'shield',manager:'users',moderator:'check',staff:'check'};
const isStaff=m=>!!m&&RK(m.role)>=1;
const badge=r=>RK(r)?' <span class="own r'+RK(r)+'">'+ico(RI[r]||'shield',14)+ROLEN[r]+'</span>':'';
async function loadStatus(){if(!API)return;try{ST=await api('/status',0,0);renderNotes()}catch(e){}}
function renderNotes(){const n=$('#notes');if(!n)return;const a=ST.a,g=ST.g;let h='';
if(a&&a.id!=(S.ann|0))h+=`<div class="note"><span>${ico('mega',18)} ${esc(a.text)}</span><button data-n="a" title="Dismiss">${ico('x',16)}</button></div>`;
if(g&&g.ends>Date.now())h+=`<div class="note gift sb"><span>${ico('gift',18)} ${esc(g.title)}: claim <b>${g.amount.toLocaleString()}</b> Nullbux</span>${ME&&ME.gv==g.id?'<small>Claimed</small>':`<button class="btn" data-n="g">${ME?'Claim':'Log in to claim'}</button>`}</div>`;
n.innerHTML=h;
n.onclick=async e=>{const k=(e.target.closest('[data-n]')||{dataset:{}}).dataset.n;if(k=='a'){S.ann=a.id;save();renderNotes()}if(k=='g'){if(!ME)return go('account');try{const j=await api('/giveaway/claim',{});setMe(j.me);toast('+'+j.gain.toLocaleString()+' Nullbux')}catch(x){toast(x.message)}}}}
let PU='';
function players(){const v=$('#view');
if(!ME){v.innerHTML='<h1>Players</h1><div class="panel"><p>Log in to search players and see their profiles.</p><button class="btn" id="gl">Log in or sign up</button></div>';$('#gl').onclick=()=>go('account');return}
v.innerHTML='<h1>Players</h1><h2 class="sh">Online now</h2><div id="on2" class="plist"><small>Loading…</small></div><h2 class="sh">Find a player</h2><div class="row"><input id="pq" placeholder="Search usernames" autocomplete="off" maxlength="16"></div><div id="plist" class="plist"></div><div id="pv"></div>';
const chip=x=>`<button class="pchip" data-u="${esc(x.u)}">${avHtml(x.av,x.u,'sm')}${x.on?'<span class="dot s"></span>':''}${esc(x.u)}${badge(x.role)}${x.banned?' '+ico('ban',14):''}</button>`;
api('/online').then(j=>{$('#on2').innerHTML=j.users.length?j.users.map(x=>chip({...x,on:1})).join('')+(j.n>j.users.length?'<small>+'+(j.n-j.users.length)+' more</small>':''):'<small>Nobody is online right now.</small>'}).catch(()=>{$('#on2').innerHTML='<small>Online list unavailable.</small>'});
let t;const run=async()=>{try{const j=await api('/search?q='+encodeURIComponent($('#pq').value.trim()));$('#plist').innerHTML=j.users.length?j.users.map(chip).join(''):'<small>No players found.</small>'}catch(e){$('#plist').innerHTML='<small>'+esc(e.message)+'</small>'}};
$('#pq').oninput=()=>{clearTimeout(t);t=setTimeout(run,300)};
const open1=e=>{const b=e.target.closest('.pchip');if(b)showProfile(b.dataset.u,$('#pv'),1)};$('#on2').onclick=$('#plist').onclick=open1;
run();if(PU){const u=PU;PU='';showProfile(u,$('#pv'),1)}}
async function showProfile(u,el,mod){el.innerHTML='<small>Loading…</small>';
try{const p=await api('/profile?u='+encodeURIComponent(u)),it=await items();
if(p.private){el.innerHTML=`<div class="panel"><h3>${esc(p.u)}${badge(p.role)}</h3><small>This profile is private.</small></div>`;return}
const inv=Object.keys(p.inv||{}).map(id=>it[id]?`<div class="item ${it[id].r}"><span class="ie">${ico(it[id].ic,40)}</span><b>${esc(it[id].n)} ×${p.inv[id]}</b></div>`:'').join('');
el.innerHTML=`<div class="panel prof"><h3>${avHtml(p.av,p.u,'md')}${esc(p.u)}${badge(p.role)}${p.banned?' '+ico('ban',16)+' banned':''}</h3><p class="big">${ico('coin',30)} ${p.nb.toLocaleString()}</p><small>${p.joined?'Joined '+new Date(p.joined).toLocaleDateString()+' · ':''}${p.pub?'Public profile':'Private profile'}</small>${p.on?'<small class="onl2"><span class="dot s"></span> Online now</small> ':''}${ME&&ME.u!=p.u&&!p.banned?'<button class="btn" id="tp">Offer a trade</button> <button id="rpp">Report</button>':''}${p.eq&&it[p.eq]?'<p class="show">'+ico(it[p.eq].ic,18)+' Showing off '+esc(it[p.eq].n)+'</p>':''}<h4>Inventory</h4><div class="items">${inv||'<small>Empty</small>'}</div><h4>Recently played</h4>${p.rec.length?'<ul class="rl">'+p.rec.map(x=>`<li>${esc(x.name)} <small>${new Date(x.t).toLocaleString()}</small></li>`).join('')+'</ul>':'<small>Nothing yet</small>'}</div>`
if($('#tp'))$('#tp').onclick=()=>{TT=p.u;go('trades')};if($('#rpp'))$('#rpp').onclick=()=>reportDlg('player',p.u,p.u);
if(mod&&isStaff(ME)&&RK(p.role)<RK(ME.role)){el.querySelector('.prof').insertAdjacentHTML('beforeend','<h4>Moderation</h4><div class="row"><input id="sr" placeholder="Ban reason (optional)" maxlength="120"><button id="sb1">Ban</button><button id="sb2">Unban</button></div>');
const ban=async b=>{try{await api('/staff/ban',{u:p.u,ban:b,reason:$('#sr').value});toast(b?'Banned':'Unbanned');showProfile(u,el,mod)}catch(x){toast(x.message)}};$('#sb1').onclick=()=>ban(true);$('#sb2').onclick=()=>ban(false)}
}catch(e){el.innerHTML='<small>'+esc(e.message)+'</small>'}}
async function admin(){const v=$('#view'),k=RK(ME&&ME.role);if(k<1)return go('games');
const CAN=[[1,'Review ban appeals, ban and unban members, delete forum posts'],[2,'Send announcements, run giveaways, see site stats, post in News'],[3,'Adjust Nullbux and items, reset passwords, appoint moderators and managers'],[4,'Appoint admins and delete accounts']];
v.innerHTML=`<h1>Admin menu</h1><p class="sub">Signed in as ${esc(ME.u)}${badge(ME.role)}</p>
<div class="panel"><h3>Overview</h3><p class="onl"><span class="dot"></span><b id="on">–</b>&nbsp;online now <small id="onn"></small></p><p class="sub" id="stt">${k>=2?'Loading…':'Site stats are available to managers and above.'}</p><div class="row"><button class="btn" id="toap">${ico('inbox',16)} Appeals</button></div></div>
${k>=2?`<div class="panel"><h3>Announcement</h3><div class="row"><input id="at" maxlength="300" placeholder="Message for everyone on the site" size="36"></div><div class="row"><button class="btn" id="as">Send to everyone</button><button id="ac">Clear</button></div><small>Shows as a banner for every visitor until they dismiss it.</small></div>
<div class="panel"><h3>Giveaway</h3><div class="row"><input id="gt" placeholder="Title" maxlength="60"><input id="ga" type="number" min="1" placeholder="Nullbux each"><input id="gm" type="number" min="1" placeholder="Minutes"></div><div class="row"><button class="btn" id="gs">Start giveaway</button><button id="ge">End giveaway</button></div><small>Each player can claim once while it runs.</small></div>`:''}
<div class="panel"><h3>Reports and feedback <small id="ibc"></small></h3><div id="inbox"><small>Loading…</small></div></div>
<div class="panel"><h3>Manage a player</h3><div class="row"><input id="mu" placeholder="Username" maxlength="16"><button class="btn" id="ml">Look up</button><button id="me">That’s me</button></div><small>You can only change accounts ranked below you.</small><div id="mv"></div></div>
<div class="panel"><h3>Your access</h3><ul class="rl">${CAN.filter(x=>k>=x[0]).map(x=>'<li>'+x[1]+'</li>').join('')}</ul></div>`;
const on=(id,f)=>{const e=$(id);if(e)e.onclick=f};on('#toap',()=>go('appeals'));
const ib=async()=>{try{const j=await api('/staff/inbox');$('#ibc').textContent=j.items.length?'('+j.items.length+')':'';$('#inbox').innerHTML=j.items.map(x=>`<div class="ibx"><div class="mh"><span class="own ${x.k=='report'?'r3':'r2'}">${FBN[x.k]||esc(x.k)}</span><b>${esc(x.u)}</b><small>${ago(x.t)}</small><span class="ma"><button data-r="${esc(x.id)}" title="Mark as done">${ico('check',15)}</button></span></div>${x.g?`<small>${esc(x.g)}</small>`:''}<p>${esc(x.m)}</p>${x.s?`<blockquote>${esc(x.s)}</blockquote>`:''}</div>`).join('')||'<small>Nothing waiting.</small>'}catch(e){$('#inbox').innerHTML='<small>'+esc(e.message)+'</small>'}};
$('#inbox').onclick=async e=>{const b=e.target.closest('[data-r]');if(b)try{await api('/staff/inbox/done',{id:b.dataset.r});ib()}catch(x){toast(x.message)}};ib();
const ol=()=>api('/admin/online').then(j=>{$('#on').textContent=j.n;$('#onn').textContent=j.n?j.users.join(', ')+(j.n>j.users.length?' …':''):''}).catch(e=>{$('#onn').textContent=e.message});ol();clearInterval(FT);FT=setInterval(()=>$('#on')?ol():clearInterval(FT),3e4);
if(k>=2){api('/admin/stats').then(s=>{$('#stt').textContent=s.users+(s.more?'+':'')+' accounts · '+s.pending+' pending appeal'+(s.pending==1?'':'s')}).catch(e=>{$('#stt').textContent=e.message});
const post=async(p,b,m)=>{try{await api(p,b);toast(m);loadStatus()}catch(e){toast(e.message)}};
on('#as',()=>post('/admin/announce',{text:$('#at').value},'Announcement sent'));on('#ac',()=>post('/admin/announce',{text:''},'Announcement cleared'));
on('#gs',()=>post('/admin/giveaway',{title:$('#gt').value,amount:$('#ga').value,minutes:$('#gm').value},'Giveaway started'));on('#ge',()=>post('/admin/giveaway',{end:true},'Giveaway ended'))}
on('#me',()=>{$('#mu').value=ME.u;$('#ml').click()});
on('#ml',async()=>{const u=$('#mu').value.trim().toLowerCase(),mv=$('#mv');await showProfile(u,mv);const p=mv.querySelector('.prof')&&await api('/profile?u='+encodeURIComponent(u)).catch(()=>0);if(!p)return;
const lower=RK(p.role)<k,own=u==ME.u&&k>=4,full=lower||own;let it={},h='';
if(k>=3&&full)try{it=await items()}catch(e){}
if(lower)h+=`<h4>Moderation</h4><div class="row"><input id="mr" placeholder="Ban reason (optional)" maxlength="120"><button id="mban">Ban</button><button id="munban">Unban</button></div>`;
if(k>=3&&full)h+=`<h4>Nullbux</h4><div class="row"><input id="mn" type="number" placeholder="Amount"><button id="mset">Set</button><button id="madd">Add</button></div><div class="row">${[100,1000,10000,-100].map(q=>`<button data-q="${q}">${q>0?'+':''}${q.toLocaleString()}</button>`).join('')}</div><h4>Items</h4><div class="row"><select id="mi">${Object.values(it).filter(i=>i.c!='crates').map(i=>`<option value="${i.id}">${esc(i.n)}</option>`).join('')}</select><input id="mq" type="number" value="1" min="-99" max="99"><button id="mgive">Give or remove</button></div><small>Use a negative number to remove items.</small><h4>Password</h4><div class="row"><input id="mp" type="password" placeholder="New password for them" autocomplete="new-password"><button id="mpass">Reset password</button></div>`;
if(k>=3&&lower)h+=`<h4>Role</h4><div class="row"><select id="mrole">${[['','Member'],['moderator','Moderator'],['manager','Manager'],['admin','Admin']].filter(r=>RK(r[0])<k).map(r=>`<option value="${r[0]}"${(p.role=='staff'?'moderator':p.role||'')==r[0]?' selected':''}>${r[1]}</option>`).join('')}</select><button id="mrs">Set role</button></div>`;
if(k>=4&&p.role!='owner')h+=`<h4>Danger zone</h4><div class="row"><button id="md" class="danger">${ico('trash',15)} Delete account</button></div>`;
mv.querySelector('.prof').insertAdjacentHTML('beforeend',h||'<small>You can view this account but not change it.</small>');
const run=async(path,b,m)=>{try{await api(path,b);toast(m);$('#ml').click()}catch(e){toast(e.message)}};
on('#mban',()=>run('/staff/ban',{u,ban:true,reason:$('#mr').value},'Banned'));on('#munban',()=>run('/staff/ban',{u,ban:false},'Unbanned'));
on('#mset',()=>run('/admin/nb',{u,op:'set',amount:$('#mn').value},'Nullbux set'));on('#madd',()=>run('/admin/nb',{u,op:'add',amount:$('#mn').value},'Nullbux added'));
mv.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>run('/admin/nb',{u,op:'add',amount:b.dataset.q},'Nullbux updated'));
on('#mgive',()=>run('/admin/item',{u,id:$('#mi').value,qty:$('#mq').value},'Inventory updated'));on('#mpass',()=>run('/admin/pass',{u,p:$('#mp').value},'Password reset'));
on('#mrs',()=>run('/admin/role',{u,role:$('#mrole').value},'Role updated'));
on('#md',async()=>{if(confirm('Delete '+u+' permanently? This cannot be undone.'))try{await api('/admin/delete',{u});toast('Account deleted');mv.innerHTML=''}catch(e){toast(e.message)}})})}
$('#bux').onclick=()=>go('account');
if(TOK)api('/me').then(setMe).catch(e=>{if(e.message=='Please log in'||/banned/.test(e.message)){TOK='';try{localStorage.removeItem('nd_tok');sessionStorage.removeItem('nd_tok')}catch(x){}}});
loadStatus();setInterval(loadStatus,300000);

/* sessions, install prompt, panic button */
let TI,WL,PT0,DEF;
addEventListener('beforeinstallprompt',e=>{e.preventDefault();DEF=e});
const pb=mk('button','',ico('x',16));pb.id='panic';pb.title='Panic: leave this page';pb.hidden=true;pb.onclick=()=>location.replace(S.panic);document.body.append(pb);
const tb=mk('button','',ico('up',18));tb.id='top';tb.title='Back to top';tb.onclick=()=>scrollTo({top:0,behavior:S.calm?'auto':'smooth'});document.body.append(tb);addEventListener('scroll',()=>tb.classList.toggle('on',scrollY>900),{passive:true});
function startSession(g){S.plays[g.id]=(S.plays[g.id]||0)+1;PT0=Date.now();clearInterval(TI);if(ME&&!g.ext)api('/played',{id:g.id,name:g.name}).catch(()=>{});
TI=setInterval(()=>{const s=(Date.now()-PT0)/1000|0;$('#ptm').textContent=(s/60|0)+':'+String(s%60).padStart(2,'0');if(document.visibilityState=='visible'&&!(++S.time%15))save()},1000);
$('#pr').hidden=!g.url;$('#pr').onclick=()=>{const f=$('#stage iframe');if(f&&g.url)f.src=g.url};
if(S.autobar)$('#player').classList.add('min');
if(S.awake&&navigator.wakeLock)navigator.wakeLock.request('screen').then(l=>WL=l).catch(()=>{})}
function endSession(){clearInterval(TI);save();try{WL&&WL.release()}catch(e){}WL=null;$('#ptm').textContent=''}

/* blur-in headings, ripple, reactive backgrounds */
function blurIn(el){el.innerHTML=el.textContent.split(' ').map((w,i)=>`<span class="bw" style="animation-delay:${i*70}ms">${esc(w)}</span>`).join(' ')}
addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('.btn');if(!b||H.classList.contains('calm'))return;const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),d=mk('span','rip');d.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;b.append(d);setTimeout(()=>d.remove(),650)});
const bgc=mk('canvas');bgc.id='bgc';document.body.prepend(bgc);
let BGR=0,BGSIG='',mx=-999,my=-999,rzt;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY},{passive:true});
addEventListener('resize',()=>{clearTimeout(rzt);rzt=setTimeout(()=>{BGSIG='';startBg()},250)});
function startBg(){const sig=[BGM(),S.theme,S.fx,S.calm,S.discreet,S.ca,S.cb].join();if(sig==BGSIG)return;BGSIG=sig;cancelAnimationFrame(BGR);
const m=BGM(),off=H.classList.contains('nofx')||H.classList.contains('calm')||m=='aurora'||m=='none'||matchMedia('(prefers-reduced-motion:reduce)').matches;
bgc.style.display=off?'none':'block';if(off)return;
const d=Math.min(devicePixelRatio||1,innerWidth<700?1:2),W=bgc.width=innerWidth*d,V=bgc.height=innerHeight*d,x=bgc.getContext('2d'),cs=getComputedStyle(H),A=cs.getPropertyValue('--a').trim(),B=cs.getPropertyValue('--b').trim(),R=Math.random,N=innerWidth<700?.5:1;let t=0;
const MODES={
particles:()=>{const P=Array.from({length:70*N|0},()=>({x:R()*W,y:R()*V,vx:(R()-.5)*.5*d,vy:(R()-.5)*.5*d}));return()=>{x.clearRect(0,0,W,V);for(const p of P){p.x=(p.x+p.vx+W)%W;p.y=(p.y+p.vy+V)%V;const dx=p.x-mx*d,dy=p.y-my*d,s=Math.hypot(dx,dy);if(s<150*d){p.x+=dx/s*2.5;p.y+=dy/s*2.5}}x.fillStyle=A;x.strokeStyle=B;for(let i=0;i<P.length;i++){x.globalAlpha=.85;x.beginPath();x.arc(P[i].x,P[i].y,2*d,0,7);x.fill();for(let j=i+1;j<P.length;j++){const s=Math.hypot(P[i].x-P[j].x,P[i].y-P[j].y);if(s<120*d){x.globalAlpha=(1-s/(120*d))*.5;x.beginPath();x.moveTo(P[i].x,P[i].y);x.lineTo(P[j].x,P[j].y);x.stroke()}}}}},
dots:()=>{const g=38*d;return()=>{x.clearRect(0,0,W,V);for(let i=0;i<=W/g;i++)for(let j=0;j<=V/g;j++){let px=i*g,py=j*g;const dx=px-mx*d,dy=py-my*d,s=Math.hypot(dx,dy),k=Math.max(0,1-s/(170*d));px+=dx/(s||1)*k*16*d;py+=dy/(s||1)*k*16*d;x.globalAlpha=.22+k*.78;x.fillStyle=k>.45?B:A;x.beginPath();x.arc(px,py,(1.4+k*4.5)*d,0,7);x.fill()}}},
galaxy:()=>{const stars=Array.from({length:150*N|0},(_,i)=>({x:R()*W,y:R()*V,z:.25+R()*.75,p:R()*6.3,c:['#fff',A,B][i%3]}));return()=>{x.clearRect(0,0,W,V);t++;const ox=mx>0?mx*d-W/2:0,oy=my>0?my*d-V/2:0;for(const s of stars){s.x=(s.x+.15*s.z*d+W)%W;const px=((s.x-ox*.06*s.z)%W+W)%W,py=((s.y-oy*.06*s.z)%V+V)%V;x.globalAlpha=.35+.65*Math.abs(Math.sin(t*.02*s.z+s.p));x.fillStyle=s.c;x.beginPath();x.arc(px,py,s.z*1.9*d,0,7);x.fill()}}},
matrix:()=>{const f=16*d,cols=Math.ceil(W/f),y=Array.from({length:cols},()=>R()*V/f|0),ch='アイウエオカキクケコサシスセソ0123456789';x.font=f+'px monospace';return()=>{x.globalCompositeOperation='destination-out';x.fillStyle='rgba(0,0,0,.09)';x.fillRect(0,0,W,V);x.globalCompositeOperation='source-over';t++;for(let i=0;i<cols;i++){const near=Math.abs(i*f-mx*d)<140*d;if(near||t%3==0){x.globalAlpha=near?1:.8;x.fillStyle=near?'#fff':B;x.fillText(ch[R()*ch.length|0],i*f,y[i]*f);if(y[i]*f>V&&R()>.96)y[i]=0;y[i]++}}}}};
if(!MODES[m]){bgc.style.display='none';return}
const draw=MODES[m]();const f=()=>{if(!document.hidden)draw();BGR=requestAnimationFrame(f)};f()}
async function appeals(){const v=$('#view');if(!isStaff(ME))return go('games');
v.innerHTML=`<h1>Appeals</h1><p class="sub">Staff only.<button class="surp" id="toad">Admin menu</button></p><div id="al"><small>Loading…</small></div><div id="apv"></div>`;
if($('#toad'))$('#toad').onclick=()=>go('admin');
const reload=async()=>{try{const j=await api('/staff/appeals');$('#al').innerHTML=j.appeals.length?j.appeals.map(a=>`<div class="panel ap"><h3>${esc(a.u)} <small>${new Date(a.t).toLocaleString()}${a.status!='pending'?' · denied':''}</small></h3>${a.reason?`<small>Ban reason: ${esc(a.reason)}</small>`:''}<p>${esc(a.msg)}</p>${a.note?`<small>Staff note: ${esc(a.note)}</small>`:''}<div class="row"><input placeholder="Note to keep on file (optional)" maxlength="200"><button class="btn" data-a="approve" data-u="${esc(a.u)}">${ico('check',15)} Approve and unban</button><button data-a="deny" data-u="${esc(a.u)}">Deny</button><button data-v="${esc(a.u)}">View profile</button></div></div>`).join(''):'<small>No appeals right now.</small>'}catch(e){$('#al').innerHTML='<small>'+esc(e.message)+'</small>'}};
$('#al').onclick=async e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.v)return showProfile(b.dataset.v,$('#apv'),1);
if(b.dataset.a)try{await api('/staff/appeal',{u:b.dataset.u,action:b.dataset.a,note:b.closest('.row').querySelector('input').value});toast(b.dataset.a=='approve'?'Appeal approved, account unbanned':'Appeal denied');reload()}catch(x){toast(x.message)}};
reload()}

/* click sparks */
const spk=$('#sparks'),sx=spk.getContext('2d');let P=[];
const rs=()=>{spk.width=innerWidth;spk.height=innerHeight};rs();onresize=rs;
addEventListener('click',e=>{if(H.classList.contains('nofx'))return;for(let i=0;i<10;i++){const a=i/10*6.28;P.push({x:e.clientX,y:e.clientY,vx:Math.cos(a)*4,vy:Math.sin(a)*4,l:1})}if(!run){run=1;requestAnimationFrame(L)}});
let run=0;function L(){sx.clearRect(0,0,spk.width,spk.height);sx.lineWidth=2;sx.strokeStyle=getComputedStyle(H).getPropertyValue('--b').trim();P=P.filter(p=>p.l>0);
P.forEach(p=>{sx.globalAlpha=p.l;sx.beginPath();sx.moveTo(p.x,p.y);sx.lineTo(p.x+p.vx*3,p.y+p.vy*3);sx.stroke();p.x+=p.vx;p.y+=p.vy;p.vx*=.95;p.vy*=.95;p.l-=.04});if(P.length)requestAnimationFrame(L);else run=0}

$('#nav').onclick=e=>{const b=e.target.closest('button');b&&go(b.dataset.p)};
$('#px').onclick=quit;$('#ph').onclick=()=>$('#player').classList.add('min');$('#ps').onclick=()=>$('#player').classList.remove('min');$('#pf').onclick=()=>$('#player').requestFullscreen?.();if(!document.documentElement.requestFullscreen)$('#pf').hidden=true;
addEventListener('keydown',e=>{if(e.key==S.pkey&&e.target.tagName!='INPUT')location.replace(S.panic);if(e.key=='Escape'&&!$('#player').hidden)quit();if(e.key=='/'&&e.target.tagName!='INPUT'&&$('#q')&&$('#player').hidden){e.preventDefault();$('#q').focus()}});
document.querySelectorAll('#nav button').forEach(b=>b.insertAdjacentHTML('afterbegin',ico(b.dataset.i,19)));
[['pr','refresh'],['pl','link'],['ph','chevup'],['po','ext'],['pf','max'],['px','x']].forEach(([id,i])=>{const b=$('#'+id);b.title=b.textContent;b.innerHTML=ico(i,16)+'<span>'+b.textContent+'</span>'});
$('#ps').innerHTML=ico('chevdown',14)+' Show bar';$('#stf').onclick=()=>go('admin');
let st;addEventListener('scroll',()=>{document.body.classList.add('scrolling');clearTimeout(st);st=setTimeout(()=>document.body.classList.remove('scrolling'),180)},{passive:true});
let ly=0;addEventListener('scroll',()=>{const y=scrollY,hd=$('header');if(y>90&&y>ly+6)hd.classList.add('hide');else if(y<ly-6||y<=90)hd.classList.remove('hide');ly=y},{passive:true});
let lc=0,lt;$('#logo').onclick=()=>{clearTimeout(lt);if(++lc>=5){lc=0;go('corner')}else lt=setTimeout(()=>lc=0,1500)};
/* Home rails and forums */
let GM=[];
let FCH='general',FT,FLAST='',PM=[],LM=[];
const ALL=()=>[...S.custom.map(c=>({id:c.url,name:c.name,i:'globe',d:'Custom game',url:c.url})),...PG,...GM,...GAMES],
cap=s=>s.replace(/-/g,' ').replace(/^./,c=>c.toUpperCase());
function fillHome(){if(!$('#r1'))return;const a=ALL().filter(g=>!g.ext),pg=a.filter(g=>g.id.startsWith('pg:')),gm=a.filter(g=>g.id.startsWith('gm:'));
const pop=[],L=[pg.length?pg:a,gm];for(let i=0;pop.length<30&&i<40;i++)L.forEach(l=>l[i]&&pop.length<30&&pop.push(l[i]));
const rec=S.cont?S.recent.map(id=>a.find(g=>g.id==id)).filter(Boolean):[],R=[['Popular',pop,'All',1,a.length]];
if(rec.length)R.push(['Continue playing',rec.slice(0,20),'Recent',0,rec.length]);
if(gm.length)R.push(['Fresh from GameMonetize',gm.slice(0,30),'GM',0,gm.length]);
const gc={};a.forEach(g=>(g.g||'').split(',').forEach(x=>x&&x!='mobile'&&(gc[x]=(gc[x]||0)+1)));
const gl=Object.keys(gc).filter(x=>gc[x]>=10).sort((x,y)=>gc[y]-gc[x]);gl.slice(0,10).forEach(x=>{const l=a.filter(g=>(g.g||'').split(',').includes(x));R.push([cap(x),l.slice(0,30),x,0,l.length])});
$('#cnt').textContent=a.length.toLocaleString();
{const c=(pg.length?pg:a).filter(g=>g.img),dt=new Date(),k=dt.getFullYear()*372+dt.getMonth()*31+dt.getDate(),g=c[(Math.imul(k,2654435761)>>>0)%(c.length||1)];
if(g&&$('#gotd')){$('#gotd').innerHTML=`<div class="gotd"><img src="${esc(g.img)}" alt="" referrerpolicy="no-referrer" onerror="this.remove()"><div><small>Game of the day</small><h2>${esc(g.name)}</h2><p>${esc(g.d||'')}</p><button class="btn" id="gpl">Play now</button></div></div>`;$('#gpl').onclick=()=>play(g)}}
const rt=$('#rot');if(rt&&gl.length){clearInterval(RT);const w=gl.slice(0,12);let i=Math.random()*w.length|0;
const t=()=>{if(!document.body.contains(rt))return clearInterval(RT);const x=w[i++%w.length];rt.textContent=cap(x);rt.dataset.c=x;rt.classList.remove('in');void rt.offsetWidth;rt.classList.add('in')};
t();if(!S.calm)RT=setInterval(t,2200);rt.onclick=()=>{chip=rt.dataset.c;games();scrollTo(0,0)}}
const put=(el,rs)=>{el.innerHTML='';rs.forEach(r=>{const s=mk('section','rw'+(r[3]?' lg':''),`<div class="rh"><h2>${esc(r[0])}</h2><small>${r[4].toLocaleString()} games</small><button class="va">View all</button><span class="ar"><button aria-label="Scroll left">${ico('chevl',16)}</button><button aria-label="Scroll right">${ico('chevr',16)}</button></span></div><div class="rail"></div>`),rl=s.querySelector('.rail'),ab=s.querySelectorAll('.ar button');
r[1].forEach(g=>rl.append(card(g)));s.querySelector('.va').onclick=()=>{chip=r[2];games();scrollTo(0,0)};
ab[0].onclick=()=>rl.scrollBy({left:-rl.clientWidth*.8,behavior:'smooth'});ab[1].onclick=()=>rl.scrollBy({left:rl.clientWidth*.8,behavior:'smooth'});el.append(s)})};
put($('#r1'),R.slice(0,2));put($('#r2'),R.slice(2))}
function home(){chip='All';const v=$('#view');clearInterval(RT);IO&&IO.disconnect();
v.innerHTML=`<section class="hh"><div><h1>${S.discreet?'Files':'Play <button class="rot" id="rot" title="Open this genre"></button>'}</h1><p class="sub"><b id="cnt">0</b> free games, nothing to install</p></div><div class="hs"><input id="q" type="search" placeholder="${S.discreet?'Search':(matchMedia('(hover:none)').matches?'Search games':'Search games (press / )')}" autocomplete="off"><button class="surp" id="sur">${ico('dice',16)} Surprise me</button></div></section><aside class="adv sb" aria-label="Advertising"><b>Ads available</b><span>Contact <a href="mailto:zzearyd@gmail.com">zzearyd@gmail.com</a> for more info</span></aside><div id="gotd"></div><div id="r1"></div><div id="ad1"></div><div id="r2"></div>`;
$('#q').oninput=e=>{if(e.target.value.trim())games('All',e.target.value)};
$('#sur').onclick=()=>{const p=ALL().filter(g=>!g.ext);play(p[Math.random()*p.length|0])};
adMount($('#ad1'),ADSENSE.home);fillHome();GMP.then(()=>{if($('#r1'))fillHome()})}let TT='';
async function trades(){const v=$('#view');
if(!ME){v.innerHTML='<h1>Trades</h1><div class="panel"><p>Log in to trade with other players.</p><button class="btn" id="gl">Log in or sign up</button></div>';$('#gl').onclick=()=>go('account');return}
v.innerHTML='<h1>Trades</h1><p class="sub">Loading…</p>';let IT,L;
try{IT=await items();L=await api('/trade/list');setBd(L.in.length,1)}catch(e){v.innerHTML='<h1>Trades</h1><div class="panel"><p>'+esc(e.message)+'</p></div>';return}
const sd=(m,n)=>[...Object.entries(m||{}).map(([i,q])=>IT[i]?`<span class="ti">${ico(IT[i].ic,16)} ${esc(IT[i].n)} ×${q}</span>`:''),n?`<span class="ti">${ico('coin',14)} ${n.toLocaleString()}</span>`:''].join('')||'<span class="ti">nothing</span>',
row=(o,inc)=>`<div class="panel tr"><b>${esc(inc?o.f:o.t)}</b> <small>${ago(o.c)}</small><div class="tg"><div><small>You get</small>${sd(inc?o.g:o.w,inc?o.gn:o.wn)}</div><div><small>You give</small>${sd(inc?o.w:o.g,inc?o.wn:o.gn)}</div></div><div class="row">${inc?`<button class="btn" data-a="accept" data-i="${o.id}">Accept</button><button data-a="decline" data-i="${o.id}">Decline</button><button data-rpu="${esc(o.f)}">Report</button>`:`<button data-a="cancel" data-i="${o.id}">Cancel offer</button>`}</div></div>`;
v.innerHTML=`<h1>Trades</h1><p class="sub">Swap items and Nullbux with other players. Offers expire after 3 days. <a href="faq.html#how-trading-works" target="_blank" rel="noopener">How trading works</a> <button class="surp" id="bk2">Back to shop</button></p><h2 class="sh">Incoming offers</h2>${L.in.map(o=>row(o,1)).join('')||'<small>No offers waiting.</small>'}<h2 class="sh">New offer</h2><div class="panel"><div class="row"><input id="tu" placeholder="Player username" maxlength="16" value="${esc(TT)}"><button class="btn" id="tf">Find player</button></div><div id="tb"></div></div><h2 class="sh">Your open offers</h2>${L.out.map(o=>row(o,0)).join('')||'<small>None.</small>'}`;
$('#bk2').onclick=()=>go('shop');v.querySelectorAll('[data-rpu]').forEach(b=>b.onclick=()=>reportDlg('player',b.dataset.rpu,b.dataset.rpu));
v.querySelectorAll('[data-a]').forEach(b=>b.onclick=async()=>{try{const j=await api('/trade/respond',{id:b.dataset.i,action:b.dataset.a});toast(j.msg);setMe(await api('/me'));trades()}catch(e){toast(e.message)}});
const build=p=>{const G={},W={},pk=(inv,id)=>`<div class="items">${Object.keys(inv).filter(i=>IT[i]).map(i=>`<div class="item ${IT[i].r}"><span class="ie">${ico(IT[i].ic,30)}</span><b>${esc(IT[i].n)}</b><small>have ${inv[i]}</small><div class="qty" data-s="${id}" data-i="${i}"><button data-d="-1">−</button><span>0</span><button data-d="1">+</button></div></div>`).join('')||'<small>No items</small>'}</div>`;
$('#tb').innerHTML=`<h4>You give</h4>${pk(ME.inv,'g')}<div class="row"><input id="gn" type="number" min="0" placeholder="Nullbux to give"></div><h4>You ask ${esc(p.u)} for</h4>${p.private?'<small>Their inventory is private, so you can only ask for Nullbux.</small>':pk(p.inv||{},'w')}<div class="row"><input id="wn" type="number" min="0" placeholder="Nullbux to ask for"></div><div class="row"><button class="btn" id="ts">Send offer to ${esc(p.u)}</button></div>`;
$('#tb').onclick=e=>{const b=e.target.closest('[data-d]');if(!b)return;const q=b.parentNode,g=q.dataset.s=='g',S=g?G:W,i=q.dataset.i,max=(g?ME.inv:p.inv)[i];S[i]=Math.max(0,Math.min(max,(S[i]||0)+ +b.dataset.d));q.querySelector('span').textContent=S[i]};
$('#ts').onclick=async()=>{try{await api('/trade/offer',{u:p.u,give:G,gn:$('#gn').value,want:W,wn:$('#wn').value});toast('Offer sent');TT='';trades()}catch(e){toast(e.message)}}};
$('#tf').onclick=async()=>{const u=$('#tu').value.trim().toLowerCase();if(!u)return;try{const p=await api('/profile?u='+encodeURIComponent(u));if(p.u==ME.u)return toast('You can’t trade with yourself');build(p)}catch(e){toast(e.message)}};
if(TT)$('#tf').click()}
const FC=[['general','General','Chat about anything'],['games','Game talk','Tips, scores and recommendations'],['help','Help and bugs','Something broken? Ask here'],['news','News','Updates from the team']],
ago=t=>{const s=(Date.now()-t)/1000|0;return s<60?'just now':s<3600?(s/60|0)+'m ago':s<86400?(s/3600|0)+'h ago':new Date(t).toLocaleDateString()};
const FBN={bug:'Bug',compat:'Compatibility',game:'Game request',idea:'Suggestion',other:'Other',report:'Report'};
function dlg(title,body,okText,onok){const d=document.createElement('dialog');d.className='dlg';d.innerHTML=`<form method="dialog"><h3>${title}</h3>${body}<div class="row"><button class="btn" value="ok">${okText}</button><button value="x" formnovalidate>Cancel</button></div></form>`;document.body.append(d);d.addEventListener('close',()=>d.remove());
d.querySelector('form').onsubmit=async e=>{if(e.submitter&&e.submitter.value=='ok'){e.preventDefault();try{await onok(d);d.close()}catch(x){toast(x.message)}}};d.showModal();return d}
function fbDlg(pre){pre=pre||{};if(!ME){toast('Log in to send feedback');return go('account')}
const T=[['bug','Bug or glitch'],['compat','A game won’t load or work'],['game','Request a game'],['idea','Suggestion'],['other','Something else']];
dlg('Send feedback',`<label>What would you like to report?<select id="fbt">${T.map(t=>`<option value="${t[0]}"${t[0]==pre.t?' selected':''}>${t[1]}</option>`).join('')}</select></label><label>Game or link (optional)<input id="fbg" maxlength="100" value="${esc(pre.game||'')}" placeholder="Game name or web address"></label><label>Details<textarea id="fbm" maxlength="500" placeholder="Tell us what happened, or what you’d like to see"></textarea></label><small>Staff read every message. Never include passwords. Check the <a href="faq.html" target="_blank" rel="noopener">FAQ</a> first.</small>`,'Send',async d=>{const m=d.querySelector('#fbm').value.trim();if(m.length<5)throw Error('Please add a bit more detail');await api('/feedback',{t:d.querySelector('#fbt').value,m,g:d.querySelector('#fbg').value});toast('Thanks! Your feedback was sent')})}
function reportDlg(kind,ref,who){if(!ME){toast('Log in to report');return go('account')}
dlg('Report '+esc(who),`<label>Reason<select id="rw">${['Spam','Harassment or hate','Inappropriate content','Scam or trade abuse','Cheating','Other'].map(x=>`<option>${x}</option>`).join('')}</select></label><label>Details (optional)<textarea id="rm" maxlength="300"></textarea></label><small>Reports go to staff. Misusing reports can get you banned.</small>`,'Send report',async d=>{await api('/report',{kind,ref,why:d.querySelector('#rw').value,m:d.querySelector('#rm').value});toast('Report sent. Thank you')})}
function forum(){const v=$('#view');
if(!ME){v.innerHTML='<h1>Forums</h1><div class="panel"><p>Log in to read and post.</p><button class="btn" id="gl">Log in or sign up</button></div>';$('#gl').onclick=()=>go('account');return}
LM=[];const ch=FC.find(c=>c[0]==FCH)||FC[0],mn=t=>esc(t).replace(/@([a-z0-9_]{3,16})/gi,'<span class="mn">@$1</span>');
v.innerHTML=`<h1>Forums</h1><div class="forum"><div class="fch">${FC.map(c=>`<button data-c="${c[0]}" class="${c[0]==FCH?'on':''}"><b>${c[1]}</b><small>${c[2]}</small></button>`).join('')}</div><section class="fmain"><div class="fhd"><b>${ch[1]}</b><small>Be kind. Use the flag to report problems. <a href="faq.html#forum-rules" target="_blank" rel="noopener">Forum rules</a></small></div><div class="fmsgs" id="fm" aria-live="polite"></div><button class="fnew" id="fn" hidden>New messages ↓</button><div class="fcomp"><input id="fi" maxlength="240" placeholder="Message ${esc(ch[1])}" autocomplete="off" aria-label="Message"><button class="btn" id="fs">Send</button></div><small class="fct" id="fc"></small></section></div>`;
const m=$('#fm'),render=force=>{const now=Date.now();PM=PM.filter(p=>p.c==FCH&&now-p.t<9e4&&!LM.some(x=>x.u==p.u&&x.m==p.m&&Math.abs(x.t-p.t)<12e4));
const all=[...LM,...PM.map((p,i)=>({k:'tmp'+i,u:p.u,r:p.r,t:p.t,m:p.m,a:p.a,tmp:1}))],sig=all.map(x=>x.k).join();if(sig==FLAST&&!force)return;FLAST=sig;
const near=m.scrollHeight-m.scrollTop-m.clientHeight<80;
m.innerHTML=all.length?all.map(x=>`<div class="msg${x.tmp?' tmpm':''}${x.m.toLowerCase().includes('@'+ME.u)?' mm':''}">${avHtml(x.a,x.u)}<div><div class="mh"><button class="nm" data-u="${esc(x.u)}">${esc(x.u)}</button>${badge(x.r)}<small>${ago(x.t)}</small><span class="ma"><button data-re="${esc(x.u)}" title="Reply" aria-label="Reply">${ico('reply',14)}</button>${x.u!=ME.u?`<button data-rp="${esc(x.k)}" data-w="${esc(x.u)}" title="Report" aria-label="Report">${ico('flag',14)}</button>`:''}${isStaff(ME)?`<button data-d="${esc(x.k)}" title="Delete post" aria-label="Delete">${ico('trash',14)}</button>`:''}</span></div><p>${mn(x.m)}</p></div></div>`).join(''):'<p class="fe">No messages yet. Start the conversation.</p>';
if(near||force){m.scrollTop=m.scrollHeight;$('#fn').hidden=true}else $('#fn').hidden=false},
load=async force=>{if(!$('#fm'))return clearInterval(FT);
try{const j=await api('/forum?c='+FCH);LM=j.msgs;$('#fi').disabled=$('#fs').disabled=!j.canPost;if(!j.canPost)$('#fi').placeholder='Only managers and above can post in '+ch[1];render(force)}catch(e){m.innerHTML='<p class="fe">'+esc(e.message)+'</p>'}};
const send=async()=>{const i=$('#fi'),t=i.value.trim();if(!t)return;i.value='';$('#fc').textContent='';const p={c:FCH,u:ME.u,r:ME.role||'',t:Date.now(),m:t,a:ME.av||''};PM.push(p);render(1);try{await api('/forum/post',{c:FCH,m:t});setTimeout(load,1200);setTimeout(load,3500)}catch(e){PM=PM.filter(x=>x!==p);i.value=t;toast(e.message);render(1)}};
$('#fs').onclick=send;$('#fi').onkeydown=e=>{if(e.key=='Enter')send()};$('#fi').oninput=()=>{const n=$('#fi').value.length;$('#fc').textContent=n>180?(240-n)+' characters left':''};
$('#fn').onclick=()=>{m.scrollTop=m.scrollHeight;$('#fn').hidden=true};m.onscroll=()=>{if(m.scrollHeight-m.scrollTop-m.clientHeight<80)$('#fn').hidden=true};
m.onclick=async e=>{const t=e.target,d=t.closest('[data-d]'),re=t.closest('[data-re]'),rp=t.closest('[data-rp]'),nm=t.closest('.nm');
if(d)try{await api('/forum/delete',{k:d.dataset.d});load(1)}catch(x){toast(x.message)}
else if(re){const i=$('#fi');i.value='@'+re.dataset.re+' '+i.value;i.focus()}
else if(rp)reportDlg('forum',rp.dataset.rp,rp.dataset.w+'’s message');
else if(nm){PU=nm.dataset.u;go('players')}};
v.querySelector('.fch').onclick=e=>{const b=e.target.closest('[data-c]');if(b){FCH=b.dataset.c;FLAST='';forum()}};
clearInterval(FT);FT=setInterval(()=>document.visibilityState=='visible'&&load(),8000);load(1)}

{const f=$('#fbl');if(f)f.onclick=e=>{e.preventDefault();fbDlg()}}
const GMURL='https://gamemonetize.com/feed.php?format=0&page=1',
gslug=x=>String(x||'').toLowerCase().trim().replace(/\s+/g,'-'),
gent=t=>(/[&<]/.test(t)?(new DOMParser().parseFromString(String(t||''),'text/html').documentElement.textContent||''):String(t||'')).replace(/\s+/g,' ').trim(),
GOK=new Set(['simulation','strategy','3d','2d','halloween','io','driving','car','fighting','physics','multiplayer','platform','sports','racing','puzzle','shooter','shooting','adventure','action','arcade']),
gmMap=a=>(Array.isArray(a)?a:a&&(a.data||a.games||a.items)||[]).filter(x=>x&&x.id&&x.title&&/^https:\/\/html5\.gamemonetize\.(co|com)\/[A-Za-z0-9_\/.\-]+$/.test(x.url||'')).map(x=>({id:'gm:'+x.id,name:gent(x.title),g:[...new Set([gslug(x.category),...String(x.tags||'').split(',').map(gslug).filter(t=>GOK.has(t))].filter(Boolean))].slice(0,3).join(','),d:gent(x.category)||'Arcade',img:/^https:\/\/img\.gamemonetize\.com\/[A-Za-z0-9_\/.\-]+$/.test(x.thumb||'')?x.thumb:'',m:1,url:x.url})).filter(g=>g.name);
HX=/^[A-Za-z0-9_-]{8,64}$/,GMKEY='nd_gm2',GMMAXP=60,
gmC=a=>(Array.isArray(a)?a:[]).filter(x=>Array.isArray(x)&&x[0]&&x[1]&&HX.test(x[4]||'')).map(x=>({id:'gm:'+x[0],name:gent(x[1]),g:[...new Set([gslug(x[2]),...String(x[3]||'').split(',')].filter(Boolean))].slice(0,3).join(','),d:gent(x[2])||'Arcade',img:x[5]===0?'':HX.test(x[5]||x[4])?'https://img.gamemonetize.com/'+(x[5]||x[4])+'/512x384.jpg':'',m:1,url:'https://html5.gamemonetize.co/'+x[4]+'/'})).filter(g=>g.name);
async function loadGM(){try{sessionStorage.removeItem('nd_gm')}catch(e){}
try{const c=JSON.parse(localStorage[GMKEY]||'null');if(c&&Date.now()-c.t<(c.ok?216e5:6e5)){GM=gmC(c.d);return}}catch(e){}
const base=API.replace(/\/+$/,'')+'/feed?page=',one=async p=>{try{const r=await fetch(base+p);return r.ok?await r.json():null}catch(e){return null}};
const f=await one(1);
if(!Array.isArray(f)){try{GM=gmMap(await(await fetch(GMURL)).json())}catch(e){}return}
let raw=f.slice();GM=gmC(raw);
if(f.length)(async()=>{let p=2,end=false,err=false;
while(!end&&!err&&p<=GMMAXP){const res=await Promise.all([0,1,2,3].filter(i=>p+i<=GMMAXP).map(i=>one(p+i)));for(const r of res){if(!Array.isArray(r)){err=true;break}if(!r.length){end=true;break}raw=raw.concat(r)}p+=4}
const seen=new Set();raw=raw.filter(x=>x&&!seen.has(x[0])&&seen.add(x[0]));GM=gmC(raw);
try{localStorage[GMKEY]=JSON.stringify({t:Date.now(),ok:!err,d:raw})}catch(e){}
if($('#r1'))fillHome();dispatchEvent(new Event('gmdone'))})();}
const GMP=loadGM().then(()=>dispatchEvent(new Event('gmdone')));
const AVC=['#7c5cff','#2fd6f5','#f43f5e','#f59e0b','#22c55e','#ec4899','#64748b','#14b8a6'],
AVI=['gamepad','ghost','rocket','crown','flame','star','bolt','heart','moon','sun','gem','paw','fish','trophy','key','cube','shield','orb','wand','headphones','dice','gift','coin','mega','clock','cap','flask','box'],
EMO=Array.from('😀😃😄😁😆😅😂🤣😊😇🙂😉😍🥰😘😎🤩🥳😜🤪🤔😴😈👻💀👽🤖🎃😺🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸🐵🐔🐧🐦🦄🐝🦋🐢🐙🐬🐳🦈🐲🔥⭐🌈⚡🌙🍕🍔🍟🍩🍪🍉🍓🍒⚽🏀🎮🎲🎯🎸🎧🚀🚗👑💎🏆🍀🌸🌵🍄');
function avHtml(a,name,sz){const p=String(a||'').split(':'),c=AVC[(+p[2]||0)%8],z=sz?' '+sz:'';
if(p[0]=='e'&&p[1])return`<i class="av em${z}" style="background:${c}">${esc(p[1])}</i>`;
if(p[0]=='i'&&IC[p[1]])return`<i class="av${z}" style="background:${c}">${ico(p[1],18)}</i>`;
const n=String(name||'?');return`<i class="av${z}" style="--h:${Math.abs([...n].reduce((h,ch)=>h*31+ch.charCodeAt(0)|0,7))%360}">${esc(n[0]||'?')}</i>`}
function avDlg(){if(!ME)return;const p=String(ME.av||'').split(':');let tab=p[0]=='i'?'i':'e',T=tab,V=p[1]||(tab=='e'?'🙂':'gamepad'),C=+p[2]||0,none=!ME.av;
const body=`<div class="avprev" id="avp"></div><div class="avtabs"><button type="button" data-t="e">Emoji</button><button type="button" data-t="i">Icons</button><button type="button" data-t="n">Initial</button></div><div class="avgrid" id="avg"></div><div class="avsw">${AVC.map((c,i)=>`<button type="button" data-c="${i}" style="background:${c}" aria-label="Color ${i+1}"></button>`).join('')}</div>`;
const d=dlg('Choose your avatar',body,'Save',async()=>{const j=await api('/avatar',{a:none?'':T+':'+V+':'+C});setMe(j.me);toast('Avatar saved');const n=$('#nav .on');if(n&&n.dataset.p=='account')go('account')});
const R=()=>{d.querySelector('#avp').innerHTML=avHtml(none?'':T+':'+V+':'+C,ME.u,'lg');d.querySelectorAll('[data-t]').forEach(b=>b.classList.toggle('on',b.dataset.t==tab));d.querySelectorAll('[data-c]').forEach(b=>b.classList.toggle('on',!none&&+b.dataset.c==C));
const sel=(t,v)=>!none&&T==t&&v==V?' class="on"':'';
d.querySelector('#avg').innerHTML=tab=='n'?'<small>Your avatar shows the first letter of your username.</small>':tab=='e'?EMO.map(e=>`<button type="button" data-v="${e}"${sel('e',e)}>${e}</button>`).join(''):AVI.map(i=>`<button type="button" data-v="${i}"${sel('i',i)}>${ico(i,22)}</button>`).join('')};
d.onclick=e=>{const b=e.target.closest('button[type=button]');if(!b)return;if(b.dataset.t){tab=b.dataset.t;if(tab=='n')none=true}else if(b.dataset.c){C=+b.dataset.c;if(tab=='n')tab='e';none=false}else if(b.dataset.v){T=tab;V=b.dataset.v;none=false}R()};R()}
/* Google AdSense: paste the ad unit ID from AdSense (Ads > By ad unit > Display ads) next to a name to switch that spot on. Empty = no manual ad there. */
const ADSENSE={client:'ca-pub-6415843775130079',home:''};
function adMount(el,slot){if(!el||!slot)return;el.innerHTML='<div class="adbox"><small>Advertisement</small><ins class="adsbygoogle" style="display:block" data-ad-client="'+ADSENSE.client+'" data-ad-slot="'+esc(slot)+'" data-ad-format="auto" data-full-width-responsive="true"></ins></div>';
try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch(e){}setTimeout(()=>{if(!(window.adsbygoogle&&window.adsbygoogle.loaded))el.innerHTML=''},4000)}
let lp=0,bdN=0;const setBd=(n,quiet)=>{const b=document.querySelector('#nav [data-p=shop]');if(!b)return;n?b.dataset.bd=n:delete b.dataset.bd;if(n>bdN&&!quiet)toast('You have '+n+' trade offer'+(n>1?'s':'')+' waiting');bdN=n};
const ping=()=>{if(ME&&document.visibilityState=='visible'&&Date.now()-lp>24e4){lp=Date.now();api('/ping',{}).then(j=>setBd(j.tr||0)).catch(()=>{})}};setInterval(ping,6e4);addEventListener('visibilitychange',ping);ping();
const pill=document.createElement('i');pill.className='pill';$('#nav').prepend(pill);
const movePill=()=>{const b=$('#nav .on');if(!b){pill.style.opacity=0;return}pill.style.opacity=1;pill.style.width=b.offsetWidth+'px';pill.style.height=b.offsetHeight+'px';pill.style.transform='translate('+b.offsetLeft+'px,'+b.offsetTop+'px)'};
addEventListener('resize',movePill);if(document.fonts)document.fonts.ready.then(movePill);setTimeout(()=>pill.classList.add('rdy'),400);
const ACH=[['first','First steps','Play your first game',()=>Object.keys(S.plays).length>=1],['ten','Explorer','Play 10 different games',()=>Object.keys(S.plays).length>=10],['fifty','Globetrotter','Play 50 different games',()=>Object.keys(S.plays).length>=50],
['hour','Hooked','Play for 1 hour in total',()=>S.time>=3600],['ten_h','Marathon','Play for 10 hours in total',()=>S.time>=36e3],['fav','Collector','Favorite 5 games',()=>S.fav.length>=5],
['loop','Replayer','Play one game 10 times',()=>Math.max(0,...Object.values(S.plays))>=10],['acct','Official','Create an account',()=>!!ME],['rich','Stacked','Hold 1,000 Nullbux',()=>!!ME&&ME.nb>=1e3],['inv','Hoarder','Own 10 different shop items',()=>!!ME&&Object.keys(ME.inv).length>=10]];
function checkAch(){if(!Array.isArray(S.ach))S.ach=[];const n=ACH.filter(a=>!S.ach.includes(a[0])&&a[3]());if(n.length){n.forEach(a=>S.ach.push(a[0]));save();toast(n.length>1?n.length+' achievements unlocked':'Achievement unlocked: '+n[0][1])}}
function achPanel(){const g=Array.isArray(S.ach)?S.ach:[];return`<div class="panel"><h3>Achievements <small>${g.length} of ${ACH.length}</small></h3><div class="achs">${ACH.map(a=>`<div class="ach${g.includes(a[0])?' on':''}"><b>${a[1]}</b><small>${a[2]}</small></div>`).join('')}</div></div>`}
function dailyDot(){const b=document.querySelector('#nav [data-p=account]');if(b){ME&&ME.canDaily?b.dataset.bd='!':delete b.dataset.bd}}
setInterval(checkAch,2e4);
function showCookie(force){const K='nd_cookie',V='1';try{if(!force&&localStorage[K]==V)return}catch(e){}
if($('#cookie'))return;const b=document.createElement('div');b.id='cookie';b.setAttribute('role','region');b.setAttribute('aria-label','Cookie notice');
b.innerHTML='<p><b>Cookies and storage.</b> NullDen saves your settings and sign-in in your browser. Games and ads, including ads from Google, come from third parties and may set their own cookies. <a href="privacy.html">Read the Privacy Policy</a>.</p><button class="btn" id="ckok">Got it</button>';
document.body.append(b);
$('#ckok').onclick=()=>{try{localStorage[K]=V}catch(e){}b.classList.add('out');setTimeout(()=>b.remove(),320)}}
{const l=$('#ckl');if(l)l.onclick=e=>{e.preventDefault();showCookie(1)}}
setTimeout(showCookie,600);
apply();go('games');
{const RO={games:'games',home:'games',shop:'shop',forum:'forum',forums:'forum',players:'players',account:'account',settings:'settings',trades:'trades'},nav=()=>{const h=decodeURIComponent(location.hash.slice(1));if(RO[h])go(RO[h]);else if(h=='feedback')setTimeout(()=>fbDlg(),400)};nav();addEventListener('hashchange',nav)}
document.addEventListener('click',e=>{if(e.defaultPrevented)return;const a=e.target.closest&&e.target.closest('a[href="#feedback"],a[href="#cookies"]');if(a){e.preventDefault();a.getAttribute('href')=='#feedback'?fbDlg():showCookie(1)}});
const hid=decodeURIComponent(location.hash.slice(1));if(hid){const dl=()=>{const g0=ALL().find(x=>x.id==hid);if(g0&&!g0.ext&&$('#player').hidden)play(g0)};dl();if(hid.startsWith('gm:'))addEventListener('gmdone',dl)}
