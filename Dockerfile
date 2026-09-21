# ============================================================================
# Stage 1 — build SPA (Vite) menjadi /app/dist
# ============================================================================
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# ============================================================================
# Stage 2 — runtime: Express menyajikan SPA (dist) + API ber-gate
# ============================================================================
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

# install dependency backend saja (produksi)
COPY server/package.json server/package-lock.json* ./
RUN npm ci --omit=dev

# kode server + data/gambar terkunci
COPY server/server.js ./
COPY server/protected-data ./protected-data
COPY server/protected-assets ./protected-assets

# hasil build SPA dari stage 1
COPY --from=builder /app/dist ./dist

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=8s --retries=3 \
  CMD wget -qO- http://localhost:8080/api/me || exit 1

CMD ["node", "server.js"]
