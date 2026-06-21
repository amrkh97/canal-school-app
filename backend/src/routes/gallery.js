import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import db from '../lib/db.js';
import { requireAuth } from '../lib/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `img-${Date.now()}-${Math.round(Math.random() * 1e6)}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8 MB
  fileFilter: (req, file, cb) => {
    if (/^image\//.test(file.mimetype)) cb(null, true);
    else cb(new Error('يُسمح بملفات الصور فقط'));
  },
});

const router = Router();

// GET /api/gallery (public)
router.get('/', (req, res) => {
  const items = db
    .prepare('SELECT id, image_url, caption, caption_en FROM gallery ORDER BY sort_order, id')
    .all();
  res.json(items);
});

// POST /api/gallery (admin) -> upload a new photo  [field name: "image"]
router.post('/', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'لم يتم رفع أي صورة' });
  const caption = req.body.caption || '';
  const caption_en = req.body.caption_en || '';
  const maxOrder = db.prepare('SELECT COALESCE(MAX(sort_order), 0) AS m FROM gallery').get().m;
  const image_url = `/uploads/${req.file.filename}`;
  const info = db
    .prepare('INSERT INTO gallery (image_url, caption, caption_en, sort_order) VALUES (?, ?, ?, ?)')
    .run(image_url, caption, caption_en, maxOrder + 1);
  res.status(201).json({ id: info.lastInsertRowid, image_url, caption, caption_en });
});

// DELETE /api/gallery/:id (admin)
router.delete('/:id', requireAuth, (req, res) => {
  const item = db.prepare('SELECT * FROM gallery WHERE id = ?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'الصورة غير موجودة' });
  db.prepare('DELETE FROM gallery WHERE id = ?').run(req.params.id);
  // Remove the file from disk if it lives in our uploads folder.
  const filename = path.basename(item.image_url);
  const filePath = path.join(uploadsDir, filename);
  if (item.image_url.startsWith('/uploads/') && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  res.json({ ok: true });
});

export default router;
