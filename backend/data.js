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
    image: "https://via.placeholder.com/500x300?text=Proyek+1",
    description: "Platform e-commerce dengan fitur keranjang belanja.",
    tech: ["Vue.js", "Express.js", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Aplikasi Manajemen Tugas",
    image: "https://via.placeholder.com/500x300?text=Proyek+2",
    description: "Aplikasi untuk melacak progres tugas harian.",
    tech: ["React", "Firebase"],
    link: "#",
  },
];
module.exports = { educationHistory, skills, projects };
