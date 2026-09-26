# -*- coding: utf-8 -*-
"""
olah_laut.py — bagian dari scripts/buat-peta.py (tidak dijalankan sendiri).

Membuat dua berkas untuk "mode pin" di tab Simulasi JADC2:

  pantai.json  indeks garis pantai Indonesia per kab/kota. Dipakai untuk mencari
               pesisir terdekat dari titik di laut (aturan "pesisir terdekat").
  laut.json    batas laut dan negara tetangga, untuk menggambar peta dan
               menentukan zona titik:
                 negara      daratan negara tetangga (Natural Earth)
                 zona        wilayah laut yurisdiksi Indonesia (ZEE, Marine Regions)
                 asing       ZEE / klaim negara lain di sekitar Indonesia
                 teritorial  laut teritorial Indonesia (12 mil laut)
                 kepulauan   perairan di dalam garis pangkal kepulauan (diturunkan)
                 garis       garis batas terluar ZEE Indonesia (untuk digambar)

Semua isinya data umum (geografi); tidak ada informasi militer.
"""

import json
import math
from collections import Counter, defaultdict

KOTAK_LAUT = (88.0, -18.0, 148.0, 14.0)   # bujur min, lintang min, bujur maks, lintang maks
PANTAI_Q = 10000                          # koordinat pantai.json = bilangan bulat / 10000 (≈ 11 m)
GESER_PERBATASAN = 0.02                   # ≈ 2 km, uji sisi kiri/kanan garis untuk mengenali batas darat
LUBANG_KEPULAUAN_MIN = 0.02               # derajat² (≈ 250 km²); lubang lebih kecil diabaikan
NAMA_ZEE_IDN = "Indonesian Exclusive Economic Zone"
NAMA_12NM_IDN = "Indonesian 12 NM"

# Penyederhanaan tiap lapisan laut.json (meter)
SEDERHANA_LAUT = {
    "negara": 1500, "zona": 1000, "asing": 4000,
    "teritorial": 1000, "kepulauan": 2500, "garis": 1000,
}

# Nama negara dalam bahasa Indonesia (menimpa NAME_ID Natural Earth bila perlu)
NAMA_NEGARA = {
    "MYS": "Malaysia", "SGP": "Singapura", "BRN": "Brunei Darussalam", "PHL": "Filipina",
    "TLS": "Timor Leste", "PNG": "Papua Nugini", "AUS": "Australia", "THA": "Thailand",
    "VNM": "Vietnam", "KHM": "Kamboja", "MMR": "Myanmar", "IND": "India", "LAO": "Laos",
    "PLW": "Palau", "FSM": "Mikronesia", "GUM": "Guam", "USA": "Amerika Serikat",
    "CHN": "Tiongkok", "ATC": "Kepulauan Ashmore dan Cartier",
    "IOA": "Wilayah Samudra Hindia Australia", "PGA": "Kepulauan Spratly",
}
TERJEMAH = {"South China Sea": "Laut China Selatan"}


# ---------------------------------------------------------------------------
# utilitas
# ---------------------------------------------------------------------------
def _baca(pyogrio, shapely, path, kolom=None, bbox=None):
    from pyogrio import raw
    meta, _fid, wkb, data = raw.read(path, columns=kolom, bbox=bbox)
    nama_kolom = list(meta["fields"])
    geoms = shapely.from_wkb(wkb)
    baris = [{k: data[nama_kolom.index(k)][i] for k in nama_kolom} for i in range(len(geoms))]
    return geoms, baris


def _poligon(shapely, g):
    return [p for p in shapely.get_parts(g) if p.geom_type == "Polygon" and not p.is_empty]


def _isi_lubang(shapely, g):
    """Poligon tanpa lubang (pulau di dalam ZEE ikut 'diisi')."""
    return shapely.union_all([shapely.Polygon(p.exterior) for p in _poligon(shapely, g)])


def _tulis_geojson(shapely, path, item):
    fitur = []
    for g, prop in item:
        if g is None or g.is_empty:
            continue
        fitur.append({"type": "Feature", "properties": prop, "geometry": shapely.geometry.mapping(g)})
    path.write_text(json.dumps({"type": "FeatureCollection", "features": fitur}), encoding="utf-8")
    return len(fitur)


