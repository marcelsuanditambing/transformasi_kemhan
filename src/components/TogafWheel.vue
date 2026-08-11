<template>
  <div class="wheel-sticky">
    <figure class="wheel">
      <img :src="wheel" alt="Diagram TOGAF ADM Pertahanan Indonesia" class="wheel-img" />
      <button
        v-for="n in nodes"
        :key="n.id"
        type="button"
        class="hotspot"
        :class="{ active: n.id === active }"
        :style="{ left: n.left + '%', top: n.top + '%' }"
        :aria-label="'Buka penjelasan ' + n.title"
        @click="$emit('select', n.id)"
      >
        <span class="sr-only">{{ n.title }}</span>
      </button>
    </figure>
  </div>
</template>

<script setup>
import wheel from '@/assets/images/togaf-pertahanan-indoneisa.svg';

// active = id fase yang sedang disorot (dikirim dari halaman pemakai).
defineProps({
  active: { type: String, default: null },
});
// select = dipancarkan saat sebuah node diklik, membawa id fase.
defineEmits(['select']);

// 10 fase yang bisa diklik. Posisi dalam persen dihitung dari koordinat SVG.
// Requirements Management (pusat) sengaja TIDAK dimasukkan → tidak bisa diklik.
const nodes = [
  { id: 'preliminary', title: 'Preliminary', left: 49.7, top: 12.7 },
  { id: 'architecture-vision', title: 'Architecture Vision', left: 49.7, top: 34.5 },
  { id: 'business-architecture', title: 'Business Architecture', left: 77.9, top: 41.8 },
  { id: 'information-system-architecture', title: 'Information System Architecture', left: 90.1, top: 59.9 },
  { id: 'technology-architecture', title: 'Technology Architecture', left: 87.6, top: 80.1 },
  { id: 'c5isr-architecture', title: 'C5ISR Architecture', left: 65.8, top: 92.6 },
  { id: 'opportunities-solutions', title: 'Opportunities & Solutions', left: 36.6, top: 92.6 },
  { id: 'migration-planning', title: 'Migration Planning', left: 14.7, top: 80.1 },
  { id: 'implementation-governance', title: 'Implementation Governance', left: 9.8, top: 59.9 },
  { id: 'architecture-change-management', title: 'Architecture Change Management', left: 21.3, top: 41.8 },
];
</script>

<style scoped>
/* Pembungkus yang menempel (sticky) saat di desktop */
.wheel-sticky {
  position: sticky;
  top: 1.25rem;
}
/* Kerangka gambar: selalu relative agar titik klik terposisi tepat di semua layar */
.wheel {
  position: relative;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  aspect-ratio: 2056 / 2753;
}
.wheel-img { display: block; width: 100%; height: 100%; }

.hotspot {
  position: absolute;
  width: 19.4%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: background 0.15s ease, box-shadow 0.15s ease;
}
.hotspot:hover { background: rgba(23, 33, 58, 0.09); }
.hotspot:focus-visible { outline: 3px solid #17213a; outline-offset: 2px; }
.hotspot.active {
  background: rgba(250, 104, 0, 0.14);
  box-shadow: 0 0 0 3px #fa6800;
}

/* Mobile: berhenti menempel (gambar mengalir di atas konten) */
@media (max-width: 900px) {
  .wheel-sticky { position: static; }
}
@media (prefers-reduced-motion: reduce) {
  .hotspot { transition: none; }
}

.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
