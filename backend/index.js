// backend/index.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path"); // Impor path module untuk bekerja dengan path file
const { educationHistory, skills, projects } = require("./data");
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
let profileImageUrl = `http://localhost:${PORT}/uploads/default-profile.png`; // Default image URL

app.post(
  "/api/upload-profile-photo",
  upload.single("profilePhoto"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    // Simpan URL file yang baru di-upload
    profileImageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json({
      message: "File uploaded successfully!",
      imageUrl: profileImageUrl,
    });
  }
);

// HIGHLIGHT: BARU DITAMBAHKAN - Endpoint baru untuk mendapatkan URL foto profil
app.get("/api/profile-photo", (req, res) => {
  res.json({ imageUrl: profileImageUrl });
});

app.get("/api/education", (req, res) => res.json(educationHistory));
app.get("/api/skills", (req, res) => res.json(skills));
app.get("/api/projects", (req, res) => res.json(projects));

app.listen(PORT, () => {
  console.log(` Server backend berjalan di http://localhost:${PORT}`);
});
