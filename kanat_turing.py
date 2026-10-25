"""
kanat_turing.py — Kelebek kanat desenlerinde Turing morfogenezi
================================================================
TÜBİTAK 2204-A projesi için reaksiyon-difüzyon simülasyon aracı.

Üç deney içerir:
  1. gray_scott()      : Gray-Scott modeli — parametre (F, k) değiştikçe
                          benek / şerit / labirent desenleri (Pearson 1993).
  2. gierer_meinhardt(): Gierer-Meinhardt aktivatör-inhibitör modeli —
                          damarlarla sınırlı kanat hücrelerinde odak (fokus)
                          noktalarının seçilmesi (Nijhout 1990; Sekimura 2015).
  3. goz_benegi()      : Odaktan yayılan morfogen + eşik modeli — eşmerkezli
                          halkalı göz beneği (Nijhout 1978/1980; Dilão 2004).

Yalnızca numpy + matplotlib gerektirir. Çalıştır:
    python kanat_turing.py            # tüm şekilleri 'cikti/' klasörüne yazar
"""
from __future__ import annotations
import os
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap

CIKTI = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cikti")
os.makedirs(CIKTI, exist_ok=True)
rng = np.random.default_rng(6459)

# ----------------------------------------------------------------------------
# Yardımcılar
# ----------------------------------------------------------------------------

def laplacian(Z: np.ndarray) -> np.ndarray:
    """5 noktalı sonlu fark Laplace operatörü (periyodik olmayan, kenarlar kopyalanır)."""
    Zp = np.pad(Z, 1, mode="edge")
    return (Zp[:-2, 1:-1] + Zp[2:, 1:-1] + Zp[1:-1, :-2] + Zp[1:-1, 2:] - 4.0 * Z)


def kanat_maskesi(ny: int, nx: int) -> tuple[np.ndarray, np.ndarray, list[np.ndarray]]:
    """
    Basitleştirilmiş bir ön kanat geometrisi üretir.
    Döndürür: (maske, damar_maskesi, hucre_maskeleri)
      maske        : kanat içi = True
      damar_maskesi: damar pikselleri = True (Dirichlet sınır / morfogen kaynağı)
      hucre_maskeleri: damarlar arasındaki her "kanat hücresi" için ayrı maske
    """
    y, x = np.mgrid[0:ny, 0:nx]
    xn = x / nx          # 0 = kanat tabanı (gövde), 1 = dış kenar
    yn = y / ny          # 0 = ön kenar (kosta), 1 = arka kenar
    # Kanat dış hattı: taban dar, dışa doğru genişleyen, ucu yuvarlatılmış bir yelpaze
    ust = 0.42 - 0.40 * xn**0.8                     # ön kenar eğrisi
    alt = 0.58 + 0.40 * xn**0.6                     # arka kenar eğrisi
    dis = 0.97 - 0.10 * (yn - 0.5) ** 2 * 4         # dış kenar (hafif dışbükey)
    maske = (yn > ust) & (yn < alt) & (xn < dis) & (xn > 0.03)

    # Damarlar: tabandan yelpaze gibi açılan 6 çizgi → 7 kanat hücresi
    n_damar = 6
    damar = np.zeros_like(maske)
    hucre_id = np.full((ny, nx), -1, dtype=int)
    # Kanat içinde açı koordinatı: taban noktasından (x=0, y=0.5) ölçülen normalize açı
    ang = np.arctan2(yn - 0.5, xn + 0.02)
    ang_min, ang_max = np.min(ang[maske]), np.max(ang[maske])
    t = (ang - ang_min) / (ang_max - ang_min)      # 0..1
    kesimler = np.linspace(0, 1, n_damar + 2)[1:-1]
    for i, k in enumerate(kesimler):
        damar |= maske & (np.abs(t - k) < 0.006) & (xn > 0.12)
    # Hücre kimliği
    hucre_id[maske] = np.digitize(t[maske], kesimler)
    hucre_id[damar] = -1
    hucreler = [(hucre_id == i) for i in range(n_damar + 1)]
    return maske, damar, hucreler


