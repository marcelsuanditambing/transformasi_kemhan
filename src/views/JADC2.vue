<template>
  <section class="jadc2 container">
    <header class="jadc2__head">
      <h1>Navigasi Komando JAD</h1>
      <p class="jadc2__sub">
        Pilih sebuah wilayah — sistem menampilkan rantai komando pengawasan TNI Angkatan Darat, Laut, dan Udara.
      </p>
    </header>

    <div :class="['jadc2__isi', { 'is-simulasi': simulasi }]">
      <JadcSelektor
        v-model:mode="mode"
        class="jadc2__pilih"
        :kode-terpilih="kodeAktif"
        @pilih="onPilih"
      />

      <div class="jadc2__hasil" :aria-busy="loading ? 'true' : 'false'">
        <p v-if="error" class="jadc2__state jadc2__state--error" aria-live="polite">
          Gagal memuat data: {{ error.message }}. Pilih wilayah lain untuk mencoba lagi.
        </p>

        <!-- hasil lama tetap tampil (diredupkan) selama hasil baru dimuat -->
        <JadcHasil
          v-else-if="hasil"
          :hasil="hasil"
          :samping="simulasi"
          :class="{ 'is-memuat': loading }"
        />

        <p v-else-if="loading" class="jadc2__state" aria-live="polite">Memuat data wilayah…</p>

        <div v-else class="jadc2__empty">
          <p>Belum ada wilayah dipilih.</p>
          <p v-if="simulasi" class="jadc2__empty-hint">
            Klik sebuah provinsi pada peta, lalu klik kabupaten/kota untuk melihat rantai komandonya.
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
import { ref, computed } from 'vue';
import { useJadc2 } from '@/data/jadc2/useJadc2.js';
import JadcSelektor from '@/components/jadc2/JadcSelektor.vue';
import JadcHasil from '@/components/jadc2/JadcHasil.vue';

const { loading, error, hasil, pilih } = useJadc2();

const mode = ref('cari');                 // 'cari' | 'bertingkat' | 'simulasi'
const kodeAktif = ref(null);              // wilayah terakhir yang dipilih (dari mode mana pun)
const simulasi = computed(() => mode.value === 'simulasi');

function onPilih(kode) {
  kodeAktif.value = kode;
  pilih(kode).catch(() => { /* galat sudah ditampilkan lewat `error` */ });
}
</script>

<style scoped>
.jadc2 { padding-top: 0.5rem; padding-bottom: 3rem; }

.jadc2__head { margin-bottom: 1.25rem; }
.jadc2__head h1 { margin: 0 0 0.35rem; font-size: 1.6rem; }
.jadc2__sub { margin: 0; color: #5a6472; max-width: 62ch; line-height: 1.45; }

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
