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

const achievements = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("https://interactive-cv-production-1827.up.railway.app/api/achievements");
    console.log(response)
    achievements.value = response.data;
    console.log('Fetched Achievements Data:', response.data);
  } catch (error) {
    console.error('Gagal mengambil data pencapaian:', error);
  }
});
</script>
