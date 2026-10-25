# Türkiye Kelebeklerinde Göz Beneği Geometrisi Turing Tipi Gradyan Modelinin Öngörülerini Doğruluyor mu?

**TÜBİTAK 2204-A Lise Öğrencileri Araştırma Projeleri Yarışması — Proje Planı ve Rapor Taslağı (v1)**
Alan: Matematik (Biyoloji ile disiplinler arası) · Hazırlanma: 17 Eylül 2026 · Durum: ön bulgular alınmış, ana veri toplama başlamamış

> **Düzeltme notu (7 Ekim 2026):** Bu belge 17 Eylül tarihli ilk sürümdür ve tarihsel kayıt olarak korunmaktadır. Güncel rapor **ARASTIRMA_RAPORU_v2.md**'dir. İki düzeltme: (1) A2'deki "modelin doğal popülasyonlarda sınandığı bir çalışma bilinmiyor" ifadesi daraltılmalıdır — Palmer, McKenna & Nijhout (2019, doi:10.1093/icb/icz123) *Junonia*'da desen–kanat izometrisini, Mowbray vd. (2024, doi:10.1002/ece3.10842) *M. jurtina*'da ön kanat beneğinin kanat boyuyla ölçeklendiğini göstermiştir; özgün kalan çekirdek halka geometrisi (pupil/disk oranı) ile λ–S–θ ayrımı, Türkiye popülasyonları ve rakım gradyanıdır. (2) Bölüm B §6.1'deki "sabit fark AIC +263 ile reddedildi" sonucu piksel ölçeğinin artefaktıdır (bkz. `monte_carlo.py`, v2 §6.3); geçerli test ölçekten bağımsız oran testidir.

---

# BÖLÜM A — PROJE PLANI

## A1. Projenin tek cümlelik tanımı

Kelebek göz beneklerinin halka geometrisini Türkiye'deki doğal popülasyonlarda ölçerek, Turing/Nijhout gradyan modelinin iki nicel öngörüsünü (halkaların birlikte ölçeklenmesi ve yayılım uzunluğunun iklimle değişmesi) ilk kez vatandaş bilimi verisiyle sınamak.

## A2. Neden özgün?

Reaksiyon-difüzyon modelleri kelebek desenlerini elli yıldır açıklıyor; ama modelin doğal popülasyonlarda, coğrafi gradyan boyunca, nicel öngörülerine karşı sınandığı bir çalışma bilinmiyor. Proje üç şeyi ilk kez bir araya getiriyor: (1) modelden türetilmiş, birbirini dışlayan üç öngörü; (2) iNaturalist Türkiye kayıtlarından (390 gözlem, 0–2144 m) üretilen ölçüm veri seti; (3) yarı-otomatik, tekrarlanabilir bir ölçüm hattı. Ön bulgu (n = 97), modelin en basit versiyonunun (yalnız kaynak gücü değişir) Çayır esmerinde geçerli olmadığını gösteriyor; bu tek başına raporlanmaya değer bir sonuç.

## A3. Ekip ve iş bölümü

Proje üç öğrenci ve bir danışmanla tasarlandı; iki öğrenciyle de yürür (Ö2 ve Ö3 birleşir).

