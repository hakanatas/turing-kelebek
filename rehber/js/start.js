/* Yönlendirme ve ünite çizimi */
(function(){
const $ = s => document.querySelector(s);
const list = $('#unitList'), col = $('#col'), side = $('#side');
const passOf = u => u.quiz ? (u.quiz.pass ?? 70) : 70;
const passed = u => { const r = TK.state.quiz[u.quiz.id]; return !!r && r.best >= passOf(u) && (u.quiz.pass !== 0 || r.attempts > 0); };

TK.U.forEach(u => { const li = TK.el('li'); li.innerHTML = `<a href="#${u.id}" data-id="${u.id}"><span class="no">${u.no}</span><span>${u.short}</span><span class="sc"></span></a>`; list.appendChild(li); });

TK.refreshNav = () => {
  let n = 0; const learn = TK.U.filter(u => u.id!=='baslangic' && u.id!=='final');
  list.querySelectorAll('a').forEach(a => { const u = TK.U.find(x => x.id===a.dataset.id), r = TK.state.quiz[u.quiz.id];
    a.classList.toggle('visited', !!TK.state.visited[u.id]); a.classList.toggle('passed', passed(u));
    a.querySelector('.sc').textContent = r ? '%'+r.best : (u.time||''); });
  learn.forEach(u => { if (passed(u)) n++; });
  $('#ovText').textContent = `Geçilen ünite: ${n} / ${learn.length}`; $('#ovBar').style.width = (100*n/learn.length)+'%';
};

function render(id){
  const i = Math.max(0, TK.U.findIndex(u => u.id===id)), u = TK.U[i];
  TK.loops.length = 0;
  TK.state.visited[u.id] = true; TK.save();
  list.querySelectorAll('a').forEach(a => { a.removeAttribute('aria-current'); if (a.dataset.id===u.id) a.setAttribute('aria-current','page'); });
  col.innerHTML = `<header class="u-head"><div class="eyebrow">Ünite ${u.no} / ${TK.U.length-1}</div><h1>${u.title}</h1><p class="lead">${u.lead}</p><div class="meta"><span class="pill">Süre ≈ ${u.time}</span>${u.quiz?`<span class="pill">${u.quiz.qs?u.quiz.qs.length:16} soruluk ${u.quiz.tag||'ara değerlendirme'}</span>`:''}</div></header>
    <div class="goals"><b>Bu ünitenin sonunda</b><ul>${u.goals.map(g=>`<li><span>${g}</span></li>`).join('')}</ul></div>
    ${u.sections.map((s,k) => `<section class="sec" id="${u.id}-${k}"><h2>${s.h}</h2>${s.html}</section>`).join('')}
    ${u.summary?`<section class="sec"><div class="recap"><b class="t">Akılda kalsın</b><ul>${u.summary.map(x=>`<li>${x}</li>`).join('')}</ul></div></section>`:''}
    ${u.quiz?'<section class="sec"><h2>'+(u.quiz.final?'Sorular':(u.quiz.tag||'Ara değerlendirme'))+'</h2><div id="quizBox"></div></section>':''}
    ${u.after?`<section class="sec"><h2>${u.after.h}</h2>${u.after.html}</section>`:''}
    <nav class="nextnav" aria-label="Ünite gezinmesi">${i>0?`<a class="btn" href="#${TK.U[i-1].id}">← ${TK.U[i-1].no}. ${TK.U[i-1].short}</a>`:'<span></span>'}${i<TK.U.length-1?`<a class="btn primary" href="#${TK.U[i+1].id}">${TK.U[i+1].no}. ${TK.U[i+1].short} →</a>`:''}</nav>`;
  col.querySelectorAll('[data-c]').forEach(el => TK.check(el, u.checks[el.dataset.c], u.id+'.'+el.dataset.c));
  const mountW = () => col.querySelectorAll('[data-w]').forEach(el => { const f = TK.W[el.dataset.w]; if (f){ el.removeAttribute('data-w'); try { f(el); } catch(e){ el.textContent = 'Bu araç yüklenemedi: '+e.message; console.error(e); } } });
  mountW();
  if (u.quiz){
    const qs = u.quiz.final ? TK.finalQs() : u.quiz.qs;
    TK.quiz($('#quizBox'), qs, { id:u.quiz.id, tag:u.quiz.tag, pass:passOf(u), passMsg:u.quiz.passMsg, regen: u.quiz.final ? TK.finalQs : null,
      onDone: () => { const kb = col.querySelector('.w .report'); if (kb){ const host = kb.parentElement; host.innerHTML=''; TK.W.karne(host); } } });
  }
  side.classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded','false');
  window.scrollTo(0,0);
}

const route = () => render((location.hash||'').replace('#','') || (TK.state.last || 'baslangic'));
window.addEventListener('hashchange', () => { const id = location.hash.replace('#',''); TK.state.last = id; TK.save(); route(); });
$('#menuBtn').addEventListener('click', () => { const o = side.classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded', String(o)); });
$('#resetAll').addEventListener('click', () => { $('#resetConfirm').hidden = false; });
$('#resetNo').addEventListener('click', () => { $('#resetConfirm').hidden = true; });
$('#resetYes').addEventListener('click', () => { TK.resetAll(); $('#resetConfirm').hidden = true; location.hash = '#baslangic'; route(); });
/* semboller ve sözlük */
const dlg = $('#ref'), body = $('#refBody');
const showSym = () => { $('#tabSym').classList.add('on'); $('#tabGl').classList.remove('on');
  body.innerHTML = `<p style="margin:0 0 8px;color:var(--muted);font-size:14px">Rehberde geçen her harf ve ne anlama geldiği. Birim, o büyüklüğün neyle ölçüldüğü.</p><table><thead><tr><th>Sembol</th><th>Anlamı</th><th>Birim / örnek</th></tr></thead><tbody>${TK.SYMS.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table>`; };
const showGl = () => { $('#tabGl').classList.add('on'); $('#tabSym').classList.remove('on');
  body.innerHTML = `<input id="refSearch" type="search" placeholder="Kelime ara… (ör. eşik)" aria-label="Sözlükte ara"><dl id="glList"></dl>`;
  const list = $('#glList'), inp = $('#refSearch');
  const draw = () => { const q = inp.value.trim().toLocaleLowerCase('tr'); list.innerHTML = TK.GLOSS.filter(g => !q || (g[0]+' '+g[1]).toLocaleLowerCase('tr').includes(q)).map(g=>`<div><dt>${g[0]}</dt><dd>${g[1]}</dd></div>`).join('') || '<div><dd>Bulunamadı.</dd></div>'; };
  inp.oninput = draw; draw(); inp.focus(); };
$('#refOpen').addEventListener('click', () => { showSym(); dlg.showModal(); });
$('#refClose').addEventListener('click', () => dlg.close());
$('#tabSym').addEventListener('click', showSym); $('#tabGl').addEventListener('click', showGl);
dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
TK.refreshNav(); route();
})();
