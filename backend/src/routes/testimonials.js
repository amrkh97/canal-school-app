import { Router } from 'express';
import db from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';
import { upload } from '../lib/upload.js';

const router = Router();

// GET /api/testimonials (public)
router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM testimonials ORDER BY sort_order, id').all());
});

// POST /api/testimonials (admin)  [optional image field: "image"]
router.post('/', requireAuth, upload.single('image'), (req, res) => {
  const { name, name_en, relation, relation_en, quote, quote_en } = req.body || {};
  if (!name || !quote) return res.status(400).json({ error: 'الاسم والاقتباس مطلوبان' });
  const image_url = req.file ? `/uploads/${req.file.filename}` : '';
  const maxOrder = db.prepare('SELECT COALESCE(MAX(sort_order),0) AS m FROM testimonials').get().m;
  const info = db
    .prepare(
      'INSERT INTO testimonials (name, name_en, relation, relation_en, quote, quote_en, image_url, sort_order) VALUES (?,?,?,?,?,?,?,?)'
    )
    .run(name, name_en || '', relation || '', relation_en || '', quote, quote_en || '', image_url, maxOrder + 1);
  res.status(201).json(db.prepare('SELECT * FROM testimonials WHERE id = ?').get(info.lastInsertRowid));
});

// DELETE /api/testimonials/:id (admin)
router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
