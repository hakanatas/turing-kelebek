# Turing Kelebek — proje paketi (7 Ekim 2026)

## Öğrenci sayfaları
- [Çalışma rehberi (11 bölüm, ara değerlendirmeler, final ve karne)](https://hakanatas.github.io/turing-kelebek/rehber/)
- [Göz beneği atölyesi (8 adımlı canlandırmalı anlatım)](https://hakanatas.github.io/turing-kelebek/goz_benegi_atolyesi.html)

## Belgeler
- **ARASTIRMA_RAPORU_v3.md / .pdf — GÜNCEL rapor: iki odaklı seviye eğrileri (kaynaşma teoremi, çift pupil penceresi, ölçeksiz test), varyans ayrışımı, sentetik doğrulama**
- proje-tasarimi-v3-oneri.md — v3 yön kararı ve gerekçesi
- ARASTIRMA_RAPORU_v2.md / .pdf — önceki sürüm (tek benek analizi; v3'te özetlenmiştir)
- PROJE_PLANI_ve_RAPOR_v1.md — iş bölümü, aşamalar, takvim, risk tablosu + rapor taslağı (ilk sürüm; başındaki düzeltme notuna bakınız)
- ARASTIRMA_RAPORU.md — literatür raporu (ilk sürüm, kaynakça DOI'li)
- proje-tasarimi-v2.md — özgün araştırma sorusu kararı ve protokol
- pilot-notu.md, on-bulgular-mj.md — pilot ve 97 bireylik ön bulgular

## Kod (Python 3; numpy, scipy, opencv-python, matplotlib, pandas, statsmodels, requests)
- kanat_turing.py — reaksiyon-difüzyon simülasyonları (Gray-Scott, Gierer-Meinhardt, göz beneği) → cikti/
- inat_cek.py — iNaturalist Türkiye kayıtlarını çeker, rakım ekler → veri/*_kayitlar.csv
- benek_olc.py — göz beneği halka ölçümü (radyal profil)
- silhuet_olcek.py — GrabCut silüet, ölçek vekili, cinsiyet vekili
- hat.py — toplu ölçüm hattı → veri/mj_olcum_tum.csv + teşhis görselleri
- analiz.py — üç model karşılaştırması, rakım regresyonu → veri/_bulgu_mj.png
- sekil_cift_odak.py — iki odaklı seviye eğrileri (Şekil 2) → sekiller/09_cift_odak.png
- sentetik_cift_odak.py — PDE ile kaynaşma teoremi ve ters çözüm sınaması (Şekil 3) → veri/sentetik_cift_odak.csv, sekiller/10_*.png
- sekil_oran.py — oran varyans ayrışımı (Şekil 5) → sekiller/07_*.png, veri/oran_varyans_uyum.csv
- sekil_gradyan.py — gradyan modelinin matematiği (Şekil 1) → sekiller/08_gradyan_matematigi.png
- rapor_pdf.py — ARASTIRMA_RAPORU_v2.md → ARASTIRMA_RAPORU_v2.pdf (markdown + weasyprint)
- monte_carlo.py — üç senaryo × ölçüm gürültüsü güç analizi → veri/monte_carlo_*.csv, sekiller/06_monte_carlo.png

## Veri
- veri/maniola_jurtina_kayitlar.csv, veri/aglais_io_kayitlar.csv — gözlem meta verisi (koordinat, tarih, rakım, lisans, foto URL)
- veri/mj_olcum_tum.csv — 395 fotoğrafın ölçüm çıktısı; veri/mj_analiz.csv — 97 bireylik analiz tablosu
- veri/teshis_ornek/ — gözle kontrol için kontakt sayfaları
- veri/ek_a_lisans_listesi.csv — analize giren 97 bireyin gözlemci–lisans listesi (Rapor Ek A)
- veri/monte_carlo_sonuc.csv, monte_carlo_duyarlilik.csv, monte_carlo_ham.csv — güç analizi çıktıları
- Fotoğraflar pakete dahil değil (177 MB); `python inat_cek.py` sonrası hat.py içindeki indirme adımıyla yeniden alınır. Yalnız CC lisanslı fotoğraflar kullanılır.

## Çalıştırma sırası
python kanat_turing.py → python inat_cek.py → (fotoğraf indir) → python hat.py → python analiz.py → python monte_carlo.py → python sekil_gradyan.py → python sekil_cift_odak.py → python sentetik_cift_odak.py → python sekil_oran.py → python rapor_pdf.py ARASTIRMA_RAPORU_v3.md ARASTIRMA_RAPORU_v3.pdf
