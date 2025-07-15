<template>
  <section id="skill" class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
      <SectionTitle title="Keahlian & Teknologi" />
      <div class="grid grid-cols-4 gap-2 sm:gap-4 md:gap-8 animate-fade-in">
        <div
          v-for="skill in skills"
          :key="skill.name"
          class="bg-white md:p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 hover:shadow-xl"
        >
          <img
            :src="skill.iconurl"
            :alt="skill.name + ' icon'"
            class="w-8 h-8 md:w-16 md:h-16 mx-auto mb-0 md:mb-4"
          />
          <h3 class="text-xxxs md:text-xs lg:text-xl font-bold text-gray-800 text-center">
            {{ skill.name }}
          </h3>
          <p class="text-xxxs md:text-sm lg:text-xl text-gray-500 mt-1 md:mt-2">{{ skill.level }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SectionTitle from './SectionTitle.vue'

const API_URL = `https://interactive-cv-production-1827.up.railway.app/api/skills`
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
