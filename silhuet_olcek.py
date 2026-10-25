"""
silhuet_olcek.py — Kelebek silüetinden boyut ölçeği ve cinsiyet vekili
=====================================================================
Benek merkezi verildiğinde GrabCut ile kelebeği arka plandan ayırır,
silüetin en uzun çapını (Feret) piksel cinsinden döndürür. Bu değer
birey boyutunun vekilidir: tüm halka ölçüleri buna bölünerek
boyutsuz hale getirilir (fotoğraf yakınlığından bağımsız).

Ayrıca silüet içindeki doygun turuncu piksel oranını verir:
M. jurtina dişisinde ön kanat alt yüzü geniş turuncu, erkekte dar →
kaba cinsiyet vekili (0–1 arası; öğrenciler görsel doğrulama yapmalı).
"""
import numpy as np
import cv2


def silhuet(bgr: np.ndarray, cx: float, cy: float, r_d: float, k: float = 22.0):
    h, w = bgr.shape[:2]
    R = int(max(k * r_d, 150))
    x0, y0 = int(max(cx - R, 0)), int(max(cy - R, 0))
    x1, y1 = int(min(cx + R, w - 1)), int(min(cy + R, h - 1))
    kes = bgr[y0:y1, x0:x1]
    if kes.size == 0 or min(kes.shape[:2]) < 30:
        return None
    # Hız için küçült (GrabCut maliyeti piksel sayısıyla ölçeklenir); ölçüler geri büyütülür
    olc = min(1.0, 420 / max(kes.shape[:2]))
    if olc < 1.0:
        kes = cv2.resize(kes, None, fx=olc, fy=olc, interpolation=cv2.INTER_AREA)
    cx_l, cy_l, r_l = (cx - x0) * olc, (cy - y0) * olc, r_d * olc
    # GrabCut: dış dikdörtgen arka plan varsayımı; benek çevresi kesin ön plan
    mask = np.full(kes.shape[:2], cv2.GC_PR_BGD, np.uint8)
    m = int(0.08 * min(kes.shape[:2]))
    mask[m:-m, m:-m] = cv2.GC_PR_FGD
    lcx, lcy = int(cx_l), int(cy_l)
    cv2.circle(mask, (lcx, lcy), max(2, int(1.5 * r_l)), cv2.GC_FGD, -1)
    bgd = np.zeros((1, 65), np.float64); fgd = np.zeros((1, 65), np.float64)
    try:
        cv2.grabCut(kes, mask, None, bgd, fgd, 4, cv2.GC_INIT_WITH_MASK)
    except cv2.error:
        return None
    on = ((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD)).astype(np.uint8)
    on = cv2.morphologyEx(on, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
    n, lab, stats, _ = cv2.connectedComponentsWithStats(on, 8)
    if n < 2:
        return None
    etiket = lab[lcy, lcx]
    if etiket == 0:
        etiket = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    sil = (lab == etiket).astype(np.uint8)
    # Kesitin kenarına dayanıyorsa kelebek kadraja sığmamış olabilir
    kenar = sil[0, :].any() or sil[-1, :].any() or sil[:, 0].any() or sil[:, -1].any()
    cnts, _ = cv2.findContours(sil, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    c = max(cnts, key=cv2.contourArea)
    hull = cv2.convexHull(c).reshape(-1, 2).astype(np.float32)
    # Feret çapı: dışbükey zarf noktaları arası en büyük uzaklık
    d = np.sqrt(((hull[:, None, :] - hull[None, :, :]) ** 2).sum(-1))
    feret = float(d.max()) / olc
    alan = float(cv2.contourArea(c)) / olc**2
    # Cinsiyet vekili: silüet içinde doygun turuncu oranı
    hsv = cv2.cvtColor(kes, cv2.COLOR_BGR2HSV)
    turuncu = ((hsv[:, :, 0] >= 5) & (hsv[:, :, 0] <= 22) & (hsv[:, :, 1] > 110) & (hsv[:, :, 2] > 90))
    turuncu_oran = float((turuncu & (sil == 1)).sum() / max(sil.sum(), 1))
    # Benek merkezinden en yakın kanat kenarına uzaklık (her zaman görünür ölçek vekili)
    dt = cv2.distanceTransform(sil, cv2.DIST_L2, 5)
    d_kenar = float(dt[lcy, lcx]) / olc
    return dict(feret_px=feret, sil_alan_px=alan, sil_kenarda=bool(kenar), d_kenar_px=d_kenar,
                turuncu_oran=turuncu_oran, sil_maske=sil, kes_kutu=(x0, y0, x1, y1), olcek=olc)
