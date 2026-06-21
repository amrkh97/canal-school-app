#!/usr/bin/env bash
# ============================================================
#  Run the whole site with Docker.
#  Site:   http://localhost:8080
#  Admin:  http://localhost:8080/admin/login
# ============================================================
set -e
cd "$(dirname "$0")/.."

if ! command -v docker >/dev/null 2>&1; then
  echo "[!] Docker is not installed. Get it from https://www.docker.com/products/docker-desktop/"
  exit 1
fi

echo "[*] Building and starting containers (first run takes a few minutes)..."
docker compose up --build -d

echo ""
echo "=========================================================="
echo "  The website is running!"
echo "  Open:        http://localhost:8080"
echo "  Admin login: http://localhost:8080/admin/login"
echo "      username: admin   password: admin123"
echo "  Stop later with:  docker compose down"
echo "=========================================================="
