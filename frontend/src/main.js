// src/main.js
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import animateOnScroll from './directives/animateOnScroll' // <-- Impor
const app = createApp(App)
import VueScrollTo from 'vue-scrollto'
// HIGHLIGHT END


app.use(VueScrollTo, {
  duration: 500,
  easing: 'ease-in-out',
})
app.directive('animate-on-scroll', animateOnScroll) // <-- Daftarkan
app.use(router)
app.mount('#app')

