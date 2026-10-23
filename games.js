const rnd=n=>Math.random()*n|0,
cvs=(el,w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;el.append(c);return[c,c.getContext('2d')]},
cv=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim(),
keys=f=>{const k=e=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key))e.preventDefault();f(e)};addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},
msg=(x,t,w,h)=>{x.fillStyle='#000b';x.fillRect(0,h/2-30,w,50);x.fillStyle='#fff';x.font='700 18px system-ui';x.textAlign='center';x.fillText(t,w/2,h/2+2)},
hud=(x,t)=>{x.fillStyle='#fff';x.font='600 16px system-ui';x.textAlign='left';x.fillText(t,10,20)};

function snake(el,sc){const[c,x]=cvs(el,420,420);let s,d,nd,f,n,dead,sw;
const reset=()=>{s=[[10,10]];d=nd=[1,0];f=[15,10];n=0;dead=0};reset();
const M={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]};
const ok=m=>m[0]+d[0]||m[1]+d[1];
const off=keys(e=>{const m=M[e.key];if(m){if(ok(m))nd=m}else if(e.key==' '&&dead)reset()});
c.onpointerdown=e=>{sw=[e.clientX,e.clientY];if(dead)reset()};
c.onpointerup=e=>{if(!sw)return;const dx=e.clientX-sw[0],dy=e.clientY-sw[1],m=Math.abs(dx)>Math.abs(dy)?[Math.sign(dx),0]:[0,Math.sign(dy)];if(Math.max(Math.abs(dx),Math.abs(dy))>20&&ok(m))nd=m};
const t=setInterval(()=>{if(!dead){d=nd;const h=[s[0][0]+d[0],s[0][1]+d[1]];
if(h[0]<0||h[1]<0||h[0]>20||h[1]>20||s.some(p=>p[0]==h[0]&&p[1]==h[1])){dead=1;sc(n)}
else{s.unshift(h);if(h[0]==f[0]&&h[1]==f[1]){n++;f=[rnd(21),rnd(21)]}else s.pop()}}
x.clearRect(0,0,420,420);x.fillStyle=cv('--b');x.fillRect(f[0]*20+3,f[1]*20+3,14,14);
x.fillStyle=cv('--a');s.forEach(p=>x.fillRect(p[0]*20+1,p[1]*20+1,18,18));hud(x,'Score '+n);
if(dead)msg(x,'Game over · tap or press Space',420,420)},95);
return()=>{clearInterval(t);off()}}

function g2048(el,sc){const[c,x]=cvs(el,400,430);let b,n,sw;
const add=()=>{const e=[...b.keys()].filter(i=>!b[i]);if(e.length)b[e[rnd(e.length)]]=Math.random()<.9?2:4};
const line=a=>{a=a.filter(v=>v);for(let i=0;i<a.length-1;i++)if(a[i]==a[i+1]){a[i]*=2;n+=a[i];a.splice(i+1,1)}while(a.length<4)a.push(0);return a};
const mv=d=>{const o=b+'';for(let i=0;i<4;i++){const ix=[0,1,2,3].map(j=>[i*4+j,i*4+3-j,j*4+i,(3-j)*4+i][d]),r=line(ix.map(k=>b[k]));ix.forEach((k,j)=>b[k]=r[j])}if(b+''!=o){add();sc(n)}draw()};
function draw(){x.clearRect(0,0,400,430);b.forEach((v,i)=>{const X=i%4*100+6,Y=(i/4|0)*100+36;x.fillStyle=v?`hsl(${(Math.log2(v)*38+250)%360} 70% 55%)`:'#ffffff14';x.beginPath();x.roundRect(X,Y,88,88,12);x.fill();
if(v){x.fillStyle='#fff';x.font=`700 ${v>999?26:34}px system-ui`;x.textAlign='center';x.fillText(v,X+44,Y+55)}});hud(x,'Score '+n+' · R restarts')}
const reset=()=>{b=Array(16).fill(0);n=0;add();add();draw()};reset();
const off=keys(e=>{const d=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].indexOf(e.key);if(d>=0)mv(d);if(e.key=='r')reset()});
c.onpointerdown=e=>sw=[e.clientX,e.clientY];
c.onpointerup=e=>{const dx=e.clientX-sw[0],dy=e.clientY-sw[1];if(Math.max(Math.abs(dx),Math.abs(dy))>25)mv(Math.abs(dx)>Math.abs(dy)?(dx<0?0:1):(dy<0?2:3))};
return off}

