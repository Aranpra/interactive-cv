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

<script setup>
import SectionTitle from './SectionTitle.vue'
import Education from './userEducation.vue'
import AboutMe from './AboutMe.vue'
</script>

<style scoped>
/* Style spesifik di sini jika ada */
</style>
