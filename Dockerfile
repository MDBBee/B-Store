# ============================================
# Stage 1: Dependencies Installation Stage
# ============================================

ARG NODE_VERSION=24.13.0-alpine

FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

COPY package.json package-lock.json* ./
COPY prisma ./prisma

RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# ============================================
# Stage 2: Build Next.js Application
# ============================================

FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Use BuildKit secrets for sensitive build-time variables
RUN --mount=type=secret,id=database_url \
    --mount=type=secret,id=resend_api_key \
    --mount=type=secret,id=stripe_secret_key \
    export DATABASE_URL=$(cat /run/secrets/database_url) && \
    export RESEND_API_KEY=$(cat /run/secrets/resend_api_key) && \
    export STRIPE_SECRET_KEY=$(cat /run/secrets/stripe_secret_key) && \
    npx prisma generate && \
    npm run build

# ============================================
# Stage 3: Production Runner (Minimal)
# ============================================

FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Use existing node user in alpine (UID 1000)
USER node

# Copy only necessary files
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/prisma ./prisma

# Copy only Prisma client (not full @prisma folder with engines)
COPY --from=builder --chown=node:node /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=node:node /app/node_modules/@prisma/client ./node_modules/@prisma/client

EXPOSE 3000

CMD ["node", "server.js"]