def dekode_topojson(topo, shapely):
    """TopoJSON -> [(properties, geometri shapely)] untuk validasi."""
    tr = topo.get("transform")
    arcs = []
    for arc in topo["arcs"]:
        x = y = 0
        titik = []
        for p in arc:
            if tr:
                x += p[0]
                y += p[1]
                titik.append((x * tr["scale"][0] + tr["translate"][0], y * tr["scale"][1] + tr["translate"][1]))
            else:
                titik.append((p[0], p[1]))
        arcs.append(titik)

    def cincin(idx):
        pts = []
        for i in idx:
            a = arcs[i] if i >= 0 else arcs[~i][::-1]
            pts.extend(a if not pts else a[1:])
        return pts

    hasil = []
    for obj in topo["objects"].values():
        for g in obj.get("geometries", []):
            t = g.get("type")
            if t == "Polygon":
                geom = shapely.Polygon(cincin(g["arcs"][0]), [cincin(r) for r in g["arcs"][1:]])
            elif t == "MultiPolygon":
                geom = shapely.MultiPolygon([
                    shapely.Polygon(cincin(pl[0]), [cincin(r) for r in pl[1:]]) for pl in g["arcs"]])
            elif t == "LineString":
                geom = shapely.LineString(cincin(g["arcs"]))
            elif t == "MultiLineString":
                geom = shapely.MultiLineString([cincin(l) for l in g["arcs"]])
            else:
                continue
            hasil.append((g.get("properties", {}), shapely.make_valid(geom)))
    return hasil


# ---------------------------------------------------------------------------
# data negara tetangga (Natural Earth)
# ---------------------------------------------------------------------------
def muat_negara(path, pyogrio, shapely):
    if not path.exists():
        raise FileNotFoundError(f"Data negara (Natural Earth) tidak ditemukan: {path}")
    geoms, baris = _baca(pyogrio, shapely, path, ["ADM0_A3", "NAME_ID", "NAME"], KOTAK_LAUT)
    kotak = shapely.box(*KOTAK_LAUT)
    hasil = []
    for g, b in zip(geoms, baris):
        g = shapely.intersection(shapely.make_valid(g), kotak)
        polys = _poligon(shapely, g)
        if not polys:
            continue
        kode = str(b["ADM0_A3"])
        nama = NAMA_NEGARA.get(kode) or b.get("NAME_ID") or b.get("NAME") or kode
        hasil.append((kode, str(nama), shapely.MultiPolygon(polys)))
    return hasil


