import { Router } from 'express';
import db from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';
import { upload } from '../lib/upload.js';

const router = Router();

// GET /api/news (public)
router.get('/', (req, res) => {
  const items = db.prepare('SELECT * FROM news ORDER BY date DESC, sort_order, id DESC').all();
  res.json(items);
});

// POST /api/news (admin)  [optional image field: "image"]
router.post('/', requireAuth, upload.single('image'), (req, res) => {
  const { title, title_en, body, body_en, date } = req.body || {};
  if (!title || !body) return res.status(400).json({ error: 'العنوان والمحتوى مطلوبان' });
  const image_url = req.file ? `/uploads/${req.file.filename}` : '';
  const info = db
    .prepare(
      `INSERT INTO news (title, title_en, body, body_en, image_url, date)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(title, title_en || '', body, body_en || '', image_url, date || new Date().toISOString().slice(0, 10));
  res.status(201).json(db.prepare('SELECT * FROM news WHERE id = ?').get(info.lastInsertRowid));
});

// PUT /api/news/:id (admin)
router.put('/:id', requireAuth, upload.single('image'), (req, res) => {
  const item = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'الخبر غير موجود' });
  const { title, title_en, body, body_en, date } = req.body || {};
  const image_url = req.file ? `/uploads/${req.file.filename}` : item.image_url;
  db.prepare(
    `UPDATE news SET title=?, title_en=?, body=?, body_en=?, image_url=?, date=? WHERE id=?`
  ).run(
    title ?? item.title,
    title_en ?? item.title_en,
    body ?? item.body,
    body_en ?? item.body_en,
    image_url,
    date ?? item.date,
    req.params.id
  );
  res.json(db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id));
});

// DELETE /api/news/:id (admin)
router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