function brk(el,sc){const[c,x]=cvs(el,480,400);let p=240,bx,by,vx,vy,n,br,over;
const init=k=>{br=[];for(let r=0;r<5;r++)for(let i=0;i<8;i++)br.push([i*60+4,r*22+30,r]);bx=240;by=300;vx=3;vy=-3.5;over=0;if(!k)n=0};init();
c.onpointermove=e=>p=(e.clientX-c.getBoundingClientRect().left)*480/c.clientWidth;
c.onpointerdown=()=>over&&init();
const off=keys(e=>{if(e.key=='ArrowLeft')p-=30;if(e.key=='ArrowRight')p+=30;if(e.key==' '&&over)init()});
const t=setInterval(()=>{if(!over){bx+=vx;by+=vy;if(bx<6||bx>474)vx*=-1;if(by<6)vy=Math.abs(vy);
if(by>374&&by<388&&Math.abs(bx-p)<48&&vy>0){vy=-Math.abs(vy);vx=(bx-p)/10}
const i=br.findIndex(k=>bx>k[0]&&bx<k[0]+52&&by>k[1]-6&&by<k[1]+22);
if(i>=0){br.splice(i,1);vy*=-1;n+=10;sc(n);if(!br.length)init(1)}
if(by>410){over=1;sc(n)}}
x.clearRect(0,0,480,400);br.forEach(k=>{x.fillStyle=`hsl(${k[2]*40+250} 75% 60%)`;x.fillRect(k[0],k[1],52,16)});
x.fillStyle=cv('--b');x.fillRect(p-45,380,90,10);x.beginPath();x.arc(bx,by,6,0,7);x.fill();hud(x,'Score '+n);
if(over)msg(x,'Game over · tap to retry',480,400)},16);
return()=>{clearInterval(t);off()}}

function flap(el,sc){const[c,x]=cvs(el,360,480);let y,v,ps,n,f,dead;
const reset=()=>{y=240;v=0;ps=[];n=0;f=0;dead=0};reset();
const jump=()=>dead?reset():v=-6.3;
const off=keys(e=>(e.key==' '||e.key=='ArrowUp')&&jump());c.onpointerdown=jump;
const t=setInterval(()=>{if(!dead){v+=.34;y+=v;if(f++%85==0)ps.push([360,90+rnd(300),0]);
ps.forEach(p=>{p[0]-=2.6;if(!p[2]&&p[0]+50<50){p[2]=1;n++;sc(n)}});ps=ps.filter(p=>p[0]>-60);
if(y<8||y>472||ps.some(p=>p[0]<70&&p[0]+50>50&&(y-9<p[1]-62||y+9>p[1]+62)))dead=1}
x.fillStyle=cv('--bg');x.fillRect(0,0,360,480);x.fillStyle=cv('--b');ps.forEach(p=>{x.fillRect(p[0],0,50,p[1]-62);x.fillRect(p[0],p[1]+62,50,480)});
x.fillStyle=cv('--a');x.beginPath();x.arc(60,y,10,0,7);x.fill();x.fillStyle='#fff';x.font='700 30px system-ui';x.textAlign='center';x.fillText(n,180,50);
if(dead)msg(x,'Tap or Space to retry',360,480)},16);
return()=>{clearInterval(t);off()}}

function pong(el,sc){const[c,x]=cvs(el,480,320);let p=130,a=130,bx=240,by=160,vx=4,vy=2,n=0;
c.onpointermove=e=>p=(e.clientY-c.getBoundingClientRect().top)*320/c.clientHeight-30;
const off=keys(e=>{if(e.key=='ArrowUp')p-=25;if(e.key=='ArrowDown')p+=25});
const srv=d=>{bx=240;by=160;vx=4*d;vy=rnd(5)-2};
const t=setInterval(()=>{bx+=vx;by+=vy;if(by<0||by>320)vy*=-1;a+=Math.max(-3.1,Math.min(3.1,by-a-30));
if(vx<0&&bx<24&&bx>10&&by>p&&by<p+60){vx=-vx*1.04;vy=(by-p-30)/6;n++;sc(n)}
if(vx>0&&bx>456&&bx<470&&by>a&&by<a+60)vx=-vx;
if(bx<0){srv(1);n=0}if(bx>480){srv(-1);n+=5;sc(n)}
x.clearRect(0,0,480,320);x.fillStyle=cv('--a');x.fillRect(10,p,10,60);x.fillStyle=cv('--b');x.fillRect(460,a,10,60);
x.fillStyle='#fff';x.beginPath();x.arc(bx,by,6,0,7);x.fill();hud(x,'Score '+n+' · move to steer')},16);
return()=>{clearInterval(t);off()}}

