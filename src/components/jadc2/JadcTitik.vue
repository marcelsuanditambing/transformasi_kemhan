<template>
  <section class="titik" aria-labelledby="titik-judul" aria-live="polite">
    <header class="titik__head">
      <h2 id="titik-judul" class="titik__judul">
        <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" focusable="false">
          <circle cx="7" cy="7" r="4.2" class="titik__ikon" />
        </svg>
        Titik simulasi
      </h2>
      <span :class="['titik__chip', `titik__chip--${golongan}`]">{{ labelGolongan }}</span>
    </header>

    <div class="titik__koordinat">
      <p class="titik__dms">{{ titik.koordinat.lintang }}&ensp;{{ titik.koordinat.bujur }}</p>
      <p class="titik__desimal">
        {{ titik.koordinat.desimal }}
        <button type="button" class="titik__salin" @click="salin">{{ tersalin ? 'Tersalin' : 'Salin' }}</button>
      </p>
    </div>

    <dl class="titik__data">
      <div>
        <dt>Lokasi</dt>
        <dd>
          {{ titik.zona.label }}
          <span v-if="titik.zona.ket" class="titik__ket">{{ titik.zona.ket }}</span>
        </dd>
      </div>

      <div v-if="titik.kab">
        <dt>{{ labelWilayah }}</dt>
        <dd>
          {{ titik.kab.nama }}, {{ titik.kab.provNama }}
          <span v-if="titik.jarakKm != null" class="titik__ket">{{ jarak }}</span>
        </dd>
      </div>

      <div>
        <dt>Dasar penentuan</dt>
        <dd class="titik__dasar">{{ dasar }}</dd>
      </div>
    </dl>

    <p v-if="!titik.yurisdiksi" class="titik__catatan">
      Titik berada di luar wilayah dan yurisdiksi Indonesia, sehingga tidak ada rantai komando
      pengawasan yang ditampilkan.
    </p>
  </section>
</template>

<script setup>
// Kartu ringkasan titik simulasi (pin) di atas rantai komando: koordinat, zona,
// kab/kota penanggung jawab atau pesisir terdekat, dan dasar penentuannya.
import { computed, ref, watch } from 'vue';
import { formatJarak } from '@/data/peta/formatTitik.js';

const props = defineProps({
  titik: { type: Object, required: true },
});

const golongan = computed(() => {
  if (!props.titik.yurisdiksi) return 'luar';
  return props.titik.jenis === 'laut' ? 'laut' : 'darat';
});
const labelGolongan = computed(() => ({
  darat: 'Darat', laut: 'Laut Indonesia', luar: 'Di luar yurisdiksi',
}[golongan.value]));

const labelWilayah = computed(() => {
  const t = props.titik;
  if (t.dasar === 'wilayah') return 'Wilayah';
  if (!t.yurisdiksi) return 'Wilayah Indonesia terdekat';
  return t.jenis === 'laut' ? 'Pesisir terdekat' : 'Wilayah terdekat';
});

const jarak = computed(() => formatJarak(props.titik.jarakKm));

const dasar = computed(() => {
  const t = props.titik;
  if (t.dasar === 'wilayah') return 'Titik berada di dalam batas kab/kota (BIG).';
  if (t.dasar === 'pesisir') {
    return 'Mengikuti kab/kota pesisir terdekat — perkiraan. Batas sektor laut dan udara resmi TNI tidak dipublikasikan.';
  }
  return 'Di luar yurisdiksi Indonesia — jarak ke wilayah Indonesia terdekat hanya sebagai informasi.';
});

// salin koordinat
const tersalin = ref(false);
let pewaktu = null;
async function salin() {
  const t = props.titik;
  const teks = `${t.koordinat.lintang} ${t.koordinat.bujur} (${t.koordinat.desimal})`;
  try {
    await navigator.clipboard.writeText(teks);
    tersalin.value = true;
    clearTimeout(pewaktu);
    pewaktu = setTimeout(() => { tersalin.value = false; }, 1600);
  } catch { /* papan klip tidak tersedia; abaikan */ }
}
watch(() => props.titik, () => { tersalin.value = false; });
</script>

<style scoped>
.titik {
  background: #fff; border: 1px solid #e4e8ec; border-left: 4px solid #d63031;
  border-radius: 6px; padding: 0.9rem 1.1rem 1rem; margin-bottom: 1rem;
}
.titik__head { display: flex; align-items: center; justify-content: space-between; gap: 0.6rem; }
.titik__judul {
  display: inline-flex; align-items: center; gap: 0.4rem;
  margin: 0; font-size: 0.95rem; color: #1e272e;
}
.titik__ikon { fill: #d63031; stroke: #fff; stroke-width: 1.5px; }
.titik__chip {
  font-size: 0.72rem; font-weight: 600; padding: 0.14rem 0.5rem; border-radius: 999px; white-space: nowrap;
}
.titik__chip--darat { background: #e6f2e9; color: #256b34; }
.titik__chip--laut { background: #e3ecfb; color: #1f4f99; }
.titik__chip--luar { background: #fbeee0; color: #8a4b12; }

.titik__koordinat { margin: 0.6rem 0 0.75rem; }
.titik__dms {
  margin: 0; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.98rem; color: #1e272e; letter-spacing: 0.01em;
}
.titik__desimal {
  display: flex; align-items: center; gap: 0.5rem; margin: 0.15rem 0 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.8rem; color: #7a828d;
}
.titik__salin {
  border: 1px solid #cfd6dd; background: #fff; border-radius: 4px;
  padding: 0.05rem 0.4rem; font: inherit; font-family: inherit; font-size: 0.72rem;
  color: #3d4653; cursor: pointer;
}
.titik__salin:hover { background: #f4f6f8; }
.titik__salin:focus-visible { outline: 2px solid #4b7bec; outline-offset: 1px; }

.titik__data { margin: 0; display: grid; gap: 0.45rem; }
.titik__data > div { display: grid; grid-template-columns: 8.5rem 1fr; gap: 0.6rem; }
.titik__data dt { font-size: 0.8rem; color: #7a828d; }
.titik__data dd { margin: 0; font-size: 0.88rem; color: #2f3542; }
.titik__ket { display: block; font-size: 0.78rem; color: #7a828d; margin-top: 0.05rem; }
.titik__dasar { font-size: 0.8rem !important; color: #5a6472 !important; line-height: 1.4; }

.titik__catatan {
  margin: 0.8rem 0 0; padding: 0.55rem 0.7rem;
  background: #f1f3f5; border: 1px solid #dde3e9; border-radius: 6px;
  color: #5a6472; font-size: 0.82rem; line-height: 1.4;
}

@media (max-width: 480px) {
  .titik__data > div { grid-template-columns: 1fr; gap: 0.1rem; }
}
</style>