| Rol | Kim | Sorumluluklar | Teslimatlar |
|---|---|---|---|
| **Ö1 — Matematik ve simülasyon** | Öğrenci 1 | Gradyan modelini türetmek ve anlatabilmek; `kanat_turing.py` ile öngörüleri üretmek; λ-değişimi / S-değişimi senaryolarında sentetik veri ve Monte Carlo; sonuçların model içinde yorumu | Şekil 1–2 (model öngörüleri), Monte Carlo tablosu, "Kuramsal çerçeve" ve "Tartışma" bölümleri |
| **Ö2 — Ölçüm ve veri kalitesi** | Öğrenci 2 | İşaretleme aracıyla kanat uzunluğu (2 nokta) ve cinsiyet etiketi; tespit doğrulaması (geçerli/geçersiz); ikinci ölçücüyle ICC çalışması; dahil etme ölçütlerinin uygulanması | Temiz veri tablosu (CSV), ICC raporu, ölçüm protokolü belgesi, "Yöntem – Ölçüm" bölümü |
| **Ö3 — Biyoloji ve saha** | Öğrenci 3 | Tür biyolojisi (M. jurtina, A. io), cinsiyet ayrım ölçütleri, fenoloji; arazi fotoğrafı (Büyükçekmece kıyı + yayla gezisi); iklim verisinin (MGM/WorldClim) kayıtlara eşlenmesi; etik/lisans | Arazi fotoğraf seti (makro, ölçek çubuklu), iklim tablosu, "Giriş – Biyolojik arka plan" ve "Etik" bölümleri |
| **Danışman** | Hakan Ataş | Kod altyapısı ve istatistik hattının bakımı; haftalık tasarım toplantısı; literatür erişimi; sonuçların jüri diline çevrilmesinde rehberlik; TÜBİTAK başvuru süreci | Kod deposu, istatistik betikleri, başvuru dosyası |
| **Yapay zekâ desteği (araç)** | — | Otomatik benek tespiti ve halka ölçümü, veri çekme, istatistik hesaplama, literatür tarama yardımı | Raporda "kullanılan araçlar" altında açıkça beyan edilir |

**İlke:** Öğrencilerin kendi elleriyle yapmadığı hiçbir ölçüm "bulgu" olarak sunulmaz; otomatik ölçümler öğrenci doğrulamasından geçmeden veri setine girmez. Her öğrenci kendi bölümünü jüriye kod ve denklem düzeyinde anlatabilmelidir.

## A4. Aşamalar ve takvim

TÜBİTAK 2204-A başvuru tarihi ilan edildiğinde takvim ona göre sıkıştırılır; aşağıdaki plan başvurunun Ocak ayında olduğu varsayımıyla yazıldı.

### Aşama 0 — Hazırlık (tamamlandı, Eylül 2026)
Literatür taraması, simülasyon kodu, iNaturalist veri çekimi (M. jurtina 390 / A. io 105 gözlem, rakım eklendi), otomatik ölçüm hattı, 97 bireylik ön analiz. Bu aşama danışman ve yapay zekâ aracıyla yapıldı; öğrenciler devralıyor.

### Aşama 1 — Devralma ve kuram (Eylül son haftası – Ekim 2. hafta, 3 hafta)
- Ö1: Turing 1952 ve Gierer-Meinhardt 1972'yi okur; `kanat_turing.py`'yi satır satır anlar; r_i = λ ln(S/θ_i) türetimini tahtada anlatır; üç öngörüyü (orantılı / sabit fark / sabit pupil) kendi cümleleriyle yazar.
- Ö2: `benek_olc.py` teşhis görsellerini inceler; 30 fotoğrafta manuel ölçümle otomatik ölçümü karşılaştırır (ilk ICC); dahil etme ölçütlerini netleştirir.
- Ö3: M. jurtina ve A. io biyolojisi, cinsiyet ayrımı (dişi: geniş turuncu alan, büyük benek), Türkiye dağılımı ve fenolojisi üzerine 2 sayfalık not; Kırmızı Kitap statüleri.
- Hep birlikte: hipotezleri ve "hangi sonuç ne anlama gelir" tablosunu kesinleştirmek (A6).
- Çıktı: Kuram notu, ölçüm protokolü v1, biyoloji notu.

