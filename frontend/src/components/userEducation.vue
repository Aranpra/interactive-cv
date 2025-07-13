<template>
  <div class="p-8 bg-gray-50 rounded-lg shadow-lg h-full flex flex-col animate-slide-in-left">
    <section id="pendidikan" class="bg-gray-50">
      <div class="container mx-auto px-6">
        <h3
          class="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2 animate-fade-in"
        >
          Pendidikan
        </h3>
        <div class="relative">
          <div class="absolute h-full border-r-2 border-gray-300" style="left: 50%"></div>
          <div
            v-for="(edu, index) in educationHistory"
            :key="edu.id"
            v-animate-on-scroll
            class="mb-8 flex justify-between transition-all duration-700 opacity-0"
            :style="{ 'transition-delay': index * 200 + 'ms' }"
          >
            <div v-if="index % 2 === 0" class="w-full flex">
              <div class="w-1/2 pr-8 text-right">
                <p class="font-semibold text-blue-600">{{ edu.period }}</p>
                <h3 class="text-2xl font-bold text-gray-800">{{ edu.institution }}</h3>
                <p class="text-gray-600">{{ edu.major }}</p>
              </div>
              <div class="w-1/2 flex justify-start">
                <div
                  class="w-4 h-4 bg-blue-600 rounded-full z-10 justify-center text-white text-sm font-bold relative -left-2 animate-bounce"
                ></div>
              </div>
            </div>
            <div v-else class="w-full flex">
              <div class="w-1/2 flex justify-end">
                <div
                  class="w-4 h-4 bg-blue-600 rounded-full z-10 justify-center text-white text-sm font-bold relative -right-2"
                ></div>
              </div>
              <div class="w-1/2 pl-8 text-left">
                <p class="font-semibold text-blue-600">{{ edu.period }}</p>
                <h3 class="text-2xl font-bold text-gray-800">{{ edu.institution }}</h3>
                <p class="text-gray-600">{{ edu.major }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
const educationHistory = ref([])
onMounted(async () => {
  try {
    const response = await axios.get(VITE_API_URL+"/api/education")
    educationHistory.value = response.data
    console.log('Fetched Education Data:', response.data)
  } catch (error) {
    console.error('Gagal mengambil data pendidikan:', error)
  }
})
</script>

<style scoped>
/* Style spesifik di sini jika ada */
</style>
