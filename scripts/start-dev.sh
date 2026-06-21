#!/usr/bin/env bash
# ============================================================
#  Run the site WITHOUT Docker (needs Node.js only).
#  Starts the BACKEND and FRONTEND together.
#  Works on macOS, Linux, WSL, and Git Bash on Windows.
#  Site:   http://localhost:5173
#  Admin:  http://localhost:5173/admin/login
#  Press Ctrl+C to stop both.
# ============================================================
set -e
cd "$(dirname "$0")/.."

if ! command -v node >/dev/null 2>&1; then
  echo "[!] Node.js is not installed. Install it from https://nodejs.org first."
  exit 1
fi

echo "[*] Starting the website (installs packages on first run)..."
node dev.mjs
