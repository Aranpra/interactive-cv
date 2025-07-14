<template>
  <section id="profil" class="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
    <div class="md:w-1/2 mb-10 md:mb-0">
      <h1
        class="text-4xl font-bold text-gray-800 mb-4 animate-slide-in-left"
        style="animation-delay: 200ms"
      >
        Halo, Saya<br />
        <span class="text-accent-blue">Arya Andrean Pratama<br /></span>
        <span id="typed" class="text-blue-400"></span>
      </h1>
      <p class="text-l text-gray-600 mb-8 animate-slide-in-left" style="animation-delay: 400ms">
        Mahasiswa Teknik Informatika yang bersemangat dalam pengembangan web dan desain antarmuka.
      </p>
      <a
        href="#kontak"
        class="bg-primary-dark text-white font-bold py-3 px-6 rounded-lg hover:bg-accent-blue transition-colors inline-block animate-pop-in"
      >
        Hubungi Saya
      </a>
    </div>
    <div
      class="md:w-1/2 flex flex-col items-center justify-center  animate-fade-in duration-2000"
    >

      <div
        class="relative group w-80 h-80 rounded-full overflow-hidden shadow-xl border-4 border-accent-blue ring-8 ring-light-blue"
        @mouseenter="showOverlay = true"
        @mouseleave="showOverlay = false"
      > <img src="./public/Arya_24.11.5739.jpg" alt="Foto Profil" class="w-80 h-80 rounded-full object-cover shadow-lg"> </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import 'vue-advanced-cropper/dist/style.css'
import Typed from 'typed.js'

onMounted(() => {
  new Typed('#typed', {
    strings: ['Web Developer', 'UI/UX Designer', 'Informatics Student', 'Gamer', 'Singer'],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true,
  })
})

</script>

<style>
/* Style tetap ada di sini */
</style>
