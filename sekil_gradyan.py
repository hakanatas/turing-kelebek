"""
sekil_gradyan.py — Gradyan modelinin matematiği (Şekil 1)
(a) Kararlı durum çözümü: 2B tam çözüm K0(r/λ) ve üstel yaklaşım; eşikler → halka yarıçapları
(b) λ ve S'nin çözüm eğrisine etkisi (log ölçekte: S → dikey kayma, λ → eğim)
(c) Üç senaryonun (r_d, r_p) düzlemindeki öngörü eğrileri
Çıktı: sekiller/08_gradyan_matematigi.png
"""
import os, numpy as np
from scipy.special import k0
from scipy.optimize import brentq
import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt

KOK = os.path.dirname(os.path.abspath(__file__))
TUR, KOYU, MAVI, GRI = "#d9822b", "#2b1d0e", "#7a9cc6", "#8a8a8a"
lam, S = 0.5, 1.0                       # mm, keyfi birim
esik = {"pupil": S*np.exp(-0.88), "disk": S*np.exp(-4.4)}   # r_p=0.44, r_d=2.2 mm (üstel)

fig, ax = plt.subplots(1, 3, figsize=(12.5, 3.7))
# (a)
r = np.linspace(0.05, 3.2, 400)
m_ust = S*np.exp(-r/lam)
m_k0 = S*k0(r/lam)/k0(0.44/lam)*np.exp(-0.44/lam)   # pupil yarıçapında üstelle çakışacak biçimde ölçekle
ax[0].semilogy(r, m_ust, color=KOYU, lw=2, label="üstel yaklaşım  S·e^(−r/λ)")
ax[0].semilogy(r, m_k0, color=TUR, lw=2, ls="--", label="2B tam çözüm  ∝ K₀(r/λ)")
for ad, th, renk in (("θ_pupil", esik["pupil"], GRI), ("θ_disk", esik["disk"], GRI)):
    ax[0].axhline(th, color=renk, lw=0.8, ls=":")
    ri = lam*np.log(S/th); ax[0].plot([ri], [th], "o", color=KOYU, ms=4)
    ax[0].annotate(f"{ad} → r = {ri:.2f} mm", (ri, th), xytext=(6, 4), textcoords="offset points", fontsize=7)
ax[0].set_xlabel("odaktan uzaklık r (mm)"); ax[0].set_ylabel("morfogen m(r)  (log)")
ax[0].set_title("(a) Eşik, log-doğrusal profili kestiği yerde halka biter", fontsize=9, loc="left")
ax[0].legend(fontsize=7, frameon=False, loc="upper right"); ax[0].set_ylim(5e-3, 1.5)
# (b)
for lam2, S2, renk, ls, lab in ((0.5, 1.0, KOYU, "-", "λ=0.5, S=1 (taban)"), (0.5, 3.0, MAVI, "-", "S×3 → eğri yukarı kayar, halka farkı sabit"),
                                (0.75, 1.0, TUR, "-", "λ×1.5 → eğim azalır, halkalar orantılı")):
    ax[1].semilogy(r, S2*np.exp(-r/lam2), color=renk, ls=ls, lw=2, label=lab)
for th in esik.values(): ax[1].axhline(th, color=GRI, lw=0.8, ls=":")
ax[1].set_xlabel("odaktan uzaklık r (mm)"); ax[1].set_ylabel("m(r)  (log)"); ax[1].set_ylim(5e-3, 4)
ax[1].set_title("(b) ln m = ln S − r/λ: S kesmeyi, λ eğimi değiştirir", fontsize=9, loc="left")
ax[1].legend(fontsize=7, frameon=False, loc="upper right")
# (c)
rd = np.linspace(1.0, 4.0, 100)
ax[2].plot(rd, 0.2*rd, color=TUR, lw=2, label="yalnız λ değişir: r_p = 0.20·r_d")
ax[2].plot(rd, rd - 1.76, color=KOYU, lw=2, label="yalnız S değişir: r_p = r_d − 1.76 mm")
ax[2].plot(rd, 0.44*np.ones_like(rd), color=MAVI, lw=2, label="pupil sabit: r_p = 0.44 mm")
ax[2].plot([2.2], [0.44], "o", color="k", ms=5); ax[2].annotate("taban birey", (2.2, 0.44), xytext=(6, -12), textcoords="offset points", fontsize=7)
ax[2].set_xlabel("siyah disk yarıçapı r_d (mm)"); ax[2].set_ylabel("pupil yarıçapı r_p (mm)"); ax[2].set_ylim(-0.1, 1.3)
ax[2].set_title("(c) Üç senaryo (r_d, r_p) düzleminde üç farklı doğru", fontsize=9, loc="left")
ax[2].legend(fontsize=7, frameon=False, loc="upper left")
fig.tight_layout(); fig.savefig(os.path.join(KOK, "sekiller", "08_gradyan_matematigi.png"), dpi=160, facecolor="white")
print("yazıldı")
