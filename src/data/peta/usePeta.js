// ============================================================================
// usePeta.js — pemuat data peta untuk tab Simulasi JAD.
//
// Data di folder ini PUBLIK (ikut dibundel Vite): hanya bentuk wilayah, kode
// Kemendagri, dan nama. Rantai komando TIDAK ada di sini; itu tetap diambil
// dari API terkunci lewat useJadc2 setelah wilayah dipilih.
//
//   provinsi.json     -> dimuat saat peta pertama kali tampil
//   kab/{kode}.json   -> dimuat saat sebuah provinsi dibuka (1 chunk/provinsi)
//
// Hasil pemuatan disimpan di cache level modul, jadi membuka provinsi yang sama
// dua kali tidak mengunduh ulang.
// ============================================================================
import { feature, mesh } from 'topojson-client';

const _berkasKab = import.meta.glob('./kab/*.json');

let _provinsi = null;          // Promise<DataPeta>
const _kab = new Map();        // kodeProv -> Promise<DataPeta>

// Ubah TopoJSON menjadi fitur siap gambar. Objek topologi disimpan agar garis
// batas bisa dibuat sebagai "mesh": setiap batas bersama digambar satu kali.
function olah(topo) {
  const nama = Object.keys(topo.objects)[0];
  const objek = topo.objects[nama];
  const koleksi = feature(topo, objek);
  return {
    topo,
    objek,
    koleksi,
    fitur: koleksi.features.map((f) => ({
      kode: String(f.properties.kode),
      nama: String(f.properties.nama),
      geo: f,
    })),
  };
}

function simpanCache(peta, kunci, pemuat) {
  if (!peta.has(kunci)) {
    const p = pemuat().catch((e) => {
      peta.delete(kunci); // biarkan dicoba lagi
      throw e;
    });
    peta.set(kunci, p);
  }
  return peta.get(kunci);
}

/** Peta nasional: 38 provinsi. */
export function muatPetaProvinsi() {
  if (!_provinsi) {
    _provinsi = import('./provinsi.json')
      .then((m) => olah(m.default))
      .catch((e) => {
        _provinsi = null;
        throw e;
      });
  }
  return _provinsi;
}

/** Kab/kota untuk satu provinsi (kode 2 digit, mis. "21"). */
export function muatPetaKab(kodeProv) {
  const kunci = `./kab/${kodeProv}.json`;
  const pemuat = _berkasKab[kunci];
  if (!pemuat) return Promise.reject(new Error(`Peta provinsi ${kodeProv} tidak tersedia`));
  return simpanCache(_kab, kodeProv, () => pemuat().then((m) => olah(m.default)));
}

/**
 * Garis batas sebuah lapisan peta sebagai mesh.
 *   dalam : batas di antara dua wilayah
 *   luar  : garis pantai / batas terluar
 * `kecuali` (opsional): kode wilayah yang garisnya tidak ikut digambar, dipakai
 * untuk menyembunyikan garis provinsi yang sedang dibuka (digantikan garis
 * kab/kota yang lebih rinci).
 */
export function garisBatas(data, kecuali = null) {
  const kode = (g) => g.properties && g.properties.kode;
  return {
    dalam: mesh(data.topo, data.objek, (a, b) => a !== b && kode(a) !== kecuali && kode(b) !== kecuali),
    luar: mesh(data.topo, data.objek, (a, b) => a === b && kode(a) !== kecuali),
  };
}
