<template>
  <div :class="['peta', { 'is-provinsi': !!provAktif }]" @keydown.esc="onEsc">
    <!-- jejak posisi + kontrol zoom -->
    <div class="peta__bar">
      <nav class="peta__jejak" aria-label="Posisi peta">
        <button
          type="button"
          class="peta__jejak-btn"
          :disabled="!provAktif"
          @click="keNasional($event.detail === 0)"
        >Indonesia</button>
        <template v-if="provAktif">
          <span class="peta__sep" aria-hidden="true">›</span>
          <span :class="['peta__jejak-item', { 'is-akhir': !namaKabTerpilih }]">{{ provAktif.nama }}</span>
          <template v-if="namaKabTerpilih">
            <span class="peta__sep" aria-hidden="true">›</span>
            <span class="peta__jejak-item is-akhir">{{ namaKabTerpilih }}</span>
          </template>
        </template>
      </nav>

      <div class="peta__zoom" role="group" aria-label="Kontrol zoom">
        <button type="button" class="peta__zbtn" title="Perbesar" aria-label="Perbesar" @click="zoomRelatif(1.6)">+</button>
        <button type="button" class="peta__zbtn" title="Perkecil" aria-label="Perkecil" @click="zoomRelatif(1 / 1.6)">−</button>
        <button type="button" class="peta__zbtn" title="Seluruh Indonesia" aria-label="Paskan tampilan" @click="paskan()">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
            <path
              d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4"
              fill="none" stroke="currentColor" stroke-width="1.6"
              stroke-linecap="round" stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- kanvas peta -->
    <div ref="kanvasEl" class="peta__kanvas">
      <svg
        ref="svgEl"
        class="peta__svg"
        :viewBox="`0 0 ${W} ${H}`"
        role="group"
        :aria-label="labelPeta"
        @click="klikPeta"
        @pointermove="gerakKursor"
        @pointerleave="sembunyikanKursor"
      >
        <rect class="peta__laut" x="0" y="0" :width="W" :height="H" />

        <!-- transform zoom dipasang langsung oleh d3-zoom pada <g> ini -->
        <g ref="gEl">
          <!-- daratan negara tetangga (hanya konteks; tidak bisa dipilih) -->
          <g class="lapis-negara">
            <path
              v-for="n in negaraPaths"
              :key="n.kode"
              :d="n.d"
              class="negara"
              @pointerenter="masukPointer(n, 'negara', $event)"
              @pointermove="gerakPointer(n, 'negara', $event)"
              @pointerleave="lepasSorot"
            />
          </g>
          <!-- batas terluar ZEE Indonesia -->
          <path v-if="garisZee" class="garis garis--zee" :d="garisZee" />

          <!--
            Area hover tambahan (tak terlihat) di sekeliling setiap wilayah agar nama
            pulau kecil tetap muncul saat disorot. Berada DI BAWAH isian wilayah, jadi
            tidak pernah menutupi daratan wilayah tetangga. Klik tidak memakai lapis
            ini: titik pin selalu diambil dari koordinat klik yang sebenarnya.
          -->
          <g class="lapis-halo" aria-hidden="true">
            <path
              v-for="p in haloProv"
              :key="`p${p.kode}`"
              :d="p.d"
              :class="['halo', { 'is-mati': provAktif && p.kode === provAktif.kode }]"
              @pointerenter="masukPointer(p, 'prov', $event)"
              @pointermove="gerakPointer(p, 'prov', $event)"
              @pointerleave="lepasSorot"
            />
            <path
              v-for="k in haloKab"
              :key="`k${k.kode}`"
              :d="k.d"
              class="halo"
              @pointerenter="masukPointer(k, 'kab', $event)"
              @pointermove="gerakPointer(k, 'kab', $event)"
              @pointerleave="lepasSorot"
            />
          </g>

          <!-- lapis provinsi -->
          <g class="lapis">
            <path
              v-for="p in provinsiPaths"
              :key="p.kode"
              :d="p.d"
              :data-kode="p.kode"
              :class="['wil', 'wil--prov', {
                'is-tersembunyi': provAktif && p.kode === provAktif.kode,
                'is-berisi': !provAktif && p.kode === provTerpilih,
                'is-sorot': sorotan && sorotan.level === 'prov' && sorotan.kode === p.kode,
              }]"
              :tabindex="provAktif ? -1 : 0"
              role="button"
              :aria-label="`Provinsi ${p.nama}`"
              @keydown.enter.prevent="bukaLewatKeyboard(p)"
              @keydown.space.prevent="bukaLewatKeyboard(p)"
              @pointerenter="masukPointer(p, 'prov', $event)"
              @pointermove="gerakPointer(p, 'prov', $event)"
              @pointerleave="lepasSorot"
              @focus="fokus(p, 'prov', $event)"
              @blur="lepasSorot"
            />
            <path v-if="garisProv.dalam" class="garis garis--prov-dalam" :d="garisProv.dalam" />
            <path v-if="garisProv.luar" class="garis garis--prov-luar" :d="garisProv.luar" />
          </g>

          <!-- lapis kab/kota provinsi yang sedang tampil -->
          <g v-if="kabPaths.length" class="lapis">
            <path
              v-for="k in kabPaths"
              :key="k.kode"
              :d="k.d"
              :data-kode="k.kode"
              :class="['wil', 'wil--kab', {
                'is-terpilih': k.kode === kabTerpilih,
                'is-sorot': sorotan && sorotan.level === 'kab' && sorotan.kode === k.kode,
              }]"
              tabindex="0"
              role="button"
              :aria-label="k.nama"
              :aria-pressed="k.kode === kabTerpilih ? 'true' : 'false'"
              @keydown.enter.prevent="tandaiKab(k)"
              @keydown.space.prevent="tandaiKab(k)"
              @pointerenter="masukPointer(k, 'kab', $event)"
              @pointermove="gerakPointer(k, 'kab', $event)"
              @pointerleave="lepasSorot"
              @focus="fokus(k, 'kab', $event)"
              @blur="lepasSorot"
            />
            <path v-if="garisKab.dalam" class="garis garis--kab-dalam" :d="garisKab.dalam" />
            <path v-if="garisKab.luar" class="garis garis--kab-luar" :d="garisKab.luar" />
          </g>

          <!-- sorotan di atas semua lapis agar garisnya utuh -->
          <path v-if="dTerpilih" class="garis garis--terpilih" :d="dTerpilih" />
          <path v-if="dSorot" class="garis garis--sorot" :d="dSorot" />
        </g>

        <!--
          Penanda berukuran tetap (tidak ikut membesar saat zoom). Posisinya
          dihitung ulang setiap kali peta digeser/di-zoom (perbaruiPenanda).
        -->
        <g class="penanda" aria-hidden="true">
          <line v-if="pinTampil && pesisirTampil" ref="garisPesisirEl" class="penanda__garis" />
          <circle v-if="pinTampil && pesisirTampil" ref="titikPesisirEl" r="3.5" class="penanda__pesisir" />
          <g v-if="pinTampil" ref="pinEl" :class="['pin', { 'is-menganalisis': menganalisis }]">
            <circle r="16" class="pin__denyut" />
            <circle r="6.5" class="pin__inti" />
            <path d="M-12 0h-7M12 0h7M0 -12v-7M0 12v7" class="pin__silang" />
          </g>
        </g>
      </svg>

      <div v-if="tip" class="peta__tip" :style="gayaTip" aria-hidden="true">
        <span class="peta__tip-nama">{{ tip.nama }}</span>
        <span v-if="aksiTip" class="peta__tip-aksi">{{ aksiTip }}</span>
      </div>

      <p ref="kursorEl" class="peta__kursor" hidden aria-hidden="true"></p>

      <p v-if="memuat" class="peta__status" role="status">Memuat peta…</p>
      <p v-else-if="galat" class="peta__status peta__status--galat" role="alert">
        {{ galat }}
        <button type="button" class="peta__ulang" @click="cobaLagi">Coba lagi</button>
      </p>
      <p v-else-if="menganalisisLama" class="peta__status" role="status">Menganalisis titik…</p>
    </div>

    <div class="peta__kaki">
      <p class="peta__petunjuk">{{ petunjuk }}</p>
      <ul class="peta__legenda" aria-label="Keterangan peta">
        <li>
          <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" focusable="false">
            <circle cx="7" cy="7" r="4" class="legenda__pin" />
          </svg>
          Titik simulasi
        </li>
        <li>
          <svg viewBox="0 0 22 10" width="22" height="10" aria-hidden="true" focusable="false">
            <path d="M1 5h20" class="legenda__zee" />
          </svg>
          Batas ZEE Indonesia
        </li>
        <li>
          <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" focusable="false">
            <rect x="1.5" y="1.5" width="11" height="11" rx="2" class="legenda__negara" />
          </svg>
          Negara tetangga
        </li>
      </ul>
      <p class="peta__sumber">
        Batas wilayah: {{ sumberSingkat }} · Batas laut: Marine Regions (VLIZ, CC BY 4.0) · Negara: Natural Earth
      </p>
    </div>
  </div>
