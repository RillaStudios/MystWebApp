# Build only
FROM node:24-alpine3.21 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Output ends up in /app/dist which is mounted to myst_frontend_dist