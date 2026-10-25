"""
sekil_cift_odak.py — İki odaklı modelin seviye eğrileri (Şekil 2): topoloji değişimi, kaynaşma koşulu, ölçeksiz oranlar
Çıktı: sekiller/09_cift_odak.png
"""
import os, numpy as np
from scipy.special import k0
from scipy.optimize import brentq
import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
KOK = os.path.dirname(os.path.abspath(__file__))
TUR, KOYU, MAVI, GRI, KREM = "#d9822b", "#2b1d0e", "#7a9cc6", "#8a8a8a", "#f4ecd8"
c_d, c_p = np.exp(-4.4), np.exp(-0.88)                 # λ = 1, S = 1 birimleri; tek benek r_d = 4.4, r_p = 0.88
def m_exp(X, Y, a): return np.exp(-np.hypot(X-a, Y)) + np.exp(-np.hypot(X+a, Y))
def m_k0(X, Y, a):
    d1 = np.hypot(X-a, Y); d2 = np.hypot(X+a, Y)
    return (k0(np.maximum(d1, 1e-6)) + k0(np.maximum(d2, 1e-6))) / k0(0.88) * np.exp(-0.88)
x = np.linspace(-8, 8, 700); X, Y = np.meshgrid(x, x); a_list = [0.6, 1.6, 3.5, 5.6]
fig = plt.figure(figsize=(13, 3.9)); gs = fig.add_gridspec(1, 3, width_ratios=[1.45, 1, 1]); ax = [fig.add_subplot(gs[0, i]) for i in range(3)]
for j, a in enumerate(a_list):
    M = m_exp(X, Y, a); ox = j * 17.0
    ax[0].contourf(X+ox, Y, M, levels=[c_d, c_p, 10], colors=["#151515", KREM]); ax[0].contour(X+ox, Y, M, levels=[c_d], colors=[TUR], linewidths=1.2)
    etiket = {0: "a < r_p+λ ln2\ntek pupil", 1: "r_p+λ ln2 < a < r_d+λ ln2\nçift pupil, tek disk", 2: "çift pupil,\nboyunlu disk", 3: "a > r_d+λ ln2\niki ayrı benek"}[j]
    ax[0].text(ox, -7.4, etiket, ha="center", va="top", fontsize=6.8)
ax[0].set_xlim(-8, 59); ax[0].set_ylim(-14, 8); ax[0].set_aspect("equal"); ax[0].axis("off")
ax[0].set_title("(a) İki odak: ayrım a arttıkça seviye eğrisinin topolojisi değişir", fontsize=9, loc="left")
A = np.linspace(0, 8, 300)
ax[1].plot(A, A-np.log(2), color=KOYU, lw=2); ax[1].set_xlim(0, 8); ax[1].set_ylim(0, 8); ax[1].fill_between(A, A-np.log(2), 8, color="#e8e2d6")
ax[1].text(1.6, 6.6, "seviye eğrisi BAĞLI\n(halka kaynaşmış)", fontsize=7.5, ha="center"); ax[1].text(6.1, 2.0, "seviye eğrisi AYRIK\n(iki ayrı halka)", fontsize=7.5, ha="center")
ax[1].axhline(4.4, color=TUR, lw=1, ls="--"); ax[1].text(0.15, 4.55, "disk eşiği ln(S/θ_d)", fontsize=7, color=TUR)
ax[1].axhline(0.88, color=MAVI, lw=1, ls="--"); ax[1].text(0.15, 1.03, "pupil eşiği ln(S/θ_p)", fontsize=7, color=MAVI)
for a_ in a_list: ax[1].plot([a_, a_], [0.88, 4.4], color=GRI, lw=0.8); ax[1].plot([a_, a_], [0.88, 4.4], "o", color=GRI, ms=3)
ax[1].annotate("çift pupil + tek disk penceresi\n(genişlik r_d − r_p)", xy=(2.6, 2.6), fontsize=7, xytext=(3.4, 0.35), arrowprops=dict(arrowstyle="->", lw=0.6))
ax[1].set_xlabel("yarı ayrım a / λ"); ax[1].set_ylabel("ln(S/θ)  (= tek benek yarıçapı / λ)")
ax[1].set_title("(b) Kaynaşma koşulu a < λ·ln(2S/θ): eyer noktası kriteri", fontsize=9, loc="left")
aa = np.linspace(0.9, 5.0, 200); rd = 4.4
w = np.sqrt(np.maximum((rd+np.log(2))**2 - aa**2, 0)); R = rd + np.log(2*np.cosh(aa))
wk, Rk = [], []
for a_ in aa:
    try: wk.append(brentq(lambda y: m_k0(np.array(0.0), np.array(y), a_) - c_d, 1e-3, 20) / a_)
    except ValueError: wk.append(np.nan)
    Rk.append(brentq(lambda xx: m_k0(np.array(xx), np.array(0.0), a_) - c_d, a_+1e-3, 30) / a_)
ax[2].plot(aa, w/aa, color=TUR, lw=2, label="bel yarı-genişliği w/a (üstel)"); ax[2].plot(aa, R/aa, color=KOYU, lw=2, label="eksen yarı-uzunluğu R/a (üstel)")
ax[2].plot(aa, wk, color=TUR, lw=1.2, ls="--", label="w/a (K₀ tam çözüm)"); ax[2].plot(aa, Rk, color=KOYU, lw=1.2, ls="--", label="R/a (K₀ tam çözüm)")
ax[2].set_xlabel("a / λ"); ax[2].set_ylabel("ölçekten bağımsız oranlar"); ax[2].set_ylim(0, 8); ax[2].legend(fontsize=7, frameon=False)
ax[2].set_title("(c) Ölçeksiz oranlar (r_d/λ = 4.4 kesiti)", fontsize=9, loc="left")
fig.tight_layout(); fig.savefig(os.path.join(KOK, "sekiller", "09_cift_odak.png"), dpi=160, facecolor="white"); print("yazıldı")
