<template>
  <div class="hasil">
    <!-- breadcrumb wilayah -->
    <nav class="hasil__bc" aria-label="Wilayah terpilih">
      <span v-for="(b, i) in hasil.breadcrumb" :key="b.kode">
        <span v-if="i > 0" class="hasil__bc-sep" aria-hidden="true">›</span>
        <span :class="['hasil__bc-item', { 'is-last': i === hasil.breadcrumb.length - 1 }]">{{ b.nama }}</span>
      </span>
    </nav>

    <p class="hasil__lead">
      Rantai komando pengawasan untuk
      <strong>{{ namaWilayah }}</strong>.
    </p>

    <div class="hasil__grid">
      <section
        v-for="m in MATRA"
        :key="m"
        class="matra"
        :style="{ '--matra': META[m].warna }"
      >
        <header class="matra__head">
          <span class="matra__tag">{{ m }}</span>
          <h2 class="matra__nama">{{ META[m].label }}</h2>
        </header>

        <template v-if="hasil.matra[m] && hasil.matra[m].length">
          <div v-for="(e, idx) in hasil.matra[m]" :key="idx" class="entri">
            <!-- status + peran -->
            <div class="entri__meta">
              <span :class="['pill', pillClass(e)]">{{ pillLabel(e) }}</span>
              <span v-if="e.peran === 'terkait'" class="entri__peran">satuan terkait</span>
              <span v-if="e.diwarisiDari" class="entri__waris">mewarisi {{ namaLevel(e.diwarisiDari) }}</span>
            </div>

            <!-- N/A -->
            <p v-if="e.na" class="entri__na">
              Tidak ada satuan matra ini untuk wilayah tersebut{{ m === 'AL' ? ' (wilayah pedalaman/tanpa pantai)' : '' }}.
            </p>

            <!-- tangga rantai komando -->
            <ol v-else class="tangga">
              <li
                v-for="(node, ni) in e.rantai"
                :key="node.id"
                :class="['tangga__item', { 'is-leaf': ni === e.rantai.length - 1 }]"
              >
                <span class="tangga__tingkat">{{ node.tingkat }}</span>
                <span class="tangga__nama">{{ node.nama }}</span>
                <span v-if="node.markas" class="tangga__markas">Mako: {{ node.markas }}</span>
              </li>
            </ol>

            <p v-if="e.rantaiTerputus" class="entri__putus">
              Rantai belum lengkap — ada satuan induk yang belum terdata.
            </p>

            <!-- sumber / catatan -->
            <details v-if="e.sumber || e.catatan" class="sumber">
              <summary>Sumber &amp; catatan</summary>
              <p v-if="e.aturan"><span class="sumber__k">Aturan pemetaan:</span> {{ e.aturan }}</p>
              <p v-if="e.catatan"><span class="sumber__k">Catatan:</span> {{ e.catatan }}</p>
              <p v-if="e.sumber"><span class="sumber__k">Sumber:</span> {{ e.sumber }}</p>
            </details>
          </div>
        </template>

        <p v-else class="entri__na">Belum dipetakan.</p>
      </section>
    </div>

    <p v-if="hasil.adaKuning" class="hasil__catatan">
      Beberapa entri berstatus <strong>perlu ditinjau</strong> — lihat sumber tiap kartu untuk verifikasi sebelum dipakai sebagai rujukan resmi.
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  hasil: { type: Object, required: true },
});

const MATRA = ['AD', 'AL', 'AU'];
const META = {
  AD: { label: 'TNI Angkatan Darat', warna: '#2f6e3b' },
  AL: { label: 'TNI Angkatan Laut', warna: '#123a6b' },
  AU: { label: 'TNI Angkatan Udara', warna: '#2f7fb4' },
};

const namaWilayah = computed(() => {
  const bc = props.hasil.breadcrumb;
  return bc.length ? bc[bc.length - 1].nama : props.hasil.kode;
});

function namaLevel(kode) {
  const b = props.hasil.breadcrumb.find((x) => x.kode === kode);
  return b ? b.nama : kode;
}
function pillClass(e) {
  if (e.na) return 'pill--na';
  return e.tingkat_keyakinan === 'tinggi' ? 'pill--ok' : 'pill--tinjau';
}
function pillLabel(e) {
  if (e.na) return 'Tidak ada';
  return e.tingkat_keyakinan === 'tinggi' ? 'Terverifikasi' : 'Perlu ditinjau';
}
</script>

