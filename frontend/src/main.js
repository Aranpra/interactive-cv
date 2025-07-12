// src/main.js
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import animateOnScroll from './directives/animateOnScroll' // <-- Impor
const app = createApp(App)
import VueScrollTo from 'vue-scrollto'
// HIGHLIGHT START: Impor tsparticles-slim dan vue3-particles plugin dengan cara standar
import { loadSlim } from 'tsparticles-slim'; // Pastikan sudah npm install tsparticles-slim
import Particles from 'vue3-particles'; // HIGHLIGHT: Impor default dari 'vue3-particles'
// HIGHLIGHT END

// HIGHLIGHT START: Cara mendaftarkan vue3-particles plugin yang benar
app.use(Particles, { // Gunakan 'Particles' (default import)
    init: async engine => {
        await loadSlim(engine); // Pastikan loadSlim dipanggil
    }
});

app.use(VueScrollTo, {
  duration: 500,
  easing: 'ease-in-out',
})
app.directive('animate-on-scroll', animateOnScroll) // <-- Daftarkan
app.use(router)
app.mount('#app')

