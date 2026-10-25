"""
analiz.py — Ön bulgu grafikleri (M. jurtina, iNaturalist TR)
Girdi: veri/mj_olcum_tum.csv   Çıktı: veri/_bulgu_mj.png, veri/mj_analiz.csv
"""
import pandas as pd, numpy as np
from scipy import stats
import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt

d = pd.read_csv("veri/mj_olcum_tum.csv")
g = d[(d.durum == "ok") & (d.gecerli == True)].copy()
g = g[(g.d_kenar_px < 1e4) & (g.d_kenar_px > 0)]
g["s"] = g.d_kenar_px; g["k"] = g.s / g.r_d_px
g = g[(g.k > 1.5) & (g.k < 9)].drop_duplicates("gozlem_id")
g["rd_rel"] = g.r_d_px / g.s; g["oran"] = g.r_p_px / g.r_d_px; g["fark"] = g.r_d_px - g.r_p_px
g["ay"] = pd.to_datetime(g.tarih, errors="coerce").dt.month
g.to_csv("veri/mj_analiz.csv", index=False)
n = len(g)

K1, K2, K3 = "#2b1d0e", "#d9822b", "#7a4a1d"
fig, ax = plt.subplots(1, 3, figsize=(15, 4.4))

# (a) r_p vs r_d, üç model
ax[0].scatter(g.r_d_px, g.r_p_px, s=22, color=K3, alpha=.7)
x = np.linspace(4, g.r_d_px.max(), 50)
beta = (g.r_p_px * g.r_d_px).sum() / (g.r_d_px ** 2).sum()
ax[0].plot(x, beta * x, color=K2, lw=2, label=f"orantılı: r_p = {beta:.2f}·r_d")
kappa = (g.fark * g.s).sum() / (g.s ** 2).sum()
ax[0].plot(x, x - kappa * g.s.median(), "--", color=K1, label="sabit fark (s medyan)")
ax[0].axhline((g.r_p_px * g.s).sum() / (g.s ** 2).sum() * g.s.median(), ls=":", color="gray", label="sabit pupil (s medyan)")
ax[0].set_xlabel("siyah disk yarıçapı r_d (px)"); ax[0].set_ylabel("pupil yarıçapı r_p (px)")
ax[0].set_title(f"(a) Üç modelin uyumu, n = {n} birey", fontsize=10); ax[0].legend(fontsize=7)

# (b) zoom'dan bağımsız test: r_p/r_d vs r_d/s
rho, p = stats.spearmanr(g.rd_rel, g.oran)
ax[1].scatter(g.rd_rel, g.oran, s=22, color=K3, alpha=.7)
ax[1].axhline(g.oran.mean(), color=K2, lw=2, label=f"orantılı → yatay (ort {g.oran.mean():.2f})")
xr = np.linspace(g.rd_rel.min(), g.rd_rel.max(), 50)
ax[1].plot(xr, 1 - kappa / xr, "--", color=K1, label="sabit fark → artan")
ax[1].set_xlabel("göreli benek boyu r_d / s   (s: benek→kanat kenarı)"); ax[1].set_ylabel("r_p / r_d")
ax[1].set_title(f"(b) Ölçekten bağımsız test: Spearman ρ = {rho:.2f}, p = {p:.2f}", fontsize=10); ax[1].legend(fontsize=7)
ax[1].set_ylim(0, 0.6)

# (c) rakım
ax[2].scatter(g.rakim_m, g.rd_rel, s=22, color=K3, alpha=.7)
sl, ic, r, pp, se = stats.linregress(g.rakim_m, g.rd_rel)
xa = np.linspace(0, g.rakim_m.max(), 20)
ax[2].plot(xa, ic + sl * xa, color=K2, lw=2, label=f"eğim {sl*1000:+.3f}/1000 m, p = {pp:.2f}")
ax[2].set_xlabel("rakım (m, SRTM)"); ax[2].set_ylabel("göreli benek boyu r_d / s")
ax[2].set_title("(c) H2 ön bakış: benek boyu ~ rakım", fontsize=10); ax[2].legend(fontsize=8)

fig.suptitle("Maniola jurtina, iNaturalist Türkiye — otomatik ölçüm ön bulguları (piksel; s = ölçek vekili)", fontsize=11)
fig.tight_layout(); fig.savefig("veri/_bulgu_mj.png", dpi=140)
print(n, beta, kappa, rho, p, sl * 1000, pp)
