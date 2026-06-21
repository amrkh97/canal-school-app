# Backend: Node + Express + SQLite
FROM node:22-bookworm-slim

# Node 22 LTS ships better-sqlite3 prebuilt binaries, so no compiler needed.
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY . .

# Persisted data + uploaded images live in volumes (see docker-compose.yml)
RUN mkdir -p data uploads

ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000

CMD ["node", "src/server.js"]
