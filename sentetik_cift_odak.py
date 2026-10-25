"""
sentetik_cift_odak.py — İki odaklı PDE çözümü ile kaynaşma teoreminin ve ölçeksiz ters çözümün sınanması (Şekil 3)
Çıktı: veri/sentetik_cift_odak.csv, sekiller/10_sentetik_cift_odak.png   (~1–2 dk)
"""
import os, numpy as np, pandas as pd
from scipy.special import k0
from scipy.optimize import fsolve, brentq
from scipy.ndimage import label
import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
import kanat_turing as kt
KOK = os.path.dirname(os.path.abspath(__file__))
LAM, N = 12.0, 240; CX = N // 2

def iki_odak(a_px, lam_px=LAM, n=N):
    D = 1.0; gamma = D / lam_px**2
    return kt.goz_benegi(n=n, odaklar=((CX, int(round(CX - a_px))), (CX, int(round(CX + a_px)))), D=D, gamma=gamma, adim=30000, dt=0.2)

m1 = iki_odak(0.0)                                   # tek odak: eşikleri r_d = 3λ, r_p = 0.6λ olacak şekilde seç
r_d_t, r_p_t = 3.0 * LAM, 0.6 * LAM
prof = m1[CX, CX:]; th_d = np.interp(r_d_t, np.arange(len(prof)), prof); th_p = np.interp(r_p_t, np.arange(len(prof)), prof)

def lam_k0(a, w, R):
    return brentq(lambda lam: 2*k0(np.hypot(a, w)/lam) - (k0((R-a)/lam) + k0((R+a)/lam)), 2, 60)

satir = []; alanlar = {}
for a_px in (12, 20, 28, 36, 48):
    m = iki_odak(a_px); alanlar[a_px] = m
    disk, pup = m > th_d, m > th_p
    nd, npup = label(disk)[1], label(pup)[1]
    kayit = dict(a_px=a_px, a_lam=a_px/LAM, disk_parca=nd, pupil_parca=npup,
                 ongoru_disk_bagli=a_px < r_d_t + LAM*np.log(2), ongoru_pupil_bagli=a_px < r_p_t + LAM*np.log(2))
    if nd == 1:
        w = disk[:, CX].sum()/2; R = disk[CX, :].sum()/2
        lam_hat, rd_hat = fsolve(lambda v: [(v[1]+v[0]*np.log(2))**2 - a_px**2 - w**2, v[1] + v[0]*np.log(2*np.cosh(a_px/v[0])) - R], [10.0, 30.0])
        kayit.update(w=w, R=R, lam_hat_ustel=lam_hat, rd_hat=rd_hat, lam_hat_K0=lam_k0(a_px, w, R))
    satir.append(kayit)
S = pd.DataFrame(satir); S.to_csv(os.path.join(KOK, "veri", "sentetik_cift_odak.csv"), index=False)
print(S.round(2).to_string(index=False))

fig, axes = plt.subplots(1, 5, figsize=(13, 3.0))
xx = np.linspace(-CX, CX, 400); XX, YY = np.meshgrid(xx, xx)
for ax, a_px in zip(axes, (12, 20, 28, 36, 48)):
    ax.imshow(kt.renklendir(alanlar[a_px], esikler=(th_d*0.3, th_d*0.6, th_d, th_p)), extent=[-CX, CX, -CX, CX])
    E = np.exp(-np.hypot(XX-a_px, YY)/LAM) + np.exp(-np.hypot(XX+a_px, YY)/LAM)
    ax.contour(XX, YY, E, levels=[np.exp(-r_d_t/LAM)], colors=["#7a9cc6"], linewidths=1.0, linestyles="--")
    ax.set_title(f"a/λ = {a_px/LAM:.2f}", fontsize=9); ax.axis("off")
fig.suptitle("Sayısal çözüm (PDE, K₀) ve üstel yaklaşımın disk seviye eğrisi (kesikli): a/λ arttıkça tek pupil → çift pupil → boyun → ayrılma", fontsize=9)
fig.tight_layout(); fig.savefig(os.path.join(KOK, "sekiller", "10_sentetik_cift_odak.png"), dpi=160, facecolor="white")
