/* Turing Kelebek Çalışma Rehberi — çekirdek: durum, tema renkleri, tuval yardımcısı, sınav motoru */
(function(){
const TK = window.TK = { W:{}, U:[], loops:[], C:{} };
const KEY = 'tk-rehber-v1';

/* ---------- durum (yalnız bu tarayıcıda) ---------- */
TK.state = { quiz:{}, checks:{}, tasks:{}, visited:{}, role:'' };
try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s) Object.assign(TK.state, s); } catch(e){}
TK.save = () => { try { localStorage.setItem(KEY, JSON.stringify(TK.state)); } catch(e){} TK.refreshNav && TK.refreshNav(); };
TK.resetAll = () => { TK.state = { quiz:{}, checks:{}, tasks:{}, visited:{}, role:'' }; TK.save(); };

/* ---------- renkler ---------- */
const TOK = ['bg','surface','sunk','ink','muted','line','signal','s-col','lam-col','ok','bad','warn'];
TK.readColors = () => { const cs = getComputedStyle(document.documentElement); TOK.forEach(k => TK.C[k] = cs.getPropertyValue('--'+k).trim()); };
TK.readColors();
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', TK.readColors);
new MutationObserver(TK.readColors).observe(document.documentElement, {attributes:true, attributeFilter:['data-theme']});
TK.REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
TK.WING = { or:'#D4862F', br:'#5A3D27', bk:'#17120E', pu:'#F7F3EA', dark:'#33220F' };

const hex = h => { h = (h||'#000000').replace('#',''); return [0,2,4].map(i => parseInt(h.slice(i,i+2),16)); };
TK.rgb = hex;
TK.rgba = (h,a) => { const [r,g,b] = hex(h); return `rgba(${r},${g},${b},${a})`; };
TK.fmt = (v,d=2) => (Number.isFinite(v) ? v.toFixed(d) : '—').replace('-', '−');
TK.clamp = (v,a,b) => Math.max(a, Math.min(b, v));

