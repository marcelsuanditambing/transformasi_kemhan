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
        <button type="button" class="peta__zbtn" title="Paskan tampilan" aria-label="Paskan tampilan" @click="paskan()">
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
        @click="klikPeta"
        :aria-label="provAktif
          ? `Peta ${provAktif.nama}. Pilih kabupaten atau kota.`
          : 'Peta Indonesia. Pilih provinsi.'"
      >
        <rect class="peta__laut" x="0" y="0" :width="W" :height="H" />

        <!-- transform zoom dipasang langsung oleh d3-zoom pada <g> ini -->
        <g ref="gEl">
          <!--
            Area klik tambahan (tak terlihat) di sekeliling setiap wilayah agar pulau
            kecil tetap mudah diklik. Lapis ini sengaja berada DI BAWAH semua isian
            wilayah: ia hanya menangkap klik di laut, tidak pernah merebut klik dari
            daratan wilayah tetangga (mis. DKI Jakarta yang diapit Banten dan Jawa Barat).
            Urutannya dari yang terluas ke yang terkecil, jadi di laut yang sempit
            pulau yang lebih kecil menang. Hanya untuk pointer; keyboard memakai isian.
          -->
          <g class="lapis-halo" aria-hidden="true">
            <path
              v-for="p in haloProv"
              :key="`p${p.kode}`"
              :d="p.d"
              :data-kode="p.kode"
              data-level="prov"
              :class="['halo', { 'is-mati': provAktif && p.kode === provAktif.kode }]"
              @pointerenter="masukPointer(p, 'prov', $event)"
              @pointermove="gerakPointer(p, 'prov', $event)"
              @pointerleave="lepasSorot"
            />
            <path
              v-for="k in haloKab"
              :key="`k${k.kode}`"
              :d="k.d"
              :data-kode="k.kode"
              data-level="kab"
              class="halo"
              @pointerenter="masukPointer(k, 'kab', $event)"
              @pointermove="gerakPointer(k, 'kab', $event)"
              @pointerleave="lepasSorot"
            />
          </g>

          <!-- lapis provinsi (peta nasional; provinsi lain diredupkan saat satu provinsi dibuka) -->
          <g class="lapis">
            <path
              v-for="p in provinsiPaths"
              :key="p.kode"
              :d="p.d"
              :data-kode="p.kode"
              data-level="prov"
              :class="['wil', 'wil--prov', {
                'is-redup': provAktif && p.kode !== provAktif.kode,
                'is-tersembunyi': provAktif && p.kode === provAktif.kode,
                'is-berisi': !provAktif && p.kode === provTerpilih,
                'is-sorot': sorotan && sorotan.level === 'prov' && sorotan.kode === p.kode,
              }]"
              :tabindex="provAktif ? -1 : 0"
              role="button"
              :aria-label="`Provinsi ${p.nama}`"
              @keydown.enter.prevent="klikProvinsi(p, true)"
              @keydown.space.prevent="klikProvinsi(p, true)"
              @pointerenter="masukPointer(p, 'prov', $event)"
              @pointermove="gerakPointer(p, 'prov', $event)"
              @pointerleave="lepasSorot"
              @focus="fokus(p, 'prov', $event)"
              @blur="lepasSorot"
            />
            <path v-if="garisProv.dalam" class="garis garis--prov-dalam" :d="garisProv.dalam" />
            <path v-if="garisProv.luar" class="garis garis--prov-luar" :d="garisProv.luar" />
          </g>

          <!-- lapis kab/kota provinsi yang dibuka -->
          <g v-if="kabPaths.length" class="lapis">
            <path
              v-for="k in kabPaths"
              :key="k.kode"
              :d="k.d"
              :data-kode="k.kode"
              data-level="kab"
              :class="['wil', 'wil--kab', {
                'is-terpilih': k.kode === kabTerpilih,
                'is-sorot': sorotan && sorotan.level === 'kab' && sorotan.kode === k.kode,
              }]"
              tabindex="0"
              role="button"
              :aria-label="k.nama"
              :aria-pressed="k.kode === kabTerpilih ? 'true' : 'false'"
              @keydown.enter.prevent="klikKab(k)"
              @keydown.space.prevent="klikKab(k)"
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
      </svg>

      <div v-if="tip" class="peta__tip" :style="gayaTip" aria-hidden="true">
        <span class="peta__tip-nama">{{ tip.nama }}</span>
        <span class="peta__tip-aksi">{{ aksiTip }}</span>
      </div>

      <p v-if="memuat" class="peta__status" role="status">Memuat peta…</p>
      <p v-else-if="galat" class="peta__status peta__status--galat" role="alert">
        {{ galat }}
        <button type="button" class="peta__ulang" @click="cobaLagi">Coba lagi</button>
      </p>
    </div>

    <div class="peta__kaki">
      <p class="peta__petunjuk">{{ petunjuk }}</p>
      <p class="peta__sumber">Batas wilayah: {{ sumberSingkat }}</p>
    </div>
  </div>
