# Stage 0: Build application
FROM node:22-alpine AS build
WORKDIR /app

# Install dependencies from package-lock.json
COPY package*.json .
RUN npm ci

# Build from source
COPY . .
RUN npm run build

# Stage 1: Create production image
FROM node:22-alpine AS production
WORKDIR /app

# Install only production dependencies
COPY package*.json .
ENV NODE_ENV=production
RUN npm ci --omit dev

# Copy build files from stage 0
COPY --from=build /app/build ./build

# Run build on given port
ENV PORT=4173
EXPOSE 4173
CMD ["node", "build"]
