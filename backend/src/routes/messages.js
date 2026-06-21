import { Router } from 'express';
import db from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';

const router = Router();

// POST /api/messages (public) -> visitor contact form
router.post('/', (req, res) => {
  const { name, email, phone, body } = req.body || {};
  if (!name || !email || !body) {
    return res.status(400).json({ error: 'يرجى تعبئة الاسم والبريد والرسالة' });
  }
  const info = db
    .prepare('INSERT INTO messages (name, email, phone, body) VALUES (?, ?, ?, ?)')
    .run(String(name).trim(), String(email).trim(), String(phone || '').trim(), String(body).trim());
  res.status(201).json({ ok: true, id: info.lastInsertRowid });
});

// GET /api/messages (admin) -> inbox
router.get('/', requireAuth, (req, res) => {
  const items = db.prepare('SELECT * FROM messages ORDER BY created_at DESC, id DESC').all();
  const unread = db.prepare('SELECT COUNT(*) AS n FROM messages WHERE is_read = 0').get().n;
  res.json({ items, unread });
});

// PATCH /api/messages/:id/read (admin)
router.patch('/:id/read', requireAuth, (req, res) => {
  db.prepare('UPDATE messages SET is_read = 1 WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// DELETE /api/messages/:id (admin)
router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM messages WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

export default router;
