<template>
  <div>
    <!-- <Loader :loading="isLoading" /> <Navbar /> -->
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
import Achievement from '@/components/userAchievment.vue'
// import Loader from '@/components/webLoader.vue' // Pastikan ini diimpor jika digunakan
// import { ref, onMounted } from 'vue' // Untuk isLoading
// HIGHLIGHT END

// const isLoading = ref(true)

// const loadAllData = async () => {
//   console.log('Loader: Memulai proses loading data...') // HIGHLIGHT: Log awal loading
//   isLoading.value = true

//   try {
//     // --- Simulasi Loading (gunakan ini jika Anda belum ingin menunggu API) ---
//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     // --- END Simulasi Loading ---

//     // HIGHLIGHT START: Tambahkan log untuk setiap fetch API di komponen child
//     // Ini penting jika Anda ingin HomeView menunggu semua data dimuat
//     // Tapi karena komponen child fetch sendiri, kita tidak perlu await di sini
//     // Cukup pastikan console.log dari komponen child muncul
//     console.log('Loader: Simulasi loading selesai atau API calls dimulai di komponen child.')
//     // HIGHLIGHT END
//   } catch (error) {
//     console.error('Loader: Terjadi error saat memuat data:', error) // HIGHLIGHT: Log error jika terjadi
//     // Jika terjadi error, kita tetap ingin loader menghilang
//   } finally {
//     isLoading.value = false // HIGHLIGHT: Pastikan ini selalu tereksekusi
//     console.log('Loader: isLoading disetel ke false, loader akan berhenti.') // HIGHLIGHT: Log loader berhenti
//   }
// }

// onMounted(() => {
//   loadAllData()
// })
</script>

<style scoped>
/* Pastikan tidak ada karakter aneh di sini */
</style>
