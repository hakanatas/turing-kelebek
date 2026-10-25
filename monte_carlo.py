"""
monte_carlo.py — Ölçüm gürültüsü altında hangi test hangi modeli ayırt eder?
=============================================================================
Gradyan modeli r_i = λ·ln(S/θ_i) ile üç üretici senaryoda (yalnız λ değişir /
yalnız S değişir / pupil sabit) sentetik M. jurtina benekleri üretilir; sonra
iNaturalist hattının gürültüsü taklit edilir (fotoğraf yakınlaştırması, 0.5 px
nicemleme, gürültülü ölçek vekili s, elle ölçülen kanat boyu L) ve üç test
uygulanır:
  T1  piksel ölçeğinde üç kısıtlı modelin AIC karşılaştırması (analiz.py'deki)
  T2  ölçekten bağımsız oran testi: Spearman ρ(r_p/r_d, r_d/s)
  T3  mm ölçeğinde (elle L ile) üç kısıtlı modelin AIC karşılaştırması
Çıktı: veri/monte_carlo_sonuc.csv, sekiller/06_monte_carlo.png

Çalıştır: python monte_carlo.py   (~1 dk)
"""
from __future__ import annotations
import os
import numpy as np, pandas as pd
from scipy import stats
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt

KOK = os.path.dirname(os.path.abspath(__file__))
rng = np.random.default_rng(2204)

# --- Gerçek (mm) taban değerleri: λ0 = 0.5 mm, ln(S/θ_d) = 4.4 → r_d = 2.2 mm,
#     ln(S/θ_p) = 0.88 → r_p = 0.44 mm (r_p/r_d = 0.20, gözlenen orana uygun)
LAM0, A_D, A_P = 0.5, 4.4, 0.88
L_MM_ORT = 23.0            # M. jurtina ön kanat uzunluğu (mm), tür ortalaması
PPM_ORT, PPM_SD = 5.7, 0.40  # px/mm log-normal (gözlenen r_d medyan 12.5 px / 2.2 mm)
S_MM, S_SD, S_GURULTU = 9.0, 1.2, 1.8   # benek→kenar uzaklığı; ICC ≈ 0.31
SIGMA_PX = 0.15   # yarıçap ölçüm gürültüsü (px); veriden kestirildi (τ ≈ 0.15–0.21 px, §4.7); 0.5 px ile duyarlılık


def uret(n: int, senaryo: str, cv: float = 0.20) -> pd.DataFrame:
    """Gerçek (mm) halka yarıçapları. cv: r_d'nin bireyler arası CV'si."""
    if senaryo == "lambda":            # yalnız λ değişir → tüm halkalar orantılı
        lam = LAM0 * np.exp(rng.normal(0, cv, n)); lnS = np.zeros(n)
    elif senaryo == "S":               # yalnız S değişir → halka farkı sabit
        lam = np.full(n, LAM0); lnS = rng.normal(0, cv * A_D, n)
    elif senaryo == "pupil_sabit":     # disk λ ile değişir, pupil kaynak hücreleri (sabit)
        lam = LAM0 * np.exp(rng.normal(0, cv, n)); lnS = np.zeros(n)
    elif senaryo == "lambda_theta":    # λ değişir + pupil eşiği bireyden bireye değişir (oran CV ≈ 0.17)
        lam = LAM0 * np.exp(rng.normal(0, cv, n)); lnS = np.zeros(n)
    else:
        raise ValueError(senaryo)
    r_d = lam * (A_D + lnS)
    r_p = lam * (A_P + lnS)
    if senaryo == "pupil_sabit":
        r_p = LAM0 * A_P * np.exp(rng.normal(0, 0.05, n))
    if senaryo == "lambda_theta":
        r_p = lam * A_P * np.exp(rng.normal(0, 0.17, n))
    L = rng.normal(L_MM_ORT, 1.6, n)
    s = rng.normal(S_MM, S_SD, n)
    return pd.DataFrame(dict(r_d=r_d, r_p=r_p, L=L, s=s))


def olc(g: pd.DataFrame, sigma: float = SIGMA_PX) -> pd.DataFrame:
    """Fotoğraf ölçümü taklidi: px/mm değişkenliği, ±0.5 px gürültü, 0.5 px nicemleme,
    gürültülü ölçek vekili s, elle işaretlenmiş L (%5 hata) ve tür-ortalaması ile mm'ye çevrim."""
    n = len(g)
    ppm = np.exp(rng.normal(np.log(PPM_ORT), PPM_SD, n))
    q = lambda x: np.round(2 * (x + rng.normal(0, sigma, n))) / 2
    r_d_px = q(g.r_d * ppm)
    r_p_px = q(g.r_p * ppm)
    s_px = ppm * (g.s + rng.normal(0, S_GURULTU, n))
    L_px = ppm * g.L * (1 + rng.normal(0, 0.05, n))
    mm_px = L_MM_ORT / L_px                      # birey L'si bilinmez; tür ortalaması kullanılır
    o = pd.DataFrame(dict(r_d_px=r_d_px, r_p_px=r_p_px, s_px=s_px, L_px=L_px,
                          r_d_mm=r_d_px * mm_px, r_p_mm=r_p_px * mm_px))
    # Hattın geçerlilik filtresi: disk ≥ 6 px, pupil görünür (≥ 1 px), s/r_d makul
    gecerli = (o.r_d_px >= 6) & (o.r_p_px >= 1) & (o.s_px / o.r_d_px > 1.5) & (o.s_px / o.r_d_px < 9)
    o["gecerli"] = gecerli
    return o