### Aşama 2 — Ölçüm aracı ve ICC (Ekim 2.–4. hafta, 2 hafta)
- Danışman: tarayıcıda çalışan işaretleme sayfası (fotoğraf + otomatik benek → öğrenci kanat tabanı ve apeksi tıklar, cinsiyet ve geçerlilik seçer, CSV birikir).
- Ö2 + Ö3: aynı 30 fotoğrafı bağımsız işaretler; ICC hesaplanır (hedef > 0.8); uyuşmazlıklar tartışılıp protokol v2 yazılır.
- Ö1: `kanat_turing.py` ile sentetik göz benekleri üretir; bilinen λ ve S ile ölçüm hattını test eder (hat doğru λ'yı geri buluyor mu?).
- Çıktı: İşaretleme aracı, ICC raporu, protokol v2, hat doğrulama şekli.

### Aşama 3 — Ana veri toplama (Kasım, 4 hafta)
- Ö2: 154 geçerli M. jurtina fotoğrafının tamamında kanat uzunluğu + cinsiyet + geçerlilik; A. io için 105 gözlemde aynı işlem (halka sayısı 3–4).
- Ö3: iklim eşlemesi (her kayıt için rakım, aylık ortalama sıcaklık, enlem); arazi fotoğrafları (yaz sezonu kaçtıysa bu kalem "gelecek yıl" olarak raporlanır, veri seti iNaturalist ile sınırlı kalır).
- Ö1: Monte Carlo — ölçüm gürültüsü altında hangi test hangi modeli ne güçle ayırt eder (yanlış pozitif oranı).
- Çıktı: Temiz veri seti (hedef: M. jurtina ≥ 120, A. io ≥ 60 birey), Monte Carlo tablosu.

### Aşama 4 — Analiz (Aralık 1.–2. hafta)
- H1: r_p ~ r_d + L çoklu regresyon; üç kısıtlı modelin AIC karşılaştırması; ölçekten bağımsız oran testi; A. io'da halka oranlarının sabitliği (λ-değişimi vs S-değişimi ayrımı).
- H2: λ vekili ~ rakım + sıcaklık + cinsiyet + ay; katmanlı karşılaştırma.
- Duyarlılık: yalnız yüksek çözünürlüklü alt küme; yalnız tek cinsiyet.
- Çıktı: Şekil 3–6, istatistik tabloları.

### Aşama 5 — Rapor ve sunum (Aralık 3. hafta – Ocak)
- Rapor v2 (bu belgenin B bölümü doldurulur), poster, 8 dakikalık sunum, jüri sorularına hazırlık (her öğrenci kendi alanında 10 olası soru).
- Veri ve kodun açık paylaşımı (GitHub, CC-BY lisanslı fotoğraf listesi ile).

## A5. Haftalık ritim
Pazartesi 45 dk tasarım toplantısı (danışman + 3 öğrenci): geçen hafta ne ölçüldü, ne takıldı, bu hafta hedef. Her öğrenci ortak bir çalışma günlüğüne (paylaşılan belge) tarih–yapılan–karar yazar; jüri "süreç" sorduğunda bu günlük gösterilir.

## A6. Sonuç senaryoları ("ne çıkarsa çıksın")

| Bulgu | Model içi anlamı | Raporda nasıl sunulur |
|---|---|---|
| Halka farkı sabit (mm) | Bireysel değişkenlik kaynak gücünde (S) | Nijhout gradyan modeli doğal popülasyonda ilk kez doğrulandı |
| Halkalar orantılı ölçekleniyor (ön bulgu bu yönde) | Değişkenlik yayılım uzunluğunda (λ = √(D/γ)) | Model geçerli ama "hangi parametre değişiyor" sorusuna cevap: λ; H2 ile tutarlı çerçeve |
| Pupil sabit, disk değişken | Pupil = kaynak hücre grubu, boyutu gelişimsel olarak sabit | Modelin "pupil da bir eşik halkasıdır" varsayımı yanlış; kaynak hücre sayısı sabit |
| λ rakım/sıcaklıkla değişiyor | D ve γ sıcaklığa bağlı | İklim–desen bağı; iklim değişikliği izleme göstergesi önerisi |
| λ rakımla değişmiyor | Tamponlama (kanalizasyon) | Desenin gelişimsel olarak sıcaklığa karşı korunduğu bulgusu |

## A7. Riskler ve önlemler

| Risk | Olasılık | Önlem |
|---|---|---|
| Ölçek gürültüsü (kanat uzunluğu) | Yüksek → elle ölçümle düşer | İki ölçücü, ICC > 0.8; yalnız dik açılı fotoğraflar |
| Cinsiyet karışması | Yüksek | Ö3 ölçütleriyle etiket; analiz cinsiyete göre ayrı |
| Rakım–mevsim–enlem iç içeliği | Orta | Ay ve enlem kovaryat; katmanlı karşılaştırma |
| Pupil nicemleme (2–4 px) | Orta | r_d ≥ 12 px alt küme; A. io'da dış halkalar |
| Fotoğraf lisansı | Düşük | Yalnız CC lisanslı; gözlemci adı ve lisans listesi ekte |
| Arazi sezonu kaçırılması | Yüksek (Eylül'de başlandı) | Bu yıl iNaturalist ile sınırlı; arazi "gelecek çalışma" |
| Öğrenci sahipliği | Orta | Her bölümün tek sorumlusu; haftalık anlatım turu |

## A8. Etik ve lisans
Hiçbir kelebek yakalanmaz veya zarar görmez; yalnız fotoğraf. iNaturalist fotoğrafları yalnız CC lisanslı olanlarla sınırlı; her kullanılan fotoğraf gözlemci adı ve lisansıyla ekte listelenir; CC-BY-NC olanlar ticari olmayan yarışma kullanımına uygundur. Konum verileri 1 km'ye yuvarlanarak raporlanır (tehdit altındaki tür yok, yine de iyi uygulama). Yapay zekâ araçlarının kullanımı raporda beyan edilir.

## A9. Kaynak ve araç envanteri (mevcut)
`kanat_turing.py` (simülasyon), `inat_cek.py` (veri çekme), `benek_olc.py` (halka ölçümü), `silhuet_olcek.py` (silüet/ölçek vekili), `hat.py` (toplu hat), `analiz.py` (istatistik ve şekiller); `veri/maniola_jurtina_kayitlar.csv`, `veri/aglais_io_kayitlar.csv`, `veri/mj_olcum_tum.csv`, `veri/mj_analiz.csv`; teşhis görselleri. Yapılacak: işaretleme sayfası, A. io için çok halkalı ölçüm modülü, Monte Carlo betiği.

---

# BÖLÜM B — ARAŞTIRMA RAPORU (TASLAK v1)

*Köşeli parantez içindeki notlar doldurulacak yerleri gösterir.*

## 1. Özet

Kelebek kanatlarındaki göz benekleri, Turing'in reaksiyon-difüzyon mekanizmasının en iyi incelenmiş biyolojik örneklerindendir. Nijhout'un gradyan modelinde her benek, bir odak hücre grubundan yayılıp bozunan bir morfogenin eşik tepkisiyle renge çevrilmesinden doğar; halka yarıçapları r_i = λ ln(S/θ_i) ile verilir. Bu ilişki iki sınanabilir öngörü üretir: bireyler arasında yalnız kaynak gücü S değişiyorsa ardışık halkalar arasındaki mesafe sabittir; yayılım uzunluğu λ = √(D/γ) sıcaklığa bağlı olduğundan farklı iklimlerdeki popülasyonlarda halka ölçüleri farklıdır. Bu çalışmada iNaturalist'in Türkiye kayıtlarından (Maniola jurtina, 390 gözlem, 0–2144 m) yarı-otomatik bir görüntü işleme hattıyla pupil ve siyah disk yarıçapları ölçülmüş, üç rakip model (orantılı ölçekleme, sabit fark, sabit pupil) karşılaştırılmıştır. 97 bireylik ön analizde pupil yarıçapı disk yarıçapıyla orantılı bulunmuş (r_p ≈ 0.20·r_d; sabit-fark modeli AIC farkı > 350 ile reddedilmiş), bu da bireysel değişkenliğin kaynak gücünden değil yayılım uzunluğundan kaynaklandığını düşündürmüştür. Rakım etkisi ön analizde saptanmamıştır (p = 0.18). [Ana veri setiyle güncellenecek: n, cinsiyet ayrımı, A. io sonuçları, ICC.] Çalışma, matematiksel bir gelişim modelinin öngörülerinin vatandaş bilimi verisiyle sınanabileceğini göstermekte ve iklim–desen ilişkisi için ölçülebilir bir gösterge önermektedir.

**Anahtar kelimeler:** Turing deseni, reaksiyon-difüzyon, morfogen gradyanı, göz beneği, Maniola jurtina, vatandaş bilimi, iNaturalist

## 2. Amaç

Turing/Nijhout gradyan modelinin göz beneği geometrisi için ürettiği nicel öngörüleri Türkiye'deki doğal kelebek popülasyonlarında sınamak ve göz beneği boyutundaki bireysel/coğrafi değişkenliğin modelin hangi parametresinden (S, λ, θ) kaynaklandığını belirlemek.

**Araştırma soruları**
1. Aynı türde bireyler arasında göz beneği halkaları birlikte mi ölçekleniyor, yoksa halka aralıkları sabit mi kalıyor? (Model parametrelerinden hangisi değişiyor?)
2. Yayılım uzunluğu λ'nın vekili olan halka ölçüleri rakım ve sıcaklıkla değişiyor mu?
3. Vatandaş bilimi fotoğraflarından, bu soruları cevaplayacak güvenilirlikte ölçüm alınabilir mi?

## 3. Giriş

### 3.1 Kimyasal morfogenez
Turing (1952), birbiriyle tepkimeye giren ve farklı hızlarda yayılan iki maddenin homojen bir dokuda kendiliğinden periyodik desen üretebileceğini gösterdi. Gierer ve Meinhardt (1972) bunu "yavaş yayılan, kendini güçlendiren aktivatör + hızlı yayılan, aktivatörün ürettiği inhibitör" biçiminde biyolojik dile çevirdi. [Ö1: denklemler ve 1–2 paragraf sezgi.]

### 3.2 Kelebek göz benekleri ve gradyan modeli
Nijhout (1978, 1980) göz beneğinin bir odaktan yayılan morfogenle belirlendiğini önerdi ve odak nakli deneyleriyle destekledi; Monteiro vd. (2001) kaynaşmış beneklerde gradyan toplamını nicel olarak doğruladı; Dilão ve Sainhas (2004) iki morfogenli RD modeliyle mevsimsel plastisiteyi üretti. Connahs vd. (2019) Distal-less CRISPR mutantlarını Gray-Scott tipi RD modeliyle açıkladı; Hanly vd. (2023) WntA/frizzled2 morfogen-reseptör eksenini gösterdi. [Ö1/Ö3: mevcut literatür raporundan özetlenecek; DOI listesi kaynakçada.]

### 3.3 Türkiye faunası ve çalışılan türler
Türkiye'de yaklaşık 380 gündüz kelebeği türü, ~45'i endemik (Baytaş 2018; Karaçetin & Welch 2011). Maniola jurtina (Çayır esmeri): ön kanat alt yüzünde tek, beyaz pupilli siyah benek; belirgin cinsiyet dimorfizmi; 0–2000 m. Aglais io (Tavus kelebeği): dört büyük, çok halkalı benek. [Ö3: biyoloji notu.]

### 3.4 Bilgi boşluğu
Gradyan modelinin öngörüleri laboratuvar türlerinde (Bicyclus, Junonia) sınandı; doğal popülasyonlarda, coğrafi gradyan boyunca ve Türkiye türlerinde sınanmadı. Vatandaş bilimi arşivleri bunu ilk kez mümkün kılıyor.

## 4. Kuramsal çerçeve ve hipotezler

Kararlı durumda odaktan r uzaklıkta morfogen m(r) ≈ S·e^(−r/λ), λ = √(D/γ). Hücre m > θ_i ise i. pigmenti seçer; halka yarıçapı r_i = λ ln(S/θ_i). Buradan:

- Yalnız S değişirse: r_{i+1} − r_i = λ ln(θ_i/θ_{i+1}) sabit → **sabit fark modeli**.
- Yalnız λ değişirse: tüm r_i aynı çarpanla büyür → **orantılı ölçekleme**; r_p/r_d sabit.
- Pupil kaynak hücrelerinin kendisiyse boyutu gelişimsel olarak sabit → **sabit pupil modeli**; r_p bireyden bağımsız, r_d değişken.

**H1:** Üç modelden hangisi veriyle uyumlu? Test: r_p ~ r_d + L (L: kanat uzunluğu, ölçek) çoklu regresyonu; kısıtlı modellerin AIC'si; ölçekten bağımsız oran testi (r_p/r_d ile r_d/L ilişkisi: orantılı → 0, sabit pupil → negatif, sabit fark → pozitif).
**H2:** λ vekili (halka ölçüsü / L) rakım ve aylık sıcaklıkla ilişkili mi? Test: çoklu regresyon (rakım, sıcaklık, cinsiyet, ay, enlem).

[Ö1: Şekil 1 — `kanat_turing.py` ile üç senaryonun sentetik benekleri; Şekil 2 — radyal profil ve eşikler.]

## 5. Yöntem

### 5.1 Veri kaynağı
iNaturalist API, "research grade", Türkiye (place_id 7183), fotoğraflı gözlemler; M. jurtina 390 gözlem/508 fotoğraf, A. io 105/152. Rakım: SRTM (Open-Elevation). Yalnız CC lisanslı fotoğraflar (%78). [Ö3: iklim eşlemesi — MGM/WorldClim.]

### 5.2 Otomatik benek ölçümü
Koyu, dairesel, merkezde parlak pupil içeren ve çevresi sıcak tonlu kanat zemini olan lekeler aday; skorlama ile en iyi aday seçilir. Merkezden 0.5 px adımla 180 açı üzerinde parlaklık (L*) ve doygunluk profili; pupil sınırı = ilk keskin düşüşün yarı-yükseklik noktası, disk sınırı = sonraki keskin yükselişin yarı-yükseklik noktası. Geçerlilik ölçütleri: pupil var, disk parlaklığı < 70, r_d ≥ 6 px, pupil–disk kontrastı > 90. Her fotoğraf için teşhis görseli üretilir ve öğrenci doğrulamasından geçer.

### 5.3 Ölçek ve cinsiyet (elle)
[Ö2: işaretleme aracıyla kanat tabanı–apeks (L, px); iki bağımsız ölçücü, 30 fotoğrafta ICC; dahil etme: dorsal/ventral dik açı, elipslik < 1.15, benek bütün.] Ön analizde ölçek vekili olarak benek merkezinden en yakın kanat kenarına uzaklık (GrabCut silüeti) kullanıldı; tekrarlanabilirliği düşük bulundu (ICC 0.30), bu yüzden ana analizde elle ölçüm zorunludur. Cinsiyet: [Ö3 ölçütleri]; ön analizde vekil olarak silüet içindeki turuncu alan oranı.

### 5.4 İstatistik
Birey başına tek fotoğraf. H1: OLS r_p ~ r_d + L; üç kısıtlı model (r_p = βr_d; r_d − r_p = κL; r_p = κ'L) aynı bağımlı değişken üzerinden AIC; Spearman oran testi. H2: OLS λ-vekili ~ rakım + sıcaklık + cinsiyet + ay + enlem. Monte Carlo: sentetik benekler + ölçüm gürültüsü ile testlerin gücü. [Ö1.]

### 5.5 Araçlar ve beyan
Python (NumPy, OpenCV, SciPy, statsmodels, matplotlib). Otomatik ölçüm hattı ve veri çekme betikleri danışman gözetiminde yapay zekâ destekli geliştirildi; tüm kod açık paylaşılır; ölçümlerin doğrulanması ve ölçek/cinsiyet etiketleri öğrenciler tarafından elle yapılmıştır.

## 6. Bulgular

### 6.1 Ön analiz (otomatik hat, n = 97) — *ana veriyle güncellenecek*
395 fotoğraf → 249 tespit → 154 geçerli benek → geometri filtresi ve birey tekilleştirme → 97 birey.
- r_p = 0.40 + 0.151·r_d + 0.005·s (r_d: p < 0.001; s: p = 0.12).
- Kısıtlı modeller: orantılı β = 0.196, AIC −105; sabit fark AIC +263; sabit pupil AIC −7.5.
- Oran testi: ρ(r_p/r_d, r_d/s) = −0.14, p = 0.17 (sabit-fark modelinin öngördüğü pozitif ilişki yok).
- r_p/r_d = 0.20 ± 0.04 (CV 0.19); r_d/s CV 0.33.
- H2: r_d/s ~ rakım +0.018/1000 m, p = 0.18; cinsiyet vekili ve ay anlamsız; R² = 0.04.
[Şekil 3: üç model uyumu; Şekil 4: oran testi; Şekil 5: rakım.]

### 6.2 Ölçüm güvenilirliği — *doldurulacak*
[ICC (elle L), otomatik–manuel karşılaştırma, hat doğrulama (sentetik λ geri bulma).]

### 6.3 Ana analiz (M. jurtina, elle ölçekli) — *doldurulacak*
### 6.4 Aglais io çok halkalı analiz — *doldurulacak*
### 6.5 İklim ilişkisi — *doldurulacak*

## 7. Tartışma

Ön bulgu, Nijhout modelinin "yalnız kaynak gücü değişir" biçimini reddediyor ve halkaların birlikte ölçeklendiğini gösteriyor. Modelin içinden bunun en yalın açıklaması, bireyler arası değişkenliğin λ = √(D/γ) üzerinden gelmesidir; yani morfogenin ne kadar uzağa gidebildiği, ne kadar salgılandığından daha değişken. Bu yorum, Monteiro vd. (1997)'in halka oranlarının genetik olarak seçilebildiği bulgusuyla çelişmez (eşik değişimi oranı dağıtır; CV 0.19 bunun payı olabilir) ve λ'nın sıcaklığa duyarlı olması gerektiği için H2'yi anlamlı kılar. Ölçek gürültüsü regresyonu orantılı model lehine yapay olarak itebilir; orantılı ile sabit-pupil arasındaki ayrım ancak elle ölçekle yapılabilir. [Ana veri sonrası: modeller arası karar, cinsiyet etkisi, rakım/sıcaklık sonucu, A. io ile λ/S ayrımı.] Sınırlılıklar: piksel nicemleme, vatandaş fotoğraflarının açı/odak değişkenliği, rakım–mevsim iç içeliği, sabit kanat alanı varsayımı.

## 8. Sonuç ve öneriler
[Ana veri sonrası yazılacak.] Öneriler: arazi makro fotoğraflarıyla yüksek çözünürlüklü alt küme; çok türlü karşılaştırma (Lasiommata, Polyommatus); ters problemle tür başına parametre parmak izi ve filogeniyle karşılaştırma; sol–sağ asimetriyle gelişimsel gürültü.

## 9. Kaynakça (seçme; tam liste literatür raporunda)
Turing 1952; Gierer & Meinhardt 1972; Nijhout 1978, 1980, 1990, 1991; Monteiro, Brakefield & French 1997; Monteiro vd. 2001 (doi:10.1023/a:1010226223287); Dilão & Sainhas 2004 (doi:10.1098/rspb.2004.2761); Otaki 2011 (doi:10.2108/zsj.28.817); Sekimura vd. 2015 (doi:10.1371/journal.pone.0141434); Connahs vd. 2019 (doi:10.1242/dev.169367); Liao vd. 2021 (doi:10.1016/j.jtbi.2021.110898); Otaki 2021 (doi:10.3390/insects12010039); Mazo-Vargas vd. 2017 (doi:10.1073/pnas.1708149114); Hanly vd. 2023 (doi:10.1242/dev.201868); Baytaş 2018; Karaçetin & Welch 2011; iNaturalist (inaturalist.org), Open-Elevation.

## Ekler (planlanan)
A. Kullanılan fotoğrafların gözlemci–lisans listesi · B. Ölçüm protokolü v2 · C. Kod ve veri deposu bağlantısı · D. Çalışma günlüğü · E. Monte Carlo ayrıntıları
