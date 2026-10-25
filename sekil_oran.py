"""
sekil_oran.py — Oran varyansının ayrıştırılması (Şekil 5): CV² = CV_gerçek² + τ²·(1/r_p² + 1/r_d²)
Girdi: veri/mj_analiz.csv  Çıktı: sekiller/07_oran_cozunurluk.png, veri/oran_varyans_uyum.csv
"""
import os, numpy as np, pandas as pd
from scipy import stats
import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
KOK = os.path.dirname(os.path.abspath(__file__))
g = pd.read_csv(os.path.join(KOK, "veri", "mj_analiz.csv")); g["oran"] = g.r_p_px / g.r_d_px; g["q"] = 1/g.r_p_px**2 + 1/g.r_d_px**2
bins = pd.qcut(g.r_d_px, 3)
t = g.groupby(bins, observed=True).agg(n=("oran","size"), rp=("r_p_px","mean"), rd=("r_d_px","mean"), oran=("oran","mean"), sd=("oran","std"), q=("q","mean"))
t["cv"] = t.sd / t.oran
sl, ic, r, p_, se = stats.linregress(t.q, t.cv**2); cvb, tau = np.sqrt(ic), np.sqrt(sl)
t.assign(cv_gercek=cvb, tau_px=tau, r=r).to_csv(os.path.join(KOK, "veri", "oran_varyans_uyum.csv"))
fig, axes = plt.subplots(1, 3, figsize=(12.5, 3.7))
ax = axes[0]; vc = g.r_p_px.value_counts().sort_index(); ax.bar(vc.index, vc.values, width=0.4, color="#7a4a1d")
ax.set_xlabel("ölçülen pupil yarıçapı r_p (px, 0.5 px adım)"); ax.set_ylabel("birey sayısı"); ax.set_title(f"(a) Pupil 1–7 px ile ölçülüyor (n = {len(g)})", fontsize=9, loc="left")
ax = axes[1]; ax.scatter(g.r_d_px, g.oran, s=18, color="#7a4a1d", alpha=.7); ax.axhline(g.oran.mean(), color="#d9822b", lw=1.5)
ax.text(g.r_d_px.max(), g.oran.mean()+0.012, f"ortalama {g.oran.mean():.2f}", ha="right", fontsize=7, color="#d9822b")
ax.set_xlabel("siyah disk yarıçapı r_d (px)"); ax.set_ylabel("r_p / r_d"); ax.set_ylim(0, 0.6); ax.set_title("(b) Oranın saçılımı çözünürlükle daralmıyor", fontsize=9, loc="left")
ax = axes[2]; qq = np.linspace(0, 0.4, 50)
ax.plot(qq, np.sqrt(ic+sl*qq), color="#2b1d0e", lw=1.5, label=f"uyum: CV² = {cvb:.2f}² + ({tau:.2f} px)²·q")
ax.plot(qq, 0.144*np.sqrt(qq), color="#8a8a8a", lw=1, ls="--", label="yalnız 0.5 px yuvarlama (τ = 0.14 px)")
ax.plot(qq, np.sqrt(0.25+0.25/12)*np.sqrt(qq), color="#bbbbbb", lw=1, ls=":", label="σ = 0.5 px varsayımı (eski MC)")
ax.scatter(t.q, t.cv, s=60, color=["#c9a27a", "#a0703f", "#7a4a1d"], zorder=3)
for (q_, c_, n_), lab in zip(zip(t.q, t.cv, t.n), [f"{iv.left:g}–{iv.right:g} px" for iv in t.index]):
    ax.annotate(f"{lab}\nn = {n_}", (q_, c_), xytext=(6, -14), textcoords="offset points", fontsize=6.5)
ax.set_xlabel("q = 1/r_p² + 1/r_d²  (px⁻², kutu ortalaması)"); ax.set_ylabel("r_p/r_d değişim katsayısı (CV)"); ax.set_ylim(0, 0.3); ax.set_xlim(0, 0.4)
ax.legend(fontsize=6.5, frameon=False, loc="upper left"); ax.set_title("(c) Oran varyansı: gerçek değişkenlik + nicemleme", fontsize=9, loc="left")
fig.tight_layout(); fig.savefig(os.path.join(KOK, "sekiller", "07_oran_cozunurluk.png"), dpi=160, facecolor="white")
print(f"CV_gercek={cvb:.3f} tau={tau:.3f} px r={r:.2f}")
