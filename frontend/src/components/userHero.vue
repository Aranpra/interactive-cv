<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
// HIGHLIGHT: BARU DITAMBAHKAN - Import Cropper dan CircleStencil
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css' // HIGHLIGHT: BARU DITAMBAHKAN - Import CSS cropper
import Typed from 'typed.js'

// HIGHLIGHT START: Tentukan API_URL untuk profil secara dinamis
const profile_API_URL = import.meta.env.PROD
  ? '/api/profile-photo'
  : 'http://localhost:3000/api/profile-photo'
// HIGHLIGHT END

onMounted(() => {
  new Typed('#typed', {
    strings: ['Web Developer', 'UI/UX Enthusiast', 'Informatics Student'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
  })
})

const profileImageUrl = ref('')
const fileInput = ref(null)
const showOverlay = ref(false)
const showFullscreen = ref(false)

// HIGHLIGHT: STATE BARU UNTUK CROPPER
const showCropperModal = ref(false)
const selectedImageSrc = ref(null)
const cropperRef = ref(null) // Ref untuk mengakses instance cropper

const fetchProfileImage = async () => {
  try {
    const response = await axios.get(profile_API_URL) // HIGHLIGHT: Gunakan profile_API_URL
    if (response.data.imageUrl) {
      profileImageUrl.value = response.data.imageUrl
    } else {
      // Fallback jika API tidak memberikan URL gambar
      profileImageUrl.value = '/uploads/default-profile.png' // HIGHLIGHT: URL default untuk frontend
    }
  } catch (error) {
    console.error('Error fetching profile image:', error)
    // Fallback jika terjadi error fetch, gunakan default lokal/relatif
    profileImageUrl.value = '/uploads/default-profile.png'
  }
}

// HIGHLIGHT: FUNCTION BARU UNTUK MEMILIH FILE DAN MENAMPILKAN CROPPER
const handleFileSelect = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      selectedImageSrc.value = e.target.result // Set gambar untuk cropper
      showCropperModal.value = true // Tampilkan modal cropper
    }
    reader.readAsDataURL(file)
  }
  event.target.value = null // Reset input file
}

// HIGHLIGHT: FUNCTION BARU UNTUK CROP DAN UPLOAD
const cropAndUpload = async () => {
  if (!cropperRef.value) return

  const { canvas } = cropperRef.value.getResult() // Ambil hasil crop sebagai canvas
  if (!canvas) {
    alert('Failed to crop image.')
    return
  }

  // Konversi canvas ke Blob (untuk dikirim ke backend)
  canvas.toBlob(async (blob) => {
    if (!blob) {
      alert('Failed to convert cropped image to blob.')
      return
    }

    const upload_API_URL = import.meta.env.PROD
      ? '/api/upload-profile-photo'
      : 'http://localhost:3000/api/upload-profile-photo'
    upload_API_URL.append('profilePhoto', blob, 'profile_cropped.png') // Nama file bisa disesuaikan

    try {
      const response = await axios.post(upload_API_URL,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      profileImageUrl.value = response.data.imageUrl // Update URL setelah upload berhasil
      alert(response.data.message)
      showCropperModal.value = false // Tutup modal cropper
      selectedImageSrc.value = null // Reset gambar terpilih
    } catch (error) {
      console.error('Error uploading cropped file:', error)
      alert('File upload failed: ' + (error.response?.data?.message || error.message))
    }
  }, 'image/png') // Format gambar yang akan diupload (bisa jpg, webp, dll)
}

onMounted(() => {
  fetchProfileImage()
})
</script>

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
    <div class="md:w-1/2 flex flex-col items-center justify-center" style="animation-delay: 500ms">
      <div
        class="relative group w-80 h-80 rounded-full overflow-hidden shadow-xl border-4 border-accent-blue ring-8 ring-light-blue animate-fade-in"
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
            lines: true,
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