/* ---------- tuval ---------- */
TK.canvas = (host, W, H, label) => {
  const cv = document.createElement('canvas'); cv.style.aspectRatio = W+'/'+H; cv.setAttribute('role','img'); cv.setAttribute('aria-label', label || 'etkileşimli çizim');
  host.appendChild(cv);
  const ctx = cv.getContext('2d');
  const o = { cv, ctx, W, H, visible:false, fn:null, t:0, last:0 };
  const resize = () => { const r = cv.getBoundingClientRect(); if (!r.width) return; const d = window.devicePixelRatio || 1; cv.width = Math.round(r.width*d); cv.height = Math.round(r.width*H/W*d); ctx.setTransform(cv.width/W,0,0,cv.height/H,0,0); o.draw && o.draw(0); };
  new ResizeObserver(resize).observe(cv);
  new IntersectionObserver(es => { o.visible = es[0].isIntersecting; }).observe(cv);
  o.clear = () => { ctx.clearRect(0,0,W,H); ctx.fillStyle = TK.C.surface; ctx.fillRect(0,0,W,H); };
  /* sürekli animasyon: fn(t, dt) — ekranda görünmüyorken durur */
  o.animate = fn => { o.fn = fn; o.draw = dt => { o.clear(); fn(o.t, dt); }; TK.loops.push(o); };
  /* tek seferlik çizim */
  o.static = fn => { o.draw = () => { o.clear(); fn(); }; o.draw(); };
  o.pos = e => { const r = cv.getBoundingClientRect(); return { x:(e.clientX - r.left)*W/r.width, y:(e.clientY - r.top)*H/r.height }; };
  return o;
};
let lastT = performance.now();
function tick(now){
  const dt = Math.min(0.05, (now-lastT)/1000); lastT = now;
  for (const o of TK.loops){ if (o.visible && o.fn){ o.t += dt; o.draw(dt); } }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

TK.text = (ctx, s, x, y, o={}) => {
  ctx.font = o.mono ? `500 ${o.size||12}px "JetBrains Mono", ui-monospace, monospace` : `${o.w||400} ${o.size||13}px "Atkinson Hyperlegible", system-ui, sans-serif`;
  ctx.fillStyle = o.color || TK.C.ink; ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'alphabetic';
  ctx.fillText(s, x, y);
};
TK.line = (ctx,x1,y1,x2,y2,col,w=1,dash) => { ctx.save(); ctx.strokeStyle=col; ctx.lineWidth=w; if (dash) ctx.setLineDash(dash); ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke(); ctx.restore(); };
TK.disc = (ctx,x,y,r,col) => { if (r<=0) return; ctx.fillStyle=col; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill(); };
TK.spot = (ctx,x,y,k,rp,rd) => { ctx.fillStyle = TK.WING.bk; ctx.beginPath(); ctx.arc(x,y,Math.max(0,rd*k),0,Math.PI*2); ctx.fill(); if (rp>0){ ctx.fillStyle = TK.WING.pu; ctx.beginPath(); ctx.arc(x,y,rp*k,0,Math.PI*2); ctx.fill(); } };

/* widget kabuğu: başlık + gövde */
TK.shell = (el, title, hint) => {
  el.classList.add('w');
  el.innerHTML = `<div class="wt"><b>${title}</b><span>${hint||''}</span></div>`;
  return el;
};
TK.el = (tag, attrs={}, html='') => { const e = document.createElement(tag); for (const k in attrs) e.setAttribute(k, attrs[k]); e.innerHTML = html; return e; };

/* ---------- model ---------- */
TK.M = { LAM0:0.5, S0:Math.exp(4.4), THP:Math.exp(4.4-0.88) };
TK.rings = (S, lam, thp=TK.M.THP) => ({ rd: S>1 ? lam*Math.log(S) : 0, rp: S>thp ? lam*Math.log(S/thp) : 0 });

/* ---------- istatistik ---------- */
TK.mean = a => a.reduce((s,v)=>s+v,0)/a.length;
TK.sd = a => { const m = TK.mean(a); return Math.sqrt(a.reduce((s,v)=>s+(v-m)**2,0)/(a.length-1)); };
TK.ranks = a => { const idx=a.map((v,i)=>i).sort((i,j)=>a[i]-a[j]), r=new Array(a.length); let i=0; while(i<idx.length){ let j=i; while(j+1<idx.length && a[idx[j+1]]===a[idx[i]]) j++; const av=(i+j)/2+1; for(let k=i;k<=j;k++) r[idx[k]]=av; i=j+1; } return r; };
TK.pearson = (x,y) => { const n=x.length, mx=TK.mean(x), my=TK.mean(y); let a=0,b=0,c=0; for(let i=0;i<n;i++){ const u=x[i]-mx, v=y[i]-my; a+=u*v; b+=u*u; c+=v*v; } return (b&&c) ? a/Math.sqrt(b*c) : 0; };
TK.spearman = (x,y) => TK.pearson(TK.ranks(x), TK.ranks(y));
TK.rng = seed => { let a = seed|0; return () => { a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; };
TK.gaussFrom = rnd => () => { let u=0; while(u===0) u=rnd(); return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*rnd()); };
TK.shuffle = a => { a = a.slice(); for (let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };

/* ---------- hızlı kontrol (tek soru, anında geri bildirim) ---------- */
TK.check = (el, q, id) => {
  el.className = 'check';
  el.innerHTML = `<div class="qh"><span class="tag">Hızlı kontrol</span></div><div class="qtext">${q.q}</div><div class="opts"></div><div class="ex" hidden></div>`;
  const box = el.querySelector('.opts'), ex = el.querySelector('.ex');
  const order = TK.shuffle(q.opts.map((o,i)=>i));
  const show = (pick) => {
    [...box.children].forEach(b => { const i=+b.dataset.i; b.disabled = true; if (i===q.a) b.classList.add('right'); else if (i===pick) b.classList.add('wrong'); });
    ex.hidden = false; ex.className = 'ex ' + (pick===q.a ? 'ok' : 'bad');
    ex.innerHTML = (pick===q.a ? '<b>Doğru.</b> ' : '<b>Tam değil.</b> ') + q.ex;
  };
  order.forEach(i => { const b = TK.el('button', {class:'opt', type:'button', 'data-i':i}, `<span class="dot"></span><span>${q.opts[i]}</span>`);
    b.addEventListener('click', () => { TK.state.checks[id] = i; TK.save(); show(i); }); box.appendChild(b); });
  if (id in TK.state.checks) show(TK.state.checks[id]);
};

/* ---------- sınav motoru: mc / num / match ---------- */
TK.quiz = (el, qs, opt) => {
  el.className = 'quiz';
  const render = () => {
    el.innerHTML = `<div class="qh"><span class="tag">${opt.tag||'Ara değerlendirme'}</span><span class="num" style="color:var(--muted)">${qs.length} soru${opt.pass===0?'':' · geçme sınırı %'+(opt.pass ?? 70)}</span></div>${opt.intro?`<p style="margin:0">${opt.intro}</p>`:''}`;
    const items = qs.map((q, n) => {
      const it = TK.el('div', {class:'qitem'}); it.innerHTML = `<div class="qtext"><span class="qn">${n+1}.</span>${q.q}</div>`;
      if (q.t === 'num'){
        const row = TK.el('div', {class:'ctrl'}, `<label style="flex:0 1 auto">Cevabın: <input type="text" inputmode="decimal" autocomplete="off" id="${opt.id}-q${n}"> ${q.unit||''}</label>`);
        it.appendChild(row); it.get = () => { const v = parseFloat(row.querySelector('input').value.replace(',','.')); return v; };
        it.input = row.querySelector('input');
        it.grade = v => Number.isFinite(v) && Math.abs(v - q.a) <= (q.tol ?? Math.abs(q.a)*0.03);
        it.mark = ok => { it.input.style.borderColor = ok ? 'var(--ok)' : 'var(--bad)'; it.input.disabled = true; };
        it.answerText = () => `Doğru cevap: <b>${String(q.a).replace('.',',')}${q.unit?' '+q.unit:''}</b>. `;
      } else if (q.t === 'match'){
        const rights = TK.shuffle(q.pairs.map(p=>p[1]));
        const box = TK.el('div', {class:'match'});
        q.pairs.forEach((p,i) => { const r = TK.el('div', {class:'row'}, `<span>${p[0]}</span><select id="${opt.id}-q${n}-${i}" aria-label="${p[0].replace(/<[^>]+>/g,'')}"><option value="">Seç…</option>${rights.map(x=>`<option>${x}</option>`).join('')}</select>`); box.appendChild(r); });
        it.appendChild(box);
        it.get = () => [...box.querySelectorAll('select')].map(s => s.value);
        it.grade = v => v.every((x,i) => x === q.pairs[i][1]);
        it.mark = () => { [...box.children].forEach((r,i) => { const s=r.querySelector('select'); r.classList.add(s.value===q.pairs[i][1]?'right':'wrong'); s.disabled=true; }); };
        it.answerText = () => 'Doğru eşleşme: ' + q.pairs.map(p => `${p[0]} → <b>${p[1]}</b>`).join('; ') + '. ';
      } else {
        const box = TK.el('div', {class:'opts'}); let pick = -1;
        TK.shuffle(q.opts.map((o,i)=>i)).forEach(i => { const b = TK.el('button', {class:'opt', type:'button', 'aria-pressed':'false', 'data-i':i}, `<span class="dot"></span><span>${q.opts[i]}</span>`);
          b.addEventListener('click', () => { pick = i; [...box.children].forEach(x => x.setAttribute('aria-pressed', x===b ? 'true':'false')); }); box.appendChild(b); });
        it.appendChild(box); it.get = () => pick; it.grade = v => v === q.a;
        it.mark = () => { [...box.children].forEach(b => { const i=+b.dataset.i; b.disabled=true; if (i===q.a) b.classList.add('right'); else if (i===pick) b.classList.add('wrong'); }); };
        it.answerText = () => '';
      }
      const ex = TK.el('div', {class:'ex', hidden:''}); it.appendChild(ex); it.ex = ex;
      el.appendChild(it); return it;
    });
    const foot = TK.el('div', {class:'qfoot'});
    const go = TK.el('button', {class:'btn primary', type:'button'}, 'Cevapları kontrol et');
    const res = TK.el('div', {class:'msg', hidden:''});
    foot.append(go); el.append(foot, res);
    go.addEventListener('click', () => {
      const unanswered = items.filter(it => { const v = it.get(); return v === -1 || (typeof v === 'number' && !Number.isFinite(v)) || (Array.isArray(v) && v.some(x=>!x)); }).length;
      const block = opt.beforeCheck && opt.beforeCheck();
      if (block){ res.hidden=false; res.className='msg warn'; res.innerHTML = block; return; }
      if (unanswered && !go.dataset.force){ res.hidden=false; res.className='msg warn'; res.textContent = `${unanswered} soru boş. Yine de kontrol etmek için düğmeye tekrar bas.`; go.dataset.force='1'; return; }
      let score = 0; const oks = [];
      items.forEach((it,i) => { const v = it.get(), ok = it.grade(v); if (ok) score++; oks.push(ok); it.mark(ok); it.ex.hidden=false; it.ex.className = 'ex '+(ok?'ok':'bad'); it.ex.innerHTML = (ok?'<b>Doğru.</b> ':'<b>Yanlış.</b> '+it.answerText()) + (qs[i].ex||''); });
      const pct = Math.round(100*score/qs.length), pass = pct >= (opt.pass ?? 70);
      res.hidden=false; res.className = 'msg ' + (pass?'ok':'warn');
      res.innerHTML = `<span class="score">${score} / ${qs.length}</span> &nbsp; %${pct} · ${pass ? (opt.passMsg || 'Bu üniteyi geçtin. Harika!') : 'Açıklamaları oku, ilgili bölüme dön ve tekrar dene.'}`;
      go.remove();
      const again = TK.el('button', {class:'btn', type:'button'}, 'Yeniden dene (sorular karışır)'); again.addEventListener('click', () => { if (opt.regen) qs = opt.regen(); render(); el.scrollIntoView({block:'start'}); });
      foot.append(again);
      const rec = TK.state.quiz[opt.id] || { best:0, attempts:0, first:null };
      rec.attempts++; rec.last = pct; rec.best = Math.max(rec.best, pct); if (rec.first === null) rec.first = pct; rec.date = new Date().toISOString().slice(0,10);
      TK.state.quiz[opt.id] = rec; TK.save();
      opt.onDone && opt.onDone(pct, { correct:score, total:qs.length, oks, qs, attempt:rec.attempts, res });
    });
  };
  render();
};
})();