</template>

<script setup>
// ============================================================================
// JadcPeta.vue — peta Indonesia untuk tab "Simulasi" di halaman JAD.
//
// Alur: peta nasional (38 provinsi) -> klik provinsi -> kab/kota provinsi itu
// dimuat dan peta memperbesar ke sana -> klik kab/kota -> emit('pilih', kode).
// Rantai komando TIDAK dihitung di sini; halaman induk meneruskan kode ke
// resolveChain (API terkunci). Peta hanya memakai data publik src/data/peta.
//
// Zoom/geser memakai d3-zoom. Transform dipasang langsung ke <g> (bukan lewat
// reaktivitas Vue) agar zoom tetap mulus tanpa render ulang tiap frame.
// ============================================================================
import { ref, shallowRef, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import { zoom as d3Zoom, zoomIdentity } from 'd3-zoom';
import 'd3-transition';
import { muatPetaProvinsi, muatPetaKab, garisBatas } from '@/data/peta/usePeta.js';
import meta from '@/data/peta/meta.json';

const props = defineProps({
  /** Kode wilayah terpilih (provinsi, kab/kota, atau kecamatan); disorot di peta. */
  kodeTerpilih: { type: String, default: null },
});
const emit = defineEmits(['pilih']);

// ---- konstanta tampilan ---------------------------------------------------
const W = 1000;          // lebar koordinat peta (viewBox)
const H = 540;           // tinggi koordinat peta
const PAD = 18;          // jarak tepi saat memaskan Indonesia
const K_MAKS = 120;      // zoom maksimum (pulau kecil tetap bisa diklik)
const ISI_PROVINSI = 0.9; // porsi layar yang diisi provinsi saat dibuka
const DURASI = 650;      // ms animasi masuk/keluar provinsi
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

const provinsiPaths = shallowRef([]);          // [{ kode, nama, d, luas }] urut kode (= urutan Tab)
const kabPaths = shallowRef([]);               // [{ kode, nama, d, luas }]
const garisProv = shallowRef({ dalam: '', luar: '' });
const garisKab = shallowRef({ dalam: '', luar: '' });
const provAktif = shallowRef(null);            // { kode, nama } | null
const memuat = ref(false);
const galat = ref('');
const sorotan = shallowRef(null);              // { kode, level, nama }
const tip = ref(null);                         // { kode, level, nama, x, y, kiri, atas }

let dataProv = null;       // hasil muatPetaProvinsi()
let pembuatPath = null;    // geoPath dengan proyeksi tetap
let perilakuZoom = null;
let batasAktif = null;     // bounding box provinsi yang dibuka (koordinat peta)
let tokenMuat = 0;         // mencegah hasil pemuatan lama menimpa yang baru
let kodeGagal = null;      // provinsi yang gagal dimuat (untuk "Coba lagi")
let sedangGeser = false;

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
  if (provAktif.value && s.kode === provAktif.value.kode) return null;
  const p = provinsiPaths.value.find((x) => x.kode === s.kode);
  return p ? p.d : null;
});

