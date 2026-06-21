import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import db from './lib/db.js';
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
  // index: false so a request for "/" (or any HTML route) is NOT auto-served as
  // the raw index.html here — it falls through to the SPA handler below, which
  // injects live SEO meta. Real files (.css/.js/images/robots.txt/sitemap.xml)
  // are still served verbatim by this middleware.
  app.use(express.static(publicDir, { index: false }));

  const indexPath = path.join(publicDir, 'index.html');

  // SEO: crawlers / link-unfurlers that don't run JS only see the served HTML,
  // so inject the LIVE school name + description from the DB into the static
  // meta. We read index.html ONCE at startup; buildIndexHtml() returns a copy
  // with the title + description tags rewritten. Everything here is wrapped in
  // try/catch and falls back to res.sendFile(index.html), so a DB hiccup or a
  // changed HTML shape can never break the SPA fallback.
  let baseIndexHtml = null;
  try {
    baseIndexHtml = fs.readFileSync(indexPath, 'utf8');
  } catch {
    baseIndexHtml = null; // fall back to sendFile below
  }

  // Escape user-editable text so injecting it into HTML can't break the markup.
  const escapeHtml = (s) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const readContent = (key) => {
    const row = db.prepare('SELECT value FROM content WHERE key = ?').get(key);
    return row ? JSON.parse(row.value) : null;
  };

  // Returns the index HTML with <title> + description meta replaced from the DB,
  // or the untouched base HTML if anything goes wrong.
  const buildIndexHtml = () => {
    if (!baseIndexHtml) return null;
    try {
      const site = readContent('site') || {};
      const hero = readContent('hero') || {};
      const about = readContent('about') || {};

      const ar = site.schoolName;
      const en = site.schoolName_en;
      const name = [ar, en].filter(Boolean).join(' | ');
      const description = hero.subtitle || about.heading || '';
      if (!name && !description) return baseIndexHtml; // nothing useful to inject

      let html = baseIndexHtml;
      if (name) {
        const title = escapeHtml(name);
        html = html
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
          .replace(
            /(<meta\s+property="og:title"\s+content=")[\s\S]*?(")/,
            `$1${title}$2`
          );
      }
      if (description) {
        const desc = escapeHtml(description);
        html = html
          .replace(
            /(<meta\s+name="description"\s+content=")[\s\S]*?(")/,
            `$1${desc}$2`
          )
          .replace(
            /(<meta\s+property="og:description"\s+content=")[\s\S]*?(")/,
            `$1${desc}$2`
          );
      }
      return html;
    } catch {
      return baseIndexHtml;
    }
  };

  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
    // Only rewrite meta for HTML navigations; let express.static keep serving
    // .css/.js/images/etc. above. (Asset requests never reach here because
    // express.static answers them first, but guard on extension just in case.)
    try {
      const isHtmlRequest = !path.extname(req.path) && (req.accepts(['html', 'json']) === 'html');
      if (isHtmlRequest) {
        const html = buildIndexHtml();
        if (html) {
          res.type('html').send(html);
          return;
        }
      }
    } catch {
      // fall through to sendFile
    }
    res.sendFile(indexPath);
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
