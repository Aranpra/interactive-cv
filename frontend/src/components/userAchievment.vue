<template>
  <section id="achievements" class="py-20 bg-gray-100">
    <div class="container mx-auto px-6">
      <SectionTitle title="Pencapaian & Sertifikasi" />
      <div class="overflow-x-auto whitespace-nowrap py-4 scrollbar-hide">
        <div class="inline-flex space-x-6">
          <div
            v-for="achievement in achievements"
            :key="achievement.id"
            class="flex-shrink-0 w-80 bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img :src="achievement.image" alt="Achievement Image" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="text-xl font-bold text-gray-800 mb-2">{{ achievement.title }}</h3>
              <p class="text-gray-600 text-sm">{{ achievement.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SectionTitle from './SectionTitle.vue';

// HIGHLIGHT START: API URL untuk fetching data achievements
const API_URL = import.meta.env.PROD ? '/api/achievements' : 'http://localhost:3000/api/achievements';
// HIGHLIGHT END

const achievements = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(API_URL);
    achievements.value = response.data;
    console.log('Fetched Achievements Data:', response.data);
  } catch (error) {
    console.error('Gagal mengambil data pencapaian:', error);
  }
});
</script>

<style scoped>
/* Utility class untuk menyembunyikan scrollbar di beberapa browser */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
</style>
