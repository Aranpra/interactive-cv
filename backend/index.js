// backend/index.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path"); // Impor path module untuk bekerja dengan path file
// HIGHLIGHT START: Mengganti import data dari data.js ke sql dari @vercel/postgres
// const { educationHistory, skills, projects } = require('./data'); // DIHAPUS
const { sql } = require("@vercel/postgres"); // BARU DITAMBAHKAN
// HIGHLIGHT END
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// HIGHLIGHT: BARU DITAMBAHKAN - Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder tempat menyimpan file
  },
  filename: function (req, file, cb) {
    // Buat nama file unik, contoh: profile-gambar_timestamp.ext
    cb(null, "profile-" + Date.now() + path.extname(file.originalname));
  },
});

// HIGHLIGHT: BARU DITAMBAHKAN - Konfigurasi Multer dengan batasan ukuran dan tipe file
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Batasan ukuran file 2MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      "Error: File upload only supports the following filetypes - " + filetypes
    );
  },
});

// HIGHLIGHT: BARU DITAMBAHKAN - Endpoint untuk upload foto profil
// HIGHLIGHT START: Logic profileImageUrl akan diubah untuk persistensi di database jika diperlukan,
//                   tapi untuk responsi ini tetap simpan di memory server lokal.
let profileImageUrl = "http://localhost:3000/uploads/default-profile.png";
app.post(
  "/api/upload-profile-photo",
  upload.single("profilePhoto"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    profileImageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json({
      message: "File uploaded successfully!",
      imageUrl: profileImageUrl,
    });
  }
);

// Endpoint baru untuk mendapatkan URL foto profil (TETAP ADA)
app.get("/api/profile-photo", (req, res) => {
  res.json({ imageUrl: profileImageUrl });
});
// HIGHLIGHT END

// HIGHLIGHT START: Endpoint API yang akan mengambil data dari Database (SESUAI PDF)
app.get('/api/education', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM education ORDER BY period DESC;`; // [cite: 644]
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data pendidikan' }); [cite, 649]
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM skills;`; // [cite: 652]
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data skill' }); [cite, 654]
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM projects;`; // [cite: 660]
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data proyek' }); [cite, 662]
  }
});
// HIGHLIGHT END

// Wajib ada agar Vercel bisa menjalankan backend
module.exports = app; [cite, 665]

app.listen(PORT, () => {
  console.log(` Server backend berjalan di http://localhost:${PORT}`);
});
