# مدرسة القناة بالمعادي — Canal School Maadi Website

A modern, fully responsive website for Canal School Maadi, rebuilt with **React** on the
front end and a small **Node.js + Express + SQLite** back end. It keeps the original
Arabic (RTL) design and identity, and adds a password-protected **admin panel** where the
school can edit the site content and read messages sent through the contact form — no code
required.

---

## ✨ What it can do

- The same blue & green Arabic homepage as before, now smoother and fully mobile-friendly
  (hero, about + video, photo gallery with lightbox, features, contact form, footer).
- **Admin login** (`/admin/login`) to manage everything:
  - Edit the hero, about section, feature cards, contact details, and footer.
  - Upload and delete gallery photos.
  - Read, mark as read, and delete messages visitors send through the contact form.
- All content and messages are saved in a small **SQLite** database (like the H2 idea —
  a single file, nothing to install or manage).
- Runs with **one command** using Docker, or directly with Node.js for development.

---

## 📁 Project structure

```
canal-school-app/
├─ backend/            Node.js + Express + SQLite API
│  ├─ src/             server, routes, auth, database, seed
│  ├─ seed-assets/     the school's original photos (seeded into the gallery)
│  └─ Dockerfile
├─ frontend/           React app (Vite)
│  ├─ src/             components, pages, admin dashboard
│  ├─ public/          logo, hero image, school tour video
│  ├─ nginx.conf       serves the built site + proxies the API
│  └─ Dockerfile
├─ scripts/            one-click setup & run scripts (Windows + bash)
├─ docker-compose.yml  runs everything together
└─ README.md
```

---

## 🚀 Running it on Windows (your brother's laptop)

### Option A — Docker (recommended, easiest to "just run")

1. Open the `scripts` folder.
2. **Right-click `setup-windows.bat` → Run as administrator.** This installs Node.js and
   Docker Desktop if they're missing. (After Docker installs, restart the PC once and open
   Docker Desktop so it finishes setting up.)
3. Double-click **`scripts\start-docker.bat`**.
4. The browser opens at **http://localhost:8080**. Done.

To stop it later: double-click `scripts\stop-docker.bat`.

### Option B — Without Docker (Node.js only, good for editing/learning)

1. Run `scripts\setup-windows.bat` once (installs Node.js).
2. Double-click **`scripts\start-dev.bat`**.

That single command starts **both** the backend (port 4000) and the frontend (port 5173)
together, installs packages the first time, and opens **http://localhost:5173**. Press
`Ctrl+C` in the window to stop both. (Under the hood it runs `npm run dev` in the project
root.)

> **Note:** the website needs the backend running to log in or send messages — that's why
> `npm run dev` here launches both. Running only `vite`/`npm run dev` inside the `frontend`
> folder starts the frontend alone, which is what causes a `proxy error / ECONNREFUSED` on
> `/api/...`.

### macOS / Linux / WSL

```bash
# With Docker:
./scripts/start-docker.sh        # http://localhost:8080

# Without Docker (Node.js installed) — starts backend + frontend together:
./scripts/start-dev.sh           # http://localhost:5173
#   …or simply:
npm run dev
```

---

## 🔑 Admin panel

| | |
|---|---|
| **Address (Docker)** | http://localhost:8080/admin/login |
| **Address (dev)** | http://localhost:5173/admin/login |
| **Username** | `admin` |
| **Password** | `admin123` |

There's also a small **"دخول الإدارة"** link at the very bottom of the homepage.

> **Change the password before sharing the site.** Edit `JWT_SECRET`, `ADMIN_USERNAME`, and
> `ADMIN_PASSWORD`:
> - **Docker:** copy `.env.example` to `.env` and edit the values, then restart.
> - **Dev:** edit `backend/.env` (copied from `backend/.env.example` on first run).
>
> The admin account is created on first run. If you change the username/password after the
> database already exists, delete `backend/data/` (Docker: `docker compose down -v`) to
> recreate it, or add the new user manually.

---

## 🖼 Adding the school's real photos

The gallery starts with the photos that came with the project. You can pull in **more of
the school's real photos** (from its public directory listing) into the gallery with one
command — they're downloaded and stored **locally** (nothing is hot-linked):

- **Windows:** double-click `scripts\download-photos.bat`
- **Any OS:** `cd backend && npm run photos`

The photos appear in the gallery immediately — just refresh the site (no restart needed). You
can then delete any you don't want from the **admin → معرض الصور** tab, or upload your own.

> Your brother can also just **upload photos directly** in the admin gallery (drag & drop) —
> that's the simplest way to add the school's own pictures.

## 💾 Where the data lives

- **Dev mode:** `backend/data/canal-school.db` and uploaded images in `backend/uploads/`.
- **Docker:** stored in named volumes (`canal-data`, `canal-uploads`) so they survive
  rebuilds. Your content and photos are **not** lost when you stop/start the site.

The default content and the school's original photos are loaded automatically the first
time the backend starts. Anything you change in the admin panel afterward is kept and is
**never** overwritten on later restarts.

---

## 🛠 Tech stack

- **Frontend:** React 18, React Router, Vite, plain CSS (RTL, Cairo font, Font Awesome).
- **Backend:** Node.js, Express, better-sqlite3, JWT auth (bcrypt-hashed passwords), Multer
  for image uploads.
- **Infra:** Docker + docker-compose, nginx serving the built site and proxying `/api`.

---

## 🧰 Useful commands (for developers)

```bash
# Backend only
cd backend && npm install && npm start      # http://localhost:4000
npm run seed                                # (re)seed default content

# Frontend only
cd frontend && npm install && npm run dev   # http://localhost:5173
npm run build                               # production build to dist/

# Docker
docker compose up --build -d                # start
docker compose logs -f                      # watch logs
docker compose down                         # stop
docker compose down -v                      # stop AND wipe data (fresh start)
```

---

## 🌐 Hosting it online for free

See **`HOSTING.md`** for step-by-step options to put the site online for free, including
choices where **no usage charges can ever be incurred** even if the link is shared widely
or attacked.
