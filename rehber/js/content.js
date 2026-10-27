/* İçerik: üniteler, hızlı kontroller, ara değerlendirmeler */
(function(){
const w = (name) => `<div data-w="${name}"></div>`;
const c = (id) => `<div data-c="${id}"></div>`;
const key = (t, s, cls='') => `<div class="key ${cls}"><b class="t">${t}</b>${s}</div>`;
const worked = (q, steps, sonuc) => `<div class="worked"><b class="t">Çözülmüş örnek</b><div class="q">${q}</div><ol>${steps.map(x=>`<li>${x}</li>`).join('')}</ol>${sonuc?`<p style="margin:6px 0 0"><b>Sonuç:</b> ${sonuc}</p>`:''}</div>`;
const deep = (t, html) => `<details class="deep"><summary>Ö1 için derinleşme: ${t} <small>(isteğe bağlı)</small></summary>${html}</details>`;

TK.U = [
/* ============================== 0 ============================== */
{ id:'baslangic', no:0, title:'Başlarken', short:'Başlarken', time:'20 dk',
  lead:'Bu rehber seni, bir TÜBİTAK 2204-A projesinin bütün fikirlerini anlayıp jüriye kendi sözlerinle anlatabileceğin noktaya götürmek için hazırlandı.',
  goals:['Projenin tek cümlelik sorusunu söyleyebilmek','Ekipteki üç rolü ve takvimi bilmek','Rehberi nasıl kullanacağını öğrenmek','Ön testle nereden başladığını görmek'],
  summary:['Proje bir formülün öngörülerini gerçek kelebek fotoğraflarıyla sınıyor.','Üç rol var: Ö1 matematik, Ö2 ölçüm, Ö3 biyoloji. Herkes bütün üniteleri bilmeli.','Her ünitede: hedefler → deneyerek öğren → hızlı kontrol → ara değerlendirme (%70 ile geçersin).'],
  sections:[
    {h:'Projenin sorusu', html:`
      <p>Kelebek kanatlarındaki halkalı benekler, yani <b>göz benekleri</b>, nasıl oluşuyor? Bilim insanları 50 yıldır bunun için matematiksel bir model kullanıyor. Biz bu modelin öngörülerini <b>Türkiye'deki gerçek kelebeklerin fotoğraflarıyla</b> sınıyoruz.</p>
      ${key('Tek cümlede proje','Beneği çizen "kimyasal talimatın" matematiğinden kesin öngörüler türetiyor ve bunları Türkiye\'deki Çayır esmerlerinin fotoğraflarıyla, ölçek bilmeden sınıyoruz: tek benekte hangi ayarın kelebekten kelebeğe değiştiğini, iki pupilli beneklerde ise iki sinyalin nasıl kaynaştığını.')}
      <p>Proje <b>Matematik</b> alanında, uygulama alanı Biyoloji. İşin kalbinde formüller ve iki kanıtlanmış teorem var; kelebekler onları sınamak için doğal bir laboratuvar. Rehber, raporun güncel sürümüne (<b>v3</b>) göre hazırlandı.</p>`},
    {h:'Rehber nasıl çalışır?', html:`
      <ul>
        <li>Her ünite <b>öğrenme hedefleriyle</b> başlar. Ünite bitince bunları yapabiliyor olmalısın.</li>
        <li>Metnin içinde <b>etkileşimli araçlar</b> var: kaydırıcıları oynat, noktaları sürükle, düğmelere bas. Okumaktan çok, deneyerek öğreneceksin.</li>
        <li>Turuncu çerçeveli <b>Hızlı kontrol</b> soruları anında geri bildirim verir.</li>
        <li>Her ünitenin sonunda <b>Ara değerlendirme</b> var. %70 ve üstü ile üniteyi geçersin; sol menüde yeşil olur.</li>
        <li>En sonda <b>Final</b> sınavı ve <b>Karne</b> var. Final puanını bu ön testle karşılaştırıp ne kadar ilerlediğini göreceksin.</li>
      </ul>
      ${key('Önerilen tempo','Haftada 2–3 ünite. Her ünite 30–50 dakika. Bir üniteyi bitirmeden ötekine geçme; ama takıldığın yerde danışmanına sor, saatlerce bekleme.','analogy')}`},
    {h:'Ekip ve roller', html:`
      <div class="cards">
        <div class="card"><h4>Ö1 · Matematik ve simülasyon</h4><p>Modeli türetir ve anlatır. Simülasyon ve Monte Carlo sonuçlarından sorumlu. Raporun "Kuramsal çerçeve" ve "Tartışma" bölümleri.</p></div>
        <div class="card"><h4>Ö2 · Ölçüm ve veri kalitesi</h4><p>Fotoğraflarda kanat uzunluğu ve cinsiyet işaretler, iki ölçücü uyumunu (ICC) hesaplar. "Yöntem – Ölçüm" bölümü.</p></div>
        <div class="card"><h4>Ö3 · Biyoloji ve saha</h4><p>Tür biyolojisi, cinsiyet ölçütleri, iklim verisi, etik ve lisans. "Giriş – biyoloji" ve "Etik" bölümleri.</p></div>
      </div>
      <p>Rolün ne olursa olsun <b>bütün üniteleri</b> çalış. Jüri herkese her şeyi sorabilir. İki kişilik ekipte Ö2 ve Ö3 birleşir.</p>`},
    {h:'Takvim: neredeyiz?', html: w('timeline')},
    {h:'Ön test', html:`<p>Henüz hiçbir şey bilmiyor olabilirsin, sorun değil. Bu test yalnızca başlangıç noktanı kaydeder. Tahmin et, cevapları oku ve devam et.</p>`}
  ],
  quiz:{ id:'on-test', tag:'Ön test', pass:0, passMsg:'Başlangıç noktan kaydedildi. Finalde bu puanla karşılaştıracağız.', qs:[
    {q:'Göz beneğinin ortasındaki beyaz noktaya ne denir?', opts:['Pupil','Odak','Apeks','Disk'], a:0, ex:'Ortadaki beyaz kısım pupil, çevresindeki siyah kısım disk.'},
    {q:'Bir fotoğraf iki kat yakından çekilirse beneğin pupil yarıçapının disk yarıçapına oranı ne olur?', opts:['Değişmez','İki katına çıkar','Yarıya iner','Dört katına çıkar'], a:0, ex:'İki yarıçap da aynı kat büyür; bölünce bu kat sadeleşir.'},
    {q:'ln(e) kaçtır?', opts:['1','0','e','2,718'], a:0, ex:'e\'yi e yapmak için e\'yi bir kez kullanırsın: ln(e) = 1.'},
    {q:'Spearman ρ = −0,9 ne anlatır?', opts:['Biri büyürken öteki güçlü biçimde küçülüyor','İlişki yok','İkisi birlikte büyüyor','Ölçüm hatalı'], a:0, ex:'Eksi işaret ters yönü, 1\'e yakın büyüklük güçlü ilişkiyi gösterir.'},
    {q:'Projede kelebek ölçümleri nereden geliyor?', opts:['iNaturalist\'teki vatandaş bilimi fotoğraflarından','Yakalanan kelebeklerden','Müze koleksiyonlarından','Bilgisayar simülasyonundan'], a:0, ex:'Hiç kelebek yakalanmadı; Creative Commons lisanslı iNaturalist fotoğrafları kullanıldı.'},
    {q:'Monte Carlo yöntemi nedir?', opts:['Cevabı bilinen sahte verilerle bir yöntemi çok kez deneyip sınamak','Kumarhanede istatistik','Bir kelebek türü','Fotoğraf büyütme tekniği'], a:0, ex:'Testimizin gerçek gürültü altında çalışıp çalışmadığını böyle sınadık.'},
    {q:'Sinyalin "menzili" λ büyürse benek ne olur?', opts:['Bütün halkalar aynı oranda büyür','Yalnız pupil büyür','Benek kaybolur','Hiçbir şey değişmez'], a:0, ex:'r = λ·ln(S/θ): λ bütün yarıçapları aynı çarpanla büyütür.'},
    {q:'Bir sonucun p-değeri 0,17 ise…', opts:['Bu sonuç şansla kolayca çıkabilir; anlamlı sayılmaz','Sonuç kesin doğrudur','%17 hata yapılmıştır','Ölçümlerin %17\'si yanlıştır'], a:0, ex:'Genelde p < 0,05 "anlamlı" kabul edilir. 0,17 bunun çok üstünde.'}
  ]}
},
/* ============================== 1 ============================== */
{ id:'kelebek', no:1, title:'Kelebekler ve göz beneği', short:'Kelebekler', time:'35 dk',
  lead:'Önce elimizdeki "laboratuvar hayvanını" tanıyalım: Çayır esmeri ve onun tek, büyük göz beneği.',
  goals:['Kanadın bölümlerini (apeks, taban, kosta, dış kenar) gösterebilmek','Göz beneğinin pupil ve diskini ayırt edebilmek','Erkek ve dişi Çayır esmerini ayırmanın yolunu söyleyebilmek','Nijhout\'un odak deneyini ve ne kanıtladığını anlatabilmek'],
  summary:['Çayır esmerinin ön kanat ucunda beyaz pupilli siyah bir göz beneği var; bazen iki pupilli.','Kanat uzunluğu L, kanat tabanından apekse ölçülür.','Dişiler erkeklerden büyük; analiz cinsiyete göre ayrı yapılmalı.','Nijhout\'un deneyi: beneği ortadaki odak hücreleri "çizer"; odak taşınınca benek de taşınır.'],
  sections:[
    {h:'Çayır esmeri: Maniola jurtina', html:`
      <p>Türkiye'de yaklaşık 380 gündüz kelebeği türü yaşar. Biz bunlardan <b>Çayır esmeri</b>ni (<i>Maniola jurtina</i>) seçtik. Neden mi?</p>
      <ul><li>Ön kanadının ucunda <b>büyük, beyaz pupilli siyah bir benek</b> var. Ölçmesi kolay. Bu benek sık sık <b>iki pupilli</b> de olur; Ünite 6\'da bunun neden bir hazine olduğunu göreceksin.</li><li>Deniz kıyısından 2000 metreye kadar yaşar. Rakım karşılaştırması yapabiliriz.</li><li>Mayıs–Eylül arası uçar ve iNaturalist'te Türkiye'den <b>390 gözlem</b> var.</li></ul>
      <p>İkinci türümüz <b>Tavus kelebeği</b> (<i>Aglais io</i>). Beneklerinde 3–4 halka var; bu yüzden ileride daha güçlü bir test sağlayacak (105 gözlem).</p>`},
    {h:'Kanadın haritası', html:`<p>Ölçüm yaparken bu adları bilmek zorundasın. Özellikle <b>kanat tabanı</b> ve <b>apeks</b>: kanat uzunluğu L bu iki nokta arasında ölçülür.</p>${w('anatomy')}${c('k1')}`},
    {h:'Göz beneğinin yapısı', html:`
      <p>Çayır esmerinin beneği iki bölgeden oluşur: ortada beyaz <b>pupil</b>, çevresinde siyah <b>disk</b>. Diskin çevresinde turuncu kanat zemini başlar.</p>
      <p>Her bölgenin <b>yarıçapı</b>nı ölçeceğiz: pupil yarıçapı <b>r<sub>p</sub></b>, disk yarıçapı <b>r<sub>d</sub></b>. Tipik bir erkekte r<sub>d</sub> ≈ 2,2 mm, r<sub>p</sub> ≈ 0,44 mm. Yani pupil, diskin yaklaşık beşte biri.</p>
      ${key('Neden göz benekleri var?','Göz benekleri kuşların ve kertenkelelerin saldırısını kanadın ucuna yönlendirebilir ya da avcıyı ürkütebilir. Bu yüzden boyutları evrim açısından önemlidir. Ama bu projede sorumuz "neden" değil, <b>"nasıl"</b> oluştukları.')}`},
    {h:'Erkek mi, dişi mi?', html:`${w('sexes')}<p>Cinsiyeti bilmek önemli, çünkü dişiler daha büyük. Cinsiyetleri karıştırırsak "büyük benekli kelebekler" aslında sadece "dişiler" olabilir. Ön analizde turuncu alan oranı bir <b>vekil</b> (dolaylı ölçü) olarak kullanıldı; ana analizde Ö3'ün ölçütleriyle görsel etiket konacak.</p>${c('k2')}`},
    {h:'Nijhout\'un deneyi: benek nereden "emir" alıyor?', html:`
      <p>1970'lerde Fred Nijhout, kelebek pupasında (kozada) beneğin ortasındaki küçük bir hücre grubunu inceledi. Bu gruba <b>odak</b> denir.</p>
      <ul><li>Odağı yaktığında (çıkardığında) <b>benek oluşmadı</b>.</li><li>Odağı kanadın başka bir yerine naklettiğinde, <b>yeni yerde bir benek</b> oluştu.</li></ul>
      <p>Sonuç: benek, odaktaki hücrelerden gelen bir "sinyalle" çiziliyor. Aşağıda deneyi kendin yap: odağı sürükle, ikinci bir odak ekle ya da birini yak, sonra kanadı geliştir.</p>
      ${w('transplant')}
      ${key('Fark ettin mi?','İki odağı yakın koyarsan benekleri birleşiyor. Monteiro ve arkadaşları (2001) gerçek kelebeklerde birleşmiş beneklerin şeklinin, iki sinyalin <b>toplamına</b> uyduğunu gösterdi. Bu, sinyal fikrinin güçlü bir kanıtı.')}
      ${c('k3')}`}
  ],
  checks:{
    k1:{q:'Kanat uzunluğu L hangi iki nokta arasında ölçülür?', opts:['Kanat tabanı ile apeks','Göz beneği ile dış kenar','Anten ucu ile apeks','Kosta ile arka kanat'], a:0, ex:'L, kanadın gövdeye bağlandığı tabandan en uç nokta olan apekse kadar ölçülür.'},
    k2:{q:'Analizi neden cinsiyete göre ayrı yapmalıyız?', opts:['Dişiler daha büyük; karışırsa boy farkı cinsiyet farkı gibi görünür','Erkeklerde benek yoktur','Dişiler başka türdür','Cinsiyet fotoğraf kalitesini değiştirir'], a:0, ex:'Dişilerin kanadı (~25 mm) ve beneği erkeklerden (~22 mm) büyük. Cinsiyet, boyutla karışan bir değişkendir.'},
    k3:{q:'Odak başka yere nakledilince orada benek oluşması neyi gösterir?', opts:['Beneği odaktaki hücrelerden gelen bir sinyal belirliyor','Benek rastgele oluşuyor','Benek genlerle değil ışıkla oluşuyor','Odak yalnızca pupili yapıyor'], a:0, ex:'Odak nereye giderse benek oraya gidiyor; demek ki "emir" odaktan geliyor.'}
  },
  quiz:{ id:'kelebek', qs:[
    {q:'Çayır esmerinin bilimsel adı nedir?', opts:['Maniola jurtina','Aglais io','Bicyclus anynana','Junonia coenia'], a:0, ex:'Aglais io Tavus kelebeği; Bicyclus ve Junonia laboratuvar türleri.'},
    {t:'match', q:'Kanat bölümlerini tanımlarıyla eşleştir.', pairs:[['Apeks','Ön kanadın en uç noktası'],['Kanat tabanı','Kanadın gövdeye bağlandığı yer'],['Kosta','Ön kanadın üst kenarı'],['Dış kenar','Gövdeden en uzak kenar']], ex:'Ölçüm protokolünde bu adlar sürekli geçecek.'},
    {q:'Tipik bir Çayır esmerinde pupil yarıçapı, disk yarıçapının yaklaşık kaçta biridir?', opts:['Beşte biri','Yarısı','Onda biri','Aynısı'], a:0, ex:'r_p ≈ 0,44 mm, r_d ≈ 2,2 mm → oran ≈ 0,20.'},
    {q:'Nijhout odak hücrelerini yaktığında ne oldu?', opts:['Benek oluşmadı','Benek iki katına çıktı','Benek başka renge döndü','Kelebek öldü'], a:0, ex:'Odak yoksa sinyal yok, sinyal yoksa benek yok.'},
    {q:'İki odak birbirine yakın olursa ne beklenir?', opts:['Sinyaller toplanır ve benekler birleşir','İki benek birbirini yok eder','Yalnız büyük olan kalır','Hiçbir benek oluşmaz'], a:0, ex:'Monteiro vd. (2001) birleşmiş beneklerin sınırının iki sinyalin toplamına uyduğunu gösterdi.'},
    {q:'Projede neden Tavus kelebeği de incelenecek?', opts:['3–4 halkası olduğu için modeli daha güçlü sınar','Daha kolay yakalandığı için','Türkiye\'de daha çok olduğu için','Erkeği olmadığı için'], a:0, ex:'Çok halka = karşılaştırılacak çok oran ve fark. Güç (S) ve menzil (λ) senaryoları daha net ayrılır.'}
  ]}
},
/* ============================== 2 ============================== */
{ id:'desen', no:2, title:'Desen nasıl oluşur?', short:'Desen', time:'40 dk',
  lead:'Bir hücre, kendinden milimetrelerce uzaktaki bir odağın "emrini" nasıl alır? Cevap: yayılma ve sönme.',
  goals:['Difüzyonu (yayılmayı) moleküllerin rastgele hareketiyle açıklayabilmek','Sönmenin (bozunmanın) sinyali neden sınırladığını söyleyebilmek','Yayılma + sönme dengesinden "menzil" λ fikrine varabilmek','Turing\'in fikrini ve göz beneği modelinden farkını anlatabilmek'],
  summary:['Sinyal (morfogen) odaktan rastgele hareketle yayılır (difüzyon) ve zamanla söner.','Yayılma ve sönme dengeye gelince sinyal yakında güçlü, uzakta zayıf olur.','Menzil λ = √(D/γ): hızlı yayılan, yavaş sönen sinyalin menzili uzun.','Turing: iki kimyasal kendiliğinden desen yapabilir. Göz beneği için tek sinyal ve eşik kuralı yeter.'],
  sections:[
    {h:'Yayılma: moleküllerin sarhoş yürüyüşü', html:`
      <p>Odaktaki hücreler bir kimyasal salgılar. Biyologlar buna <b>morfogen</b> ("biçim yaratan") der; biz <b>sinyal</b> diyeceğiz. Her sinyal molekülü komşu hücrelere doğru <b>rastgele</b> hareket eder: bazen sağa, bazen sola. Buna <b>difüzyon</b> denir.</p>
      ${key('Benzetme','Suya bir damla mürekkep damlat. Kimse mürekkebi itmiyor; moleküller rastgele çarpışarak kendiliğinden yayılıyor. Yakında koyu, uzakta açık renk görürsün.','analogy')}
      <p>Ama sinyal sonsuza kadar yaşamaz. Hücreler onu parçalar; buna <b>sönme</b> (bozunma) denir. Aşağıda sönme hızını değiştir ve sağdaki grafiğe bak.</p>
      ${w('randomwalk')}${c('d1')}`},
    {h:'Denge ve menzil λ', html:`
      <p>Odak sürekli sinyal üretir, sinyal yayılır ve söner. Bir süre sonra <b>denge</b> kurulur: her noktadaki sinyal miktarı artık değişmez. Odak yakınında çok, uzakta az.</p>
      <p>Sinyalin ne kadar uzağa "ulaşabildiğine" <b class="l">menzil</b> diyoruz ve <b class="l">λ</b> (lamda) ile gösteriyoruz:</p>
      <div class="formula">λ = √(D / γ)    D: yayılma hızı · γ: sönme hızı</div>
      <p>Hızlı yayılan ve yavaş sönen sinyalin menzili uzundur. Aşağıdaki simülasyon, projedeki <code>kanat_turing.py</code> ile aynı yöntemle çalışıyor: her hücre her adımda komşularıyla sinyal alışverişi yapıyor.</p>
      ${worked('Bir sinyalin yayılma hızı D = 0,01 mm²/s, sönme hızı γ = 0,04 1/s. Menzili kaç mm? Sönme 4 katına çıkarsa ne olur?', ['D ÷ γ = 0,01 ÷ 0,04 = 0,25 mm²','λ = √0,25 = <b>0,5 mm</b>','γ 4 katına çıkarsa: 0,01 ÷ 0,16 = 0,0625 mm² → λ = √0,0625 = <b>0,25 mm</b>'], 'Sönme 4 kat hızlanınca menzil yarıya iner (√4 = 2). Karekök yüzünden etki "yumuşar".')}
      ${w('diffusion')}${c('d2')}`},
    {h:'Alan Turing\'in büyük fikri', html:`
      <p><b>Alan Turing</b> bilgisayarın babalarından biri olarak bilinir. 1952'de biyolojiye dair tek makalesini yazdı: <i>"Biçim oluşumunun kimyasal temeli"</i>.</p>
      <p>Fikri şaşırtıcıydı: Birbiriyle tepkimeye giren ve <b>farklı hızlarda yayılan iki kimyasal</b>, başta tamamen düzgün olan bir dokuda <b>kendiliğinden</b> benek ya da şerit deseni oluşturabilir. Zebranın çizgileri, leoparın benekleri böyle açıklanmaya çalışılır.</p>
      ${w('grayscott')}
      <p>Yukarıdaki üreteç <b>Gray–Scott</b> modeli. Sadece iki sayıyı (F ve k) değiştirerek tamamen farklı desenler çıkıyor. Tuvale dokunup yeni damla ekleyebilirsin.</p>
      ${key('Önemli ayrım','Göz beneği için Turing\'in iki kimyasallı kararsızlığına gerek yok. Nijhout\'un modelinde <b>tek bir odaktan yayılan tek bir sinyal</b> ve hücrelerin <b>eşik kuralı</b> yeter. Projemiz bu daha yalın modeli sınıyor. Projenin adındaki "Turing tipi" ifadesi, ikisinin de "yayılan kimyasal desen çizer" fikrinden gelmesi yüzünden.')}
      ${c('d3')}`}
  ],
  checks:{
    d1:{q:'Sönme hızını sıfıra indirince parçacıklara ne oluyor?', opts:['Hiç yok olmuyor; sürekli birikip her yere yayılıyorlar','Hemen hepsi kayboluyor','Odakta kalıyorlar','Bir halka oluşturuyorlar'], a:0, ex:'Sönme yoksa sinyal birikir ve sınırsız yayılır; desen için keskin bir sınır olmaz. Sönme sinyalin menzilini sınırlar.'},
    d2:{q:'Sönme hızı γ iki katına çıkarsa menzil λ = √(D/γ) ne olur?', opts:['Küçülür (yaklaşık 0,71 katına iner)','İki katına çıkar','Değişmez','Sıfır olur'], a:0, ex:'√(D/2γ) = √(D/γ) ÷ √2 ≈ 0,71 × λ.'},
    d3:{q:'Turing modeli ile göz beneği (Nijhout) modeli arasındaki temel fark nedir?', opts:['Turing iki kimyasalla kendiliğinden desen kurar; göz beneği modelinde tek odaktan tek sinyal ve eşik kuralı vardır','İkisi tamamen aynıdır','Göz beneği modelinde hiç kimyasal yoktur','Turing modeli yalnızca kelebekler içindir'], a:0, ex:'İkisi de yayılan kimyasal fikrine dayanır ama mekanizmaları farklıdır.'}
  },
  quiz:{ id:'desen', qs:[
    {q:'Difüzyon nedir?', opts:['Moleküllerin rastgele hareketle çok yoğun yerden az yoğun yere yayılması','Hücrelerin bölünmesi','Kimyasalın parçalanması','Işığın kırılması'], a:0, ex:'Kimse itmiyor; rastgele hareketin sonucu yayılma.'},
    {q:'Odak sürekli sinyal üretiyor, sinyal yayılıp sönüyor. Uzun süre sonra ne olur?', opts:['Her noktada sinyal sabit bir değere oturur (denge)','Sinyal her yerde sonsuza kadar artar','Sinyal tamamen kaybolur','Sinyal salınım yapar'], a:0, ex:'Üretim, yayılma ve sönme dengelenir: kararlı durum.'},
    {t:'match', q:'Kavramları eşleştir.', pairs:[['Morfogen','Biçim yaratan sinyal kimyasalı'],['D','Yayılma hızı'],['γ','Sönme hızı'],['λ','Sinyalin menzili']], ex:'λ = √(D/γ).'},
    {q:'Hangisi menzili büyütür?', opts:['Daha hızlı yayılma, daha yavaş sönme','Daha yavaş yayılma, daha hızlı sönme','Odağı küçültmek','Kanadı boyamak'], a:0, ex:'λ = √(D/γ): D büyür ya da γ küçülürse λ büyür.'},
    {q:'Turing\'in 1952 makalesinin ana fikri nedir?', opts:['Farklı hızda yayılan iki kimyasal, düzgün bir dokuda kendiliğinden desen oluşturabilir','Kelebek benekleri genlerle çizilir','Bilgisayarlar düşünebilir','Desenler ışıkla oluşur'], a:0, ex:'"Difüzyonla tetiklenen kararsızlık" fikri.'},
    {q:'Gray–Scott modelinde benek yerine şerit elde etmek için ne değiştirildi?', opts:['İki sayı: F ve k','Kanadın rengi','Simülasyon süresi','Odak sayısı'], a:0, ex:'Pearson (1993): yalnız (F, k) değiştirilerek benek, şerit, labirent desenleri elde edilir.'}
  ]}
},
/* ============================== 3 ============================== */
{ id:'mat', no:3, title:'Matematik araç kutusu', short:'Matematik', time:'50 dk',
  lead:'Modeli anlamak için dört araç gerekiyor: üstel azalma, e sayısı, logaritma ve oran. Hepsini dokunarak öğrenelim.',
  goals:['Üstel azalmayı "her adımda aynı oranda küçülme" olarak açıklayabilmek','e ≈ 2,718 sayısını ve e<sup>−1</sup> ≈ 0,37 olduğunu bilmek','ln\'i "e\'nin kaçıncı kuvveti?" sorusu olarak kullanabilmek','Logaritmik eksenin neden kullanıldığını söyleyebilmek','Birim analiziyle λ\'nın uzunluk olduğunu gösterebilmek'],
  summary:['Üstel azalma: her eşit adımda aynı ORANDA küçülme. Her λ adımında sinyalin %37\'si kalır.','Logaritma "kaç kez çarptım?" sorusunun cevabı: log<sub>10</sub>(1000) = 3, ln(e<sup>2</sup>) = 2.','Çarpımın logaritması toplam, bölümün logaritması fark: ln(a/b) = ln a − ln b.','Logaritmik eksende üstel eğri düz çizgi olur.','Fotoğraf büyütülünce fark değişir, oran değişmez.'],
  sections:[
    {h:'Üstel azalma', html:`
      <p>Denge durumunda, odaktan r uzaklıktaki sinyal yaklaşık olarak şu formülle verilir:</p>
      <div class="formula">m(r) = S · e<sup>−r/λ</sup></div>
      <p>Burada <b class="s">S</b> odaktaki sinyal gücü, <b class="l">λ</b> menzil. Bu bir <b>üstel azalma</b>: odaktan her λ kadar uzaklaştığında sinyal <b>aynı oranda</b> küçülür. Eşit adımda eşit miktar değil, eşit <b>oran</b>.</p>
      ${w('decay')}
      ${key('Benzetme','Sıcak bir çay düşün. Her 10 dakikada oda sıcaklığıyla arasındaki farkın yaklaşık yarısını kaybeder. Fark 60°C → 30 → 15 → 7,5… Bu da üstel azalma.','analogy')}
      ${c('m1')}`},
    {h:'Isınma: "kaç kez?" sorusu', html:`
      <p>Üslü sayıları 8. sınıftan biliyorsun: 10<sup>3</sup> = 10 × 10 × 10 = 1000. Üs, "kaç kez çarptığını" söyler. Eksi üs bölmek demektir: 10<sup>−2</sup> = 1 ÷ 100 = 0,01.</p>
      <p><b>Logaritma</b> bu soruyu tersine çevirir: sonucu biliyorsun, <b>kaç kez</b> çarptığını arıyorsun.</p>
      <div class="formula">10<sup>3</sup> = 1000   ⟺   log<sub>10</sub>(1000) = 3     ("10'u kaç kez çarparsam 1000 olur? → 3")</div>
      ${worked('Hesapla: log<sub>10</sub>(100 000), log<sub>2</sub>(32), log<sub>10</sub>(0,001)', ['100 000 = 10 × 10 × 10 × 10 × 10 → 10 beş kez çarpıldı → <b>5</b>','32 = 2 × 2 × 2 × 2 × 2 → 2 beş kez çarpıldı → <b>5</b>','0,001 = 1 ÷ 1000 = 10<sup>−3</sup> → üç kez <i>bölündü</i> → <b>−3</b>'])}
      ${worked('Çarpmak neden toplamaya dönüşür? log<sub>10</sub>(100 × 1000) = ?', ['100 = 10<sup>2</sup>, 1000 = 10<sup>3</sup>','100 × 1000 = 10<sup>2</sup> × 10<sup>3</sup> = 10<sup>5</sup> (üsler toplanır)','log<sub>10</sub>(100 000) = 5 = 2 + 3'], 'Bir çarpımın logaritması, logaritmaların toplamıdır. Bölme de çıkarmaya dönüşür.')}
      ${worked('Arada kalan sayılar: log<sub>10</sub>(50) yaklaşık kaç?', ['10<sup>1</sup> = 10 ve 10<sup>2</sup> = 100','50 bu ikisinin arasında, o hâlde cevap 1 ile 2 arasında','Hesap makinesi: log<sub>10</sub>(50) ≈ 1,7'], 'Üs tam sayı olmak zorunda değil. 10<sup>1,7</sup> ≈ 50.')}
      ${c('m0')}`},
    {h:'e sayısı ve logaritma', html:`
      <p>Bilim insanları 10 yerine çoğu zaman <b>e ≈ 2,718</b> sayısını taban olarak kullanır. Neden mi? Bir şey <b>kendi miktarıyla orantılı</b> hızda büyüyor ya da azalıyorsa (sinyalin her an kendisinin belli bir yüzdesi kadar sönmesi gibi), hesaplarda kendiliğinden e çıkar.</p>
      ${key('e nereden çıkar? Banka örneği','Bankaya 1 TL koy, yıllık faiz %100 olsun. Faiz yılda bir eklenirse yıl sonunda 2 TL olur. Altı ayda bir yarım yarım eklenirse 1,5 × 1,5 = 2,25 TL. Her ay eklenirse ≈ 2,61 TL. Her gün eklenirse ≈ 2,71 TL. Her an eklenirse tam <b>e ≈ 2,718 TL</b>. "Sürekli büyüme" e\'yi doğurur; "sürekli sönme" de aynı sayıyı.','analogy')}
      <p>Formülde e<sup>−r/λ</sup> var. r = λ olduğunda değer e<sup>−1</sup> = 1 ÷ 2,718 ≈ 0,37. Yani her λ adımında sinyalin <b>%37'si</b> kalır.</p>
      <p><b>Doğal logaritma</b> (ln), tabanı e olan logaritmadır: "e'yi kaç kez çarpmalıyım ki bu sayıyı elde edeyim?"</p>
      <div class="formula">e<sup>y</sup> = x   ⟺   ln(x) = y</div>
      ${w('lnmachine')}
      <p>Kurallar 10 tabanındakinin aynısı:</p>
      <ul><li>ln(1) = 0 ve ln(e) = 1</li><li>ln(a × b) = ln a + ln b (çarpım toplama döner)</li><li>ln(a ÷ b) = ln a − ln b, bu yüzden ln(b/a) = −ln(a/b)</li></ul>
      ${worked('Projede en çok kullanacağın dört hesap', ['ln(e<sup>2</sup>) = <b>2</b> (e iki kez çarpılmış)','ln(81,5) ≈ <b>4,4</b>, çünkü e<sup>4,4</sup> ≈ 81,5 (hesap makinesiyle kontrol et)','ln(81,5 ÷ 33,8) = ln(81,5) − ln(33,8) ≈ 4,4 − 3,52 = <b>0,88</b>','ln(1/2) = −ln(2) ≈ <b>−0,69</b>: sinyal yarıya inince ln 0,69 azalır'])}
      ${c('m2')}`},
    {h:'Logaritmik eksen', html:`
      <p>Sinyal 80'den 1'e kadar düşüyor. Normal (doğrusal) bir grafikte küçük değerler sıfıra yapışıp kaybolur. <b>Logaritmik eksende</b> her çizgi bir öncekinin 10 katıdır (1, 10, 100). Bu eksende üstel eğri düz bir çizgiye dönüşür.</p>
      ${w('logscale')}${c('m3')}`},
    {h:'Birim dedektifliği', html:`
      <p>Bir formülün doğru olup olmadığını birimlerle kontrol edebilirsin. Menzil λ bir <b>uzunluk</b> olmalı, yani mm cinsinden. Hangi birleşim mm verir?</p>
      ${w('units')}
      <p>Fizikçiler buna <b>boyut analizi</b> der. λ, denklemdeki <b>tek uzunluk ölçeği</b>dir; halkaların büyüklüğünü o belirler.</p>`},
    {h:'Fark mı, oran mı?', html:`
      <p>İki sayıyı karşılaştırmanın iki yolu var: <b>fark</b> (a − b) ve <b>oran</b> (a ÷ b). Bu proje boyunca ikisinin farklı şeyler anlattığını göreceksin.</p>
      <ul><li>Bir fotoğrafı 2 kat büyütürsen bütün uzunluklar 2 katına çıkar: fark da 2 katına çıkar, ama <b>oran aynı kalır</b>.</li><li>Bir sayıya sabit bir şey eklersen fark aynı kalır, oran değişir.</li></ul>
      ${c('m4')}`}
  ],
  checks:{
    m0:{q:'log<sub>10</sub>(10 000) kaçtır?', opts:['4','1000','10','40'], a:0, ex:'10 × 10 × 10 × 10 = 10 000: 10 dört kez çarpıldı.'},
    m1:{q:'λ = 0,5 mm ise odaktan 1 mm uzaklıkta sinyal, odaktakinin yaklaşık yüzde kaçıdır?', opts:['%14','%37','%50','%5'], a:0, ex:'1 mm = 2λ. İki adım: 0,37 × 0,37 ≈ 0,14.'},
    m2:{q:'ln(81,5) ≈ 4,4 ve ln(33,8) ≈ 3,52 ise ln(81,5 ÷ 33,8) kaçtır?', opts:['0,88','7,92','1,25','0,80'], a:0, ex:'Bölümün logaritması logaritmaların farkıdır: 4,4 − 3,52 = 0,88.'},
    m3:{q:'Üstel azalan bir eğri logaritmik eksende nasıl görünür?', opts:['Düz bir çizgi','Bir parabol','Yatay bir çizgi','Bir çember'], a:0, ex:'log m = log S − r/(λ·ln10): r\'ye göre doğrusal.'},
    m4:{q:'İki yarıçap 3 px ve 15 px. Fotoğraf 2 kat büyütülünce fark ve oran ne olur?', opts:['Fark 12\'den 24 px\'e çıkar; oran 0,2 kalır','İkisi de değişmez','Fark aynı kalır; oran 2 katına çıkar','İkisi de 2 katına çıkar'], a:0, ex:'6 ve 30 px: fark 24, oran 0,2.'}
  },
  quiz:{ id:'mat', qs:[
    {t:'num', q:'ln(e³) kaçtır?', a:3, tol:0.01, ex:'ln, e\'nin kuvvetini verir: 3.'},
    {t:'num', q:'e<sup>−1</sup> kaçtır? (İki ondalık basamak)', a:0.37, tol:0.01, ex:'1/2,718 ≈ 0,368.'},
    {t:'num', q:'λ = 0,5 mm ise sinyalin yarıya indiği mesafe (λ·ln 2) kaç mm\'dir? (ln 2 ≈ 0,693)', a:0.35, tol:0.015, unit:'mm', ex:'0,5 × 0,693 ≈ 0,35 mm.'},
    {q:'m(r) = S·e<sup>−r/λ</sup> formülünde λ büyürse ne olur?', opts:['Sinyal daha yavaş azalır, daha uzağa ulaşır','Sinyal daha hızlı azalır','Odaktaki sinyal artar','Hiçbir şey değişmez'], a:0, ex:'λ büyükse r/λ küçük kalır, üstel daha yavaş azalır.'},
    {q:'Logaritmik eksende 1, 10, 100 çizgileri arasındaki mesafeler nasıldır?', opts:['Eşittir; her çizgi bir öncekinin 10 katı','100 çizgisi çok uzaktadır','Rastgeledir','1 ile 10 arası en uzundur'], a:0, ex:'Logaritmik eksende eşit adımlar eşit çarpanlara karşılık gelir.'},
    {q:'D mm²/s, γ 1/s ise hangisi mm verir?', opts:['√(D/γ)','D·γ','D/γ','√(D·γ)'], a:0, ex:'D/γ = mm², karekökü mm.'},
    {t:'num', q:'log<sub>10</sub>(1000) kaçtır?', a:3, tol:0.01, ex:'10 × 10 × 10 = 1000.'},
    {q:'ln(θ/S) = −ln(S/θ) neden doğrudur?', opts:['Kesri ters çevirmek logaritmanın işaretini değiştirir','ln her zaman negatiftir','S ve θ eşittir','Bu yanlıştır'], a:0, ex:'ln(θ/S) = ln θ − ln S = −(ln S − ln θ) = −ln(S/θ).'}
  ]}
},
/* ============================== 4 ============================== */
{ id:'model', no:4, title:'Gradyan modeli', short:'Model', time:'45 dk',
  lead:'Şimdi araçları birleştirip projenin ana formülünü kendimiz türetiyoruz: r = λ · ln(S/θ).',
  goals:['Eşik kuralını açıklayabilmek','r = λ·ln(S/θ) formülünü adım adım türetebilmek','Formülle verilen değerlerden halka yarıçapı hesaplayabilmek','S ve λ\'nın beneği nasıl farklı değiştirdiğini gösterebilmek','"S ve θ ayrı ayrı bulunamaz" ifadesini açıklayabilmek'],
  summary:['Her hücre sinyali bir eşikle karşılaştırıp rengini seçer (eşik kuralı).','Ana formül: r = λ · ln(S/θ).','Yalnız λ değişirse oran sabit kalır; yalnız S değişirse fark sabit kalır.','S ve θ yalnız S/θ olarak geçer; fotoğraftan ikisini ayrı ayrı bulamayız.'],
  sections:[
    {h:'Eşik kuralı', html:`
      <p>Her hücre bulunduğu yerdeki sinyali "okur" ve basit bir kurala göre renk seçer:</p>
      <ul><li>Sinyal <b>beyaz eşiği</b> θ<sub>1</sub>'in üstündeyse → beyaz (pupil)</li><li>Sinyal <b>siyah eşiği</b> θ<sub>2</sub>'nin üstündeyse → siyah (disk)</li><li>Daha azsa → turuncu kalır</li></ul>
      <p>θ (teta) eşik demek. Aşağıda dikey çizgi odaktan dışarı yürüyor; her noktada sinyale bakıp rengi seçiyor.</p>
      ${w('sweep')}
      ${key('Benzetme','Bir hoparlörden uzaklaşıyorsun. Sesi "çok yüksek" duyduğun bölge, "duyulur" bölge ve "duyulmaz" bölge var. Bölgelerin sınırı, sesin bir eşiğin altına düştüğü yer.','analogy')}${c('o1')}`},
    {h:'Formülü türetelim', html:`<p>Halkanın kenarı, sinyalin eşiğe tam eşit olduğu yerdir. Bu tek fikirden ana formüle ulaşıyoruz:</p>${w('derive')}
      <div class="formula">r<sub>p</sub> = λ · ln(S/θ<sub>1</sub>)     r<sub>d</sub> = λ · ln(S/θ<sub>2</sub>)</div>
      ${worked('Bir Çayır esmerinde λ = 0,5 mm, S = 81,5, siyah eşiği θ<sub>2</sub> = 1, beyaz eşiği θ<sub>1</sub> = 33,8. Disk ve pupil yarıçapı kaç mm?', ['Disk: S/θ<sub>2</sub> = 81,5 ÷ 1 = 81,5','ln(81,5) ≈ 4,4 → r<sub>d</sub> = 0,5 × 4,4 = <b>2,2 mm</b>','Pupil: S/θ<sub>1</sub> = 81,5 ÷ 33,8 ≈ 2,41','ln(2,41) ≈ 0,88 → r<sub>p</sub> = 0,5 × 0,88 = <b>0,44 mm</b>','Oran: 0,44 ÷ 2,2 = 0,20; fark: 2,2 − 0,44 = 1,76 mm'], 'Pupil diskin beşte biri: gerçek kelebeklerde ölçtüğümüz oran.')}
      ${worked('Aynı kelebekte menzil iki katına çıksa (λ = 1 mm)?', ['r<sub>d</sub> = 1 × 4,4 = 4,4 mm','r<sub>p</sub> = 1 × 0,88 = 0,88 mm','Oran: 0,88 ÷ 4,4 = 0,20 (değişmedi!)','Fark: 4,4 − 0,88 = 3,52 mm (iki katına çıktı)'])}${c('o2')}`},
    {h:'İki düğme: güç ve menzil', html:`
      <p>Formüle göre benek boyunu iki şey değiştirebilir: <b class="s">güç S</b> ve <b class="l">menzil λ</b>. İkisi de beneği büyütür ama farklı biçimde. Kaydırıcılarla oyna ve çerçeveli iki sayıyı izle.</p>
      ${w('playground')}
      ${key('Keşfettiğin iki özdeşlik','Oran: r<sub>p</sub>/r<sub>d</sub> = ln(S/θ<sub>1</sub>) ÷ ln(S/θ<sub>2</sub>) → içinde λ yok! λ değişince oran değişmez.<br>Fark: r<sub>d</sub> − r<sub>p</sub> = λ · ln(θ<sub>1</sub>/θ<sub>2</sub>) → içinde S yok! S değişince fark değişmez.')}
      ${c('o3')}`},
    {h:'Gizli ikizler: S ve θ', html:`
      <p>Formülde S ve θ hep birlikte, <b>S/θ</b> olarak geçiyor. Bu bir sorun yaratır: S ve θ'yı aynı kat değiştirirsen benek hiç değişmez.</p>${w('samespot')}
      <p>Bu yüzden fotoğraftan "S mi değişti, θ mı?" sorusunu cevaplayamayız. Sorabileceğimiz doğru soru: <b>"λ mı değişiyor, yoksa ln(S/θ) mı?"</b> Bilim insanları buna <b>tanımlanamazlık</b> der.</p>${c('o4')}`},
    {h:'Modelin sınırları', html:`<ul><li>m(r) = S·e<sup>−r/λ</sup> bir <b>yaklaşık</b> formül. Gerçek çözüm odağa çok yakında biraz farklı davranır; ama oran ve fark öngörülerinin yönü değişmez.</li><li>Model kanadın büyümediğini varsayar. Gerçekte desen büyüyen kanatta belirlenir.</li><li>Otaki (2011) gibi bazı araştırmacılar tek sinyalli modelin yetersiz olduğunu savunur. Bilimde modeller sınanır; biz de bunu yapıyoruz.</li></ul>
      ${deep('Tam çözüm ve Bessel fonksiyonu', '<p>Kararlı durumda denklem D(m″ + m′/r) − γm = 0 olur. Bu, <b>değiştirilmiş Bessel denklemi</b>dir; sonlu kalan çözümü m(r) = A·K<sub>0</sub>(r/λ). Büyük r için K<sub>0</sub>(x) ≈ √(π/2x)·e<sup>−x</sup> olduğundan üstel formül iyi bir yaklaşık verir. Odağa yakın (r/λ < 1) bölgede sapma büyür; bu yüzden raporda λ kestirimi için K<sub>0</sub> sürümü öneriliyor.</p>')}`}
  ],
  checks:{
    o1:{q:'Sinyal en başta bile beyaz eşiğe ulaşamazsa benek nasıl görünür?', opts:['Pupilsiz, tamamen siyah bir disk','Tamamen beyaz','Hiç benek olmaz','İki pupilli'], a:0, ex:'Hiçbir hücre beyaz eşiği aşamaz; ama siyah eşiği aşanlar disk oluşturur.'},
    o2:{q:'λ = 0,5 mm ve ln(S/θ₁) = 0,88 ise pupil yarıçapı kaç mm\'dir?', opts:['0,44','0,88','1,76','2,2'], a:0, ex:'0,5 × 0,88 = 0,44 mm.'},
    o3:{q:'Yalnız λ\'yı değiştirince hangi sayı sabit kalıyor?', opts:['Oran','Fark','Pupil yarıçapı','Disk yarıçapı'], a:0, ex:'λ bütün yarıçapları aynı çarpanla büyütür; oranda sadeleşir.'},
    o4:{q:'S\'yi 3 katına, iki eşiği de 3 katına çıkarırsak benek…', opts:['Aynı kalır','3 kat büyür','Küçülür','Pupilini kaybeder'], a:0, ex:'S/θ oranları değişmez, yarıçaplar da değişmez.'}
  },
  quiz:{ id:'model', qs:[
    {q:'Halkanın kenarında sinyal hangi değere eşittir?', opts:['Eşik değerine θ','Sıfıra','S\'ye','λ\'ya'], a:0, ex:'Kenar = sinyalin eşiğe indiği yer.'},
    {t:'num', q:'λ = 0,5 mm, S = 81,5, θ = 1 ise r kaç mm? (ln 81,5 ≈ 4,4)', a:2.2, tol:0.05, unit:'mm', ex:'0,5 × 4,4 = 2,2 mm.'},
    {t:'num', q:'Aynı kelebekte λ iki katına (1 mm) çıksa disk yarıçapı kaç mm olur?', a:4.4, tol:0.05, unit:'mm', ex:'1 × 4,4 = 4,4 mm. Her yarıçap 2 katına çıkar.'},
    {q:'Türetmede "−r/λ = ln(θ/S)" adımına nasıl geçildi?', opts:['İki tarafın doğal logaritması alındı','İki taraf λ ile çarpıldı','Karekök alındı','S ile toplandı'], a:0, ex:'ln(e^a) = a kuralı kullanıldı.'},
    {q:'r<sub>d</sub> − r<sub>p</sub> = λ·ln(θ₁/θ₂) ifadesinde hangi parametre yok?', opts:['S','λ','θ₁','θ₂'], a:0, ex:'S sadeleşti; yalnız S değişirse fark sabit kalır.'},
    {q:'r<sub>p</sub>/r<sub>d</sub> oranında hangi parametre yok?', opts:['λ','S','θ₁','θ₂'], a:0, ex:'λ sadeleşti; yalnız λ değişirse oran sabit kalır.'},
    {q:'Fotoğraflardan hangisini kestirebiliriz?', opts:['λ ve ln(S/θ)','S ve θ\'yı ayrı ayrı','Yalnız D','Yalnız γ'], a:0, ex:'S ile θ yalnız oran olarak geçtiği için ayrı ayrı bulunamaz (tanımlanamazlık).'},
    {q:'S çok küçülürse önce hangisi kaybolur?', opts:['Pupil','Disk','Turuncu zemin','Odak'], a:0, ex:'Beyaz eşiği daha yüksek; S < θ₁ olunca pupil kaybolur.'}
  ]}
},
/* ============================== 5 ============================== */
{ id:'senaryo', no:5, title:'Dört senaryo ve hipotezler', short:'Hipotezler', time:'40 dk',
  lead:'İyi bir deney, farklı açıklamaların farklı sonuçlar öngördüğü bir deneydir. Bizde dört rakip senaryo var.',
  goals:['Dört senaryoyu ve her birinde neyin değiştiğini söyleyebilmek','Her senaryonun (r<sub>d</sub>, r<sub>p</sub>) grafiğinde nasıl bir iz bıraktığını tarif edebilmek','Oran testinin ve oran saçılımının (CV) dört senaryoda beklenen değerlerini bilmek','H1, H2 ve H3 hipotezlerini kendi cümlelerinle yazabilmek'],
  summary:['Dört rakip açıklama: yalnız S, yalnız λ, pupil sabit, λ + pupil eşiği.','İki ölçü birlikte kullanılır: ρ (oran boyutla ilişkili mi?) ve CV (oran ne kadar dağınık?).','Yalnız-λ ile λ + eşiği ρ ayıramaz, CV ayırır.','Hiçbir sonuç başarısızlık değildir; her sonuç modelin bir parametresi hakkında bilgi verir.'],
  sections:[
    {h:'Rakip açıklamalar', html:`
      ${key('Önce iki sayıyı tanı','Bu ünitede iki ölçü kullanacağız; ayrıntısı Ünite 8\'de. <b>ρ (ro)</b>: "Büyük benekli kelebeklerde oran daha mı büyük, daha mı küçük?" sorusunun cevabı. +1\'e yakınsa büyük beneklerde oran da büyük, −1\'e yakınsa küçük, 0\'a yakınsa ilişki yok. <b>CV</b>: Oranın kelebekten kelebeğe ne kadar değiştiği, yüzde olarak. CV = %5 ise oranlar hemen hemen aynı; %40 ise çok dağınık.')}
      <p>Kelebekler arasında benek boyu değişiyor. Modelin içinden bunun dört olası açıklaması var:</p>
      <ol><li><b class="s">Yalnız güç S değişir.</b> Bazı odaklar daha çok sinyal üretir. → Halka farkı sabit. Küçük beneklerde pupil kaybolur.</li><li><b class="l">Yalnız menzil λ değişir.</b> Sinyal bazı kelebeklerde daha uzağa gider. → Bütün halkalar aynı oranda büyür; oran herkeste aynı.</li><li><b style="color:var(--warn)">Pupil sabit.</b> Pupil aslında eşik halkası değil, odak hücrelerinin kendisi. → Pupil hep aynı boyda, disk değişir.</li><li><b style="color:var(--ok)">λ + pupil eşiği.</b> Boyutu menzil belirler, ama beyaz eşiği θ<sub>p</sub> de kelebekten kelebeğe biraz farklı. → Oran boyuttan bağımsız ama herkeste aynı değil; <b>dağınık</b>.</li></ol>
      ${w('scenarios')}${c('s1')}`},
    {h:'Öngörü tablosu', html:`${w('hyptable')}
      <p>İki ölçüt birlikte kullanılıyor. <b>Oran testi</b> (ρ): "Büyük benekli kelebeklerde oran daha mı büyük, daha mı küçük, aynı mı?" <b>Oran saçılımı</b> (CV): "Oran kelebekten kelebeğe ne kadar değişiyor?" Tek başına ρ, yalnız-λ ile λ+eşik senaryolarını ayıramaz; ikisinde de ρ ≈ 0. Onları saçılım ayırır.</p>
      ${key('Neden dördüncü senaryo?','Monteiro ve arkadaşları (1997) laboratuvardaki <i>Bicyclus</i> kelebeklerinde şunu buldu: benek <b>boyutu</b> odak sinyali üzerinden, halka <b>oranları</b> ise doku eşikleri üzerinden kalıtılıyor. Dördüncü senaryo bu iş bölümünün doğal popülasyondaki karşılığı.')}${c('s2')}`},
    {h:'Hipotezler', html:`
      ${key('H1 · Çift pupil geometrisi','Çift pupilli kelebeklerin benek biçimi, iki odaklı modelin öngördüğü eğriye oturuyor mu? (Ünite 6)')}
      ${key('H2 · Tek benek değişkenliği','Oran testi ve oran saçılımı dört senaryodan hangisiyle uyumlu?')}
      ${key('H3 · Coğrafya','Menzil λ\'nın vekili (benek boyu ÷ kanat boyu) rakım ve sıcaklıkla değişiyor mu? D ve γ sıcaklığa bağlı hızlar olduğu için λ da sıcaklığa bağlı olabilir.')}
      <p>Dikkat: <b>Hiçbir sonuç "başarısız" değildir.</b> Hangi senaryo çıkarsa çıksın, modelin hangi parametresinin değiştiğini öğreniriz.</p>${w('outcomes')}`}
  ],
  checks:{
    s1:{q:'Soldaki panelde benek küçülünce pupil kayboluyor. Bu hangi senaryo?', opts:['Yalnız güç S değişir','Yalnız menzil λ değişir','Pupil sabit','λ + pupil eşiği'], a:0, ex:'S, beyaz eşiğinin altına düşünce pupil kaybolur.'},
    s2:{q:'İki senaryoda da ρ ≈ 0 bekleniyor. Yalnız-λ ile λ + eşik senaryolarını ne ayırır?', opts:['Oranın saçılımı (CV): yalnız-λ\'da çok küçük, λ + eşikte orta','Pupilin kaybolması','Rakım','Disk rengi'], a:0, ex:'Yalnız-λ\'da oran herkeste aynıdır; görülen saçılım sadece ölçüm gürültüsü olur (CV ≈ 0,09). λ + eşikte oran gerçekten değişir (CV ≈ 0,19).'}
  },
  quiz:{ id:'senaryo', qs:[
    {t:'match', q:'Her senaryoda ne olur?', pairs:[['Yalnız S değişir','Fark r_d − r_p sabit'],['Yalnız λ değişir','Oran herkeste aynı'],['Pupil sabit','Pupil yarıçapı sabit'],['λ + pupil eşiği','Oran boyuttan bağımsız ama dağınık']], ex:'Ünite 4\'teki iki özdeşliği ve dördüncü senaryonun tanımını hatırla.'},
    {t:'match', q:'(r<sub>d</sub>, r<sub>p</sub>) grafiğinde hangi iz?', pairs:[['Yalnız S değişir','Eğimi 1 olan doğru'],['Yalnız λ değişir','Orijinden geçen doğru'],['Pupil sabit','Yatay doğru']], ex:'Fark sabitse r_p = r_d − c; oran sabitse r_p = k·r_d; pupil sabitse r_p = c.'},
    {q:'Oran testinde ρ belirgin biçimde pozitif çıkarsa hangi senaryo desteklenir?', opts:['Yalnız S değişir','Yalnız λ değişir','Pupil sabit','λ + pupil eşiği'], a:0, ex:'S senaryosunda büyük beneklerde pupil göreli olarak daha büyük olur.'},
    {q:'ρ ≈ 0 ve oran CV\'si ≈ 0,19 ise hangi senaryo uyumludur?', opts:['λ + pupil eşiği','Yalnız λ','Yalnız S','Pupil sabit'], a:0, ex:'ρ sıfıra yakın: oran boyuttan bağımsız. CV orta: oran gerçekten değişiyor.'},
    {q:'H3 neden λ\'nın sıcaklıkla değişebileceğini düşünür?', opts:['D ve γ sıcaklığa bağlı hızlardır','Sıcakta kelebekler büyür','Fotoğraflar yazın çekilir','Turing öyle demiştir'], a:0, ex:'λ = √(D/γ); kimyasal hızlar sıcaklıkla değişir.'},
    {q:'"Yalnız S değişir" senaryosu doğruysa doğada ne görmemiz beklenir?', opts:['Bazı kelebeklerde pupilsiz benekler','Hiç benek olmayan kelebekler','Hep aynı boyda benekler','Hep çift pupilli benekler'], a:0, ex:'Monte Carlo\'ya göre bu senaryoda bireylerin yaklaşık %16\'sında pupil kaybolur.'}
  ]}
},
/* ============================== 6 ============================== */
{ id:'ikiodak', no:6, title:'İki odak: kaynaşan benekler', short:'İki odak', time:'55 dk',
  lead:'Çayır esmerinin beneğinde bazen iki pupil olur. Bu "kusur", modeli sınamak için elimizdeki en güçlü araç.',
  goals:['İki odağın sinyallerinin neden toplandığını söyleyebilmek','İki beneğin ne zaman tek benek gibi göründüğünü (kaynaşma koşulunu) sayılarla hesaplayabilmek','Çift pupilli beneğin hangi aralıkta oluştuğunu bilmek','Fotoğrafın ölçeğini bilmeden iki oranla iki bilinmeyenin nasıl bulunduğunu anlatabilmek'],
  summary:['İki odağın sinyali toplanır: m = m₁ + m₂.','İki odağın tam ortası bir "geçit": orada sinyal eşiğin üstündeyse iki benek kaynaşır.','Kaynaşma koşulu: a < r + 0,69·λ (a: odaklar arası mesafenin yarısı).','Çift pupil penceresi: r<sub>p</sub> + 0,69λ < a < r<sub>d</sub> + 0,69λ. Genişliği r<sub>d</sub> − r<sub>p</sub>.','Kaynaşmış diskten ölçülen iki oran (w/a, R/a), iki bilinmeyeni ölçek bilmeden verir; üçüncü ölçüm modeli sınar.'],
  sections:[
    {h:'Çift pupilli benek', html:`
      <p>Çayır esmerinin ön kanadındaki benekte çoğu zaman tek pupil var. Ama doğada sık sık <b>iki pupilli</b> benekler de görülür (Thomson 1969): tek bir siyah disk, içinde iki beyaz nokta.</p>
      <p>Model bunu basitçe açıklar: beneğin altında <b>iki odak</b> vardır. İki odak yakınsa benekleri kaynaşır. Ünite 1'deki odak deneyinde iki odağı yan yana koyduğunda bunu görmüştün.</p>
      ${key('Sinyaller toplanır','Bir odada iki lamba yak. Her noktadaki ışık, iki lambanın ışıklarının <b>toplamıdır</b>; lambalar birbirini bozmaz. Sinyaller de böyle: bir noktadaki toplam sinyal = 1. odaktan gelen + 2. odaktan gelen. Matematikçiler bunu "denklem doğrusal, bu yüzden üst üste binme geçerli" diye söyler.','analogy')}
      <p>Her halkanın sınırı, toplam sinyalin eşiğe <b>tam eşit</b> olduğu noktalardan oluşan bir çizgidir. Haritalardaki eş yükselti eğrileri gibi: biri "sinyali 1 olan yerler", öbürü "sinyali 34 olan yerler". Bunlara <b>seviye eğrisi</b> denir.</p>`},
    {h:'Odakları ayır', html:`<p>Aşağıda iki odak arasındaki mesafenin <b>yarısını</b> (a) değiştir. Sağdaki grafik sinyali iki odaktan geçen çizgi boyunca gösteriyor; kırmızı nokta tam ortadaki "geçit" değeri. Alttaki şerit hangi durumda olduğunu söylüyor.</p>${w('twofocus')}${c('t1')}`},
    {h:'Ne zaman kaynaşır?', html:`
      ${key('Benzetme: dağ geçidi','İki dağ düşün. İki tepeyi birleştiren sırtın en alçak noktası bir geçittir. Geçit, sırt boyunca en alçak; ama sırta dik yönde (vadilere göre) en yüksek noktadır. Vadiyi su basarsa ne olur? Su <b>geçidin altında</b> kalırsa iki tepe kara yoluyla birbirine bağlı, tek bir ada olur. Su <b>geçidi aşarsa</b> iki ayrı ada olur. Bizim sinyalimizde "su seviyesi" eşik, "tepeler" odaklar, "kara" ise halkanın içi.','analogy')}
      <p>Yani tek bir soru yeter: <b>Tam ortadaki geçitte sinyal eşiğin üstünde mi?</b> Üstündeyse halka iki odağı birlikte sarar (kaynaşmış benek). Altındaysa iki ayrı halka olur.</p>
      <p>Bu soru hesaplanınca çok sade bir kural çıkıyor (Teorem 1):</p>
      <div class="formula">a  &lt;  r  +  0,69 · λ</div>
      <p>Burada <b>r</b> aynı halkanın tek bir odakta olacağı yarıçap, 0,69 da ln 2 sayısı. Yani iki benek, yarıçapları dokununca değil, biraz <b>daha uzaktayken</b> bile birleşir; çünkü aradaki noktada iki odağın sinyali toplanıyor. Bu fazladan 0,69λ'ya "kaynaşma payı" diyebiliriz.</p>
      ${worked('Çayır esmerinde disk yarıçapı r<sub>d</sub> = 2,2 mm, menzil λ = 0,5 mm. İki odak en fazla ne kadar uzakta olursa siyah diskler hâlâ birleşik olur?', ['Kaynaşma payı: 0,69 × λ = 0,69 × 0,5 ≈ 0,35 mm','Sınır: a < r<sub>d</sub> + 0,35 = 2,2 + 0,35 = 2,55 mm','a mesafenin yarısıydı; odaklar arası tam mesafe: 2 × 2,55 = 5,1 mm'], 'Odaklar 5,1 mm\'den yakınsa tek siyah disk, uzaksa iki ayrı benek görürüz. Tek tek yarıçapların toplamı 4,4 mm olduğu hâlde!')}
      ${deep('Teorem 1\'in tam kanıtı', w('fusion') + '<p>Kanıt üstel fonksiyon, logaritma ve iki değişkenli bir fonksiyonun kritik noktası fikrini kullanıyor. Ö1 bunu jüriye tahtada anlatabilmeli.</p>')}
      ${c('t2')}`},
    {h:'Çift pupil penceresi', html:`
      <p>Aynı kuralı iki kez kullanalım: bir kez <b>pupil</b> için, bir kez <b>disk</b> için. Pupil eşiği daha yüksek olduğundan pupiller daha kolay ayrılır. Arada öyle bir bölge var ki pupiller ayrılmış ama disk hâlâ tek parça: <b>çift pupilli benek</b> (Teorem 2).</p>
      <div class="formula">r<sub>p</sub> + 0,69λ  &lt;  a  &lt;  r<sub>d</sub> + 0,69λ</div>
      ${worked('Çayır esmeri için (r<sub>p</sub> = 0,44 mm, r<sub>d</sub> = 2,2 mm, λ = 0,5 mm) çift pupil hangi a değerlerinde oluşur?', ['Alt sınır: 0,44 + 0,35 = 0,79 mm','Üst sınır: 2,2 + 0,35 = 2,55 mm','Pencere: 0,79 mm < a < 2,55 mm','Genişlik: 2,55 − 0,79 = 1,76 mm. Bu da r<sub>d</sub> − r<sub>p</sub> = 2,2 − 0,44! (0,35\'ler birbirini götürdü.)'], 'a 0,79 mm\'den küçükse tek büyük pupil, 0,79–2,55 mm arası çift pupil, 2,55 mm\'den büyükse iki ayrı benek.')}
      ${key('Yeni bir öngörü','Pencerenin genişliği tek beneğin halka farkı r<sub>d</sub> − r<sub>p</sub>. Halka farkı büyük olan, yani beneği büyük kelebeklerde pencere geniş; bu yüzden çift pupil <b>daha sık</b> görülmeli. Bu, verilerle ayrıca sınanabilir.')}${c('t3')}`},
    {h:'Ölçek bilmeden çöz', html:`
      <p>Kaynaşmış bir diskte üç uzunluk ölçeriz: iki pupil arasındaki mesafenin yarısı <b>a</b>, diskin ortadaki "bel" yarı genişliği <b>w</b> ve diskin uzun eksen boyunca yarı uzunluğu <b>R</b>. Fotoğrafın ölçeğini bilmediğimiz için bunları birbirine böleriz: <b>w/a</b> ve <b>R/a</b>. Bölünce yakınlaştırmanın etkisi sadeleşir (Ünite 7'deki ölçek tuzağını hatırla).</p>
      ${key('İki bilinmeyenli iki denklem','Matematik derslerinden bildiğin durum: x + y = 10 ve x − y = 2 ise iki denklemden iki bilinmeyen bulunur (x = 6, y = 4). Burada da iki ölçülen oran (w/a, R/a) var ve bilinmeyen iki sayı var: odakların menzile göre uzaklığı (a/λ) ve diskin menzile göre büyüklüğü (r<sub>d</sub>/λ). İki oran, iki bilinmeyeni tek türlü belirler.','analogy')}
      <p>Aşağıda bunu kendin yap: iki kaydırıcıyla mavi model çizgisini fotoğraftaki diske oturt.</p>
      ${w('invert')}
      ${key('Peki model nasıl sınanıyor?','İki ölçümle iki bilinmeyen bulmak henüz bir sınama değil, yalnızca bir hesap. Sınama <b>üçüncü</b> ölçümle gelir. x + y = 10, x − y = 2 bulduktan sonra biri "x · y = 24" derse kontrol edebilirsin: 6 × 4 = 24, tutuyor! Bizde üçüncü ölçüm pupil boyutu: modelden hesaplanan pupil ile fotoğrafta ölçülen pupil tutuyorsa model sınavı geçer.')}
      ${deep('Önerme 3\'ün formülleri', `<div class="formula">w² = (r<sub>d</sub> + λ ln 2)² − a²      R = r<sub>d</sub> + λ · ln(2 cosh(a/λ))</div><p><b>cosh</b> ("hiperbolik kosinüs") bir kısaltma: cosh(x) = (e<sup>x</sup> + e<sup>−x</sup>) ÷ 2. Örneğin cosh(0) = 1, cosh(2) ≈ 3,76. w formülü Pisagor bağıntısından gelir: bel noktası iki odağa eşit uzaklıkta ve o uzaklık r<sub>d</sub> + λ ln 2 olmalı; dik üçgenin bir dik kenarı a, öbürü w. R formülü ise iki odaktan gelen sinyalin uzun eksen üzerindeki toplamından: e<sup>−(R−a)/λ</sup> + e<sup>−(R+a)/λ</sup> = e<sup>−R/λ</sup> · 2cosh(a/λ).</p>`)}
      ${c('t4')}`},
    {h:'Bilgisayarda doğrulama', html:`
      <p><code>sentetik_cift_odak.py</code>, iki odaklı denklemi bilgisayarda adım adım çözüp beş farklı odak uzaklığında beneği üretti:</p>
      <div class="tw"><table class="t"><thead><tr><th>a / λ</th><th>Kuralın öngörüsü</th><th>Disk kaç parça?</th><th>Pupil kaç parça?</th></tr></thead><tbody>
      <tr><td class="num">1,00</td><td>tek pupil, tek disk</td><td class="num">1</td><td class="num">1</td></tr>
      <tr><td class="num">1,67</td><td>çift pupil</td><td class="num">1</td><td class="num">2</td></tr>
      <tr><td class="num">2,33</td><td>çift pupil</td><td class="num">1</td><td class="num">2</td></tr>
      <tr><td class="num">3,00</td><td>çift pupil</td><td class="num">1</td><td class="num">2</td></tr>
      <tr><td class="num">4,00</td><td>iki ayrı benek</td><td class="num">2</td><td class="num">2</td></tr></tbody></table></div>
      <p>Beş durumun beşinde kural tuttu. Ters hesapta disk boyutu %1–2 hatayla bulundu. Menzil λ ise %15–24 düşük çıktı, çünkü bizim formül gerçek çözümün bir <b>yaklaşığı</b>. Gerçek veride daha doğru sürüm kullanılacak.</p>
      <p><b>Sınırlılık:</b> Kural iki odağın <b>eşit güçlü</b> olduğunu varsayıyor. Güçler farklıysa geçit ortadan kayar ve hesap bilgisayarla yapılmalı.</p>
      ${deep('Yaklaşık ve tam çözüm', '<p>Üstel formül m = S·e<sup>−r/λ</sup>, iki boyutlu denklemin tam çözümü olan K<sub>0</sub> (değiştirilmiş Bessel fonksiyonu) için uzak mesafelerde geçerli bir yaklaşıktır. K<sub>0</sub> odağa yakın yerlerde daha hızlı düşer; λ kestirimindeki sistematik sapma bundandır.</p>')}`}
  ],
  checks:{
    t1:{q:'a\'yı yavaşça büyütürken sırayla ne görüyorsun?', opts:['Tek pupil → çift pupil → iki ayrı benek','İki ayrı benek → çift pupil → tek pupil','Hep çift pupil','Benek kaybolur'], a:0, ex:'Önce pupiller, sonra diskler ayrılır, çünkü beyaz eşiği siyah eşiğinden yüksektir.'},
    t2:{q:'Disk yarıçapı 3 mm, λ = 1 mm. Siyah diskler hangi a değerinin altında birleşik kalır?', opts:['3,69 mm','3 mm','4 mm','6 mm'], a:0, ex:'a < 3 + 0,69 × 1 = 3,69 mm.'},
    t3:{q:'r<sub>d</sub> = 2,2 mm, r<sub>p</sub> = 0,44 mm ise çift pupil penceresinin genişliği kaç mm?', opts:['1,76','2,64','0,35','2,2'], a:0, ex:'Genişlik = r_d − r_p = 1,76 mm. 0,69λ iki uçta da aynı olduğu için sadeleşir.'},
    t4:{q:'Neden w ve R yerine w/a ve R/a kullanıyoruz?', opts:['Fotoğrafın ölçeği bilinmiyor; oranlar ölçekten bağımsız','Daha küçük sayılar olduğu için','a sıfır olduğu için','Kural öyle'], a:0, ex:'Ünite 7\'deki ölçek tuzağıyla aynı fikir: pikseldeki uzunluklar yakınlaştırmayla değişir, oranları değişmez.'}
  },
  quiz:{ id:'ikiodak', qs:[
    {q:'İki odaklı benekte bir noktadaki toplam sinyal nedir?', opts:['İki odaktan gelen sinyallerin toplamı','Büyük olanı','Çarpımı','Ortalaması'], a:0, ex:'İki lamba gibi: ışıklar toplanır.'},
    {q:'İki beneğin kaynaşıp kaynaşmayacağını anlamak için nereye bakarız?', opts:['İki odağın tam ortasındaki geçit noktasına','Odakların üstüne','Kanadın kenarına','Pupilin merkezine'], a:0, ex:'Geçitte sinyal eşiğin üstündeyse halka iki odağı birlikte sarar.'},
    {t:'num', q:'r<sub>d</sub> = 2,2 mm, λ = 0,5 mm. a\'nın hangi değerinin altında disk tek parçadır? (0,69 × λ kullan)', a:2.55, tol:0.02, unit:'mm', ex:'2,2 + 0,69 × 0,5 ≈ 2,55 mm.'},
    {t:'num', q:'Aynı kelebekte r<sub>p</sub> = 0,44 mm. Pupiller hangi a değerinin üstünde ayrı olur?', a:0.79, tol:0.02, unit:'mm', ex:'0,44 + 0,35 = 0,79 mm.'},
    {q:'Çift pupil penceresinin genişliği neye eşittir?', opts:['r<sub>d</sub> − r<sub>p</sub>','0,69 · λ','r<sub>d</sub> + r<sub>p</sub>','2a'], a:0, ex:'İki sınırdaki 0,69λ terimleri birbirini götürür.'},
    {q:'Kurala göre çift pupil hangi kelebeklerde daha sık beklenir?', opts:['Halka farkı (beneği) büyük olanlarda','Pupili olmayanlarda','En küçüklerde','Hiç fark yok'], a:0, ex:'Pencere genişliği r_d − r_p; büyükse çift pupil için daha geniş bir aralık var.'},
    {q:'İki oranla iki bilinmeyen bulduktan sonra model nasıl <b>sınanır</b>?', opts:['Üçüncü bir ölçümle: modelin hesapladığı pupil boyu, ölçülenle tutmalı','İki oranı tekrar ölçerek','Ölçeği tahmin ederek','Sınanamaz'], a:0, ex:'x + y = 10, x − y = 2 bulduktan sonra x · y = 24 kontrolü gibi.'}
  ]}
},
/* ============================== 7 ============================== */
{ id:'veri', no:7, title:'Veri ve ölçüm', short:'Veri', time:'50 dk',
  lead:'Hiç kelebek yakalamadan 97 kelebeği nasıl ölçtük? Vatandaş bilimi, lisanslar, bilgisayarla görme ve bir ölçek tuzağı.',
  goals:['iNaturalist ve vatandaş bilimini açıklayabilmek','Hangi lisanslı fotoğrafı kullanabileceğine karar verebilmek','Yarı-yükseklik yöntemiyle halka sınırının nasıl bulunduğunu anlatabilmek','Piksel ölçeğinde farkın neden yanıltıcı olduğunu, oranın neden güvenilir olduğunu gösterebilmek'],
  summary:['Veriler iNaturalist\'teki vatandaş bilimi fotoğraflarından; yalnız CC lisanslılar, fotoğrafçının adıyla.','Bilgisayar halka sınırını yarı-yükseklik yöntemiyle bulur.','508 fotoğraftan 97 kelebek analize girdi.','Fotoğraf ölçeği bilinmediği için fark yerine oran kullanılır; mm için kanat uzunluğu elle ölçülür.'],
  sections:[
    {h:'Vatandaş bilimi: iNaturalist', html:`
      <p><b>iNaturalist</b>, dünyanın her yerinden insanların doğada gördükleri canlıların fotoğraflarını paylaştığı bir sitedir. Başka kullanıcılar türü doğrular. Yeterince kişi aynı türde anlaşırsa gözlem <b>"araştırma düzeyi"</b> olur.</p>
      <p>Projemiz, <code>inat_cek.py</code> betiğiyle Türkiye'deki bütün araştırma düzeyi Çayır esmeri kayıtlarını çekti: <b>390 gözlem, 508 fotoğraf, 0–2144 m rakım</b>. Her kayda uydu verisinden (SRTM) rakım eklendi.</p>
      ${key('Neden önemli?','Eskiden bu kadar çok bölgeden veri toplamak yıllar sürerdi. Vatandaş bilimi sayesinde lise öğrencileri, Türkiye çapında bir popülasyon çalışması yapabiliyor.')}`},
    {h:'Lisans ve etik', html:`<p>Her fotoğrafın sahibi var. Yalnızca <b>Creative Commons (CC)</b> lisanslı fotoğrafları kullanabiliriz ve her fotoğrafçının adını raporun Ek A listesine yazarız.</p>${w('license')}
      <ul><li>Hiçbir kelebek yakalanmadı ya da zarar görmedi.</li><li>Konumlar raporda 1 km'ye yuvarlanır.</li><li>Yapay zekâ ile yazılan kod ve metinler raporda açıkça beyan edilir.</li></ul>${c('v1')}`},
    {h:'Bilgisayar beneği nasıl buluyor?', html:`
      <p><code>hat.py</code> ve <code>benek_olc.py</code> her fotoğrafta şunu yapar:</p>
      <ol><li><b>Aday bul:</b> koyu, yuvarlak, ortası parlak, çevresi turuncu lekeler.</li><li><b>Radyal profil:</b> merkezden dışarı 180 farklı yönde, her 0,5 pikselde parlaklığı ölç.</li><li><b>Sınırı bul:</b> parlaklığın iki komşu bölgenin tam ortasına indiği nokta. Buna <b>yarı-yükseklik</b> yöntemi denir.</li><li><b>Kontrol:</b> her fotoğraf için bir teşhis görseli üret; öğrenci gözüyle onaylar.</li></ol>
      ${w('profile')}${c('v2')}`},
    {h:'Fotoğraftan veriye: huni', html:`${w('funnel')}<p>Fotoğrafların yalnızca beşte birinden kullanılabilir veri çıktı. Bu normaldir: vatandaş fotoğrafları bilimsel ölçüm için çekilmiyor.</p>`},
    {h:'Ölçek tuzağı', html:`
      <p>Bilgisayar her şeyi <b>piksel</b> olarak ölçer. Ama kimi fotoğrafçı kelebeğe çok yaklaşmış, kimi uzaktan çekmiş. 1 mm, bir fotoğrafta 3 piksel, başka birinde 15 piksel olabilir.</p>
      ${w('pixel')}
      ${key('Yöntemin en önemli dersi','Piksel ölçeğinde fark, yakınlaştırmayla değişir; bu yüzden "fark sabit mi?" sorusu milimetre bilinmeden sorulamaz. Oran ise yakınlaştırmadan bağımsızdır. Bu yüzden proje <b>oran testini</b> kullanır ve ana analizde her fotoğrafta <b>kanat uzunluğunu elle ölçerek</b> milimetreye geçer.')}
      ${worked('Aynı kelebeğin iki fotoğrafı: Ayşe uzaktan çekmiş (pupil 2 px, disk 10 px), Mert iki kat yakından (pupil 4 px, disk 20 px). Fark ve oran ne?', ['Ayşe: fark = 10 − 2 = 8 px; oran = 2 ÷ 10 = 0,2','Mert: fark = 20 − 4 = 16 px; oran = 4 ÷ 20 = 0,2','Fark iki katına çıktı, oran aynı kaldı'], 'Aynı kelebek, farklı "farklar". Fotoğraflar arasında karşılaştırma yaparken yalnız oran güvenilir.')}
      <p>Bir de <b>nicemleme</b> sorunu var: piksel bölünemez. Uzak çekimlerde pupil yalnızca 1–2 piksel, yani ölçüm ±0,5 piksel hatalı olabilir. Bu küçük sayıda büyük göreli hata demek.</p>${c('v3')}`}
  ],
  checks:{
    v1:{q:'"Tüm hakları saklı" bir fotoğrafta güzel bir benek var. Ne yaparız?', opts:['Kullanmayız','Kullanırız, adını yazarız','Kırpıp kullanırız','Bulanıklaştırıp kullanırız'], a:0, ex:'İzin yoksa kullanım yok. Lisanssız fotoğraflar analizden çıkarıldı.'},
    v2:{q:'Pupil 235, disk 28 parlaklıkta. Yarı-yükseklik yöntemine göre pupil sınırında parlaklık kaçtır?', opts:['Yaklaşık 131','28','235','0'], a:0, ex:'(235 + 28) ÷ 2 ≈ 131.'},
    v3:{q:'Pupili 2 piksel olan bir fotoğrafta ±0,5 piksel hata, yüzde kaç göreli hatadır?', opts:['%25','%2','%0,5','%50'], a:0, ex:'0,5 ÷ 2 = 0,25. Küçük benekler bu yüzden zor.'}
  },
  quiz:{ id:'veri', qs:[
    {q:'iNaturalist\'te "araştırma düzeyi" ne demektir?', opts:['Türü topluluk tarafından doğrulanmış gözlem','Bir üniversitenin çektiği fotoğraf','Ücretli fotoğraf','Laboratuvar kaydı'], a:0, ex:'Yeterince kullanıcı tür adında anlaşınca gözlem araştırma düzeyine çıkar.'},
    {q:'CC-BY-NC lisanslı fotoğrafı okul yarışmasında kullanabilir miyiz?', opts:['Evet, fotoğrafçının adını vererek','Hayır, asla','Evet, ad vermeden','Yalnızca satarak'], a:0, ex:'NC = ticari olmayan. Yarışma ticari değil; BY = ad ver.'},
    {t:'num', q:'Disk 12,5 px, pupil 2,5 px. Oran r<sub>p</sub>/r<sub>d</sub> kaçtır?', a:0.2, tol:0.005, ex:'2,5 ÷ 12,5 = 0,2.'},
    {t:'num', q:'Aynı kelebek 2 kat yakından çekildi. Disk 25 px, pupil 5 px oldu. Fark kaç pikseldir?', a:20, tol:0.01, unit:'px', ex:'Önce 10 px\'ti, şimdi 20 px. Fark yakınlaştırmayla değişti; oran 0,2 kaldı.'},
    {q:'Halka sınırı yarı-yükseklik yönteminde nerede kabul edilir?', opts:['Parlaklığın iki komşu bölgenin tam ortasına indiği yerde','Parlaklığın sıfır olduğu yerde','En parlak noktada','Fotoğrafın kenarında'], a:0, ex:'Bulanık sınırlarda bile tutarlı bir nokta verir.'},
    {q:'Ana analizde ölçek sorunu nasıl çözülecek?', opts:['Her fotoğrafta kanat uzunluğu elle işaretlenip mm\'ye çevrilecek','Bütün fotoğraflar aynı boya getirilecek','Yalnız farklar kullanılacak','Fotoğrafçılara sorulacak'], a:0, ex:'L px ölçülür, tür/cinsiyet ortalaması L mm ile ölçek bulunur.'},
    {q:'508 fotoğraftan neden yalnız 97 birey analize girdi?', opts:['Lisans, tespit, geçerlilik ve tekil birey filtreleri','Bilgisayar yavaş olduğu için','Diğerleri başka türdü','Rastgele seçildi'], a:0, ex:'508 → 395 CC → 249 tespit → 154 geçerli → 97 birey.'}
  ]}
},
/* ============================== 8 ============================== */
{ id:'istatistik', no:8, title:'İstatistik ve Monte Carlo', short:'İstatistik', time:'65 dk',
  lead:'Gürültülü verilerden güvenilir sonuç çıkarmanın araçları: dağılım, korelasyon, p-değeri, gürültüyü ayırmak, güç ve bilgisayar deneyleri.',
  goals:['Ortalama, standart sapma ve değişim katsayısını (CV) hesaplayıp yorumlayabilmek','Spearman ρ\'nun sıralarla nasıl çalıştığını açıklayabilmek','p-değerini karıştırma testiyle açıklayabilmek','Oran saçılımını gerçek fark ve ölçüm gürültüsü olarak ayırabilmek','Güç ve yanlış alarm kavramlarını Monte Carlo ile anlatabilmek','ICC\'nin neyi ölçtüğünü söyleyebilmek'],
  summary:['CV = standart sapma ÷ ortalama: saçılımı yüzde olarak verir.','Spearman ρ sıralara bakar; −1 ile +1 arası.','p-değeri: hiç ilişki yokken bu kadar uç bir sonucun ne sıklıkla çıkacağı. p = 0,17 → anlamlı değil.','Oranın saçılımının büyük kısmı ölçüm hatası değil, gerçek fark (CV<sub>gerçek</sub> ≈ 0,17).','Monte Carlo: testleri cevabı bilinen sahte verilerle sınamak. ρ ve CV birlikte yalnız bir senaryoya uyuyor.'],
  sections:[
    {h:'Dağılımı ölçmek', html:`
      <p><b>Ortalama</b> bir grubun "tipik" değeridir. <b>Standart sapma (SS)</b> değerlerin ortalamadan tipik olarak ne kadar uzaklaştığıdır. <b>Değişim katsayısı CV = SS ÷ ortalama</b>, dağılımı yüzde olarak verir; böylece farklı büyüklükleri karşılaştırabilirsin.</p>
      ${w('stats')}
      <p>Gerçek 97 kelebekte oran 0,203 ± 0,039, yani <b>CV ≈ %19</b>. Bu sayının ne kadarı gerçek, ne kadarı ölçüm hatası? Aşağıda bunu ayıracağız.</p>${c('i1')}`},
    {h:'Korelasyon ve Spearman ρ', html:`
      <p><b>Korelasyon</b>, iki ölçümün birlikte değişip değişmediğini −1 ile +1 arasında bir sayıyla söyler. Projede <b>Spearman ρ</b> (ro) kullanıyoruz: değerlerin kendisine değil <b>sıralarına</b> bakar. Bu yüzden uç değerlere karşı daha dayanıklıdır.</p>
      ${w('spearman')}${c('i2')}`},
    {h:'Şans mı, gerçek mi? p-değeri', html:`
      <p>Gerçek veride ρ = −0,14 çıktı. Ama 97 kelebekle, hiç ilişki olmasa da şansla küçük bir ρ çıkabilir. Bunu test etmenin zekice bir yolu: oranları kelebekler arasında <b>rastgele karıştır</b>, ρ\'yu yeniden hesapla, 1000 kez tekrarla.</p>
      ${w('permutation')}
      ${key('p-değeri','"Hiç ilişki olmasaydı, en az bu kadar uç bir sonucu ne sıklıkla görürdük?" Genelde p < 0,05 ise sonuca <b>anlamlı</b> denir. Anlamlı olmamak "ilişki yok" demek değildir; "bu veriyle ilişki gösterilemedi" demektir.')}${c('i3')}`},
    {h:'Saçılım gerçek mi, gürültü mü?', html:`
      <p>Oranın %19'luk saçılımının iki kaynağı olabilir: kelebekler <b>gerçekten</b> farklı, ya da biz <b>yanlış ölçüyoruz</b>. Hangisi olduğunu anlamak için bir ipucu var: ölçüm hatası piksel cinsinden hep aşağı yukarı aynıdır (yaklaşık 0,2 piksel). 2 piksellik bir pupilde 0,2 piksel hata <b>%10</b> demek; 5 piksellik bir pupilde yalnızca <b>%4</b>. Yani gürültü <b>küçük beneklerde</b> daha çok saçılım yaratır, büyüklerde neredeyse kaybolur.</p>
      ${key('Fikir: büyük beneklere bak','Kelebekleri benek boyuna göre üç gruba ayır: küçük, orta, büyük. Saçılım gruptan gruba nasıl değişiyor? Eğer saçılımın tamamı ölçüm hatası olsaydı, büyük beneklerde saçılım neredeyse sıfıra inerdi. İnmiyorsa, kalan kısım <b>gerçek</b> farktır.','analogy')}
      ${worked('Ölçülen saçılım: küçük beneklerde %20, orta %19, büyük %17,5. Ne sonuç çıkar?', ['Küçükten büyüğe saçılım biraz azalıyor: gürültünün küçük bir payı var.','Ama büyük beneklerde bile %17,5 kalıyor; sıfıra yaklaşmıyor.','Aşağıdaki araçla çizgiyi üç noktaya oturtunca "sonsuz büyük benek" için kalan saçılım ≈ %17 çıkıyor.'], 'Saçılımın büyük kısmı gerçek: kelebeklerin oranları gerçekten farklı.')}
      ${key('İki gürültü nasıl toplanır?','İki bağımsız saçılım kaynağı, dik üçgenin kenarları gibi toplanır: toplam² = gerçek² + gürültü². Pisagor! Örneğin gerçek saçılım %17, gürültü %10 ise toplam √(17² + 10²) ≈ %19,7 olur, %27 değil.')}
      ${w('variance')}
      ${deep('Önerme 4b\'nin formülü', '<div class="formula">CV² ≈ CV²<sub>gerçek</sub> + τ² · (1/r<sub>p</sub>² + 1/r<sub>d</sub>²)</div><p>τ piksel cinsinden ölçüm hatası. Formül "delta yöntemi" denen birinci mertebe yaklaşımla çıkar. q = 1/r<sub>p</sub>² + 1/r<sub>d</sub>² dersek CV² ile q arasında doğrusal bir ilişki olur: kesme CV²<sub>gerçek</sub>, eğim τ². Üç gruptan üç nokta (q, CV²) bu doğruya oturtulur (rapor: CV<sub>gerçek</sub> = 0,169, τ = 0,21 px, uyum r = 0,92). Yalnız piksel yuvarlaması τ<sub>0</sub> = 0,5/√12 ≈ 0,144 px verir.</p>')}
      ${key('Raporun kendini düzelttiği yer','Raporun önceki sürümü (v2) ölçüm gürültüsünü 0,5 piksel <b>varsaymıştı</b> ve "saçılımın neredeyse tamamı gürültü" sonucuna varmıştı. v3 gürültüyü <b>veriden ölçtü</b>: τ ≈ 0,21 px. Bu, piksel yuvarlamasının tek başına verdiği 0,14 px\'e yakın. Sonuç tersine döndü: saçılımın büyük kısmı <b>gerçek</b>. Varsayım yerine ölçmek, bilimin en önemli alışkanlıklarından biri.')}${c('i5')}`},
    {h:'Monte Carlo: testi test etmek', html:`
      <p>Testlerimiz gerçek gürültü altında senaryoları ayırabilir mi? Bilgisayarda <b>cevabını bildiğimiz sahte kelebekler</b> üretiyoruz: her senaryoda 97 kelebek, veriden ölçülen gürültü (τ = 0,15 px), 400 tekrar. Bu araç projedeki <code>monte_carlo.py</code>\'nin tarayıcı sürümü.</p>
      ${w('montecarlo')}
      <ul><li><b>Güç:</b> Gerçekten bir etki varken testin onu yakalama olasılığı. Yalnız-S senaryosunda ≈ %97–99.</li><li><b>Yanlış alarm:</b> Etki yokken testin "var" deme olasılığı. Yalnız-λ senaryosunda ≈ %6 (beklenen %5\'e yakın).</li><li><b>İki ölçüt birlikte:</b> ρ ve oran CV\'sinin <b>ikisi birden</b> gerçek veriye yalnız bir senaryoda uyuyor.</li></ul>
      ${key('Monte Carlo\'nun bulduğu sürpriz','Ön analizde piksel ölçeğinde bir model karşılaştırması yapılmıştı. (AIC denen bu yöntem, birkaç modelden hangisinin veriye en iyi uyduğunu puanlar.) Sonuç "orantılı model açık ara kazandı" demişti. Monte Carlo bu testin <b>her senaryoda</b> orantılı modeli seçtiğini gösterdi (%82–100); yani o sonuç bir yöntem yanılgısıydı.')}${c('i4')}`},
    {h:'Ölçüm güvenilirliği: ICC', html:`
      <p>İki kişi aynı fotoğrafı ölçerse aynı sayıyı bulur mu? <b>ICC</b> (sınıf içi korelasyon katsayısı) bunu 0 ile 1 arasında ölçer. Hedefimiz <b>ICC > 0,8</b>.</p>${w('icc')}`}
  ],
  checks:{
    i1:{q:'Ortalama 0,20, standart sapma 0,04 ise CV kaçtır?', opts:['%20','%4','%5','%80'], a:0, ex:'0,04 ÷ 0,20 = 0,20.'},
    i2:{q:'"Bir uç değer" ayarında Spearman 1 çıkarken Pearson neden daha düşük?', opts:['Pearson değerlerin büyüklüğünden etkilenir; Spearman yalnız sıralara bakar','Spearman hatalıdır','Pearson sıralara bakar','İkisi aslında aynıdır'], a:0, ex:'Uç değer Pearson\'ı doğrusal çizgiden uzaklaştırır; sıralamada ise hâlâ en büyük, yani sıralar tam uyumlu.'},
    i3:{q:'p = 0,17 için en doğru yorum hangisi?', opts:['Bu büyüklükte bir ρ şansla da sık çıkar; ilişki gösterilemedi','İlişki kesinlikle yok','İlişki %83 kesin','Ölçümler %17 hatalı'], a:0, ex:'Anlamlı olmamak, yokluğun kanıtı değildir.'},
    i5:{q:'Varyans ayrışımında küçük beneklerin CV\'si neden daha büyük?', opts:['Aynı piksel hatası küçük yarıçapta göreli olarak daha büyük','Küçük kelebekler daha dağınık','Küçük benekler daha çok fotoğraflanıyor','Rastlantı'], a:0, ex:'τ² · (1/r_p² + 1/r_d²): yarıçap küçükse bu terim büyür.'},
    i4:{q:'Monte Carlo\'da "yalnız λ" senaryosu ρ\'da gerçek veriye uyuyor ama yine de elendi. Neden?', opts:['Oran CV\'si ≈ 0,09; gerçekte 0,19','Pupiller kayboluyor','ρ çok pozitif','Hiç benek çıkmıyor'], a:0, ex:'Yalnız λ değişseydi oran herkeste aynı olurdu; ölçülen saçılım gerçek veridekinin yarısı kadar kalırdı.'}
  },
  quiz:{ id:'istatistik', qs:[
    {t:'num', q:'2, 4 ve 6 sayılarının ortalaması kaçtır?', a:4, tol:0.001, ex:'(2+4+6) ÷ 3 = 4.'},
    {q:'Standart sapma neyi ölçer?', opts:['Değerlerin ortalamadan tipik uzaklığını','En büyük değeri','Veri sayısını','Ortalamanın karesini'], a:0, ex:'Dağılımın genişliği.'},
    {q:'Spearman ρ = 0,05 ne anlatır?', opts:['Neredeyse hiç ilişki yok','Güçlü pozitif ilişki','Güçlü negatif ilişki','Ölçüm hatası'], a:0, ex:'Sıfıra yakın = ilişki yok.'},
    {q:'Karıştırma testinde oranları kelebekler arasında karıştırmak neyi taklit eder?', opts:['Oran ile benek boyu arasında hiçbir bağ olmadığı bir dünyayı','Ölçüm hatasını','Daha çok kelebeği','Fotoğraf yakınlaştırmasını'], a:0, ex:'Karıştırma eşleşmeyi bozar; "ilişki yok" varsayımı altında ρ\'nun dağılımını verir.'},
    {q:'CV² ile q = 1/r<sub>p</sub>² + 1/r<sub>d</sub>² arasındaki doğrunun <b>kesmesi</b> neyi verir?', opts:['Gerçek bireysel saçılımı (CV²<sub>gerçek</sub>)','Ölçüm gürültüsünü','Kelebek sayısını','Ortalama oranı'], a:0, ex:'q = 0, sonsuz büyük benek demek; orada gürültünün katkısı sıfır, geriye gerçek saçılım kalır.'},
    {q:'Monte Carlo\'da bir senaryo 400 denemenin hepsinde ρ\'yu +0,3 ile +0,6 arasında veriyor. Gerçek veride ρ = −0,14. Ne sonuç çıkarırsın?', opts:['Bu senaryo gerçek veriyle uyumsuz; −0,14 onun asla üretmediği bir değer','Bu senaryo doğru','Gerçek veri hatalı','Daha çok deneme yapmak gerekir'], a:0, ex:'Monte Carlo, bir senaryo doğru olsaydı hangi sonuçları göreceğimizi gösterir. Gözlenen değer o aralığın tamamen dışındaysa senaryo elenir.'},
    {q:'İki senaryo da ρ ≈ 0 veriyor. Birinde oran CV\'si 0,09, ötekinde 0,19. Gerçekte CV 0,19. Hangisi uyumlu ve neden?', opts:['CV\'si 0,19 olan; çünkü iki ölçütün ikisi de tutmalı','CV\'si 0,09 olan; daha az gürültülü','İkisi de; ρ aynı','Hiçbiri'], a:0, ex:'Bir senaryoyu kabul etmek için gözlenen her ölçüyü açıklaması gerekir. ρ ikisinde de uyuyor; CV yalnız birinde.'},
    {q:'Bir testin "gücü" nedir?', opts:['Gerçek bir etkiyi yakalama olasılığı','Hesaplama hızı','Yanlış alarm olasılığı','Veri sayısı'], a:0, ex:'Yalnız-S senaryosunda oran testinin gücü ≈ %97–99.'},
    {q:'v2 ile v3 arasındaki en önemli fark nedir?', opts:['v3 ölçüm gürültüsünü varsaymak yerine veriden ölçtü; saçılımın çoğunun gerçek olduğu çıktı','v3 daha çok kelebek ölçtü','v3 başka tür inceledi','v2 hiç Monte Carlo kullanmadı'], a:0, ex:'τ varsayımı 0,5 px idi; veriden 0,21 px çıktı.'},
    {q:'Ön analizde ölçek vekili için ICC = 0,30 bulundu. Bu ne demek?', opts:['Aynı kelebeğin farklı fotoğrafları çok farklı değerler veriyor; ölçüm güvenilmez','Ölçüm mükemmel','Kelebeklerin %30\'u ölçüldü','Hata %30'], a:0, ex:'Hedef 0,8. Bu yüzden elle kanat uzunluğu ölçümüne geçildi.'}
  ]}
},
/* ============================== 9 ============================== */
{ id:'bulgular', no:9, title:'Bulgular ve yorum', short:'Bulgular', time:'40 dk',
  lead:'97 gerçek kelebek ne dedi? Ne kadar emin olabiliriz? Hangi sorular hâlâ açık?',
  goals:['Ön bulguyu üç cümleyle anlatabilmek','Dört senaryodan üçünün neden elendiğini gerekçeleriyle açıklayabilmek','Bulgunun Monteiro vd. (1997) ile ilişkisini söyleyebilmek','Çift pupil ölçümlerinin neden asıl sınav olduğunu anlatabilmek','Çalışmanın sınırlılıklarını sayabilmek'],
  summary:['Dört senaryodan üçü elendi; yalnız "λ + pupil eşiği" uyumlu.','Ön bulgu: benek boyutu menzilden (λ), halka oranı eşiklerden geliyor.','Bu, Monteiro vd. (1997)\'nin laboratuvar bulgusunun doğadaki karşılığı.','Asıl sınav çift pupilli benek ölçümleri; henüz yapılmadı.','Sınırlılıkları açıkça söylemek projeyi güçlendirir.'],
  sections:[
    {h:'Gerçek veri', html:`${w('realdata')}${c('b1')}`},
    {h:'Dört senaryonun durumu', html:`
      <div class="tw"><table class="t"><thead><tr><th>Senaryo</th><th>Beklenen ρ</th><th>Beklenen CV</th><th>Gözlenen</th><th>Karar</th></tr></thead><tbody>
      <tr><td><span class="s">Yalnız S</span></td><td class="num">+0,45</td><td class="num">0,39</td><td class="num" rowspan="4">ρ = −0,14<br>CV = 0,19</td><td style="color:var(--bad)"><b>✗ ρ ve CV uymuyor</b></td></tr>
      <tr><td><span class="l">Yalnız λ</span></td><td class="num">−0,01</td><td class="num">0,09</td><td style="color:var(--bad)"><b>✗ CV çok küçük</b></td></tr>
      <tr><td><b style="color:var(--warn)">Pupil sabit</b></td><td class="num">−0,53</td><td class="num">0,22</td><td style="color:var(--bad)"><b>✗ ρ çok negatif</b></td></tr>
      <tr><td><b style="color:var(--ok)">λ + pupil eşiği</b></td><td class="num">−0,01</td><td class="num">0,19</td><td style="color:var(--ok)"><b>✓ uyumlu</b></td></tr></tbody></table></div>
      ${worked('Tablodan bir satır okuyalım: "Pupil sabit".', ['Bu senaryo doğru olsaydı Monte Carlo\'da ρ hep −0,53 civarında çıkardı.','Gerçek veride ρ = −0,14.','Monte Carlo bu senaryoda −0,14 kadar yüksek bir ρ\'yu neredeyse hiç üretmiyor (test %100 "anlamlı negatif" buluyor).'], 'Gerçek veri, "pupil sabit" doğru olsaydı göreceğimiz şeye benzemiyor: senaryo elenir. Diğer satırları da aynı yolla oku.')}
      <p><b>Yalnız S neden değil?</b> Pozitif bir ρ beklenirdi (%97–99 güçle); gözlenen negatif. Ayrıca kelebeklerin altıda birinde pupilsiz benek öngörür.</p>
      <p><b>Pupil sabit neden değil?</b> ρ ≈ −0,53 beklenirdi ve test bunu %100 yakalardı; gözlenen −0,14 çok uzakta.</p>
      <p><b>Yalnız λ neden değil?</b> ρ uyuyor, ama varyans ayrışımı oranın gerçekten değiştiğini gösterdi (CV<sub>gerçek</sub> ≈ 0,17). Yalnız λ değişseydi oran herkeste aynı olurdu.</p>
      ${key('Ön bulgu, üç cümlede','1) Çayır esmerinde benek <b>boyutu</b>, kelebekten kelebeğe sinyalin menzili λ üzerinden değişiyor gibi görünüyor. 2) Halka <b>oranı</b> ise boyuttan bağımsız biçimde, eşikler üzerinden değişiyor. 3) Bu, Monteiro ve arkadaşlarının (1997) laboratuvarda bulduğu iş bölümünün ("boyut → sinyal, oran → eşik") doğal popülasyondaki, hiçbir kelebeğe dokunmadan elde edilmiş karşılığı.')}${c('b2')}`},
    {h:'Asıl sınav: çift pupilli benekler', html:`
      <p>Tek benek sonucu güçlü bir ipucu, ama gürültülü bir ölçek vekiliyle alındı. Projenin matematiksel çekirdeği olan Teorem 1–2 ve Önerme 3 ise henüz gerçek kelebeklerde sınanmadı. Sıradaki adımlar:</p>
      <ol><li>Çift pupilli fotoğrafları işaretlemek (hedef n ≈ 40): iki pupil merkezi (a), bel (w) ve eksen uçları (R).</li><li>Her kelebekten ölçek bilmeden a/λ ve r<sub>d</sub>/λ bulmak; pupil boyutuyla modeli sınamak.</li><li>Bulunan r<sub>d</sub>/λ değerlerini tek pupilli kelebeklerinkiyle karşılaştırmak.</li><li>Teorem 2\'nin öngörüsü: büyük benekli kelebeklerde çift pupil daha sık mı?</li></ol>`},
    {h:'Literatürle bağlantı', html:`<ul><li><b>Monteiro vd. (1997):</b> <i>Bicyclus</i>\'ta benek boyutu odak sinyali, halka oranları eşikler üzerinden kalıtılıyor. Bizim bulgumuzla aynı iş bölümü.</li><li><b>Monteiro vd. (2001):</b> Birleşmiş beneklerin dış hattı iki sinyalin toplamına uyuyor (sayısal). Biz bunun koşulunu kapalı formülle (Teorem 1) türettik.</li><li><b>Palmer, McKenna ve Nijhout (2019)</b>, <b>Mowbray vd. (2024)</b>: Benekler kanat boyuyla orantılı büyüyor. Boyutun λ üzerinden değişmesiyle tutarlı.</li><li><b>Otaki (2011):</b> Tek sinyalli modele itiraz. Çift pupil sınaması bu tartışmaya doğrudan katkı verecek.</li></ul>`},
    {h:'Sınırlılıklar', html:`<ol><li>Üstel formül tam çözüm K<sub>0</sub>\'ın yaklaşığı; λ kestirimini düşük çıkarır (sentetik testte %15–24).</li><li>Kaynaşma teoremi iki odağın eşit güçlü olduğunu varsayar.</li><li>Pupil yalnızca 1–7 piksel; çift pupil ölçümleri yüksek çözünürlüklü fotoğraflarla sınırlı kalmalı.</li><li>Otomatik ölçek vekilinin tekrarlanabilirliği düşük (ICC 0,30); mm ölçeği için elle kanat uzunluğu gerekli.</li><li>Model kanadın büyümediğini varsayar.</li><li>Fotoğrafların açısı değişken; cinsiyet şimdilik vekille belirlendi; rakım, mevsim ve enlem iç içe.</li></ol>
      ${key('Jüriye karşı dürüstlük','Sınırlılıkları saklamak yerine açıkça söylemek, jürinin gözünde projeyi güçlendirir. "Bunu biliyoruz ve şöyle çözmeyi planlıyoruz" cümlesi en iyi cevaptır. v2\'den v3\'e kendi hatamızı düzeltmemiz de anlatılmaya değer bir hikâye.','analogy')}${c('b3')}`}
  ],
  checks:{
    b1:{q:'Rakım grafiğinde eğim pozitif ama p = 0,18. Doğru yorum hangisi?', opts:['Küçük bir etki olabilir ama bu veriyle gösterilemedi','Rakım beneği kesinlikle büyütüyor','Rakımın hiçbir etkisi yok','Veri yanlış'], a:0, ex:'Anlamlı değil; ölçek gürültüsü küçük etkileri gizleyebilir.'},
    b2:{q:'"Yalnız λ" senaryosunu eleyen kanıt hangisi?', opts:['Varyans ayrışımı: oranın gerçek saçılımı ≈ 0,17','ρ\'nun pozitif çıkması','Pupilsiz kelebekler','Rakım etkisi'], a:0, ex:'Yalnız λ değişseydi oran herkeste aynı olurdu; ama gerçek saçılım belirgin.'},
    b3:{q:'Hangisi bu çalışmanın bir sınırlılığı DEĞİLDİR?', opts:['Kelebeklerin yakalanıp öldürülmesi','Pupilin az pikselle ölçülmesi','Kaynaşma teoreminin eşit güçlü odak varsayımı','Üstel yaklaşımın λ\'yı düşük kestirmesi'], a:0, ex:'Hiç kelebek yakalanmadı.'}
  },
  quiz:{ id:'bulgular', qs:[
    {q:'Raporda neden "kanıtladık" yerine "uyumlu" ya da "destekliyor" deriz?', opts:['Veri bir açıklamayla uyuşabilir ama başka açıklamaları tamamen dışlamaz; ölçümler de henüz bitmedi','Kanıtlamak yasak olduğu için','Jüri sevmediği için','Matematik kullanmadığımız için'], a:0, ex:'97 kelebekle ve gürültülü bir ölçekle alınan bir sonuç güçlü bir ipucudur, kesin kanıt değil.'},
    {q:'Gözlenen ρ = −0,14. Yalnızca bu sayıya bakarak hangi iki senaryo zayıflar?', opts:['Yalnız S (+0,45 beklenirdi) ve pupil sabit (−0,53 beklenirdi)','Yalnız λ ve λ + eşik','Hepsi','Hiçbiri'], a:0, ex:'Sıfıra yakın bir ρ, güçlü pozitif ya da güçlü negatif ilişki bekleyen senaryolarla uyuşmaz.'},
    {t:'match', q:'Her senaryoyu eleyen (ya da destekleyen) kanıtla eşleştir.', pairs:[['Yalnız S','Pozitif ρ ve pupilsiz benek beklenirdi'],['Pupil sabit','ρ ≈ −0,53 beklenirdi'],['Yalnız λ','Oran saçılımı çok küçük kalırdı'],['λ + pupil eşiği','ρ ve CV ikisi de uyuyor']], ex:'İki ölçüt (ρ ve CV) birlikte tek bir senaryoyu bırakıyor.'},
    {q:'Ön bulguya göre benek boyutu ve halka oranı nelerden etkileniyor?', opts:['Boyut menzil λ\'dan, oran eşiklerden','Boyut güç S\'den, oran λ\'dan','İkisi de yalnız λ\'dan','İkisi de rakımdan'], a:0, ex:'Monteiro vd. (1997)\'nin iş bölümüyle aynı.'},
    {q:'Projenin "asıl sınavı" neden çift pupilli benekler?', opts:['Teorem 1–2 ve Önerme 3 ölçek bilmeden modeli doğrudan sınamaya izin veriyor','Daha güzel oldukları için','Daha çok fotoğrafları olduğu için','Tek benekler ölçülemediği için'], a:0, ex:'İki oranla iki bilinmeyen, üçüncü ölçümle sınama: aşırı belirli sistem.'},
    {q:'Rakım ile göreli benek boyu arasındaki ilişki için doğru ifade hangisi?', opts:['Anlamlı değil (p = 0,18)','Güçlü ve anlamlı','Negatif ve anlamlı','Hiç incelenmedi'], a:0, ex:'+0,018 / 1000 m, p = 0,18.'}
  ]}
},
/* ============================== 10 ============================== */
{ id:'gorev', no:10, title:'Senin görevin', short:'Görevler', time:'60 dk',
  lead:'Artık projeyi anlıyorsun. Şimdi sıra senin ellerinle yapacağın ölçümlerde, raporda ve jüri karşısında.',
  goals:['Kanat uzunluğunu ve benek yarıçapını fotoğraftan ölçüp mm\'ye çevirebilmek','Dahil etme ölçütlerini uygulayabilmek','Kod dosyalarının ne yaptığını ve sırasını bilmek','Rolüne ait görevleri takip edebilmek','En olası jüri sorularına cevap verebilmek'],
  summary:['mm/piksel = L<sub>mm</sub> ÷ L<sub>px</sub>; her uzunluk bu sayıyla çarpılarak mm\'ye çevrilir.','Dahil etme: dik açı, keskin, benek bütün, disk ≥ 6 piksel.','Çift pupillilerde a, w, R işaretlenir; yalnız oranlar kullanılır.','İki kişi aynı 30 fotoğrafı ayrı ayrı ölçer; hedef ICC > 0,8.','Kendi ellerinle yapmadığın ölçüm "bulgu" olarak sunulmaz.'],
  sections:[
    {h:'Ölçüm atölyesi', html:`
      <p>Ana analizde her fotoğrafta <b>kanat uzunluğunu (L)</b> elle işaretleyeceksin. Sonra piksel ölçümlerini milimetreye çevireceksin:</p>
      <div class="formula">1 px = L<sub>mm</sub> ÷ L<sub>px</sub>     r<sub>mm</sub> = r<sub>px</sub> × (L<sub>mm</sub> ÷ L<sub>px</sub>)</div>
      <p>L<sub>mm</sub> olarak tür ve cinsiyet ortalaması kullanılır (erkek ~22 mm, dişi ~25 mm). Aşağıda üç fotoğrafla prova yap. Hedef: L hatası %5'in altında.</p>
      ${worked('Bir dişi kelebeğin fotoğrafında L = 180 px ölçtün, disk yarıçapı 16 px. Disk kaç mm?', ['Dişi kanat ortalaması: L<sub>mm</sub> = 25 mm','1 px = 25 ÷ 180 ≈ 0,139 mm','Disk = 16 × 0,139 ≈ <b>2,22 mm</b>','Kontrol: Çayır esmerinde disk ~2 mm civarında; sonuç mantıklı.'], 'Her sonucu "mantıklı mı?" diye kontrol et. 22 mm ya da 0,2 mm çıksaydı bir yerde hata yaptığını anlardın.')}
      ${w('measure')}${c('g1')}`},
    {h:'Dahil etme ölçütleri', html:`<p>Protokole göre bir fotoğraf ancak şu koşullarda veri setine girer: kanat <b>dik açıyla</b> görünüyor (elipslik < 1,15), benek <b>bütün</b>, <b>aşınma yok</b>, görüntü <b>keskin</b> ve disk en az <b>6 piksel</b>.</p>${w('include')}`},
    {h:'Çift pupilli benekleri ölçmek', html:`<p>Çift pupilli fotoğraflar ayrı bir kümeye alınır (hedef n ≈ 40). Her birinde tıklama aracıyla şunlar işaretlenir:</p>
      <ol><li><b>İki pupil merkezi</b> → aralarındaki uzaklığın yarısı a</li><li><b>Diskin bel noktaları</b> (iki pupilin tam ortasında, diskin üst ve alt kenarı) → w</li><li><b>Diskin eksen uçları</b> (iki pupilden geçen çizginin diskten çıktığı yerler) → R</li></ol>
      <p>Hepsi piksel; ama yalnızca <b>w/a</b> ve <b>R/a</b> oranları kullanılacağı için ölçek gerekmez. Dahil etme: dik açı (elipslik < 1,15), disk bütün, iki pupil belirgin. Bu ölçümler de iki kişi tarafından ayrı ayrı yapılır.</p>`},
    {h:'İki ölçücü çalışması', html:`<ol><li>Ö2 ve Ö3 aynı 30 fotoğrafı <b>birbirinden habersiz</b> ölçer.</li><li>ICC hesaplanır (Ünite 8'deki araç). Hedef > 0,8.</li><li>Uyuşmayan fotoğraflar birlikte incelenir: "Tabanı tam olarak nereden alıyoruz?" gibi belirsizlikler protokole yazılır (protokol v2).</li><li>Sonra bütün fotoğraflar ölçülür.</li></ol>
      ${key('Altın kural','Kendi ellerinle yapmadığın hiçbir ölçüm "bulgu" olarak sunulmaz. Otomatik ölçümler öğrenci doğrulamasından geçmeden veri setine girmez.')}`},
    {h:'Kod haritası', html:`${w('codemap')}<p>Kodu yazmak zorunda değilsin, ama <b>ne yaptığını</b> anlatabilmelisin. Ö1, <code>kanat_turing.py</code>'yi satır satır anlamakla sorumlu.</p>`},
    {h:'Görev listem', html: w('tasks')},
    {h:'Rapor yazarken', html:`<ul><li>Raporun güncel hali <code>ARASTIRMA_RAPORU_v3.md</code>. <b>[DOLDURULACAK]</b> yazan yerler sizin ölçümlerinizle dolacak.</li><li>Her bölüm tek bir öğrencinin sorumluluğunda; ama herkes her bölümü okur.</li><li>Sayıları her zaman birimiyle yaz (mm, px, m).</li><li>"Kanıtladık" yerine "destekliyor", "uyumlu" gibi dikkatli ifadeler kullan.</li><li>Ortak çalışma günlüğüne her hafta tarih–yapılan–karar yaz. Jüri "süreci" sorduğunda bunu gösterirsin.</li></ul>`},
    {h:'Jüri provası', html:`<p>Her soruyu önce yüksek sesle kendin cevapla, sonra karta dokunup karşılaştır.</p>${w('jury')}`}
  ],
  checks:{
    g1:{q:'L = 220 px ve kelebek erkek (L = 22 mm). Disk yarıçapı 20 px ise kaç mm\'dir?', opts:['2 mm','20 mm','0,2 mm','4,4 mm'], a:0, ex:'1 px = 22/220 = 0,1 mm; 20 × 0,1 = 2 mm.'}
  },
  quiz:{ id:'gorev', qs:[
    {t:'num', q:'L = 250 px, kelebek dişi (L = 25 mm). 1 piksel kaç mm\'dir?', a:0.1, tol:0.002, unit:'mm', ex:'25 ÷ 250 = 0,1 mm.'},
    {t:'num', q:'Aynı fotoğrafta disk yarıçapı 24 px ise kaç mm\'dir?', a:2.4, tol:0.02, unit:'mm', ex:'24 × 0,1 = 2,4 mm.'},
    {q:'Kanat yandan çekilmiş, benek elips görünüyor. Ne yaparsın?', opts:['Fotoğrafı reddederim','Büyük ekseni ölçerim','Küçük ekseni ölçerim','Ortalamasını alırım'], a:0, ex:'Elipslik > 1,15 ise dahil etme ölçütü karşılanmaz.'},
    {q:'İki ölçücü çalışmasında neden birbirinizden habersiz ölçmelisiniz?', opts:['Birbirinizi etkilerseniz uyum yapay olarak yüksek çıkar','Daha hızlı olduğu için','Kural öyle olduğu için','Fotoğraflar farklı olduğu için'], a:0, ex:'Bağımsız ölçüm, gerçek güvenilirliği gösterir.'},
    {t:'match', q:'Dosyaları işleriyle eşleştir.', pairs:[['inat_cek.py','iNaturalist\'ten kayıt çeker'],['hat.py','Fotoğraflarda beneği ölçer'],['monte_carlo.py','Testleri sahte verilerle sınar'],['kanat_turing.py','Desen simülasyonları']], ex:'Çalıştırma sırası: kanat_turing → inat_cek → hat → analiz → monte_carlo.'},
    {q:'Jüri "Yapay zekâ mı yaptı?" diye sorarsa en doğru cevap hangisi?', opts:['Kod danışman gözetiminde YZ desteğiyle yazıldı ve beyan edildi; ölçüm doğrulaması ve etiketler bizim elimizle yapıldı','Hayır, hiç kullanmadık','Evet, her şeyi o yaptı','Bilmiyoruz'], a:0, ex:'Dürüst beyan, rapor §5.7\'de de var.'}
  ]}
},
/* ============================== 11 ============================== */
{ id:'final', no:11, title:'Final ve karne', short:'Final', time:'30 dk',
  lead:'Bütün ünitelerden karışık 16 soru. Ön testteki puanınla karşılaştır ve hangi üniteleri tekrar etmen gerektiğini gör.',
  goals:['Bütün üniteleri birlikte kullanabilmek','Gelişimini ön testle karşılaştırmak','Zayıf kaldığın konuları belirlemek'],
  sections:[
    {h:'Final sınavı', html:`<p>Sorular bütün ünitelerden rastgele seçilir. "Yeniden dene" dediğinde yeni sorular gelir. Final puanının en iyisi karneye yazılır.</p>`}
  ],
  after:{h:'Karne', html: w('karne') + `<p>Bütün üniteler yeşilse ve finalde %80'in üstündeysen jüri karşısına çıkmaya hazırsın. Son bir öneri: projeyi hiç bilmeyen birine (ailene, bir arkadaşına) 5 dakikada anlat. Anlatamadığın yer, tekrar etmen gereken yerdir.</p>`},
  quiz:{ id:'final', tag:'Final', pass:70, final:true }
}
];

/* Sembol kartı */
TK.SYMS = [
 ['S','Odağın salgıladığı sinyalin gücü','birimsiz; örnek 81,5'],
 ['λ (lamda)','Sinyalin menzili: ne kadar uzağa ulaştığı. λ = √(D/γ)','mm; örnek 0,5 mm'],
 ['D','Yayılma hızı (difüzyon katsayısı)','mm²/s'],
 ['γ (gama)','Sönme hızı','1/s'],
 ['m(r)','Odaktan r uzaklıktaki sinyal miktarı. m = S · e<sup>−r/λ</sup>','birimsiz'],
 ['θ (teta)','Eşik: bir rengin seçilmesi için sinyalin aşması gereken değer. θ₁ beyaz, θ₂ siyah eşiği','birimsiz; örnek θ₂ = 1, θ₁ ≈ 33,8'],
 ['r<sub>p</sub>','Pupil (beyaz) yarıçapı','mm ya da px; örnek 0,44 mm'],
 ['r<sub>d</sub>','Disk (siyah) yarıçapı','mm ya da px; örnek 2,2 mm'],
 ['r<sub>p</sub>/r<sub>d</sub>','Oran: pupil ÷ disk. Yakınlaştırmadan etkilenmez','örnek 0,20'],
 ['r<sub>d</sub> − r<sub>p</sub>','Fark: siyah halkanın kalınlığı. Yakınlaştırmayla değişir','örnek 1,76 mm'],
 ['L','Ön kanat uzunluğu (tabandan apekse)','♂ ~22 mm, ♀ ~25 mm'],
 ['s','Benekten kanat kenarına uzaklık; ön analizde kullanılan kaba ölçek','px'],
 ['e','Doğal sabit ≈ 2,718','—'],
 ['ln','Doğal logaritma: "e\'yi kaç kez çarpmalıyım?"','ln(e) = 1'],
 ['a','İki odak arasındaki mesafenin yarısı','mm ya da px'],
 ['w','Kaynaşmış diskin ortadaki bel yarı genişliği','mm ya da px'],
 ['R','Kaynaşmış diskin uzun eksen boyunca yarı uzunluğu','mm ya da px'],
 ['ρ (ro)','Spearman korelasyonu: iki ölçüm birlikte artıyor mu? −1 ile +1 arası','gerçek veride −0,14'],
 ['p','p-değeri: sonucun şansla çıkma sıklığı. 0,05\'ten küçükse "anlamlı"','gerçek veride 0,17'],
 ['CV','Değişim katsayısı = standart sapma ÷ ortalama','gerçek oran CV\'si 0,19'],
 ['τ (tau)','Piksel cinsinden ölçüm hatası','≈ 0,2 px'],
 ['n','Örneklem büyüklüğü (kaç kelebek)','97'],
 ['ICC','İki ölçücünün uyumu, 0 ile 1 arası','hedef > 0,8']
];
/* Sözlük */
TK.GLOSS = [
 ['Göz beneği','Kanattaki halkalı benek. Ortası beyaz pupil, çevresi siyah disk.'],
 ['Pupil','Göz beneğinin ortasındaki beyaz nokta.'],
 ['Disk','Pupili çevreleyen siyah bölge.'],
 ['Apeks','Ön kanadın en uç noktası.'],
 ['Kanat tabanı','Kanadın gövdeye bağlandığı yer.'],
 ['Kosta','Ön kanadın üst (ön) kenarı.'],
 ['Odak','Beneğin ortasında sinyal salgılayan hücre grubu.'],
 ['Morfogen (sinyal)','Hücrelere hangi rengi seçeceklerini "söyleyen", odaktan yayılan kimyasal.'],
 ['Difüzyon (yayılma)','Moleküllerin rastgele hareketle çok yoğun yerden az yoğun yere dağılması.'],
 ['Sönme (bozunma)','Sinyalin zamanla parçalanıp azalması.'],
 ['Menzil','Sinyalin anlamlı miktarda ulaşabildiği uzaklık; λ ile gösterilir.'],
 ['Kararlı durum (denge)','Üretim, yayılma ve sönmenin dengelendiği, sinyalin artık değişmediği durum.'],
 ['Eşik','Bir rengin seçilmesi için sinyalin aşması gereken değer.'],
 ['Eşik kuralı','Her hücrenin, sinyali eşiklerle karşılaştırıp renk seçmesi.'],
 ['Turing deseni','Alan Turing\'in 1952\'de gösterdiği fikir: farklı hızda yayılan iki kimyasal kendiliğinden desen oluşturabilir.'],
 ['Gray–Scott modeli','İki kimyasallı, yalnız iki sayı (F, k) değiştirilerek benek, şerit ya da labirent üreten desen modeli.'],
 ['Üstel azalma','Her eşit adımda aynı oranda küçülme.'],
 ['Logaritma','Üs almanın tersi: "tabanı kaç kez çarparsam bu sayıyı elde ederim?"'],
 ['Doğal logaritma (ln)','Tabanı e olan logaritma.'],
 ['Logaritmik eksen','Her çizginin bir öncekinin 10 katı olduğu eksen. Üstel eğriyi düz gösterir.'],
 ['Boyut analizi','Birimleri kontrol ederek bir formülün mantıklı olup olmadığını sınamak.'],
 ['Türetme','Bilinen bir eşitlikten adım adım yeni bir formüle ulaşmak.'],
 ['Tanımlanamazlık','Bir modelde iki büyüklüğün yalnız birlikte görünmesi yüzünden veriden ayrı ayrı bulunamaması (S ve θ gibi).'],
 ['Senaryo','Verideki farkı açıklayabilecek rakip açıklamalardan biri.'],
 ['Hipotez','Veriyle sınanabilecek bir iddia.'],
 ['Üst üste binme','Doğrusal bir denklemde iki kaynağın etkilerinin toplanması.'],
 ['Seviye eğrisi','Bir büyüklüğün aynı değeri aldığı noktaları birleştiren çizgi (haritadaki eş yükselti eğrisi gibi).'],
 ['Eyer noktası','Bir yönde en düşük, ona dik yönde en yüksek olan nokta; dağ geçidi gibi.'],
 ['Kaynaşma','İki beneğin halkalarının birleşip tek bir şekil oluşturması.'],
 ['Çift pupilli benek','Tek siyah disk içinde iki beyaz pupil.'],
 ['Teorem','Kanıtlanmış matematiksel ifade.'],
 ['Önerme','Kanıtlanmış, genelde teoremden daha küçük çaplı ifade.'],
 ['Aşırı belirli sistem','Bilinmeyenden fazla ölçüm olan durum; fazla ölçüm modeli sınamaya yarar.'],
 ['Vatandaş bilimi','Gönüllülerin topladığı verilerle yapılan bilimsel çalışma.'],
 ['iNaturalist','İnsanların doğada gördükleri canlıların fotoğraflarını paylaştığı ve türleri birlikte doğruladığı site.'],
 ['Araştırma düzeyi','iNaturalist\'te türü topluluk tarafından doğrulanmış gözlem.'],
 ['Creative Commons (CC)','Fotoğrafçının, belirli koşullarla kullanıma izin verdiği lisanslar (BY: adını ver, NC: ticari değil).'],
 ['Piksel','Dijital fotoğrafı oluşturan en küçük kare.'],
 ['Nicemleme hatası','Ölçümün piksel gibi bölünemeyen adımlara yuvarlanmasından gelen hata.'],
 ['Radyal profil','Merkezden dışarı doğru ölçülen parlaklık değerleri.'],
 ['Yarı-yükseklik yöntemi','Sınırı, parlaklığın iki komşu bölgenin tam ortasına indiği yerde kabul etmek.'],
 ['Ölçek','Fotoğrafta 1 mm\'nin kaç piksele denk geldiği.'],
 ['Vekil','Doğrudan ölçülemeyen bir şeyin yerine kullanılan dolaylı ölçü.'],
 ['Dahil etme ölçütü','Bir fotoğrafın veri setine girmesi için sağlaması gereken koşullar.'],
 ['Ortalama','Değerlerin toplamının sayılarına bölümü.'],
 ['Standart sapma','Değerlerin ortalamadan tipik uzaklığı.'],
 ['Değişim katsayısı (CV)','Standart sapma ÷ ortalama; saçılımın yüzdesi.'],
 ['Korelasyon','İki ölçümün birlikte değişip değişmediği.'],
 ['Spearman ρ','Değerlerin sıralarına bakan korelasyon; uç değerlere dayanıklı.'],
 ['p-değeri','Hiç ilişki yokken en az bu kadar uç bir sonucun şansla çıkma sıklığı.'],
 ['Anlamlı','Genelde p < 0,05: sonucun şansla açıklanması zor.'],
 ['Karıştırma testi','Verileri rastgele karıştırıp sonucu yeniden hesaplayarak şansın ne üretebileceğini görmek.'],
 ['Güç','Gerçek bir etki varken testin onu yakalama olasılığı.'],
 ['Yanlış alarm','Etki yokken testin "var" deme olasılığı.'],
 ['Monte Carlo','Bir yöntemi cevabı bilinen sahte verilerle yüzlerce kez deneyerek sınamak.'],
 ['Varyans ayrışımı','Toplam saçılımı gerçek fark ve ölçüm hatası olarak ikiye ayırmak.'],
 ['ICC','Aynı şeyi ölçen iki kişinin (ya da iki fotoğrafın) uyumu; 1 tam uyum.'],
 ['AIC','Birkaç modelden hangisinin veriye en iyi uyduğunu puanlayan ölçü.'],
 ['Sınırlılık','Bir çalışmanın sonuçlarını zayıflatabilecek, açıkça söylenmesi gereken eksik.']
];

/* final: bütün ünite sorularından rastgele 16 */
TK.finalQs = () => { const bank = []; TK.U.forEach(u => { if (u.quiz && u.quiz.qs && u.id!=='baslangic') u.quiz.qs.forEach(q => bank.push(q)); }); return TK.shuffle(bank).slice(0,16); };
})();
