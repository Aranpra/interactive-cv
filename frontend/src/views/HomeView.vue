<template>
  <div>
    <Navbar />
    <main>
      <Hero />
      <div v-animate-on-scroll class="group"><AboutEducationSection /></div>
      <div v-animate-on-scroll class="group"><Achievement /></div>
      <div v-animate-on-scroll class="group"><Skills /></div>
      <div v-animate-on-scroll class="group"><Projects /></div>
      <div v-animate-on-scroll class="group"><Contact /></div>
    </main>
  </div>
</template>

<script setup>
// HIGHLIGHT START: Perbaiki semua import
import Navbar from '@/components/userNavbar.vue'
import Hero from '@/components/userHero.vue'
import Skills from '@/components/userSkills.vue'
import Projects from '@/components/userProjects.vue'
import Contact from '@/components/userContact.vue'
import AboutEducationSection from '@/components/AboutEducationSection.vue'
import Achievement from '@/components/userAchievement.vue'
// HIGHLIGHT END
</script>

<style scoped>
/* Pastikan tidak ada karakter aneh di sini */
</style>
