// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#5409DA', // Biru Keunguan (paling gelap)
        'accent-blue': '#4E71FF', // Biru Cerah
        'light-blue': '#8DD8FF', // Biru Muda
        'lightest-blue': '#BBFBFF', // Biru Sangat Muda/Aqua
        'custom-gray': '#F8F8F8',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        sans: ['Poppins', 'Roboto', 'Montserrat', 'sans-serif'],
      },

      keyframes: {
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pop-in': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '80%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)' },
        }, // Animasi baru: membesar sedikit lalu kembali normal
        'swing-in-top': {
          '0%': { transform: 'rotateX(-90deg)', opacity: '0', 'transform-origin': 'top center' },
          '100%': { transform: 'rotateX(0deg)', opacity: '1', 'transform-origin': 'top center' },
        }, // Animasi baru: seperti pintu berayun dari atas
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.7s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.7s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'pop-in': 'pop-in 0.6s ease-out forwards', // Panggil animasi baru
        'swing-in-top': 'swing-in-top 0.8s ease-out forwards', // Panggil animasi baru
      },
      
    },
  },
  plugins: [],
}