const aksiTip = computed(() => {
  const t = tip.value;
  if (!t) return '';
  if (t.level === 'kab') {
    return t.kode === kabTerpilih.value ? 'Wilayah terpilih' : 'Klik untuk melihat rantai komando';
  }
  return provAktif.value ? 'Klik untuk pindah ke provinsi ini' : 'Klik untuk membuka';
});

const gayaTip = computed(() => {
  const t = tip.value;
  if (!t) return {};
  const tx = t.kiri ? 'calc(-100% - 12px)' : '12px';
  const ty = t.atas ? 'calc(-100% - 12px)' : '14px';
  return { left: `${t.x}px`, top: `${t.y}px`, transform: `translate(${tx}, ${ty})` };
});

const petunjuk = computed(() => {
  if (SENTUH) {
    return provAktif.value
      ? 'Ketuk kabupaten/kota untuk melihat rantai komandonya. Ketuk “Indonesia” untuk kembali.'
      : 'Ketuk provinsi untuk memperbesar. Cubit untuk zoom, geser untuk memindahkan peta.';
  }
  return provAktif.value
    ? 'Klik kabupaten/kota untuk melihat rantai komandonya. Tekan Esc atau klik “Indonesia” untuk kembali.'
    : 'Klik provinsi untuk memperbesar. Gulir untuk zoom, seret untuk menggeser.';
});

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
      if (tip.value) tip.value = null; // posisi tooltip tidak lagi tepat
    })
    .on('end', () => { sedangGeser = false; });

  select(svgEl.value)
    .call(perilakuZoom)
    .on('dblclick.zoom', null); // klik ganda tidak dipakai untuk zoom
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
  terapkan(provAktif.value && batasAktif ? transformUntuk(batasAktif) : zoomIdentity);
}

