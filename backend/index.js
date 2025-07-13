// backend/index.js
const path = require("path");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { sql } = require("@vercel/postgres");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: path.resolve(__dirname, "..", ".env.development.local"),
  });
}

console.log(
  "POSTGRES_URL loaded:",
  process.env.POSTGRES_URL ? "Yes (value hidden)" : "No"
);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // HIGHLIGHT: Parser JSON, tapi ini TIDAK UNTUK multipart/form-data
app.use(express.urlencoded({ extended: true }));

// HIGHLIGHT START: Tambahkan middleware untuk logging setiap request masuk
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "profile-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = path.extname(file.originalname).toLowerCase(); // HIGHLIGHT: Perbaikan kecil di sini
    const isImage = filetypes.test(mimetype) && filetypes.test(extname); // HIGHLIGHT: Perbaikan logika validasi

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error(
        "File upload only supports the following filetypes - " + filetypes
      )
    );
  },
});

let profileImageUrl = "/uploads/default-profile.png";

app.post(
  "/api/upload-profile-photo",
  upload.single("profilePhoto"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    // HIGHLIGHT START: URL setelah upload juga harus relatif
    profileImageUrl = `/uploads/${req.file.filename}`;
    res.json({
      message: "Your handsome photo has been successfully updated!",
      imageUrl: profileImageUrl,
    });
    // HIGHLIGHT END
  }
);

app.get("/", (req, res) => {
  res.send("Hallo dunia! Backend server is running.");
});

app.get("/api/profile-photo", (req, res) => {
  console.log("API: /api/profile-photo called");
  res.json({ imageUrl: profileImageUrl });
});

app.get("/api/education", async (req, res) => {
  console.log("API: /api/education called");
  try {
    const { rows } = await sql`SELECT * FROM education ORDER BY period DESC;`; // HIGHLIGHT: Ini seharusnya bekerja dengan @vercel/postgres
    console.log("API: Fetched education data rows:", rows.length);
    res.status(200).json(rows);
  } catch (error) {
    console.error("API Error: Failed to fetch education data from DB:", error);
    res
      .status(500)
      .json({ error: "Gagal mengambil data pendidikan dari database." });
  }
});

app.get("/api/skills", async (req, res) => {
  console.log("API: /api/skills called");
  try {
    const { rows } = await sql`SELECT * FROM skills;`;
    console.log("API: Fetched skills data rows:", rows.length);
    res.status(200).json(rows);
  } catch (error) {
    console.error("API Error: Failed to fetch skills data from DB:", error);
    res
      .status(500)
      .json({ error: "Gagal mengambil data skill dari database." });
  }
});

app.get("/api/projects", async (req, res) => {
  console.log("API: /api/projects called");
  try {
    const { rows } = await sql`SELECT * FROM projects;`;
    console.log("API: Fetched projects data rows:", rows.length);
    res.status(200).json(rows);
  } catch (error) {
    console.error("API Error: Failed to fetch projects data from DB:", error);
    res
      .status(500)
      .json({ error: "Gagal mengambil data proyek dari database." });
  }
});

app.get("/api/achievements", async (req, res) => {
  console.log("API: /api/achievements called");
  try {
    const { rows } = await sql`SELECT * FROM achievements;`;
    console.log("API: Fetched achievements data rows:", rows.length);
    res.status(200).json(rows);
  } catch (error) {
    console.error(
      "API Error: Failed to fetch achievements data from DB:",
      error
    );
    res.status(500).json({ error: "Gagal mengambil data pencapaian." });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server backend berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;
