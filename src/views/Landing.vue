<template>
  <section class="togaf">
    <header class="intro">
      <h1 class="brand">
        <button type="button" class="brand-btn" @click="reset">{{ overview.title }}</button>
      </h1>
      <p class="subtitle">{{ overview.subtitle }}</p>
    </header>

    <div class="layout">
      <!-- Kiri (desktop) / atas (mobile): diagram roda interaktif -->
      <figure class="wheel">
        <img :src="wheel" alt="Diagram TOGAF ADM Pertahanan Indonesia" class="wheel-img" />
        <button
          v-for="n in nodes"
          :key="n.id"
          type="button"
          class="hotspot"
          :class="{ active: n.id === selectedId }"
          :style="{ left: n.left + '%', top: n.top + '%' }"
          :aria-label="'Buka penjelasan ' + n.title"
          @click="selectPhase(n.id)"
        >
          <span class="sr-only">{{ n.title }}</span>
        </button>
      </figure>

      <!-- Kanan (desktop) / bawah (mobile): penjelasan -->
      <div class="content">
        <!-- Tampilan awal: ikhtisar -->
        <template v-if="!selected">
          <p v-for="(p, i) in overview.paragraphs" :key="i" class="para">{{ p }}</p>
        </template>

        <!-- Fase terpilih -->
        <template v-else>
          <h2 class="phase-title">
            <span class="tag">{{ badge(selected.label) }}</span>{{ selected.title }}
          </h2>

          <!-- Fase C: pilih sub-domain -->
          <template v-if="selected.hasSubDomains && !selectedSub">
            <p v-for="(p, i) in selected.intro" :key="i" class="para">{{ p }}</p>
            <div class="subchoice">
              <button
                v-for="s in selected.subDomains"
                :key="s.id"
                type="button"
                class="subcard"
                @click="selectedSubId = s.id"
              >
                <span class="subcard-title">{{ s.title }}</span>
                <span class="subcard-go">Baca →</span>
              </button>
            </div>
          </template>

          <!-- Detail fase / sub-domain -->
          <template v-else>
            <h3 v-if="selected.hasSubDomains" class="sub-title">{{ detail.title }}</h3>

            <p v-for="(p, i) in detail.paragraphs" :key="'p' + i" class="para">{{ p }}</p>

            <div class="io" v-if="detail.io">
              <div class="io-col">
                <h4 class="io-head io-input">Input</h4>
                <ol><li v-for="(x, i) in detail.io.input" :key="'in' + i">{{ x }}</li></ol>
              </div>
              <div class="io-col">
                <h4 class="io-head io-step">Step</h4>
                <ol><li v-for="(x, i) in detail.io.step" :key="'st' + i">{{ x }}</li></ol>
              </div>
              <div class="io-col">
                <h4 class="io-head io-output">Output</h4>
                <ol><li v-for="(x, i) in detail.io.output" :key="'ou' + i">{{ x }}</li></ol>
              </div>
            </div>
          </template>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import wheel from '@/assets/images/togaf-pertahanan-indoneisa.svg';
import { overview, phases } from '@/data/togafPhases.js';

// Posisi tiap node pada diagram, dalam persen (dihitung dari koordinat SVG).
const nodePos = {
  'preliminary': { left: 49.7, top: 12.7 },
  'architecture-vision': { left: 49.7, top: 34.5 },
  'business-architecture': { left: 77.9, top: 41.8 },
  'information-system-architecture': { left: 90.1, top: 59.9 },
  'technology-architecture': { left: 87.6, top: 80.1 },
  'c5isr-architecture': { left: 65.8, top: 92.6 },
  'opportunities-solutions': { left: 36.6, top: 92.6 },
  'migration-planning': { left: 14.7, top: 80.1 },
  'implementation-governance': { left: 9.8, top: 59.9 },
  'architecture-change-management': { left: 21.3, top: 41.8 },
};

const nodes = phases.map((p) => ({
  id: p.id,
  title: p.title,
  left: nodePos[p.id].left,
  top: nodePos[p.id].top,
}));

const selectedId = ref(null);
const selectedSubId = ref(null);

const selected = computed(() => phases.find((p) => p.id === selectedId.value) || null);
const currentSub = computed(() => {
  if (!selected.value || !selected.value.hasSubDomains) return null;
  return selected.value.subDomains.find((s) => s.id === selectedSubId.value) || null;
});
const detail = computed(() =>
  selected.value && selected.value.hasSubDomains ? currentSub.value : selected.value
);

// Label badge: hanya huruf tunggal (A–I). Untuk "Preliminary" kosong (lingkaran saja).
function badge(label) {
  return label.length === 1 ? label : '';
}

