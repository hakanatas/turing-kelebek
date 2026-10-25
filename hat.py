"""
hat.py — Tam ölçüm hattı: benek + silüet ölçeği + kayıt meta verisi
Çıktı: veri/mj_olcum_tum.csv ve teşhis görselleri (veri/teshis_tum/)
"""
import os, sys, csv
import numpy as np, pandas as pd, cv2
import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import benek_olc as bo
from silhuet_olcek import silhuet

KOK = os.path.dirname(os.path.abspath(__file__))
FOTO = os.path.join(KOK, "veri", "foto_mj_tum")
TESHIS = os.path.join(KOK, "veri", "teshis_tum"); os.makedirs(TESHIS, exist_ok=True)

kayit = pd.read_csv(os.path.join(KOK, "veri", "maniola_jurtina_kayitlar.csv"))
kayit["dosya"] = kayit.gozlem_id.astype(str) + "_" + kayit.foto_no.astype(str) + ".jpg"
meta = kayit.set_index("dosya")

sonuclar = []
dosyalar = sorted(f for f in os.listdir(FOTO) if f.endswith(".jpg"))
for i, f in enumerate(dosyalar):
    yol = os.path.join(FOTO, f)
    s = bo.olc(yol, teshis_dizin=None)
    s["dosya"] = f
    if s["durum"] == "ok":
        bgr = cv2.imread(yol)
        sil = silhuet(bgr, s["cx"], s["cy"], max(s["r_d_px"], 4))
        if sil:
            s.update(feret_px=sil["feret_px"], sil_alan_px=sil["sil_alan_px"],
                     sil_kenarda=sil["sil_kenarda"], turuncu_oran=sil["turuncu_oran"], d_kenar_px=sil["d_kenar_px"])
            # teşhis: silüet + halkalar
            x0, y0, x1, y1 = sil["kes_kutu"]; ol = sil["olcek"]
            kes = cv2.resize(bgr[y0:y1, x0:x1], None, fx=ol, fy=ol) if ol < 1 else bgr[y0:y1, x0:x1].copy()
            cnts, _ = cv2.findContours(sil["sil_maske"], cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            cv2.drawContours(kes, cnts, -1, (255, 0, 255), 1)
            c = (int((s["cx"] - x0) * ol), int((s["cy"] - y0) * ol))
            cv2.circle(kes, c, max(1, int(s["r_p_px"] * ol)), (255, 255, 255), 1)
            cv2.circle(kes, c, max(1, int(s["r_d_px"] * ol)), (255, 255, 0), 1)
            sc = 360 / max(kes.shape[:2]); kes = cv2.resize(kes, None, fx=sc, fy=sc)
            cv2.putText(kes, f"{f[:-4]} F={sil['feret_px']:.0f} dk={sil['d_kenar_px']:.0f} rd={s['r_d_px']:.0f} tur={sil['turuncu_oran']:.2f}",
                        (3, 12), cv2.FONT_HERSHEY_SIMPLEX, 0.38, (0, 0, 255), 1)
            cv2.imwrite(os.path.join(TESHIS, f[:-4] + ".png"), kes)
    for k in ("tarih", "enlem", "boylam", "rakim_m", "lisans", "gozlem_id"):
        s[k] = meta.loc[f, k] if f in meta.index else None
    sonuclar.append(s)
    if i % 50 == 0:
        print(i, f, s["durum"])

anahtarlar = sorted({k for s in sonuclar for k in s})
with open(os.path.join(KOK, "veri", "mj_olcum_tum.csv"), "w", newline="") as fh:
    w = csv.DictWriter(fh, fieldnames=anahtarlar); w.writeheader(); w.writerows(sonuclar)
d = pd.DataFrame(sonuclar)
print("toplam:", len(d), " tespit:", (d.durum == "ok").sum(), " geçerli(benek):", d.get("gecerli", pd.Series()).sum(),
      " silüetli:", d.get("feret_px", pd.Series()).notna().sum())