KANAT_CMAP = LinearSegmentedColormap.from_list(
    "kanat", ["#2b1d0e", "#7a4a1d", "#d9822b", "#f3d9a4", "#fffaf0"])


def kaydet(fig, ad: str):
    yol = os.path.join(CIKTI, ad)
    fig.savefig(yol, dpi=160, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print("yazıldı:", yol)


# ----------------------------------------------------------------------------
# 1) GRAY-SCOTT
#    ∂u/∂t = Du ∇²u − u v² + F (1 − u)
#    ∂v/∂t = Dv ∇²v + u v² − (F + k) v
# ----------------------------------------------------------------------------

def tohumla(u: np.ndarray, v: np.ndarray, maske: np.ndarray, tohum: str = "rastgele",
            n_blok: int = 25, s: int = 4):
    """Rastgele küçük kare tohumlar bırakır (tek piksel tohumlar difüzyonla söner)."""
    ny, nx = u.shape
    if tohum == "rastgele":
        yer = np.argwhere(maske)
        for idx in rng.choice(len(yer), size=min(n_blok, len(yer)), replace=False):
            cy, cx = yer[idx]
            u[max(cy - s, 0):cy + s, max(cx - s, 0):cx + s] = 0.5
            v[max(cy - s, 0):cy + s, max(cx - s, 0):cx + s] = 0.25
    else:
        cy, cx = ny // 2, nx // 2; s = 6
        u[cy - s:cy + s, cx - s:cx + s] = 0.5
        v[cy - s:cy + s, cx - s:cx + s] = 0.25
    u += 0.02 * rng.random(u.shape) * maske
    v += 0.02 * rng.random(v.shape) * maske


def gray_scott(F: float, k: float, n: int = 160, adim: int = 8000,
               Du: float = 0.16, Dv: float = 0.08, dt: float = 1.0,
               maske: np.ndarray | None = None, tohum: str = "rastgele") -> np.ndarray:
    u = np.ones((n, n)); v = np.zeros((n, n))
    tohumla(u, v, np.ones((n, n), dtype=bool) if maske is None else maske, tohum)
    for _ in range(adim):
        uvv = u * v * v
        u += dt * (Du * laplacian(u) - uvv + F * (1 - u))
        v += dt * (Dv * laplacian(v) + uvv - (F + k) * v)
        if maske is not None:
            u[~maske] = 1.0; v[~maske] = 0.0
    return v


def sekil_gray_scott_tarama():
    """Pearson sınıflarından seçilmiş (F,k) çiftleri: benek, şerit, labirent."""
    ornekler = [
        ("Benekler (λ)  F=0.026 k=0.061", 0.026, 0.061),
        ("Benekler (ν)  F=0.046 k=0.067", 0.046, 0.067),
        ("Solucan/Şerit (μ)  F=0.046 k=0.065", 0.046, 0.065),
        ("Şerit (κ)  F=0.050 k=0.063", 0.050, 0.063),
        ("Labirent (π)  F=0.062 k=0.061", 0.062, 0.061),
        ("Benek+şerit karışımı  F=0.038 k=0.061", 0.038, 0.061),
    ]
    fig, axes = plt.subplots(2, 3, figsize=(11, 7.2))
    for ax, (baslik, F, k) in zip(axes.ravel(), ornekler):
        v = gray_scott(F, k)
        ax.imshow(v, cmap=KANAT_CMAP, vmin=0, vmax=0.5)
        ax.set_title(baslik, fontsize=9); ax.axis("off")
    fig.suptitle("Gray-Scott modeli: aynı denklem, farklı (F, k) → farklı desen aileleri",
                 fontsize=12)
    kaydet(fig, "01_gray_scott_tarama.png")


def sekil_gray_scott_kanat():
    """Kanat maskesi üzerinde Gray-Scott: damarlar difüzyona engel değil (kontrol)."""
    ny, nx = 150, 230
    maske, damar, _ = kanat_maskesi(ny, nx)
    ornekler = [("Benek rejimi  F=0.030 k=0.062", 0.030, 0.062),
                ("Şerit rejimi  F=0.050 k=0.063", 0.050, 0.063),
                ("Labirent rejimi  F=0.062 k=0.061", 0.062, 0.061)]
    fig, axes = plt.subplots(1, 3, figsize=(13, 3.6))
    for ax, (baslik, F, k) in zip(axes, ornekler):
        u = np.ones((ny, nx)); v = np.zeros((ny, nx))
        tohumla(u, v, maske, n_blok=40)
        for _ in range(7000):
            uvv = u * v * v
            u += 0.16 * laplacian(u) - uvv + F * (1 - u)
            v += 0.08 * laplacian(v) + uvv - (F + k) * v
            u[~maske] = 1.0; v[~maske] = 0.0
        img = np.where(maske, v, np.nan)
        ax.imshow(img, cmap=KANAT_CMAP, vmin=0, vmax=0.5)
        ax.contour(damar.astype(float), levels=[0.5], colors="k", linewidths=0.6)
        ax.set_title(baslik, fontsize=9); ax.axis("off")
    fig.suptitle("Kanat geometrisi üzerinde Gray-Scott (damarlar yalnızca çizildi, sınır değil)",
                 fontsize=11)
    kaydet(fig, "02_gray_scott_kanat.png")


# ----------------------------------------------------------------------------
# 2) GIERER-MEINHARDT — kanat hücrelerinde odak seçimi
#    ∂a/∂t = Da ∇²a + ρ a²/h − μa a + ρ0
#    ∂h/∂t = Dh ∇²h + ρ a²   − μh h
#    Damarlar: aktivatörün sabit kaynağı (Dirichlet). Nijhout (1990) ve
#    Sekimura vd. (2015) yaklaşımı: kaynak gücü hücreden hücreye değişince
#    bazı hücrelerde odak oluşur, bazılarında oluşmaz.
# ----------------------------------------------------------------------------

def gierer_meinhardt_kanat(kaynak_gucleri: list[float], ny: int = 150, nx: int = 230,
                           adim: int = 16000, Da: float = 1.0, Dh: float = 30.0,
                           rho: float = 1.0, mu_a: float = 1.0, mu_h: float = 1.5,
                           rho0: float = 0.01, kappa: float = 0.05, dt: float = 0.005):
    """Doymuş aktivatör: ρ a²/(h(1+κa²)). Doyma, benekleri sınırlı boyda tutar."""
    maske, damar, hucreler = kanat_maskesi(ny, nx)
    a = np.ones((ny, nx)) * 1.0 + 0.1 * rng.random((ny, nx))
    h = np.ones((ny, nx)) * 1.0
    # Her kanat hücresi için damar sınırındaki aktivatör kaynağı
    kaynak = np.zeros((ny, nx))
    for i, hm in enumerate(hucreler):
        # hücreye komşu damar pikselleri: hücre maskesini genişletip damarla kesiştir
        gen = hm.copy()
        gen[1:, :] |= hm[:-1, :]; gen[:-1, :] |= hm[1:, :]
        gen[:, 1:] |= hm[:, :-1]; gen[:, :-1] |= hm[:, 1:]
        kaynak[gen & damar] = np.maximum(kaynak[gen & damar], kaynak_gucleri[i % len(kaynak_gucleri)])
    sinir = damar | ~maske
    for _ in range(adim):
        aa = a * a
        a += dt * (Da * laplacian(a) + rho * aa / (h * (1 + kappa * aa)) - mu_a * a + rho0)
        h += dt * (Dh * laplacian(h) + rho * aa - mu_h * h)
        a[~maske] = 0.0; h[~maske] = 1.0
        a[damar] = kaynak[damar]     # Dirichlet: damar = kaynak
        np.clip(a, 0, 20, out=a); np.clip(h, 0.02, 20, out=h)
    return a, maske, damar


def sekil_gierer_meinhardt():
    fig, axes = plt.subplots(1, 2, figsize=(12, 3.8))
    senaryolar = [
        ("Damarlar eşit aktivatör kaynağı (a_damar = 1.0)", [1.0] * 7),
        ("Ön→arka artan damar kaynağı: a_damar = 0.2 … 3.0", list(np.linspace(0.2, 3.0, 7))),
    ]
    for ax, (baslik, kaynaklar) in zip(axes, senaryolar):
        a, maske, damar = gierer_meinhardt_kanat(kaynaklar)
        img = np.where(maske, a, np.nan)
        ax.imshow(img, cmap="magma", vmin=0, vmax=np.nanpercentile(img, 99))
        ax.contour(damar.astype(float), levels=[0.5], colors="w", linewidths=0.6)
        ax.set_title(baslik, fontsize=9); ax.axis("off")
    fig.suptitle("Gierer-Meinhardt (aktivatör a): damarlar Dirichlet kaynağı → damara paralel şeritler + hücre içi benekler",
                 fontsize=11)
    kaydet(fig, "03_gierer_meinhardt_odak.png")


# ----------------------------------------------------------------------------
# 3) GÖZ BENEĞİ — odaktan yayılan morfogen ve eşikler
#    ∂m/∂t = D ∇²m − γ m + s(x)   (s: odakta kaynak)
#    Kararlı durumda m(r) ~ K0(r/λ) (2B) → eşiklerle eşmerkezli halkalar.
#    İkinci morfogen (Dilão & Sainhas 2004) dış halkanın rengini değiştirir.
# ----------------------------------------------------------------------------

def goz_benegi(n: int = 120, odaklar=((60, 60),), D: float = 1.0, gamma: float = 0.004,
               adim: int = 4000, dt: float = 0.2, kaynak: float = 1.0):
    m = np.zeros((n, n))
    src = np.zeros((n, n))
    for (cy, cx) in odaklar:
        src[cy - 1:cy + 2, cx - 1:cx + 2] = kaynak
    for _ in range(adim):
        m += dt * (D * laplacian(m) - gamma * m + src)
    return m


def renklendir(m: np.ndarray, esikler=(0.35, 0.9, 2.2, 3.6),
               renkler=("#c9793a", "#3b2a14", "#e0b04a", "#151515", "#f4ecd8")):
    # düşük→yüksek morfogen: zemin, ince koyu halka, altın halka, siyah disk, beyaz pupil
    """Eşik tepkisi: hücre, morfogen düzeyine göre bir pigment 'seçer'."""
    idx = np.digitize(m, esikler)
    pal = np.array([matplotlib.colors.to_rgb(c) for c in renkler])
    return pal[idx]


def sekil_goz_benegi():
    fig, axes = plt.subplots(1, 4, figsize=(14, 3.8))
    # (a) tek odak
    m = goz_benegi()
    axes[0].imshow(renklendir(m)); axes[0].set_title("Tek odak → eşmerkezli halkalar", fontsize=9)
    # (b) yakın iki odak → birleşik göz beneği (Monteiro vd. 2001 deneyi)
    m2 = goz_benegi(odaklar=((60, 44), (60, 76)))
    axes[1].imshow(renklendir(m2)); axes[1].set_title("İki yakın odak → kaynaşmış benek", fontsize=9)
    # (c) daha kısa yayılım uzunluğu λ=√(D/γ) küçülür → küçük benek (mevsimsel plastisite)
    m3 = goz_benegi(gamma=0.012)
    axes[2].imshow(renklendir(m3)); axes[2].set_title("γ↑ (λ=√(D/γ) küçük) → küçük benek", fontsize=9)
    # (d) morfogen profili
    r = np.arange(0, 60)
    axes[3].plot(r, m[60, 60:120], lw=2, color="#7a4a1d", label="γ=0.004")
    axes[3].plot(r, m3[60, 60:120], lw=2, color="#d9822b", label="γ=0.012")
    for e in (0.35, 0.9, 2.2, 3.6):
        axes[3].axhline(e, ls=":", lw=0.8, color="gray")
    axes[3].set_yscale("log"); axes[3].set_xlabel("odaktan uzaklık (piksel)")
    axes[3].set_ylabel("morfogen m(r)"); axes[3].set_title("Radyal profil ve eşikler", fontsize=9)
    axes[3].legend(fontsize=8)
    for ax in axes[:3]:
        ax.axis("off")
    fig.suptitle("Göz beneği: odak kaynağı + difüzyon-bozunma + eşik tepkisi (Nijhout gradyan modeli)",
                 fontsize=11)
    kaydet(fig, "04_goz_benegi.png")


# ----------------------------------------------------------------------------
# 4) BİRLEŞİK "SENTETİK KANAT": odak seçimi + göz benekleri + kenar bandı
# ----------------------------------------------------------------------------

def sekil_sentetik_kanat():
    ny, nx = 220, 340
    maske, damar, hucreler = kanat_maskesi(ny, nx)
    y, x = np.mgrid[0:ny, 0:nx]
    # Her hücrenin orta hattında, dış kenara %70 mesafede bir odak (Nijhout ground plan: border ocelli)
    odaklar = {}
    for i, hm in enumerate(hucreler):
        if hm.sum() < 300:            # kenardaki ince dilimleri atla
            continue
        xs = x[hm]; ys = y[hm]
        hedef = int(np.quantile(xs, 0.70))
        sel = np.abs(xs - hedef) < 2
        if sel.any():
            odaklar[i] = (int(np.median(ys[sel])), hedef)
    # Tür-benzeri senaryo: yalnızca bazı hücrelerde göz beneği (Sekimura seçimi);
    # kaynak gücü hücreden hücreye değişir → farklı boyda benekler
    kaynak_gucu = {1: 1.0, 2: 0.45, 4: 0.6, 5: 1.1}
    m = np.zeros((ny, nx)); src = np.zeros((ny, nx))
    for j, g in kaynak_gucu.items():
        if j in odaklar:
            cy, cx = odaklar[j]
            src[cy - 1:cy + 2, cx - 1:cx + 2] = g
    for _ in range(3500):
        m += 0.2 * (1.0 * laplacian(m) - 0.004 * m + src)
        m[~maske] = 0
    # Kenar bantları (submarginal bands): yalnızca dış kenara paralel
    from scipy import ndimage
    uzak = ndimage.distance_transform_edt(maske)
    dis_bolge = (x / nx) > 0.55
    bant = dis_bolge & (((uzak > 5) & (uzak < 9)) | ((uzak > 14) & (uzak < 17)))
    # Boyama
    img = renklendir(m)
    zemin = m < 0.35
    img[bant & zemin] = matplotlib.colors.to_rgb("#3b2a14")
    img[damar & zemin] = matplotlib.colors.to_rgb("#5a3a1a")
    img[~maske] = 1.0
    fig, ax = plt.subplots(figsize=(8, 5.2))
    ax.imshow(img); ax.axis("off")
    ax.set_title("Sentetik kanat: seçili hücrelerde odak → göz benekleri + kenar bantları\n"
                 "(Nymphalid taban planı: 'border ocelli' + 'submarginal bands')", fontsize=10)
    kaydet(fig, "05_sentetik_kanat.png")


if __name__ == "__main__":
    sekil_gray_scott_tarama()
    sekil_gray_scott_kanat()
    sekil_gierer_meinhardt()
    sekil_goz_benegi()
    sekil_sentetik_kanat()
    print("Bitti. Şekiller:", CIKTI)
