/* Yönlendirme ve ünite çizimi */
(function(){
const $ = s => document.querySelector(s);
const list = $('#unitList'), col = $('#col'), side = $('#side');
const passOf = u => u.quiz ? (u.quiz.pass ?? 70) : 70;
const passed = u => { const r = TK.state.quiz[u.quiz.id]; return !!r && r.best >= passOf(u) && (u.quiz.pass !== 0 || r.attempts > 0); };

TK.U.forEach(u => { const li = TK.el('li'); li.innerHTML = `<a href="#${u.id}" data-id="${u.id}"><span class="no">${u.no}</span><span>${u.short}</span><span class="sc"></span></a>`; list.appendChild(li); });

TK.refreshNav = () => {
  let n = 0; const learn = TK.U.filter(u => u.no>=1 && u.no<=9);
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
TK.refreshNav(); route();
})();
