#!/usr/bin/env bash
# Stops the website containers (your data and images are kept safe).
set -e
cd "$(dirname "$0")/.."
echo "[*] Stopping the site..."
docker compose down
echo "[ok] Stopped. Your content and uploaded photos are saved."