# ---------------------------------------------------------------------------
# pantai.json — indeks garis pantai per kab/kota
# ---------------------------------------------------------------------------
def buat_pantai(topo_path, keluar_path, kab_ref, prov_ref, darat_asing, np, shapely):
    """topo_path: TopoJSON nasional kab/kota (disederhanakan, satu topologi).

    Garis pantai = busur (arc) yang hanya dipakai SATU kab/kota. Batas darat dengan
    negara tetangga (Kalimantan, Papua, Timor) juga hanya dipakai sekali, jadi
    dikenali dengan menggeser titik tengah tiap segmen ±2 km ke kiri/kanan: bila
    salah satu sisi jatuh di daratan negara lain, segmen itu batas darat.
    Keduanya disimpan dengan penanda jenis: 0 = pantai, 1 = batas darat negara.
    Titik di laut hanya dicocokkan ke pantai; titik di daratan negara tetangga
    boleh dicocokkan ke batas darat (wilayah Indonesia terdekat).
    """
    topo = json.loads(topo_path.read_text(encoding="utf-8"))
    tr = topo["transform"]
    obj = next(iter(topo["objects"].values()))

    def daftar_arc(g):
        if g["type"] == "Polygon":
            return [a for ring in g["arcs"] for a in ring]
        if g["type"] == "MultiPolygon":
            return [a for poly in g["arcs"] for ring in poly for a in ring]
        return []

    pakai = Counter()
    pemilik = {}
    for g in obj["geometries"]:
        kode = g["properties"]["kode"]
        for a in daftar_arc(g):
            i = a if a >= 0 else ~a
            pakai[i] += 1
            pemilik[i] = kode

    shapely.prepare(darat_asing)
    kab_urut = sorted(kab_ref)
    indeks_kab = {k: i for i, k in enumerate(kab_urut)}
    garis = []
    dibuang = 0
    jumlah_titik = 0
    for i, n in pakai.items():
        if n != 1:
            continue
        x = y = 0
        pts = []
        for p in topo["arcs"][i]:
            x += p[0]
            y += p[1]
            pts.append((x * tr["scale"][0] + tr["translate"][0], y * tr["scale"][1] + tr["translate"][1]))
        if len(pts) < 2:
            continue
        a = np.array(pts)
        p1, p2 = a[:-1], a[1:]
        tengah = (p1 + p2) / 2
        d = p2 - p1
        panjang = np.hypot(d[:, 0], d[:, 1])
        panjang[panjang == 0] = 1
        normal = np.stack([-d[:, 1] / panjang, d[:, 0] / panjang], axis=1) * GESER_PERBATASAN
        kiri = tengah + normal
        kanan = tengah - normal
        batas_darat = (shapely.contains_xy(darat_asing, kiri[:, 0], kiri[:, 1])
                       | shapely.contains_xy(darat_asing, kanan[:, 0], kanan[:, 1]))
        dibuang += int(batas_darat.sum())
        # pecah menjadi rangkaian segmen berjenis sama (pantai / batas darat)
        mulai = 0
        for s in range(1, len(p1) + 1):
            if s < len(p1) and batas_darat[s] == batas_darat[mulai]:
                continue
            q = []
            for lon, lat in pts[mulai:s + 1]:
                t = (round(lon * PANTAI_Q), round(lat * PANTAI_Q))
                if not q or q[-1] != t:
                    q.append(t)
            if len(q) >= 2:
                baris = [indeks_kab[pemilik[i]], int(bool(batas_darat[mulai])), q[0][0], q[0][1]]
                for (xa, ya), (xb, yb) in zip(q, q[1:]):
                    baris += [xb - xa, yb - ya]
                garis.append(baris)
                jumlah_titik += len(q)
            mulai = s

    data = {
        "catatan": "Garis pantai Indonesia per kab/kota (BIG, disederhanakan). Koordinat = bilangan bulat / q; "
                   "tiap baris: [indeks kab, jenis (0 pantai, 1 batas darat negara), x0, y0, dx1, dy1, ...].",
        "q": PANTAI_Q,
        "kab": [[k, kab_ref[k], k.split(".")[0]] for k in kab_urut],
        "prov": {k: prov_ref[k] for k in sorted(prov_ref)},
        "garis": garis,
    }
    keluar_path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return {"garis": len(garis), "titik": jumlah_titik, "segmen_batas_darat": dibuang}


