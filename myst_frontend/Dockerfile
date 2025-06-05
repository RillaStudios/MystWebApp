# Build only
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Output ends up in /app/dist which is mounted to myst_frontend_dist