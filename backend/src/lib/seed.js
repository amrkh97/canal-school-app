import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import db from './db.js';
import { hashPassword } from './auth.js';
import {
  defaultContent,
  defaultGallery,
  defaultNews,
  defaultTestimonials,
  defaultStaff,
} from './defaults.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const seedAssetsDir = path.join(__dirname, '..', '..', 'seed-assets');
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

/**
 * Seeds the database the first time the app runs:
 *   - creates the admin account from the .env values
 *   - stores the default site content so it shows up immediately
 *   - copies the school's real photos into the gallery
 * It is safe to run on every startup: existing data is never overwritten,
 * so anything the admin edits later is preserved.
 */
export function seedDatabase() {
  fs.mkdirSync(uploadsDir, { recursive: true });

  // 1) Admin user
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const existingUser = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (!existingUser) {
    db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(
      username,
      hashPassword(password)
    );
    console.log(`[seed] Created admin user "${username}".`);
  }

  // 2) Default content (only fills keys that don't exist yet)
  const upsertIfMissing = db.prepare(
    'INSERT INTO content (key, value) VALUES (?, ?) ON CONFLICT(key) DO NOTHING'
  );
  let added = 0;
  for (const [key, value] of Object.entries(defaultContent)) {
    const info = upsertIfMissing.run(key, JSON.stringify(value));
    added += info.changes;
  }
  if (added) console.log(`[seed] Stored ${added} default content section(s).`);

  // 3) Gallery photos (only when the gallery is empty)
  const galleryCount = db.prepare('SELECT COUNT(*) AS n FROM gallery').get().n;
  if (galleryCount === 0) {
    const insert = db.prepare(
      'INSERT INTO gallery (image_url, caption, caption_en, sort_order) VALUES (?, ?, ?, ?)'
    );
    let seededPhotos = 0;
    defaultGallery.forEach((item, i) => {
      if (item.url) {
        // External photo reference (e.g. the school's public directory listing).
        insert.run(item.url, item.caption || '', item.caption_en || '', i);
        seededPhotos++;
      } else if (item.file) {
        const src = path.join(seedAssetsDir, item.file);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, path.join(uploadsDir, item.file));
          insert.run(`/uploads/${item.file}`, item.caption || '', item.caption_en || '', i);
          seededPhotos++;
        }
      }
    });
    console.log(`[seed] Seeded gallery with ${seededPhotos} school photo(s).`);
  }

  // 4) News
  if (db.prepare('SELECT COUNT(*) AS n FROM news').get().n === 0) {
    const ins = db.prepare(
      'INSERT INTO news (title, title_en, body, body_en, date, sort_order) VALUES (?,?,?,?,?,?)'
    );
    defaultNews.forEach((n, i) => ins.run(n.title, n.title_en, n.body, n.body_en, n.date, i));
    console.log('[seed] Seeded news.');
  }

  // 5) Testimonials
  if (db.prepare('SELECT COUNT(*) AS n FROM testimonials').get().n === 0) {
    const ins = db.prepare(
      'INSERT INTO testimonials (name, name_en, relation, relation_en, quote, quote_en, image_url, sort_order) VALUES (?,?,?,?,?,?,?,?)'
    );
    defaultTestimonials.forEach((t, i) => {
      let image_url = '';
      if (t.image) {
        const src = path.join(seedAssetsDir, t.image);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, path.join(uploadsDir, t.image));
          image_url = `/uploads/${t.image}`;
        }
      }
      ins.run(t.name, t.name_en, t.relation, t.relation_en, t.quote, t.quote_en, image_url, i);
    });
    console.log('[seed] Seeded testimonials.');
  }

  // 6) Staff
  if (db.prepare('SELECT COUNT(*) AS n FROM staff').get().n === 0) {
    const ins = db.prepare(
      'INSERT INTO staff (name, name_en, role, role_en, sort_order) VALUES (?,?,?,?,?)'
    );
    defaultStaff.forEach((s, i) => ins.run(s.name, s.name_en, s.role, s.role_en, i));
    console.log('[seed] Seeded staff.');
  }
}

// Allow running directly:  npm run seed
// Compare via pathToFileURL so this works on Windows too, where process.argv[1]
// is a backslash path (e.g. C:\...\seed.js) and import.meta.url is file:///C:/...
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  seedDatabase();
  console.log('[seed] Done.');
}
