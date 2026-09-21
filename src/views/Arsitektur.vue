<template>
  <section class="arsi">
    <header class="intro">
      <h1 class="brand">
        <button type="button" class="brand-btn" @click="reset">Arsitektur Transformasi Digital Kemhan</button>
      </h1>
    </header>

    <p v-if="loadErr" class="state state--error">
      Gagal memuat data. Coba muat ulang halaman, atau login kembali bila sesi berakhir.
    </p>
    <p v-else-if="!loaded" class="state">Memuat data arsitektur…</p>

    <div v-else class="layout">
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

            <PhaseBlocks v-if="(selected.sharedBlocks || []).length" :blocks="selected.sharedBlocks" />

            <div v-if="selected.subDomains" class="subchoice">
              <button
                v-for="s in selected.subDomains"
                :key="s.id"
                type="button"
                class="subcard"
                :class="{ active: s.id === selectedSubId }"
                :aria-pressed="s.id === selectedSubId"
                @click="toggleSub(s.id)"
              >
                <span class="subcard-title">{{ s.title }}</span>
                <span class="subcard-go">{{ s.id === selectedSubId ? 'Sedang dibaca' : 'Baca →' }}</span>
              </button>
            </div>

            <PhaseBlocks v-if="activeSub && (activeSub.intro || []).length" :blocks="subIntroBlocks" />

            <section v-for="sec in renderSections" :key="'s-' + sec.no + sec.title" class="sec">
              <h3 class="sec-title"><span v-if="sec.no" class="sec-no">{{ sec.no }}.</span>{{ sec.title }}</h3>
              <PhaseBlocks :blocks="sec.blocks" />

              <section v-for="sub in sec.subsections || []" :key="sub.no" class="subsec">
                <h4 class="subsec-title"><span class="sec-no">{{ sub.no }}</span>{{ sub.title }}</h4>
                <PhaseBlocks :blocks="sub.blocks" />
              </section>
            </section>

            <template v-if="showTrailing">
              <section v-for="sec in selected.trailingSections || []" :key="'t-' + sec.title" class="sec">
                <h3 class="sec-title"><span v-if="sec.no" class="sec-no">{{ sec.no }}.</span>{{ sec.title }}</h3>
                <PhaseBlocks :blocks="sec.blocks" />
              </section>
            </template>
          </template>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import TogafWheel from '@/components/TogafWheel.vue';
import PhaseBlocks from '@/components/PhaseBlocks.vue';

// Data Bab IV diambil dari API ber-gate (tidak lagi di-bundle).
const phases = ref([]);
const loaded = ref(false);
const loadErr = ref(false);

onMounted(async () => {
  try {
    const r = await fetch('/api/arsitektur', { credentials: 'same-origin' });
    if (!r.ok) throw new Error('gagal');
    phases.value = await r.json();
    loaded.value = true;
  } catch {
    loadErr.value = true;
  }
});

const selectedId = ref(null);
const selectedSubId = ref(null);

const selected = computed(() => phases.value.find((p) => p.id === selectedId.value) || null);

const introBlocks = computed(() =>
  ((selected.value && selected.value.intro) || []).map((v) => ({ t: 'p', v }))
);

const activeSub = computed(() => {
  if (!selected.value || !selected.value.subDomains) return null;
  return selected.value.subDomains.find((s) => s.id === selectedSubId.value) || null;
});
const subIntroBlocks = computed(() =>
  ((activeSub.value && activeSub.value.intro) || []).map((v) => ({ t: 'p', v }))
);

const renderSections = computed(() => {
  const p = selected.value;
  if (!p) return [];
  if (p.subDomains) return activeSub.value ? activeSub.value.sections : [];
  return p.sections || [];
});

const showTrailing = computed(() => {
  const p = selected.value;
  if (!p || !(p.trailingSections && p.trailingSections.length)) return false;
  if (p.subDomains) return !!activeSub.value;
  return true;
});

const letters = {
  'architecture-vision': 'A', 'business-architecture': 'B', 'information-system-architecture': 'C',
  'technology-architecture': 'D', 'c5isr-architecture': 'E', 'opportunities-solutions': 'F',
  'migration-planning': 'G', 'implementation-governance': 'H', 'architecture-change-management': 'I',
};
function badge(phase) { return letters[phase.id] || ''; }

function toggleSub(id) {
  selectedSubId.value = selectedSubId.value === id ? null : id;
  scrollToContentOnMobile();
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
watch(selectedId, scrollToContentOnMobile);
function scrollToContentOnMobile() {
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

.state { text-align: center; color: var(--muted); padding: 2rem 0; font-size: 1.02rem; }
.state--error { color: #b23b3b; }

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

.subchoice {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  max-width: 70ch;
  margin: 1.5rem 0 0.5rem;
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
.subcard.active {
  border-color: var(--ember);
  box-shadow: 0 0 0 1px var(--ember);
  background: #fff7f1;
}
.subcard.active .subcard-go { color: var(--ember); }
.subcard-title { font-size: 1.1rem; font-weight: 700; color: var(--ink); }
.subcard-go { font-size: 0.85rem; color: var(--ember); font-weight: 600; }

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
  .subchoice { grid-template-columns: 1fr; }
}
</style>