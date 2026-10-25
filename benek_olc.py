"""
benek_olc.py — Göz beneği halka ölçümü (radyal profil yöntemi)
==============================================================
Bir kelebek fotoğrafında göz beneğini bulur, merkezden dışa doğru
parlaklık ve doygunluk profillerini çıkarır ve halka sınırlarını verir:

    r_p : beyaz pupil yarıçapı          (parlak → koyu geçişi)
    r_d : siyah disk dış yarıçapı       (koyu → açık geçişi)
    r_g : altın/turuncu halka dış yarıçapı (doygunluk düşüşü; yoksa NaN)

Kullanım:
    python benek_olc.py foto.jpg                  # otomatik merkez
    python benek_olc.py foto.jpg --merkez 412 233 # elle merkez (x y)
    python benek_olc.py klasor/ --csv sonuc.csv   # toplu

Her fotoğraf için teşhis görseli (profil + halkalar) yazılır.
H1 testi için gereken w/r_d oranı ölçekten bağımsızdır; H2 için ön kanat
uzunluğu (piksel) --L parametresiyle verilirse mm'ye çevrilir.
"""
from __future__ import annotations
import argparse, csv, os, sys
import numpy as np
import cv2
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt


# ----------------------------------------------------------------------------
# 1) Otomatik göz beneği tespiti
# ----------------------------------------------------------------------------

def benek_bul(bgr: np.ndarray, en_kucuk=4, en_buyuk=120):
    """
    Koyu, yaklaşık dairesel ve içinde parlak bir pupil barındıran lekeleri arar.
    Skor = dairesellik × (pupil parlaklık farkı) × (koyuluk).
    Döndürür: (cx, cy, r_tahmini, skor) veya None
    """
    gri = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
    gri_b = cv2.GaussianBlur(gri, (3, 3), 0)
    # Yerel koyuluk: büyük pencere ortalamasına göre belirgin koyu pikseller
    yerel = cv2.blur(gri_b, (61, 61)).astype(np.float32)
    koyu = (gri_b.astype(np.float32) < yerel - 45).astype(np.uint8)
    koyu = cv2.morphologyEx(koyu, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    n, lab, stats, cent = cv2.connectedComponentsWithStats(koyu, 8)
    adaylar = []
    for i in range(1, n):
        x, y, w, h, alan = stats[i]
        r = np.sqrt(alan / np.pi)
        if not (en_kucuk <= r <= en_buyuk):
            continue
        en_boy = max(w, h) / max(1, min(w, h))
        if en_boy > 1.8:
            continue
        dairesellik = alan / (np.pi * (max(w, h) / 2) ** 2)      # 1 = tam daire
        if dairesellik < 0.45:
            continue
        cx, cy = cent[i]
        # Pupil: bileşenin sınırlayıcı kutusu içinde, koyu maskeye dâhil olmayan parlak piksel
        yy, xx = np.ogrid[:gri.shape[0], :gri.shape[1]]
        ic = (xx - cx) ** 2 + (yy - cy) ** 2 <= (0.8 * r) ** 2
        ic_pks = gri_b[ic]
        koyu_ort = ic_pks[koyu[ic] == 1].mean() if (koyu[ic] == 1).any() else 255
        pupil_fark = float(np.percentile(ic_pks, 99) - koyu_ort)
        if pupil_fark < 40:          # pupil yoksa gerçek göz beneği değil
            continue
        # Pupil merkeze yakın olmalı (çiçek/arka plan parlaklığını ele)
        ic_idx = np.argwhere(ic)
        parlak = ic_idx[gri_b[ic] >= np.percentile(ic_pks, 99)]
        pupil_uzak = np.hypot(parlak[:, 1] - cx, parlak[:, 0] - cy).mean() / max(r, 1)
        if pupil_uzak > 0.45:
            continue
        # Çevre halkası (1.3r–1.8r): sıcak tonlu kanat zemini olmalı, yeşil/beyaz değil
        halka = ((xx - cx) ** 2 + (yy - cy) ** 2 <= (1.8 * r) ** 2) & \
                ((xx - cx) ** 2 + (yy - cy) ** 2 >= (1.3 * r) ** 2)
        if halka.sum() < 20:
            continue
        hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
        H = hsv[:, :, 0][halka]; Sv = hsv[:, :, 1][halka]; V = hsv[:, :, 2][halka]
        sicak = ((H <= 30) | (H >= 170)).mean()          # turuncu-kahverengi-sarı payı
        yesil = ((H > 35) & (H < 90) & (Sv > 60)).mean()
        beyaz = ((Sv < 40) & (V > 200)).mean()
        if sicak < 0.5 or yesil > 0.2 or beyaz > 0.3:
            continue
        koyuluk = float(255 - koyu_ort) / 255
        skor = dairesellik * (pupil_fark / 255) * koyuluk * sicak * np.log(alan + 1)
        adaylar.append((float(cx), float(cy), float(r), float(skor)))
    if not adaylar:
        return None
    return max(adaylar, key=lambda a: a[3])


def merkez_iyilestir(gri: np.ndarray, cx: float, cy: float, r: float):
    """Merkezi pupilin (yerel en parlak nokta) üzerine oturtur."""
    x0, x1 = int(max(cx - r, 0)), int(min(cx + r, gri.shape[1] - 1))
    y0, y1 = int(max(cy - r, 0)), int(min(cy + r, gri.shape[0] - 1))
    kes = cv2.GaussianBlur(gri[y0:y1 + 1, x0:x1 + 1], (3, 3), 0)
    iy, ix = np.unravel_index(np.argmax(kes), kes.shape)
    return float(x0 + ix), float(y0 + iy)


# ----------------------------------------------------------------------------
# 2) Radyal profil ve halka sınırları
# ----------------------------------------------------------------------------

def radyal_profil(bgr: np.ndarray, cx: float, cy: float, R: int, n_aci: int = 180):
    """Her r için açı ortalaması: parlaklık L (0-255) ve doygunluk S (0-255)."""
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV)
    lab = cv2.cvtColor(bgr, cv2.COLOR_BGR2LAB)
    L = lab[:, :, 0].astype(np.float32)
    S = hsv[:, :, 1].astype(np.float32)
    aci = np.linspace(0, 2 * np.pi, n_aci, endpoint=False)
    rs = np.arange(0, R, 0.5)
    xs = cx + np.outer(rs, np.cos(aci)); ys = cy + np.outer(rs, np.sin(aci))
    Lp = cv2.remap(L, xs.astype(np.float32), ys.astype(np.float32), cv2.INTER_LINEAR,
                   borderMode=cv2.BORDER_REPLICATE)
    Sp = cv2.remap(S, xs.astype(np.float32), ys.astype(np.float32), cv2.INTER_LINEAR,
                   borderMode=cv2.BORDER_REPLICATE)
    return rs, np.median(Lp, axis=1), np.median(Sp, axis=1)


