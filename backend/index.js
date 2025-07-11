// // backend/index.jsconst path = require("path");
// const path = require("path");
// require("dotenv").config({
//   path: path.resolve(__dirname, "..", ".env.development.local"),
// });
// // HIGHLIGHT END
// const express = require("express");
// const cors = require("cors");
// const multer = require("multer"); // HIGHLIGHT: Untuk upload file
// // HIGHLIGHT: Untuk path file
// const { sql } = require("@vercel/postgres"); // HIGHLIGHT: Untuk koneksi database Postgres
// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());

// // HIGHLIGHT START: Serve static files dari folder 'uploads'
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// // HIGHLIGHT END

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, "profile-" + Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 2 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png|gif/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = path.extname(file.originalname).toLowerCase(); // HIGHLIGHT: Perbaikan kecil di sini
//     const isImage = filetypes.test(mimetype) && filetypes.test(extname); // HIGHLIGHT: Perbaikan logika validasi

//     if (mimetype && extname) {
//       return cb(null, true);
//     }
//     cb(
//       new Error(
//         "File upload only supports the following filetypes - " + filetypes
//       )
//     );
//   },
// });

// // HIGHLIGHT START: Sesuaikan URL foto profil untuk Vercel (URL relatif)
// // Ini akan membuat URL bekerja baik di lokal maupun di Vercel
// let profileImageUrl = "/uploads/default-profile.png"; // Default image URL (relatif)
// // Endpoint untuk upload foto profil

// app.post(
//   "/api/upload-profile-photo",
//   upload.single("profilePhoto"),
//   (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded." });
//     }
//     // HIGHLIGHT START: URL setelah upload juga harus relatif
//     profileImageUrl = `/uploads/${req.file.filename}`;
//     res.json({
//       message: "Your handsome photo has been successfully updated!",
//       imageUrl: profileImageUrl,
//     });
//     // HIGHLIGHT END
//   }
// );

// app.get("/api/profile-photo", (req, res) => {
//   res.json({ imageUrl: profileImageUrl });
// });
// // HIGHLIGHT END

// // HIGHLIGHT START: Endpoint API yang akan mengambil data dari Database
// app.get("/api/education", async (req, res) => {
//   try {
//     const { rows } = await sql`SELECT * FROM education ORDER BY period DESC;`;
//     res.status(200).json(rows);
//   } catch (error) {
//     console.error("Error fetching education data:", error);
//     res.status(500).json({ error: "Gagal mengambil data pendidikan" });
//   }
// });

// app.get("/api/skills", async (req, res) => {
//   try {
//     const { rows } = await sql`SELECT * FROM skills;`;
//     res.status(200).json(rows);
//   } catch (error) {
//     console.error("Error fetching skills data:", error);
//     res.status(500).json({ error: "Gagal mengambil data skill" });
//   }
// });

// app.get("/api/projects", async (req, res) => {
//   try {
//     const { rows } = await sql`SELECT * FROM projects;`;
//     res.status(200).json(rows);
//   } catch (error) {
//     console.error("Error fetching projects data:", error);
//     res.status(500).json({ error: "Gagal mengambil data proyek" });
//   }
// });
// if (require.main === module) {
//   app.listen(PORT, () => {
//     console.log(`Server backend berjalan di http://localhost:${PORT}`);
//   });
// }

// module.exports = app;

// backend/index.js (VERSI SIMPLIFIED UNTUK DEBUGGING DI VERCEL)
const express = require("express");
const app = express();
const { sql } = require("@vercel/postgres"); // Tetap butuh ini untuk tes koneksi

app.get("/", (req, res) => {
  res.send("Backend Vercel OK!");
});

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await sql`SELECT NOW();`; // Tes koneksi DB
    res.json({ message: "DB Connection OK!", time: result.rows[0].now });
  } catch (error) {
    console.error("DB Test Error:", error);
    res
      .status(500)
      .json({ error: "DB Connection FAILED!", details: error.message });
  }
});

// HIGHLIGHT: Hapus sementara semua rute lain (education, skills, projects, upload)
// Hapus juga multer dan path, dotenv jika hanya pakai ini untuk tes
// Pastikan module.exports = app; ada di akhir

module.exports = app;
