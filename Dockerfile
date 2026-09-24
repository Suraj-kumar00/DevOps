# syntax=docker/dockerfile:1
#
# Production image for the Next.js standalone server.
# Based on the official Next.js "with-docker" example:
# https://github.com/vercel/next.js/tree/canary/examples/with-docker
#
# Node 24 is the active LTS line. The floating `24-slim` tag picks up security patches on
# every rebuild. For fully reproducible builds, pin an exact version (for example
# `24.21.0-slim`); Dependabot then proposes bumps for it.
ARG NODE_VERSION=24-slim

# ---- 1. Install dependencies from the lockfile ----
FROM node:${NODE_VERSION} AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# ---- 2. Build the standalone output ----
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
# Public URL baked into statically generated pages (sitemap, canonical URLs, Open Graph).
ARG SITE_URL=""
ENV NEXT_TELEMETRY_DISABLED=1 \
    SITE_URL=${SITE_URL}
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- 3. Minimal runtime image ----
FROM node:${NODE_VERSION} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/public ./public
# Writable directory for the prerender (ISR) cache.
RUN mkdir .next && chown node:node .next
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000

# /api/health does no I/O, so it only fails when the server itself is down.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/api/health').then((r) => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"]

CMD ["node", "server.js"]