// ---- pemuatan -------------------------------------------------------------
function keJalur(fitur) {
  return fitur.map((f) => ({
    kode: f.kode,
    nama: f.nama,
    d: pembuatPath(f.geo) || '',
    luas: pembuatPath.area(f.geo) || 0,
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
    dataProv = await muatPetaProvinsi();
    const proyeksi = geoMercator().fitExtent([[PAD, PAD], [W - PAD, H - PAD]], dataProv.koleksi);
    pembuatPath = geoPath(proyeksi);
    provinsiPaths.value = keJalur(dataProv.fitur);
    perbaruiGarisProv(null);
  } catch (e) {
    galat.value = 'Peta gagal dimuat.';
    return;
  } finally {
    memuat.value = false;
  }
  // wilayah yang sudah dipilih lewat tab lain (kab/kota, kecamatan, atau
  // provinsi) langsung ditampilkan tanpa animasi
  if (provTerpilih.value) await bukaProvinsi(provTerpilih.value, { animasi: false });
}

async function bukaProvinsi(kode, { animasi = true } = {}) {
  if (!pembuatPath) return;
  const info = provinsiPaths.value.find((p) => p.kode === kode);
  if (!info) return;
  if (provAktif.value && provAktif.value.kode === kode && kabPaths.value.length) return;

  const token = ++tokenMuat;
  memuat.value = true;
  galat.value = '';
  kodeGagal = null;
  sorotan.value = null;
  tip.value = null;
  try {
    const data = await muatPetaKab(kode);
    if (token !== tokenMuat) return; // pengguna sudah memilih yang lain
    provAktif.value = { kode, nama: info.nama };
    kabPaths.value = keJalur(data.fitur);
    const g = garisBatas(data);
    garisKab.value = { dalam: pembuatPath(g.dalam) || '', luar: pembuatPath(g.luar) || '' };
    perbaruiGarisProv(kode);
    batasAktif = pembuatPath.bounds(data.koleksi);
    terapkan(transformUntuk(batasAktif), animasi);
  } catch (e) {
    if (token === tokenMuat) {
      kodeGagal = kode;
      galat.value = `Peta ${info.nama} gagal dimuat.`;
    }
  } finally {
    if (token === tokenMuat) memuat.value = false;
  }
}

function keNasional(fokuskan = false) {
  const kodeLama = provAktif.value ? provAktif.value.kode : null;
  tokenMuat++; // batalkan pemuatan provinsi yang masih berjalan
  memuat.value = false;
  galat.value = '';
  kodeGagal = null;
  provAktif.value = null;
  kabPaths.value = [];
  garisKab.value = { dalam: '', luar: '' };
  batasAktif = null;
  sorotan.value = null;
  tip.value = null;
  if (dataProv) perbaruiGarisProv(null);
  terapkan(zoomIdentity);
  if (fokuskan && kodeLama) fokusElemen(`.wil--prov[data-kode="${kodeLama}"]`);
}

function cobaLagi() {
  if (!dataProv) muatNasional();
  else if (kodeGagal) bukaProvinsi(kodeGagal);
}

// ---- interaksi ------------------------------------------------------------
function wilayahDari(el) {
  if (!el || !svgEl.value || !svgEl.value.contains(el) || typeof el.getAttribute !== 'function') return null;
  const kode = el.getAttribute('data-kode');
  const level = el.getAttribute('data-level');
  return kode && level ? { kode, level } : null;
}

/**
 * Satu penangan klik untuk seluruh peta. Wilayah ditentukan dari titik klik yang
 * sebenarnya (elementFromPoint), bukan dari event.target: di layar sentuh peramban
 * dapat "menyesuaikan" target ketukan ke elemen di sekitar jari (touch adjustment,
 * berbasis kotak batas elemen), sehingga ketukan pada kota kecil yang dikelilingi
 * kabupaten (mis. Kota Samarinda di dalam Kutai Kartanegara) bisa berpindah ke
 * kabupaten di sekitarnya. event.target hanya dipakai bila titik klik tidak
 * mengenai wilayah mana pun (mis. ketukan di laut dekat pulau kecil) atau klik
 * tidak berasal dari pointer (detail 0: pembaca layar).
 */
function klikPeta(e) {
  let w = null;
  if (e.detail !== 0 && typeof document.elementFromPoint === 'function') {
    w = wilayahDari(document.elementFromPoint(e.clientX, e.clientY));
  }
  if (!w) w = wilayahDari(e.target); // mis. ketukan di laut dekat pulau kecil
  if (!w) return;
  if (w.level === 'kab') {
    const k = kabPaths.value.find((x) => x.kode === w.kode);
    if (k) klikKab(k);
  } else {
    const p = provinsiPaths.value.find((x) => x.kode === w.kode);
    if (p) klikProvinsi(p, false);
  }
}

async function klikProvinsi(p, viaKeyboard) {
  if (provAktif.value && p.kode === provAktif.value.kode) return;
  await bukaProvinsi(p.kode);
  if (viaKeyboard && provAktif.value && provAktif.value.kode === p.kode) {
    fokusElemen('.wil--kab.is-terpilih', '.wil--kab');
  }
}

function klikKab(k) {
  emit('pilih', k.kode);
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

// tooltip & sorotan
function posisi(clientX, clientY) {
  if (!kanvasEl.value) return null;
  const r = kanvasEl.value.getBoundingClientRect();
  const x = clientX - r.left;
  const y = clientY - r.top;
  return { x, y, kiri: x > r.width - 230, atas: y > r.height - 70 };
}

function tampilkanTip(item, level, clientX, clientY) {
  const pos = posisi(clientX, clientY);
  if (!pos) return;
  sorotan.value = { kode: item.kode, level, nama: item.nama };
  tip.value = { kode: item.kode, level, nama: item.nama, ...pos };
}

function masukPointer(item, level, e) {
  if (sedangGeser || e.pointerType === 'touch') return; // di layar sentuh tooltip tidak membantu
  tampilkanTip(item, level, e.clientX, e.clientY);
}

function gerakPointer(item, level, e) {
  if (sedangGeser || e.pointerType === 'touch') return;
  const t = tip.value;
  if (t && t.kode === item.kode && t.level === level) {
    const pos = posisi(e.clientX, e.clientY);
    if (pos) tip.value = { ...t, ...pos };
  } else {
    // tooltip disembunyikan selama zoom/geser; tampilkan lagi begitu pointer bergerak
    tampilkanTip(item, level, e.clientX, e.clientY);
  }
}

function fokus(item, level, e) {
  // hanya untuk fokus lewat keyboard; klik mouse sudah ditangani pointerenter
  let lewatKeyboard = true;
  try { lewatKeyboard = e.target.matches(':focus-visible'); } catch { /* peramban lama */ }
  if (!lewatKeyboard) return;
  const r = e.target.getBoundingClientRect();
  tampilkanTip(item, level, r.left + r.width / 2, r.top + r.height / 2);
}

function lepasSorot() {
  sorotan.value = null;
  tip.value = null;
}

// ---- siklus hidup ---------------------------------------------------------
// pilihan berubah ke provinsi lain -> buka provinsi itu
watch(provTerpilih, (p) => {
  if (!p || !dataProv) return;
  if (!provAktif.value || provAktif.value.kode !== p) bukaProvinsi(p);
});

onMounted(() => {
  pasangZoom();
  muatNasional();
});

onBeforeUnmount(() => {
  tokenMuat++;
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
  cursor: grab; touch-action: none;
  -webkit-user-select: none; user-select: none;
}
.peta__svg:active { cursor: grabbing; }
.peta__laut { fill: #e6edf4; }

/* area klik tambahan di sekeliling wilayah (tak terlihat, hanya menangkap pointer) */
.halo {
  fill: none; stroke: transparent; stroke-width: 8px;
  stroke-linejoin: round; vector-effect: non-scaling-stroke;
  pointer-events: stroke; cursor: pointer;
}
.halo.is-mati { display: none; }
@media (pointer: coarse) {
  .halo { stroke-width: 16px; } /* jari lebih besar dari kursor */
}

/* isian wilayah: hanya bagian daratan yang menerima klik */
.wil {
  stroke: none; pointer-events: fill;
  cursor: pointer; outline: none;
  transition: fill 0.12s ease;
}
/* sorotan memakai kelas (bukan :hover) agar juga menyala saat pointer berada di
   area klik tambahan, dan tidak "tertinggal" setelah diketuk di layar sentuh */
.wil--prov { fill: #ffffff; }
.wil--prov.is-sorot, .wil--prov:focus-visible { fill: #e3ebfc; }
.wil--prov.is-berisi { fill: #d3e0fb; }
.wil--prov.is-berisi.is-sorot { fill: #c6d6fa; }
.wil--prov.is-redup { fill: #eef2f6; }
.wil--prov.is-redup.is-sorot { fill: #e2e8f0; }
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
.garis--prov-dalam { stroke: #b7c1cc; stroke-width: 0.8px; }
.garis--prov-luar { stroke: #93a0ad; stroke-width: 0.9px; }
.is-provinsi .garis--prov-dalam { stroke: #d3dae2; }
.is-provinsi .garis--prov-luar { stroke: #c2cbd5; }
.garis--kab-dalam { stroke: #aeb8c3; stroke-width: 0.8px; }
.garis--kab-luar { stroke: #7d8a98; stroke-width: 1.1px; }
.garis--terpilih { stroke: #1f3f99; stroke-width: 2px; }
.garis--sorot { stroke: #1e272e; stroke-width: 1.6px; }

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
.peta__kaki {
  display: flex; justify-content: space-between; align-items: baseline;
  gap: 0.4rem 1rem; flex-wrap: wrap;
}
.peta__petunjuk { margin: 0; font-size: 0.82rem; color: #5a6472; max-width: 62ch; }
.peta__sumber { margin: 0; font-size: 0.75rem; color: #8a929c; }

@media (prefers-reduced-motion: reduce) {
  .wil { transition: none; }
}
</style>
