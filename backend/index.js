// backend/index.js
const path = require("path");
const express = require("express");
const cors = require("cors");
const { sql } = require("@vercel/postgres");

require("dotenv").config({
  path: path.resolve(__dirname, "..", ".env.development.local"),
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hallo dunia! Backend server is running.");
});

app.get("/api/education", async (req, res) => {
  console.log("API: /api/education called");
  try {
    const { rows } = await sql`SELECT * FROM education ORDER BY period DESC;`; 
    console.log("API: Fetched education data rows:", rows.length);
    res.status(200).json(rows);
  } catch (error) {
    console.error("API Error: Failed to fetch education data from DB:", error);
    res
      .status(500)
      .json({ error: "Gagal mengambil data pendidikan dari database." });
  }
});

app.get("api/aboutme", async (req, res) => {
  console.log("API: /api/aboutme called");
  try {
    const { rows } = await sql`SELECT * FROM aboutme;`;
    console.log("API: Fetched skills data rows:", rows.length);
    res.status(200).json(rows);
    res.status(200).json({ aboutMeText: rows[0].content });
  } catch (error) {
    console.error("API Error: Failed to fetch aboutme data from DB:", error);
    res
      .status(500)
      .json({ error: "Gagal mengambil data aboutme dari database." });
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
