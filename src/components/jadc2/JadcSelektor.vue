<template>
  <div class="selektor">
    <!-- pilih mode input -->
    <div class="modebar" role="tablist" aria-label="Cara memilih wilayah">
      <button
        v-for="m in modes" :key="m.id"
        type="button"
        role="tab" :aria-selected="mode === m.id"
        :class="['modebar__btn', { 'is-on': mode === m.id }]"
        @click="mode = m.id"
      >{{ m.label }}</button>
    </div>

    <!-- MODE: cari nama -->
    <div v-if="mode === 'cari'" class="cari">
      <label class="cari__label" for="jadc2-cari">Cari kecamatan atau kabupaten</label>
      <div class="cari__box">
        <input
          id="jadc2-cari"
          ref="inputEl"
          v-model="query"
          type="text"
          class="cari__input"
          placeholder="mis. Coblong, Jatinangor, Kupang…"
          autocomplete="off"
          role="combobox"
          :aria-expanded="buka"
          aria-controls="jadc2-cari-list"
          @input="onInput"
          @keydown.down.prevent="gerak(1)"
          @keydown.up.prevent="gerak(-1)"
          @keydown.enter.prevent="pilihSorot()"
          @keydown.esc="buka = false"
        />
        <ul
          v-if="buka && hasilCari.length"
          id="jadc2-cari-list"
          class="cari__list"
          role="listbox"
        >
          <li
            v-for="(r, i) in hasilCari"
            :key="r.kode"
            role="option"
            :aria-selected="i === sorot"
            :class="['cari__opt', { 'is-sorot': i === sorot }]"
            @mousedown.prevent="pilih(r)"
            @mouseenter="sorot = i"
          >
            <span class="cari__opt-nama">{{ r.nama }}</span>
            <span class="cari__opt-jalur">{{ r.jalur.join(', ') }}</span>
            <span class="cari__opt-lvl">{{ r.level === 'kec' ? 'kecamatan' : r.level === 'kab' ? 'kab/kota' : 'provinsi' }}</span>
          </li>
        </ul>
        <p v-else-if="buka && query.length >= 2" class="cari__kosong">Tidak ada wilayah cocok.</p>
      </div>
    </div>

    <!-- MODE: pilih bertingkat -->
    <div v-else-if="mode === 'bertingkat'" class="tingkat">
      <div class="tingkat__field">
        <label for="sel-prov">Provinsi</label>
        <select id="sel-prov" v-model="selProv" @change="onProv">
          <option value="">— pilih provinsi —</option>
          <option v-for="p in provinsi" :key="p.kode" :value="p.kode">{{ p.nama }}</option>
        </select>
      </div>
      <div class="tingkat__field">
        <label for="sel-kab">Kabupaten / Kota</label>
        <select id="sel-kab" v-model="selKab" :disabled="!kabList.length" @change="onKab">
          <option value="">— pilih kab/kota —</option>
          <option v-for="k in kabList" :key="k.kode_bps" :value="k.kode_bps">{{ k.nama }}</option>
        </select>
      </div>
      <div class="tingkat__field">
        <label for="sel-kec">Kecamatan <span class="tingkat__opt">(opsional)</span></label>
        <select id="sel-kec" v-model="selKec" :disabled="!kecList.length" @change="onKec">
          <option value="">— seluruh kabupaten —</option>
          <option v-for="c in kecList" :key="c.kode_bps" :value="c.kode_bps">{{ c.nama }}</option>
        </select>
      </div>
    </div>

    <!-- MODE: simulasi peta -->
    <div v-else-if="mode === 'simulasi'" class="simulasi">
      <JadcPeta :kode-terpilih="kodeTerpilih" :titik="titik" @pin="onPin" />

      <!-- kecamatan hanya relevan untuk wilayah darat -->
      <div v-if="simKab && (!titik || titik.jenis === 'darat')" class="simulasi__kec">
        <label for="sim-kec">Kecamatan <span class="tingkat__opt">(opsional)</span></label>
        <select
          id="sim-kec"
          :value="simKec"
          :disabled="!simKecList.length"
          @change="onSimKec($event.target.value)"
        >
          <option value="">— seluruh kabupaten/kota —</option>
          <option v-for="c in simKecList" :key="c.kode_bps" :value="c.kode_bps">{{ c.nama }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, defineAsyncComponent, h } from 'vue';
import { useJadc2 } from '@/data/jadc2/useJadc2.js';

