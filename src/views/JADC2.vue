<template>
  <section class="jadc2 container">
    <header class="jadc2__head">
      <h1>
        JADC2 — Navigasi Komando
        <span class="jadc2__label">Prototipe</span>
      </h1>
      <p class="jadc2__sub">
        <strong>Joint All-Domain Command and Control:</strong> pilih wilayah atau tandai titik di peta —
        sistem menampilkan rantai komando pengawasan TNI Angkatan Darat, Laut, dan Udara yang bertanggung
        jawab atas wilayah itu.
      </p>
    </header>

    <div :class="['jadc2__isi', { 'is-simulasi': simulasi }]">
      <JadcSelektor
        v-model:mode="mode"
        class="jadc2__pilih"
        :kode-terpilih="kodeAktif"
        :titik="titik"
        @pilih="onPilih"
        @pin="onPin"
      />

      <div class="jadc2__hasil" :aria-busy="loading ? 'true' : 'false'">
        <!-- ringkasan titik simulasi (pin) -->
        <JadcTitik v-if="titik" :titik="titik" />

        <p v-if="error" class="jadc2__state jadc2__state--error" aria-live="polite">
          Gagal memuat data: {{ error.message }}. Pilih wilayah lain untuk mencoba lagi.
        </p>

        <!-- hasil lama tetap tampil (diredupkan) selama hasil baru dimuat -->
        <JadcHasil
          v-else-if="hasil"
          :hasil="hasil"
          :samping="simulasi"
          :titik="titik"
          :class="{ 'is-memuat': loading }"
        />

        <p v-else-if="loading" class="jadc2__state" aria-live="polite">Memuat data wilayah…</p>

        <div v-else-if="!titik" class="jadc2__empty">
          <p>Belum ada wilayah dipilih.</p>
          <p v-if="simulasi" class="jadc2__empty-hint">
            Klik di mana saja pada peta — darat maupun laut — untuk menandai titik dan melihat
            satuan yang bertanggung jawab atas wilayah itu.
          </p>
          <p v-else class="jadc2__empty-hint">
            Ketik nama kecamatan atau kabupaten di kotak pencarian, atau gunakan pilihan bertingkat.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, shallowRef, computed } from 'vue';
import { useJadc2 } from '@/data/jadc2/useJadc2.js';
import JadcSelektor from '@/components/jadc2/JadcSelektor.vue';
import JadcHasil from '@/components/jadc2/JadcHasil.vue';
import JadcTitik from '@/components/jadc2/JadcTitik.vue';

const { loading, error, hasil, pilih, kosongkan } = useJadc2();

const mode = ref('cari');                 // 'cari' | 'bertingkat' | 'simulasi'
const kodeAktif = ref(null);              // wilayah terakhir yang dipilih (dari mode mana pun)
const titik = shallowRef(null);           // titik simulasi (pin) terakhir, atau null
const simulasi = computed(() => mode.value === 'simulasi');

const kabOf = (kode) => {
  const p = String(kode || '').split('.');
  return p.length >= 2 ? `${p[0]}.${p[1]}` : null;
};

/** Pilihan dari kotak cari, pilihan bertingkat, atau dropdown kecamatan. */
function onPilih(kode) {
  const t = titik.value;
  // titik tetap berlaku bila hanya memperinci kecamatan di kab/kota titik darat itu
  const tetap = t && t.jenis === 'darat' && t.kab && kabOf(kode) === t.kab.kode;
  if (!tetap) titik.value = null;
  kodeAktif.value = kode;
  pilih(kode).catch(() => { /* galat sudah ditampilkan lewat `error` */ });
}

/** Titik baru dari peta (hasil analisisTitik). Hanya klik terakhir yang sampai ke sini. */
function onPin(hasilTitik) {
  titik.value = hasilTitik;
  if (hasilTitik.kab && hasilTitik.adaRantai) {
    kodeAktif.value = hasilTitik.kab.kode;
    pilih(hasilTitik.kab.kode).catch(() => {});
  } else {
    // terlalu jauh dari wilayah Indonesia: tidak ada rantai komando
    kodeAktif.value = null;
    kosongkan();
  }
}
</script>

<style scoped>
.jadc2 { padding-top: 0.5rem; padding-bottom: 3rem; }

.jadc2__head { margin-bottom: 1.25rem; }
.jadc2__head h1 {
  display: flex; align-items: center; flex-wrap: wrap; gap: 0.3rem 0.6rem;
  margin: 0 0 0.35rem; font-size: 1.6rem;
}
.jadc2__label {
  font-size: 0.72rem; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase;
  color: #8a6316; background: #fbf0d9; border: 1px solid #efd9a6;
  padding: 0.12rem 0.5rem; border-radius: 999px;
}
.jadc2__sub { margin: 0; color: #5a6472; max-width: 70ch; line-height: 1.45; }
.jadc2__sub strong { color: #3d4653; font-weight: 600; }

.jadc2__state { margin-top: 1.5rem; color: #5a6472; }
.jadc2__state--error { color: #b23b3b; }

.jadc2__empty {
  margin-top: 1.5rem; padding: 1.5rem;
  border: 1px dashed #d5dbe1; border-radius: 6px; background: #fff;
  color: #3d4653;
}
.jadc2__empty p { margin: 0; }
.jadc2__empty-hint { margin-top: 0.35rem; color: #7a828d; font-size: 0.9rem; }

.is-memuat { opacity: 0.55; transition: opacity 0.15s ease; }

.jadc2__hasil > :first-child.titik { margin-top: 1.5rem; }
.titik + .hasil { margin-top: 0; }

/* Simulasi di layar lebar: peta di kiri, rantai komando di kanan */
@media (min-width: 1024px) {
  .jadc2__isi.is-simulasi {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 380px;
    gap: 1.25rem;
    align-items: start;
  }
  .jadc2__isi.is-simulasi .jadc2__state,
  .jadc2__isi.is-simulasi .jadc2__empty { margin-top: 0; }
  .jadc2__isi.is-simulasi .jadc2__hasil > :first-child.titik { margin-top: 0; }
}
/* peta ikut "menempel" saat rantai komando digulir — hanya bila layar cukup
   tinggi untuk memuat seluruh kartu peta, agar bagian bawahnya tidak terpotong */
@media (min-width: 1024px) and (min-height: 780px) {
  .jadc2__isi.is-simulasi .jadc2__pilih { position: sticky; top: 1rem; }
}

@media (prefers-reduced-motion: reduce) {
  .is-memuat { transition: none; }
}
</style>
