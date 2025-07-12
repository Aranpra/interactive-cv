<!-- <template>
  <div class="loader-overlay" v-if="loading">
    <div class="loader-spinner"></div>
    <p class="loader-text">Memuat Data...</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  loading: {
    type: Boolean,
    required: true
  }
});
</script>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s ease;
}

.loader-spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
  margin-bottom: 15px;
}

.loader-text {
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> -->
