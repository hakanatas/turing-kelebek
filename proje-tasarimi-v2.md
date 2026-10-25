# Proje Tasarımı v2 — Özgün araştırma sorusu (karar: 16 Eylül 2026)

## Karar
İlk rapor (arastirma-raporu-turing-kelebek.md) bir yeniden üretim çalışmasıydı. Seçilen özgün yön: **Seçenek 1 + 2 birleşik**.

**Başlık (taslak):** Türkiye kelebeklerinde göz beneği geometrisi Turing tipi gradyan modelinin nicel öngörülerini doğruluyor mu?

## Kuramsal çekirdek
Odak-gradyan-eşik modeli: m(r) ≈ S·e^(−r/λ), λ = √(D/γ); halka yarıçapı r_i = λ·ln(S/θ_i).
Öngörü A: r_{i+1} − r_i = λ·ln(θ_i/θ_{i+1}) → S'den bağımsız; halka kalınlığı benek boyutuyla değişmemeli.
Öngörü B: λ sıcaklığa bağlı hız sabitlerinden oluşur → popülasyonlar arası (rakım/iklim) farklılık.

## Hipotezler
- H1 (ölçekleme): altın halka kalınlığı w ile siyah disk yarıçapı r_d regresyon eğimi ≈ 0 (gradyan modeli) vs. w ∝ r_d (ölçekleme modeli; log-log eğim ≈ 1). Ölçekten bağımsız (w/r_d oranı).
- H2 (coğrafya): halka aralığı (λ ölçüsü, mm) ↔ rakım / aylık ortalama sıcaklık korelasyonu. Yön önceden sabitlenmez; Brakefield (sıcak → büyük benek) referans.

## Türler
- Ana: Maniola jurtina (Çayır esmeri) — tek büyük pupilli benek, 0–2000 m, iNaturalist'te bol kayıt.
- İkinci: Aglais io (Tavus kelebeği) — çok halkalı, H1 için güçlü.
- Yedek: Lasiommata megera.

## Protokol
- Kaynak: iNaturalist research-grade TR kayıtları (API, koordinat+tarih+CC), kelebekler.org (izinle), öğrenci arazi fotoğrafları (Büyükçekmece kıyı + yayla gezisi: Uludağ/Kazdağı).
- Dahil etme: dorsal, dik açı (elipslik < 1.15), benek bütün, aşınma yok.
- Ölçümler: r_p (pupil), r_d (siyah disk), r_g (altın halka dış), L (ön kanat uzunluğu, ölçek).
- Yöntem: benek merkezi + radyal yoğunluk profili + renk geçiş eşikleri (Python/OpenCV veya ImageJ). İki bağımsız ölçücü, 30 fotoğraf, ICC > 0.9.
- İklim: MGM istasyon ortalaması veya WorldClim rakım–sıcaklık katmanı.

## Örneklem
- H1: tür başına ≥ 40 (hedef 60).
- H2: r ≈ 0.3, α = 0.05, güç 0.8 → ≈ 85; rakım yayılımı ≥ 1500 m.
- Hedef: M. jurtina 100, A. io 60; %40–50 eleme payı.

## Simülasyonun rolü (kanat_turing.py)
1) Öngörüleri üretmek (Şekil 4). 2) Ters çözücü: ölçülen halka oranlarından birey başına λ ve S. 3) Monte Carlo: ölçüm gürültüsünün H1 eğimine etkisi (yanlış pozitif kontrolü).

## Olası sonuçlar
- Eğim 0: gradyan modeli doğal popülasyonda doğrulandı.
- Orantılı: Nijhout modeli yetersiz → Otaki indüksiyon modeli / büyüyen alan.
- H2 korelasyon var: iklim–desen bağı; yok: λ tamponlanmış.

## Sonraki adım
iNaturalist'ten M. jurtina TR kayıtlarını çekip ölçülebilir fotoğraf sayısını belirleyen betik + radyal profil ölçüm aracı.

## Saklanan alternatifler
- Ters problem + filogeni (parametre parmak izi) → ileri çalışma / gelecek yıl.
- Sol–sağ asimetri (kent/kır) → ek analiz olarak eklenebilir.
- Sekimura 2015 tek-odak seçimi simülasyonu → tamamlanacak.
