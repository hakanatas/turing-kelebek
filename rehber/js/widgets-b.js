/* Widget'lar B — Ünite 6–9 ve final: veri, ölçüm, istatistik, bulgular, görevler, karne */
(function(){
const {W, C, text:T, line:L, disc:D, spot:SP, WING, M} = TK;
const fmt = TK.fmt;

/* Gerçek veri: [r_d/s, r_p/r_d, rakım m, r_d px, r_p px] — veri/mj_analiz.csv (n = 97) */
TK.DATA = [[0.246,0.240,1505,12.5,3.0],[0.289,0.214,709,14.0,3.0],[0.323,0.206,195,17.0,3.5],[0.169,0.250,78,16.0,4.0],[0.273,0.200,72,15.0,3.0],[0.234,0.182,82,16.5,3.0],[0.211,0.188,990,8.0,1.5],[0.484,0.146,17,24.0,3.5],[0.189,0.321,71,14.0,4.5],[0.238,0.200,146,12.5,2.5],[0.310,0.190,96,10.5,2.0],[0.652,0.211,674,9.5,2.0],[0.179,0.184,1032,19.0,3.5],[0.127,0.214,209,7.0,1.5],[0.223,0.188,690,8.0,1.5],[0.233,0.200,1328,10.0,2.0],[0.301,0.227,2144,11.0,2.5],[0.194,0.200,1415,10.0,2.0],[0.264,0.263,1343,9.5,2.5],[0.209,0.238,53,10.5,2.5],[0.284,0.172,460,14.5,2.5],[0.194,0.235,272,8.5,2.0],[0.293,0.206,270,34.0,7.0],[0.327,0.318,121,11.0,3.5],[0.124,0.158,107,19.0,3.0],[0.149,0.240,171,12.5,3.0],[0.267,0.174,32,11.5,2.0],[0.383,0.158,87,19.0,3.0],[0.238,0.222,1126,9.0,2.0],[0.284,0.143,10,21.0,3.0],[0.157,0.172,908,14.5,2.5],[0.304,0.214,755,7.0,1.5],[0.173,0.222,1201,9.0,2.0],[0.369,0.163,423,21.5,3.5],[0.208,0.150,177,10.0,1.5],[0.270,0.200,1702,7.5,1.5],[0.267,0.160,2121,12.5,2.0],[0.207,0.208,1991,12.0,2.5],[0.238,0.111,4,27.0,3.0],[0.161,0.217,76,11.5,2.5],[0.273,0.250,2127,16.0,4.0],[0.349,0.231,215,13.0,3.0],[0.116,0.280,95,12.5,3.5],[0.229,0.219,215,16.0,3.5],[0.195,0.174,37,11.5,2.0],[0.185,0.250,11,10.0,2.5],[0.252,0.182,607,16.5,3.0],[0.221,0.265,1735,24.5,6.5],[0.282,0.184,2014,19.0,3.5],[0.285,0.200,502,12.5,2.5],[0.332,0.167,882,21.0,3.5],[0.262,0.231,1387,13.0,3.0],[0.197,0.185,451,13.5,2.5],[0.192,0.233,108,15.0,3.5],[0.277,0.206,71,17.0,3.5],[0.204,0.167,212,12.0,2.0],[0.226,0.167,213,12.0,2.0],[0.210,0.280,462,12.5,3.5],[0.302,0.195,699,20.5,4.0],[0.371,0.178,45,22.5,4.0],[0.306,0.200,65,20.0,4.0],[0.287,0.222,257,13.5,3.0],[0.208,0.200,218,15.0,3.0],[0.216,0.217,1647,11.5,2.5],[0.225,0.154,19,19.5,3.0],[0.306,0.222,2129,9.0,2.0],[0.155,0.222,89,22.5,5.0],[0.225,0.185,720,13.5,2.5],[0.200,0.174,52,11.5,2.0],[0.339,0.226,1660,15.5,3.5],[0.249,0.179,803,14.0,2.5],[0.242,0.278,1746,9.0,2.5],[0.179,0.188,34,8.0,1.5],[0.256,0.185,20,13.5,2.5],[0.205,0.188,830,8.0,1.5],[0.398,0.167,1608,18.0,3.0],[0.342,0.182,1687,22.0,4.0],[0.402,0.196,643,23.0,4.5],[0.229,0.176,291,8.5,1.5],[0.200,0.200,1118,10.0,2.0],[0.241,0.154,14,13.0,2.0],[0.253,0.190,1220,10.5,2.0],[0.171,0.192,40,13.0,2.5],[0.207,0.211,58,9.5,2.0],[0.198,0.333,43,9.0,3.0],[0.329,0.208,40,12.0,2.5],[0.354,0.200,1032,10.0,2.0],[0.201,0.143,327,10.5,1.5],[0.217,0.154,218,6.5,1.0],[0.250,0.194,1312,15.5,3.0],[0.401,0.214,83,14.0,3.0],[0.410,0.175,1504,20.0,3.5],[0.273,0.130,78,11.5,1.5],[0.531,0.212,649,16.5,3.5],[0.186,0.192,1,13.0,2.5],[0.227,0.250,1165,12.0,3.0],[0.246,0.217,18,11.5,2.5]];

/* ===== Veri hunisi ===== */
W.funnel = el => {
  TK.shell(el, 'Veri hunisi', 'Bir basamağa dokun');
  const S = [['Türkiye fotoğrafı (M. jurtina)',508,'iNaturalist\'te "araştırma düzeyi" onaylı 390 gözlemin fotoğrafları.'],['CC lisanslı fotoğraf',395,'Yalnız Creative Commons lisanslı fotoğrafları kullanabiliriz. Lisanssız olanlar analizden çıkarıldı ve raporda gösterilmez.'],['Benek bulundu',249,'Bilgisayar "koyu, yuvarlak, ortası parlak, çevresi turuncu" bir leke aradı. %63 fotoğrafta buldu.'],['Geçerli benek',154,'Pupil görünüyor, disk yeterince koyu, disk yarıçapı en az 6 piksel ve pupil–disk karşıtlığı yeterli.'],['Analize giren birey',97,'Ölçek ve geometri filtresinden geçti; aynı kelebeğin birden çok fotoğrafı varsa yalnız biri alındı.']];
  const box = TK.el('div', {style:'display:grid;gap:6px'}), info = TK.el('div', {class:'msg'}, 'Her basamakta neden fotoğraf kaybettiğimizi görmek için dokun.');
  S.forEach((s,i) => { const b = TK.el('button', {type:'button', class:'btn', style:'display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;text-align:left;position:relative;overflow:hidden;padding:8px 12px'}, `<span style="position:absolute;inset:0 auto 0 0;width:${(s[1]/508*100).toFixed(1)}%;background:${TK.rgba(C.signal,.18+i*.08)}"></span><span style="position:relative">${s[0]}</span><b class="num" style="position:relative">${s[1]}</b>`);
    b.onclick = () => { info.innerHTML = `<b>${s[0]}: ${s[1]}</b>${i?` (bir önceki basamağın %${Math.round(100*s[1]/S[i-1][1])}'i)`:''}. ${s[2]}`; }; box.appendChild(b); });
  el.append(box, info);
};

/* ===== Lisans kartları ===== */
W.license = el => {
  TK.shell(el, 'Bu fotoğrafı kullanabilir miyiz?', 'Her kart için karar ver');
  const K = [['CC0','Kamu malı. Hiçbir koşul yok.',true,'Evet. İsim vermek zorunlu değil ama iyi bir alışkanlık.'],['CC-BY','Kullan, ama fotoğrafçının adını ver.',true,'Evet, gözlemcinin adıyla. Rapor Ek A\'daki liste bunun için var.'],['CC-BY-NC','Adını ver, ticari amaçla kullanma.',true,'Evet. Okul yarışması ticari değil. Projedeki fotoğrafların çoğu bu lisansta.'],['CC-BY-SA','Adını ver, türettiğin işi aynı lisansla paylaş.',true,'Evet, adıyla. Türetilmiş görselleri aynı lisansla paylaşmamız gerekir.'],['Tüm hakları saklı','Fotoğrafçı izin vermemiş.',false,'Hayır. Bu fotoğraflar (yaklaşık %22) analizden çıkarıldı ve raporda gösterilmez.']];
  const grid = TK.el('div', {class:'cards'});
  K.forEach(k => { const cd = TK.el('div', {class:'card'}, `<h4>${k[0]}</h4><p>${k[1]}</p><div class="ctrl"><button class="btn" type="button">Kullanırız</button><button class="btn" type="button">Kullanamayız</button></div><div class="ex" hidden></div>`);
    const [y,n] = cd.querySelectorAll('button'), ex = cd.querySelector('.ex');
    const ans = v => { const ok = v===k[2]; ex.hidden=false; ex.className='ex '+(ok?'ok':'bad'); ex.innerHTML=(ok?'<b>Doğru.</b> ':'<b>Tekrar düşün.</b> ')+k[3]; };
    y.onclick=()=>ans(true); n.onclick=()=>ans(false); grid.appendChild(cd); });
  el.append(grid);
};

/* ===== Piksel tuzağı ===== */
W.pixel = el => {
  TK.shell(el, 'Fotoğraf tuzağı', 'Aynı kelebek, farklı yakınlaştırma');
  const c = TK.canvas(el, 640, 420, 'Piksel ve yakınlaştırma');
  let Z=5.5; const pix=document.createElement('canvas'), p=pix.getContext('2d');
  const meas = k => ({ rp:Math.round(2*0.44*k)/2, rd:Math.round(2*2.2*k)/2 });
  const ctr = TK.el('div', {class:'ctrl'}, `<label>Fotoğrafçı ne kadar yakın?<input type="range" min="2" max="16" step="0.5" value="5.5"><span class="sv"></span></label>`);
  [['Uzaktan',2.5],['Orta',6],['Makro',15]].forEach(([s,v]) => { const b=TK.el('button',{class:'btn',type:'button'},s); b.onclick=()=>{ inp.value=v; upd(); }; ctr.appendChild(b); });
  const ro = TK.el('div', {class:'ro-grid'}, `<div class="ro">Pupil<b class="a"></b></div><div class="ro">Disk<b class="b"></b></div><div class="ro">Fark<b class="f"></b></div><div class="ro hl">Oran<b class="o"></b></div>`);
  el.append(ctr, ro); const inp = ctr.querySelector('input');
  const upd = () => { Z=+inp.value; const m=meas(Z); ctr.querySelector('.sv').textContent=Z.toFixed(1)+' px/mm'; ro.querySelector('.a').textContent=m.rp.toFixed(1)+' px'; ro.querySelector('.b').textContent=m.rd.toFixed(1)+' px'; ro.querySelector('.f').textContent=(m.rd-m.rp).toFixed(1)+' px'; ro.querySelector('.o').textContent=fmt(m.rp/m.rd); c.draw(); };
  inp.oninput = upd;
  c.static(() => {
    const ctx=c.ctx, n=Math.max(4,Math.round(7*Z)); pix.width=n; pix.height=n; p.fillStyle=WING.or; p.fillRect(0,0,n,n);
    const g=p.createRadialGradient(n/2,n/2,n*.3,n/2,n/2,n*.75); g.addColorStop(0,'rgba(90,61,39,0)'); g.addColorStop(1,'rgba(90,61,39,.85)'); p.fillStyle=g; p.fillRect(0,0,n,n); SP(p,n/2,n/2,Z,0.44,2.2);
    const X0=24,Y0=56,SZ=320,sc=SZ/n; ctx.imageSmoothingEnabled=false; ctx.drawImage(pix,X0,Y0,SZ,SZ); ctx.imageSmoothingEnabled=true;
    if (n<=48){ ctx.strokeStyle='rgba(0,0,0,.18)'; ctx.lineWidth=1; ctx.beginPath(); for (let i=1;i<n;i++){ ctx.moveTo(X0+i*sc,Y0); ctx.lineTo(X0+i*sc,Y0+SZ); ctx.moveTo(X0,Y0+i*sc); ctx.lineTo(X0+SZ,Y0+i*sc); } ctx.stroke(); }
    ctx.strokeStyle=C.ink; ctx.lineWidth=2; ctx.strokeRect(X0,Y0,SZ,SZ);
    T(ctx,'Kameranın gördüğü: '+n+' × '+n+' piksel',X0,Y0-12,{w:700}); T(ctx,'(gerçekte hep aynı 7 mm × 7 mm)',X0,Y0+SZ+20,{size:12,color:C.muted});
    const m=meas(Z), cx=X0+SZ/2, cy=Y0+SZ/2, ar=(x2,y2,col)=>{ L(ctx,cx,cy,x2,y2,'#000',5); L(ctx,cx,cy,x2,y2,col,2.5); D(ctx,x2,y2,3.5,col); };
    ar(cx+m.rd*sc,cy,'#FFE08A'); ar(cx,cy-m.rp*sc,'#7FE0F0');
    const ch=(y0,y1,title,fn,ymax,col,fv)=>{ const x0=392,x1=616,X=k=>x0+(k-2)/14*(x1-x0),Y=v=>y1-v/ymax*(y1-y0);
      T(ctx,title,x0,y0-10,{w:700}); L(ctx,x0,y1,x1,y1,C.muted); L(ctx,x0,y0,x0,y1,C.muted);
      ctx.beginPath(); for (let k=2;k<=16;k+=0.05){ const v=fn(k); k===2?ctx.moveTo(X(k),Y(v)):ctx.lineTo(X(k),Y(v)); } ctx.strokeStyle=col; ctx.lineWidth=2.5; ctx.stroke();
      L(ctx,X(Z),y0,X(Z),y1,C.ink,1,[3,3]); D(ctx,X(Z),Y(fn(Z)),5,col); T(ctx,fv(fn(Z)),X(Z)+(Z>12?-8:8),Y(fn(Z))-8,{size:12,mono:true,align:Z>12?'right':'left'});
      T(ctx,'uzak',x0,y1+15,{size:11,color:C.muted}); T(ctx,'yakın',x1,y1+15,{size:11,color:C.muted,align:'right'}); };
    ch(70,180,'Fark (piksel): değişiyor!',k=>{const q=meas(k);return q.rd-q.rp;},30,C.bad,v=>v.toFixed(1)+' px');
    ch(250,360,'Oran: neredeyse sabit',k=>{const q=meas(k);return q.rp/q.rd;},0.4,C.ok,v=>fmt(v));
    T(ctx,'İkisi de aynı kelebek!',392,404,{w:700,color:C.signal});
  });
  upd();
};

/* ===== Radyal profil ve yarı-yükseklik ===== */
W.profile = el => {
  TK.shell(el, 'Bilgisayar halkayı nasıl ölçer?', 'Sarı ve mavi işaretleri sürükle');
  const c = TK.canvas(el, 640, 340, 'Radyal parlaklık profili');
  let rp, rd, noise, guess, show=false, drag=null;
  const P0=235, P1=28, P2=168, Wd=0.9;
  const bright = r => { const s1=1/(1+Math.exp((r-rp)/Wd)), s2=1/(1+Math.exp(-(r-rd)/Wd)); return P1 + (P0-P1)*s1 + (P2-P1)*s2; };
  const newSpot = () => { rp=2+Math.random()*2.5; rd=10+Math.random()*7; noise=Array.from({length:120},()=> (Math.random()-0.5)*14); guess=[rp+2.5, rd-3]; show=false; msg.className='msg'; msg.textContent='Sarı çizgiyi pupil sınırına, mavi çizgiyi disk sınırına sürükle. Sonra "Kontrol et".'; c.draw(); };
  const ctr = TK.el('div', {class:'ctrl'}); const bC=TK.el('button',{class:'btn primary',type:'button'},'Kontrol et'), bN=TK.el('button',{class:'btn',type:'button'},'Yeni benek');
  ctr.append(bC,bN); const msg = TK.el('div', {class:'msg'}); el.append(ctr,msg);
  const x0=300,x1=620,y0=30,y1=290,RM=24, X=r=>x0+r/RM*(x1-x0), Rx=x=>(x-x0)/(x1-x0)*RM, Y=v=>y1-v/255*(y1-y0);
  const truth = () => { const lp=(P0+P1)/2, ld=(P1+P2)/2; let a=rp, b=rd; for (let r=0;r<RM;r+=0.01){ if (bright(r)<=lp){ a=r; break; } } for (let r=a+0.5;r<RM;r+=0.01){ if (bright(r)>=ld){ b=r; break; } } return [a,b,lp,ld]; };
  bC.onclick = () => { show=true; const [a,b]=truth(); const e1=guess[0]-a, e2=guess[1]-b; const ok=Math.abs(e1)<0.6 && Math.abs(e2)<0.8;
    msg.className='msg '+(ok?'ok':'warn'); msg.innerHTML=`Yarı-yükseklik yöntemi: pupil <b>${a.toFixed(1)} px</b>, disk <b>${b.toFixed(1)} px</b>. Senin farkın: pupil ${e1>=0?'+':''}${e1.toFixed(1)} px, disk ${e2>=0?'+':''}${e2.toFixed(1)} px. ${ok?'Çok iyi!':'Kesikli çizgilerin eğriyi kestiği yere bak.'} Sınır, parlaklığın iki komşu bölgenin <b>tam ortasına</b> indiği yer.`; c.draw(); };
  bN.onclick = newSpot;
  c.cv.addEventListener('pointerdown', e => { const p=c.pos(e); if (p.x<x0-10) return; const d0=Math.abs(p.x-X(guess[0])), d1=Math.abs(p.x-X(guess[1])); drag = d0<d1 ? 0 : 1; c.cv.setPointerCapture(e.pointerId); move(p); });
  const move = p => { if (drag===null) return; guess[drag]=TK.clamp(Rx(p.x),0.2,RM-0.5); show=false; c.draw(); };
  c.cv.addEventListener('pointermove', e => move(c.pos(e))); c.cv.addEventListener('pointerup', () => drag=null);
  c.static(() => { if (!guess) return;
    const ctx=c.ctx, N=48, cs=260/N; for (let j=0;j<N;j++) for (let i=0;i<N;i++){ const r=Math.hypot(i-N/2+0.5,j-N/2+0.5)*RM/(N/2)*0.95; const v=TK.clamp(bright(r)+noise[(i*7+j*13)%120]*0.6,0,255); const t=v/255; ctx.fillStyle=`rgb(${Math.round(40+t*200)},${Math.round(28+t*170)},${Math.round(18+t*130)})`; ctx.fillRect(16+i*cs,40+j*cs,cs+0.5,cs+0.5); }
    L(ctx,16+130,40+130,16+260,40+130,'#7FE0F0',2,[4,3]); T(ctx,'merkezden dışarı: radyal profil',16,30,{w:700});
    L(ctx,x0,y1,x1,y1,C.muted); L(ctx,x0,y0,x0,y1,C.muted); for (let r=0;r<=RM;r+=4) T(ctx,r+' px',X(r),y1+16,{align:'center',size:11,mono:true,color:C.muted});
    T(ctx,'parlaklık',x0-6,y0+4,{align:'right',size:11,color:C.muted});
    ctx.beginPath(); for (let k=0;k<120;k++){ const r=k*0.2, v=bright(r)+noise[k]; k?ctx.lineTo(X(r),Y(v)):ctx.moveTo(X(r),Y(v)); } ctx.strokeStyle=C.ink; ctx.lineWidth=1.8; ctx.stroke();
    T(ctx,'beyaz pupil',X(0.3),Y(P0)-8,{size:12,color:C.muted}); T(ctx,'siyah disk',X((rp+rd)/2),Y(P1)+18,{align:'center',size:12,color:C.muted}); T(ctx,'turuncu zemin',X(rd+2),Y(P2)-10,{size:12,color:C.muted});
    if (show){ const [a,b,lp,ld]=truth(); [[lp,a],[ld,b]].forEach(([lv,r]) => { L(ctx,x0,Y(lv),x1,Y(lv),C.signal,1,[5,4]); D(ctx,X(r),Y(lv),5,C.signal); }); T(ctx,'yarı yükseklik',x1,Y(lp)-6,{align:'right',size:11,color:C.signal}); }
    [[0,'#E0A800','pupil'],[1,'#2B8FD6','disk']].forEach(([i,col,s]) => { L(ctx,X(guess[i]),y0,X(guess[i]),y1,col,3); T(ctx,s,X(guess[i]),y0-6,{align:'center',size:12,w:700,color:col}); });
  });
  newSpot();
};

/* ===== Ortalama, standart sapma, CV ===== */
W.stats = el => {
  TK.shell(el, 'Dağılımı ölç', 'Noktaları sürükle');
  const c = TK.canvas(el, 640, 220, 'Ortalama ve standart sapma');
  const PRE = { 'Gerçek veriden 10 kelebek':TK.DATA.slice(0,10).map(d=>d[1]), 'Hepsi neredeyse aynı':[0.2,0.2,0.21,0.19,0.2,0.2,0.21,0.2,0.19,0.2], 'Çok dağınık':[0.08,0.12,0.15,0.2,0.22,0.25,0.28,0.31,0.34,0.38] };
  let v = PRE['Gerçek veriden 10 kelebek'].slice(), drag=-1;
  const x0=40,x1=600, X=a=>x0+a/0.4*(x1-x0), V=x=>TK.clamp((x-x0)/(x1-x0)*0.4,0,0.4);
  const ctr = TK.el('div', {class:'ctrl'}); Object.keys(PRE).forEach(k => { const b=TK.el('button',{class:'btn',type:'button'},k); b.onclick=()=>{ v=PRE[k].slice(); upd(); }; ctr.appendChild(b); });
  const ro = TK.el('div', {class:'ro-grid'}, `<div class="ro">Ortalama<b class="m"></b></div><div class="ro">Standart sapma (SS)<b class="s"></b></div><div class="ro hl">Değişim katsayısı CV = SS ÷ ort.<b class="c"></b></div>`);
  el.append(ctr, ro);
  const upd = () => { const m=TK.mean(v), s=TK.sd(v); ro.querySelector('.m').textContent=fmt(m,3); ro.querySelector('.s').textContent=fmt(s,3); ro.querySelector('.c').textContent='%'+(100*s/m).toFixed(0); c.draw(); };
  c.cv.addEventListener('pointerdown', e => { const p=c.pos(e); let b=-1,bd=24; v.forEach((a,i)=>{ const d=Math.hypot(p.x-X(a),p.y-(70+i*12)); if(d<bd){bd=d;b=i;} }); drag=b; if (b>=0) c.cv.setPointerCapture(e.pointerId); });
  c.cv.addEventListener('pointermove', e => { if (drag<0) return; v[drag]=V(c.pos(e).x); upd(); }); c.cv.addEventListener('pointerup', () => drag=-1);
  c.static(() => { const ctx=c.ctx, m=TK.mean(v), s=TK.sd(v);
    ctx.fillStyle=TK.rgba(C.signal,.12); ctx.fillRect(X(m-s),40,X(m+s)-X(m-s),150); L(ctx,X(m),34,X(m),196,C.signal,2.5);
    T(ctx,'ortalama',X(m),28,{align:'center',w:700,color:C.signal,size:12}); T(ctx,'± 1 SS',X(m+s)+4,52,{size:12,color:C.signal});
    L(ctx,x0,196,x1,196,C.muted); for (let a=0;a<=0.4001;a+=0.1) T(ctx,a.toFixed(1),X(a),212,{align:'center',size:11,mono:true,color:C.muted});
    v.forEach((a,i) => { D(ctx,X(a),70+i*12,7,C.ink); }); T(ctx,'oran (pupil ÷ disk)',x1,212,{align:'right',size:11,color:C.muted}); });
  upd();
};

/* ===== Spearman ρ: sıralarla korelasyon ===== */
W.spearman = el => {
  TK.shell(el, 'Korelasyon laboratuvarı', 'Noktaları sürükle, ρ\'yu izle');
  const c = TK.canvas(el, 640, 340, 'Korelasyon grafiği');
  const PRE = { 'Birlikte artıyor':[[1,1.5],[2,2.2],[3,2.8],[4,4.1],[5,4.6],[6,5.9],[7,6.4],[8,7.8]], 'Biri artarken öteki azalıyor':[[1,7.6],[2,7],[3,5.8],[4,5.2],[5,3.9],[6,3.1],[7,2.2],[8,1.4]], 'İlişki yok':[[1,4.2],[2,6.9],[3,2.1],[4,5.5],[5,3.4],[6,7.2],[7,1.8],[8,4.8]], 'Bir uç değer':[[1,1],[2,1.3],[3,1.6],[4,1.9],[5,2.2],[6,2.5],[7,2.8],[8,8.6]] };
  let P = PRE['Birlikte artıyor'].map(p=>p.slice()), drag=-1;
  const x0=60,x1=400,y0=20,y1=310, X=v=>x0+v/9*(x1-x0), Y=v=>y1-v/9*(y1-y0), iX=x=>TK.clamp((x-x0)/(x1-x0)*9,0.2,8.8), iY=y=>TK.clamp((y1-y)/(y1-y0)*9,0.2,8.8);
  const ctr = TK.el('div', {class:'ctrl'}); Object.keys(PRE).forEach(k => { const b=TK.el('button',{class:'btn',type:'button'},k); b.onclick=()=>{ P=PRE[k].map(p=>p.slice()); upd(); }; ctr.appendChild(b); });
  const msg = TK.el('div', {class:'msg'}); el.append(ctr, msg);
  const upd = () => { const x=P.map(p=>p[0]), y=P.map(p=>p[1]), r=TK.pearson(x,y), rho=TK.spearman(x,y);
    msg.innerHTML = `Spearman <b>ρ = ${fmt(rho)}</b> · Pearson r = ${fmt(r)}. ` + (Math.abs(rho)<0.3 ? 'Belirgin bir ilişki yok.' : rho>0 ? 'Biri büyürken öteki de büyüyor.' : 'Biri büyürken öteki küçülüyor.') + (Math.abs(r-rho)>0.15 ? ' <b>Dikkat:</b> iki sayı farklı! Pearson uç değerden çok etkilenir; Spearman yalnız sıralara baktığı için daha dayanıklı.' : ''); c.draw(); };
  c.cv.addEventListener('pointerdown', e => { const p=c.pos(e); let b=-1,bd=22; P.forEach((q,i)=>{ const d=Math.hypot(p.x-X(q[0]),p.y-Y(q[1])); if(d<bd){bd=d;b=i;} }); drag=b; if (b>=0) c.cv.setPointerCapture(e.pointerId); });
  c.cv.addEventListener('pointermove', e => { if (drag<0) return; const p=c.pos(e); P[drag]=[iX(p.x),iY(p.y)]; upd(); }); c.cv.addEventListener('pointerup', () => drag=-1);
  c.static(() => { const ctx=c.ctx; ctx.strokeStyle=C.line; ctx.strokeRect(x0,y0,x1-x0,y1-y0); T(ctx,'x (ör. benek boyu) →',x1,y1+20,{align:'right',size:12,color:C.muted});
    ctx.save(); ctx.translate(30,(y0+y1)/2); ctx.rotate(-Math.PI/2); T(ctx,'y (ör. oran) →',0,0,{align:'center',size:12,color:C.muted}); ctx.restore();
    const rx=TK.ranks(P.map(p=>p[0])), ry=TK.ranks(P.map(p=>p[1]));
    P.forEach((p,i) => { D(ctx,X(p[0]),Y(p[1]),9,C.signal); T(ctx,String.fromCharCode(65+i),X(p[0]),Y(p[1])+4,{align:'center',size:11,w:700,color:'#fff'}); });
    const tx=440; T(ctx,'Sıralar (küçükten büyüğe)',tx,30,{w:700}); T(ctx,'nokta   x sırası   y sırası',tx,54,{size:12,mono:true,color:C.muted});
    P.forEach((p,i) => { const d=rx[i]-ry[i]; T(ctx,`  ${String.fromCharCode(65+i)}        ${rx[i]}          ${ry[i]}`,tx,78+i*24,{size:13,mono:true,color:Math.abs(d)>=3?C.bad:C.ink}); });
    T(ctx,'Sıralar uyumluysa ρ ≈ +1,',tx,286,{size:12,color:C.muted}); T(ctx,'ters sıradaysa ρ ≈ −1.',tx,302,{size:12,color:C.muted}); });
  upd();
};

/* ===== Karıştırma testi (p-değeri) gerçek veriyle ===== */
W.permutation = el => {
  TK.shell(el, 'Şans mı, gerçek mi?', 'Gerçek 97 kelebekle karıştırma testi');
  const c = TK.canvas(el, 640, 300, 'Karıştırma testi histogramı');
  const x=TK.DATA.map(d=>d[0]), y=TK.DATA.map(d=>d[1]), obs=TK.spearman(x,y); let sims=[], run=false;
  const ctr = TK.el('div', {class:'ctrl'}); const b = TK.el('button', {class:'btn primary', type:'button'}, '1000 kez karıştır'); ctr.append(b);
  const msg = TK.el('div', {class:'msg'}, `Gerçek veride ρ = <b>${fmt(obs)}</b>. Peki oranlar ile benek boyları arasında hiçbir bağ olmasaydı, sırf şansla bu kadar büyük bir ρ ne sıklıkla çıkardı?`);
  el.append(ctr, msg);
  b.onclick = () => { sims=[]; run=true; if (TK.REDUCE){ while(sims.length<1000) sims.push(one()); run=false; fin(); } };
  const one = () => TK.spearman(x, TK.shuffle(y));
  const fin = () => { const p = sims.filter(s=>Math.abs(s)>=Math.abs(obs)).length/sims.length; msg.className='msg warn'; msg.innerHTML = `Karıştırılmış verilerin <b>%${(100*p).toFixed(0)}</b>'inde |ρ| en az ${fmt(Math.abs(obs))} çıktı. Bu sayıya <b>p-değeri</b> denir (p ≈ ${p.toFixed(2)}). p, 0.05'ten büyük olduğu için bu zayıf negatif ilişki şansla açıklanabilir: <b>anlamlı değil</b>. Rapordaki değer de p = 0.17.`; };
  c.animate((t, dt) => {
    if (run && dt>0){ for (let i=0;i<25 && sims.length<1000;i++) sims.push(one()); if (sims.length>=1000){ run=false; fin(); } }
    const ctx=c.ctx, x0=40,x1=600,y1=250,y0=30, X=v=>x0+(v+0.5)/1*(x1-x0), bins=50, h=new Array(bins).fill(0);
    sims.forEach(s => { const k=Math.floor((s+0.5)*bins); if (k>=0&&k<bins) h[k]++; }); const hm=Math.max(10,...h);
    h.forEach((n,k) => { const lo=-0.5+k/bins, ext=Math.abs(lo+0.5/bins)>=Math.abs(obs); ctx.fillStyle=ext?TK.rgba(C.warn,.85):TK.rgba(C.muted,.55); const bh=n/hm*(y1-y0); ctx.fillRect(X(lo)+1,y1-bh,(x1-x0)/bins-2,bh); });
    L(ctx,x0,y1,x1,y1,C.muted); [-0.4,-0.2,0,0.2,0.4].forEach(v => T(ctx,(v>0?'+':'')+fmt(v,1),X(v),y1+18,{align:'center',size:12,mono:true,color:C.muted}));
    L(ctx,X(obs),y0-10,X(obs),y1,C.ink,2,[6,4]); T(ctx,'gerçek: '+fmt(obs),X(obs)-6,y0-14,{align:'right',w:700});
    T(ctx,'karıştırma: '+sims.length+' / 1000',x1,y0-14,{align:'right',size:12,mono:true,color:C.muted}); T(ctx,'turuncu = gerçek değer kadar ya da daha uç',x0,292,{size:12,color:C.warn});
  });
};

/* ===== Monte Carlo (monte_carlo.py T2'nin tarayıcı sürümü) ===== */
W.montecarlo = el => {
  TK.shell(el, 'Monte Carlo deneyi', 'Dört senaryo · cevabı bilinen sahte kelebekler');
  const c = TK.canvas(el, 640, 470, 'Monte Carlo histogramları');
  const KEYS=['S','L','P','T']; let rnd=TK.rng(2204), gauss=TK.gaussFrom(rnd); const R=400; let MC, run=false;
  const reset = () => { MC={}; KEYS.forEach(k => MC[k]={r:[],sig:0,cv:0}); };
  const rep = (sen) => { const X=[],Y=[], q=x=>Math.round(2*(x+0.15*gauss()))/2;
    for (let i=0;i<97;i++){ let lam=M.LAM0, lnS=0; if (sen==='S') lnS=gauss()*0.2*4.4; else lam=M.LAM0*Math.exp(gauss()*0.2);
      const rd=lam*(4.4+lnS); let rp=lam*(0.88+lnS); if (sen==='P') rp=0.44*Math.exp(gauss()*0.05); if (sen==='T') rp=lam*0.88*Math.exp(gauss()*0.17);
      const s=9+1.2*gauss(), ppm=Math.exp(Math.log(5.7)+0.4*gauss()), rdp=q(rd*ppm), rpp=q(rp*ppm), sp=ppm*(s+1.8*gauss());
      if (rdp>=6 && rpp>=1 && sp/rdp>1.5 && sp/rdp<9){ X.push(rdp/sp); Y.push(rpp/rdp); } }
    const r=TK.spearman(X,Y), crit=1.96/Math.sqrt(X.length-1); return [r, Math.abs(r)>crit, TK.sd(Y)/TK.mean(Y)]; };
  const add = () => KEYS.forEach(k => { const [r,s,cv]=rep(k); MC[k].r.push(r); if (s) MC[k].sig++; MC[k].cv+=cv; });
  const ctr = TK.el('div', {class:'ctrl'}); const b=TK.el('button',{class:'btn primary',type:'button'},'Deneyi başlat'); const st=TK.el('span',{class:'sv'}); ctr.append(b,st); el.append(ctr);
  const ro = TK.el('div', {class:'tw'}); el.append(ro);
  reset();
  b.onclick = () => { rnd=TK.rng(2204); gauss=TK.gaussFrom(rnd); reset(); run=true; if (TK.REDUCE){ while(MC.S.r.length<R) add(); run=false; } };
  const rows=()=>[['S','Yalnız güç S',C['s-col']],['L','Yalnız menzil λ',C['lam-col']],['P','Pupil sabit',C.warn],['T','λ + pupil eşiği',C.ok]];
  let lastN=-1;
  c.animate((t, dt) => {
    if (run && dt>0){ for (let i=0;i<5 && MC.S.r.length<R;i++) add(); if (MC.S.r.length>=R) run=false; }
    const n=MC.S.r.length; st.textContent='deney: '+n+' / '+R;
    if (n!==lastN){ lastN=n; ro.innerHTML = n ? `<table class="t"><thead><tr><th>Senaryo</th><th>Ortalama ρ</th><th>"Anlamlı" bulma</th><th>Oran CV</th><th>Gerçek veriyle (ρ −0,14 · CV 0,19)</th></tr></thead><tbody>${rows().map(([k,lab]) => { const m=TK.mean(MC[k].r), cv=MC[k].cv/n, ok=Math.abs(m+0.14)<0.2 && Math.abs(cv-0.19)<0.05; return `<tr><td>${lab}</td><td class="num">${(m>=0?'+':'')+fmt(m)}</td><td class="num">%${Math.round(100*MC[k].sig/n)}</td><td class="num">${fmt(cv)}</td><td>${n>=R?(ok?'<b style="color:var(--ok)">✓ uyumlu</b>':'<span style="color:var(--bad)">✗</span>'):'…'}</td></tr>`; }).join('')}</tbody></table>` : ''; }
    const ctx=c.ctx, x0=150,x1=620, X=v=>x0+(v+0.8)/1.6*(x1-x0), bins=40, RW=rows();
    const H=RW.map(([k]) => { const h=new Array(bins).fill(0); MC[k].r.forEach(v => { const q=Math.floor((v+0.8)/1.6*bins); if (q>=0&&q<bins) h[q]++; }); return h; }); const hm=Math.max(10,...H.flat());
    RW.forEach(([k,lab,col],i) => { const y1=112+i*92, y0=y1-74; T(ctx,lab,12,y1-36,{w:700,size:14,color:col});
      if (MC[k].r.length){ const m=TK.mean(MC[k].r); T(ctx,'ort. ρ = '+(m>=0?'+':'')+fmt(m),12,y1-16,{size:12,mono:true,color:C.muted}); }
      L(ctx,x0,y1,x1,y1,C.line); H[i].forEach((v,q) => { const bh=Math.min(y1-y0,v/hm*(y1-y0)); ctx.fillStyle=TK.rgba(col,.85); ctx.fillRect(x0+q*(x1-x0)/bins+1,y1-bh,(x1-x0)/bins-2,bh); }); });
    [-0.8,-0.4,0,0.4,0.8].forEach(v => { L(ctx,X(v),404,X(v),408,C.muted); T(ctx,(v>0?'+':'')+fmt(v,1),X(v),422,{align:'center',size:12,mono:true,color:C.muted}); });
    T(ctx,'← oran büyük beneklerde küçülüyor',x0,446,{size:11,color:C.muted}); T(ctx,'büyüyor →',x1,446,{align:'right',size:11,color:C.muted});
    L(ctx,X(-0.14),22,X(-0.14),406,C.ink,2,[6,4]); T(ctx,'gerçek kelebekler: −0.14',X(-0.14)+6,18,{w:700});
    if (!n) T(ctx,'"Deneyi başlat"a bas',(x0+x1)/2,220,{align:'center',size:16,color:C.muted});
  });
};

/* ===== Varyans ayrışımı (Önerme 4b) ===== */
W.variance = el => {
  TK.shell(el, 'Saçılım gerçek mi, gürültü mü?', 'Eğriyi üç noktaya oturt');
  const c = TK.canvas(el, 640, 330, 'CV ve q grafiği');
  const PTS = [[0.312,0.202,'küçük benekler (6,5–11,5 px)'],[0.155,0.193,'orta (11,5–15 px)'],[0.085,0.175,'büyük (15–34 px)']];
  const ctr = TK.el('div', {class:'ctrl'}, `<label>Gerçek saçılım CV<sub>gerçek</sub><input type="range" min="0" max="0.22" step="0.002" value="0.05" class="ig"><span class="sv vg"></span></label><label>Ölçüm gürültüsü τ<input type="range" min="0" max="0.6" step="0.01" value="0.5" class="it"><span class="sv vt"></span></label>`);
  const ctr2 = TK.el('div', {class:'ctrl'}); const bf=TK.el('button',{class:'btn',type:'button'},'En iyi uyumu göster'), bo=TK.el('button',{class:'btn',type:'button'},'v2\'nin varsayımı (τ = 0,5 px)'); ctr2.append(bf,bo);
  const msg = TK.el('div', {class:'msg'}); el.append(ctr, ctr2, msg);
  const ig=ctr.querySelector('.ig'), it=ctr.querySelector('.it');
  const upd = () => { ctr.querySelector('.vg').textContent=(+ig.value).toFixed(3); ctr.querySelector('.vt').textContent=(+it.value).toFixed(2)+' px'; c.draw(); };
  ig.oninput=upd; it.oninput=upd; bf.onclick=()=>{ ig.value=0.169; it.value=0.21; upd(); }; bo.onclick=()=>{ ig.value=0.03; it.value=0.5; upd(); };
  c.static(() => { const ctx=c.ctx, g=+ig.value, tau=+it.value, x0=70,x1=600,y0=24,y1=280, X=q=>x0+q/0.36*(x1-x0), Y=v=>y1-v/0.3*(y1-y0);
    ctx.strokeStyle=C.line; ctx.strokeRect(x0,y0,x1-x0,y1-y0);
    [0,0.1,0.2,0.3].forEach(v => { L(ctx,x0,Y(v),x1,Y(v),C.line,1,[2,4]); T(ctx,fmt(v,1),x0-6,Y(v)+4,{align:'right',size:11,mono:true,color:C.muted}); });
    [0,0.1,0.2,0.3].forEach(v => T(ctx,fmt(v,1),X(v),y1+16,{align:'center',size:11,mono:true,color:C.muted}));
    T(ctx,'q = 1/r_p² + 1/r_d²  (küçük benek → büyük q)',x1,y1+34,{align:'right',size:12,color:C.muted});
    ctx.save(); ctx.translate(24,(y0+y1)/2); ctx.rotate(-Math.PI/2); T(ctx,'oranın CV\'si',0,0,{align:'center',size:12,color:C.muted}); ctx.restore();
    ctx.beginPath(); for (let q=0;q<=0.36;q+=0.003){ const v=Math.sqrt(g*g+tau*tau*q); q?ctx.lineTo(X(q),Y(v)):ctx.moveTo(X(q),Y(v)); } ctx.strokeStyle=C.signal; ctx.lineWidth=3; ctx.stroke();
    D(ctx,X(0),Y(g),6,C.ok); T(ctx,'kesme = CV_gerçek',X(0)+8,Y(g)+18,{size:12,w:700,color:C.ok});
    let sse=0; PTS.forEach(([q,v,s]) => { const m=Math.sqrt(g*g+tau*tau*q); sse+=(m-v)**2; D(ctx,X(q),Y(v),7,C.ink); T(ctx,s,X(q),Y(v)-12,{align:'center',size:11,color:C.muted}); });
    const rmse=Math.sqrt(sse/3), good=rmse<0.006, noiseShare = tau*tau*0.17/(g*g+tau*tau*0.17);
    msg.className='msg '+(good?'ok':''); msg.innerHTML = (good ? '<b>Eğri oturdu.</b> ' : `Eğri noktalardan ortalama ${(rmse*100).toFixed(1)} puan uzakta. `) + `Bu ayarda tipik bir benekteki saçılımın <b>%${Math.round(100*(1-noiseShare))}</b>'i gerçek bireysel fark, %${Math.round(100*noiseShare)}'i ölçüm gürültüsü.` + (good ? ' Rapor v3: CV<sub>gerçek</sub> = 0,169, τ = 0,21 px. Saçılımın büyük kısmı <b>gerçek</b>: kelebeklerin oranları gerçekten farklı.' : '');
  });
  upd();
};

/* ===== İki ölçücü uyumu (ICC) ===== */
W.icc = el => {
  TK.shell(el, 'İki ölçücü, aynı 30 fotoğraf', 'Ölçüm hatasını değiştir, uyumu izle');
  const c = TK.canvas(el, 640, 330, 'İki ölçücünün karşılaştırması');
  let ea=8, eb=8, truth=[], na=[], nb=[];
  const gen = () => { truth = Array.from({length:30},()=>140+Math.random()*260); na=truth.map(()=>TK.gaussFrom(Math.random)()); nb=truth.map(()=>TK.gaussFrom(Math.random)()); };
  const ctr = TK.el('div', {class:'ctrl'}, `<label>Ayşe'nin hatası<input type="range" min="0" max="60" step="2" value="8" class="a"><span class="sv va"></span></label><label>Mert'in hatası<input type="range" min="0" max="60" step="2" value="8" class="b"><span class="sv vb"></span></label>`);
  const bn = TK.el('button', {class:'btn', type:'button'}, 'Yeni 30 fotoğraf'); ctr.append(bn);
  const msg = TK.el('div', {class:'msg'}); el.append(ctr, msg);
  const iccOf = (A,B) => { const n=A.length, gm=(TK.mean(A)+TK.mean(B))/2; let msb=0, msw=0; for (let i=0;i<n;i++){ const m=(A[i]+B[i])/2; msb += 2*(m-gm)**2; msw += (A[i]-m)**2 + (B[i]-m)**2; } msb/=(n-1); msw/=n; return (msb-msw)/(msb+msw); };
  const upd = () => { ea=+ctr.querySelector('.a').value; eb=+ctr.querySelector('.b').value; ctr.querySelector('.va').textContent='± '+ea+' px'; ctr.querySelector('.vb').textContent='± '+eb+' px'; c.draw(); };
  ctr.querySelector('.a').oninput=upd; ctr.querySelector('.b').oninput=upd; bn.onclick=()=>{ gen(); upd(); };
  c.static(() => { const A=truth.map((t,i)=>t+ea*na[i]), B=truth.map((t,i)=>t+eb*nb[i]), icc=iccOf(A,B);
    const ctx=c.ctx, x0=60,x1=330,y0=20,y1=290, lo=80, hi=460, X=v=>x0+(v-lo)/(hi-lo)*(x1-x0), Y=v=>y1-(v-lo)/(hi-lo)*(y1-y0);
    ctx.strokeStyle=C.line; ctx.strokeRect(x0,y0,x1-x0,y1-y0); L(ctx,X(lo),Y(lo),X(hi),Y(hi),C.muted,1.2,[5,4]); T(ctx,'tam uyum',X(hi)-6,Y(hi)+16,{align:'right',size:11,color:C.muted});
    A.forEach((a,i) => D(ctx,X(a),Y(B[i]),4.5,TK.rgba(C.signal,.8)));
    T(ctx,'Ayşe: kanat uzunluğu (px) →',x1,y1+20,{align:'right',size:12,color:C.muted}); ctx.save(); ctx.translate(26,(y0+y1)/2); ctx.rotate(-Math.PI/2); T(ctx,'Mert (px) →',0,0,{align:'center',size:12,color:C.muted}); ctx.restore();
    const gx=380,gw=230; T(ctx,'Uyum katsayısı ICC',gx,60,{w:700,size:15}); T(ctx,fmt(icc),gx,108,{w:800,size:44,color:icc>=0.8?C.ok:icc>=0.5?C.warn:C.bad});
    ctx.fillStyle=TK.rgba(C.muted,.2); ctx.fillRect(gx,140,gw,14); ctx.fillStyle=icc>=0.8?C.ok:icc>=0.5?C.warn:C.bad; ctx.fillRect(gx,140,gw*TK.clamp(icc,0,1),14);
    L(ctx,gx+gw*0.8,132,gx+gw*0.8,162,C.ink,2); T(ctx,'hedef 0.8',gx+gw*0.8,178,{align:'center',size:12,w:700});
    T(ctx,'0',gx,174,{size:11,mono:true,color:C.muted}); T(ctx,'1',gx+gw,174,{align:'right',size:11,mono:true,color:C.muted});
    T(ctx,'1 = iki ölçücü hep aynı sonucu buluyor',gx,220,{size:12,color:C.muted}); T(ctx,'0 = ölçümler rastgele',gx,238,{size:12,color:C.muted}); T(ctx,'Ön analizdeki otomatik ölçek: ICC 0.30',gx,270,{size:12,w:700,color:C.bad});
    msg.className='msg '+(icc>=0.8?'ok':'warn'); msg.innerHTML = icc>=0.8 ? 'ICC hedefin üstünde: iki ölçücü aynı fotoğrafa hemen hemen aynı sayıyı veriyor. Ölçüm güvenilir.' : 'ICC düşük: aynı fotoğrafa iki kişi farklı sayılar veriyor. Protokolü netleştirmek (tam olarak hangi noktaya tıklanacak?) hatayı azaltır.'; });
  gen(); upd();
};

/* ===== Gerçek veri ve rakım ===== */
W.realdata = el => {
  TK.shell(el, 'Gerçek veri: 97 Çayır esmeri', 'Görünümü değiştir');
  const c = TK.canvas(el, 640, 400, 'Gerçek veri saçılım grafiği');
  let view='oran';
  const ctr = TK.el('div', {class:'ctrl'}); const b1=TK.el('button',{class:'btn on',type:'button'},'Oran testi (H1)'), b2=TK.el('button',{class:'btn',type:'button'},'Rakım (H2)');
  b1.onclick=()=>{view='oran';b1.classList.add('on');b2.classList.remove('on');c.t=0;}; b2.onclick=()=>{view='rakim';b2.classList.add('on');b1.classList.remove('on');c.t=0;}; ctr.append(b1,b2);
  const msg = TK.el('div', {class:'msg'}); el.append(ctr, msg);
  const xs=TK.DATA.map(d=>d[2]), ys=TK.DATA.map(d=>d[0]), mx=TK.mean(xs), my=TK.mean(ys); let sxy=0,sxx=0; xs.forEach((x,i)=>{sxy+=(x-mx)*(ys[i]-my); sxx+=(x-mx)**2;}); const slope=sxy/sxx, icpt=my-slope*mx, rAlt=TK.pearson(xs,ys);
  c.animate(t => {
    const ctx=c.ctx, shown=TK.REDUCE?97:Math.min(97,Math.floor(t*40));
    if (view==='oran'){
      const x0=86,x1=610,y0=30,y1=350,xa=0.1,xb=0.68,ya=0.08,yb=0.36,X=v=>x0+(v-xa)/(xb-xa)*(x1-x0),Y=v=>y1-(v-ya)/(yb-ya)*(y1-y0);
      ctx.strokeStyle=C.line; ctx.strokeRect(x0,y0,x1-x0,y1-y0);
      [0.1,0.2,0.3,0.4,0.5,0.6].forEach(v=>T(ctx,fmt(v,1),X(v),y1+16,{align:'center',size:11,mono:true,color:C.muted}));
      [0.1,0.2,0.3].forEach(v=>{ L(ctx,x0,Y(v),x1,Y(v),C.line,1,[2,4]); T(ctx,fmt(v,1),x0-6,Y(v)+4,{align:'right',size:11,mono:true,color:C.muted}); });
      T(ctx,'göreli benek boyu r_d / s →',x1,y1+34,{align:'right',size:12,color:C.muted}); ctx.save(); ctx.translate(26,(y0+y1)/2); ctx.rotate(-Math.PI/2); T(ctx,'oran r_p / r_d →',0,0,{align:'center',size:12,color:C.muted}); ctx.restore();
      const cur=[[C['s-col'],x=>1-1.76/(2.2*x/0.26)],[C['lam-col'],()=>0.2],[C.warn,x=>0.44/(2.2*x/0.26)]];
      ctx.save(); ctx.beginPath(); ctx.rect(x0,y0,x1-x0,y1-y0); ctx.clip(); cur.forEach(([col,fn]) => { ctx.beginPath(); for (let x=0.12;x<=0.68;x+=0.005){ const y=Math.max(0,fn(x)); x<0.121?ctx.moveTo(X(x),Y(y)):ctx.lineTo(X(x),Y(y)); } ctx.strokeStyle=col; ctx.lineWidth=2.5; ctx.setLineDash([7,5]); ctx.stroke(); }); ctx.restore();
      T(ctx,'S olsaydı',X(0.36),Y(1-1.76/(2.2*0.36/0.26))-8,{w:700,size:12,color:C['s-col']}); T(ctx,'λ (ve λ + eşik) olsaydı',X(0.6),Y(0.2)-8,{align:'right',w:700,size:12,color:C['lam-col']}); T(ctx,'pupil sabit olsaydı',X(0.5),Y(0.44/(2.2*0.5/0.26))-10,{w:700,size:12,color:C.warn});
      for (let i=0;i<shown;i++){ const d=TK.DATA[i]; ctx.fillStyle=TK.rgba(C.ink,.75); ctx.strokeStyle=C.surface; ctx.beginPath(); ctx.arc(X(d[0]),Y(d[1]),4.2,0,Math.PI*2); ctx.fill(); ctx.stroke(); }
      T(ctx,shown+' / 97 kelebek',x1-8,y0+20,{align:'right',w:700});
      msg.innerHTML = 'Her nokta bir kelebek. Spearman <b>ρ = −0.14</b> (p = 0.17). "S olsaydı" eğrisinin yükselişi yok; "pupil sabit" eğrisinin güçlü düşüşü de yok. Noktalar yatay çizginin çevresinde ama <b>geniş</b> bir bantta (CV %19): oran boyuttan bağımsız, yine de kelebekten kelebeğe gerçekten değişiyor. Bu, "λ + pupil eşiği" senaryosunun izi.';
    } else {
      const x0=86,x1=610,y0=30,y1=350,X=v=>x0+v/2200*(x1-x0),ya=0,yb=0.7,Y=v=>y1-(v-ya)/(yb-ya)*(y1-y0);
      ctx.strokeStyle=C.line; ctx.strokeRect(x0,y0,x1-x0,y1-y0);
      [0,500,1000,1500,2000].forEach(v=>T(ctx,v+' m',X(v),y1+16,{align:'center',size:11,mono:true,color:C.muted})); [0,0.2,0.4,0.6].forEach(v=>{ L(ctx,x0,Y(v),x1,Y(v),C.line,1,[2,4]); T(ctx,fmt(v,1),x0-6,Y(v)+4,{align:'right',size:11,mono:true,color:C.muted}); });
      T(ctx,'rakım →',x1,y1+34,{align:'right',size:12,color:C.muted}); ctx.save(); ctx.translate(26,(y0+y1)/2); ctx.rotate(-Math.PI/2); T(ctx,'göreli benek boyu r_d / s →',0,0,{align:'center',size:12,color:C.muted}); ctx.restore();
      for (let i=0;i<shown;i++){ const d=TK.DATA[i]; ctx.fillStyle=TK.rgba(C['lam-col'],.7); ctx.beginPath(); ctx.arc(X(d[2]),Y(d[0]),4.2,0,Math.PI*2); ctx.fill(); }
      if (shown===97){ L(ctx,X(0),Y(icpt),X(2200),Y(icpt+slope*2200),C.ink,2.5); T(ctx,`eğim: +${(slope*1000).toFixed(3)} / 1000 m`,x1-8,y0+20,{align:'right',w:700}); }
      msg.innerHTML = `Rakım arttıkça benek boyu çok az artıyor gibi (eğim +${(slope*1000).toFixed(3)} / 1000 m, r = ${fmt(rAlt)}), ama p = 0.18: <b>anlamlı değil</b>. Ölçek ölçümü gürültülü olduğu için küçük bir etkiyi göremiyor olabiliriz. Elle ölçülen kanat uzunluğu bu soruyu yeniden açacak.`;
    }
  });
};

/* ===== "Ne çıkarsa çıksın" tablosu ===== */
W.outcomes = el => {
  TK.shell(el, 'Ne çıkarsa çıksın', 'Bir olası sonuç seç');
  const O = [['Halka farkı sabit (mm)','Bireyler arası fark kaynak gücünden (S) geliyor.','Nijhout\'un gradyan modeli doğal popülasyonda doğrulandı.'],['Halkalar orantılı büyüyor, oran saçılımı küçük','Fark yalnızca yayılma uzunluğundan (λ = √(D/γ)) geliyor.','Model geçerli; değişen tek parametre λ.'],['Oran boyuttan bağımsız ama gerçekten saçılıyor (v3 ön bulgu)','Boyut λ üzerinden, oran pupil eşiği üzerinden değişiyor.','Monteiro vd. (1997)\'nin laboratuvarda bulduğu iş bölümünün doğal popülasyondaki karşılığı.'],['Çift pupilliler Önerme 3 eğrisine oturuyor','İki odaklı alan gerçekten sinyallerin toplamı.','Kaynaşma geometrisi doğal popülasyonda, cerrahi deney olmadan sınandı.'],['Çift pupilliler eğriye oturmuyor','Sinyaller toplanmıyor ya da üstel yaklaşım yetersiz (K₀ ile yeniden denenir).','Modelin hangi varsayımının çöktüğü tartışılır; yine raporlanabilir bir sonuç.'],['Pupil sabit, disk değişken','Pupil, kaynak hücre grubunun kendisi.','Modelin "pupil da bir eşik halkasıdır" varsayımı yanlış çıkar.'],['λ rakım/sıcaklıkla değişiyor','D ve γ sıcaklığa bağlı.','İklim–desen bağı; iklim değişikliğini izlemek için bir gösterge önerisi.'],['λ rakımla değişmiyor','Desen sıcaklığa karşı "tamponlanmış".','Gelişimin çevre değişimine karşı korunduğu bulgusu.']];
  const ctr = TK.el('div', {style:'display:grid;gap:6px'}), out = TK.el('div', {class:'msg'}, 'Hangi sonuç çıkarsa çıksın proje bir şey öğretir. Bir satır seç.');
  O.forEach(o => { const b=TK.el('button',{class:'btn',type:'button',style:'text-align:left'},o[0]); b.onclick=()=>{ [...ctr.children].forEach(x=>x.classList.remove('on')); b.classList.add('on'); out.className='msg ok'; out.innerHTML=`<b>Model içi anlamı:</b> ${o[1]}<br><b>Raporda nasıl sunulur:</b> ${o[2]}`; }; ctr.appendChild(b); });
  el.append(ctr, out);
};

/* ===== Ölçüm atölyesi: kanat uzunluğu ve benek ===== */
W.measure = el => {
  TK.shell(el, 'Ölçüm atölyesi', 'Gerçek görevinin provası');
  const c = TK.canvas(el, 640, 420, 'Kanat ölçüm alıştırması');
  let ph, rot, sc, cx, cy, step, pts, Lmm, results=[];
  const LOC = { base:[6,-2], apex:[162,-130], spot:[130,-92] }, RD=13;
  const scr = ([x,y]) => [cx + (x*Math.cos(rot) - y*Math.sin(rot))*sc, cy + (x*Math.sin(rot) + y*Math.cos(rot))*sc];
  const tLpx = () => Math.hypot(LOC.apex[0]-LOC.base[0], LOC.apex[1]-LOC.base[1])*sc;
  const info = TK.el('div', {class:'msg'}), tbl = TK.el('div', {class:'tw'});
  const ctr = TK.el('div', {class:'ctrl'}); const bn=TK.el('button',{class:'btn',type:'button'},'Yeni fotoğraf'), bu=TK.el('button',{class:'btn',type:'button'},'Son tıklamayı geri al'); ctr.append(bu,bn);
  el.append(ctr, info, tbl);
  const prompts = ['1/3 · Sağdaki ön kanadın <b>tabanına</b> (gövdeye bağlandığı yer) tıkla.','2/3 · Aynı kanadın <b>apeksine</b> (en uç noktası) tıkla.','3/3 · Göz beneğinin <b>siyah diskinin dış kenarına</b> tıkla (merkez bilgisayardan geliyor).'];
  const fresh = () => { rot=(Math.random()-0.5)*0.5; sc=0.95+Math.random()*0.5; cx=250+Math.random()*60; cy=250+Math.random()*30; step=0; pts=[]; Lmm=22; info.className='msg'; info.innerHTML=prompts[0]+' Bu fotoğraftaki kelebek <b>erkek</b> (ön kanat ortalaması 22 mm).'; c.draw(); };
  bn.onclick = fresh; bu.onclick = () => { if (step>0 && step<3){ pts.pop(); step--; info.innerHTML=prompts[step]; c.draw(); } };
  c.cv.addEventListener('click', e => { if (step>=3) return; const p=c.pos(e); pts.push([p.x,p.y]); step++;
    if (step<3) info.innerHTML = prompts[step];
    else { const Lpx=Math.hypot(pts[1][0]-pts[0][0],pts[1][1]-pts[0][1]), sp=scr(LOC.spot), rdpx=Math.hypot(pts[2][0]-sp[0],pts[2][1]-sp[1]);
      const mmpx=Lmm/Lpx, rdmm=rdpx*mmpx, trueL=tLpx(), trueRd=RD*sc, trueRdmm=trueRd*(Lmm/trueL), eL=100*(Lpx-trueL)/trueL, eR=100*(rdmm-trueRdmm)/trueRdmm;
      results.push({Lpx, rdpx, rdmm, eL, eR}); const ok=Math.abs(eL)<5 && Math.abs(eR)<10;
      info.className='msg '+(ok?'ok':'warn'); info.innerHTML = `L = <b>${Lpx.toFixed(0)} px</b> → 1 px = ${mmpx.toFixed(3)} mm. Disk yarıçapı ${rdpx.toFixed(1)} px = <b>${rdmm.toFixed(2)} mm</b>. Gerçek değere göre hata: L %${eL.toFixed(1)}, disk %${eR.toFixed(1)}. ${ok?'Çok iyi! Protokol hedefi: L hatası %5\'in altında.':'Noktaları biraz daha dikkatli seç; "Son tıklamayı geri al" ya da yeni fotoğraf.'}`;
      tbl.innerHTML = `<table class="t"><thead><tr><th>Foto</th><th>L (px)</th><th>Disk (px)</th><th>Disk (mm)</th><th>L hatası</th></tr></thead><tbody>${results.map((r,i)=>`<tr><td>${i+1}</td><td class="num">${r.Lpx.toFixed(0)}</td><td class="num">${r.rdpx.toFixed(1)}</td><td class="num">${r.rdmm.toFixed(2)}</td><td class="num" style="color:${Math.abs(r.eL)<5?'var(--ok)':'var(--bad)'}">%${r.eL.toFixed(1)}</td></tr>`).join('')}</tbody></table>`; }
    c.draw(); });
  c.static(() => { if (!pts) return; const ctx=c.ctx; ctx.fillStyle='#6F7A5A'; ctx.fillRect(0,0,640,420); const g=ctx.createRadialGradient(320,210,60,320,210,420); g.addColorStop(0,'rgba(140,160,100,.6)'); g.addColorStop(1,'rgba(40,50,30,.6)'); ctx.fillStyle=g; ctx.fillRect(0,0,640,420);
    ctx.save(); ctx.translate(cx,cy); ctx.rotate(rot); TK.drawButterfly(ctx,0,0,sc); ctx.restore();
    pts.forEach((p,i) => { D(ctx,p[0],p[1],5,i===2?'#7FE0F0':'#FFE08A'); ctx.strokeStyle='#000'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(p[0],p[1],5,0,Math.PI*2); ctx.stroke(); });
    if (pts.length>=2){ L(ctx,pts[0][0],pts[0][1],pts[1][0],pts[1][1],'#000',4); L(ctx,pts[0][0],pts[0][1],pts[1][0],pts[1][1],'#FFE08A',2); }
    if (step===3){ const sp=scr(LOC.spot); L(ctx,sp[0],sp[1],pts[2][0],pts[2][1],'#000',4); L(ctx,sp[0],sp[1],pts[2][0],pts[2][1],'#7FE0F0',2); const a=scr(LOC.base), b=scr(LOC.apex); ctx.save(); ctx.setLineDash([4,4]); ctx.strokeStyle='#fff'; ctx.beginPath(); ctx.arc(a[0],a[1],8,0,Math.PI*2); ctx.arc(b[0],b[1],8,0,Math.PI*2); ctx.stroke(); ctx.restore(); T(ctx,'beyaz halkalar: doğru noktalar',12,408,{size:12,color:'#fff'}); }
    T(ctx,'iNaturalist benzeri fotoğraf (çizim)',12,20,{size:12,color:'#fff'}); });
  fresh();
};

/* ===== Dahil etme ölçütleri ===== */
W.include = el => {
  TK.shell(el, 'Bu fotoğraf veri setine girer mi?', 'Protokolün dahil etme ölçütleri');
  const K = [['ok','Dik açı, keskin, benek tam',true,'Kabul. Bütün ölçütleri karşılıyor.'],['tilt','Kanat yan duruyor',false,'Red. Benek elips görünüyor (elipslik > 1.15). Yarıçaplar yanlış ölçülür.'],['blur','Bulanık',false,'Red. Sınırlar yayılmış; yarı-yükseklik noktası güvenilmez.'],['worn','Kanat aşınmış, benek eksik',false,'Red. Benek bütün değil; disk sınırı ölçülemez.'],['tiny','Çok uzaktan çekilmiş',false,'Red. Disk 6 pikselden küçük; pupil 1 piksel bile değil.'],['big','Makro çekim, keskin',true,'Kabul. Hatta en değerli fotoğraflar bunlar: pupil birçok pikselle ölçülür.']];
  const grid = TK.el('div', {class:'cards'});
  K.forEach(k => { const cd = TK.el('div', {class:'card'}); const cv = document.createElement('canvas'); cv.width=200; cv.height=130; cv.style.cssText='width:100%;height:auto;border-radius:8px';
    const x=cv.getContext('2d'); x.fillStyle=WING.or; x.fillRect(0,0,200,130);
    if (k[0]==='tiny'){ const p=document.createElement('canvas'); p.width=20; p.height=13; const q=p.getContext('2d'); q.fillStyle=WING.or; q.fillRect(0,0,20,13); SP(q,10,6.5,1,0.6,2.6); x.imageSmoothingEnabled=false; x.drawImage(p,0,0,200,130); }
    else { x.save(); if (k[0]==='blur') x.filter='blur(4px)'; x.translate(100,65); if (k[0]==='tilt') x.scale(0.62,1); const r = k[0]==='big'?48:34; SP(x,0,0,1,r*0.2,r); x.restore();
      if (k[0]==='worn'){ x.fillStyle='#C9B79A'; x.beginPath(); x.moveTo(200,0); x.lineTo(110,0); x.quadraticCurveTo(118,40,96,52); x.quadraticCurveTo(130,70,200,60); x.closePath(); x.fill(); } }
    cd.append(cv); cd.append(TK.el('h4',{},k[1]));
    const row = TK.el('div', {class:'ctrl'}, '<button class="btn" type="button">Kabul</button><button class="btn" type="button">Red</button>'); const ex=TK.el('div',{class:'ex',hidden:''});
    const [a,b]=row.querySelectorAll('button'); const ans=v=>{ const ok=v===k[2]; ex.hidden=false; ex.className='ex '+(ok?'ok':'bad'); ex.innerHTML=(ok?'<b>Doğru.</b> ':'<b>Tekrar düşün.</b> ')+k[3]; };
    a.onclick=()=>ans(true); b.onclick=()=>ans(false); cd.append(row, ex); grid.appendChild(cd); });
  el.append(grid);
};

/* ===== Kod haritası ===== */
W.codemap = el => {
  TK.shell(el, 'Kod haritası', 'Çalıştırma sırası · bir kutuya dokun');
  const K = [['kanat_turing.py','Simülasyon','Gray–Scott, Gierer–Meinhardt ve göz beneği simülasyonları. Model öngörülerini ve sentetik benekleri üretir.','→ cikti/ klasöründe şekiller','Ö1'],['inat_cek.py','Veri çekme','iNaturalist\'ten Türkiye kayıtlarını çeker, her kayda rakım ekler.','→ veri/*_kayitlar.csv','Ö3'],['hat.py (+ benek_olc.py, silhuet_olcek.py)','Ölçüm hattı','Fotoğraflarda beneği bulur, radyal profilden r_p ve r_d\'yi ölçer, teşhis görsellerini üretir.','→ veri/mj_olcum_tum.csv, veri/teshis_ornek/','Ö2'],['analiz.py','İstatistik','Üç modelin karşılaştırması, oran testi, rakım regresyonu.','→ veri/mj_analiz.csv, veri/_bulgu_mj.png','Ö1'],['monte_carlo.py','Güç analizi','Testleri cevabı bilinen sahte verilerle 400 kez sınar.','→ veri/monte_carlo_*.csv, sekiller/06_monte_carlo.png','Ö1'],['rapor_pdf.py','Rapor','Markdown raporu PDF\'e çevirir.','→ ARASTIRMA_RAPORU_v2.pdf','Hepsi']];
  const box = TK.el('div', {style:'display:grid;gap:6px'});
  K.forEach((k,i) => { const b = TK.el('button', {class:'phase', type:'button'}, `<span class="when">${i+1}. adım · ${k[4]}</span><span><code>${k[0]}</code> · <b>${k[1]}</b></span><span class="det" hidden>${k[2]}<br><span class="num">${k[3]}</span></span>`); b.onclick=()=>{ const d=b.querySelector('.det'); d.hidden=!d.hidden; }; box.appendChild(b); });
  el.append(box, TK.el('div', {class:'formula'}, 'python kanat_turing.py → python inat_cek.py → (fotoğraf indir) → python hat.py → python analiz.py → python monte_carlo.py'));
};

/* ===== Görev listesi (rol seçimli, kaydedilir) ===== */
W.tasks = el => {
  TK.shell(el, 'Görev listem', 'İşaretlediklerin bu tarayıcıda saklanır');
  const R = {
    'Ö1 · Matematik ve simülasyon':['r = λ·ln(S/θ) türetmesini tahtada anlatabiliyorum','Teorem 1–2 kanıtını (eyer noktası) tahtada anlatabiliyorum','Önerme 3\'ün w ve R formüllerini türettim','Üç senaryonun öngörülerini kendi cümlelerimle yazdım','kanat_turing.py\'yi satır satır okudum','Sentetik beneklerle hattın λ\'yı geri bulup bulmadığını sınadım','Monte Carlo tablosunu jüriye anlatabiliyorum','"Kuramsal çerçeve" ve "Tartışma" bölümlerini yazdım'],
    'Ö2 · Ölçüm ve veri kalitesi':['Teşhis görsellerini inceledim (veri/teshis_ornek/)','30 fotoğrafta elle ölçüm yaptım','İkinci ölçücüyle ICC hesapladım (hedef > 0.8)','Dahil etme ölçütlerini protokole yazdım','Tüm geçerli fotoğraflarda kanat uzunluğu ve cinsiyet etiketi','Çift pupilli fotoğraflarda iki pupil merkezi, bel ve eksen uçlarını işaretledim (hedef n ≈ 40)','"Yöntem – Ölçüm" bölümünü yazdım'],
    'Ö3 · Biyoloji ve saha':['M. jurtina ve A. io için 2 sayfalık biyoloji notu','Erkek/dişi ayrım ölçütlerini kaynakla doğruladım','Kanat uzunluğu ortalamalarını (♂ ~22, ♀ ~25 mm) literatürden doğruladım','Her kayda aylık ortalama sıcaklık eşledim (MGM/WorldClim)','Lisans listesini (Ek A) kontrol ettim','Çift pupilli bireylerin sıklığını boyuta göre not ettim (Teorem 2 öngörüsü)','"Giriş – biyoloji" ve "Etik" bölümlerini yazdım']
  };
  const sel = TK.el('div', {class:'ctrl'}), list = TK.el('div'); el.append(sel, list);
  const draw = role => { TK.state.role = role; TK.save(); [...sel.children].forEach(b=>b.classList.toggle('on', b.dataset.r===role));
    list.innerHTML=''; const roles = role==='Hepsi' ? Object.keys(R) : [role];
    roles.forEach(r => { const done=R[r].filter((_,i)=>TK.state.tasks[r+i]).length; const h=TK.el('h3',{},`${r} <span class="num" style="color:var(--muted)">${done}/${R[r].length}</span>`); const ul=TK.el('ul',{class:'tasklist'});
      R[r].forEach((t,i) => { const id='tk-'+r.slice(0,2)+'-'+i; const li=TK.el('li',{},`<label for="${id}"><input type="checkbox" id="${id}" ${TK.state.tasks[r+i]?'checked':''}><span>${t}</span></label>`); li.querySelector('input').onchange=e=>{ TK.state.tasks[r+i]=e.target.checked; TK.save(); draw(role); }; ul.appendChild(li); });
      list.append(h, ul); }); };
  [...Object.keys(R),'Hepsi'].forEach(r => { const b=TK.el('button',{class:'btn',type:'button','data-r':r},r.split(' · ')[0]); b.onclick=()=>draw(r); sel.appendChild(b); });
  draw(TK.state.role && (R[TK.state.role] || TK.state.role==='Hepsi') ? TK.state.role : 'Hepsi');
};

/* ===== Jüri kartları ===== */
W.jury = el => {
  TK.shell(el, 'Jüri provası', 'Önce kendin cevapla, sonra karta dokun');
  const Q = [['Turing deseni ile göz beneği aynı şey mi?','Hayır. Turing deseni iki kimyasalın kendiliğinden desen kurmasıdır. Göz beneği için tek kaynaktan yayılan bir sinyal ve eşik kuralı yeter (Nijhout modeli). Biz bu daha yalın modeli sınıyoruz.'],['Neden fark yerine oran kullandınız?','Fotoğrafların ölçeği bilinmiyor. Yakınlaştırma iki yarıçapı aynı kat büyütür; oranda bu kat sadeleşir, farkta sadeleşmez.'],['S ile θ\'yı neden ayrı ayrı bulamıyorsunuz?','Formülde yalnızca S/θ oranı geçiyor. S ve θ aynı kat değişirse benek aynı kalır. Bu yüzden "λ mı, ln(S/θ) mı değişiyor?" diye soruyoruz.'],['ρ = −0.14 anlamlı değilse neden sonuç çıkarıyorsunuz?','Sonucumuz "ilişki var" değil. Yalnız-S senaryosu %97–99 güçle +0,45 civarında, pupil-sabit senaryosu %100 güçle −0,53 civarında bir ρ üretirdi. İkisini de görmüyoruz. Sıfıra yakın ρ ile %19\'luk gerçek oran saçılımı birlikte yalnız "λ + pupil eşiği" senaryosuna uyuyor.'],['Oranın saçılımı ölçüm hatası olamaz mı?','Varyans ayrışımıyla (Önerme 4b) ayırdık: küçük, orta ve büyük beneklerde CV farklı. Eğriye oturtunca gerçek saçılım 0,169, ölçüm gürültüsü τ = 0,21 px çıktı; bu, piksel yuvarlamasının tek başına verdiği 0,14 px\'e yakın. Yani saçılımın çoğu gerçek.'],['İki benek ne zaman kaynaşır?','Odaklar arası yarı uzaklık a < r + λ·ln 2 iken. Kanıt: iki odağın ortasındaki nokta bir eyer noktası; sinyal orada eşiğin üstündeyse halka iki odağı birlikte sarar. λ·ln 2 bir "kaynaşma payı".'],['Çift pupilli benek neden önemli?','Teorem 2\'ye göre ancak r_p + λ ln2 < a < r_d + λ ln2 aralığında oluşur. Kaynaşmış diskin bel genişliği ve uzunluğundan ölçek bilmeden a/λ ve r_d/λ bulunur; pupil boyu üçüncü bir ölçüm olarak modeli sınar.'],['Monte Carlo\'ya neden ihtiyaç duydunuz?','Gerçek fotoğraflar gürültülü. Testin bu gürültüde de çalışıp çalışmadığını, cevabını bildiğimiz sahte verilerle 400 kez deneyerek gördük. Piksel ölçeğindeki AIC karşılaştırmasının yanıltıcı olduğunu da böyle bulduk.'],['Ölçümleri kim yaptı? Yapay zekâ mı?','Otomatik hat ve kodlar danışman gözetiminde yapay zekâ desteğiyle yazıldı ve raporda beyan edildi. Ölçümlerin doğrulanması, kanat uzunluğu ve cinsiyet etiketleri öğrenciler tarafından elle yapıldı.'],['Kelebeklere zarar verdiniz mi?','Hayır. Hiç kelebek yakalanmadı. Yalnızca Creative Commons lisanslı vatandaş bilimi fotoğrafları kullanıldı ve her fotoğrafçının adı ekte listelendi.'],['Ölçümleriniz ne kadar güvenilir?','İki ölçücü aynı 30 fotoğrafı ayrı ayrı ölçtü; ICC hedefi 0.8. Ön analizdeki otomatik ölçek vekili ICC 0.30 çıktı; bu yüzden elle ölçüme geçtik.'],['Sonucunuz neden "ön bulgu"?','Tek benek sonucu 97 bireyle ve gürültülü bir ölçek vekiliyle alındı. Asıl sınav, çift pupilli beneklerin (hedef n ≈ 40) Önerme 3 eğrisine oturup oturmadığı; bu ölçümler henüz yapılmadı.'],['λ = √(D/γ) neden uzunluk birimi veriyor?','D mm²/s, γ 1/s. D/γ = mm², karekökü mm. Denklemdeki tek uzunluk ölçeği bu.']];
  const grid = TK.el('div', {class:'cards'});
  Q.forEach(q => { const b = TK.el('button', {class:'card flip', type:'button', 'aria-expanded':'false'}, `<h4>${q[0]}</h4><span class="front-hint">Cevabı görmek için dokun</span><p class="back">${q[1]}</p>`); b.onclick=()=>{ b.classList.toggle('open'); b.setAttribute('aria-expanded', String(b.classList.contains('open'))); }; grid.appendChild(b); });
  el.append(grid);
};

/* ===== Karne ===== */
W.karne = el => {
  TK.shell(el, 'Karnem', 'Bütün ara değerlendirmeler');
  const box = TK.el('div', {class:'report'}); el.append(box);
  const units = TK.U.filter(u => u.quiz);
  const rowsHtml = units.map(u => { const r = TK.state.quiz[u.quiz.id]; const best = r ? r.best : null; return `<div class="r"><span>${u.no}. ${u.title}</span><span><span class="bar" style="display:block"><i style="width:${best||0}%;background:${best>=70?'var(--ok)':'var(--warn)'}"></i></span></span><span class="num">${best===null?'—':'%'+best}</span></div>`; }).join('');
  const pre = TK.state.quiz['on-test'], fin = TK.state.quiz['final'];
  const learn = units.filter(u => u.id!=='baslangic' && u.id!=='final'), done = learn.filter(u => (TK.state.quiz[u.quiz.id]?.best||0) >= 70).length, total = learn.length;
  const weak = learn.filter(u => TK.state.quiz[u.quiz.id] && TK.state.quiz[u.quiz.id].best < 70);
  box.innerHTML = rowsHtml + `<div class="msg ${done===total?'ok':''}">Geçilen ünite: <b>${done} / ${total}</b>. ${pre?`Ön test: <b>%${pre.first}</b>. `:''}${fin?`Final: <b>%${fin.best}</b>. `:''}${pre&&fin?`Gelişim: <b>${fin.best-pre.first>=0?'+':''}${fin.best-pre.first} puan</b>.`:''}</div>` + (weak.length?`<div class="msg warn">Tekrar et: ${weak.map(u=>`<a href="#${u.id}">${u.no}. ${u.title}</a>`).join(', ')}</div>`:'');
};
})();
