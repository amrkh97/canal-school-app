import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { seedDatabase } from './lib/seed.js';
import authRoutes from './routes/auth.js';
import contentRoutes from './routes/content.js';
import galleryRoutes from './routes/gallery.js';
import messageRoutes from './routes/messages.js';
import newsRoutes from './routes/news.js';
import staffRoutes from './routes/staff.js';
import testimonialRoutes from './routes/testimonials.js';
import applicationRoutes from './routes/applications.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4000;

// Store default content + admin user on startup (safe to run every time).
seedDatabase();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '2mb' }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'canal-school-backend' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/applications', applicationRoutes);

// In a single-container production deploy, the built frontend is copied to
// ../public, so ONE service hosts the whole site (same-origin → no CORS). In
// dev this folder doesn't exist (Vite serves the UI on :5173), so it's skipped.
const publicDir = path.join(__dirname, '..', 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
    res.sendFile(path.join(publicDir, 'index.html'));
  });
  console.log('[server] Serving built frontend from /public');
}

// Multer / generic error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 400).json({ error: err.message || 'حدث خطأ' });
});

app.listen(PORT, () => {
  console.log(`✅ Canal School backend running on http://localhost:${PORT}`);
});
