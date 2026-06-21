# Single-container build: the React frontend served BY the Node backend, so the
# whole site runs as ONE service (ideal for free one-service hosts like Render).
# For local dev use `node dev.mjs`; for a local 2-container run use docker compose.

# ---- Stage 1: build the frontend ----
FROM node:22-bookworm-slim AS web
WORKDIR /web
COPY frontend/package*.json ./
RUN npm install --no-audit --no-fund
COPY frontend/ ./
RUN npm run build

# ---- Stage 2: backend + the built frontend ----
FROM node:22-bookworm-slim
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --omit=dev --no-audit --no-fund
COPY backend/ ./
# server.js serves this folder when it exists (same-origin, no CORS).
COPY --from=web /web/dist ./public
RUN mkdir -p data uploads
ENV NODE_ENV=production
# The host (e.g. Render) injects PORT; server.js falls back to 4000 locally.
EXPOSE 4000
CMD ["node", "src/server.js"]
