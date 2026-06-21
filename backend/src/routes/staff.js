import { Router } from 'express';
import db from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';
import { upload } from '../lib/upload.js';

const router = Router();

// GET /api/staff (public)
router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM staff ORDER BY sort_order, id').all());
});

// POST /api/staff (admin)
router.post('/', requireAuth, upload.single('image'), (req, res) => {
  const { name, name_en, role, role_en } = req.body || {};
  if (!name) return res.status(400).json({ error: 'الاسم مطلوب' });
  const image_url = req.file ? `/uploads/${req.file.filename}` : '';
  const maxOrder = db.prepare('SELECT COALESCE(MAX(sort_order),0) AS m FROM staff').get().m;
  const info = db
    .prepare('INSERT INTO staff (name, name_en, role, role_en, image_url, sort_order) VALUES (?,?,?,?,?,?)')
    .run(name, name_en || '', role || '', role_en || '', image_url, maxOrder + 1);
  res.status(201).json(db.prepare('SELECT * FROM staff WHERE id = ?').get(info.lastInsertRowid));
});

// DELETE /api/staff/:id (admin)
router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM staff WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