function mem(el,sc){const w=document.createElement('div');w.className='mem';el.append(w);
const E=[...'🍎🍋🍇🍓🍉🥝🍒🍑'];let o=[],m=0,d=0,lock=0;
[...E,...E].sort(()=>Math.random()-.5).forEach(e=>{const b=document.createElement('button');
b.onclick=()=>{if(lock||b.textContent)return;b.textContent=e;o.push(b);if(o.length<2)return;m++;const[p,q]=o;o=[];
if(p.textContent==q.textContent){p.className=q.className='ok';if(++d==8)sc(Math.max(1,60-m*2))}
else{lock=1;setTimeout(()=>{p.textContent=q.textContent='';lock=0},650)}};w.append(b)});
return()=>{}}

function mines(el,sc){const[c,x]=cvs(el,360,400),N=9,S=40,M=10;let g,st,t0;
const reset=()=>{g=Array.from({length:81},()=>({m:0,r:0,f:0,n:0}));st=0};reset();
const nb=i=>{const o=[],R=i/N|0,Q=i%N;for(let a=-1;a<2;a++)for(let b=-1;b<2;b++){const u=R+a,v=Q+b;if((a||b)&&u>=0&&v>=0&&u<N&&v<N)o.push(u*N+v)}return o};
const place=s=>{const bad=[s,...nb(s)];let n=0;while(n<M){const i=rnd(81);if(!bad.includes(i)&&!g[i].m){g[i].m=1;n++}}g.forEach((k,i)=>k.n=nb(i).filter(j=>g[j].m).length);st=1;t0=Date.now()};
const open=i=>{const k=g[i];if(k.r||k.f)return;k.r=1;if(k.m)st=3;else if(!k.n)nb(i).forEach(open)};
const cell=e=>{const r=c.getBoundingClientRect(),X=(e.clientX-r.left)*360/r.width,Y=(e.clientY-r.top)*400/r.height-40;return X>=0&&Y>=0&&X<360&&Y<360?(Y/S|0)*N+(X/S|0):-1};
const tap=(i,flag)=>{if(st>1)return reset();if(i<0)return;if(flag){if(!g[i].r)g[i].f^=1;return}if(!st)place(i);open(i);if(st==1&&g.every(k=>k.m||k.r)){st=2;sc(Math.max(1,300-((Date.now()-t0)/1000|0)))}};
let lp;c.onpointerdown=e=>{const i=cell(e);if(e.button==2||e.shiftKey)return tap(i,1);lp=setTimeout(()=>{lp=0;tap(i,1)},450)};
c.onpointerup=e=>{if(lp){clearTimeout(lp);lp=0;tap(cell(e),0)}};c.oncontextmenu=e=>e.preventDefault();
function draw(){x.clearRect(0,0,360,400);hud(x,(st==2?'You win! ':st==3?'Boom! Tap to retry · ':'')+'Mines '+(M-g.filter(k=>k.f).length)+' · '+(st==1?(Date.now()-t0)/1000|0:0)+'s · right-click or hold to flag');
g.forEach((k,i)=>{const X=i%N*S,Y=(i/N|0)*S+40;x.fillStyle=k.r?'#ffffff1c':cv('--a');x.fillRect(X+1,Y+1,S-2,S-2);x.textAlign='center';x.font='700 18px system-ui';x.fillStyle='#fff';
if(k.m&&(k.r||st==3))x.fillText('💣',X+20,Y+27);else if(k.r&&k.n){x.fillStyle=`hsl(${k.n*50+180} 80% 65%)`;x.fillText(k.n,X+20,Y+27)}else if(k.f)x.fillText('🚩',X+20,Y+27)})}
const t=setInterval(draw,100);return()=>clearInterval(t)}

