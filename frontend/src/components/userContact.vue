<template>
  <footer id="kontak" class="py-20 bg-gray-800">
    <div class="container mx-auto px-6 text-center">
      <SectionTitle title="Kontak" textColor="#ffffff"/>
      <p class="text-xl text-gray-300 mb-8">Jangan ragu untuk terhubung atau bertanya.</p>
      <a
        href="aryaandreanpratama@students.amikom.ac.id"
        class="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 inline-block mb-12"
      >
        Kirim Email
      </a>
      <div class="flex justify-center space-x-6 mb-8">
        <a
          href="https://github.com/Aranpra"
          target="_blank"
          class="text-gray-400 hover:text-white transition-colors duration-300"
          >GitHub</a
        >
        <a
          href="https://www.linkedin.com/in/arya-andrean-pratama-b486b5288?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          class="text-gray-400 hover:text-white transition-colors duration-300"
          >LinkedIn</a
        >
      </div>
      <p class="text-gray-500">
        &copy; {{ new Date().getFullYear() }} Arya Andrean Pratama
      </p>
    </div>
  </footer>
</template>

<script setup>
import SectionTitle from './SectionTitle.vue'
</script>

<style scoped>
/* Style spesifik di sini jika ada */
</style>
