<template>
  <div class="blocks">
    <template v-for="(b, i) in blocks" :key="i">
      <!-- Paragraf -->
      <p v-if="b.t === 'p'" class="para">{{ b.v }}</p>

      <!-- Gambar -->
      <figure v-else-if="b.t === 'fig'" class="fig">
        <img :src="b.src" :alt="b.cap" />
        <figcaption v-if="b.cap">{{ b.cap }}</figcaption>
      </figure>

      <!-- Tabel -->
      <div v-else-if="b.t === 'table'" class="table-wrap">
        <p v-if="b.title" class="table-title">{{ b.title }}</p>
        <table>
          <thead v-if="b.header && b.header.length">
            <tr><th v-for="(c, j) in b.header" :key="j">{{ c }}</th></tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, r) in b.rows"
              :key="r"
              :class="{ 'row-head': row.length === 1 && cols(b) > 1 }"
            >
              <td v-if="row.length === 1 && cols(b) > 1" :colspan="cols(b)">{{ row[0] }}</td>
              <template v-else>
                <td v-for="(c, k) in row" :key="k">{{ c }}</td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script setup>
defineProps({ blocks: { type: Array, default: () => [] } });
function cols(b) { return (b.header && b.header.length) || 1; }
</script>

<style scoped>
.para {
  max-width: 70ch;
  margin: 0 0 1.05rem;
  line-height: 1.72;
  color: #454f6b;
  font-size: 1.02rem;
  text-align: justify;
  overflow-wrap: break-word;
}

.fig { margin: 0.6rem 0 1.4rem; background: transparent; }
.fig img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}
.fig figcaption {
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: #6b7488;
}

.table-wrap { margin: 1.1rem 0 1.5rem; max-width: 100%; overflow-x: auto; }
.table-title { font-size: 0.9rem; font-weight: 700; color: #17213a; margin: 0 0 0.5rem; }
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
  background: #ffffff;
  border: 1px solid #e2e5ea;
  border-radius: 10px;
  overflow: hidden;
}
th {
  text-align: left;
  background: #f0eee8;
  color: #17213a;
  font-weight: 700;
  padding: 0.6rem 0.8rem;
  border-bottom: 2px solid #e2e5ea;
}
td {
  padding: 0.55rem 0.8rem;
  border-bottom: 1px solid #e2e5ea;
  color: #454f6b;
  line-height: 1.5;
  vertical-align: top;
  overflow-wrap: break-word;
}
.row-head td { background: #faf9f6; font-weight: 700; color: #17213a; }
tr:last-child td { border-bottom: 0; }
</style>