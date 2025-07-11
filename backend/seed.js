// File: backend/seed.js
const path = require('path'); [cite, 755]
// HIGHLIGHT START: Konfigurasi dotenv untuk environment lokal
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env.development.local') }); [cite, 756]
// HIGHLIGHT END

const { sql } = require('@vercel/postgres'); [cite, 757]
const { educationHistory, skills, projects } = require('./data.js'); [cite, 757]

async function seed() { [cite, 758]
  try {
    // HIGHLIGHT START: Membuat tabel jika belum ada
    await sql`
      CREATE TABLE IF NOT EXISTS education (
        id SERIAL PRIMARY KEY, 
        institution VARCHAR(255), 
        major VARCHAR(255), 
        period VARCHAR (255)
      );
    `; [cite, 760]
    await sql`
      CREATE TABLE IF NOT EXISTS skills (
        id SERIAL PRIMARY KEY, 
        name VARCHAR(255), 
        level VARCHAR(255)
      );
    `; [cite, 761]
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY, 
        title VARCHAR (255), 
        image VARCHAR(255), 
        description TEXT, 
        tech VARCHAR (255)[], // HIGHLIGHT: Array of strings for tech
        link VARCHAR(255)
      );
    `; [cite, 762]
    console.log('Tabel berhasil dibuat.'); [cite, 764]
    // HIGHLIGHT END

    // HIGHLIGHT START: Memasukkan data dari data.js ke tabel
    await Promise.all(educationHistory.map(e => sql`
      INSERT INTO education (institution, major, period) 
      VALUES (${e.institution}, ${e.major}, ${e.period});
    `)); [cite, 765]
    await Promise.all(skills.map(s => sql`
      INSERT INTO skills (name, level) 
      VALUES (${s.name}, ${s.level});
    `)); [cite, 766]
    await Promise.all(projects.map(p => sql`
      INSERT INTO projects (title, image, description, tech, link) 
      VALUES (${p.title}, ${p.image}, ${p.description}, ${p.tech}, ${p.link});
    `)); [cite, 768]
    console.log('Proses seeding data berhasil!'); [cite, 769]
    // HIGHLIGHT END

  } catch (error) {
    console.error('Error seeding:', error); [cite, 771]
    process.exit(1); [cite, 771]
  }
}

seed(); [cite, 773]