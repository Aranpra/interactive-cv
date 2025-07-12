<template>
  <header
    :class="[
      'bg-white shadow-md sticky top-0 z-50 transition-transform duration-300 ease-in-out',
      {
        'transform -translate-y-full opacity-0': hideNavbar,
        'transform translate-y-0 opacity-100': showNavbar,
      },
    ]"
    class="animate-fade-in bg-primary-dark"
  >
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="text-2xl font-bold text-gray-800">Arya Andrean Pratama</div>
      <ul class="flex space-x-6">
        <li>
          <a
            href="#profil"
            class="text-gray-600 hover:text-light-blue transform hover:-translate-y-0.5 transition-all duration-300"
            >Profil</a
          >
        </li>
        <li>
          <a
            href="#achievements"
            class="text-gray-600 hover:text-light-blue transform hover:-translate-y-0.5 transition-all duration-300"
            >Pencapaian</a
          >
        </li>
        <li>
          <a
            href="#pendidikan-dan-tentangsaya"
            class="text-gray-600 hover:text-light-blue transform hover:-translate-y-0.5 transition-all duration-300"
            >Pendidikan</a
          >
        </li>
        <li>
          <a
            href="#skill"
            class="text-gray-600 hover:text-light-blue transform hover:-translate-y-0.5 transition-all duration-300"
            >Skill</a
          >
        </li>
        <li>
          <a
            href="#proyek"
            class="text-gray-600 hover:text-light-blue transform hover:-translate-y-0.5 transition-all duration-300"
            >Proyek</a
          >
        </li>
        <li>
          <a
            href="#kontak"
            class="text-gray-600 hover:text-light-blue transform hover:-translate-y-0.5 transition-all duration-300"
            >Kontak</a
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const hideNavbar = ref(false)
const showNavbar = ref(true)
let lastScrollY = 0
const scrollThreshold = 50
const handleScroll = () => {
  const currentScrollY = window.scrollY
  if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
    hideNavbar.value = true
    showNavbar.value = false
  } else if (currentScrollY < lastScrollY || currentScrollY <= scrollThreshold) {
    hideNavbar.value = false
    showNavbar.value = true
  }
  lastScrollY = currentScrollY
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Style spesifik di sini jika ada */
</style>
