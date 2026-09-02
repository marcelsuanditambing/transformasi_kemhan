<template>
  <section class="jadc2 container">
    <header class="jadc2__head">
      <h1>Navigasi Komando JADC2</h1>
      <p class="jadc2__sub">
        Pilih sebuah wilayah — sistem menampilkan rantai komando pengawasan TNI Angkatan Darat, Laut, dan Udara.
      </p>
    </header>

    <JadcSelektor @pilih="onPilih" />

    <p v-if="loading" class="jadc2__state" aria-live="polite">Memuat data wilayah…</p>

    <p v-else-if="error" class="jadc2__state jadc2__state--error" aria-live="polite">
      Gagal memuat data: {{ error.message }}. Pilih wilayah lain untuk mencoba lagi.
    </p>

    <JadcHasil v-else-if="hasil" :hasil="hasil" />

    <div v-else class="jadc2__empty">
      <p>Belum ada wilayah dipilih.</p>
      <p class="jadc2__empty-hint">
        Ketik nama kecamatan atau kabupaten di kotak pencarian, atau gunakan pilihan bertingkat.
      </p>
    </div>
  </section>
</template>

<script setup>
import { useJadc2 } from '@/data/jadc2/useJadc2.js';
import JadcSelektor from '@/components/jadc2/JadcSelektor.vue';
import JadcHasil from '@/components/jadc2/JadcHasil.vue';

const { loading, error, hasil, pilih } = useJadc2();

function onPilih(kode) {
  pilih(kode);
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
</style>