// Peta (d3 + data batas wilayah) baru diunduh saat tab Simulasi dibuka.
const JadcPeta = defineAsyncComponent({
  loader: () => import('./JadcPeta.vue'),
  delay: 150,
  loadingComponent: {
    render: () => h('p', { style: 'margin:0;padding:1rem 0;color:#5a6472;font-size:0.9rem' }, 'Memuat peta…'),
  },
  errorComponent: {
    render: () => h('p', { style: 'margin:0;padding:1rem 0;color:#b23b3b;font-size:0.9rem' },
      'Peta gagal dimuat. Muat ulang halaman untuk mencoba lagi.'),
  },
});

const props = defineProps({
  /** Kode wilayah yang sedang dipilih di halaman (dari mode mana pun). */
  kodeTerpilih: { type: String, default: null },
  /** Titik simulasi (pin) yang sedang aktif, atau null. */
  titik: { type: Object, default: null },
});
const emit = defineEmits(['pilih', 'pin']);
const mode = defineModel('mode', { type: String, default: 'cari' });

const { cariWilayah, daftarProvinsi, daftarKabupaten, daftarKecamatan } = useJadc2();

const modes = [
  { id: 'cari', label: 'Cari wilayah' },
  { id: 'bertingkat', label: 'Pilih bertingkat' },
  { id: 'simulasi', label: 'Simulasi' },
];

const provOf = (kode) => String(kode).split('.')[0];
const kabOf = (kode) => {
  const p = String(kode || '').split('.');
  return p.length >= 2 ? `${p[0]}.${p[1]}` : null;
};
const isKec = (kode) => String(kode || '').split('.').length === 3;

/* ---- mode cari ---- */
const inputEl = ref(null);
const query = ref('');
const hasilCari = ref([]);
const buka = ref(false);
const sorot = ref(-1);
let timer = null;

function onInput() {
  buka.value = true;
  sorot.value = -1;
  clearTimeout(timer);
  timer = setTimeout(async () => {
    hasilCari.value = await cariWilayah(query.value, { limit: 12 });
  }, 180);
}
function gerak(step) {
  if (!hasilCari.value.length) return;
  const n = hasilCari.value.length;
  sorot.value = (sorot.value + step + n) % n;
}
function pilihSorot() {
  const i = sorot.value >= 0 ? sorot.value : 0;
  if (hasilCari.value[i]) pilih(hasilCari.value[i]);
}
let kodeDariCari = null; // wilayah terakhir yang dipilih lewat kotak cari
function pilih(r) {
  query.value = r.nama;
  buka.value = false;
  kodeDariCari = r.kode;
  emit('pilih', r.kode);
}

/* ---- mode bertingkat ---- */
const provinsi = ref([]);
onMounted(async () => {
  try { provinsi.value = await daftarProvinsi(); } catch { /* data butuh login; abaikan */ }
});
const selProv = ref('');
const selKab = ref('');
const selKec = ref('');
const kabList = ref([]);
const kecList = ref([]);

async function onProv() {
  selKab.value = ''; selKec.value = '';
  kabList.value = []; kecList.value = [];
  if (selProv.value) kabList.value = await daftarKabupaten(selProv.value);
}
async function onKab() {
  selKec.value = ''; kecList.value = [];
  if (selKab.value) {
    kecList.value = await daftarKecamatan(selKab.value);
    emit('pilih', selKab.value); // jawaban tingkat kabupaten
  }
}
function onKec() {
  if (selKec.value) emit('pilih', selKec.value);
  else if (selKab.value) emit('pilih', selKab.value);
}

// Saat pindah ke "Pilih bertingkat", isian mengikuti wilayah yang sedang dipilih
// (mis. hasil klik di peta). Tidak memancarkan 'pilih' lagi.
async function sinkronBertingkat(kode) {
  const p = provOf(kode);
  const k = kabOf(kode);
  try {
    if (selProv.value !== p) {
      selProv.value = p;
      selKab.value = ''; selKec.value = ''; kecList.value = [];
      kabList.value = await daftarKabupaten(p);
    }
    if (k && selKab.value !== k) {
      selKab.value = k;
      selKec.value = '';
      kecList.value = await daftarKecamatan(k);
    }
    selKec.value = isKec(kode) ? kode : '';
  } catch { /* biarkan isian apa adanya bila data gagal dimuat */ }
}

/* ---- mode simulasi ---- */
const simKab = computed(() => kabOf(props.kodeTerpilih));
const simKec = computed(() => (isKec(props.kodeTerpilih) ? props.kodeTerpilih : ''));
const simKecList = ref([]);
let simKecUntuk = null; // kab/kota yang daftar kecamatannya sedang dimuat/tampil
let tokenKec = 0;

