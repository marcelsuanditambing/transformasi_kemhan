#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
potong-laut.py — Memotong data batas laut dunia (Marine Regions) menjadi wilayah
sekitar Indonesia saja, supaya ukurannya kecil dan bisa di-commit ke GitHub
(GitHub menolak file > 100 MB).

Masukan : folder hasil ekstrak zip Marine Regions (berisi berkas .shp), mis.
            World_EEZ_v12_20231025     (ZEE 200 mil laut)
            World_12NM_v4_20231025     (laut teritorial 12 mil laut)
Keluaran: data-sumber/marineregions/eez_v12_sekitar_indonesia.gpkg
          data-sumber/marineregions/12nm_v4_sekitar_indonesia.gpkg
          data-sumber/marineregions/SUMBER.txt

Yang disimpan: semua poligon di dalam kotak 88°–148° BT, 18° LS–14° LU (ZEE
Indonesia beserta negara tetangga), dipotong rapi pada kotak itu. Semua atribut
asli dipertahankan. Folder data dunia sebaiknya tetap di LUAR repo.

Cara pakai (dari akar repo), contoh di Windows:
  py -m pip install -r scripts/requirements-peta.txt
  py scripts/potong-laut.py --eez "..\\2\\World_EEZ_v12_20231025" --tl "..\\2\\World_12NM_v4_20231025"
"""

import argparse
import datetime as dt
import sys
import warnings
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_OUT = ROOT / "data-sumber" / "marineregions"
KOTAK = (88.0, -18.0, 148.0, 14.0)  # (bujur min, lintang min, bujur maks, lintang maks)


def cetak(pesan):
    print(pesan, flush=True)


def gagal(pesan):
    print(f"\n[GAGAL] {pesan}", file=sys.stderr, flush=True)
    sys.exit(1)


def impor():
    try:
        import numpy as np
        import pyogrio
        import shapely
        from pyogrio import raw
    except ImportError as e:
        gagal(f"Pustaka Python belum terpasang ({e.name}). "
              "Jalankan: py -m pip install -r scripts/requirements-peta.txt")
    return np, pyogrio, shapely, raw


def cari_shp_poligon(folder, pyogrio):
    """Folder Marine Regions bisa berisi >1 shapefile (poligon + garis batas).
    Ambil yang bertipe poligon dan paling besar."""
    folder = Path(folder)
    if folder.is_file() and folder.suffix.lower() == ".shp":
        kandidat = [folder]
    else:
        if not folder.exists():
            gagal(f"Folder tidak ditemukan: {folder}")
        kandidat = sorted(folder.rglob("*.shp"))
    poligon = []
    for shp in kandidat:
        try:
            info = pyogrio.read_info(shp)
        except Exception:
            continue
        if "Polygon" in str(info.get("geometry_type", "")):
            poligon.append(shp)
    if not poligon:
        gagal(f"Tidak ada shapefile poligon di {folder}")
    return max(poligon, key=lambda p: p.stat().st_size)


def potong(shp, keluar, np, pyogrio, shapely, raw):
    cetak(f"  membaca {shp.name} (hanya area sekitar Indonesia) …")
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        meta, _fid, wkb, kolom = raw.read(shp, bbox=KOTAK)
    geoms = shapely.from_wkb(wkb)
    kotak = shapely.box(*KOTAK)

    simpan_geom, simpan_idx = [], []
    for i, g in enumerate(geoms):
        if g is None or g.is_empty:
            continue
        if not g.is_valid:
            g = shapely.make_valid(g)
        g = shapely.intersection(g, kotak)
        polys = [p for p in shapely.get_parts(g) if p.geom_type == "Polygon" and not p.is_empty]
        if not polys:
            continue
        simpan_geom.append(shapely.MultiPolygon(polys))
        simpan_idx.append(i)
    if not simpan_geom:
        gagal(f"Tidak ada poligon di area Indonesia pada {shp.name}")

    idx = np.array(simpan_idx, dtype=int)
    kolom_baru = [np.asarray(k)[idx] for k in kolom]
    keluar.parent.mkdir(parents=True, exist_ok=True)
    if keluar.exists():
        keluar.unlink()
    raw.write(str(keluar), np.array(shapely.to_wkb(simpan_geom), dtype=object), kolom_baru,
              fields=list(meta["fields"]), geometry_type="MultiPolygon",
              crs=meta.get("crs") or "EPSG:4326", driver="GPKG", encoding="UTF-8")

    nama_kolom = [f.upper() for f in meta["fields"]]
    nama = []
    if "GEONAME" in nama_kolom:
        nama = sorted({str(v) for v in kolom_baru[nama_kolom.index("GEONAME")]})
    ukuran = keluar.stat().st_size / 1024 / 1024
    cetak(f"  -> {keluar.relative_to(ROOT) if keluar.is_relative_to(ROOT) else keluar}: "
          f"{len(simpan_geom)} poligon, {ukuran:.1f} MB")
    return shp.name, len(simpan_geom), nama


def main():
    ap = argparse.ArgumentParser(description="Potong data Marine Regions ke sekitar Indonesia.")
    ap.add_argument("--eez", required=True, help="folder World_EEZ_v12_… (atau berkas .shp poligonnya)")
    ap.add_argument("--tl", required=True, help="folder World_12NM_v4_… (atau berkas .shp poligonnya)")
    ap.add_argument("--keluar", type=Path, default=DEFAULT_OUT, help="folder keluaran")
    arg = ap.parse_args()

    np, pyogrio, shapely, raw = impor()

    cetak("1/2 ZEE 200 mil laut")
    eez = potong(cari_shp_poligon(arg.eez, pyogrio), arg.keluar / "eez_v12_sekitar_indonesia.gpkg",
                 np, pyogrio, shapely, raw)
    cetak("2/2 Laut teritorial 12 mil laut")
    tl = potong(cari_shp_poligon(arg.tl, pyogrio), arg.keluar / "12nm_v4_sekitar_indonesia.gpkg",
                np, pyogrio, shapely, raw)

    teks = f"""Sumber: Flanders Marine Institute (VLIZ), Maritime Boundaries Geodatabase
Portal : https://www.marineregions.org (lisensi CC BY 4.0 — cantumkan sumber)

eez_v12_sekitar_indonesia.gpkg  <- {eez[0]}  (ZEE 200 mil laut, v12, 2023-10-25)
12nm_v4_sekitar_indonesia.gpkg  <- {tl[0]}  (laut teritorial 12 mil laut, v4, 2023-10-25)

Dipotong oleh scripts/potong-laut.py pada {dt.date.today().isoformat()}
Kotak potong: bujur {KOTAK[0]}..{KOTAK[2]}, lintang {KOTAK[1]}..{KOTAK[3]} (negatif = LS)
Atribut asli dipertahankan.
"""
    (arg.keluar / "SUMBER.txt").write_text(teks, encoding="utf-8")

    cetak("\nSelesai. Wilayah ZEE yang tercakup:")
    for n in eez[2]:
        cetak(f"  - {n}")


if __name__ == "__main__":
    main()
