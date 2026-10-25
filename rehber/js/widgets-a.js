/* Widget'lar A — Ünite 0–5: proje, biyoloji, difüzyon, matematik, model, senaryolar */
(function(){
const {W, C, text:T, line:L, disc:D, spot:SP, WING, M} = TK;
const fmt = TK.fmt;

/* ===== Proje takvimi ===== */
W.timeline = el => {
  TK.shell(el, 'Proje takvimi', 'Bir aşamaya dokun');
  const P = [
    ['Eylül 2026','Aşama 0 · Hazırlık','done','Literatür, simülasyon kodu, iNaturalist veri çekimi (390 + 105 gözlem), otomatik ölçüm hattı ve 97 bireylik ön analiz. Danışman ve yapay zekâ aracıyla yapıldı; şimdi sizin devralmanız gerekiyor.'],
    ['Eyl. son – Ekim 2. hf','Aşama 1 · Devralma ve kuram','done','Ö1 modeli tahtada türetir; Ö2 teşhis görsellerini inceler ve 30 fotoğrafta elle ölçüm yapar; Ö3 tür biyolojisi notunu yazar. Hep birlikte "hangi sonuç ne anlama gelir" tablosu kesinleşir.'],
    ['Ekim 2. – 4. hf','Aşama 2 · Ölçüm aracı ve ICC','now','İşaretleme sayfasıyla aynı 30 fotoğrafı iki kişi ayrı ayrı ölçer (hedef ICC > 0.8). Ö1 sentetik beneklerle ölçüm hattını sınar.'],
    ['Kasım','Aşama 3 · Ana veri toplama','next','Bütün geçerli fotoğraflarda kanat uzunluğu, cinsiyet ve geçerlilik etiketi. Hedef: Çayır esmeri ≥ 120, Tavus kelebeği ≥ 60 birey. İklim eşlemesi.'],
    ['Aralık 1.–2. hf','Aşama 4 · Analiz','next','H1: üç senaryonun mm ölçeğinde karşılaştırılması ve oran testi. H2: λ vekili ile rakım ve sıcaklık. Duyarlılık analizleri.'],
    ['Aralık 3. hf – Ocak','Aşama 5 · Rapor ve sunum','next','Rapor, poster, 8 dakikalık sunum ve jüri provası. Her öğrenci kendi alanında 10 olası soruya hazırlanır.']
  ];
  const box = TK.el('div', {class:'timeline'});
  P.forEach(p => { const b = TK.el('button', {class:'phase '+p[2], type:'button', 'aria-expanded':'false'}, `<span class="when">${p[0]}${p[2]==='now'?' · <b style="color:var(--signal)">ŞU AN</b>':''}</span><span><b>${p[1]}</b></span><span class="det" hidden>${p[3]}</span>`);
    b.addEventListener('click', () => { const d = b.querySelector('.det'); d.hidden = !d.hidden; b.setAttribute('aria-expanded', String(!d.hidden)); }); box.appendChild(b); });
  el.appendChild(box);
};

/* ===== Kelebek çizimi (ortak) ===== */
function forewing(){ const p = new Path2D(); p.moveTo(4,-8); p.bezierCurveTo(40,-70,110,-132,162,-130); p.bezierCurveTo(174,-100,172,-40,152,-5); p.bezierCurveTo(110,10,50,12,4,4); p.closePath(); return p; }
function hindwing(){ const p = new Path2D(); p.moveTo(4,4); p.bezierCurveTo(60,0,120,20,128,62); p.bezierCurveTo(132,102,92,132,50,130); p.bezierCurveTo(20,122,6,60,4,10); p.closePath(); return p; }
TK.drawButterfly = (ctx, cx, cy, sc, flap=1, female=false) => {
  ctx.save(); ctx.translate(cx,cy); ctx.scale(sc,sc);
  for (const side of [1,-1]){
    ctx.save(); ctx.scale(side*flap,1);
    const hw = hindwing(); ctx.fillStyle=WING.br; ctx.fill(hw); ctx.strokeStyle=WING.dark; ctx.lineWidth=2; ctx.stroke(hw);
    const fw = forewing(); ctx.fillStyle=WING.br; ctx.fill(fw);
    ctx.save(); ctx.clip(fw);
    const R = female ? 80 : 58;
    const g = ctx.createRadialGradient(115,-70,8,115,-70,R); g.addColorStop(0,WING.or); g.addColorStop(.72,WING.or); g.addColorStop(1,'rgba(212,134,47,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.ellipse(112,-66,R*1.1,R*0.8,-.5,0,Math.PI*2); ctx.fill();
    SP(ctx,130,-92,1,3,female?15:13);
    ctx.restore(); ctx.strokeStyle=WING.dark; ctx.lineWidth=2; ctx.stroke(fw);
    ctx.restore();
  }
  ctx.fillStyle='#2A1C10'; ctx.beginPath(); ctx.ellipse(0,0,6,58,0,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='#2A1C10'; ctx.lineWidth=1.6; ctx.beginPath(); ctx.moveTo(-2,-54); ctx.quadraticCurveTo(-14,-90,-24,-104); ctx.moveTo(2,-54); ctx.quadraticCurveTo(14,-90,24,-104); ctx.stroke();
  ctx.restore();
};

/* ===== Kanat anatomisi: keşfet + bul oyunu ===== */
W.anatomy = el => {
  TK.shell(el, 'Kanat anatomisi', 'Keşfet ya da oyunu oyna');
  const c = TK.canvas(el, 640, 400, 'Çayır esmeri kanat anatomisi');
  const cx=320, cy=222, sc=1.2, P = (x,y) => [cx+x*sc, cy+y*sc];
  const H = [
    ['Apeks (kanat ucu)', ...P(160,-128), 16, 'Ön kanadın en uç noktası. Kanat uzunluğu L, kanat tabanından apekse kadar ölçülür.'],
    ['Kanat tabanı', ...P(10,-4), 14, 'Kanadın gövdeye bağlandığı yer. Kanat uzunluğunun başlangıç noktası.'],
    ['Kosta (ön kenar)', ...P(77,-93), 14, 'Ön kanadın üst kenarı. En sağlam damarlar buradadır.'],
    ['Dış kenar', ...P(170,-62), 14, 'Kanadın gövdeden en uzak kenarı. Eski kelebeklerde burası aşınır, yırtılır.'],
    ['Göz beneği', ...P(130,-92), 16, 'Ortası beyaz pupil, çevresi siyah disk. Çayır esmerinde ön kanadın apeksine yakın tek büyük benek.'],
    ['Turuncu alan', ...P(95,-45), 18, 'Dişilerde daha geniş ve parlak. Proje ön analizde bunu cinsiyet vekili olarak kullandı.'],
    ['Arka kanat', ...P(72,72), 22, 'Çayır esmerinde üst yüzü koyu kahve; alt yüzünde küçük benekler olabilir.'],
    ['Gövde (toraks)', ...P(0,-10), 10, 'Kanatların ve bacakların bağlandığı orta bölüm. Kanat kasları buradadır.'],
    ['Anten', ...P(24,-104), 12, 'Koku ve denge duyusu. Kelebek antenlerinin ucu topuz gibi kalındır.']
  ];
  let mode = 'kesfet', target = null, score = 0, rounds = 0, sel = null, showL = false, flash = null;
  const info = TK.el('div', {class:'msg'}, 'Kanadın bir yerine dokun.');
  const ctr = TK.el('div', {class:'ctrl'});
  const bK = TK.el('button', {class:'btn on', type:'button'}, 'Keşfet');
  const bO = TK.el('button', {class:'btn', type:'button'}, 'Bul oyunu');
  const bL = TK.el('button', {class:'btn', type:'button'}, 'Kanat uzunluğunu (L) göster');
  ctr.append(bK, bO, bL); el.append(ctr, info);
  const newTarget = () => { target = H[Math.floor(Math.random()*H.length)]; info.className='msg warn'; info.innerHTML = `Bul: <b>${target[0]}</b> · puan ${score}/${rounds}`; };
  bK.onclick = () => { mode='kesfet'; bK.classList.add('on'); bO.classList.remove('on'); info.className='msg'; info.textContent='Kanadın bir yerine dokun.'; draw(); };
  bO.onclick = () => { mode='oyun'; score=0; rounds=0; bO.classList.add('on'); bK.classList.remove('on'); newTarget(); draw(); };
  bL.onclick = () => { showL = !showL; bL.classList.toggle('on', showL); draw(); };
  c.cv.addEventListener('click', e => {
    const p = c.pos(e); let best=null, bd=1e9;
    H.forEach(h => { const d = Math.hypot(p.x-h[1], p.y-h[2]); if (d < bd){ bd=d; best=h; } });
    if (mode==='kesfet'){ if (bd < best[3]+22){ sel = best; info.className='msg'; info.innerHTML = `<b>${best[0]}.</b> ${best[4]}`; } }
    else { rounds++; const ok = target && Math.hypot(p.x-target[1], p.y-target[2]) < target[3]+14; if (ok) score++; flash = {h:target, ok};
      info.className = 'msg ' + (ok?'ok':'bad'); info.innerHTML = (ok ? 'Doğru! ' : `Olmadı, ${target[0]} işaretli yerde. `) + `Puan ${score}/${rounds}`;
      if (rounds >= 6){ info.innerHTML += ' · Oyun bitti. ' + (score>=5 ? 'Harika gözlem!' : 'Bir tur daha dene.'); target=null; } else setTimeout(() => { if (mode==='oyun' && target) newTarget(); }, 1100); }
    draw();
  });
  const draw = () => c.draw();
  c.static(() => {
    const ctx = c.ctx; TK.drawButterfly(ctx, cx, cy, sc);
    if (showL){ const a=P(10,-4), b=P(160,-128); L(ctx,a[0],a[1],b[0],b[1],'#FFE08A',4); L(ctx,a[0],a[1],b[0],b[1],C.ink,1.5,[5,4]); D(ctx,a[0],a[1],5,C.signal); D(ctx,b[0],b[1],5,C.signal); T(ctx,'L (kanat uzunluğu)', (a[0]+b[0])/2+40, (a[1]+b[1])/2+8, {w:700, size:14}); }
    if (mode==='kesfet') H.forEach(h => { ctx.strokeStyle = sel===h ? C.signal : TK.rgba(C.signal,.55); ctx.lineWidth = sel===h ? 3 : 1.5; ctx.beginPath(); ctx.arc(h[1],h[2],h[3],0,Math.PI*2); ctx.stroke(); });
    if (sel && mode==='kesfet') T(ctx, sel[0], sel[1], sel[2]-sel[3]-6, {align:'center', w:700, size:14, color:C.signal});
    if (flash){ ctx.strokeStyle = flash.ok ? C.ok : C.bad; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(flash.h[1],flash.h[2],flash.h[3]+4,0,Math.PI*2); ctx.stroke(); }
    T(ctx,'Çayır esmeri · Maniola jurtina (üstten)', 16, 392, {size:12, color:C.muted});
  });
};

/* ===== Erkek / dişi karşılaştırması ===== */
W.sexes = el => {
  TK.shell(el, 'Erkek ve dişi', 'Farkı bul');
  const c = TK.canvas(el, 640, 260, 'Erkek ve dişi Çayır esmeri');
  c.static(() => { TK.drawButterfly(c.ctx, 165, 140, 0.78, 1, false); TK.drawButterfly(c.ctx, 475, 140, 0.86, 1, true);
    T(c.ctx,'Erkek ♂ · ön kanat ~22 mm', 165, 250, {align:'center', w:700}); T(c.ctx,'Dişi ♀ · ön kanat ~25 mm', 475, 250, {align:'center', w:700}); });
  el.append(TK.el('p', {style:'margin:0;font-size:15px;color:var(--muted)'}, 'Dişide turuncu alan daha geniş, benek biraz daha büyük ve kanat daha uzun. Bu yüzden analiz cinsiyete göre ayrı yapılmalı. (Ölçüler raporda "literatürden doğrulanacak" olarak işaretli; Ö3 doğrulayacak.)'));
};

/* ===== Nijhout nakil deneyi: odak sürükle, kanadı geliştir ===== */
W.transplant = el => {
  TK.shell(el, 'Odak deneyi', 'Odakları sürükle, sonra kanadı geliştir');
  const c = TK.canvas(el, 640, 300, 'Odak nakli deneyi');
  const GW=160, GH=75, CELL=4, PXMM=40, LAM=0.5;
  let odaks = [{x:200,y:150}], grow = 0, growing = false, drag = null, removed = [];
  const off = document.createElement('canvas'); off.width=GW; off.height=GH; const o = off.getContext('2d'); const img = o.createImageData(GW,GH);
  const ctr = TK.el('div', {class:'ctrl'});
  const bG = TK.el('button', {class:'btn primary', type:'button'}, 'Kanadı geliştir ▶');
  const bA = TK.el('button', {class:'btn', type:'button'}, 'Odak ekle');
  const bX = TK.el('button', {class:'btn', type:'button'}, 'Odağı yak (çıkar)');
  const bR = TK.el('button', {class:'btn', type:'button'}, 'Baştan');
  const info = TK.el('div', {class:'msg'}, 'Kanat henüz gelişmedi. Beyaz noktalar odak hücreleri. İstersen birini sürükleyip başka yere naklet.');
  ctr.append(bG,bA,bX,bR); el.append(ctr, info);
  bG.onclick = () => { grow = 0; growing = true; info.className='msg'; info.textContent = odaks.length ? 'Odaklar sinyal salgılıyor; hücreler eşik kuralıyla renk seçiyor…' : 'Hiç odak yok: sinyal yok, benek de oluşmayacak.'; };
  bA.onclick = () => { odaks.push({x:120+Math.random()*400, y:80+Math.random()*140}); grow=0; growing=false; };
  bX.onclick = () => { if (odaks.length){ removed.push(odaks.pop()); grow=0; growing=false; info.className='msg warn'; info.textContent='Bir odağı yaktın. Şimdi kanadı geliştir: orada benek çıkacak mı?'; } };
  bR.onclick = () => { odaks=[{x:200,y:150}]; removed=[]; grow=0; growing=false; info.className='msg'; info.textContent='Baştan başladık.'; };
  c.cv.addEventListener('pointerdown', e => { const p=c.pos(e); drag = odaks.find(d => Math.hypot(d.x-p.x,d.y-p.y) < 18) || null; if (drag){ c.cv.setPointerCapture(e.pointerId); grow=0; growing=false; } });
  c.cv.addEventListener('pointermove', e => { if (!drag) return; const p=c.pos(e); drag.x=TK.clamp(p.x,20,620); drag.y=TK.clamp(p.y,20,280); });
  c.cv.addEventListener('pointerup', () => { if (drag){ info.className='msg'; info.textContent='Odağı naklettin. "Kanadı geliştir"e bas.'; } drag=null; });
  c.animate((t, dt) => {
    const ctx = c.ctx;
    if (growing){ grow = Math.min(1, grow + dt/2.5); if (grow>=1){ growing=false; info.className='msg ok'; info.textContent = odaks.length>1 ? 'Her odak kendi beneğini yaptı. Yakın iki odakta sinyaller toplanır ve benekler birleşir (Monteiro vd. 2001).' : odaks.length ? 'Benek, odağın olduğu yerde oluştu. Nijhout (1980): odak nereye giderse benek oraya gider.' : 'Odak olmayınca benek de yok.'; } }
    const S = Math.exp(4.4*grow) * (grow>0 ? 1 : 0);
    for (let j=0;j<GH;j++) for (let i=0;i<GW;i++){
      let m = 0; const x=i*CELL+2, y=j*CELL+2;
      for (const d of odaks){ const r = Math.hypot(x-d.x, y-d.y)/PXMM; m += S*Math.exp(-r/LAM); }
      const k=(j*GW+i)*4; let col;
      if (m > M.THP) col=[247,243,234]; else if (m > 1) col=[23,18,14]; else { const sh = 0.9 + 0.1*Math.sin(i*0.21+j*0.13); col=[212*sh,134*sh,47*sh]; }
      img.data[k]=col[0]; img.data[k+1]=col[1]; img.data[k+2]=col[2]; img.data[k+3]=255;
    }
    o.putImageData(img,0,0); ctx.imageSmoothingEnabled=false; ctx.drawImage(off,0,0,640,300); ctx.imageSmoothingEnabled=true;
    removed.forEach(d => { ctx.strokeStyle='#5A1A10'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(d.x-8,d.y-8); ctx.lineTo(d.x+8,d.y+8); ctx.moveTo(d.x+8,d.y-8); ctx.lineTo(d.x-8,d.y+8); ctx.stroke(); });
    odaks.forEach(d => { if (grow<1){ D(ctx,d.x,d.y,7,'#fff'); ctx.strokeStyle='#000'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(d.x,d.y,7,0,Math.PI*2); ctx.stroke(); } });
    T(ctx,'kanat dokusu (pupa evresi)', 12, 290, {size:12, color:'#3b2410'});
  });
};

/* ===== Rastgele yürüyüş: yayılma + sönme ===== */
W.randomwalk = el => {
  TK.shell(el, 'Parçacık yayılması', 'Her nokta bir sinyal molekülü');
  const c = TK.canvas(el, 640, 320, 'Rastgele yürüyüş');
  let gamma = 0.008, parts = [];
  const ctr = TK.el('div', {class:'ctrl'}, `<label>Sönme hızı γ<input type="range" min="0" max="0.04" step="0.002" value="0.008"><span class="sv"></span></label>`);
  const inp = ctr.querySelector('input'), sv = ctr.querySelector('.sv');
  const upd = () => { gamma = +inp.value; sv.textContent = gamma===0 ? 'sönme yok' : (gamma*100).toFixed(1)+'%/adım'; }; inp.oninput = upd; upd();
  const b = TK.el('button', {class:'btn', type:'button'}, 'Temizle'); b.onclick = () => parts = []; ctr.append(b); el.append(ctr);
  const cx=160, cy=160;
  c.animate(() => {
    const ctx = c.ctx;
    for (let i=0;i<6;i++) parts.push({x:0,y:0});
    parts = parts.filter(p => Math.random() > gamma);
    if (parts.length > 4000) parts.splice(0, parts.length-4000);
    for (const p of parts){ p.x += (Math.random()-0.5)*14; p.y += (Math.random()-0.5)*14; }
    ctx.save(); ctx.beginPath(); ctx.rect(10,10,300,300); ctx.clip();
    ctx.fillStyle = TK.rgba(C.signal,0.5); for (const p of parts) ctx.fillRect(cx+p.x-1, cy+p.y-1, 2.2, 2.2);
    ctx.restore(); ctx.strokeStyle=C.line; ctx.strokeRect(10,10,300,300);
    D(ctx,cx,cy,5,C.ink); T(ctx,'odak',cx+8,cy-8,{w:700});
    const NB=15, BW=10, bins = new Array(NB).fill(0); for (const p of parts){ const d = Math.hypot(p.x,p.y); const k = Math.floor(d/BW); if (k<NB) bins[k] += 1/(2*Math.PI*(k+0.5)*BW*BW); }
    const mx = Math.max(...bins, 1e-9), x0=360, x1=620, y0=40, y1=280;
    T(ctx,'Birim alandaki parçacık (yoğunluk)', x0, 28, {w:700});
    L(ctx,x0,y1,x1,y1,C.muted); L(ctx,x0,y0,x0,y1,C.muted);
    bins.forEach((v,k) => { const h=(v/mx)*(y1-y0); ctx.fillStyle=TK.rgba(C.signal,.85); ctx.fillRect(x0+k*(x1-x0)/NB+1, y1-h, (x1-x0)/NB-2, h); });
    T(ctx,'odaktan uzaklık →', x1, y1+18, {align:'right', size:12, color:C.muted});
    T(ctx,'parçacık sayısı: '+parts.length, x0, 306, {size:12, mono:true, color:C.muted});
  });
};

/* ===== Hücre ızgarasında difüzyon (kanat_turing.py ile aynı Euler adımı) ===== */
W.diffusion = el => {
  TK.shell(el, 'Kanat dokusunda sinyal', 'Her kare bir hücre');
  const c = TK.canvas(el, 640, 400, 'Difüzyon simülasyonu');
  const N=90; let A=new Float32Array(N*N), B=new Float32Array(N*N), simT=0, lam=8;
  const SRC=[]; for (let y=-2;y<=2;y++) for (let x=-2;x<=2;x++) if (x*x+y*y<=4) SRC.push(y*N+x);
  const off=document.createElement('canvas'); off.width=N; off.height=N; const o=off.getContext('2d'); const img=o.createImageData(N,N);
  const step = () => { const g=1/(lam*lam), dt=0.2, c0=(N>>1)*N+(N>>1);
    for (let y=1;y<N-1;y++) for (let x=1;x<N-1;x++){ const i=y*N+x; B[i]=A[i]+dt*((A[i-1]+A[i+1]+A[i-N]+A[i+N]-4*A[i]) - g*A[i]); }
    for (const s of SRC) B[c0+s] += dt/SRC.length; const t=A; A=B; B=t; simT+=dt; };
  const reset = () => { A.fill(0); B.fill(0); simT=0; if (TK.REDUCE) for (let i=0;i<3000;i++) step(); };
  const ctr = TK.el('div', {class:'ctrl'}, `<label><span class="l">Menzil λ</span><input type="range" min="4" max="14" step="0.5" value="8"><span class="sv">8 hücre</span></label>`);
  const inp = ctr.querySelector('input'); inp.oninput = () => { lam=+inp.value; ctr.querySelector('.sv').textContent = lam+' hücre'; };
  const b = TK.el('button', {class:'btn', type:'button'}, 'Damlayı yeniden bırak'); b.onclick = reset; ctr.append(b); el.append(ctr);
  reset();
  c.animate((t, dt) => {
    const ctx=c.ctx; if (!TK.REDUCE && dt>0) for (let i=0;i<10;i++) step();
    const c0=(N>>1)*N+(N>>1), mc=A[c0+2]||1e-9, s=TK.rgb(C.surface), g=TK.rgb(C.signal);
    for (let i=0;i<N*N;i++){ const v=Math.pow(Math.min(1,Math.max(0,A[i]/mc)),0.4); img.data[i*4]=s[0]+(g[0]-s[0])*v; img.data[i*4+1]=s[1]+(g[1]-s[1])*v; img.data[i*4+2]=s[2]+(g[2]-s[2])*v; img.data[i*4+3]=255; }
    o.putImageData(img,0,0); const X0=24,Y0=30,SZ=360,cs=SZ/N;
    ctx.imageSmoothingEnabled=false; ctx.drawImage(off,X0,Y0,SZ,SZ); ctx.imageSmoothingEnabled=true; ctx.strokeStyle=C.line; ctx.strokeRect(X0,Y0,SZ,SZ);
    const cx=X0+SZ/2, cy=Y0+SZ/2; ctx.save(); ctx.strokeStyle=C['lam-col']; ctx.setLineDash([5,5]); ctx.lineWidth=1.5; ctx.beginPath(); ctx.arc(cx,cy,lam*cs,0,Math.PI*2); ctx.stroke(); ctx.restore();
    T(ctx,'λ', cx+lam*cs*0.72+4, cy-lam*cs*0.72-4, {color:C['lam-col'], w:700, size:14}); D(ctx,cx,cy,3.5,C.ink); T(ctx,'odak',cx+7,cy+16,{w:700});
    T(ctx,'zaman: '+Math.round(simT), X0+SZ, Y0-10, {align:'right', mono:true, size:12, color:C.muted});
    const px0=420,px1=620,py0=70,py1=330,dm=44;
    T(ctx,'Sinyal, merkezden uzaklaştıkça',px0,40,{w:700}); T(ctx,'(odak yanındaki değere göre)',px0,56,{size:12,color:C.muted});
    L(ctx,px0,py1,px1,py1,C.muted); L(ctx,px0,py0,px0,py1,C.muted);
    ctx.beginPath(); for (let d=2; d<=dm; d++){ const v=Math.min(1,A[c0+d]/mc), x=px0+(d/dm)*(px1-px0), y=py1-v*(py1-py0); d>2?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.strokeStyle=C.signal; ctx.lineWidth=3; ctx.stroke();
    const lx=px0+(lam/dm)*(px1-px0); L(ctx,lx,py0,lx,py1,C['lam-col'],1.2,[4,4]); T(ctx,'λ',lx+4,py0+12,{color:C['lam-col'],w:700});
    T(ctx,'uzaklık (hücre) →',px1,py1+20,{align:'right',size:12,color:C.muted});
    T(ctx,'Yayılıyor + sönüyor',px0,372,{w:700,size:14,color:C.signal}); T(ctx,'= yakında güçlü, uzakta zayıf',px0,392,{size:13,color:C.muted});
  });
};

/* ===== Gray–Scott: Turing desenleri ===== */
W.grayscott = el => {
  TK.shell(el, 'Turing deseni üreteci', 'İki kimyasal: Gray–Scott modeli · tuvale dokunarak damla ekle');
  const c = TK.canvas(el, 640, 340, 'Gray-Scott desen simülasyonu');
  const N=128; let A=new Float32Array(N*N), B=new Float32Array(N*N), A2=new Float32Array(N*N), B2=new Float32Array(N*N);
  const PRE = { 'Benekler':[0.0367,0.0649], 'Şeritler / labirent':[0.029,0.057], 'Delikler':[0.039,0.058], 'Mercan':[0.0545,0.062] };
  let name='Benekler', [F,K]=PRE[name];
  const seed = (x,y,r=4) => { for (let j=-r;j<=r;j++) for (let i=-r;i<=r;i++){ const xx=(x+i+N)%N, yy=(y+j+N)%N; B[yy*N+xx]=1; A[yy*N+xx]=0.5; } };
  const reset = () => { A.fill(1); B.fill(0); for (let k=0;k<14;k++) seed(Math.floor(Math.random()*N), Math.floor(Math.random()*N)); };
  const step = () => { for (let y=0;y<N;y++){ const ym=((y-1+N)%N)*N, yp=((y+1)%N)*N, yc=y*N; for (let x=0;x<N;x++){ const xm=(x-1+N)%N, xp=(x+1)%N, i=yc+x;
      const la = -A[i] + .2*(A[yc+xm]+A[yc+xp]+A[ym+x]+A[yp+x]) + .05*(A[ym+xm]+A[ym+xp]+A[yp+xm]+A[yp+xp]);
      const lb = -B[i] + .2*(B[yc+xm]+B[yc+xp]+B[ym+x]+B[yp+x]) + .05*(B[ym+xm]+B[ym+xp]+B[yp+xm]+B[yp+xp]);
      const abb = A[i]*B[i]*B[i]; A2[i] = A[i] + (la - abb + F*(1-A[i])); B2[i] = B[i] + (.5*lb + abb - (K+F)*B[i]); } }
    let t=A; A=A2; A2=t; t=B; B=B2; B2=t; };
  const ctr = TK.el('div', {class:'ctrl'});
  Object.keys(PRE).forEach(k => { const b = TK.el('button', {class:'btn'+(k===name?' on':''), type:'button'}, k); b.onclick = () => { name=k; [F,K]=PRE[k]; [...ctr.children].forEach(x=>x.classList.toggle('on', x===b)); reset(); }; ctr.appendChild(b); });
  const r = TK.el('button', {class:'btn', type:'button'}, 'Yeniden başlat'); r.onclick = reset; el.append(ctr); ctr.append(r);
  const off=document.createElement('canvas'); off.width=N; off.height=N; const o=off.getContext('2d'); const img=o.createImageData(N,N);
  c.cv.addEventListener('pointerdown', e => { const p=c.pos(e); if (p.x>=20 && p.x<=340 && p.y>=10 && p.y<=330) seed(Math.floor((p.x-20)/320*N), Math.floor((p.y-10)/320*N), 3); });
  reset(); if (TK.REDUCE) for (let i=0;i<2500;i++) step();
  c.animate((t, dt) => {
    const ctx=c.ctx; if (!TK.REDUCE && dt>0) for (let i=0;i<14;i++) step();
    for (let i=0;i<N*N;i++){ const v=TK.clamp((B[i]-0.05)*3.2,0,1); img.data[i*4]=212+(23-212)*v; img.data[i*4+1]=134+(18-134)*v; img.data[i*4+2]=47+(14-47)*v; img.data[i*4+3]=255; }
    o.putImageData(img,0,0); ctx.drawImage(off,20,10,320,320); ctx.strokeStyle=C.line; ctx.strokeRect(20,10,320,320);
    T(ctx,name,370,50,{w:700,size:20}); T(ctx,`F = ${F}   k = ${k4(K)}`,370,76,{mono:true,size:13,color:C.muted});
    const lines = ['Kimyasal A her yere eşit dağılır.','Kimyasal B, A\'yı "yiyerek" çoğalır','ve kendiliğinden kümeler oluşturur.','','Sadece F ve k sayılarını değiştirerek','benek, şerit ya da labirent elde edilir.','','Turing (1952): yayılan kimyasallar','tek düze bir dokuda desen yaratabilir.'];
    lines.forEach((s,i) => T(ctx,s,370,112+i*22,{size:14,color:i>=7?C.signal:C.ink,w:i>=7?700:400}));
  });
  function k4(v){ return v.toFixed(4); }
};

/* ===== Üstel azalma ===== */
W.decay = el => {
  TK.shell(el, 'Üstel azalma', 'Her λ adımında sinyal aynı oranda küçülür');
  const c = TK.canvas(el, 640, 320, 'Üstel azalma grafiği');
  let lam = 0.5;
  const ctr = TK.el('div', {class:'ctrl'}, `<label><span class="l">Menzil λ</span><input type="range" min="0.25" max="1" step="0.05" value="0.5"><span class="sv">0.50 mm</span></label>`);
  const inp = ctr.querySelector('input'); inp.oninput = () => { lam=+inp.value; ctr.querySelector('.sv').textContent = lam.toFixed(2)+' mm'; c.draw(); };
  const ro = TK.el('div', {class:'msg'}); el.append(ctr, ro);
  c.static(() => {
    const ctx=c.ctx, x0=60, x1=620, y0=30, y1=270, rmax=3, X=r=>x0+r/rmax*(x1-x0), Y=v=>y1-v/100*(y1-y0);
    L(ctx,x0,y1,x1,y1,C.muted); L(ctx,x0,y0,x0,y1,C.muted);
    for (let r=0;r<=3;r+=0.5) T(ctx,r+' mm',X(r),y1+18,{align:'center',size:11,mono:true,color:C.muted});
    [0,25,50,75,100].forEach(v => { T(ctx,v+'%',x0-6,Y(v)+4,{align:'right',size:11,mono:true,color:C.muted}); L(ctx,x0,Y(v),x1,Y(v),C.line,1,[2,4]); });
    for (let k=0; k*lam<=rmax+1e-9; k++){ const r=k*lam, v=100*Math.exp(-k); ctx.fillStyle=TK.rgba(C['lam-col'],.25); ctx.fillRect(X(r)-9,Y(v),18,y1-Y(v)); T(ctx,(v>=1?v.toFixed(0):v.toFixed(1))+'%',X(r),Y(v)-6,{align:'center',size:11,mono:true,color:C['lam-col']}); }
    ctx.beginPath(); for (let r=0;r<=rmax;r+=0.01){ const v=100*Math.exp(-r/lam); r?ctx.lineTo(X(r),Y(v)):ctx.moveTo(X(r),Y(v)); } ctx.strokeStyle=C.signal; ctx.lineWidth=3; ctx.stroke();
    const h = lam*Math.LN2; L(ctx,X(h),Y(50),X(h),y1,C.ink,1,[4,3]); L(ctx,x0,Y(50),X(h),Y(50),C.ink,1,[4,3]); T(ctx,'yarılanma: '+h.toFixed(2)+' mm',X(h)+6,Y(50)-6,{w:700,size:12});
    T(ctx,'sinyal (odaktaki değerin yüzdesi)',x0,18,{size:12,color:C.muted});
  });
  const upd = () => ro.innerHTML = `Mor çubuklar her <b>λ = ${lam.toFixed(2)} mm</b>'de bir: %100 → %37 → %14 → %5 … Her adımda kalan, öncekinin <b>1/e ≈ 0,37</b> katı. Sinyalin yarıya inmesi için gereken mesafe <b>λ · ln 2 ≈ 0,69 · λ</b>.`;
  inp.addEventListener('input', upd); upd();
};

/* ===== Doğrusal ↔ logaritmik eksen ===== */
W.logscale = el => {
  TK.shell(el, 'Logaritmik eksen', 'Aynı eğri, iki farklı cetvel');
  const c = TK.canvas(el, 640, 320, 'Doğrusal ve logaritmik eksen');
  let mode = 0, target = 0;
  const ctr = TK.el('div', {class:'ctrl'});
  const b1 = TK.el('button', {class:'btn on', type:'button'}, 'Doğrusal eksen'), b2 = TK.el('button', {class:'btn', type:'button'}, 'Logaritmik eksen (×10 basamak)');
  b1.onclick = () => { target=0; b1.classList.add('on'); b2.classList.remove('on'); }; b2.onclick = () => { target=1; b2.classList.add('on'); b1.classList.remove('on'); };
  ctr.append(b1,b2); el.append(ctr);
  const msg = TK.el('div', {class:'msg'}); el.append(msg);
  c.animate((t, dt) => {
    mode += (target-mode)*Math.min(1, dt*5 || 1); if (TK.REDUCE) mode = target;
    const ctx=c.ctx, x0=70,x1=610,y0=24,y1=280, S=M.S0, lam=M.LAM0;
    const yLin = v => y1 - v/90*(y1-y0), yLog = v => y1 - (Math.log10(Math.max(v,1e-3))+0.6)/(2.6)*(y1-y0);
    const Y = v => (1-mode)*yLin(v) + mode*yLog(v);
    ctx.save(); ctx.beginPath(); ctx.rect(x0,y0,x1-x0,y1-y0); ctx.clip();
    [[M.THP,'beyaz eşiği (≈34)'],[1,'siyah eşiği (1)']].forEach(([v,s]) => { L(ctx,x0,Y(v),x1,Y(v),C.ink,1.2,[6,4]); T(ctx,s,x1-6,Y(v)-6,{align:'right',size:12,w:700}); });
    ctx.beginPath(); for (let r=0;r<=4;r+=0.01){ const x=x0+r/4*(x1-x0), y=Y(S*Math.exp(-r/lam)); r?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.strokeStyle=C.signal; ctx.lineWidth=3; ctx.stroke(); ctx.restore();
    ctx.strokeStyle=C.line; ctx.strokeRect(x0,y0,x1-x0,y1-y0);
    const ticks = mode>0.5 ? [[1,'1'],[10,'10'],[100,'100']] : [[0,'0'],[20,'20'],[40,'40'],[60,'60'],[80,'80']];
    ticks.forEach(([v,s]) => T(ctx,s,x0-8,Y(v)+4,{align:'right',size:12,mono:true,color:C.muted}));
    for (let r=0;r<=4;r++) T(ctx,r+' mm',x0+r/4*(x1-x0),y1+18,{align:'center',size:11,mono:true,color:C.muted});
    msg.innerHTML = mode>0.5 ? '<b>Logaritmik eksende</b> her çizgi bir öncekinin 10 katı. Üstel azalan sinyal <b>düz bir çizgi</b> olur ve iki eşik de rahatça görünür.' : '<b>Doğrusal eksende</b> siyah eşiği (1) sıfıra o kadar yakın ki neredeyse görünmüyor. Disk sınırını bu grafikte okumak zor.';
  });
};

/* ===== Logaritma makinesi ===== */
W.lnmachine = el => {
  TK.shell(el, 'Logaritma makinesi', 'ln x: "e\'yi kaç kez çarpmalıyım ki x olsun?"');
  const box = TK.el('div', {style:'display:grid;gap:10px'});
  box.innerHTML = `<div class="ctrl"><label>Üs (kaç kez e ile çarpıyoruz)<input type="range" min="-2" max="6" step="0.1" value="4.4" id="lnY"><span class="sv" id="lnYv"></span></label></div>
  <div id="lnChain" style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;font-family:var(--f-mono);font-size:15px"></div>
  <div class="ro-grid"><div class="ro">e<sup>y</sup><b id="lnOut"></b></div><div class="ro">Ters işlem: ln(x)<b id="lnBack"></b></div></div>
  <div class="ctrl"><label style="flex:0 1 auto">x gir, ln x hesapla: <input type="number" step="any" id="lnX" value="81.5"></label><span class="sv" id="lnXv"></span></div>`;
  el.append(box);
  const y = box.querySelector('#lnY'), x = box.querySelector('#lnX');
  const upd = () => { const v=+y.value, ex=Math.exp(v); box.querySelector('#lnYv').textContent = 'y = '+v.toFixed(1);
    const n=Math.floor(Math.abs(v)), frac=Math.abs(v)-n, ch=box.querySelector('#lnChain'); ch.innerHTML='';
    const chip = (s,w) => { const e=TK.el('span',{style:`display:inline-grid;place-items:center;min-width:${w}px;height:30px;padding:0 6px;border-radius:6px;background:${v<0?'var(--bad-bg)':'var(--sunk)'};`}, s); ch.appendChild(e); };
    chip('1',30); for (let i=0;i<n;i++){ ch.append(v<0?' ÷ ':' × '); chip('e',30); } if (frac>0.05){ ch.append(v<0?' ÷ ':' × '); chip('e<sup>'+frac.toFixed(1)+'</sup>',44); }
    box.querySelector('#lnOut').textContent = ex>=100 ? ex.toFixed(1) : ex.toFixed(3); box.querySelector('#lnBack').textContent = 'ln('+(ex>=100?ex.toFixed(1):ex.toFixed(3))+') = '+v.toFixed(1); };
  const updX = () => { const v=parseFloat(String(x.value).replace(',','.')); box.querySelector('#lnXv').textContent = v>0 ? 'ln x = '+Math.log(v).toFixed(3) : 'x pozitif olmalı'; };
  y.oninput = upd; x.oninput = updX; upd(); updX();
};

/* ===== Boyut analizi ===== */
W.units = el => {
  TK.shell(el, 'Birim dedektifi', 'Hangi birleşim uzunluk (mm) verir?');
  const opts = [['D × γ','mm²/s × 1/s = mm²/s²','hız karesi gibi; uzunluk değil'],['D ÷ γ','(mm²/s) ÷ (1/s) = mm²','alan; uzunluk değil, ama yaklaştın'],['√(D ÷ γ)','√mm² = mm','UZUNLUK! Menzil λ = √(D/γ)'],['γ ÷ D','(1/s) ÷ (mm²/s) = 1/mm²','alanın tersi'],['√(D × γ)','√(mm²/s²) = mm/s','hız; uzunluk değil']];
  el.append(TK.el('p', {style:'margin:0'}, 'Yayılma katsayısı <b>D</b>: mm²/s (saniyede kaç mm² yayılır) · Sönme hızı <b>γ</b>: 1/s (saniyede yüzde kaçı söner)'));
  const ctr = TK.el('div', {class:'ctrl'}), out = TK.el('div', {class:'msg'}, 'Bir birleşim seç.');
  opts.forEach(o => { const b=TK.el('button',{class:'btn',type:'button'},o[0]); b.onclick=()=>{ [...ctr.children].forEach(x=>x.classList.remove('on')); b.classList.add('on'); const ok=o[0]==='√(D ÷ γ)'; out.className='msg '+(ok?'ok':'warn'); out.innerHTML=`<span class="num">${o[1]}</span> → ${o[2]}`; }; ctr.appendChild(b); });
  el.append(ctr, out);
};

/* ===== Adım adım türetme ===== */
W.derive = el => {
  TK.shell(el, 'Formülü birlikte türetelim', 'Her adımda "Neden?"e bas');
  const S = [
    ['m(r) = S · e<sup>−r/λ</sup>','Sinyalin odaktan r uzaklıktaki değeri. Odakta (r = 0) değer S; her λ adımında e\'ye bölünüyor.'],
    ['Halkanın kenarında: m(r) = θ','Halka, sinyalin tam eşik değerine indiği yerde biter. O noktada sinyal = eşik.'],
    ['S · e<sup>−r/λ</sup> = θ','İlk iki satırı birleştirdik.'],
    ['e<sup>−r/λ</sup> = θ / S','İki tarafı S\'ye böldük.'],
    ['−r/λ = ln(θ / S)','e\'nin üssünü almak için iki tarafın ln\'ini aldık: ln(e<sup>a</sup>) = a.'],
    ['r/λ = ln(S / θ)','Eksiyi içeri attık: −ln(θ/S) = ln(S/θ). (Kesri ters çevirince logaritmanın işareti değişir.)'],
    ['<b>r = λ · ln(S / θ)</b>','İki tarafı λ ile çarptık. Projenin ana formülü! Halka yarıçapı = menzil × ln(güç ÷ eşik).']
  ];
  const list = TK.el('ol', {style:'display:grid;gap:8px;padding-left:24px;margin:0'}); el.append(list);
  let shown = 1;
  const nx = TK.el('button', {class:'btn primary', type:'button'}, 'Sonraki adım →');
  const render = () => { list.innerHTML=''; S.slice(0,shown).forEach(s => { const li=TK.el('li',{}, `<span class="formula" style="display:inline-block;white-space:normal">${s[0]}</span> <button class="btn" type="button" style="font-size:13px;padding:2px 8px">Neden?</button><div class="ex" hidden>${s[1]}</div>`); li.querySelector('button').onclick=()=>{ const d=li.querySelector('.ex'); d.hidden=!d.hidden; }; list.appendChild(li); }); nx.disabled = shown>=S.length; nx.textContent = shown>=S.length ? 'Türetme tamam ✓' : 'Sonraki adım →'; };
  nx.onclick = () => { shown++; render(); };
  const ctr = TK.el('div', {class:'ctrl'}); const rs=TK.el('button',{class:'btn',type:'button'},'Baştan'); rs.onclick=()=>{shown=1;render();}; ctr.append(nx, rs); el.append(ctr); render();
};

/* ===== Eşik grafiği (tarama ve oyun alanı) ===== */
const G = {x0:78, x1:612, y0:22, y1:240, rmax:4, lmin:-0.6, lmax:2.75, sy0:272, sy1:388};
const GX = r => G.x0 + r/G.rmax*(G.x1-G.x0), GY = l => G.y1 - (l-G.lmin)/(G.lmax-G.lmin)*(G.y1-G.y0), GK = (G.x1-G.x0)/G.rmax;
function graph(ctx, S, lam, sweepR, ghost){
  const yP=GY(Math.log10(M.THP)), yD=GY(0), {rp,rd}=TK.rings(S,lam);
  ctx.fillStyle=TK.rgba(C.ink,0.03); ctx.fillRect(G.x0,G.y0,G.x1-G.x0,yP-G.y0);
  ctx.fillStyle=TK.rgba(C.ink,0.11); ctx.fillRect(G.x0,yP,G.x1-G.x0,yD-yP);
  ctx.fillStyle=TK.rgba(WING.or,0.2); ctx.fillRect(G.x0,yD,G.x1-G.x0,G.y1-yD);
  T(ctx,'→ BEYAZ olur',G.x1-8,G.y0+16,{align:'right',size:12,color:C.muted,w:700}); T(ctx,'→ SİYAH olur',G.x1-8,yP+16,{align:'right',size:12,color:C.muted,w:700}); T(ctx,'→ TURUNCU kalır',G.x1-8,yD+16,{align:'right',size:12,color:C.muted,w:700});
  L(ctx,G.x0,yP,G.x1,yP,C.ink,1.2,[6,4]); L(ctx,G.x0,yD,G.x1,yD,C.ink,1.2,[6,4]);
  T(ctx,'beyaz eşiği θ₁',G.x0+170,yP-6,{size:12,w:700}); T(ctx,'siyah eşiği θ₂',G.x0+170,yD-6,{size:12,w:700});
  [[0,'1'],[1,'10'],[2,'100']].forEach(([l,s]) => { L(ctx,G.x0-4,GY(l),G.x0,GY(l),C.muted); T(ctx,s,G.x0-8,GY(l)+4,{align:'right',size:12,color:C.muted,mono:true}); });
  ctx.save(); ctx.translate(18,(G.y0+G.y1)/2); ctx.rotate(-Math.PI/2); T(ctx,'sinyal (×10 basamak)',0,0,{align:'center',size:12,color:C.muted}); ctx.restore();
  for (let r=0;r<=4;r++) T(ctx,r+' mm',GX(r),G.y1+16,{align:'center',size:11,color:C.muted,mono:true});
  ctx.strokeStyle=C.line; ctx.lineWidth=1; ctx.strokeRect(G.x0,G.y0,G.x1-G.x0,G.y1-G.y0);
  const curve=(S_,lam_,rTo,col,w,dash)=>{ ctx.save(); ctx.beginPath(); ctx.rect(G.x0,G.y0,G.x1-G.x0,G.y1-G.y0); ctx.clip(); ctx.strokeStyle=col; ctx.lineWidth=w; if(dash) ctx.setLineDash(dash); ctx.beginPath(); ctx.moveTo(GX(0),GY(Math.log10(S_))); ctx.lineTo(GX(rTo),GY(Math.log10(S_)-rTo/(lam_*Math.LN10))); ctx.stroke(); ctx.restore(); };
  if (ghost){ curve(M.S0,M.LAM0,G.rmax,C.muted,1.5,[3,4]); T(ctx,'başlangıç',GX(0.15),GY(Math.log10(M.S0)-0.15/(M.LAM0*Math.LN10))-8,{size:11,color:C.muted}); }
  const rTo=Math.min(sweepR,G.rmax); curve(S,lam,rTo,C.signal,3.5);
  ctx.save(); ctx.beginPath(); ctx.rect(G.x0,G.sy0,Math.max(0,GX(rTo)-G.x0),G.sy1-G.sy0); ctx.clip(); ctx.fillStyle=WING.or; ctx.fillRect(G.x0,G.sy0,G.x1-G.x0,G.sy1-G.sy0); SP(ctx,G.x0,(G.sy0+G.sy1)/2,GK,rp,rd); ctx.restore();
  ctx.strokeStyle=C.line; ctx.strokeRect(G.x0,G.sy0,G.x1-G.x0,G.sy1-G.sy0); T(ctx,'benek',G.x0-8,(G.sy0+G.sy1)/2+4,{align:'right',w:700});
  if (rp>0 && rp<=rTo){ L(ctx,GX(rp),yP,GX(rp),G.sy1,C.ink,1,[2,3]); D(ctx,GX(rp),yP,5,C.ink); T(ctx,'pupil '+fmt(rp)+' mm',GX(rp)-4,410,{align:'right',size:12,mono:true}); }
  if (rd>0 && rd<=rTo && rd<=G.rmax){ L(ctx,GX(rd),yD,GX(rd),G.sy1,C.ink,1,[2,3]); D(ctx,GX(rd),yD,5,C.ink); T(ctx,'disk '+fmt(rd)+' mm',GX(rd)+4,410,{size:12,mono:true}); }
  if (rd>G.rmax) T(ctx,'disk grafikten taştı →',G.x1,410,{align:'right',size:12,color:C.bad});
  return {rp,rd};
}
W.sweep = el => {
  TK.shell(el, 'Eşik kuralı', 'Dikey çizgi odaktan dışarı yürüyor');
  const c = TK.canvas(el, 640, 420, 'Eşik kuralı taraması');
  c.animate(t => {
    const ctx=c.ctx, ph = TK.REDUCE ? 1 : Math.min(1,(t%7.5)/5.5), sw=ph*G.rmax; graph(ctx, M.S0, M.LAM0, sw, false);
    if (ph<1){ const l=Math.log10(M.S0)-sw/(M.LAM0*Math.LN10), x=GX(sw), y=GY(l), v=Math.pow(10,l);
      L(ctx,x,G.y0,x,G.sy1,C.signal,1.5); D(ctx,x,y,6,C.signal);
      const lab='sinyal '+(v>=10?v.toFixed(0):v.toFixed(1))+' → '+(v>M.THP?'beyaz':v>1?'siyah':'turuncu');
      ctx.font='700 13px "Atkinson Hyperlegible", system-ui, sans-serif'; const w=ctx.measureText(lab).width+14, bx=Math.min(x+10,G.x1-w-4), by=Math.max(G.y0+4,Math.min(y-34,G.y1-30));
      ctx.fillStyle=C.surface; ctx.strokeStyle=C.signal; ctx.lineWidth=1.5; ctx.beginPath(); ctx.roundRect(bx,by,w,24,6); ctx.fill(); ctx.stroke(); T(ctx,lab,bx+7,by+16,{size:13,w:700}); }
  });
};
W.playground = el => {
  TK.shell(el, 'Oyun alanı: iki düğme', 'Kaydırıcılarla beneği değiştir');
  const c = TK.canvas(el, 640, 420, 'Güç ve menzil oyun alanı');
  const lnMin=Math.log(15), lnMax=Math.log(400); let S=M.S0, lam=M.LAM0;
  const ctr = TK.el('div', {class:'ctrl'}, `<label><span class="s">Güç S</span><input type="range" min="0" max="1000" step="1" class="iS"><span class="sv vS"></span></label><label><span class="l">Menzil λ</span><input type="range" min="0.25" max="0.75" step="0.01" value="0.5" class="iL"><span class="sv vL"></span></label>`);
  const ro = TK.el('div', {class:'ro-grid'}, `<div class="ro">Pupil r<sub>p</sub><b class="a"></b></div><div class="ro">Disk r<sub>d</sub><b class="b"></b></div><div class="ro hl">Fark (r<sub>d</sub> − r<sub>p</sub>)<b class="f"></b></div><div class="ro hl">Oran (r<sub>p</sub> ÷ r<sub>d</sub>)<b class="o"></b></div>`);
  const ctr2 = TK.el('div', {class:'ctrl'}); const rs = TK.el('button',{class:'btn',type:'button'},'Başa döndür'); ctr2.append(rs);
  el.append(ctr, ro, ctr2);
  const iS=ctr.querySelector('.iS'), iL=ctr.querySelector('.iL'); const toS = v => Math.round((Math.log(v)-lnMin)/(lnMax-lnMin)*1000);
  const upd = () => { S=Math.exp(lnMin+iS.value/1000*(lnMax-lnMin)); lam=+iL.value; const {rp,rd}=TK.rings(S,lam);
    ctr.querySelector('.vS').textContent=S.toFixed(0); ctr.querySelector('.vL').textContent=lam.toFixed(2)+' mm';
    ro.querySelector('.a').textContent=fmt(rp)+' mm'; ro.querySelector('.b').textContent=fmt(rd)+' mm'; ro.querySelector('.f').textContent=fmt(rd-rp)+' mm'; ro.querySelector('.o').textContent=rd>0?fmt(rp/rd):'—'; c.draw(); };
  iS.oninput=upd; iL.oninput=upd; rs.onclick=()=>{ iS.value=toS(M.S0); iL.value=M.LAM0; upd(); }; iS.value=toS(M.S0);
  c.static(() => { const {rp}=graph(c.ctx,S,lam,G.rmax,true); if (rp<=0){ c.ctx.fillStyle=TK.rgba(C.bad,.12); c.ctx.fillRect(G.x0+8,G.y0+8,330,26); T(c.ctx,'Sinyal beyaz eşiğe hiç ulaşmıyor: pupil yok!',G.x0+16,G.y0+26,{w:700,color:C.bad}); } });
  upd();
};

/* ===== Aynı benek, farklı S ve θ (tanımlanamazlık) ===== */
W.samespot = el => {
  TK.shell(el, 'Gizli ikizler', 'S ve θ\'yı birlikte değiştir');
  const c = TK.canvas(el, 640, 230, 'İki kelebeğin benekleri');
  const ctr = TK.el('div', {class:'ctrl'}, `<label>Güç S × <input type="range" min="0" max="2" step="0.1" value="1" class="a"><span class="sv va"></span></label><label>Bütün eşikler θ × <input type="range" min="0" max="2" step="0.1" value="1" class="b"><span class="sv vb"></span></label>`);
  const msg = TK.el('div', {class:'msg'}); el.append(ctr, msg);
  const a=ctr.querySelector('.a'), b=ctr.querySelector('.b');
  const upd = () => { const fa=Math.pow(3,+a.value-1), fb=Math.pow(3,+b.value-1); ctr.querySelector('.va').textContent=fa.toFixed(2); ctr.querySelector('.vb').textContent=fb.toFixed(2);
    const S=M.S0*fa, thd=fb, thp=M.THP*fb, rd=M.LAM0*Math.log(S/thd), rp=S>thp?M.LAM0*Math.log(S/thp):0;
    c.static(() => { const ctx=c.ctx; [[160,'Kelebek A (başlangıç)',2.2,0.44],[480,'Kelebek B',Math.max(0,rd),rp]].forEach(([x,s,d,p]) => { ctx.fillStyle=WING.or; ctx.fillRect(x-120,30,240,170); SP(ctx,x,115,30,p,d); T(ctx,s,x,22,{align:'center',w:700}); T(ctx,`disk ${fmt(d)} · pupil ${fmt(p)} mm`,x,220,{align:'center',size:12,mono:true}); }); });
    const same = Math.abs(rd-2.2)<0.02 && Math.abs(rp-0.44)<0.02;
    msg.className='msg '+(same?'ok':''); msg.innerHTML = same ? (Math.abs(fa-1)<0.01 ? 'İkisi aynı. Şimdi S\'yi ve θ\'yı <b>aynı kat</b> değiştirmeyi dene.' : `<b>Birebir aynı benek!</b> S ${fa.toFixed(2)} kat, eşikler de ${fb.toFixed(2)} kat değişti; oranları değişmedi. Fotoğraftan S ile θ\'yı ayrı ayrı bulamayız, yalnızca S/θ oranını buluruz.`) : 'Benekler farklı. Formülde S ve θ yalnızca <b>S/θ</b> olarak geçiyor; ikisini aynı kat değiştirirsen ne olur?';
  };
  a.oninput=upd; b.oninput=upd; upd();
};

/* ===== Üç senaryo yan yana ===== */
W.scenarios = el => {
  TK.shell(el, 'Üç senaryo', 'Yeşil = o senaryoda hiç değişmeyen sayı');
  const c = TK.canvas(el, 640, 420, 'Üç senaryonun benekleri ve grafikleri');
  const trails=[[],[],[]]; let clock=0;
  c.animate((t, dt) => {
    const ctx=c.ctx, f=TK.REDUCE?1:Math.exp(0.36*Math.sin(t*0.9)), rdT=2.2*f;
    const P=[{n:'Yalnız GÜÇ (S)',col:C['s-col'],rd:rdT,rp:Math.max(0,M.LAM0*(0.88+rdT/M.LAM0-4.4)),k:'fark'},{n:'Yalnız MENZİL (λ)',col:C['lam-col'],rd:rdT,rp:0.44*f,k:'oran'},{n:'Pupil hep aynı',col:C.warn,rd:rdT,rp:0.44,k:'pupil'}];
    clock+=dt; const push=clock>0.06; if (push) clock=0;
    P.forEach((p,i) => { const x0=10+i*210, cx=x0+100, cy=128;
      ctx.fillStyle=C.bg; ctx.beginPath(); ctx.roundRect(x0,8,200,404,10); ctx.fill();
      T(ctx,p.n,cx,32,{align:'center',w:700,size:14,color:p.col});
      ctx.save(); ctx.beginPath(); ctx.roundRect(x0+12,44,176,170,8); ctx.clip(); ctx.fillStyle=WING.or; ctx.fillRect(x0+12,44,176,170); SP(ctx,cx,cy,27,p.rp,p.rd); ctx.restore();
      if (p.rp<=0) T(ctx,'pupil kayboldu!',cx,206,{align:'center',size:12,w:700,color:'#7A1010'});
      [['pupil',fmt(p.rp)+' mm',p.k==='pupil'],['fark',fmt(p.rd-p.rp)+' mm',p.k==='fark'],['oran',fmt(p.rd>0?p.rp/p.rd:0),p.k==='oran']].forEach(([a,b,h],j) => { const y=238+j*20; T(ctx,a,x0+18,y,{color:h?C.ok:C.muted,w:h?700:400}); T(ctx,b+(h?'  sabit':''),x0+186,y,{align:'right',size:12,mono:true,color:h?C.ok:C.ink}); });
      const px0=x0+30,px1=x0+188,py0=308,py1=396,X=v=>px0+v/3.4*(px1-px0),Y=v=>py1-v/0.8*(py1-py0);
      L(ctx,px0,py1,px1,py1,C.muted); L(ctx,px0,py0,px0,py1,C.muted); T(ctx,'disk →',px1,py1+13,{align:'right',size:11,color:C.muted});
      ctx.save(); ctx.translate(px0-8,(py0+py1)/2); ctx.rotate(-Math.PI/2); T(ctx,'pupil →',0,0,{align:'center',size:11,color:C.muted}); ctx.restore();
      if (push){ trails[i].push([p.rd,p.rp]); if (trails[i].length>140) trails[i].shift(); }
      trails[i].forEach(([a,b],j) => D(ctx,X(a),Y(b),2.2,TK.rgba(p.col,0.15+0.6*j/trails[i].length))); D(ctx,X(p.rd),Y(p.rp),5,p.col);
    });
    T(ctx,'Her nokta = bir kelebek',320,302,{align:'center',size:12,color:C.muted});
  });
};

/* ===== Senaryo → öngörü eşleştirme tablosu (statik özet) ===== */
W.hyptable = el => {
  TK.shell(el, 'Hipotez tablosu', 'Projenin kalbi');
  el.append(TK.el('div', {class:'tw'}, `<table class="t"><thead><tr><th>Senaryo</th><th>Sabit kalan</th><th>(r<sub>d</sub>, r<sub>p</sub>) grafiği</th><th>Oran testi ρ beklentisi</th></tr></thead><tbody>
  <tr><td><span class="s">Yalnız S değişir</span></td><td>Fark r<sub>d</sub> − r<sub>p</sub></td><td>Eğimi 1 olan doğru</td><td>Pozitif (+)</td></tr>
  <tr><td><span class="l">Yalnız λ değişir</span></td><td>Oran r<sub>p</sub> / r<sub>d</sub></td><td>Orijinden geçen doğru</td><td>Sıfıra yakın (0)</td></tr>
  <tr><td><b style="color:var(--warn)">Pupil sabit</b></td><td>Pupil r<sub>p</sub></td><td>Yatay doğru</td><td>Negatif (−)</td></tr></tbody></table>`));
};
})();
