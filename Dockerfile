# Base image
FROM node:18-alpine as base
WORKDIR /app
COPY package*.json ./

# Dependencies and build
FROM base as builder
COPY . .
RUN npm ci && npm run build

# Production image
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
USER node
EXPOSE 3000
CMD ["npm", "start"]
