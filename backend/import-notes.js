import 'dotenv/config';
import pool from './bd.js';
import fs from 'fs';

const data = fs.readFileSync(
  new URL('./notes.json', import.meta.url),
  'utf8'
);

const notes = JSON.parse(data);

for (const note of notes) {

  await pool.query(
    `
    INSERT INTO notes
    (id, title, content, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
    `,
    [
      note.id,
      note.title,
      note.content,
      new Date(note.createdAt),
      new Date(note.updatedAt)
    ]
  );

  console.log(`✅ Note importée : ${note.title}`);
}

console.log('🎉 Toutes les notes ont été importées !');

await pool.end();