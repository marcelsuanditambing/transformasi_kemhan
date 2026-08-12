<template>
  <section class="arsi">
    <header class="intro">
      <h1 class="brand">
        <button type="button" class="brand-btn" @click="reset">Arsitektur Transformasi Digital Kemhan</button>
      </h1>
    </header>

    <div class="layout">
      <!-- Kiri (desktop) / atas (mobile): roda TOGAF (komponen bersama) -->
      <TogafWheel :active="selectedId" @select="selectPhase" />

      <!-- Kanan (desktop) / bawah (mobile): implementasi (Bab IV) -->
      <div class="content">
        <template v-if="!selected">
          <p class="lead">
            Bagian ini memuat implementasi TOGAF Pertahanan Indonesia berdasarkan Bab IV tesis.
            Klik salah satu fase pada diagram untuk membaca implementasinya.
          </p>
        </template>

        <template v-else>
          <h2 class="phase-title">
            <span class="tag">{{ badge(selected) }}</span>{{ selected.title }}
          </h2>

          <p v-if="selected.comingSoon" class="coming">Content coming soon…</p>

          <template v-else>
            <PhaseBlocks v-if="(selected.intro || []).length" :blocks="introBlocks" />

            <section v-for="sec in selected.sections" :key="sec.no" class="sec">
              <h3 class="sec-title"><span class="sec-no">{{ sec.no }}.</span>{{ sec.title }}</h3>
              <PhaseBlocks :blocks="sec.blocks" />

              <section v-for="sub in sec.subsections || []" :key="sub.no" class="subsec">
                <h4 class="subsec-title"><span class="sec-no">{{ sub.no }}</span>{{ sub.title }}</h4>
                <PhaseBlocks :blocks="sub.blocks" />
              </section>
            </section>
          </template>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import TogafWheel from '@/components/TogafWheel.vue';
import PhaseBlocks from '@/components/PhaseBlocks.vue';
import { phases } from '@/data/arsitekturFase.js';

const selectedId = ref(null);
const selected = computed(() => phases.find((p) => p.id === selectedId.value) || null);
// Paragraf pengantar fase diubah jadi blok agar dirender oleh PhaseBlocks.
const introBlocks = computed(() =>
  ((selected.value && selected.value.intro) || []).map((v) => ({ t: 'p', v }))
);

const letters = {
  'architecture-vision': 'A', 'business-architecture': 'B', 'information-system-architecture': 'C',
  'technology-architecture': 'D', 'c5isr-architecture': 'E', 'opportunities-solutions': 'F',
  'migration-planning': 'G', 'implementation-governance': 'H', 'architecture-change-management': 'I',
};
function badge(phase) { return letters[phase.id] || ''; }

function selectPhase(id) { selectedId.value = id; scrollToContentOnMobile(); }
function reset() { selectedId.value = null; }
watch(selectedId, scrollToContentOnMobile);
function scrollToContentOnMobile() {
  if (window.matchMedia('(min-width: 901px)').matches) return;
  requestAnimationFrame(() => {
    const el = document.querySelector('.arsi .content');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
</script>

<style scoped>
.arsi {
  --ink: #17213a;
  --ink-soft: #454f6b;
  --muted: #6b7488;
  --gold: #c68a12;
  --gold-soft: #f8ce45;
  --ember: #fa6800;
  --line: #e2e5ea;

  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1.25rem 4rem;
  color: var(--ink);
}

.intro { text-align: center; padding: 0.5rem 0 2rem; }
.brand { margin: 0; }
.brand-btn {
  font: inherit; border: 0; background: none; cursor: pointer; padding: 0;
  color: var(--ink); font-size: clamp(1.6rem, 4.2vw, 2.6rem);
  font-weight: 800; letter-spacing: -0.02em; line-height: 1.08;
}
.brand-btn:hover { color: var(--ember); }

.layout {
  display: grid;
  grid-template-columns: minmax(320px, 430px) minmax(0, 1fr);
  gap: 2.75rem;
  align-items: start;
}

.content { min-width: 0; scroll-margin-top: 1rem; padding-top: 0.35rem; }
.lead { max-width: 70ch; margin: 0; line-height: 1.7; color: var(--muted); font-size: 1.02rem; }
.coming { color: var(--muted); font-size: 1.1rem; padding: 1rem 0; }

.phase-title {
  display: flex; align-items: center; gap: 0.7rem;
  font-size: clamp(1.5rem, 4vw, 2.1rem); letter-spacing: -0.015em; margin: 0 0 1.4rem;
}
.tag {
  flex: none; display: grid; place-items: center; width: 2.1rem; height: 2.1rem;
  border-radius: 50%; background: var(--gold-soft); color: var(--ink); font-size: 1rem; font-weight: 700;
}

.sec { margin: 0 0 2.25rem; }
.sec-title {
  font-size: 1.28rem; margin: 1.6rem 0 0.9rem; letter-spacing: -0.01em;
  padding-bottom: 0.4rem; border-bottom: 2px solid var(--line);
}
.sec-no { color: var(--gold); font-weight: 800; margin-right: 0.4rem; }
.subsec { margin: 1.25rem 0 0 0; padding-left: 1rem; border-left: 3px solid var(--gold-soft); }
.subsec-title { font-size: 1.08rem; margin: 0 0 0.7rem; }
.subsec-title .sec-no { margin-right: 0.5rem; }

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; gap: 1.75rem; }
}
</style>