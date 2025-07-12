// backend/index.jsconst path = require("path");
const path = require("path");
// HIGHLIGHT: Pastikan path ini diimpor (biasanya sudah ada)
require("dotenv").config({
  path: path.resolve(__dirname, "..", ".env.development.local"),
});
const express = require("express");
const cors = require("cors");
const multer = require("multer"); // HIGHLIGHT: Untuk upload file
// HIGHLIGHT: Untuk path file
const { sql } = require("@vercel/postgres"); // HIGHLIGHT: Untuk koneksi database Postgres
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// HIGHLIGHT START: Serve static files dari folder 'uploads'
// Ini penting agar gambar profil yang diupload bisa diakses via URL
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// HIGHLIGHT END

// HIGHLIGHT START: Konfigurasi Multer untuk upload foto profil
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder tempat menyimpan file di server
  },
  filename: function (req, file, cb) {
    // Buat nama file unik: 'profile-timestamp.ext'
    cb(null, "profile-" + Date.now() + path.extname(file.originalname));
  },
});

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
      new Error(
        "File upload only supports the following filetypes - " + filetypes
      )
    ); // HIGHLIGHT: Gunakan new Error
  },
});

// Variabel di memory server untuk menyimpan URL foto profil.
// HIGHLIGHT: Untuk persistence foto profil di Vercel, ini perlu disimpan di database juga.
// Tapi untuk responsi, ini cukup sebagai demo.
let profileImageUrl = `http://localhost:${PORT}/uploads/default-profile.png`; // Default image URL

// Endpoint untuk upload foto profil
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

// Endpoint untuk mendapatkan URL foto profil
app.get("/api/profile-photo", (req, res) => {
  res.json({ imageUrl: profileImageUrl });
});
// HIGHLIGHT END

// HIGHLIGHT START: Endpoint API yang akan mengambil data dari Database
app.get("/api/education", async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM education ORDER BY period DESC;`;
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching education data:", error); // HIGHLIGHT: Log error
    res.status(500).json({ error: "Gagal mengambil data pendidikan" });
  }
});

app.get("/api/skills", async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM skills;`;
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching skills data:", error); // HIGHLIGHT: Log error
    res.status(500).json({ error: "Gagal mengambil data skill" });
  }
});

app.get("/api/projects", async (req, res) => {
  try {
    const { rows } = await sql`SELECT * FROM projects;`;
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching projects data:", error); // HIGHLIGHT: Log error
    res.status(500).json({ error: "Gagal mengambil data proyek" });
  }
});
// HIGHLIGHT END
app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});
// HIGHLIGHT START: Ini penting agar Vercel bisa menjalankan backend
module.exports = app;
// HIGHLIGHT END
