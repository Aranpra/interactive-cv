<template>
  <header
    :class="[
      'bg-white shadow-md sticky top-0 z-50 transition-transform duration-300 ease-in-out',
      {
        'transform -translate-y-full opacity-0': hideNavbar,
        'transform translate-y-0 opacity-100': showNavbar,
      },
    ]"
  >
    <nav
      class="container mx-auto px-6 py-4 flex justify-between items-center animate-slide-in-left"
    >
      <div class="text-l font-bold text-gray-800">Arya Andrean Pratama</div>

      <div class="md:hidden animate-slide-in-left">
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Buka menu">
          <div class="flex flex-col justify-between w-6 h-4 transform transition-all duration-300">
            <span
              class="block h-0.5 w-full bg-gray-800 rounded-full transform transition-all duration-300"
              :class="{ 'rotate-45 translate-y-2': isMobileMenuOpen }"
            ></span>
            <span
              class="block h-0.5 w-full bg-gray-800 rounded-full transition-all duration-300"
              :class="{ 'opacity-0': isMobileMenuOpen }"
            ></span>
            <span
              class="block h-0.5 w-full bg-gray-800 rounded-full transform transition-all duration-300"
              :class="{ '-rotate-45 -translate-y-2': isMobileMenuOpen }"
            ></span>
          </div>
        </button>
      </div>

      <ul class="hidden md:flex space-x-6">
        <li><a href="#profil" class="nav-link">Profil</a></li>
        <li><a href="#achievements" class="nav-link">Pencapaian</a></li>
        <li><a href="#pendidikan-dan-tentangsaya" class="nav-link">Pendidikan</a></li>
        <li><a href="#skill" class="nav-link">Skill</a></li>
        <li><a href="#proyek" class="nav-link">Proyek</a></li>
        <li><a href="#kontak" class="nav-link">Kontak</a></li>
      </ul>
    </nav>
    <transition name="dropdown">
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-white shadow-lg absolute top-full right-3 mt-2 w-48 bg-white/90 background-blur-md border border-gray-200 rounded-lg"
      >
        <ul class="flex flex-col items-center py-4 hover:bg-blue">
          <li class="w-full text-center">
            <a href="#profil" @click="isMobileMenuOpen = false" class="nav-link-mobile">Profil</a>
          </li>
          <li class="w-full text-center">
            <a href="#achievements" @click="isMobileMenuOpen = false" class="nav-link-mobile"
              >Pencapaian</a
            >
          </li>
          <li class="w-full text-center">
            <a
              href="#pendidikan-dan-tentangsaya"
              @click="isMobileMenuOpen = false"
              class="nav-link-mobile"
              >Pendidikan</a
            >
          </li>
          <li class="w-full text-center">
            <a href="#skill" @click="isMobileMenuOpen = false" class="nav-link-mobile">Skill</a>
          </li>
          <li class="w-full text-center">
            <a href="#proyek" @click="isMobileMenuOpen = false" class="nav-link-mobile">Proyek</a>
          </li>
          <li class="w-full text-center">
            <a href="#kontak" @click="isMobileMenuOpen = false" class="nav-link-mobile">Kontak</a>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// State baru untuk mengontrol menu mobile
const isMobileMenuOpen = ref(false)

const hideNavbar = ref(false)
const showNavbar = ref(true)
let lastScrollY = 0
const scrollThreshold = 50

const handleScroll = () => {
  if (isMobileMenuOpen.value) {
    return
  }

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
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease-in-out;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
.nav-link {
  @apply text-gray-600 hover:text-blue-600 transform hover:-translate-y-0.5 transition-all duration-300;
}

.nav-link-mobile {
  @apply block w-full py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200;
}
</style>
