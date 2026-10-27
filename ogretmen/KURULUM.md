# Ön test ve final sonuçlarını Google E-Tablo'da görmek

Öğrenciler çalışma rehberinde ön testi ya da finali bitirince adları, sınıfları, puanları ve tekrar etmeleri gereken konular sizin Google E-Tablonuza yazılır. Bir kez, yaklaşık 5 dakikada kurulur.

## 1. E-tabloyu oluşturun

1. Okul ya da kendi Google hesabınızla <https://sheets.new> adresini açın.
2. Tablonun adını değiştirin, örneğin **Turing Kelebek Sonuçları**.

## 2. Kodu yapıştırın

1. Menüden **Uzantılar → Apps Script**'i seçin. Yeni bir sekmede kod düzenleyici açılır.
2. Düzenleyicide duran `function myFunction() { }` satırlarını silin.
3. Bu klasördeki [`sonuc_toplayici.gs`](sonuc_toplayici.gs) dosyasının **tamamını** kopyalayıp yapıştırın.
4. Üstteki disket simgesiyle (ya da Ctrl/Cmd + S) kaydedin. Projeye bir ad sorulursa "Sonuç toplayıcı" yazabilirsiniz.

## 3. Web uygulaması olarak yayınlayın

1. Sağ üstte **Dağıt → Yeni dağıtım**'a tıklayın.
2. "Tür seçin" yanındaki dişli simgesinden **Web uygulaması**'nı seçin.
3. Ayarlar:
   - **Açıklama:** Turing Kelebek
   - **Şu kullanıcı olarak yürüt:** **Ben** (kendi e-postanız)
   - **Erişimi olan kullanıcılar:** **Herkes**
4. **Dağıt**'a basın.
5. Google izin isteyecek: **Erişimi yetkilendir** → hesabınızı seçin. "Google bu uygulamayı doğrulamadı" uyarısı çıkarsa **Gelişmiş → Sonuç toplayıcı'ya git (güvenli değil)** → **İzin ver**. Bu uyarı, kodu sizin yazdığınız ve Google'ın incelemediği her betik için çıkar; kod yalnızca bu e-tabloya satır ekler.
6. Ekranda çıkan **Web uygulaması URL'sini** kopyalayın. `https://script.google.com/macros/s/` ile başlar ve `/exec` ile biter.

**Kontrol:** Kopyaladığınız adresi tarayıcıda açın. `"Turing Kelebek sonuç toplayıcı çalışıyor."` yazısını görmelisiniz.

## 4. Adresi rehbere ekleyin

Kopyaladığınız adresi Claude'a gönderin; `rehber/js/config.js` dosyasına yazıp siteyi güncelleyecek.

Kendiniz yapmak isterseniz `rehber/js/config.js` dosyasında şu satırı değiştirin:

```js
resultsUrl: 'https://script.google.com/macros/s/.../exec',
```

Sonra değişikliği GitHub'a gönderin. Site birkaç dakika içinde güncellenir.

## Tabloda ne göreceksiniz?

- **Sonuçlar** sayfası: her gönderim bir satır. Zaman, ad, sınıf, sınav (Ön test / Final), puan, doğru sayısı, deneme numarası, tekrar edilmesi gereken konular ve soru soru cevaplar (✓ / ✗).
- **Özet** sayfası: her öğrenci için ilk ön test puanı, en iyi final puanı, aradaki gelişim ve en iyi finalde zayıf kaldığı üniteler. Her yeni gönderimde kendiliğinden güncellenir.

## Bilmeniz gerekenler

- **Hangi adres?** Sonuçlar yalnızca GitHub Pages'teki siteden gönderilir: <https://hakanatas.github.io/turing-kelebek/rehber/>. Claude üzerindeki rehber sayfası güvenlik nedeniyle dış adreslere bağlanamaz; orada öğrenciye kopyalayıp size gönderebileceği bir sonuç metni gösterilir.
- **İnternet kesilirse:** Gönderilemeyen sonuç öğrencinin tarayıcısında saklanır ve rehber bir sonraki açılışta yeniden gönderilir. Öğrenci ayrıca kopyalayabileceği bir sonuç metni görür.
- **Anahtar:** `ANAHTAR` değeri yalnızca rastgele gönderimleri engeller; sitenin kodunda görünür olduğu için gerçek bir şifre değildir. Gerekirse hem `sonuc_toplayici.gs` hem `rehber/js/config.js` içinde aynı yeni değerle değiştirebilirsiniz. Tabloyu yalnızca siz görürsünüz.
- **Ad yazımı:** Özet sayfası öğrencileri ad + sınıf ile eşleştirir. Öğrencilerden her seferinde aynı biçimde yazmalarını isteyin (ör. "Ayşe Yılmaz", "9-A").
- **Kodu değiştirirseniz:** **Dağıt → Dağıtımları yönet → kalem simgesi → Sürüm: Yeni sürüm → Dağıt** yolunu izleyin; adres aynı kalır.
