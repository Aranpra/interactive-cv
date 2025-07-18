
const path = require("path");


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: path.resolve(__dirname, "..", ".env.development.local"),
  });
}

const { sql } = require("@vercel/postgres");
const {
  educationHistory,
  skills,
  projects,
  achievements,
  aboutme,
} = require("./data.js");

async function seed() {

  try {
    console.log("Memulai proses seeding data...");
    await sql`DROP TABLE IF EXISTS skills, projects, education, achievements, aboutme;`;
    console.log("Tabel lama dihapus (jika ada).");

    await sql`
      CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY, 
        institution VARCHAR(255), 
        major VARCHAR(255), 
        period VARCHAR (255)
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS achievements (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        image VARCHAR(255),
        description TEXT
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY, 
        name VARCHAR(255), 
        level VARCHAR(255),
        iconUrl VARCHAR(255)
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY, 
        title VARCHAR (255), 
        image VARCHAR(255), 
        description TEXT, 
        tech VARCHAR (255)[], 
        link VARCHAR(255)
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS aboutme (
        id SERIAL PRIMARY KEY,
        content TEXT not null,
        interests jsonb
      );
    `;

    console.log("Tabel berhasil dibuat.");

    await Promise.all(
      educationHistory.map(
        (e) => sql`
      INSERT INTO education (institution, major, period) 
      VALUES (${e.institution}, ${e.major}, ${e.period});
    `
      )
    );
    await Promise.all(
      achievements.map(
        (a) => sql`
      INSERT INTO achievements (title, image, description)
      VALUES (${a.title}, ${a.image}, ${a.description});
    `
      )
    );
    await Promise.all(
      skills.map(
        (s) => sql`
      INSERT INTO skills (name, level, iconUrl) 
      VALUES (${s.name}, ${s.level}, ${s.iconUrl});
    `
      )
    );
    await Promise.all(
      projects.map(
        (p) => sql`
      INSERT INTO projects (title, image, description, tech, link) 
      VALUES (${p.title}, ${p.image}, ${p.description}, ${p.tech}, ${p.link});
    `
      )
    );
    await Promise.all(
      aboutme.map(
        (m) => sql`
      INSERT INTO aboutme (content, interests) 
      VALUES (${m.content}, ${JSON.stringify(m.interests)});
    `
      )
    );

    console.log("Proses seeding data berhasil!");
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}

seed();
