import { Router } from 'express';
import db from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';

const router = Router();

function readAllContent() {
  const rows = db.prepare('SELECT key, value FROM content').all();
  const out = {};
  for (const row of rows) {
    try {
      out[row.key] = JSON.parse(row.value);
    } catch {
      out[row.key] = row.value;
    }
  }
  return out;
}

// GET /api/content  -> full site content + gallery (public)
router.get('/', (req, res) => {
  const content = readAllContent();
  const gallery = db
    .prepare('SELECT id, image_url, caption FROM gallery ORDER BY sort_order, id')
    .all();
  res.json({ ...content, gallery });
});

// PUT /api/content/:section  (admin) -> replace one section's JSON
router.put('/:section', requireAuth, (req, res) => {
  const { section } = req.params;
  const value = req.body;
  if (value === undefined || value === null) {
    return res.status(400).json({ error: 'لا يوجد محتوى للحفظ' });
  }
  db.prepare(
    `INSERT INTO content (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP`
  ).run(section, JSON.stringify(value));
  res.json({ ok: true, section, value });
});

export default router;
