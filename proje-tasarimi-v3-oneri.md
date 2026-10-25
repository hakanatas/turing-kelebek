# Proje Tasarımı v3 — ÖNERİ: Matematiği öne çıkaran yeniden kurgu (7 Ekim 2026)

*Karar bekliyor. Mevcut v2 raporu geçerli kalır; aşağıdaki seçeneklerden biri seçilince rapor yeniden yapılandırılır.*

## Sorun
v2'nin matematiği "kapalı biçimli çözüm + ölçek değişmezliği + istatistiksel model karşılaştırması" düzeyinde. Saf matematikçi bir jüri için bu, *uygulanmış istatistik* gibi görünebilir: türetilen tek sonuç r_i = λ·ln(S/θ_i) ve veri analizi öne çıkıyor. Jürinin "burada matematik nerede?" sorusuna cevap verecek bir **kendi başına matematiksel sonuç** gerekiyor.

## Üç seçenek

### Seçenek A (önerilen) — İki odaklı modelin seviye eğrileri: kaynaşma, topoloji değişimi ve ölçekten bağımsız sınama
**Matematiksel çekirdek.** Kararlı durum denklemi D∇²m − γm + s = 0 **doğrusaldır**; iki odak için çözüm, iki tek-odak çözümünün toplamıdır (üst üste binme ilkesi; Monteiro vd. 2001'in "sinyaller toplanmalı" varsayımı bir teoremdir). Halka sınırları, m'nin **seviye eğrileridir**. İki odak (±a, 0) için:

1. **Kaynaşma teoremi.** θ-seviye eğrisi bağlıdır ⟺ θ < m(0,0) = 2S·e^(−a/λ) ⟺ **a < λ·ln(2S/θ) = r_θ + λ·ln 2**, burada r_θ tek odaklı halkanın yarıçapı. Kanıt: orta nokta m'nin bir **eyer noktasıdır** (eksen boyunca minimum, dik yönde maksimum); seviye eğrisinin topolojisi yalnız kritik değer geçilirken değişir (Morse lemması düzeyinde bir argüman). Eyer değeri geçildiğinde "8" biçimli tek eğri iki ovale ayrılır.
2. **Çift pupil penceresi.** Pupil halkaları ayrık, disk bağlı ⟺ r_p + λ ln2 < a < r_d + λ ln2. Pencerenin genişliği **r_d − r_p**'dir — tek benekteki halka farkı. Bu, *M. jurtina*'da sık görülen "çift pupilli" apikal beneğin modelden çıkan açıklamasıdır.
3. **Kapalı biçimli geometri.** Bel yarı-genişliği w ve eksen yarı-uzunluğu R için
   w² = (r_d + λ ln2)² − a²,  R = r_d + λ·ln(2 cosh(a/λ)).
   Fotoğraftan ölçülen **iki oran** (w/a, R/a) iki boyutsuz bilinmeyeni (a/λ, r_d/λ) tam olarak belirler → her çift pupilli bireyden **ölçek (mm) bilinmeden** λ/a ve r_d/λ kestirilir. Aşırı belirlilik (model sınaması) üçüncü bir ölçümle gelir: aynı benekteki pupil yarıçapı oranı (ℓ_p/ℓ_d tek pupilli bireylerden bağımsız bilinir), kestirilen r_d/λ'nın bireyler arası sabitliği ve tek pupilli ℓ_d ile örtüşmesi (karşılaştırma, girdi değil), ya da tam konturun iki parametreli eğriye uyumu. v2'deki "ölçek bilinmiyor" sorunu böylece aşılır. *(Düzeltme: ilk sürümde "tek bilinmeyen" yazılmıştı; Şekil 09c r_d/λ = 4.4 kesitidir.)*
4. **K₀ tam çözümü ile karşılaştırma.** Üstel yaklaşım yerine K₀(r/λ) toplamı alınınca eğriler sayısal olarak hesaplanır; iki öngörü ailesi Şekil 09(c)'de farklıdır → veri, yaklaşımla tam çözümü de ayırt edebilir.
5. **Seviye eğrisi ailesinin cebirsel akrabalığı.** Cassini ovalleri uzaklıkların *çarpımının*, buradaki eğriler uzaklıkların üstellerinin *toplamının* seviye kümeleridir; log alınınca "log-toplam-üstel" fonksiyonunun seviye kümeleri — dışbükeylik ve topoloji tartışması jüriye tanıdık gelir.

**Veri.** iNaturalist hattında şu anda "çift pupilli" diye elenen fotoğraflar bu seçenekte **ana veri** olur (pilot notu bunları kaydetmişti). *M. jurtina* dışında *Lasiommata megera* ve *Pararge aegeria* apikal benekleri de sık çift pupillidir. Ölçülecekler: a (pupil merkezleri arası yarı uzaklık), w (disk bel yarı-genişliği), R (disk yarı-uzunluğu), isteğe bağlı tüm disk konturu. Hedef n ≈ 40 çift pupilli birey.

**Sınanabilir öngörüler.** (i) (w/a, R/a)'dan kestirilen r_d/λ bireyler arasında sabit mi ve tek pupilli bireylerin ℓ_d ≈ 4.4'üyle örtüşüyor mu (bağımsız kestirim)? (ii) Pupil yarıçapı oranı, kestirilen (a/λ, r_d/λ) ile öngörülen değere uyuyor mu (aşırı belirlilik)? (iii) Tam kontur, iki parametreli (λ, r_d) seviye eğrisine ne kadar uyuyor (Monteiro 2001'in *Bicyclus* nakil deneyini doğal popülasyonda, ölçeksiz yineleme)? (iv) Çift pupil sıklığı, pencere genişliği r_d − r_p ile orantılı mı?

**Özgünlük.** Kaynaşma kriterinin kapalı biçimi, çift pupil penceresi ve ölçeksiz aşırı belirli test literatürde yok; Monteiro vd. (2001) yalnız kontur toplamını sayısal olarak sınadı. Lise düzeyinde türetilebilir (üstel, logaritma, iki değişkenli fonksiyonun kritik noktası), ama sonuç "gerçek" bir teorem.

**Rapor yapısı (taslak).** 1 Özet · 2 Amaç · 3 Giriş (kısa biyoloji, model) · 4 Matematik: 4.1 doğrusallık ve üst üste binme, 4.2 tek odak (v2 §4), 4.3 iki odak: eyer noktası ve kaynaşma teoremi, 4.4 çift pupil penceresi, 4.5 kapalı biçimli geometri ve ölçeksiz test, 4.6 K₀ ile karşılaştırma · 5 Yöntem (çift pupilli fotoğraf ölçümü + mevcut hat) · 6 Bulgular (v2 §6 kısaltılmış + yeni çift pupil analizi) · 7 Tartışma · 8 Sonuç.

### Seçenek B — Ölçek-değişmez istatistik ve nicemleme hatasının kuramı
v2'nin §4.4'ünü bir teoreme dönüştürmek: (r_p, r_d, s) üzerinde μ-ölçeklemesi altında değişmez istatistikler tam olarak sıfırıncı dereceden homojen fonksiyonlardır; yuvarlama hatası U(−h/2, h/2) ve ölçüm gürültüsü σ altında oranın beklenen değeri ve varyansı (delta yöntemi): CV² ≈ (σ² + h²/12)·(1/r_p² + 1/r_d²). Sayısal örnek: σ = 0.5 px, h = 0.5 px, r_p = 2.5, r_d = 12.5 → CV ≈ 0.21 — Monte Carlo'nun bulduğu değer, kapalı biçimle elde edilir; çözünürlük katmanlarına göre öngörülen CV gözlenenle karşılaştırılır. Artı: Monte Carlo yerine analitik güç. Eksi: istatistik ağırlıklı; saf matematikçi jüri için "olasılık ödevi" gibi görünebilir. **A ile birleştirilebilir** (A'nın ölçüm hatası bölümü olur).

### Seçenek C — Turing kararsızlığının doğrusal analizi (Gray–Scott / Gierer–Meinhardt)
Homojen çözüm etrafında doğrusallaştırma, dağılım bağıntısı, kararsızlık koşulları (Dh/Da eşiği), kritik dalga sayısı ve seçilen desen dalga boyunun kanat hücresi genişliğiyle ilişkisi; sayısal doğrulama (`kanat_turing.py`). Matematiği en "ders kitabı" olan seçenek: analiz, özdeğerler, Fourier. Eksi: Murray (2003) Böl. 2–3'te tamamen var; özgünlük yalnız kanat geometrisine uygulamada kalır. Jüriye matematik gösterir ama "yeni ne?" sorusuna cevap vermez.

## Öneri
**A, B'nin ölçüm hatası kısmıyla birlikte.** Mevcut tüm veri ve kod korunur; v2 §4 ve §6 kısaltılarak A'nın alt bölümü olur. Yeni iş: çift pupilli fotoğrafların işaretlenmesi (öğrenciler; ~40 fotoğraf, tıklama aracı), kontur çıkarma (danışman; mevcut `benek_olc.py` üzerine), teoremlerin tahtada anlatılabilir kanıtları (Ö1).

Şekil: `sekiller/09_cift_odak.png` (a: ayrım arttıkça topoloji değişimi; b: kaynaşma koşulu faz diyagramı; c: ölçeksiz oranlar).