function cactus(el,sc){const[c,x]=cvs(el,640,240);let y,v,ob,n,f,gap,dead;
const reset=()=>{y=0;v=0;ob=[];n=0;f=0;gap=60;dead=0};reset();
const jump=()=>{if(dead)reset();else if(!y)v=11.5};
const off=keys(e=>(e.key==' '||e.key=='ArrowUp')&&jump());c.onpointerdown=jump;
const t=setInterval(()=>{if(!dead){f++;const sp=5+f/600;v-=.6;y=Math.max(0,y+v);if(!y&&v<0)v=0;
if(--gap<=0){ob.push([640,20+rnd(25),26+rnd(20)]);gap=Math.max(40,90-f/30|0)+rnd(50)}
ob.forEach(o=>o[0]-=sp);ob=ob.filter(o=>o[0]>-50);n=f/6|0;
if(ob.some(o=>o[0]<70&&o[0]+o[1]>40&&y<o[2]-4)){dead=1;sc(n)}}
x.fillStyle=cv('--bg');x.fillRect(0,0,640,240);x.fillStyle=cv('--mu');x.fillRect(0,200,640,2);
x.fillStyle=cv('--a');x.fillRect(40,166-y,30,34);x.fillStyle=cv('--b');ob.forEach(o=>x.fillRect(o[0],200-o[2],o[1],o[2]));
hud(x,'Score '+n);if(dead)msg(x,'Tap or Space to retry',640,240)},16);
return()=>{clearInterval(t);off()}}

function echo(el,sc){const s=document.createElement('b'),w=document.createElement('div');w.className='mem';w.style.cssText='grid-template-columns:repeat(2,1fr);width:min(80vw,300px)';
s.textContent='Tap a colour to start';el.append(s,w);
let q=[],k=0,busy=0,go=0;
const B=['#ef4444','#22c55e','#3b82f6','#eab308'].map((col,i)=>{const b=document.createElement('button');b.style.background=col;b.style.opacity=.55;
b.onclick=()=>{if(busy)return;if(!go){go=1;q=[];return next()}lit(i,200);
if(i!=q[k]){sc(q.length-1);s.textContent='Missed! Score '+(q.length-1)+' · tap to restart';go=0;return}
if(++k==q.length)setTimeout(next,500)};w.append(b);return b});
const lit=(i,ms)=>{B[i].style.opacity=1;setTimeout(()=>B[i].style.opacity=.55,ms)};
function next(){busy=1;k=0;q.push(rnd(4));s.textContent='Watch… '+(q.length-1);q.forEach((v,j)=>setTimeout(()=>lit(v,350),600+j*600));setTimeout(()=>{busy=0;s.textContent='Your turn'},600+q.length*600)}
return()=>{}}

