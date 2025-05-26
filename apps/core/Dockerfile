FROM node:18-alpine

WORKDIR /app

# Copy root files required for installing deps
COPY package*.json nx.json tsconfig.base.json eslint.config.mjs ./
COPY libs ./libs
COPY apps/core ./apps/core

# Install dependencies (we assume package-lock.json exists)
RUN npm ci

# Build the NestJS app
RUN npx nx build core

# Run the built output
CMD ["node", "dist/apps/core/main"]
