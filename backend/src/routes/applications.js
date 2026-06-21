import { Router } from 'express';
import db from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';

const router = Router();

// POST /api/applications (public) -> parent submits an application
router.post('/', (req, res) => {
  const { student_name, parent_name, phone, email, grade, notes } = req.body || {};
  if (!student_name || !parent_name || !phone) {
    return res.status(400).json({ error: 'اسم الطالب واسم ولي الأمر ورقم الهاتف مطلوبة' });
  }
  const info = db
    .prepare(
      `INSERT INTO applications (student_name, parent_name, phone, email, grade, notes)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(
      String(student_name).trim(),
      String(parent_name).trim(),
      String(phone).trim(),
      String(email || '').trim(),
      String(grade || '').trim(),
      String(notes || '').trim()
    );
  res.status(201).json({ ok: true, id: info.lastInsertRowid });
});

// GET /api/applications (admin)
router.get('/', requireAuth, (req, res) => {
  const items = db.prepare('SELECT * FROM applications ORDER BY created_at DESC, id DESC').all();
  const unread = db.prepare('SELECT COUNT(*) AS n FROM applications WHERE is_read = 0').get().n;
  res.json({ items, unread });
});

// PATCH /api/applications/:id/read (admin)
router.patch('/:id/read', requireAuth, (req, res) => {
  db.prepare('UPDATE applications SET is_read = 1 WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// DELETE /api/applications/:id (admin)
router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM applications WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
