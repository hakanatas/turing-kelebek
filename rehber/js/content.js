/* İçerik: üniteler, hızlı kontroller, ara değerlendirmeler */
(function(){
const w = (name) => `<div data-w="${name}"></div>`;
const c = (id) => `<div data-c="${id}"></div>`;
const key = (t, s, cls='') => `<div class="key ${cls}"><b class="t">${t}</b>${s}</div>`;

TK.U = [
/* ============================== 0 ============================== */
{ id:'baslangic', no:0, title:'Başlarken', short:'Başlarken', time:'20 dk',
  lead:'Bu rehber seni, bir TÜBİTAK 2204-A projesinin bütün fikirlerini anlayıp jüriye kendi sözlerinle anlatabileceğin noktaya götürmek için hazırlandı.',
  goals:['Projenin tek cümlelik sorusunu söyleyebilmek','Ekipteki üç rolü ve takvimi bilmek','Rehberi nasıl kullanacağını öğrenmek','Ön testle nereden başladığını görmek'],
  sections:[
    {h:'Projenin sorusu', html:`
      <p>Kelebek kanatlarındaki halkalı benekler, yani <b>göz benekleri</b>, nasıl oluşuyor? Bilim insanları 50 yıldır bunun için matematiksel bir model kullanıyor. Biz bu modelin öngörülerini <b>Türkiye'deki gerçek kelebeklerin fotoğraflarıyla</b> sınıyoruz.</p>
      ${key('Tek cümlede proje','Türkiye kelebeklerinde göz beneği halkaları birlikte mi büyüyor, yoksa halkalar arası mesafe mi sabit kalıyor? Cevap, beneği çizen "kimyasal talimatın" hangi ayarının kelebekten kelebeğe değiştiğini söyler.')}
      <p>Proje <b>Matematik</b> alanında, Biyoloji ile disiplinler arası. Yani işin kalbinde bir formül var; kelebekler o formülü sınamak için doğal bir laboratuvar.</p>`},
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
  sections:[
    {h:'Çayır esmeri: Maniola jurtina', html:`
      <p>Türkiye'de yaklaşık 380 gündüz kelebeği türü yaşar. Biz bunlardan <b>Çayır esmeri</b>ni (<i>Maniola jurtina</i>) seçtik. Neden mi?</p>
      <ul><li>Ön kanadının ucunda <b>tek, büyük, beyaz pupilli siyah bir benek</b> var. Ölçmesi kolay.</li><li>Deniz kıyısından 2000 metreye kadar yaşar. Rakım karşılaştırması yapabiliriz.</li><li>Mayıs–Eylül arası uçar ve iNaturalist'te Türkiye'den <b>390 gözlem</b> var.</li></ul>
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
  sections:[
    {h:'Üstel azalma', html:`
      <p>Denge durumunda, odaktan r uzaklıktaki sinyal yaklaşık olarak şu formülle verilir:</p>
      <div class="formula">m(r) = S · e<sup>−r/λ</sup></div>
      <p>Burada <b class="s">S</b> odaktaki sinyal gücü, <b class="l">λ</b> menzil. Bu bir <b>üstel azalma</b>: odaktan her λ kadar uzaklaştığında sinyal <b>aynı oranda</b> küçülür. Eşit adımda eşit miktar değil, eşit <b>oran</b>.</p>
      ${w('decay')}
      ${key('Benzetme','Sıcak bir çay düşün. Her 10 dakikada oda sıcaklığıyla arasındaki farkın yaklaşık yarısını kaybeder. Fark 60°C → 30 → 15 → 7,5… Bu da üstel azalma.','analogy')}
      ${c('m1')}`},
    {h:'e sayısı ve logaritma', html:`
      <p><b>e ≈ 2,718</b> özel bir sayıdır; doğada büyüme ve azalma süreçlerinde kendiliğinden ortaya çıkar. Formülde e<sup>−r/λ</sup> var; r = λ olduğunda değer e<sup>−1</sup> ≈ 0,37 olur. Yani her λ adımında sinyalin <b>%37'si</b> kalır.</p>
      <p><b>Doğal logaritma</b> (ln), üs almanın tersidir. "e\'yi kaç kez çarpmalıyım ki bu sayıyı elde edeyim?" sorusunun cevabıdır.</p>
      <div class="formula">e<sup>y</sup> = x   ⟺   ln(x) = y</div>
      ${w('lnmachine')}
      <p>Üç kural yeter:</p>
      <ul><li>ln(1) = 0 ve ln(e) = 1</li><li>ln(a × b) = ln a + ln b (çarpım toplama döner)</li><li>ln(a ÷ b) = ln a − ln b, bu yüzden ln(b/a) = −ln(a/b)</li></ul>
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
  sections:[
    {h:'Eşik kuralı', html:`
      <p>Her hücre bulunduğu yerdeki sinyali "okur" ve basit bir kurala göre renk seçer:</p>
      <ul><li>Sinyal <b>beyaz eşiği</b> θ<sub>1</sub>'in üstündeyse → beyaz (pupil)</li><li>Sinyal <b>siyah eşiği</b> θ<sub>2</sub>'nin üstündeyse → siyah (disk)</li><li>Daha azsa → turuncu kalır</li></ul>
      <p>θ (teta) eşik demek. Aşağıda dikey çizgi odaktan dışarı yürüyor; her noktada sinyale bakıp rengi seçiyor.</p>
      ${w('sweep')}
      ${key('Benzetme','Bir hoparlörden uzaklaşıyorsun. Sesi "çok yüksek" duyduğun bölge, "duyulur" bölge ve "duyulmaz" bölge var. Bölgelerin sınırı, sesin bir eşiğin altına düştüğü yer.','analogy')}${c('o1')}`},
    {h:'Formülü türetelim', html:`<p>Halkanın kenarı, sinyalin eşiğe tam eşit olduğu yerdir. Bu tek fikirden ana formüle ulaşıyoruz:</p>${w('derive')}
      <div class="formula">r<sub>p</sub> = λ · ln(S/θ<sub>1</sub>)     r<sub>d</sub> = λ · ln(S/θ<sub>2</sub>)</div>
      <p>Örnek: λ = 0,5 mm, S = 81,5, θ<sub>2</sub> = 1 ise r<sub>d</sub> = 0,5 × ln(81,5) = 0,5 × 4,4 = <b>2,2 mm</b>.</p>${c('o2')}`},
    {h:'İki düğme: güç ve menzil', html:`
      <p>Formüle göre benek boyunu iki şey değiştirebilir: <b class="s">güç S</b> ve <b class="l">menzil λ</b>. İkisi de beneği büyütür ama farklı biçimde. Kaydırıcılarla oyna ve çerçeveli iki sayıyı izle.</p>
      ${w('playground')}
      ${key('Keşfettiğin iki özdeşlik','Oran: r<sub>p</sub>/r<sub>d</sub> = ln(S/θ<sub>1</sub>) ÷ ln(S/θ<sub>2</sub>) → içinde λ yok! λ değişince oran değişmez.<br>Fark: r<sub>d</sub> − r<sub>p</sub> = λ · ln(θ<sub>1</sub>/θ<sub>2</sub>) → içinde S yok! S değişince fark değişmez.')}
      ${c('o3')}`},
    {h:'Gizli ikizler: S ve θ', html:`
      <p>Formülde S ve θ hep birlikte, <b>S/θ</b> olarak geçiyor. Bu bir sorun yaratır: S ve θ'yı aynı kat değiştirirsen benek hiç değişmez.</p>${w('samespot')}
      <p>Bu yüzden fotoğraftan "S mi değişti, θ mı?" sorusunu cevaplayamayız. Sorabileceğimiz doğru soru: <b>"λ mı değişiyor, yoksa ln(S/θ) mı?"</b> Bilim insanları buna <b>tanımlanamazlık</b> der.</p>${c('o4')}`},
    {h:'Modelin sınırları', html:`<ul><li>m(r) = S·e<sup>−r/λ</sup> bir yaklaşım. Gerçek iki boyutlu çözüm Bessel fonksiyonu K<sub>0</sub> ile yazılır ve odağa çok yakında biraz farklıdır; ama oran ve fark öngörülerinin yönü değişmez.</li><li>Model kanadın büyümediğini varsayar. Gerçekte desen büyüyen kanatta belirlenir.</li><li>Otaki (2011) gibi bazı araştırmacılar tek sinyalli modelin yetersiz olduğunu savunur. Bilimde modeller sınanır; biz de bunu yapıyoruz.</li></ul>`}
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
{ id:'senaryo', no:5, title:'Üç senaryo ve hipotezler', short:'Hipotezler', time:'35 dk',
  lead:'İyi bir deney, farklı açıklamaların farklı sonuçlar öngördüğü bir deneydir. Bizde üç rakip senaryo var.',
  goals:['Üç senaryoyu ve her birinde sabit kalan büyüklüğü söyleyebilmek','Her senaryonun (r<sub>d</sub>, r<sub>p</sub>) grafiğinde nasıl bir çizgi verdiğini çizebilmek','Oran testinin üç senaryoda beklenen işaretini bilmek','H1 ve H2 hipotezlerini kendi cümlelerinle yazabilmek'],
  sections:[
    {h:'Rakip açıklamalar', html:`
      <p>Kelebekler arasında benek boyu değişiyor. Bunun üç olası açıklaması var:</p>
      <ol><li><b class="s">Yalnız güç S değişir.</b> Bazı odaklar daha çok sinyal üretir. → Halka farkı sabit. Küçük beneklerde pupil kaybolur.</li><li><b class="l">Yalnız menzil λ değişir.</b> Sinyal bazı kelebeklerde daha uzağa gider. → Bütün halkalar aynı oranda büyür; oran sabit.</li><li><b style="color:var(--warn)">Pupil sabit.</b> Pupil aslında eşik halkası değil, odak hücrelerinin kendisi. → Pupil hep aynı boyda, disk değişir.</li></ol>
      ${w('scenarios')}${c('s1')}`},
    {h:'Öngörü tablosu', html:`${w('hyptable')}
      <p>Son sütundaki <b>oran testi</b> şunu soruyor: "Büyük benekli kelebeklerde oran daha mı büyük, daha mı küçük, yoksa aynı mı?" Neden bu test seçildi, Ünite 6'da göreceksin: fotoğrafların ölçeğini bilmediğimizde de çalışıyor.</p>${c('s2')}`},
    {h:'Hipotezler', html:`
      ${key('H1 · Ölçekleme','Üç senaryodan hangisi Türkiye\'deki Çayır esmeri verisiyle uyumlu?')}
      ${key('H2 · Coğrafya','Menzil λ\'nın vekili (benek boyu ÷ kanat boyu) rakım ve sıcaklıkla değişiyor mu? D ve γ sıcaklığa bağlı hızlar olduğu için λ da sıcaklığa bağlı olabilir.')}
      ${key('H0 · Yöntem','Testlerimiz gerçek ölçüm gürültüsü altında ne kadar güvenilir? (Monte Carlo ile, Ünite 7.)')}
      <p>Dikkat: <b>Hiçbir sonuç "başarısız" değildir.</b> Hangi senaryo çıkarsa çıksın, modelin hangi parametresinin değiştiğini öğreniriz.</p>${w('outcomes')}`}
  ],
  checks:{
    s1:{q:'Soldaki panelde benek küçülünce pupil kayboluyor. Bu hangi senaryo?', opts:['Yalnız güç S değişir','Yalnız menzil λ değişir','Pupil sabit','Hiçbiri'], a:0, ex:'S, beyaz eşiğinin altına düşünce pupil kaybolur.'},
    s2:{q:'"Pupil sabit" senaryosunda büyük beneklerde oran nasıl olur?', opts:['Küçük (ρ negatif)','Büyük (ρ pozitif)','Aynı (ρ ≈ 0)','Tanımsız'], a:0, ex:'Pupil aynı, disk büyüyor: oran = sabit ÷ büyük sayı → küçülür.'}
  },
  quiz:{ id:'senaryo', qs:[
    {t:'match', q:'Her senaryoda sabit kalan büyüklük hangisi?', pairs:[['Yalnız S değişir','Fark r_d − r_p'],['Yalnız λ değişir','Oran r_p / r_d'],['Pupil sabit','Pupil yarıçapı r_p']], ex:'Ünite 4\'teki iki özdeşliği hatırla.'},
    {t:'match', q:'(r<sub>d</sub>, r<sub>p</sub>) grafiğinde hangi çizgi?', pairs:[['Yalnız S değişir','Eğimi 1 olan doğru'],['Yalnız λ değişir','Orijinden geçen doğru'],['Pupil sabit','Yatay doğru']], ex:'Fark sabitse r_p = r_d − c; oran sabitse r_p = k·r_d; pupil sabitse r_p = c.'},
    {q:'Oran testinde ρ pozitif çıkarsa hangi senaryo desteklenir?', opts:['Yalnız S değişir','Yalnız λ değişir','Pupil sabit','Hiçbiri'], a:0, ex:'S senaryosunda büyük beneklerde pupil göreli olarak daha büyük olur.'},
    {q:'Oran testinde ρ ≈ 0 hangi senaryoyla uyumludur?', opts:['Yalnız λ değişir','Yalnız S değişir','Pupil sabit','Hiçbiri'], a:0, ex:'Oran sabitse benek boyuyla ilişkisi olmaz.'},
    {q:'H2 neden λ\'nın sıcaklıkla değişebileceğini düşünür?', opts:['D ve γ sıcaklığa bağlı hızlardır','Sıcakta kelebekler büyür','Fotoğraflar yazın çekilir','Turing öyle demiştir'], a:0, ex:'λ = √(D/γ); kimyasal hızlar sıcaklıkla değişir.'},
    {q:'"Yalnız S değişir" senaryosu doğruysa doğada ne görmemiz beklenir?', opts:['Bazı kelebeklerde pupilsiz benekler','Hiç benek olmayan kelebekler','Hep aynı boyda benekler','İki pupilli benekler'], a:0, ex:'Raporda bu senaryo bireylerin yaklaşık %16\'sında pupil kaybı öngörüyor.'}
  ]}
},
/* ============================== 6 ============================== */
{ id:'veri', no:6, title:'Veri ve ölçüm', short:'Veri', time:'50 dk',
  lead:'Hiç kelebek yakalamadan 97 kelebeği nasıl ölçtük? Vatandaş bilimi, lisanslar, bilgisayarla görme ve bir ölçek tuzağı.',
  goals:['iNaturalist ve vatandaş bilimini açıklayabilmek','Hangi lisanslı fotoğrafı kullanabileceğine karar verebilmek','Yarı-yükseklik yöntemiyle halka sınırının nasıl bulunduğunu anlatabilmek','Piksel ölçeğinde farkın neden yanıltıcı olduğunu, oranın neden güvenilir olduğunu gösterebilmek'],
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
/* ============================== 7 ============================== */
{ id:'istatistik', no:7, title:'İstatistik ve Monte Carlo', short:'İstatistik', time:'55 dk',
  lead:'Gürültülü verilerden güvenilir sonuç çıkarmanın araçları: dağılım, korelasyon, p-değeri, güç ve bilgisayar deneyleri.',
  goals:['Ortalama, standart sapma ve değişim katsayısını (CV) hesaplayıp yorumlayabilmek','Spearman ρ\'nun sıralarla nasıl çalıştığını açıklayabilmek','p-değerini karıştırma testiyle açıklayabilmek','Güç ve yanlış alarm kavramlarını Monte Carlo ile anlatabilmek','ICC\'nin neyi ölçtüğünü söyleyebilmek'],
  sections:[
    {h:'Dağılımı ölçmek', html:`
      <p><b>Ortalama</b> bir grubun "tipik" değeridir. <b>Standart sapma (SS)</b> değerlerin ortalamadan tipik olarak ne kadar uzaklaştığıdır. <b>Değişim katsayısı CV = SS ÷ ortalama</b>, dağılımı yüzde olarak verir; böylece farklı büyüklükleri karşılaştırabilirsin.</p>
      ${w('stats')}
      <p>Gerçek 97 kelebekte oran 0,203 ± 0,039, yani <b>CV ≈ %19</b>. Bu sayı Ünite 8'de çok işimize yarayacak.</p>${c('i1')}`},
    {h:'Korelasyon ve Spearman ρ', html:`
      <p><b>Korelasyon</b>, iki ölçümün birlikte değişip değişmediğini −1 ile +1 arasında bir sayıyla söyler. Projede <b>Spearman ρ</b> (ro) kullanıyoruz: değerlerin kendisine değil <b>sıralarına</b> bakar. Bu yüzden aykırı noktalara karşı daha dayanıklıdır.</p>
      ${w('spearman')}${c('i2')}`},
    {h:'Şans mı, gerçek mi? p-değeri', html:`
      <p>Gerçek veride ρ = −0,14 çıktı. Ama 97 kelebekle, hiç ilişki olmasa da şansla küçük bir ρ çıkabilir. Bunu test etmenin zekice bir yolu: oranları kelebekler arasında <b>rastgele karıştır</b>, ρ\'yu yeniden hesapla, 1000 kez tekrarla.</p>
      ${w('permutation')}
      ${key('p-değeri','"Hiç ilişki olmasaydı, en az bu kadar uç bir sonucu ne sıklıkla görürdük?" Genelde p < 0,05 ise sonuca <b>anlamlı</b> denir. Anlamlı olmamak "ilişki yok" demek değildir; "bu veriyle ilişki gösterilemedi" demektir.')}${c('i3')}`},
    {h:'Monte Carlo: testi test etmek', html:`
      <p>Ölçümlerimiz gürültülü: piksel hataları, bulanıklık, farklı yakınlaştırmalar. Oran testi bu gürültüde de senaryoları ayırabilir mi? Bunu bilgisayarda <b>cevabını bildiğimiz sahte kelebekler</b> üreterek sınıyoruz: her senaryoda 97 kelebek, 400 tekrar.</p>
      ${w('montecarlo')}
      <ul><li><b>Güç:</b> Gerçekten bir etki varken testin onu yakalama olasılığı. Yalnız-S senaryosunda ≈ %94.</li><li><b>Yanlış alarm:</b> Etki yokken testin "var" deme olasılığı. Yalnız-λ senaryosunda ≈ %7 (beklenen %5'e yakın).</li></ul>
      ${key('Monte Carlo\'nun bulduğu sürpriz','Ön analizde piksel ölçeğinde yapılan bir model karşılaştırması (AIC) "orantılı model açık ara kazandı" demişti. Monte Carlo bu testin <b>her senaryoda</b> orantılı modeli seçtiğini gösterdi; yani o sonuç bir yöntem yanılgısıydı. Bilimde kendi hatanı bulmak da bir bulgudur.')}${c('i4')}`},
    {h:'Ölçüm güvenilirliği: ICC', html:`
      <p>İki kişi aynı fotoğrafı ölçerse aynı sayıyı bulur mu? <b>ICC</b> (sınıf içi korelasyon katsayısı) bunu 0 ile 1 arasında ölçer. Hedefimiz <b>ICC > 0,8</b>.</p>${w('icc')}`}
  ],
  checks:{
    i1:{q:'Ortalama 0,20, standart sapma 0,04 ise CV kaçtır?', opts:['%20','%4','%5','%80'], a:0, ex:'0,04 ÷ 0,20 = 0,20.'},
    i2:{q:'"Bir uç değer" ayarında Spearman 1 çıkarken Pearson neden daha düşük?', opts:['Pearson değerlerin büyüklüğünden etkilenir; Spearman yalnız sıralara bakar','Spearman hatalıdır','Pearson sıralara bakar','İkisi aslında aynıdır'], a:0, ex:'Uç değer Pearson\'ı doğrusal çizgiden uzaklaştırır; sıralamada ise hâlâ en büyük, yani sıralar tam uyumlu.'},
    i3:{q:'p = 0,17 için en doğru yorum hangisi?', opts:['Bu büyüklükte bir ρ şansla da sık çıkar; ilişki gösterilemedi','İlişki kesinlikle yok','İlişki %83 kesin','Ölçümler %17 hatalı'], a:0, ex:'Anlamlı olmamak, yokluğun kanıtı değildir.'},
    i4:{q:'Monte Carlo\'da "yalnız λ" senaryosunda testin %7 "anlamlı" demesi neyi gösterir?', opts:['Yanlış alarm oranını; beklenen %5\'e yakın','Testin gücünü','Ölçümlerin %7\'sinin hatalı olduğunu','λ\'nın %7 değiştiğini'], a:0, ex:'Bu senaryoda gerçek ilişki yok; "var" demek yanlış alarmdır.'}
  },
  quiz:{ id:'istatistik', qs:[
    {t:'num', q:'2, 4 ve 6 sayılarının ortalaması kaçtır?', a:4, tol:0.001, ex:'(2+4+6) ÷ 3 = 4.'},
    {q:'Standart sapma neyi ölçer?', opts:['Değerlerin ortalamadan tipik uzaklığını','En büyük değeri','Veri sayısını','Ortalamanın karesini'], a:0, ex:'Dağılımın genişliği.'},
    {q:'Spearman ρ = 0,05 ne anlatır?', opts:['Neredeyse hiç ilişki yok','Güçlü pozitif ilişki','Güçlü negatif ilişki','Ölçüm hatası'], a:0, ex:'Sıfıra yakın = ilişki yok.'},
    {q:'Karıştırma testinde oranları kelebekler arasında karıştırmak neyi taklit eder?', opts:['Oran ile benek boyu arasında hiçbir bağ olmadığı bir dünyayı','Ölçüm hatasını','Daha çok kelebeği','Fotoğraf yakınlaştırmasını'], a:0, ex:'Karıştırma, eşleşmeyi bozar; "ilişki yok" varsayımı altında ρ\'nun dağılımını verir.'},
    {q:'Bir testin "gücü" nedir?', opts:['Gerçek bir etkiyi yakalama olasılığı','Hesaplama hızı','Yanlış alarm olasılığı','Veri sayısı'], a:0, ex:'Yalnız-S senaryosunda oran testinin gücü ≈ %94.'},
    {t:'match', q:'Monte Carlo\'da senaryoların ortalama ρ değerlerini eşleştir.', pairs:[['Yalnız S','+0,40'],['Yalnız λ','−0,03'],['Pupil sabit','−0,40']], ex:'Üç senaryo üç ayrı bölgeye düşüyor; test ayırt edici.'},
    {q:'Ön analizde ölçek vekili için ICC = 0,30 bulundu. Bu ne demek?', opts:['Aynı kelebeğin farklı fotoğrafları çok farklı değerler veriyor; ölçüm güvenilmez','Ölçüm mükemmel','Kelebeklerin %30\'u ölçüldü','Hata %30'], a:0, ex:'Hedef 0,8. Bu yüzden elle kanat uzunluğu ölçümüne geçildi.'},
    {q:'Monte Carlo neden piksel ölçeğindeki AIC karşılaştırmasını geçersiz saydı?', opts:['Gerçek senaryo ne olursa olsun hep "orantılı" modeli seçtiği için','Çok yavaş çalıştığı için','Veri az olduğu için','AIC yanlış hesaplandığı için'], a:0, ex:'Pikselde r_p ve r_d ikisi de yakınlaştırmayla büyür; orantılı model her zaman kazanır.'}
  ]}
},
/* ============================== 8 ============================== */
{ id:'bulgular', no:8, title:'Bulgular ve yorum', short:'Bulgular', time:'35 dk',
  lead:'97 gerçek kelebek ne dedi? Ne kadar emin olabiliriz? Hangi sorular hâlâ açık?',
  goals:['Ön bulguyu üç cümleyle anlatabilmek','Neden "yalnız S" senaryosunun desteklenmediğini iki gerekçeyle açıklayabilmek','"Pupil sabit" senaryosunun neden henüz elenmediğini söyleyebilmek','Çalışmanın sınırlılıklarını sayabilmek'],
  sections:[
    {h:'Gerçek veri', html:`${w('realdata')}${c('b1')}`},
    {h:'Senaryoların durumu', html:`
      <div class="tw"><table class="t"><thead><tr><th>Senaryo</th><th>Beklenen ρ</th><th>Gözlenen</th><th>Beklenen oran CV</th><th>Gözlenen CV</th><th>Karar</th></tr></thead><tbody>
      <tr><td><span class="s">Yalnız S</span></td><td class="num">+0,40</td><td class="num" rowspan="3">−0,14</td><td class="num">0,40</td><td class="num" rowspan="3">0,19</td><td style="color:var(--bad)"><b>Desteklenmiyor</b></td></tr>
      <tr><td><span class="l">Yalnız λ</span></td><td class="num">−0,03</td><td class="num">0,21</td><td style="color:var(--ok)"><b>En uyumlu</b></td></tr>
      <tr><td><b style="color:var(--warn)">Pupil sabit</b></td><td class="num">−0,40</td><td class="num">0,29</td><td style="color:var(--warn)"><b>Henüz elenmedi</b></td></tr></tbody></table></div>
      <p><b>Neden yalnız-S değil?</b> (1) Bu senaryo %94 güçle pozitif bir ρ üretirdi; gözlenen değer negatif. (2) Bu senaryo kelebeklerin altıda birinde pupilsiz benek öngörür; Çayır esmerinde pupilsiz benek neredeyse hiç görülmez.</p>
      <p><b>Neden λ en uyumlu?</b> Oranların dağılımı (CV %19), yalnız-λ senaryosunda <b>sadece ölçüm gürültüsünün</b> ürettiği dağılımla (%21) aynı. Yani oran aslında sabit olabilir; gördüğümüz dağılım piksel hatasından.</p>
      ${key('Ön bulgu, üç cümlede','1) Çayır esmerinde göz beneği halkaları birlikte ölçekleniyor gibi görünüyor. 2) Bu, kelebekler arasındaki farkın sinyal gücünden çok sinyalin menzilinden (λ) kaynaklandığını düşündürüyor. 3) "Pupil sabit" olasılığını elemek için kanat uzunluğunun elle ölçülmesi gerekiyor.')}${c('b2')}`},
    {h:'Literatürle bağlantı', html:`<ul><li><b>Palmer, McKenna ve Nijhout (2019):</b> <i>Junonia coenia</i>'da benek çapları kanat boyuyla orantılı (izometrik) büyüyor.</li><li><b>Mowbray vd. (2024):</b> <i>M. jurtina</i>'da ön kanat beneği kanat uzunluğuyla ölçekleniyor.</li><li><b>Monteiro vd. (1997):</b> <i>Bicyclus</i>'ta halka oranları eşikler üzerinden kalıtılıyor. Yani eşiklerin S ile birlikte kayması da oranı sabit tutabilir; bulgumuz "λ" ya da "eşdeğer bir ölçekleme mekanizması" anlamına gelir.</li></ul>
      <p>Bizim katkımız: bu çalışmaların hiçbiri <b>halka oranlarını bireyler arasında</b> karşılaştırıp modelin hangi parametresinin değiştiğini sormadı.</p>`},
    {h:'Sınırlılıklar', html:`<ol><li>Pupil yalnızca 1–7 piksel; nicemleme hatası büyük.</li><li>Otomatik ölçek vekilinin tekrarlanabilirliği düşük (ICC 0,30).</li><li>Üstel formül bir yaklaşım; odağa çok yakında sapma var.</li><li>Model kanadın büyümediğini varsayar.</li><li>Fotoğrafların açısı ve odağı değişken; cinsiyet yalnız vekille belirlendi; rakım, mevsim ve enlem iç içe.</li><li>Monte Carlo\'daki bazı sayılar (ör. bireyler arası CV) varsayım; duyarlılık analizi yapıldı.</li></ol>
      ${key('Jüriye karşı dürüstlük','Sınırlılıkları saklamak yerine açıkça söylemek, jürinin gözünde projeyi güçlendirir. "Bunu biliyoruz ve şöyle çözmeyi planlıyoruz" cümlesi en iyi cevaptır.','analogy')}${c('b3')}`}
  ],
  checks:{
    b1:{q:'Rakım grafiğinde eğim pozitif ama p = 0,18. Doğru yorum hangisi?', opts:['Küçük bir etki olabilir ama bu veriyle gösterilemedi','Rakım beneği kesinlikle büyütüyor','Rakımın hiçbir etkisi yok','Veri yanlış'], a:0, ex:'Anlamlı değil; ölçek gürültüsü küçük etkileri gizleyebilir.'},
    b2:{q:'Gözlenen oran CV\'si (%19) neden önemli?', opts:['Yalnız-λ senaryosunda sadece ölçüm gürültüsünün üreteceği dağılıma (%21) eşit','Çok büyük olduğu için','Sıfır olduğu için','Yalnız-S\'ye uyduğu için'], a:0, ex:'Oranın "gerçek" dağılımı neredeyse sıfır olabilir: halkalar birlikte ölçekleniyor.'},
    b3:{q:'Hangisi bu çalışmanın bir sınırlılığı DEĞİLDİR?', opts:['Kelebeklerin yakalanıp öldürülmesi','Pupilin az pikselle ölçülmesi','Ölçek vekilinin gürültülü olması','Cinsiyetin vekille belirlenmesi'], a:0, ex:'Hiç kelebek yakalanmadı.'}
  },
  quiz:{ id:'bulgular', qs:[
    {t:'num', q:'Analize giren birey sayısı kaçtır?', a:97, tol:0, ex:'n = 97.'},
    {q:'Gözlenen Spearman ρ değeri hangisidir?', opts:['−0,14','+0,40','−0,40','0'], a:0, ex:'ρ = −0,14, p = 0,17.'},
    {q:'"Yalnız S" senaryosu neden desteklenmiyor? (en iyi cevap)', opts:['Pozitif ρ ve pupilsiz kelebekler öngörüyor; ikisi de gözlenmedi','ρ tam sıfır çıktığı için','Kelebekler çok büyük olduğu için','Veri az olduğu için'], a:0, ex:'İki bağımsız gerekçe.'},
    {q:'"Pupil sabit" senaryosu neden henüz elenmedi?', opts:['Gözlenen ρ onunla λ arasında kalıyor; ayırmak için mm ölçeği gerekiyor','Çok güçlü desteklendiği için','Hiç sınanmadığı için','Pupil ölçülemediği için'], a:0, ex:'−0,14, −0,03 ile −0,40 arasında. Elle L ölçümü bu ayrımı yapacak (Monte Carlo: ≥ %95 doğru seçim).'},
    {q:'Rakım ile göreli benek boyu arasındaki ilişki için doğru ifade hangisi?', opts:['Anlamlı değil (p = 0,18)','Güçlü ve anlamlı','Negatif ve anlamlı','Hiç incelenmedi'], a:0, ex:'+0,018 / 1000 m, p = 0,18.'},
    {q:'Palmer vd. (2019) ve Mowbray vd. (2024) ile bulgumuz arasındaki ilişki nedir?', opts:['Tutarlı: benekler kanat boyuyla orantılı ölçekleniyor','Çelişkili','İlgisiz','Onlar başka bir soruyu cevapladı ve sonuçları yanlış'], a:0, ex:'İzometri, λ\'nın kanat boyuyla birlikte büyümesiyle uyumlu.'}
  ]}
},
/* ============================== 9 ============================== */
{ id:'gorev', no:9, title:'Senin görevin', short:'Görevler', time:'60 dk',
  lead:'Artık projeyi anlıyorsun. Şimdi sıra senin ellerinle yapacağın ölçümlerde, raporda ve jüri karşısında.',
  goals:['Kanat uzunluğunu ve benek yarıçapını fotoğraftan ölçüp mm\'ye çevirebilmek','Dahil etme ölçütlerini uygulayabilmek','Kod dosyalarının ne yaptığını ve sırasını bilmek','Rolüne ait görevleri takip edebilmek','En olası jüri sorularına cevap verebilmek'],
  sections:[
    {h:'Ölçüm atölyesi', html:`
      <p>Ana analizde her fotoğrafta <b>kanat uzunluğunu (L)</b> elle işaretleyeceksin. Sonra piksel ölçümlerini milimetreye çevireceksin:</p>
      <div class="formula">1 px = L<sub>mm</sub> ÷ L<sub>px</sub>     r<sub>mm</sub> = r<sub>px</sub> × (L<sub>mm</sub> ÷ L<sub>px</sub>)</div>
      <p>L<sub>mm</sub> olarak tür ve cinsiyet ortalaması kullanılır (erkek ~22 mm, dişi ~25 mm). Aşağıda üç fotoğrafla prova yap. Hedef: L hatası %5'in altında.</p>
      ${w('measure')}${c('g1')}`},
    {h:'Dahil etme ölçütleri', html:`<p>Protokole göre bir fotoğraf ancak şu koşullarda veri setine girer: kanat <b>dik açıyla</b> görünüyor (elipslik < 1,15), benek <b>bütün</b>, <b>aşınma yok</b>, görüntü <b>keskin</b> ve disk en az <b>6 piksel</b>.</p>${w('include')}`},
    {h:'İki ölçücü çalışması', html:`<ol><li>Ö2 ve Ö3 aynı 30 fotoğrafı <b>birbirinden habersiz</b> ölçer.</li><li>ICC hesaplanır (Ünite 7'deki araç). Hedef > 0,8.</li><li>Uyuşmayan fotoğraflar birlikte incelenir: "Tabanı tam olarak nereden alıyoruz?" gibi belirsizlikler protokole yazılır (protokol v2).</li><li>Sonra bütün fotoğraflar ölçülür.</li></ol>
      ${key('Altın kural','Kendi ellerinle yapmadığın hiçbir ölçüm "bulgu" olarak sunulmaz. Otomatik ölçümler öğrenci doğrulamasından geçmeden veri setine girmez.')}`},
    {h:'Kod haritası', html:`${w('codemap')}<p>Kodu yazmak zorunda değilsin, ama <b>ne yaptığını</b> anlatabilmelisin. Ö1, <code>kanat_turing.py</code>'yi satır satır anlamakla sorumlu.</p>`},
    {h:'Görev listem', html: w('tasks')},
    {h:'Rapor yazarken', html:`<ul><li>Raporun güncel hali <code>ARASTIRMA_RAPORU_v2.md</code>. <b>[DOLDURULACAK]</b> yazan yerler sizin ölçümlerinizle dolacak.</li><li>Her bölüm tek bir öğrencinin sorumluluğunda; ama herkes her bölümü okur.</li><li>Sayıları her zaman birimiyle yaz (mm, px, m).</li><li>"Kanıtladık" yerine "destekliyor", "uyumlu" gibi dikkatli ifadeler kullan.</li><li>Ortak çalışma günlüğüne her hafta tarih–yapılan–karar yaz. Jüri "süreci" sorduğunda bunu gösterirsin.</li></ul>`},
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
/* ============================== 10 ============================== */
{ id:'final', no:10, title:'Final ve karne', short:'Final', time:'30 dk',
  lead:'Bütün ünitelerden karışık 16 soru. Ön testteki puanınla karşılaştır ve hangi üniteleri tekrar etmen gerektiğini gör.',
  goals:['Bütün üniteleri birlikte kullanabilmek','Gelişimini ön testle karşılaştırmak','Zayıf kaldığın konuları belirlemek'],
  sections:[
    {h:'Final sınavı', html:`<p>Sorular bütün ünitelerden rastgele seçilir. "Yeniden dene" dediğinde yeni sorular gelir. Final puanının en iyisi karneye yazılır.</p>`}
  ],
  after:{h:'Karne', html: w('karne') + `<p>Bütün üniteler yeşilse ve finalde %80'in üstündeysen jüri karşısına çıkmaya hazırsın. Son bir öneri: projeyi hiç bilmeyen birine (ailene, bir arkadaşına) 5 dakikada anlat. Anlatamadığın yer, tekrar etmen gereken yerdir.</p>`},
  quiz:{ id:'final', tag:'Final', pass:70, final:true }
}
];

/* final: bütün ünite sorularından rastgele 16 */
TK.finalQs = () => { const bank = []; TK.U.forEach(u => { if (u.quiz && u.quiz.qs && u.id!=='baslangic') u.quiz.qs.forEach(q => bank.push(q)); }); return TK.shuffle(bank).slice(0,16); };
})();
