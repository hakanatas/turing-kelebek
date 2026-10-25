# Ön Bulgular — Maniola jurtina, iNaturalist Türkiye (17 Eylül 2026)

> **Düzeltme notu (7 Ekim 2026):** Aşağıdaki "Üç rakip model, piksel ölçeğinde" tablosundaki AIC karşılaştırması Monte Carlo benzetimiyle (`monte_carlo.py`) geçersiz bulunmuştur: piksel ölçeğinde r_p ve r_d fotoğraf yakınlaştırmasıyla birlikte büyüdüğünden orantılı model, gerçek mekanizma ne olursa olsun kazanır. Geçerli olan yalnız "Zoom'dan bağımsız test" bölümüdür; yorum için ARASTIRMA_RAPORU_v2.md §6.3–6.4'e bakınız.

## Hat
395 CC lisanslı fotoğraf → 249 otomatik benek tespiti → 154 geçerli benek → silüet ölçeği + geometri filtresi (s/r_d ∈ 1.5–9) → birey başına tek fotoğraf → **n = 97 birey**. Süre ~1 saat. Betikler: `inat_cek.py`, `benek_olc.py`, `silhuet_olcek.py`, `hat.py`, `analiz.py`.

Ölçek vekili s = benek merkezinden en yakın kanat kenarına uzaklık (GrabCut silüeti, distance transform). Tekrarlanabilirlik zayıf: aynı bireyin farklı fotoğraflarında ICC(r_d/s) = 0.30, birey-içi CV %22. r_p/r_d oranı daha kararlı (ICC 0.41, CV %17).

## Üç rakip model, piksel ölçeğinde (r_p ~ r_d + s)
| Model | Öngörü | Uyum |
|---|---|---|
| Orantılı ölçekleme | r_p = β·r_d | β = 0.196; AIC −105 (en iyi) |
| Sabit fark (gradyan, yalnız S değişir) | r_d − r_p = κ·s | AIC +263 (açıkça reddedilir) |
| Sabit pupil (pupil = kaynak hücreler) | r_p = κ'·s | AIC −7.5 |

Tam regresyon: r_p = 0.40 + 0.151·r_d + 0.005·s; r_d p < 0.001, s p = 0.12.
**Uyarı:** s gürültülü olduğu için katsayısı sıfıra doğru çekilir (attenuation); bu, orantılı modeli yapay olarak kayırabilir.

## Zoom'dan bağımsız test
r_p/r_d ile r_d/s arasında Spearman ρ = −0.14 (p = 0.17). Beklenti: orantılı → 0; sabit pupil → negatif; sabit fark → pozitif. Pozitif ilişki yok → sabit-fark öngörüsü bu veride desteklenmiyor. r_p ≥ 3 px alt kümesinde ρ = −0.40 (p = 0.005) ama bu seçim yanlılığı taşıyor (r_p'ye göre seçmek oranı küçük r_d'de yukarı iter), güvenilmez.

## Yorum (modelin içinden)
r_i = λ·ln(S/θ_i). Yalnız S değişseydi halka farkı sabit kalırdı — kalmıyor. Bütün halkalar birlikte ölçekleniyorsa bireyler arası değişkenlik **λ = √(D/γ)** üzerinden geliyor demektir (λ tüm r_i'leri çarpımsal büyütür). Yani ön bulgu: *M. jurtina doğal popülasyonlarında göz beneği boyutu farkı kaynak gücünden değil yayılım uzunluğundan kaynaklanıyor olabilir.* Bu, "λ sıcaklığa bağlı" olan H2 ile de tutarlı bir çerçeve. Ayrıca Monteiro vd. 1997'nin eşiklerin genetik olarak değişebildiği bulgusuyla çelişmez; eşik değişimi oranı dağıtır, burada oranın CV'si %19.

## H2 ön bakış
r_d/s ~ rakım: +0.018 / 1000 m, p = 0.18 (n = 97). Cinsiyet vekili (turuncu oran) ve ay eklenince R² = 0.04. Etki varsa küçük; bu ölçek gürültüsüyle saptanamaz. Katmanlara göre ortalama r_d/s: 0–200 m 0.24, 200–800 m 0.28, 800–1500 m 0.23, 1500+ m 0.29.

## Bu bulgular neyi gösteriyor, neyi göstermiyor
Gösteriyor: hat çalışıyor, yüz bireylik veri bir saatte üretilebiliyor, sabit-fark öngörüsü ilk bakışta çürüyor, sorunun cevabı önemli (λ mı S mi).
Göstermiyor: orantılı ile sabit-pupil ayrımı (ölçek gürültüsü), rakım etkisi (güç düşük), cinsiyet etkisi (vekil kaba). Pupil 2–4 px ile ölçülüyor; nicemleme hatası büyük.

## Öğrenciler için sonraki adımlar (sırayla)
1. Elle ölçek: 100 fotoğrafta ön kanat uzunluğu / kosta uzunluğu işaretleme; s ile karşılaştırıp ICC > 0.8 hedefi.
2. Cinsiyet etiketi: görsel (dişi geniş turuncu alan); vekil yerine.
3. Yüksek çözünürlük alt kümesi: r_d ≥ 15 px olan fotoğraflarla pupil nicemleme hatasını azaltmak; kendi arazi fotoğrafları (makro) bu boşluğu doldurur.
4. A. io: üç halka ile λ/S ayrımı doğrudan test edilebilir (tüm halka oranları sabitse λ; dış halkalar kayıp/sabit kalıyorsa S).
5. Monte Carlo: kanat_turing.py ile λ-değişimi ve S-değişimi senaryolarında sentetik veri üretip ölçüm gürültüsü altında hangi testin ayırt edici olduğunu göstermek.
