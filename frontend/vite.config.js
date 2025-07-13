import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  server: {
    proxy: {
      // Semua permintaan yang dimulai dengan '/api'
      '/api': {
        // Akan diteruskan ke server backend-mu
        target: 'http://localhost:3000',
        // Mengubah origin header agar sesuai dengan target
        changeOrigin: true,
        // Jangan menulis ulang path, biarkan '/api/skills' tetap '/api/skills'
        // rewrite: (path) => path.replace(/^\/api/, '') // Baris ini TIDAK diperlukan untuk kasusmu
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
