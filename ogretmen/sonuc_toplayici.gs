/**
 * Turing Kelebek · Sonuç toplayıcı (Google Apps Script)
 *
 * Çalışma rehberindeki ön test ve final sonuçlarını bu e-tabloya yazar.
 * Kurulum: ogretmen/KURULUM.md
 *
 * İki sayfa kullanır:
 *   "Sonuçlar" → her gönderim bir satır (hiçbir şey silinmez)
 *   "Özet"     → her öğrenci için ilk ön test, en iyi final ve gelişim (her gönderimde yeniden hesaplanır)
 */

// Rehberdeki rehber/js/config.js içindeki token ile AYNI olmalı.
const ANAHTAR = 'turing-kelebek-2204';

const SONUC = 'Sonuçlar';
const OZET = 'Özet';
const BASLIK = ['Zaman', 'Ad soyad', 'Sınıf / no', 'Sınav', 'Puan (%)', 'Doğru', 'Soru', 'Deneme', 'Tekrar edilmesi gereken konular', 'Cevaplar', 'Öğrencinin saati'];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.token !== ANAHTAR) return cevap({ ok: false, error: 'anahtar' });
    if (d.test !== 'Ön test' && d.test !== 'Final') return cevap({ ok: false, error: 'sinav' });

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sh = sayfa(ss, SONUC, BASLIK);
      sh.appendRow([
        new Date(),
        temiz(d.name, 60),
        temiz(d.cls, 20),
        d.test,
        sayi(d.pct, 0, 100),
        sayi(d.correct, 0, 100),
        sayi(d.total, 0, 100),
        sayi(d.attempt, 0, 1000),
        temiz(d.weak, 500),
        temiz(d.answers, 300),
        temiz(d.when, 40)
      ]);
      ozetiGuncelle(ss);
    } finally {
      lock.releaseLock();
    }
    return cevap({ ok: true });
  } catch (err) {
    return cevap({ ok: false, error: String(err).slice(0, 200) });
  }
}

// Tarayıcıda adresi açınca çalıştığını gösterir.
function doGet() {
  return cevap({ ok: true, mesaj: 'Turing Kelebek sonuç toplayıcı çalışıyor.' });
}

function ozetiGuncelle(ss) {
  const veri = ss.getSheetByName(SONUC).getDataRange().getValues().slice(1);
  const ogr = {};
  veri.forEach(r => {
    const ad = String(r[1]).trim(), sinif = String(r[2]).trim();
    if (!ad) return;
    const k = ad.toLocaleLowerCase('tr') + '|' + sinif.toLocaleLowerCase('tr');
    const o = ogr[k] || (ogr[k] = { ad, sinif, on: '', fin: '', finDeneme: 0, son: r[0], tekrar: '' });
    if (r[3] === 'Ön test' && o.on === '') o.on = r[4];               // ilk ön test
    if (r[3] === 'Final') {
      o.finDeneme++;
      if (o.fin === '' || r[4] > o.fin) { o.fin = r[4]; o.tekrar = r[8]; } // en iyi final
    }
    if (r[0] > o.son) o.son = r[0];
  });
  const satirlar = Object.values(ogr)
    .sort((a, b) => (a.sinif + a.ad).localeCompare(b.sinif + b.ad, 'tr'))
    .map(o => [o.sinif, o.ad, o.on, o.fin, (o.on !== '' && o.fin !== '') ? o.fin - o.on : '', o.finDeneme, o.tekrar, o.son]);
  const sh = sayfa(ss, OZET, ['Sınıf / no', 'Ad soyad', 'İlk ön test (%)', 'En iyi final (%)', 'Gelişim (puan)', 'Final denemesi', 'En iyi finalde tekrar edilmesi gereken konular', 'Son gönderim']);
  if (sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, 8).clearContent();
  if (satirlar.length) sh.getRange(2, 1, satirlar.length, 8).setValues(satirlar);
}

function sayfa(ss, ad, baslik) {
  let sh = ss.getSheetByName(ad);
  if (!sh) sh = ss.insertSheet(ad);
  if (sh.getLastRow() === 0) {
    sh.appendRow(baslik);
    sh.getRange(1, 1, 1, baslik.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

// Formül enjeksiyonunu önler ve uzunluğu sınırlar.
function temiz(v, n) {
  let s = String(v == null ? '' : v).slice(0, n);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function sayi(v, min, max) {
  const x = Number(v);
  return Number.isFinite(x) ? Math.min(max, Math.max(min, x)) : '';
}

function cevap(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