def halkalari_bul(rs, Lp, Sp):
    """
    Parlaklık profilinden:
      r_p: merkezden dışa ilk keskin düşüş (pupil → siyah disk)
      r_d: sonraki keskin yükseliş (siyah disk → açık halka/zemin)
    Doygunluk profilinden:
      r_g: r_d'den sonra doygunluğun zirveden %50 düştüğü yer (turuncu halka → kahverengi zemin)
    Sınır tanımı: iki plato arasındaki yarı-yükseklik noktası.
    """
    Ls = np.convolve(Lp, np.ones(3) / 3, mode="same")
    dL = np.gradient(Ls, rs)
    # pupil: en güçlü negatif gradyan, ilk 1/3 içinde
    n3 = max(3, len(rs) // 3)
    ip = int(np.argmin(dL[:n3]))
    # disk kenarı: ip'den sonra en güçlü pozitif gradyan
    id_ = ip + int(np.argmax(dL[ip:]))
    r_p, r_d = rs[ip], rs[id_]
    # yarı-yükseklik düzeltmesi (plato ortalamaları)
    L_pupil = Ls[:max(ip, 1)].mean(); L_disk = Ls[ip:id_].mean() if id_ > ip else Ls[ip]
    L_dis = Ls[id_:min(id_ + 6, len(Ls))].mean()
    yarim1 = (L_pupil + L_disk) / 2; yarim2 = (L_disk + L_dis) / 2
    k = np.where(Ls[:id_] < yarim1)[0]; r_p = rs[k[0]] if len(k) else r_p
    k = np.where(Ls[id_ - 2:] > yarim2)[0]; r_d = rs[id_ - 2 + k[0]] if len(k) else r_d
    # altın/turuncu halka: r_d'den sonra doygunluk
    Ss = np.convolve(Sp, np.ones(5) / 5, mode="same")
    dis = rs >= r_d
    r_g = np.nan; S_zirve = np.nan
    if dis.sum() > 6:
        seg = Ss[dis]; rseg = rs[dis]
        iz = int(np.argmax(seg[: max(3, len(seg) // 2)]))
        S_zirve = seg[iz]; S_son = np.percentile(seg[len(seg) // 2:], 20)
        if S_zirve - S_son > 25:            # belirgin doygun halka var
            esik = (S_zirve + S_son) / 2
            k = np.where(seg[iz:] < esik)[0]
            if len(k):
                r_g = rseg[iz + k[0]]
    return dict(r_p=float(r_p), r_d=float(r_d), r_g=float(r_g),
                L_pupil=float(L_pupil), L_disk=float(L_disk), L_dis=float(L_dis),
                S_zirve=float(S_zirve))


# ----------------------------------------------------------------------------
# 3) Tek fotoğraf ölçümü + teşhis görseli
# ----------------------------------------------------------------------------

def olc(yol: str, merkez=None, L_px=None, L_mm=None, teshis_dizin=None):
    bgr = cv2.imread(yol)
    if bgr is None:
        return dict(dosya=os.path.basename(yol), durum="okunamadi")
    gri = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY)
    if merkez is None:
        b = benek_bul(bgr)
        if b is None:
            return dict(dosya=os.path.basename(yol), durum="benek_bulunamadi")
        cx, cy, r0, skor = b
    else:
        cx, cy = merkez; r0, skor = 15.0, np.nan
    cx, cy = merkez_iyilestir(gri, cx, cy, max(3, 0.5 * r0))
    R = int(min(max(4 * r0, 25), cx, cy, bgr.shape[1] - cx - 1, bgr.shape[0] - cy - 1))
    rs, Lp, Sp = radyal_profil(bgr, cx, cy, R)
    h = halkalari_bul(rs, Lp, Sp)
    w = h["r_g"] - h["r_d"] if not np.isnan(h["r_g"]) else np.nan
    olcek = (L_mm / L_px) if (L_px and L_mm) else np.nan
    son = dict(dosya=os.path.basename(yol), durum="ok", cx=round(cx, 1), cy=round(cy, 1),
               skor=round(float(skor), 3) if not np.isnan(skor) else np.nan,
               r_p_px=h["r_p"], r_d_px=h["r_d"], r_g_px=h["r_g"], w_px=w,
               w_bolu_rd=(w / h["r_d"]) if not np.isnan(w) else np.nan,
               rp_bolu_rd=h["r_p"] / h["r_d"] if h["r_d"] > 0 else np.nan,
               L_pupil=round(h["L_pupil"], 1), L_disk=round(h["L_disk"], 1), L_dis=round(h["L_dis"], 1),
               gecerli=bool(h["r_p"] > 0 and h["L_disk"] < 70 and h["r_d"] >= 6
                            and (h["L_pupil"] - h["L_disk"]) > 90),
               mm_per_px=olcek, r_d_mm=h["r_d"] * olcek if not np.isnan(olcek) else np.nan,
               w_mm=w * olcek if (not np.isnan(olcek) and not np.isnan(w)) else np.nan)
    if teshis_dizin:
        os.makedirs(teshis_dizin, exist_ok=True)
        fig, ax = plt.subplots(1, 2, figsize=(9, 3.6))
        x0, x1 = int(max(cx - R, 0)), int(min(cx + R, bgr.shape[1]))
        y0, y1 = int(max(cy - R, 0)), int(min(cy + R, bgr.shape[0]))
        ax[0].imshow(cv2.cvtColor(bgr[y0:y1, x0:x1], cv2.COLOR_BGR2RGB))
        for r, c, lab in ((h["r_p"], "w", "r_p"), (h["r_d"], "cyan", "r_d"), (h["r_g"], "gold", "r_g")):
            if not np.isnan(r):
                ax[0].add_patch(plt.Circle((cx - x0, cy - y0), r, fill=False, color=c, lw=1.2))
        ax[0].set_title(os.path.basename(yol), fontsize=8); ax[0].axis("off")
        ax[1].plot(rs, Lp, color="k", label="parlaklık L")
        ax[1].plot(rs, Sp, color="darkorange", label="doygunluk S")
        for r, c in ((h["r_p"], "gray"), (h["r_d"], "c"), (h["r_g"], "gold")):
            if not np.isnan(r):
                ax[1].axvline(r, color=c, ls="--", lw=1)
        ax[1].set_xlabel("merkezden uzaklık (px)"); ax[1].legend(fontsize=7)
        ax[1].set_title(f"r_p={h['r_p']:.1f}  r_d={h['r_d']:.1f}  r_g={h['r_g']:.1f}", fontsize=8)
        fig.tight_layout()
        fig.savefig(os.path.join(teshis_dizin, os.path.splitext(os.path.basename(yol))[0] + "_teshis.png"), dpi=110)
        plt.close(fig)
    return son


# ----------------------------------------------------------------------------
# 4) CLI
# ----------------------------------------------------------------------------

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("hedef", help="fotoğraf ya da klasör")
    ap.add_argument("--merkez", nargs=2, type=float, metavar=("X", "Y"))
    ap.add_argument("--L", type=float, help="ön kanat uzunluğu (px)")
    ap.add_argument("--Lmm", type=float, help="ön kanat uzunluğu (mm), tür ortalaması")
    ap.add_argument("--csv", default=None)
    ap.add_argument("--teshis", default="teshis")
    a = ap.parse_args()
    dosyalar = ([a.hedef] if os.path.isfile(a.hedef) else
                sorted(os.path.join(a.hedef, f) for f in os.listdir(a.hedef)
                       if f.lower().endswith((".jpg", ".jpeg", ".png"))))
    sonuclar = [olc(f, a.merkez, a.L, a.Lmm, a.teshis) for f in dosyalar]
    for s in sonuclar:
        print({k: v for k, v in s.items() if k in ("dosya", "durum", "r_p_px", "r_d_px", "r_g_px", "w_bolu_rd")})
    if a.csv:
        anahtarlar = sorted({k for s in sonuclar for k in s})
        with open(a.csv, "w", newline="") as f:
            w = csv.DictWriter(f, fieldnames=anahtarlar); w.writeheader(); w.writerows(sonuclar)
        print("yazıldı:", a.csv)