# ---------------------------------------------------------------------------
# laut.json — zona laut dan negara tetangga
# ---------------------------------------------------------------------------
def siapkan_lapisan_laut(folder_laut, negara, tmp, pyogrio, shapely):
    """Tulis GeoJSON antara per lapisan ke folder tmp. Kembalikan ringkasan."""
    import shapely.geometry  # noqa: F401  (untuk mapping)

    berkas_zee = folder_laut / "eez_v12_sekitar_indonesia.gpkg"
    berkas_12 = folder_laut / "12nm_v4_sekitar_indonesia.gpkg"
    for b in (berkas_zee, berkas_12):
        if not b.exists():
            raise FileNotFoundError(f"Data batas laut tidak ditemukan: {b} (jalankan scripts/potong-laut.py)")

    zee_g, zee_b = _baca(pyogrio, shapely, berkas_zee)
    ter_g, ter_b = _baca(pyogrio, shapely, berkas_12)

    zee_idn = [g for g, b in zip(zee_g, zee_b) if b.get("GEONAME") == NAMA_ZEE_IDN]
    ter_idn = [g for g, b in zip(ter_g, ter_b) if b.get("GEONAME") == NAMA_12NM_IDN]
    if len(zee_idn) != 1 or len(ter_idn) != 1:
        raise ValueError("ZEE / laut teritorial Indonesia tidak ditemukan di data Marine Regions.")
    zee_idn = shapely.make_valid(zee_idn[0])
    ter_idn = shapely.make_valid(ter_idn[0])
    asing = [(shapely.make_valid(g), b) for g, b in zip(zee_g, zee_b) if b.get("GEONAME") != NAMA_ZEE_IDN]
    asing_gabung = shapely.union_all([g for g, _ in asing])

    darat = {kode: g for kode, _, g in negara}
    darat_idn = darat.get("IDN")
    if darat_idn is None:
        raise ValueError("Daratan Indonesia tidak ada di data Natural Earth.")

    # (1) zona yurisdiksi Indonesia: ZEE tanpa lubang pulau + daratan Indonesia
    #     (menutup 'takik' pantai Kalimantan/Papua/Timor), dikurangi ZEE negara lain.
    zona = shapely.difference(shapely.union(_isi_lubang(shapely, zee_idn), darat_idn.buffer(0.02)), asing_gabung)
    bagian = []
    for p in _poligon(shapely, zona):
        # lubang kecil (muara/danau) diisi; lubang milik negara lain (mis. Oecusse) dipertahankan
        tetap = [h for h in p.interiors
                 if shapely.intersection(shapely.Polygon(h), asing_gabung).area > 0.1 * shapely.Polygon(h).area]
        bagian.append(shapely.Polygon(p.exterior, tetap))
    zona = shapely.MultiPolygon(bagian)

    # (2) laut teritorial Indonesia (pita 12 mil laut di luar garis pangkal)
    teritorial = shapely.intersection(ter_idn, zona)

    # (3) perairan kepulauan: area yang dikelilingi pita 12 mil laut + daratan
    #     = perairan di dalam garis pangkal kepulauan (Laut Jawa, Selat Makassar, …).
    penutup = shapely.union_all([darat[k] for k in ("IDN", "MYS", "PNG", "TLS", "BRN") if k in darat])
    cincin = shapely.union_all([ter_idn.buffer(0.01), penutup.buffer(0.01)])
    lubang = [shapely.Polygon(h) for p in _poligon(shapely, cincin) for h in p.interiors]
    lubang = [h for h in lubang if h.area >= LUBANG_KEPULAUAN_MIN]
    kepulauan = shapely.difference(shapely.intersection(shapely.union_all(lubang), zona), ter_idn)

    # (4) ZEE / klaim negara lain. Bentuk dihaluskan dan digabung dengan daratannya
    #     (detail pantai tidak diperlukan: daratan diuji lebih dulu), sedikit
    #     dilebarkan agar tidak ada celah dengan zona Indonesia (zona diuji lebih dulu).
    item_asing = []
    for g, b in asing:
        sov = str(b.get("ISO_SOV1") or "")
        wil = str(b.get("ISO_TER1") or sov)
        isi = _isi_lubang(shapely, g)
        d = darat.get(wil) or darat.get(sov)
        if d is not None:
            isi = shapely.union(isi, shapely.intersection(d.buffer(0.05), isi.buffer(0.3)))
        isi = isi.buffer(0.03).simplify(0.01)
        geo = str(b.get("GEONAME") or "")
        jenis = str(b.get("POL_TYPE") or "")
        if jenis == "Overlapping claim":
            ket = geo.split(":", 1)[-1].strip()
            nama = "Klaim tumpang tindih: " + TERJEMAH.get(ket, ket)
        elif jenis == "Joint regime":
            nama = "Rezim bersama: " + geo.split(":", 1)[-1].strip()
        else:
            nama = "ZEE " + NAMA_NEGARA.get(sov, str(b.get("SOVEREIGN1") or sov))
            if "(" in geo:
                nama += " (" + geo.split("(", 1)[1]
        item_asing.append((isi, {"kode": sov, "nama": nama, "jenis": jenis}))

    # (5) garis batas terluar ZEE Indonesia untuk digambar (tanpa bagian di darat)
    luar = shapely.union(_isi_lubang(shapely, zee_idn), darat_idn.buffer(0.02))
    semua_darat = shapely.union_all([g for _, _, g in negara])
    garis = shapely.difference(luar.boundary, semua_darat.buffer(0.03))
    garis = shapely.difference(garis, shapely.box(*KOTAK_LAUT).exterior.buffer(0.01))

    n = {
        "negara": _tulis_geojson(shapely, tmp / "negara.json",
                                 [(g, {"kode": k, "nama": nm}) for k, nm, g in negara if k != "IDN"]),
        "zona": _tulis_geojson(shapely, tmp / "zona.json", [(zona, {"kode": "IDN"})]),
        "asing": _tulis_geojson(shapely, tmp / "asing.json", item_asing),
        "teritorial": _tulis_geojson(shapely, tmp / "teritorial.json", [(teritorial, {"jenis": "teritorial"})]),
        "kepulauan": _tulis_geojson(shapely, tmp / "kepulauan.json", [(kepulauan, {"jenis": "kepulauan"})]),
        "garis": _tulis_geojson(shapely, tmp / "garis.json", [(garis, {"jenis": "zee"})]),
    }
    return n