def aic1(res: np.ndarray) -> float:
    """Tek parametreli kısıtlı model için AIC (Gauss olabilirlik)."""
    return len(res) * np.log(np.mean(res ** 2)) + 2


def testler(o: pd.DataFrame) -> dict:
    o = o[o.gecerli]
    rp, rd, s = o.r_p_px.values, o.r_d_px.values, o.s_px.values
    # T1 — piksel ölçeğinde üç kısıtlı model (analiz.py ile aynı)
    beta = (rp * rd).sum() / (rd ** 2).sum()
    kap = ((rd - rp) * s).sum() / (s ** 2).sum()
    kap2 = (rp * s).sum() / (s ** 2).sum()
    a1 = dict(lambda_=aic1(rp - beta * rd), S=aic1(rp - (rd - kap * s)), pupil_sabit=aic1(rp - kap2 * s))
    # T2 — ölçekten bağımsız oran testi
    rho, p = stats.spearmanr(rd / s, rp / rd)
    # T3 — mm ölçeğinde (elle L) üç kısıtlı model
    rpm, rdm = o.r_p_mm.values, o.r_d_mm.values
    b = (rpm * rdm).sum() / (rdm ** 2).sum()
    c = np.mean(rdm - rpm)
    c2 = np.mean(rpm)
    a3 = dict(lambda_=aic1(rpm - b * rdm), S=aic1(rpm - (rdm - c)), pupil_sabit=aic1(rpm - c2))
    # T4 — oran testi, elle L ile
    rho4, p4 = stats.spearmanr(rdm, rpm / rdm)
    return dict(n_gecerli=len(o), T1_kazanan=min(a1, key=a1.get), T1_fark=sorted(a1.values())[1] - min(a1.values()),
                T2_rho=rho, T2_p=p, T3_kazanan=min(a3, key=a3.get), T3_fark=sorted(a3.values())[1] - min(a3.values()),
                T4_rho=rho4, T4_p=p4, oran_cv=np.std(rp / rd) / np.mean(rp / rd))


def kos(R: int = 400, n_list=(97, 150), cv: float = 0.20, sigma: float = SIGMA_PX,
        senaryolar=("lambda", "S", "pupil_sabit", "lambda_theta")) -> pd.DataFrame:
    kayit = []
    for sen in senaryolar:
        for n in n_list:
            for r in range(R):
                g = uret(n, sen, cv)
                pupil_yok = (g.r_p <= 0).mean()
                o = olc(g, sigma)
                t = testler(o)
                t.update(senaryo=sen, n=n, cv=cv, sigma=sigma, pupil_yok=pupil_yok)
                kayit.append(t)
    return pd.DataFrame(kayit)


def ozet(df: pd.DataFrame) -> pd.DataFrame:
    ad = {"lambda": "lambda_", "S": "S", "pupil_sabit": "pupil_sabit", "lambda_theta": "lambda_"}
    satir = []
    for (sen, n), d in df.groupby(["senaryo", "n"]):
        dogru = ad[sen]
        satir.append(dict(
            senaryo=sen, n=n,
            n_gecerli_ort=d.n_gecerli.mean(),
            pupil_yok_oran=d.pupil_yok.mean(),
            T1_px_dogru=(d.T1_kazanan == dogru).mean(),
            T1_px_lambda_sec=(d.T1_kazanan == "lambda_").mean(),
            T2_rho_ort=d.T2_rho.mean(),
            T2_anlamli=(d.T2_p < 0.05).mean(),
            T2_pozitif_anlamli=((d.T2_p < 0.05) & (d.T2_rho > 0)).mean(),
            T2_negatif_anlamli=((d.T2_p < 0.05) & (d.T2_rho < 0)).mean(),
            T3_mm_dogru=(d.T3_kazanan == dogru).mean(),
            T3_mm_lambda_sec=(d.T3_kazanan == "lambda_").mean(),
            T3_mm_fark_medyan=d.T3_fark.median(),
            oran_cv_ort=d.oran_cv.mean(),
        ))
    return pd.DataFrame(satir)


