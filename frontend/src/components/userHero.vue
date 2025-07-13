<template>
  <section id="profil" class="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
    <div class="md:w-1/2 mb-10 md:mb-0">
      <h1
        class="text-5xl font-bold text-gray-800 mb-4 animate-slide-in-left"
        style="animation-delay: 200ms"
      >
        Halo, Saya<br />
        <span class="text-accent-blue">Arya Andrean Pratama<br /></span>
        <span id="typed" class="text-blue-400"></span>
      </h1>
      <p class="text-xl text-gray-600 mb-8 animate-slide-in-left" style="animation-delay: 400ms">
        Mahasiswa Teknik Informatika yang bersemangat dalam pengembangan web dan desain antarmuka.
      </p>
      <a
        href="#kontak"
        class="bg-primary-dark text-white font-bold py-3 px-6 rounded-lg hover:bg-accent-blue transition-colors duration-300 inline-block animate-pop-in"
        style="animation-delay: 600ms"
      >
        Hubungi Saya
      </a>
    </div>
    <div
      class="md:w-1/2 flex flex-col items-center justify-center animate-fade-in"
      style="animation-delay: 500ms"
    >
      <div
        class="relative group w-80 h-80 rounded-full overflow-hidden shadow-xl border-4 border-accent-blue ring-8 ring-light-blue"
        style="animation-delay: 700ms"
        @mouseenter="showOverlay = true"
        @mouseleave="showOverlay = false"
      >
        <img :src="profileImageUrl" alt="Foto Profil" class="w-full h-full object-cover" />

        <div
          v-if="showOverlay"
          class="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-center rounded-full p-4 transition-opacity duration-300"
        >
          <button
            @click="$refs.fileInput.click()"
            class="bg-primary-dark text-white font-semibold py-2 px-4 rounded-md hover:bg-accent-blue transition-colors duration-200 mb-2"
          >
            Upload
          </button>
          <button
            @click="showFullscreen = true"
            class="bg-gray-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            Lihat Gambar
          </button>
        </div>
      </div>
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        class="hidden"
        @change="handleFileSelect"
      />
    </div>
  </section>

  <div
    v-if="showFullscreen"
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 flex justify-center items-center"
    @click.self="showFullscreen = false"
  >
    <img
      :src="profileImageUrl"
      alt="Foto Profil Fullscreen"
      class="max-w-full max-h-full object-contain"
    />
    <button
      @click="showFullscreen = false"
      class="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 focus:outline-none"
    >
      &times;
    </button>
  </div>
  <div
    v-if="showCropperModal"
    class="fixed inset-0 bg-black bg-opacity-90 z-[60] flex flex-col justify-center items-center p-4"
  >
    <div class="bg-white rounded-lg p-6 max-w-2xl w-full h-3/4 flex flex-col">
      <h3 class="text-2xl font-bold text-gray-800 mb-4 text-center">Sesuaikan Foto Profilmu</h3>
      <div class="flex-grow w-full relative">
        <Cropper
          ref="cropperRef"
          :src="selectedImageSrc"
          :stencil-props="{
            handlers: {},
            movable: true,
            resizable: true,
            aspectRatio: 1,
            grid: true,
            lines: {}, // HIGHLIGHT: Ubah true menjadi {}
          }"
          :resize-image="{
            adjustStencil: false,
          }"
          :stencil-component="CircleStencil"
          image-restriction="stencil"
          class="cropper-custom"
        />
        <div class="absolute inset-0 pointer-events-none">
          <div class="grid grid-cols-3 grid-rows-3 w-full h-full">
            <div class="border border-white border-opacity-40"></div>
            <div class="border border-white border-opacity-40"></div>
            <div class="border border-white border-opacity-40"></div>
            <div class="border border-white border-opacity-40"></div>
            <div class="border border-white border-opacity-40"></div>
            <div class="border border-white border-opacity-40"></div>
            <div class="border border-white border-opacity-40"></div>
            <div class="border border-white border-opacity-40"></div>
            <div class="border border-white border-opacity-40"></div>
          </div>
        </div>
      </div>
      <div class="mt-6 flex justify-center space-x-4">
        <button
          @click="cropAndUpload"
          class="bg-primary-dark text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
        >
          Simpan & Upload
        </button>
        <button
          @click="((showCropperModal = false), (selectedImageSrc = null))"
          class="bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300"
        >
          Batal
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import Typed from 'typed.js'