def gabung_laut(tmp, keluar_path):
    data = {}
    for nama in SEDERHANA_LAUT:
        topo = json.loads((tmp / f"laut-{nama}.topo.json").read_text(encoding="utf-8"))
        # nama objek = nama lapisan (mapshaper memakai nama berkas)
        obj = next(iter(topo["objects"].values()))
        topo["objects"] = {nama: obj}
        data[nama] = topo
    keluar_path.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")


# ---------------------------------------------------------------------------
# validasi
# ---------------------------------------------------------------------------
# (bujur, lintang, zona yang diharapkan)
TITIK_UJI = [
    (112.00, -5.00, "kepulauan"),     # Laut Jawa
    (118.00, -2.00, "kepulauan"),     # Selat Makassar
    (127.00, -6.00, "kepulauan"),     # Laut Banda
    (108.50, 5.50, "zee"),            # Laut Natuna Utara
    (110.00, -9.20, "zee"),           # Samudra Hindia, selatan Jawa
    (136.00, -9.00, "zee"),           # Laut Arafura
    (122.00, 3.00, "zee"),            # Laut Sulawesi
    (101.50, 2.60, "asing:MYS"),      # Selat Malaka dekat Malaysia
    (113.00, 3.00, "negara:MYS"),     # daratan Sarawak
    (125.50, -8.80, "negara:TLS"),    # daratan Timor Leste
    (90.00, -10.00, "lepas"),         # Samudra Hindia, di luar semua ZEE
]


def validasi_laut(laut_path, pantai_path, kab_ref, prov_ref, shapely):
    data = json.loads(laut_path.read_text(encoding="utf-8"))
    for nama in SEDERHANA_LAUT:
        if nama not in data or not data[nama].get("objects"):
            raise ValueError(f"Lapisan {nama} tidak ada di laut.json")
    lap = {nama: dekode_topojson(data[nama], shapely) for nama in SEDERHANA_LAUT}
    if len(lap["zona"]) != 1:
        raise ValueError("Zona Indonesia harus tepat satu fitur.")
    if len(lap["negara"]) < 10 or len(lap["asing"]) < 10:
        raise ValueError("Data negara / ZEE asing terlalu sedikit.")

    def zona_titik(x, y):
        p = shapely.Point(x, y)
        for prop, g in lap["negara"]:
            if g.contains(p):
                return "negara:" + prop["kode"]
        if lap["zona"][0][1].contains(p):
            if any(g.contains(p) for _, g in lap["teritorial"]):
                return "teritorial"
            if any(g.contains(p) for _, g in lap["kepulauan"]):
                return "kepulauan"
            return "zee"
        for prop, g in lap["asing"]:
            if g.contains(p):
                return "asing:" + prop["kode"]
        return "lepas"

    salah = []
    for x, y, harap in TITIK_UJI:
        dapat = zona_titik(x, y)
        if dapat != harap:
            salah.append(f"({x}, {y}) diharapkan {harap}, didapat {dapat}")
    if salah:
        raise ValueError("Titik uji laut tidak sesuai:\n    " + "\n    ".join(salah))

    pantai = json.loads(pantai_path.read_text(encoding="utf-8"))
    if [k[0] for k in pantai["kab"]] != sorted(kab_ref):
        raise ValueError("Daftar kab/kota di pantai.json tidak sama dengan rujukan.")
    prov_berpantai = {pantai["kab"][g[0]][2] for g in pantai["garis"] if g[1] == 0}
    tanpa_pantai = sorted(set(prov_ref) - prov_berpantai)
    # Papua Pegunungan (95) satu-satunya provinsi tanpa laut
    if tanpa_pantai != ["95"]:
        raise ValueError(f"Provinsi tanpa garis pantai tidak sesuai: {tanpa_pantai}")
    return len(TITIK_UJI)