def sekil(oz: pd.DataFrame, yol: str, gozlenen_rho: float | None = -0.14):
    K = {"lambda": "#d9822b", "S": "#2b1d0e", "pupil_sabit": "#7a9cc6", "lambda_theta": "#b58b5a"}
    AD = {"lambda": "yalnız λ", "S": "yalnız S", "pupil_sabit": "pupil sabit", "lambda_theta": "λ + θ_p"}
    SEN = ("lambda", "S", "pupil_sabit", "lambda_theta")
    fig, axes = plt.subplots(1, 3, figsize=(13, 4.2))
    # (a) sentetik benekler: her senaryoda küçük ve büyük birey
    ax = axes[0]
    ornek = {
        "lambda": [(0.35, 1.75, 2.3), (0.55, 2.75, 3.6)],
        "S": [(0.10, 1.75, 2.3), (1.10, 2.75, 3.3)],
        "pupil_sabit": [(0.44, 1.75, 2.3), (0.44, 2.75, 3.6)],
        "lambda_theta": [(0.28, 1.75, 2.3), (0.70, 2.75, 3.6)],
    }
    for i, sen in enumerate(SEN):
        cy = 11.5 - i * 7.6 if len(SEN) == 3 else 14.0 - i * 7.3
        for j, (rp, rd, rg) in enumerate(ornek[sen]):
            cx = 4.0 + j * 8.0
            for r, c in ((rg, "#d9822b"), (rd, "#151515"), (rp, "#f4ecd8")):
                ax.add_patch(plt.Circle((cx, cy), r, color=c))
        ax.text(16.3, cy, AD[sen], va="center", fontsize=8, color=K[sen])
    ax.set_xlim(0, 25); ax.set_ylim(-7.8, 15.8); ax.set_aspect("equal"); ax.axis("off")
    ax.set_title("(a) Küçük ve büyük bireyde beklenen halkalar", fontsize=9, loc="left")
    # (b) oran testi: MC ortalaması + gözlenen değer
    ax = axes[1]
    x = np.arange(len(SEN)); w = 0.36
    for k, n in enumerate(sorted(oz.n.unique())):
        d = oz[oz.n == n].set_index("senaryo").loc[list(SEN)]
        ax.bar(x + (k - 0.5) * w, d.T2_rho_ort, w, color=[K[s] for s in d.index],
               hatch="//" if k == 0 else None, edgecolor="white", label=f"n = {n}")
    ax.axhline(0, color="gray", lw=0.8)
    if gozlenen_rho is not None:
        ax.axhline(gozlenen_rho, ls="--", color="#555555", lw=1.2)
        ax.text(0.5, gozlenen_rho - 0.05, f"gözlenen (n = 97): ρ = {gozlenen_rho:.2f}", fontsize=7, ha="center", color="#555555")
    ax.set_xticks(x); ax.set_xticklabels([AD[s] for s in SEN], fontsize=8)
    ax.set_ylabel("Spearman ρ(r_p/r_d, r_d/s), ortalama")
    ax.set_title("(b) Oran testinin işareti senaryoyu ayırır", fontsize=9, loc="left")
    from matplotlib.patches import Patch
    ax.legend(handles=[Patch(facecolor="#999999", hatch="//", edgecolor="white", label="n = 97"),
                       Patch(facecolor="#999999", label="n = 150")], fontsize=7, frameon=False, loc="upper left")
    # (c) doğru model seçme olasılığı: px AIC vs mm AIC
    ax = axes[2]
    d = oz[oz.n == oz.n.max()].set_index("senaryo").loc[list(SEN)]
    ax.bar(x - w / 2, d.T1_px_dogru, w, color="#bbbbbb", label="piksel ölçeği, ölçek vekili s (T1)")
    ax.bar(x + w / 2, d.T3_mm_dogru, w, color=[K[s] for s in d.index], label="mm ölçeği, elle L (T3)")
    ax.axhline(1 / 3, ls=":", color="gray", lw=0.8); ax.text(len(SEN) - 0.4, 0.355, "şans", fontsize=7, color="gray", ha="right")
    ax.set_xticks(x); ax.set_xticklabels([AD[s] for s in SEN], fontsize=8)
    ax.set_ylim(0, 1.3); ax.set_yticks([0, 0.2, 0.4, 0.6, 0.8, 1.0]); ax.set_ylabel("doğru modeli seçme olasılığı")
    ax.set_title(f"(c) Doğru modeli ancak mm ölçeği seçer (n = {int(oz.n.max())})", fontsize=9, loc="left")
    ax.legend(fontsize=7, frameon=False, loc="upper left", ncol=1)
    fig.tight_layout(); fig.savefig(yol, dpi=160, facecolor="white"); plt.close(fig)


if __name__ == "__main__":
    R = 400
    df = kos(R=R)
    oz = ozet(df)
    os.makedirs(os.path.join(KOK, "veri"), exist_ok=True); os.makedirs(os.path.join(KOK, "sekiller"), exist_ok=True)
    df.to_csv(os.path.join(KOK, "veri", "monte_carlo_ham.csv"), index=False)
    oz.to_csv(os.path.join(KOK, "veri", "monte_carlo_sonuc.csv"), index=False)
    sekil(oz, os.path.join(KOK, "sekiller", "06_monte_carlo.png"))
    print(oz.round(3).to_string(index=False))