</template>

<script setup>
// ============================================================================
// JadcPeta.vue — peta Indonesia untuk tab "Simulasi" di halaman JADC2.
//
// Mode pin: klik di MANA SAJA (darat atau laut) menjatuhkan titik simulasi,
// misalnya kontak radar. Titik dianalisis oleh analisisTitik.js (data umum):
// darat -> kab/kota yang memuatnya; laut -> kab/kota pesisir terdekat; di luar
// yurisdiksi Indonesia -> tanpa rantai komando (hanya jarak). Hasilnya
// dipancarkan lewat emit('pin', hasil); halaman induk lalu mengambil rantai
// komando kab/kota itu dari API terkunci (useJadc2). Klik berikutnya
// menggantikan titik sebelumnya; hanya hasil klik terakhir yang dipakai.
//
// Zoom/geser memakai d3-zoom (roda/cubit, seret, klik ganda, tombol + −).
// Transform dipasang langsung ke <g> (bukan lewat reaktivitas Vue) agar zoom
// tetap mulus tanpa render ulang tiap frame.
// ============================================================================
import { ref, shallowRef, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { geoMercator, geoPath } from 'd3-geo';
import { pointer, select } from 'd3-selection';
import { zoom as d3Zoom, zoomIdentity, zoomTransform } from 'd3-zoom';
import 'd3-transition';
import { muatPetaProvinsi, muatPetaKab, garisBatas } from '@/data/peta/usePeta.js';
import {
  analisisTitik, formatKoordinat, muatLaut, muatPantai, titikWakil,
} from '@/data/peta/analisisTitik.js';
import meta from '@/data/peta/meta.json';

const props = defineProps({
  /** Kode wilayah terpilih (provinsi, kab/kota, atau kecamatan); disorot di peta. */
  kodeTerpilih: { type: String, default: null },
  /** Hasil analisis titik (pin) yang sedang aktif, atau null. */
  titik: { type: Object, default: null },
});
const emit = defineEmits(['pin']);

// ---- konstanta tampilan ---------------------------------------------------
const W = 1000;          // lebar koordinat peta (viewBox)
const H = 540;           // tinggi koordinat peta
const PAD = 18;          // jarak tepi saat memaskan Indonesia
const K_MAKS = 120;      // zoom maksimum
const ISI_PROVINSI = 0.9; // porsi layar yang diisi provinsi saat dibuka
const DURASI = 650;      // ms animasi masuk/keluar provinsi
const JEDA_STATUS = 200; // ms sebelum "Menganalisis titik…" ditampilkan
const cocokMedia = (q) => typeof window !== 'undefined'
  && typeof window.matchMedia === 'function'
  && window.matchMedia(q).matches;
const KURANG_GERAK = cocokMedia('(prefers-reduced-motion: reduce)');
const SENTUH = cocokMedia('(pointer: coarse)'); // layar sentuh: petunjuk "ketuk/cubit"

const provOf = (kode) => (kode ? String(kode).split('.')[0] : null);
const kabOf = (kode) => {
  const p = String(kode || '').split('.');
  return p.length >= 2 ? `${p[0]}.${p[1]}` : null;
};

// ---- elemen & state -------------------------------------------------------
const kanvasEl = ref(null);
const svgEl = ref(null);
const gEl = ref(null);
const kursorEl = ref(null);
const pinEl = ref(null);
const garisPesisirEl = ref(null);
const titikPesisirEl = ref(null);

const provinsiPaths = shallowRef([]);          // [{ kode, nama, d, luas }] urut kode (= urutan Tab)
const kabPaths = shallowRef([]);               // [{ kode, nama, d, luas, geo }]
const negaraPaths = shallowRef([]);            // [{ kode, nama, d }]
const garisZee = ref('');
const garisProv = shallowRef({ dalam: '', luar: '' });
const garisKab = shallowRef({ dalam: '', luar: '' });
const provAktif = shallowRef(null);            // { kode, nama } | null
const siap = ref(false);                       // proyeksi sudah dibuat
const memuat = ref(false);
const galat = ref('');
const sorotan = shallowRef(null);              // { kode, level, nama }
const tip = ref(null);                         // { kode, level, nama, lewat, x, y, kiri, atas }
const pinLokal = shallowRef(null);             // { lon, lat } selama titik baru dianalisis
const menganalisis = ref(false);
const menganalisisLama = ref(false);

let dataProv = null;       // hasil muatPetaProvinsi()
let proyeksi = null;       // geoMercator yang dipaskan ke Indonesia
let pembuatPath = null;    // geoPath dengan proyeksi tetap
let perilakuZoom = null;
let batasAktif = null;     // bounding box provinsi yang dibuka (koordinat peta)
let tokenMuat = 0;         // mencegah hasil pemuatan provinsi lama menimpa yang baru
let tokenTitik = 0;        // hanya analisis klik terakhir yang dipakai
let kodeGagal = null;      // provinsi yang gagal dimuat (untuk "Coba lagi")
let titikGagal = null;     // titik yang gagal dianalisis (untuk "Coba lagi")
let sedangGeser = false;
let pewaktuStatus = null;

// ---- turunan --------------------------------------------------------------
const terluasDulu = (a, b) => b.luas - a.luas;
const haloProv = computed(() => [...provinsiPaths.value].sort(terluasDulu));
const haloKab = computed(() => [...kabPaths.value].sort(terluasDulu));

const kabTerpilih = computed(() => kabOf(props.kodeTerpilih));
const provTerpilih = computed(() => provOf(props.kodeTerpilih));

const namaKabTerpilih = computed(() => {
  if (!provAktif.value || !kabTerpilih.value) return null;
  const k = kabPaths.value.find((x) => x.kode === kabTerpilih.value);
  return k ? k.nama : null;
});

const dTerpilih = computed(() => {
  if (!kabTerpilih.value) return null;
  const k = kabPaths.value.find((x) => x.kode === kabTerpilih.value);
  return k ? k.d : null;
});

const dSorot = computed(() => {
  const s = sorotan.value;
  if (!s) return null;
  if (s.level === 'kab') {
    if (s.kode === kabTerpilih.value) return null; // sudah bergaris "terpilih"
    const k = kabPaths.value.find((x) => x.kode === s.kode);
    return k ? k.d : null;
  }
  if (s.level === 'negara') {
    const n = negaraPaths.value.find((x) => x.kode === s.kode);
    return n ? n.d : null;
  }
  if (provAktif.value && s.kode === provAktif.value.kode) return null;
  const p = provinsiPaths.value.find((x) => x.kode === s.kode);
  return p ? p.d : null;
});

// titik yang digambar: titik baru yang sedang dianalisis, atau titik aktif dari induk
const pinGeo = computed(() => pinLokal.value
  || (props.titik ? { lon: props.titik.lon, lat: props.titik.lat } : null));
const pesisirGeo = computed(() => {
  const t = props.titik;
  if (pinLokal.value || !t || t.jenis === 'darat' || !t.titikPesisir || !t.adaRantai) return null;
  return t.titikPesisir;
});
const pinTampil = computed(() => siap.value && !!pinGeo.value);
const pesisirTampil = computed(() => siap.value && !!pesisirGeo.value);

const aksiTip = computed(() => {
  const t = tip.value;
  if (!t) return '';
  if (t.level === 'negara') return 'Di luar wilayah NKRI';
  if (t.lewat === 'keyboard') {
    return t.level === 'prov' ? 'Enter untuk membuka provinsi' : 'Enter untuk menandai titik di wilayah ini';
  }
  return SENTUH ? '' : 'Klik untuk menandai titik';
});

const gayaTip = computed(() => {
  const t = tip.value;
  if (!t) return {};
  const tx = t.kiri ? 'calc(-100% - 12px)' : '12px';
  const ty = t.atas ? 'calc(-100% - 12px)' : '14px';
  return { left: `${t.x}px`, top: `${t.y}px`, transform: `translate(${tx}, ${ty})` };
});

const labelPeta = computed(() => (provAktif.value
  ? `Peta ${provAktif.value.nama}. Klik di mana saja untuk menandai titik simulasi.`
  : 'Peta Indonesia. Klik di mana saja, darat maupun laut, untuk menandai titik simulasi.'));

const petunjuk = computed(() => (SENTUH
  ? 'Ketuk di mana saja (darat atau laut) untuk menandai titik. Cubit untuk zoom, geser untuk memindahkan peta.'
  : 'Klik di mana saja (darat atau laut) untuk menandai titik. Gulir atau klik ganda untuk zoom, seret untuk menggeser.'));

const sumberSingkat = computed(() => {
  const tahun = meta && meta.edisi ? String(meta.edisi).slice(0, 4) : '';
  return `BIG, RBI 1:50.000${tahun ? ` edisi ${tahun}` : ''}`;
});

// ---- zoom -----------------------------------------------------------------
function pasangZoom() {
  perilakuZoom = d3Zoom()
    .scaleExtent([1, K_MAKS])
    .translateExtent([[-W * 0.15, -H * 0.15], [W * 1.15, H * 1.15]])
    .clickDistance(5) // gerakan kecil saat klik tidak dianggap menggeser
    .on('start', (e) => {
      const jenis = e.sourceEvent && e.sourceEvent.type;
      if (jenis === 'mousedown' || jenis === 'touchstart') sedangGeser = true;
    })
    .on('zoom', (e) => {
      if (gEl.value) gEl.value.setAttribute('transform', e.transform.toString());
      perbaruiPenanda(e.transform);
      if (tip.value) tip.value = null; // posisi tooltip tidak lagi tepat
    })
    .on('end', () => { sedangGeser = false; });

  // klik ganda = zoom 2× di titik itu (bawaan d3-zoom)
  select(svgEl.value).call(perilakuZoom);
}

function transformUntuk([[x0, y0], [x1, y1]]) {
  const lebar = Math.max(x1 - x0, 1e-6);
  const tinggi = Math.max(y1 - y0, 1e-6);
  const k = Math.max(1, Math.min(K_MAKS, ISI_PROVINSI / Math.max(lebar / W, tinggi / H)));
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  return zoomIdentity.translate(W / 2 - k * cx, H / 2 - k * cy).scale(k);
}

function terapkan(transform, animasi = true) {
  if (!svgEl.value || !perilakuZoom) return;
  const sel = select(svgEl.value);
  sel.interrupt();
  if (!animasi || KURANG_GERAK) sel.call(perilakuZoom.transform, transform);
  else sel.transition().duration(DURASI).call(perilakuZoom.transform, transform);
}

function zoomRelatif(faktor) {
  if (!svgEl.value || !perilakuZoom) return;
  const sel = select(svgEl.value);
  sel.interrupt();
  if (KURANG_GERAK) sel.call(perilakuZoom.scaleBy, faktor);
  else sel.transition().duration(250).call(perilakuZoom.scaleBy, faktor);
}

function paskan() {
  terapkan(zoomIdentity);
}

// ---- penanda (pin, garis ke pesisir) ----------------------------------------
function perbaruiPenanda(transform) {
  if (!proyeksi || !svgEl.value) return;
  const t = transform || zoomTransform(svgEl.value);
  const layar = (lonlat) => t.apply(proyeksi(lonlat));
  let xy = null;
  if (pinEl.value && pinGeo.value) {
    xy = layar([pinGeo.value.lon, pinGeo.value.lat]);
    pinEl.value.setAttribute('transform', `translate(${xy[0]},${xy[1]})`);
  }
  if (pesisirGeo.value && xy) {
    const ps = layar(pesisirGeo.value);
    if (titikPesisirEl.value) {
      titikPesisirEl.value.setAttribute('cx', ps[0]);
      titikPesisirEl.value.setAttribute('cy', ps[1]);
    }
    if (garisPesisirEl.value) {
      garisPesisirEl.value.setAttribute('x1', xy[0]);
      garisPesisirEl.value.setAttribute('y1', xy[1]);
      garisPesisirEl.value.setAttribute('x2', ps[0]);
      garisPesisirEl.value.setAttribute('y2', ps[1]);
    }
  }
}

// ---- pemuatan -------------------------------------------------------------
function keJalur(fitur) {
  return fitur.map((f) => ({
    kode: f.kode,
    nama: f.nama,
    d: pembuatPath(f.geo) || '',
    luas: pembuatPath.area(f.geo) || 0,
    geo: f.geo,
  }));
}

function perbaruiGarisProv(kecuali) {
  const g = garisBatas(dataProv, kecuali);
  garisProv.value = { dalam: pembuatPath(g.dalam) || '', luar: pembuatPath(g.luar) || '' };
}

async function muatNasional() {
  memuat.value = true;
  galat.value = '';
  try {
    const [dp, laut] = await Promise.all([muatPetaProvinsi(), muatLaut()]);
    dataProv = dp;
    proyeksi = geoMercator().fitExtent([[PAD, PAD], [W - PAD, H - PAD]], dataProv.koleksi);
    pembuatPath = geoPath(proyeksi);
    provinsiPaths.value = keJalur(dataProv.fitur);
    perbaruiGarisProv(null);
    negaraPaths.value = laut.fiturNegara.map((f) => ({
      kode: String(f.properties.kode),
      nama: String(f.properties.nama),
      d: pembuatPath(f) || '',
    }));
    garisZee.value = laut.garisZee.map((f) => pembuatPath(f) || '').join('');
    siap.value = true;
  } catch (e) {
    galat.value = 'Peta gagal dimuat.';
    return;
  } finally {
    memuat.value = false;
  }
  muatPantai().catch(() => { /* dimuat ulang saat titik pertama dianalisis */ });

  // tampilkan kembali keadaan sebelumnya (mis. setelah pindah tab)
  const t = props.titik;
  if (t && t.kab && t.adaRantai) await bukaProvinsi(t.kab.provKode, { zoom: false });
  else if (!t && provTerpilih.value) await bukaProvinsi(provTerpilih.value, { animasi: false });
}

/**
 * Tampilkan kab/kota sebuah provinsi.
 *   zoom: true  -> peta memperbesar ke provinsi itu (pilihan dari tab lain / keyboard)
 *   zoom: false -> hanya lapis kab/kota yang muncul; tampilan tidak berpindah (mode pin)
 */
async function bukaProvinsi(kode, { animasi = true, zoom = true } = {}) {
  if (!pembuatPath) return;
  const info = provinsiPaths.value.find((p) => p.kode === kode);
  if (!info) return;
  if (provAktif.value && provAktif.value.kode === kode && kabPaths.value.length) {
    if (zoom && batasAktif) terapkan(transformUntuk(batasAktif), animasi);
    return;
  }

  const token = ++tokenMuat;
  galat.value = '';
  kodeGagal = null;
  try {
    const data = await muatPetaKab(kode);
    if (token !== tokenMuat) return; // sudah ada permintaan yang lebih baru
    provAktif.value = { kode, nama: info.nama };
    kabPaths.value = keJalur(data.fitur);
    const g = garisBatas(data);
    garisKab.value = { dalam: pembuatPath(g.dalam) || '', luar: pembuatPath(g.luar) || '' };
    perbaruiGarisProv(kode);
    batasAktif = pembuatPath.bounds(data.koleksi);
    if (zoom) terapkan(transformUntuk(batasAktif), animasi);
  } catch (e) {
    if (token === tokenMuat) {
      kodeGagal = kode;
      galat.value = `Peta ${info.nama} gagal dimuat.`;
    }
  }
}

/** Sembunyikan lapis kab/kota (kembali ke tampilan provinsi) tanpa mengubah zoom. */
function tutupProvinsi() {
  tokenMuat++; // batalkan pemuatan provinsi yang masih berjalan
  if (kodeGagal) galat.value = '';
  kodeGagal = null;
  provAktif.value = null;
  kabPaths.value = [];
  garisKab.value = { dalam: '', luar: '' };
  batasAktif = null;
  if (dataProv) perbaruiGarisProv(null);
}

function keNasional(fokuskan = false) {
  const kodeLama = provAktif.value ? provAktif.value.kode : null;
  tutupProvinsi();
  sorotan.value = null;
  tip.value = null;
  terapkan(zoomIdentity);
  if (fokuskan && kodeLama) fokusElemen(`.wil--prov[data-kode="${kodeLama}"]`);
}

function cobaLagi() {
  if (!dataProv || !siap.value) muatNasional();
  else if (titikGagal) tandaiTitik(titikGagal.lon, titikGagal.lat);
  else if (kodeGagal) bukaProvinsi(kodeGagal);
}

// ---- titik (pin) ------------------------------------------------------------
function keGeo(e) {
  if (!proyeksi || !svgEl.value) return null;
  const [x, y] = pointer(e, svgEl.value);
  const [mx, my] = zoomTransform(svgEl.value).invert([x, y]);
  const g = proyeksi.invert([mx, my]);
  return g && Number.isFinite(g[0]) && Number.isFinite(g[1]) ? g : null;
}

function klikPeta(e) {
  const g = keGeo(e);
  if (g) tandaiTitik(g[0], g[1]);
}

async function tandaiTitik(lon, lat) {
  const token = ++tokenTitik;
  pinLokal.value = { lon, lat };
  menganalisis.value = true;
  titikGagal = null;
  if (galat.value && !kodeGagal) galat.value = '';
  clearTimeout(pewaktuStatus);
  pewaktuStatus = setTimeout(() => {
    if (token === tokenTitik && menganalisis.value) menganalisisLama.value = true;
  }, JEDA_STATUS);
  try {
    const hasil = await analisisTitik(lon, lat);
    if (token !== tokenTitik) return; // sudah ada klik yang lebih baru
    emit('pin', hasil);
    pinLokal.value = null; // titik kini dipegang induk (props.titik)
  } catch (e) {
    if (token === tokenTitik) {
      titikGagal = { lon, lat };
      galat.value = 'Titik gagal dianalisis.';
    }
  } finally {
    if (token === tokenTitik) {
      menganalisis.value = false;
      menganalisisLama.value = false;
      clearTimeout(pewaktuStatus);
    }
  }
}

// keyboard: Enter pada provinsi membuka provinsi, Enter pada kab/kota menandai titik di dalamnya
async function bukaLewatKeyboard(p) {
  await bukaProvinsi(p.kode, { zoom: true });
  if (provAktif.value && provAktif.value.kode === p.kode) {
    fokusElemen('.wil--kab.is-terpilih', '.wil--kab');
  }
}

function tandaiKab(k) {
  const [lon, lat] = titikWakil(k.geo);
  tandaiTitik(lon, lat);
}

function onEsc(e) {
  if (!provAktif.value) return;
  e.preventDefault();
  keNasional(true);
}

function fokusElemen(...selektor) {
  nextTick(() => {
    if (!svgEl.value) return;
    for (const s of selektor) {
      const el = svgEl.value.querySelector(s);
      if (el) { el.focus({ preventScroll: true }); return; }
    }
  });
}

// ---- koordinat kursor (mouse saja) ------------------------------------------
function gerakKursor(e) {
  if (!kursorEl.value || e.pointerType === 'touch') return;
  const g = keGeo(e);
  if (!g) { kursorEl.value.hidden = true; return; }
  kursorEl.value.textContent = formatKoordinat(g[0], g[1]).dms;
  kursorEl.value.hidden = false;
}

function sembunyikanKursor() {
  if (kursorEl.value) kursorEl.value.hidden = true;
}

// ---- tooltip & sorotan -------------------------------------------------------
function posisi(clientX, clientY) {
  if (!kanvasEl.value) return null;
  const r = kanvasEl.value.getBoundingClientRect();
  const x = clientX - r.left;
  const y = clientY - r.top;
  return { x, y, kiri: x > r.width - 230, atas: y > r.height - 70 };
}

function tampilkanTip(item, level, clientX, clientY, lewat) {
  const pos = posisi(clientX, clientY);
  if (!pos) return;
  sorotan.value = { kode: item.kode, level, nama: item.nama };
  tip.value = { kode: item.kode, level, nama: item.nama, lewat, ...pos };
}

function masukPointer(item, level, e) {
  if (sedangGeser || e.pointerType === 'touch') return; // di layar sentuh tooltip tidak membantu
  tampilkanTip(item, level, e.clientX, e.clientY, 'pointer');
}

function gerakPointer(item, level, e) {
  if (sedangGeser || e.pointerType === 'touch') return;
  const t = tip.value;
  if (t && t.kode === item.kode && t.level === level) {
    const pos = posisi(e.clientX, e.clientY);
    if (pos) tip.value = { ...t, ...pos };
  } else {
    // tooltip disembunyikan selama zoom/geser; tampilkan lagi begitu pointer bergerak
    tampilkanTip(item, level, e.clientX, e.clientY, 'pointer');
  }
}

function fokus(item, level, e) {
  // hanya untuk fokus lewat keyboard; pointer sudah ditangani pointerenter
  let lewatKeyboard = true;
  try { lewatKeyboard = e.target.matches(':focus-visible'); } catch { /* peramban lama */ }
  if (!lewatKeyboard) return;
  const r = e.target.getBoundingClientRect();
  tampilkanTip(item, level, r.left + r.width / 2, r.top + r.height / 2, 'keyboard');
}

function lepasSorot() {
  sorotan.value = null;
  tip.value = null;
}

// ---- siklus hidup -----------------------------------------------------------
// titik baru dari induk -> tampilkan kab/kota provinsinya tanpa memindah tampilan
watch(() => props.titik, (t) => {
  if (!t || !siap.value) return;
  if (t.kab && t.adaRantai) {
    if (!provAktif.value || provAktif.value.kode !== t.kab.provKode) bukaProvinsi(t.kab.provKode, { zoom: false });
  } else if (provAktif.value) {
    // titik di luar yurisdiksi: tidak ada wilayah Indonesia yang disorot
    tutupProvinsi();
  }
});

// pilihan dari tab lain (tanpa titik) -> buka provinsinya seperti biasa
watch(provTerpilih, (p) => {
  if (!p || !siap.value || props.titik) return;
  if (!provAktif.value || provAktif.value.kode !== p) bukaProvinsi(p);
});

// posisikan penanda setiap kali titiknya berubah (setelah DOM diperbarui)
watch([pinGeo, pesisirGeo, pinTampil, pesisirTampil], () => perbaruiPenanda(), { flush: 'post' });

onMounted(() => {
  pasangZoom();
  muatNasional();
});

onBeforeUnmount(() => {
  tokenMuat++;
  tokenTitik++;
  clearTimeout(pewaktuStatus);
  if (svgEl.value) select(svgEl.value).interrupt().on('.zoom', null);
});
</script>

<style scoped>
.peta { display: flex; flex-direction: column; gap: 0.6rem; }

/* ---- bar: jejak + zoom ---- */
.peta__bar {
  display: flex; align-items: center; justify-content: space-between;
  gap: 0.75rem; flex-wrap: wrap;
}
.peta__jejak {
  display: flex; align-items: center; flex-wrap: wrap; gap: 0.35rem;
  min-height: 2rem; font-size: 0.9rem; color: #5a6472;
}
.peta__jejak-btn {
  border: 0; background: none; padding: 0.2rem 0.1rem; margin: 0;
  font: inherit; color: #4b7bec; cursor: pointer; border-radius: 3px;
}
.peta__jejak-btn:hover:not(:disabled) { text-decoration: underline; }
.peta__jejak-btn:disabled { color: #1e272e; font-weight: 600; cursor: default; }
.peta__jejak-btn:focus-visible { outline: 2px solid #4b7bec; outline-offset: 2px; }
.peta__sep { color: #aab2bd; }
.peta__jejak-item { color: #5a6472; }
.peta__jejak-item.is-akhir { color: #1e272e; font-weight: 600; }

.peta__zoom { display: inline-flex; gap: 0.3rem; }
.peta__zbtn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 2rem; height: 2rem; padding: 0;
  border: 1px solid #cfd6dd; border-radius: 6px; background: #fff;
  font: inherit; font-size: 1.05rem; line-height: 1; color: #2f3542; cursor: pointer;
}
.peta__zbtn:hover { background: #f4f6f8; border-color: #b9c2cb; }
.peta__zbtn:focus-visible { outline: 2px solid #4b7bec; outline-offset: 1px; }

/* ---- kanvas ---- */
.peta__kanvas {
  position: relative; overflow: hidden;
  border: 1px solid #dde3e9; border-radius: 6px;
  background: #e6edf4;
}
.peta__svg {
  display: block; width: 100%; height: auto; aspect-ratio: 1000 / 540;
  cursor: crosshair; touch-action: none;
  -webkit-user-select: none; user-select: none;
}
.peta__svg:active { cursor: grabbing; }
.peta__laut { fill: #e6edf4; }

/* negara tetangga: daratan abu-abu hangat, beda dari laut dan dari Indonesia */
.negara {
  fill: #e7e5dc; stroke: #bab7ab; stroke-width: 0.6px;
  vector-effect: non-scaling-stroke; stroke-linejoin: round;
}

/* area hover tambahan di sekeliling wilayah (tak terlihat, hanya menangkap pointer) */
.halo {
  fill: none; stroke: transparent; stroke-width: 8px;
  stroke-linejoin: round; vector-effect: non-scaling-stroke;
  pointer-events: stroke;
}
.halo.is-mati { display: none; }
@media (pointer: coarse) {
  .halo { stroke-width: 16px; } /* jari lebih besar dari kursor */
}

/* isian wilayah */
.wil {
  stroke: none; pointer-events: fill;
  outline: none;
  transition: fill 0.12s ease;
}
/* sorotan memakai kelas (bukan :hover) agar juga menyala saat pointer berada di
   area hover tambahan, dan tidak "tertinggal" setelah diketuk di layar sentuh */
.wil--prov { fill: #ffffff; }
.wil--prov.is-sorot, .wil--prov:focus-visible { fill: #e3ebfc; }
.wil--prov.is-berisi { fill: #d3e0fb; }
.wil--prov.is-berisi.is-sorot { fill: #c6d6fa; }
.wil--prov.is-tersembunyi { visibility: hidden; pointer-events: none; }

.wil--kab { fill: #ffffff; }
.wil--kab.is-sorot, .wil--kab:focus-visible { fill: #e3ebfc; }
.wil--kab.is-terpilih { fill: #4b7bec; }

/* garis batas digambar sekali (mesh), tidak ikut menebal saat zoom */
.garis {
  fill: none; pointer-events: none;
  vector-effect: non-scaling-stroke;
  stroke-linejoin: round; stroke-linecap: round;
}
.garis--zee { stroke: #7f9ab5; stroke-width: 1px; stroke-dasharray: 5 4; }
.garis--prov-dalam { stroke: #b7c1cc; stroke-width: 0.8px; }
.garis--prov-luar { stroke: #93a0ad; stroke-width: 0.9px; }
.is-provinsi .garis--prov-dalam { stroke: #cfd6de; }
.garis--kab-dalam { stroke: #aeb8c3; stroke-width: 0.8px; }
.garis--kab-luar { stroke: #7d8a98; stroke-width: 1.1px; }
.garis--terpilih { stroke: #1f3f99; stroke-width: 2px; }
.garis--sorot { stroke: #1e272e; stroke-width: 1.6px; }

/* ---- penanda titik ---- */
.penanda { pointer-events: none; }
.penanda__garis {
  stroke: #c0392b; stroke-width: 1.4px; stroke-dasharray: 4 3; opacity: 0.85;
}
.penanda__pesisir { fill: #fff; stroke: #c0392b; stroke-width: 1.6px; }
.pin__inti { fill: #d63031; stroke: #fff; stroke-width: 2px; }
.pin__silang { stroke: #d63031; stroke-width: 2px; stroke-linecap: round; }
.pin__denyut {
  fill: rgba(214, 48, 49, 0.14); stroke: #d63031; stroke-width: 1.2px;
  transform-box: fill-box; transform-origin: center;
  animation: denyut 1.8s ease-out infinite;
}
.pin.is-menganalisis .pin__inti { fill: #7a828d; }
.pin.is-menganalisis .pin__silang,
.pin.is-menganalisis .pin__denyut { stroke: #7a828d; }
.pin.is-menganalisis .pin__denyut { fill: rgba(122, 130, 141, 0.12); }
@keyframes denyut {
  0% { transform: scale(0.55); opacity: 1; }
  100% { transform: scale(1.25); opacity: 0; }
}

/* ---- tooltip ---- */
.peta__tip {
  position: absolute; z-index: 5; pointer-events: none;
  max-width: 220px; padding: 0.35rem 0.55rem;
  background: #1e272e; color: #fff; border-radius: 4px;
  font-size: 0.82rem; line-height: 1.3;
  box-shadow: 0 4px 12px rgba(30, 39, 46, 0.18);
}
.peta__tip-nama { display: block; font-weight: 600; }
.peta__tip-aksi { display: block; margin-top: 0.1rem; font-size: 0.74rem; color: #c3cbd4; }

/* ---- koordinat kursor ---- */
.peta__kursor {
  position: absolute; right: 0.6rem; bottom: 0.6rem; z-index: 3; margin: 0;
  padding: 0.2rem 0.5rem; border-radius: 4px;
  background: rgba(30, 39, 46, 0.78); color: #fff;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.74rem; pointer-events: none; white-space: nowrap;
}
.peta__kursor[hidden] { display: none; }

/* ---- status ---- */
.peta__status {
  position: absolute; left: 0.6rem; bottom: 0.6rem; z-index: 4; margin: 0;
  padding: 0.3rem 0.6rem; border-radius: 4px;
  background: rgba(255, 255, 255, 0.94); border: 1px solid #dde3e9;
  font-size: 0.82rem; color: #3d4653;
}
.peta__status--galat { color: #b23b3b; border-color: #efc9c9; }
.peta__ulang {
  margin-left: 0.4rem; padding: 0.1rem 0.45rem;
  border: 1px solid #cfd6dd; border-radius: 4px; background: #fff;
  font: inherit; font-size: 0.8rem; color: #2f3542; cursor: pointer;
}

/* ---- kaki ---- */
.peta__kaki { display: flex; flex-direction: column; gap: 0.35rem; }
.peta__petunjuk { margin: 0; font-size: 0.82rem; color: #5a6472; }
.peta__legenda {
  display: flex; flex-wrap: wrap; gap: 0.3rem 1rem;
  margin: 0; padding: 0; list-style: none;
  font-size: 0.78rem; color: #5a6472;
}
.peta__legenda li { display: inline-flex; align-items: center; gap: 0.35rem; }
.legenda__pin { fill: #d63031; stroke: #fff; stroke-width: 1.5px; }
.legenda__zee { stroke: #7f9ab5; stroke-width: 1.4px; stroke-dasharray: 4 3; fill: none; }
.legenda__negara { fill: #e7e5dc; stroke: #bab7ab; }
.peta__sumber { margin: 0; font-size: 0.72rem; color: #8a929c; }

@media (prefers-reduced-motion: reduce) {
  .wil { transition: none; }
  .pin__denyut { animation: none; opacity: 0.6; }
}
</style>
