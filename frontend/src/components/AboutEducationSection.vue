<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
// HIGHLIGHT START: Definisi data educationHistory dipindahkan ke sini
const educationHistory = ref([])
import SectionTitle from './SectionTitle.vue'
// HIGHLIGHT START: Impor Education dan AboutMe
import Education from './userEducation.vue'
import AboutMe from './AboutMe.vue'
// HIGHLIGHT END: Impor Education dan AboutMe

const fetchEducationHistory = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/education')
    educationHistory.value = response.data
  } catch (error) {
    console.error('Error fetching education history:', error)
  }
}

onMounted(() => {
  fetchEducationHistory()
})
// HIGHLIGHT END: Definisi data educationHistory dipindahkan ke sini
</script>

<template>
  <section id="pendidikan-dan-tentangsaya" class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <SectionTitle title="Pendidikan & Tentang Saya" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div
          class="p-4 rounded-lg bg-white shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 ease-in-out"
        >
          <Education />
        </div>

        <div
          class="p-4 rounded-lg bg-white shadow-md border border-gray-200 hover:shadow-lg hover:border-blue-200 hover:bg-blue-50 transition-all duration-300 ease-in-out"
        >
          <AboutMe />
        </div>
      </div>
    </div>
  </section>
</template>
