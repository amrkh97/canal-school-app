import { Router } from 'express';
import db from '../lib/db.js';
import { verifyPassword, signToken, requireAuth, hashPassword } from '../lib/auth.js';

const router = Router();

// POST /api/auth/login  { username, password }
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'يرجى إدخال اسم المستخدم وكلمة المرور' });
  }
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user || !verifyPassword(password, user.password_hash)) {
    return res.status(401).json({ error: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
  }
  const token = signToken(user);
  res.json({ token, user: { id: user.id, username: user.username } });
});

// GET /api/auth/me  (check token validity)
router.get('/me', requireAuth, (req, res) => {
  res.json({ user: { id: req.user.id, username: req.user.username } });
});

// POST /api/auth/change-password  { currentPassword, newPassword }
router.post('/change-password', requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'يرجى إدخال كلمة المرور الحالية والجديدة' });
  }
  if (String(newPassword).length < 6) {
    return res.status(400).json({ error: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل' });
  }
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!user || !verifyPassword(currentPassword, user.password_hash)) {
    return res.status(401).json({ error: 'كلمة المرور الحالية غير صحيحة' });
  }
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hashPassword(newPassword), user.id);
  res.json({ ok: true });
});

export default router;
