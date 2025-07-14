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
    <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="text-2xl font-bold text-gray-800">Arya Andrean Pratama</div>

      <div class="md:hidden">
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Buka menu">
          <svg
            class="w-6 h-6 text-gray-800"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
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

    <div v-if="isMobileMenuOpen" class="md:hidden bg-white shadow-lg">
      <ul class="flex flex-col items-center py-4">
        <li class="w-full text-center">
          <a href="#profil" @click="isMobileMenuOpen = false" class="nav-link-mobile">Profil</a>
        </li>
        <li class="w-full text-center">
          <a href="#achievements" @click="isMobileMenuOpen = false" class="nav-link-mobile">Pencapaian</a>
        </li>
        <li class="w-full text-center">
          <a href="#pendidikan-dan-tentangsaya" @click="isMobileMenuOpen = false" class="nav-link-mobile">Pendidikan</a>
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
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// State baru untuk mengontrol menu mobile
const isMobileMenuOpen = ref(false);

const hideNavbar = ref(false);
const showNavbar = ref(true);
let lastScrollY = 0;
const scrollThreshold = 50;

const handleScroll = () => {
  if (isMobileMenuOpen.value) {
    return;
  }
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
    hideNavbar.value = true;
    showNavbar.value = false;
  } else if (currentScrollY < lastScrollY || currentScrollY <= scrollThreshold) {
    hideNavbar.value = false;
    showNavbar.value = true;
  }
  lastScrollY = currentScrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Tambahkan style ini untuk link navigasi agar lebih rapi */
.nav-link {
  @apply text-gray-600 hover:text-blue-600 transform hover:-translate-y-0.5 transition-all duration-300;
}

.nav-link-mobile {
  @apply block w-full py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200;
}
</style>
