# Kelebek kanadına göz nasıl çizilir?

**TÜBİTAK 2204-A lise araştırma projesi · Matematik × Biyoloji**

Kanatta fırça yok; peki hücreler kelebek kanadındaki halkalı benekleri nasıl "çiziyor"? Bu projede bunun matematiğini kuruyor ve Türkiye'de çekilmiş Çayır esmeri (*Maniola jurtina*) fotoğraflarıyla sınıyoruz.

1. Beneğin ortasındaki hücreler bir **sinyal** salgılar.
2. Sinyal suya damlayan mürekkep gibi **yayılır** ve yavaş yavaş **söner**.
3. Her hücre ona ulaşan sinyale bakar: çok güçlüyse **beyaz**, ortaysa **siyah**, zayıfsa **turuncu** olur.

### 👉 [Proje sitesini aç](https://hakanatas.github.io/turing-kelebek/)

![Göz beneği modeli: tek odak, iki odak, küçük menzil ve sinyalin uzaklıkla azalması](sekiller/04_goz_benegi.png)

## Nereden başlamalıyım?

Bu sırayla ilerlemeni öneriyoruz:

| Adım | Ne? | Süre |
|---|---|---|
| 1 | **[Göz beneği atölyesi](https://hakanatas.github.io/turing-kelebek/goz_benegi_atolyesi.html)**: bütün fikri 8 kısa adımda, canlandırmalarla gör. Ön bilgi gerekmez. | 15 dakika |
| 2 | **[Çalışma rehberi](https://hakanatas.github.io/turing-kelebek/rehber/)**: projeyi baştan sona öğren. Çözülmüş örnekler, kısa sınavlar, sözlük ve karne. | 4–5 hafta |
| 3 | **[Araştırma raporu (PDF)](ARASTIRMA_RAPORU_v3.pdf)**: projenin bilimsel metni. Rehberden sonra oku. | ileri düzey |

## Şimdiye kadar ne bulduk?

97 kelebeğin fotoğrafına bakınca bir ipucu çıktı: beneğin **ne kadar büyük** olacağını sinyalin ne kadar uzağa ulaştığı belirliyor gibi; beyaz noktanın siyah diske **oranını** ise hücrelerin renk seçme sınırları. Bu henüz bir ön bulgu. Asıl sınav, içinde iki beyaz nokta olan "çift pupilli" benekleri ölçmek; o iş öğrencileri bekliyor.

## Sayılarla proje

- **390** kelebek gözlemi, Türkiye'nin her yerinden (iNaturalist)
- **0–2144 m**: deniz kıyısından dağlara
- **97** kelebek şimdiye kadar ölçüldü
- **0** kelebek yakalandı: yalnızca sahibinin izin verdiği fotoğraflar kullanıldı

## Ekip

| Rol | Ne yapar? |
|---|---|
| Ö1 · Matematik | Formülleri anlar, tahtada anlatır, bilgisayar deneylerini yorumlar. |
| Ö2 · Ölçüm | Fotoğraflarda kanat uzunluğunu ve cinsiyeti işaretler, ölçümlerin güvenilir olduğunu kontrol eder. |
| Ö3 · Biyoloji | Kelebeklerin yaşamını, iklim bilgisini ve fotoğraf izinlerini araştırır. |
| Danışman · Hakan Ataş | Kodları hazırlar, haftalık toplantıları yönetir, yarışma sürecini takip eder. |

---

# Öğretmenler ve meraklılar için: dosyalar

Rehberi takip etmek için bu bölüme gerek yok.

## Sayfalar

| Dosya | Ne? |
|---|---|
| `index.html` | Proje sitesinin giriş sayfası |
| `goz_benegi_atolyesi.html` | 8 adımlık canlandırmalı atölye |
| `rehber/` | 12 bölümlük etkileşimli çalışma rehberi |

## Belgeler

| Dosya | Ne? |
|---|---|
| **`ARASTIRMA_RAPORU_v3.md` / `.pdf`** | **Güncel rapor.** İki odaklı benekler (ne zaman kaynaşırlar, çift pupil ne zaman oluşur), ölçek bilmeden sınama, oran saçılımının ne kadarının gerçek olduğu, bilgisayarda doğrulama |
| `proje-tasarimi-v3-oneri.md` | v3'e neden geçildiği |
| `ARASTIRMA_RAPORU_v2.md` / `.pdf` | Önceki sürüm (yalnız tek benek analizi) |
| `PROJE_PLANI_ve_RAPOR_v1.md` | İş bölümü, takvim, riskler ve ilk rapor taslağı (başındaki düzeltme notunu oku) |
| `ARASTIRMA_RAPORU.md` | Literatür taraması ve kaynakça |
| `proje-tasarimi-v2.md` | Araştırma sorusunun seçilmesi ve ölçüm planı |
| `pilot-notu.md`, `on-bulgular-mj.md` | Deneme ölçümleri ve 97 kelebeklik ilk sonuçlar |

## Kod

Python 3 ile çalışır. Gerekli paketler: numpy, scipy, opencv-python, matplotlib, pandas, statsmodels, requests.

| Dosya | Ne yapar? | Ne üretir? |
|---|---|---|
| `kanat_turing.py` | Desen simülasyonları: Turing desenleri ve göz beneği | `cikti/` |
| `inat_cek.py` | iNaturalist'ten Türkiye kayıtlarını indirir, her kayda rakım ekler | `veri/*_kayitlar.csv` |
| `benek_olc.py` | Bir fotoğrafta beneğin pupil ve disk yarıçapını ölçer | — |
| `silhuet_olcek.py` | Kanadın dış çizgisini bulur; kaba ölçek ve cinsiyet tahmini | — |
| `hat.py` | Bütün fotoğrafları sırayla ölçer, kontrol görsellerini üretir | `veri/mj_olcum_tum.csv`, `veri/teshis_ornek/` |
| `analiz.py` | Senaryoları karşılaştırır, rakım ilişkisine bakar | `veri/mj_analiz.csv`, `veri/_bulgu_mj.png` |
| `monte_carlo.py` | Yöntemi sahte kelebeklerle 400 kez dener (dört senaryo) | `veri/monte_carlo_*.csv`, `sekiller/06_monte_carlo.png` |
| `sekil_gradyan.py` | Tek odak modelinin şekli (Şekil 1) | `sekiller/08_gradyan_matematigi.png` |
| `sekil_cift_odak.py` | İki odaklı beneklerin şekli (Şekil 2) | `sekiller/09_cift_odak.png` |
| `sentetik_cift_odak.py` | İki odaklı benekleri bilgisayarda üretip kuralları sınar (Şekil 3) | `veri/sentetik_cift_odak.csv`, `sekiller/10_*.png` |
| `sekil_oran.py` | Oran saçılımını gerçek fark ve ölçüm hatası olarak ayırır (Şekil 5) | `sekiller/07_*.png`, `veri/oran_varyans_uyum.csv` |
| `rapor_pdf.py` | Markdown raporu PDF'e çevirir | `ARASTIRMA_RAPORU_v3.pdf` |

## Veri

| Dosya | Ne? |
|---|---|
| `veri/maniola_jurtina_kayitlar.csv`, `veri/aglais_io_kayitlar.csv` | Gözlem bilgileri: konum, tarih, rakım, lisans, fotoğraf bağlantısı |
| `veri/mj_olcum_tum.csv` | 395 fotoğrafın ölçüm sonuçları |
| `veri/mj_analiz.csv` | Analize giren 97 kelebeğin tablosu |
| `veri/teshis_ornek/` | Ölçümleri gözle kontrol etmek için toplu görseller |
| `veri/ek_a_lisans_listesi.csv` | 97 kelebeğin fotoğrafçısı ve lisansı (Rapor Ek A) |
| `veri/monte_carlo_*.csv` | Sahte kelebek deneylerinin sonuçları |

Fotoğraflar bu depoda yok (177 MB). `inat_cek.py` çalıştırıldıktan sonra `hat.py` içindeki indirme adımıyla yeniden alınır. Yalnızca Creative Commons lisanslı fotoğraflar kullanılır.

## Çalıştırma sırası

```bash
python kanat_turing.py
python inat_cek.py
# (fotoğrafları indir: hat.py içindeki indirme adımı)
python hat.py
python analiz.py
python monte_carlo.py
python sekil_gradyan.py
python sekil_cift_odak.py
python sentetik_cift_odak.py
python sekil_oran.py
python rapor_pdf.py ARASTIRMA_RAPORU_v3.md ARASTIRMA_RAPORU_v3.pdf
```

## Etik ve beyan

Hiçbir kelebek yakalanmadı. Kod ve metinlerin bir kısmı danışman gözetiminde yapay zekâ desteğiyle hazırlandı ve raporda beyan edildi. Ölçümlerin doğrulanması ve elle yapılan işaretlemeler öğrencilere aittir.