<style scoped>
.hasil { margin-top: 1.5rem; }

.hasil__bc {
  font-size: 0.9rem;
  color: #5a6472;
  margin-bottom: 0.35rem;
}
.hasil__bc-sep { margin: 0 0.4rem; color: #aab2bd; }
.hasil__bc-item.is-last { color: #1e272e; font-weight: 600; }

.hasil__lead { margin: 0 0 1.25rem; color: #3d4653; }
.hasil__lead strong { color: #1e272e; }

.hasil__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  align-items: start;
}
@media (max-width: 880px) {
  .hasil__grid { grid-template-columns: 1fr; }
}

/* kartu matra — dibedakan lewat warna cabang TNI di sisi kiri */
.matra {
  background: #fff;
  border: 1px solid #e4e8ec;
  border-left: 4px solid var(--matra);
  border-radius: 6px;
  padding: 1rem 1.1rem 1.15rem;
}
.matra__head { display: flex; align-items: baseline; gap: 0.6rem; margin-bottom: 0.85rem; }
.matra__tag {
  font-weight: 700; font-size: 0.8rem; letter-spacing: 0.02em;
  color: #fff; background: var(--matra);
  padding: 0.12rem 0.45rem; border-radius: 4px;
}
.matra__nama { margin: 0; font-size: 0.98rem; color: #1e272e; }

.entri + .entri { margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed #e4e8ec; }
.entri__meta { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; margin-bottom: 0.6rem; }

.pill { font-size: 0.72rem; font-weight: 600; padding: 0.14rem 0.5rem; border-radius: 999px; }
.pill--ok { background: #e6f2e9; color: #256b34; }
.pill--tinjau { background: #fbf0d9; color: #8a6316; }
.pill--na { background: #edf0f2; color: #6b7480; }
.entri__peran, .entri__waris { font-size: 0.75rem; color: #7a828d; }
.entri__waris::before { content: '· '; }

.entri__na { margin: 0; color: #6b7480; font-size: 0.9rem; }
.entri__putus { margin: 0.5rem 0 0; font-size: 0.8rem; color: #8a6316; }

/* tangga rantai komando — spine vertikal, leaf ditekankan */
.tangga { list-style: none; margin: 0; padding: 0; position: relative; }
.tangga::before {
  content: ''; position: absolute; left: 5px; top: 6px; bottom: 10px;
  width: 2px; background: var(--matra); opacity: 0.35;
}
.tangga__item { position: relative; padding: 0 0 0.7rem 1.35rem; }
.tangga__item:last-child { padding-bottom: 0; }
.tangga__item::before {
  content: ''; position: absolute; left: 0; top: 4px;
  width: 12px; height: 12px; border-radius: 50%;
  background: #fff; border: 2px solid var(--matra);
}
.tangga__item.is-leaf::before { background: var(--matra); }
.tangga__tingkat {
  display: inline-block; font-size: 0.72rem; color: var(--matra);
  font-weight: 600; margin-right: 0.4rem;
}
.tangga__nama { color: #2f3542; }
.tangga__item.is-leaf .tangga__nama { font-weight: 700; color: #1e272e; }
.tangga__markas { display: block; font-size: 0.76rem; color: #8a929c; margin-top: 0.05rem; }

.sumber { margin-top: 0.7rem; font-size: 0.82rem; }
.sumber summary { cursor: pointer; color: #4b7bec; width: fit-content; }
.sumber summary:focus-visible { outline: 2px solid #4b7bec; outline-offset: 2px; }
.sumber p { margin: 0.4rem 0 0; color: #5a6472; line-height: 1.4; }
.sumber__k { color: #3d4653; font-weight: 600; }

.hasil__catatan {
  margin-top: 1.25rem; padding: 0.7rem 0.9rem;
  background: #fbf0d9; border: 1px solid #efd9a6; border-radius: 6px;
  color: #7a5b12; font-size: 0.88rem;
}
</style>
