#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
buat-peta.py — Mengolah data batas wilayah BIG menjadi berkas peta untuk fitur
"Simulasi" di halaman JAD.

Masukan
  data-sumber/RBI50K_ADMINISTRASI_KABKOTA_20230907.gdb
      FileGDB dari Ina-Geoportal BIG, layer ADMINISTRASI_AR_KABKOTA.
  server/protected-data/jadc2/wilayah-index.json
      Daftar kode + nama wilayah Kemendagri yang dipakai data JAD. Dipakai
      sebagai rujukan kode dan nama resmi (nama wilayah adalah data umum).

Keluaran (publik, ikut dibundel Vite)
  src/data/peta/provinsi.json        38 provinsi (TopoJSON, dimuat di awal)
  src/data/peta/kab/{kode}.json      kabupaten/kota per provinsi (TopoJSON, lazy)
  src/data/peta/meta.json            sumber data + parameter olah

Berkas keluaran HANYA berisi bentuk wilayah, kode, dan nama. Jangan menambahkan
informasi militer apa pun ke sini: folder src/ ikut terbundel dan terbuka.

Kebutuhan
  Python 3.9+   : pip install -r scripts/requirements-peta.txt
  Node.js (npx) : mapshaper diunduh otomatis lewat npx saat skrip berjalan.

Cara pakai (dari akar repo)
  python scripts/buat-peta.py
  python scripts/buat-peta.py --gdb data-sumber/<edisi-baru>.gdb
