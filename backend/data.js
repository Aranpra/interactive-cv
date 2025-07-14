// backend/data.js
const educationHistory = [
  {
    id: 1,
    period: "2023 - Sekarang",
    institution: "Universitas Amikom Yogyakarta",
    major: "S1 - Teknik Informatika",
  },
  {
    id: 2,
    period: "2019 - 2022",
    institution: "SMA Negeri 1 Rumbia",
    major: "MIPA",
  },
];
const aboutme = [
  {
    content:
      "Saya adalah mahasiswa Teknik Informatika di Universitas Amikom Yogyakarta. Saya memiliki minat yang besar dalam pengembangan web dan aplikasi, serta bersemangat untuk terus belajar dan mengembangkan keterampilan saya di bidang teknologi informasi.",
    interests: [
      "Eksplorasi teknologi baru & framework",
      "Bermain musik",
      "Badminton",
      "Bermain Mobile Legend",
      "Mendengarkan musik",
    ],
  },
];
const achievements = [
  {
    id: 1,
    title: "Juara 1 Lomba Web 2024",
    image:
      "https://i.pinimg.com/1200x/e0/a6/a5/e0a6a54c5043d3f90a8b0981665879a3.jpg",
    description:
      "Merancang dan mengembangkan websiteinovatif untuk kompetisi tingkat universitas.",
  },
  {
    id: 2,
    title: "Sertifikasi Google IT Support",
    image:
      "https://i.pinimg.com/1200x/10/08/9e/10089ebef02578f435bba48e5e5c3e4b.jpg",
    description:
      "Menyelesaikan kursus komprehensif tentang dasar-dasar IT dan dukungan teknis.",
  },
];
const skills = [
  { name: "Vue.js", level: "Expert" },
  { name: "JavaScript", level: "Expert" },
  { name: "Tailwind CSS", level: "Expert" },
  { name: "Node.js", level: "Expert" },
  { name: "Express.js", level: "Expert" },
  { name: "PostgreSQL", level: "Expert" },
  { name: "Git & GitHub", level: "Expert" },
  { name: "HTML5 & CSS3", level: "Expert" },
];
const projects = [
  {
    title: "Website Toko Online",
    image:
      "https://i.pinimg.com/736x/a3/77/f3/a377f34362bf428d0d24722072964461.jpg",
    description: "Platform e-commerce dengan fitur keranjang belanja.",
    tech: ["Vue.js", "Express.js", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Aplikasi Manajemen Tugas",
    image:
      "https://i.pinimg.com/1200x/ae/0b/0e/ae0b0e627f2743e22d4bb6e58490b695.jpg",
    description: "Aplikasi untuk melacak progres tugas harian.",
    tech: ["React", "Firebase"],
    link: "#",
  },
];
module.exports = { educationHistory, achievements, skills, projects, aboutme };
