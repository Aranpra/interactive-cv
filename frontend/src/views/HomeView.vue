<script setup>
import Navbar from '@/components/userNavbar.vue'
import Hero from '@/components/userHero.vue'
import Skills from '@/components/userSkills.vue'
import Projects from '@/components/userProjects.vue'
import Contact from '@/components/userContact.vue'
import AboutEducationSection from '@/components/AboutEducationSection.vue';

</script>
<template>
  <div>
    <Navbar />
    <main>
      <Hero />
      <div v-animate-on-scroll class="group"><AboutEducationSection /></div>
      <!-- <div v-animate-on-scroll><Education /></div> -->
      <div v-animate-on-scroll class="group"><Skills /></div>
      <div v-animate-on-scroll class="group"><Projects /></div>
      <div v-animate-on-scroll class="group"><Contact /></div>
    </main>
  </div>
</template>
