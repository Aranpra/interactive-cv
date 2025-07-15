<template>
  <div class="p-5 bg-gray-50 rounded-lg shadow-lg h-full flex flex-col animate-slide-in-right">
    <h3
      class="text-lg md:text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2 animate-fade-in duration-1000"
    >
      Tentang Saya
    </h3>
    <div
      v-for="(about, index) in aboutme"
      :key="index"
      v-animate-on-scroll
      class="mb-8 transition-all duration-700 opacity-0"
    >
      <p class=" text-xs md:text-base text-gray-700 leading-relaxed text-justify mb-4">
        {{ about.content }}
      </p>
      <div class="mt-6">
        <h4 class="text-xl font-semibold text-gray-800 mb-3 animate-fade-in duration-700">
          Minat & Hobi
        </h4>
        <ul class="text-xs md:text-base list-disc list-inside text-gray-600 animate-fade-in duration-700">
          <li v-for="(hobby, i) in about.interests" :key="i">{{ hobby }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const aboutme = ref([])
onMounted(async () => {
  try {
    const response = await axios.get(
      'https://interactive-cv-production-1827.up.railway.app/api/aboutme',
    )
    aboutme.value = response.data
    console.log('Fetched AboutMe Data:', response.data)
  } catch (error) {
    console.error('Gagal mengambil data Tentang sasya:', error)
  }
})
</script>

<style scoped>
/* Style spesifik di sini jika ada */
</style>