watch([simKab, mode], async ([kab, m]) => {
  if (m !== 'simulasi' || kab === simKecUntuk) return;
  const token = ++tokenKec;
  simKecUntuk = kab;
  simKecList.value = [];
  if (!kab) return;
  try {
    const list = await daftarKecamatan(kab);
    if (token === tokenKec) simKecList.value = list;
  } catch {
    if (token === tokenKec) simKecUntuk = null; // daftar kecamatan opsional; coba lagi nanti
  }
}, { immediate: true });

function onPin(hasilTitik) {
  emit('pin', hasilTitik);
}
function onSimKec(kodeKec) {
  emit('pilih', kodeKec || simKab.value);
}

watch(mode, (m) => {
  if (m === 'bertingkat' && props.kodeTerpilih) sinkronBertingkat(props.kodeTerpilih);
  // kotak cari tidak lagi menampilkan nama lama bila wilayah sudah diganti di tab lain
  if (m === 'cari' && props.kodeTerpilih !== kodeDariCari) {
    query.value = '';
    hasilCari.value = [];
    buka.value = false;
  }
});
</script>

<style scoped>
.selektor { background: #fff; border: 1px solid #e4e8ec; border-radius: 6px; padding: 1.1rem 1.2rem; }

.modebar { display: inline-flex; gap: 0.25rem; margin-bottom: 1rem; background: #eef1f4; padding: 0.2rem; border-radius: 6px; }
.modebar__btn {
  border: 0; background: transparent; padding: 0.4rem 0.9rem; border-radius: 4px;
  font: inherit; font-size: 0.88rem; color: #5a6472; cursor: pointer;
}
.modebar__btn.is-on { background: #fff; color: #1e272e; font-weight: 600; box-shadow: 0 1px 2px rgba(30,39,46,0.08); }
.modebar__btn:focus-visible { outline: 2px solid #4b7bec; outline-offset: 1px; }

.cari__label, .tingkat__field label, .simulasi__kec label { display: block; font-size: 0.85rem; color: #3d4653; margin-bottom: 0.35rem; }
.cari__box { position: relative; max-width: 460px; }
.cari__input {
  width: 100%; box-sizing: border-box; padding: 0.6rem 0.75rem;
  border: 1px solid #cfd6dd; border-radius: 6px; font: inherit; color: #2f3542;
}
.cari__input:focus { outline: none; border-color: #4b7bec; box-shadow: 0 0 0 3px rgba(75,123,236,0.15); }

.cari__list {
  position: absolute; z-index: 20; left: 0; right: 0; top: calc(100% + 4px);
  margin: 0; padding: 0.25rem; list-style: none;
  background: #fff; border: 1px solid #d5dbe1; border-radius: 6px;
  box-shadow: 0 6px 18px rgba(30,39,46,0.12); max-height: 320px; overflow: auto;
}
.cari__opt {
  display: grid; grid-template-columns: 1fr auto; gap: 0 0.6rem;
  padding: 0.45rem 0.55rem; border-radius: 4px; cursor: pointer;
}
.cari__opt.is-sorot { background: #eef3fe; }
.cari__opt-nama { color: #1e272e; font-weight: 600; }
.cari__opt-lvl { color: #8a929c; font-size: 0.75rem; align-self: center; }
.cari__opt-jalur { grid-column: 1 / -1; color: #7a828d; font-size: 0.78rem; }
.cari__kosong {
  position: absolute; left: 0; right: 0; top: calc(100% + 4px);
  margin: 0; padding: 0.6rem 0.7rem; background: #fff;
  border: 1px solid #d5dbe1; border-radius: 6px; color: #7a828d; font-size: 0.88rem;
}

.tingkat { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.9rem; }
@media (max-width: 760px) { .tingkat { grid-template-columns: 1fr; } }
.tingkat__opt { color: #9aa2ac; font-weight: 400; }
.tingkat select, .simulasi__kec select {
  width: 100%; box-sizing: border-box; padding: 0.55rem 0.6rem;
  border: 1px solid #cfd6dd; border-radius: 6px; font: inherit; color: #2f3542; background: #fff;
}
.tingkat select:disabled, .simulasi__kec select:disabled { background: #f4f6f8; color: #9aa2ac; }
.tingkat select:focus, .simulasi__kec select:focus { outline: none; border-color: #4b7bec; box-shadow: 0 0 0 3px rgba(75,123,236,0.15); }

.simulasi__kec { margin-top: 0.9rem; max-width: 360px; }
</style>