function selectPhase(id) {
  selectedId.value = id;
  selectedSubId.value = null;
  scrollToContentOnMobile();
}
function reset() {
  selectedId.value = null;
  selectedSubId.value = null;
}
watch(selectedSubId, scrollToContentOnMobile);
// Pada layar kecil (tumpuk), gulir ke penjelasan; pada desktop (dua kolom) tidak perlu.
function scrollToContentOnMobile() {
  if (window.matchMedia('(min-width: 901px)').matches) return;
  requestAnimationFrame(() => {
    const el = document.querySelector('.togaf .content');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
</script>

<style scoped>
.togaf {
  --ink: #17213a;
  --ink-soft: #454f6b;
  --muted: #6b7488;
  --gold: #c68a12;
  --gold-soft: #f8ce45;
  --ember: #fa6800;
  --surface: #ffffff;
  --line: #e2e5ea;
  --mono: ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Consolas, monospace;

  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1.25rem 4rem;
  color: var(--ink);
}

/* ---- Header ---- */
.intro { text-align: center; padding: 0.5rem 0 2rem; }
.brand { margin: 0; }
.brand-btn {
  font: inherit;
  border: 0;
  background: none;
  cursor: pointer;
  padding: 0;
  color: var(--ink);
  font-size: clamp(1.9rem, 5vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.05;
}
.brand-btn:hover { color: var(--ember); }
.subtitle {
  max-width: 46ch;
  margin: 0.9rem auto 0;
  color: var(--ink-soft);
  font-size: 1.02rem;
  line-height: 1.5;
}

/* ---- Layout: dua kolom di desktop, tumpuk di mobile ---- */
.layout {
  display: grid;
  grid-template-columns: minmax(320px, 430px) 1fr;
  gap: 2.75rem;
  align-items: start;
}

/* ---- Wheel ---- */
.wheel {
  position: relative;
  width: 100%;
  max-width: 430px;
  margin: 0;
  aspect-ratio: 2056 / 2753;
  position: sticky;
  top: 1.25rem;
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
.hotspot:focus-visible { outline: 3px solid var(--ink); outline-offset: 2px; }
.hotspot.active {
  background: rgba(250, 104, 0, 0.14);
  box-shadow: 0 0 0 3px var(--ember);
}

/* ---- Content ---- */
.content { scroll-margin-top: 1rem; padding-top: 0.35rem; }
.para {
  max-width: 68ch;
  margin: 0 0 1.05rem;
  line-height: 1.72;
  color: var(--ink-soft);
  font-size: 1.02rem;
}
.phase-title {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: clamp(1.5rem, 4vw, 2.1rem);
  letter-spacing: -0.015em;
  margin: 0 0 1.4rem;
}
.tag {
  flex: none;
  display: grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
  background: var(--gold-soft);
  color: var(--ink);
  font-size: 1rem;
  font-weight: 700;
}
.sub-title { font-size: 1.35rem; margin: 0.1rem 0 1.1rem; }

/* Pilihan sub-domain (Fase C) */
.subchoice {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  max-width: 68ch;
  margin: 1.5rem 0 0;
}
.subcard {
  text-align: left;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 1.15rem 1.25rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
}
.subcard:hover {
  border-color: var(--gold);
  box-shadow: 0 6px 20px rgba(23, 33, 58, 0.08);
  transform: translateY(-2px);
}
.subcard-title { font-size: 1.1rem; font-weight: 700; color: var(--ink); }
.subcard-go { font-size: 0.85rem; color: var(--ember); font-weight: 600; }

/* Tabel Input / Step / Output */
.io {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 1.75rem 0 0.5rem;
}
.io-col {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 1.1rem 1.15rem 1.25rem;
}
.io-head {
  font-family: var(--mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 0 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--line);
}
.io-input { color: var(--gold); border-bottom-color: var(--gold-soft); }
.io-step { color: var(--ink); border-bottom-color: var(--ink); }
.io-output { color: var(--ember); border-bottom-color: var(--ember); }
.io-col ol { margin: 0; padding-left: 1.2rem; }
.io-col li { font-size: 0.9rem; line-height: 1.55; color: var(--ink-soft); margin-bottom: 0.55rem; }
.io-col li:last-child { margin-bottom: 0; }

/* ---- Responsif: tumpuk (gambar di atas, penjelasan di bawah) ---- */
@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; gap: 1.75rem; }
  .wheel { position: static; margin: 0 auto; }
  .io { grid-template-columns: 1fr; }
  .subchoice { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .hotspot, .subcard { transition: none; }
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
