// Downloads the school's real photos from its public directory listing
// (masrschools.com CDN) into the local gallery.
//
// Run it from the backend folder:   npm run photos
//
// What it does:
//   1. downloads each photo into backend/uploads/
//   2. adds it to the gallery in the database (skipping ones already added)
// The photos then appear on the site immediately — no restart or DB reset needed.
// Everything is stored locally; nothing is hot-linked.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import db from '../lib/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

const CDN = 'https://bunny-wp-pullzone-wzghzn6pkc.b-cdn.net/wp-content/uploads/2025/01/';
// URL-encoded Arabic file stem: "مدرسة-القناة-بالمعادي"
const STEM =
  '%D9%85%D8%AF%D8%B1%D8%B3%D8%A9-%D8%A7%D9%84%D9%82%D9%86%D8%A7%D8%A9-%D8%A8%D8%A7%D9%84%D9%85%D8%B9%D8%A7%D8%AF%D9%8A';

// The photos available on the public listing.
const PHOTOS = ['-2', '-3', '-4', '-5', '-6', '-7', '-8', '-9', '-33', '-55'].map((s, i) => ({
  url: `${CDN}${STEM}${s}.jpg`,
  filename: `canal-photo-${i + 1}.jpg`,
}));

async function main() {
  if (typeof fetch !== 'function') {
    console.error('[photos] This script needs Node 18 or newer (for built-in fetch).');
    process.exit(1);
  }
  await mkdir(uploadsDir, { recursive: true });

  const exists = db.prepare('SELECT 1 FROM gallery WHERE image_url = ?');
  const insert = db.prepare(
    'INSERT INTO gallery (image_url, caption, sort_order) VALUES (?, ?, ?)'
  );
  const baseOrder = db.prepare('SELECT COALESCE(MAX(sort_order), 0) AS m FROM gallery').get().m;

  let added = 0;
  let skipped = 0;
  for (let i = 0; i < PHOTOS.length; i++) {
    const { url, filename } = PHOTOS[i];
    const imageUrl = `/uploads/${filename}`;
    if (exists.get(imageUrl)) {
      skipped++;
      console.log(`[photos] already in gallery: ${filename}`);
      continue;
    }
    try {
      process.stdout.write(`[photos] downloading ${filename} … `);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(path.join(uploadsDir, filename), buf);
      insert.run(imageUrl, '', baseOrder + i + 1);
      added++;
      console.log(`ok (${Math.round(buf.length / 1024)} KB)`);
    } catch (err) {
      console.log(`failed (${err.message})`);
    }
  }

  console.log(`\n[photos] Done. Added ${added}, already present ${skipped}.`);
  console.log('[photos] Refresh the website to see them in the gallery.');
}

main();
