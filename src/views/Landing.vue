<template>
  <section class="togaf">
    <h1>TOGAF Pertahanan Indonesia</h1>
    <p class="subtitle">
      Kerangka Arsitektur Enterprise berbasis TOGAF ADM untuk Transformasi
      Digital Pertahanan Indonesia.
    </p>

    <figure class="togaf-figure">
      <img :src="togafImg" alt="TOGAF ADM Pertahanan Indonesia" class="togaf-image" />
      <figcaption>Gambar: TOGAF ADM Pertahanan Indonesia</figcaption>
    </figure>
  </section>
</template>

<script setup>
// Impor gambar dari folder gambar/ di root repo.
// Vite akan otomatis mem-bundle dan menghasilkan URL yang benar.
import togafImg from '@/assets/images/togaf-adm-pertahanan-indonesia.png';
</script>

<style scoped>
.togaf {
  text-align: center;
  color: #333;
  max-width: 1000px;
  margin: 0 auto;
}
.subtitle {
  color: #57606f;
  margin-bottom: 2rem;
}
.togaf-figure {
  margin: 0;
}
.togaf-image {
  max-width: 100%;
  height: auto;
  border: 1px solid #dfe4ea;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
figcaption {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: #747d8c;
}
</style>
