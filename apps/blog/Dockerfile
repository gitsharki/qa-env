FROM node:18-alpine

WORKDIR /app

# Copy root-level files needed to install dependencies
COPY package*.json nx.json tsconfig.base.json ./
COPY eslint.config.mjs ./
COPY libs ./libs
COPY apps/blog ./apps/blog

# Install dependencies
RUN npm ci

# Build the Next.js app
RUN npx nx build blog

# Expose and run
EXPOSE 3001
#CMD ["npx", "nx", "serve", "blog"]
CMD ["npx", "next", "start", "dist/apps/blog"]
