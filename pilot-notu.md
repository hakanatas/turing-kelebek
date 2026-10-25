# Pilot Notu — Veri erişimi ve ölçüm aracı (16 Eylül 2026)

## Veri: iNaturalist Türkiye (research grade, fotoğraflı)
| Tür | Gözlem | Fotoğraf | Rakım medyan | >1000 m | >1500 m | Rakım aralığı | Ay yoğunluğu |
|---|---|---|---|---|---|---|---|
| Maniola jurtina | 390 | 508 | 108 m | 55 | 27 | 0–2144 m | May–Tem (300) |
| Aglais io | 105 | 152 | 467 m | 35 | 13 | 0–2788 m | Mar–Tem |

Lisans: M. jurtina fotoğraflarının %78'i CC (çoğu CC-BY-NC); lisanssız (%22) olanlar analizde kullanılmaz, raporda gösterilmez.
Rakım: Open-Elevation (SRTM) ile tüm kayıtlara eklendi. Betik: `inat_cek.py` → `veri/<tur>_kayitlar.csv`.

## Ölçüm aracı: `benek_olc.py`
Otomatik tespit (koyu dairesel leke + merkezde parlak pupil + çevrede sıcak tonlu kanat zemini) → radyal parlaklık/doygunluk profili → r_p (pupil), r_d (siyah disk), r_g (turuncu halka; M. jurtina'da güvenilir değil, turuncu alan halka değil geniş yama).
Teşhis görseli her fotoğraf için yazılır; öğrenciler görsel kontrolle onaylar/reddeder.

Pilot (40 rastgele CC fotoğraf, rakım katmanlarına göre): 32 tespit, 19 geçerli (%48). Geçersizlerin bir kısmı gerçek benek ama bulanık/çift pupilli; filtre eşikleri gevşetilebilir. Kaba tahmin: 390 gözlemden 150–200 ölçülebilir fotoğraf → H1 ve H2 için yeterli.

## İlk sayılar (piksel, n=19)
r_p/r_d = 0.219 ± 0.043 (CV 0.19). r_p = 1.38 + 0.10·r_d (r = 0.69). log-log eğim 0.63 ± 0.12.

## Kritik yöntem dersi
Piksel ölçeğinde r_d fotoğrafın yakınlığıyla değişir; bu yüzden "r_d − r_p sabit mi" sorusu **mm ölçeği olmadan sorulamaz** (fark px'de kaçınılmaz olarak r_d ile büyür). Ölçekten bağımsız tek nicelik r_p/r_d oranıdır, ama oran sabitliği tek başına gradyan ve orantılı modelleri ayırmaz.
Çözüm: her fotoğrafta ön kanat uzunluğu L (px) elle işaretlenir (`--L`), tür/cinsiyet ortalaması L_mm ile mm'ye çevrilir (M. jurtina ♂ ~22 mm, ♀ ~25 mm; literatürden doğrulanacak). Ölçek belirsizliği ~%10; H1 etkisi büyük olduğundan kabul edilebilir. Alternatif: sırt görünümlü fotoğraflarda kanat genişliği.

## Üç rakip öngörü (M. jurtina, pupil–disk çifti)
1. Gradyan-eşik (pupil da bir eşik halkası): r_d − r_p = sabit (mm).
2. Gradyan + pupil = kaynak hücreler (sabit boy): r_p = sabit (mm), r_d değişken.
3. Orantılı ölçekleme: r_p/r_d = sabit, r_p ∝ r_d.
A. io'da 3–4 halka olduğundan ayrım daha güçlü; ikinci pilot orada yapılmalı.

## Sonraki adımlar
- L işaretleme için basit tıklama aracı (matplotlib ginput / küçük web sayfası).
- Geçerlilik filtresini gevşetip görsel onay akışı eklemek.
- A. io pilotu (çok halkalı; r_g algoritması yeniden yazılacak: doygunluk yerine LAB b-kanalı).
- İki öğrenci ile ICC ön çalışması (30 fotoğraf).