const GAMES=[
{id:'snake',name:'Snake',e:'🐍',d:'Eat, grow, don’t crash',run:snake},
{id:'2048',name:'2048',e:'🔢',d:'Merge tiles to 2048',run:g2048},
{id:'brk',name:'Brick Breaker',e:'🧱',d:'Smash every brick',run:brk},
{id:'flap',name:'Flap',e:'🐤',d:'Tap through the gaps',run:flap},
{id:'pong',name:'Pong',e:'🏓',d:'Beat the AI',run:pong},
{id:'mem',name:'Memory',e:'🃏',d:'Match all the pairs',run:mem},
{id:'mines',name:'Minesweeper',e:'🚩',d:'Clear the field, 10 mines',run:mines},
{id:'cactus',name:'Cactus Run',e:'🌵',d:'Jump the cacti',run:cactus},
{id:'echo',name:'Echo',e:'🎵',d:'Repeat the pattern',run:echo},
{id:'pg-cake',name:'Piece of Cake',e:'🍰',d:'Merge ingredients, restore a café',img:'https://static.playgama.com/p-img/pg/piece-of-cake-merge--bake/big_preview/b772122937124aa6b59d6e130537c8a8?width=448',url:'https://playgama.com/export/game/piece-of-cake-merge--bake?clid=p_27841169-43c3-4a47-aacd-af9abd43a2a3'},
{id:'pg-egg',name:'Steal an Egg',e:'🥚',d:'Sneak, steal, hatch rare pets',img:'https://static.playgama.com/p-img/pg/steal-an-egg-grow-animals/big_preview/abe5e8a38d9d47488f7d57c239a2e540?width=448',url:'https://playgama.com/export/game/steal-an-egg-grow-animals?clid=p_27841169-43c3-4a47-aacd-af9abd43a2a3'},
{id:'pg-soccer',name:'Soccer Random',e:'⚽',d:'One-button chaotic soccer',img:'https://static.playgama.com/p-img/pg/soccer-random/big-preview/6f59ef235c1e42198225c02473d66943?width=448',url:'https://playgama.com/export/game/soccer-random?clid=p_27841169-43c3-4a47-aacd-af9abd43a2a3'},
{id:'dd',name:'Deadly Descent',e:'🏔️',d:'Wreck your car down a mountain',img:'https://deadlydescent.net/og-image.png',url:'https://deadlydescent.net/export?clid=p_27841169-43c3-4a47-aacd-af9abd43a2a3'},
{id:'pg-hazmob',name:'Hazmob FPS',e:'🔫',d:'Online multiplayer shooter',img:'https://static.playgama.com/p-img/pg/hazmob-fps-online-shooter/big_preview/df01c609f8c44052b837b336d0e63617?width=448',url:'https://playgama.com/export/game/hazmob-fps-online-shooter?clid=p_27841169-43c3-4a47-aacd-af9abd43a2a3'},
{id:'pg-ckg',name:'Car Destruction King',e:'🚗',d:'Crash cars in slow motion',img:'https://static.playgama.com/p-img/pg/car-destruction-king/big_preview/0ca8f4094cfd4826b9888ea1d094bdd7?width=448',url:'https://playgama.com/export/game/car-destruction-king?clid=p_27841169-43c3-4a47-aacd-af9abd43a2a3'},
{id:'o2048',name:'2048 Classic',e:'🔶',d:'The original version',url:'https://gabrielecirulli.github.io/2048/'},
{id:'hex',name:'Hextris',e:'⬢',d:'Spin the hexagon',url:'https://hextris.github.io/hextris/'},
{id:'tet',name:'React Tetris',e:'🟦',d:'Falling blocks',url:'https://chvin.github.io/react-tetris/'},
{id:'fb',name:'Floppy Bird',e:'🐦',d:'Flap through the pipes',url:'https://nebez.github.io/floppybird/'},
{id:'cb',name:'Clumsy Bird',e:'🕊️',d:'Another flapping classic',url:'https://ellisonleao.github.io/clumsy-bird/'},
{id:'ck',name:'Cookie Clicker',e:'🍪',d:'Bake an empire',url:'https://orteil.dashnet.org/cookieclicker/'},
{id:'adr',name:'A Dark Room',e:'🔥',d:'Text adventure',url:'https://adarkroom.doublespeakgames.com/'},
{id:'ai',name:'Alien Invasion',e:'👾',d:'Classic space shooter',url:'https://cykod.github.io/AlienInvasion/'},
{id:'ast',name:'Asteroids',e:'☄️',d:'Vector-style space combat',url:'https://jamessocol.com/asteroids/'},
{id:'fire',name:'Fire Cosmos',e:'🚀',d:'Simple 2D space shooter',url:'https://mangito.github.io/FireCosmos/'},
{id:'ski',name:'SkiFree.js',e:'⛷️',d:'Outrun the yeti',url:'https://basicallydan.github.io/skifree.js/'},
{id:'dig',name:'Digger',e:'⛏️',d:'Dig for gems, dodge boulders',url:'https://lutzroeder.github.io/digger/'},
{id:'astray',name:'Astray',e:'🔮',d:'3D marble maze',url:'https://wwwtyro.github.io/Astray/'},
{id:'c4',name:'Connect Four',e:'🔴',d:'Play against the AI',url:'https://kenrick95.github.io/c4/demo/'},
{id:'hex2048',name:'Hex 2048',e:'🔷',d:'2048 on a hex grid',url:'https://jeffhou.github.io/hex-2048/'},
{id:'pop',name:'Pop Pop Win',e:'💣',d:'Minesweeper, reimagined',url:'https://dart-lang.github.io/sample-pop_pop_win/'},
{id:'inf',name:'Infectors',e:'🦠',d:'Sokoban-style puzzler',url:'https://satanas.github.io/infectors/'},
{id:'hexgl',name:'HexGL',e:'🏎️',d:'Futuristic 3D racing',url:'https://hexgl.bkcore.com/play/'},
{id:'nb',name:'Night Bike',e:'🏍️',d:'Jump the traffic at night',url:'https://nightbike.mattjennin.gs/'},
{id:'bb',name:'BananaBread',e:'🍌',d:'3D first-person shooter',url:'https://kripken.github.io/BananaBread/cube2/bb.html'},
{id:'city',name:'3d.city',e:'🏙️',d:'City-building sandbox',url:'https://lo-th.github.io/3d.city/index.html'},
{id:'x1',name:'itch.io',e:'🕹️',d:'Free browser games · new tab',url:'https://itch.io/games/html5/free',ext:1},
{id:'x2',name:'CrazyGames',e:'🎮',d:'Popular games · new tab',url:'https://www.crazygames.com',ext:1},
{id:'x3',name:'Newgrounds',e:'📺',d:'Classic web games · new tab',url:'https://www.newgrounds.com/games',ext:1}];
