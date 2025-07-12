<template>
  <div class="mb-12 text-center">
    <h2 class="text-4xl font-bold textColor">{{ title }}</h2>
    <div class="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded animated-underline"></div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  textColor: {
    type: String,
    default: '', // Default warna teks gelap
  },
  lineColor: {
    // HIGHLIGHT: Tambahkan prop untuk warna garis
    type: String,
    default: '#2563EB', // Default blue-600
  },
})
</script>

<style scoped>
.animated-underline {
  position: relative;
  width: 300px;
  height: 4px;
  background-color: transparent;
  overflow: hidden;
  border-radius: 9999px;
}

.animated-underline::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  width: 0;
  height: 4px;
  background-color: #2563eb;
  transition: width 0.7s ease-out;
  border-radius: 9999px;
}

/* HIGHLIGHT START: Ubah selektor CSS untuk hover */
/* Sekarang, garis akan memanjang ketika *parent* dengan kelas 'group' di-hover */
.group:hover .animated-underline::after {
  width: 150%;
}

.animated-underline {
  border-bottom: 1px solid #ccc;
}
</style>