"""

import argparse
import datetime as dt
import json
import math
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time
import warnings
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_GDB = ROOT / "data-sumber" / "RBI50K_ADMINISTRASI_KABKOTA_20230907.gdb"
DEFAULT_REF = ROOT / "server" / "protected-data" / "jadc2" / "wilayah-index.json"
DEFAULT_OUT = ROOT / "src" / "data" / "peta"

LAYER = "ADMINISTRASI_AR_KABKOTA"
KOLOM_KODE = "KDPKAB"            # Kode PUM Kabupaten/Kota (format Kemendagri, mis. "21.03")
MAPSHAPER = "mapshaper@0.7.67"   # versi dikunci agar hasil olah bisa diulang

# Parameter olah (nilai bawaan; bisa diubah lewat argumen baris perintah)
PULAU_MIN_KM2 = 0.5          # bagian pulau lebih kecil dari ini dibuang...
PULAU_RELATIF = 0.10         # ...kecuali kab/kota yang pulau terbesarnya pun kecil
SEDERHANA_KAB_M = 250        # toleransi penyederhanaan batas kab/kota (meter)...
SEDERHANA_KECIL_M = 40       # ...diperhalus untuk kab/kota kecil (kota, gugus pulau)
LUAS_PER_METER = 4e5         # toleransi = luas(m²) / nilai ini, dibatasi 40–250 m
SEDERHANA_PROV_M = 1000      # toleransi penyederhanaan peta nasional (meter)
PULAU_NASIONAL_KM2 = 10      # pulau lebih kecil dari ini tidak tampil di peta nasional
KUANTISASI = 100000          # presisi koordinat TopoJSON

KM_PER_DERAJAT = 111.32


def cetak(pesan):
    print(pesan, flush=True)


def gagal(pesan):
    print(f"\n[GAGAL] {pesan}", file=sys.stderr, flush=True)
    sys.exit(1)


# ---------------------------------------------------------------------------
# 1. Rujukan kode & nama (Kemendagri)
# ---------------------------------------------------------------------------
def muat_rujukan(path):
    if not path.exists():
        gagal(f"Berkas rujukan tidak ditemukan: {path}")
    data = json.loads(path.read_text(encoding="utf-8"))
    prov, kab = {}, {}
    for kode, nama in data:
        kode = str(kode).strip()
        nama = str(nama).strip()
        n = len(kode.split("."))
        if n == 1:
            prov[kode] = nama
        elif n == 2:
            kab[kode] = nama
    if not prov or not kab:
        gagal("Berkas rujukan tidak berisi provinsi/kabupaten.")
    return prov, kab


# ---------------------------------------------------------------------------
# 2. Baca FileGDB, gabung per kabupaten, saring pulau kecil
# ---------------------------------------------------------------------------
def luas_km2(poly, shapely):
    lat = poly.centroid.y
    return shapely.area(poly) * KM_PER_DERAJAT ** 2 * math.cos(math.radians(lat))


def baca_dan_gabung(gdb, kab_ref, pulau_min_km2, pulau_relatif):
    try:
        import numpy as np
        import pyogrio
        import shapely
    except ImportError as e:
        gagal(f"Pustaka Python belum terpasang ({e.name}). "
              "Jalankan: pip install -r scripts/requirements-peta.txt")

    if not gdb.exists():
        gagal(f"FileGDB tidak ditemukan: {gdb}")

    lapisan = [nama for nama, _ in pyogrio.list_layers(gdb)]
    if LAYER not in lapisan:
        gagal(f"Layer {LAYER} tidak ada di {gdb.name}. Layer yang tersedia: {lapisan}")

    cetak(f"  membaca {gdb.name} / {LAYER} …")
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")  # peringatan organizePolygons() untuk poligon ber-ribuan pulau
        meta, _fid, wkb, kolom = pyogrio.raw.read(gdb, layer=LAYER, columns=[KOLOM_KODE])
    kode_arr = [("" if k is None else str(k).strip()) for k in kolom[0]]
    geoms = shapely.force_2d(shapely.from_wkb(wkb))
    cetak(f"  {len(geoms)} fitur dibaca")

    kelompok = defaultdict(list)
    dilewati = 0
    for k, g in zip(kode_arr, geoms):
        if k in kab_ref and g is not None and not g.is_empty:
            kelompok[k].append(g)
        else:
            dilewati += 1
    cetak(f"  {dilewati} fitur tanpa kode kab/kota Kemendagri dilewati "
          "(pulau kewenangan provinsi, area tak terdefinisi, segmen sengketa)")

    hilang = sorted(set(kab_ref) - set(kelompok))
    if hilang:
        gagal(f"{len(hilang)} kab/kota rujukan tidak punya poligon di GDB: {hilang[:15]}")

    hasil_kode, hasil_geom = [], []
    bagian_awal = bagian_akhir = 0
    for k in sorted(kelompok):
        potongan = [shapely.make_valid(g) for g in kelompok[k]]
        gab = shapely.union_all(potongan) if len(potongan) > 1 else potongan[0]
        polys = [p for p in shapely.get_parts(gab) if p.geom_type == "Polygon" and not p.is_empty]
        if not polys:
            gagal(f"Geometri {k} kosong setelah diperbaiki.")
        luas = [luas_km2(p, shapely) for p in polys]
        terbesar = max(luas)
        # kab/kota kepulauan kecil (mis. Kepulauan Seribu) memakai ambang relatif
        ambang = min(pulau_min_km2, terbesar * pulau_relatif)
        simpan = [p for p, a in zip(polys, luas) if a >= ambang or a == terbesar]
        bagian_awal += len(polys)
        bagian_akhir += len(simpan)
        hasil_kode.append(k)
        hasil_geom.append(shapely.MultiPolygon(simpan))

    cetak(f"  {len(hasil_kode)} kab/kota digabung; bagian pulau {bagian_awal:,} -> {bagian_akhir:,}")
    return hasil_kode, hasil_geom, np, pyogrio, shapely


def tulis_shapefile(path, kode, geoms, kab_ref, prov_ref, np, pyogrio, shapely):
    from pyogrio.raw import write
    wkb = np.array(shapely.to_wkb(geoms), dtype=object)
    prov = [k.split(".")[0] for k in kode]
    kolom = [
        np.array(kode, dtype=object),
        np.array([kab_ref[k] for k in kode], dtype=object),
        np.array(prov, dtype=object),
        np.array([prov_ref.get(p, p) for p in prov], dtype=object),
    ]
    write(str(path), wkb, kolom, fields=["kode", "nama", "prov", "provnama"],
          geometry_type="MultiPolygon", crs="EPSG:4326",
          driver="ESRI Shapefile", encoding="UTF-8")


# ---------------------------------------------------------------------------
# 3. Sederhanakan, pecah per provinsi, tulis TopoJSON (mapshaper)
# ---------------------------------------------------------------------------
def cari_npx():
    npx = shutil.which("npx") or shutil.which("npx.cmd")
    if not npx:
        gagal("npx (Node.js) tidak ditemukan. Pasang Node.js lalu jalankan ulang.")
    return npx


def mapshaper(npx, argumen, cwd):
    env = dict(os.environ)
    env.setdefault("NODE_OPTIONS", "--max-old-space-size=4096")
    perintah = [npx, "--yes", MAPSHAPER, *argumen]
    cetak("  $ mapshaper " + " ".join(argumen))
    proses = subprocess.run(perintah, cwd=str(cwd), env=env,
                            stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                            text=True, encoding="utf-8", errors="replace")
    for baris in (proses.stdout or "").splitlines():
        if baris.startswith("[") or "Error" in baris:
            cetak("    " + baris)
    if proses.returncode != 0:
        gagal(f"mapshaper berhenti dengan kode {proses.returncode}.\n{proses.stdout}")


def olah_topojson(tmp, sederhana_kab, sederhana_prov, pulau_nasional):
    npx = cari_npx()
    (tmp / "keluar" / "kab").mkdir(parents=True, exist_ok=True)

    # (a) kab/kota: disederhanakan dengan menjaga topologi (batas bersama tetap
    #     rapat), lalu dipecah menjadi satu berkas per provinsi. Toleransinya
    #     bervariasi menurut luas: kota kecil dan gugus pulau (mis. Kepulauan
    #     Seribu) diperhalus agar bentuknya tidak hilang. Ekspresi sengaja ditulis
    #     tanpa spasi dan tanpa < > agar aman dilewatkan lewat npx.cmd di Windows.
    interval = (f"interval=Math.min({sederhana_kab},"
                f"Math.max({SEDERHANA_KECIL_M},this.area/{LUAS_PER_METER:g}))")
    mapshaper(npx, [
        "-i", "kab.shp", "encoding=utf8",
        "-simplify", "variable", interval, "keep-shapes",
        "-clean",
        "-split", "prov",
        "-filter-fields", "kode,nama",
        "-o", "keluar/kab/", "format=topojson", f"quantization={KUANTISASI}", "singles",
    ], tmp)

    # (b) provinsi: gabungan kab/kota per provinsi untuk peta nasional.
    mapshaper(npx, [
        "-i", "kab.shp", "encoding=utf8",
        "-dissolve", "prov", "copy-fields=provnama",
        "-filter-islands", f"min-area={pulau_nasional}km2",
        "-simplify", f"interval={sederhana_prov}", "keep-shapes",
        "-clean",
        "-rename-fields", "kode=prov,nama=provnama",
        "-rename-layers", "provinsi",
        "-o", "keluar/provinsi.json", "format=topojson", f"quantization={KUANTISASI}",
    ], tmp)


# ---------------------------------------------------------------------------
# 4. Validasi hasil
# ---------------------------------------------------------------------------
def baca_geometri_topojson(path):
    topo = json.loads(path.read_text(encoding="utf-8"))
    if topo.get("type") != "Topology" or not topo.get("objects"):
        gagal(f"{path.name} bukan TopoJSON yang sah.")
    obj = next(iter(topo["objects"].values()))
    return obj.get("geometries", [])


def validasi(keluar, prov_ref, kab_ref):
    prov_geo = baca_geometri_topojson(keluar / "provinsi.json")
    kode_prov = [g.get("properties", {}).get("kode") for g in prov_geo]
    if sorted(kode_prov) != sorted(prov_ref):
        gagal(f"Provinsi hasil ({len(kode_prov)}) tidak sama dengan rujukan ({len(prov_ref)}).")
    if any(not g.get("type") for g in prov_geo):
        gagal("Ada provinsi dengan geometri kosong.")

    semua_kab = []
    for berkas in sorted((keluar / "kab").glob("*.json")):
        kode_p = berkas.stem
        if kode_p not in prov_ref:
            gagal(f"Berkas kab tak dikenal: {berkas.name}")
        for g in baca_geometri_topojson(berkas):
            p = g.get("properties", {})
            if not g.get("type"):
                gagal(f"Geometri kosong: {p}")
            if not str(p.get("kode", "")).startswith(kode_p + "."):
                gagal(f"{p} berada di berkas provinsi yang salah ({berkas.name}).")
            if set(p) != {"kode", "nama"}:
                gagal(f"Atribut tak terduga di {berkas.name}: {sorted(p)}")
            semua_kab.append(p["kode"])
    if sorted(semua_kab) != sorted(kab_ref):
        beda = sorted(set(kab_ref) ^ set(semua_kab))
        gagal(f"Kab/kota hasil ({len(semua_kab)}) tidak sama dengan rujukan ({len(kab_ref)}): {beda[:15]}")
    return len(kode_prov), len(semua_kab)


# ---------------------------------------------------------------------------
# 5. Utama
# ---------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(description="Olah batas wilayah BIG menjadi berkas peta Simulasi JAD.")
    ap.add_argument("--gdb", type=Path, default=DEFAULT_GDB, help="FileGDB batas kab/kota BIG")
    ap.add_argument("--rujukan", type=Path, default=DEFAULT_REF, help="wilayah-index.json (kode & nama Kemendagri)")
    ap.add_argument("--keluar", type=Path, default=DEFAULT_OUT, help="folder keluaran (src/data/peta)")
    ap.add_argument("--pulau-min", type=float, default=PULAU_MIN_KM2, help="luas minimum pulau (km²)")
    ap.add_argument("--sederhana-kab", type=int, default=SEDERHANA_KAB_M, help="toleransi kab/kota (m)")
    ap.add_argument("--sederhana-prov", type=int, default=SEDERHANA_PROV_M, help="toleransi provinsi (m)")
    ap.add_argument("--pulau-nasional", type=float, default=PULAU_NASIONAL_KM2, help="pulau minimum peta nasional (km²)")
    ap.add_argument("--simpan-sementara", action="store_true", help="jangan hapus folder kerja sementara")
    arg = ap.parse_args()

    mulai = time.time()
    cetak("1/5 Membaca rujukan kode wilayah …")
    prov_ref, kab_ref = muat_rujukan(arg.rujukan)
    cetak(f"  {len(prov_ref)} provinsi, {len(kab_ref)} kab/kota")

    cetak("2/5 Membaca dan menggabungkan poligon BIG …")
    kode, geoms, np, pyogrio, shapely = baca_dan_gabung(arg.gdb, kab_ref, arg.pulau_min, PULAU_RELATIF)

    tmp = Path(tempfile.mkdtemp(prefix="buat-peta-"))
    try:
        cetak("3/5 Menulis berkas antara …")
        tulis_shapefile(tmp / "kab.shp", kode, geoms, kab_ref, prov_ref, np, pyogrio, shapely)

        cetak("4/5 Menyederhanakan dan memecah per provinsi (mapshaper) …")
        olah_topojson(tmp, arg.sederhana_kab, arg.sederhana_prov, arg.pulau_nasional)

        cetak("5/5 Memvalidasi dan menyalin hasil …")
        n_prov, n_kab = validasi(tmp / "keluar", prov_ref, kab_ref)

        keluar = arg.keluar
        (keluar / "kab").mkdir(parents=True, exist_ok=True)
        for lama in (keluar / "kab").glob("*.json"):
            lama.unlink()
        shutil.copy2(tmp / "keluar" / "provinsi.json", keluar / "provinsi.json")
        for berkas in sorted((tmp / "keluar" / "kab").glob("*.json")):
            shutil.copy2(berkas, keluar / "kab" / berkas.name)

        cocok = re.search(r"(\d{4})(\d{2})(\d{2})", arg.gdb.name)
        edisi = f"{cocok.group(1)}-{cocok.group(2)}-{cocok.group(3)}" if cocok else None
        meta = {
            "sumber": "Badan Informasi Geospasial (BIG)",
            "dataset": "Batas Wilayah Administrasi Kabupaten/Kota, RBI skala 1:50.000",
            "berkas": arg.gdb.name,
            "edisi": edisi,
            "portal": "https://tanahair.indonesia.go.id",
            "kode_wilayah": "Kemendagri (atribut KDPKAB)",
            "diolah": dt.date.today().isoformat(),
            "parameter": {
                "pulau_min_km2": arg.pulau_min,
                "pulau_relatif": PULAU_RELATIF,
                "sederhana_kab_m": arg.sederhana_kab,
                "sederhana_kab_kecil_m": SEDERHANA_KECIL_M,
                "sederhana_prov_m": arg.sederhana_prov,
                "pulau_nasional_min_km2": arg.pulau_nasional,
                "kuantisasi": KUANTISASI,
                "alat": MAPSHAPER,
            },
            "jumlah": {"provinsi": n_prov, "kabkota": n_kab},
        }
        (keluar / "meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

        ukuran_prov = (keluar / "provinsi.json").stat().st_size / 1024
        ukuran_kab = [f.stat().st_size / 1024 for f in (keluar / "kab").glob("*.json")]
        cetak("")
        cetak(f"Selesai dalam {time.time() - mulai:.0f} detik.")
        cetak(f"  {keluar / 'provinsi.json'}  ({ukuran_prov:.0f} KB, {n_prov} provinsi)")
        cetak(f"  {keluar / 'kab'}/*.json  ({len(ukuran_kab)} berkas, {min(ukuran_kab):.0f}–{max(ukuran_kab):.0f} KB, "
              f"total {sum(ukuran_kab):.0f} KB, {n_kab} kab/kota)")
    finally:
        if arg.simpan_sementara:
            cetak(f"  folder kerja disimpan: {tmp}")
        else:
            shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main()
