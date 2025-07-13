<template>
  <section id="skill" class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
      <SectionTitle title="Keahlian & Teknologi" />
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl"
        >
          <h3 class="text-xl font-bold text-gray-800">{{ skill.name }}</h3>
          <p class="text-gray-500 mt-2">{{ skill.level }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SectionTitle from './SectionTitle.vue'
const API_URL = `https://interactive-cv-production-1827.up.railway.app/api/skills`;
const skills = ref([])
onMounted(async () => {
  try {
    const response = await axios.get(API_URL)
    skills.value = response.data
    console.log('Fetched Skills Data:', response.data)
  } catch (error) {
    console.error('Gagal mengambil data skill:', error)
  }
})
</script>

<style scoped>
/* Style spesifik di sini jika ada */
</style>
