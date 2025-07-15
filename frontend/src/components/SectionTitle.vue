<template>
  <div class="mb-12 text-center">
    <h2 class="text-xl md:text-4xl font-bold textColor">{{ title }}</h2>
    <div class="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded animated-underline"></div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  textColor: {
    type: String,
    default: '',
  },
  lineColor: {
    type: String,
    default: '#2563EB',
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

.group:hover .animated-underline::after {
  width: 150%;
}

.animated-underline {
  border-bottom: 1px solid #ccc;
}
</style>
