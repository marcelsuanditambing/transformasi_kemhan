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
          <p class="para lead">
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
            <p v-for="(p, i) in selected.intro || []" :key="'intro' + i" class="para">{{ p }}</p>

            <section v-for="sec in selected.sections" :key="sec.no" class="sec">
              <h3 class="sec-title"><span class="sec-no">{{ sec.no }}.</span>{{ sec.title }}</h3>
              <BlockList :blocks="sec.blocks" />

              <section v-for="sub in sec.subsections || []" :key="sub.no" class="subsec">
                <h4 class="subsec-title"><span class="sec-no">{{ sub.no }}</span>{{ sub.title }}</h4>
                <BlockList :blocks="sub.blocks" />
              </section>
            </section>
          </template>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, h } from 'vue';
import TogafWheel from '@/components/TogafWheel.vue';
import { phases } from '@/data/arsitekturFase.js';

// Merender blok berurutan (paragraf, gambar, tabel) sesuai urutan tesis.
const BlockList = {
  props: { blocks: { type: Array, default: () => [] } },
  setup(props) {
    return () =>
      props.blocks.map((b, i) => {
        if (b.t === 'p') return h('p', { class: 'para', key: i }, b.v);
        if (b.t === 'fig')
          return h('figure', { class: 'fig', key: i }, [
            h('img', { src: b.src, alt: b.cap }),
            b.cap ? h('figcaption', b.cap) : null,
          ]);
        if (b.t === 'table') {
          const cols = (b.header || []).length || 1;
          const thead =
            b.header && b.header.length
              ? h('thead', [h('tr', b.header.map((c) => h('th', c)))])
              : null;
          const tbody = h(
            'tbody',
            (b.rows || []).map((row) => {
              if (row.length === 1 && cols > 1)
                return h('tr', { class: 'row-head' }, [h('td', { colspan: cols }, row[0])]);
              return h('tr', row.map((c) => h('td', c)));
            })
          );
          return h('div', { class: 'table-wrap', key: i }, [
            b.title ? h('p', { class: 'table-title' }, b.title) : null,
            h('table', [thead, tbody]),
          ]);
        }
        return null;
      });
  },
};

const selectedId = ref(null);
const selected = computed(() => phases.find((p) => p.id === selectedId.value) || null);

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
  --surface: #ffffff;
  --line: #e2e5ea;
  --mono: ui-monospace, "SFMono-Regular", "SF Mono", Menlo, Consolas, monospace;

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
  grid-template-columns: minmax(320px, 430px) 1fr;
  gap: 2.75rem;
  align-items: start;
}

.content { scroll-margin-top: 1rem; padding-top: 0.35rem; }
.para {
  max-width: 70ch; margin: 0 0 1.05rem; line-height: 1.72;
  color: var(--ink-soft); font-size: 1.02rem; text-align: justify;
}
.lead { color: var(--muted); }
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

.fig { margin: 0.6rem 0 1.4rem; background: transparent; }
.fig :deep(img) { display: block; width: 100%; max-width: 720px; height: auto; margin: 0 auto; }
.fig :deep(figcaption) { margin-top: 0.5rem; text-align: center; font-size: 0.85rem; color: var(--muted); }

.table-wrap { margin: 1.1rem 0 1.5rem; overflow-x: auto; }
.table-title { font-size: 0.9rem; font-weight: 700; color: var(--ink); margin: 0 0 0.5rem; }
.table-wrap :deep(table) {
  width: 100%; border-collapse: collapse; font-size: 0.9rem;
  background: var(--surface); border: 1px solid var(--line); border-radius: 10px; overflow: hidden;
}
.table-wrap :deep(th) {
  text-align: left; background: #f0eee8; color: var(--ink);
  font-weight: 700; padding: 0.6rem 0.8rem; border-bottom: 2px solid var(--line);
}
.table-wrap :deep(td) {
  padding: 0.55rem 0.8rem; border-bottom: 1px solid var(--line);
  color: var(--ink-soft); line-height: 1.5; vertical-align: top;
}
.table-wrap :deep(.row-head td) { background: #faf9f6; font-weight: 700; color: var(--ink); }
.table-wrap :deep(tr:last-child td) { border-bottom: 0; }

@media (max-width: 900px) {
  .layout { grid-template-columns: 1fr; gap: 1.75rem; }
}
</style>