onMounted(() => {
  new Typed('#typed', {
    strings: ['Web Developer', 'UI/UX Designer', 'Informatics Student', 'Gamer', 'Singer'],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true,
  })
})

// HIGHLIGHT START: API Endpoint untuk mengambil/mengupload gambar profil
// HIGHLIGHT END

const profileImageUrl = ref('')
const fileInput = ref(null)
const showOverlay = ref(false)
const showFullscreen = ref(false)

const showCropperModal = ref(false)
const selectedImageSrc = ref(null)
const cropperRef = ref(null)

const fetchProfileImage = async () => {
  try {
    const response = await axios.get(process.env.VITE_API_URL+"/api/profile-photo")
    if (response.data.imageUrl) {
      // HIGHLIGHT START: Logika untuk setting profileImageUrl
      if (import.meta.env.PROD) {
        // Di produksi (Vercel), URL dari backend sudah relatif dan benar
        profileImageUrl.value = response.data.imageUrl
      } else {
        // Di lokal, kita perlu URL absolut ke backend (port 3000)
        profileImageUrl.value = `${process.env.VITE_API_URL}${response.data.imageUrl}`
      }
      // HIGHLIGHT END
    } else {
      // Fallback jika API tidak memberikan URL, gunakan default kondisional
      profileImageUrl.value = `${process.env.VITE_API_URL}+/api/default-profile.png`
    }
    console.log('Fetched Profile Image URL:', profileImageUrl.value)
  } catch (error) {
    console.error('Error fetching profile image:', error)
    // Fallback jika terjadi error fetch, gunakan default kondisional
    profileImageUrl.value = import.meta.env.PROD
      ? '/uploads/default-profile.png'
      : 'http://localhost:3000/uploads/default-profile.png'
  }
}

const handleFileSelect = (event) => {
  const file = event.target.files?.[0]
  if (!file) return // HIGHLIGHT: Tambah cek file null

  const reader = new FileReader()
  reader.onload = (e) => {
    selectedImageSrc.value = e.target.result
    showCropperModal.value = true
  }
  reader.readAsDataURL(file)
  event.target.value = null
}

const cropAndUpload = async () => {
  if (!cropperRef.value) return

  const { canvas } = cropperRef.value.getResult()
  if (!canvas) {
    alert('Failed to crop image.')
    return
  }

  canvas.toBlob(async (blob) => {
    if (!blob) {
      alert('Failed to convert cropped image to blob.')
      return
    }

    const formData = new FormData()
    formData.append('profilePhoto', blob, 'profile_cropped.png')
    try {
      const response = await axios.post(UPLOAD_API_ENDPOINT, formData, {
        // HIGHLIGHT: Gunakan UPLOAD_API_ENDPOINT
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      // HIGHLIGHT START: Logika untuk setting profileImageUrl setelah upload
      if (import.meta.env.PROD) {
        profileImageUrl.value = response.data.imageUrl // Dari backend sudah relatif dan benar
      } else {
        profileImageUrl.value = `https://interactive-cv-production-1827.up.railway.app${response.data.imageUrl}` // Perlu absolut di lokal
      }
      // HIGHLIGHT END
      alert(response.data.message)
      showCropperModal.value = false
      selectedImageSrc.value = null
      console.log('Upload success, new URL:', profileImageUrl.value)
    } catch (error) {
      console.error('Error uploading cropped file:', error)
      alert('File upload failed: ' + (error.response?.data?.message || error.message))
    }
  }, 'image/png')
}

onMounted(() => {
  fetchProfileImage()
})
</script>

<style>
/* Style tetap ada di sini */
.group .bg-opacity-50 {
  opacity: 0;
}

.group:hover .bg-opacity-50 {
  opacity: 1;
}

.cropper-custom {
  max-height: 100%;
  max-width: 100%;
  width: 100%;
  height: 100%;
  background: #eee;
}
</style>
