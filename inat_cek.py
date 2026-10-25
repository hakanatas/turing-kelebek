"""
inat_cek.py — iNaturalist'ten Türkiye kayıtlarını çeker (research grade).
Çıktı: veri/<tur>_kayitlar.csv  (gözlem id, tarih, enlem, boylam, rakım, fotoğraf URL, lisans)
Kullanım: python inat_cek.py "Maniola jurtina" "Aglais io"
"""
import sys, os, time, csv, requests

PLACE_TR = 7183
VERI = os.path.join(os.path.dirname(os.path.abspath(__file__)), "veri")
os.makedirs(VERI, exist_ok=True)


def gozlemleri_cek(tur: str):
    kayitlar, page = [], 1
    while True:
        r = requests.get("https://api.inaturalist.org/v1/observations", params={
            "taxon_name": tur, "place_id": PLACE_TR, "quality_grade": "research",
            "photos": "true", "per_page": 200, "page": page, "order_by": "observed_on"},
            timeout=60)
        r.raise_for_status()
        res = r.json()["results"]
        if not res:
            break
        for o in res:
            geo = o.get("geojson") or {}
            lon, lat = (geo.get("coordinates") or [None, None])
            for i, p in enumerate(o.get("photos", [])):
                url = p["url"].replace("square", "large")  # 1024 px kenar
                kayitlar.append({
                    "gozlem_id": o["id"], "foto_no": i, "foto_id": p["id"],
                    "tarih": o.get("observed_on"), "enlem": lat, "boylam": lon,
                    "konum_belirsizlik_m": o.get("positional_accuracy"),
                    "lisans": p.get("license_code"), "url": url,
                    "gozlemci": (o.get("user") or {}).get("login"),
                    "yer": o.get("place_guess"),
                })
        print(f"  sayfa {page}: {len(res)} gözlem")
        page += 1
        time.sleep(1.0)   # API nezaket sınırı
    return kayitlar


def rakim_ekle(kayitlar):
    """Open-Elevation ile rakım (SRTM). Erişilemezse boş bırakır."""
    noktalar = [(k["enlem"], k["boylam"]) for k in kayitlar if k["enlem"] is not None]
    benzersiz = sorted(set(noktalar))
    rakim = {}
    try:
        for i in range(0, len(benzersiz), 100):
            grup = benzersiz[i:i + 100]
            r = requests.post("https://api.open-elevation.com/api/v1/lookup",
                              json={"locations": [{"latitude": a, "longitude": b} for a, b in grup]},
                              timeout=60)
            r.raise_for_status()
            for (a, b), s in zip(grup, r.json()["results"]):
                rakim[(a, b)] = s["elevation"]
            time.sleep(0.5)
    except Exception as e:
        print("  rakım alınamadı:", e)
    for k in kayitlar:
        k["rakim_m"] = rakim.get((k["enlem"], k["boylam"]))
    return kayitlar


if __name__ == "__main__":
    turler = sys.argv[1:] or ["Maniola jurtina", "Aglais io"]
    for tur in turler:
        print(tur)
        kayitlar = gozlemleri_cek(tur)
        kayitlar = rakim_ekle(kayitlar)
        yol = os.path.join(VERI, tur.lower().replace(" ", "_") + "_kayitlar.csv")
        with open(yol, "w", newline="", encoding="utf-8") as f:
            w = csv.DictWriter(f, fieldnames=list(kayitlar[0].keys()))
            w.writeheader(); w.writerows(kayitlar)
        n_goz = len({k["gozlem_id"] for k in kayitlar})
        n_rak = sum(k["rakim_m"] is not None for k in kayitlar)
        print(f"  {n_goz} gözlem, {len(kayitlar)} fotoğraf, rakımlı: {n_rak} → {yol}")
