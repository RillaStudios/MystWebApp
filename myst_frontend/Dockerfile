# Build Stage
FROM node:24-alpine3.21 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps --force
COPY . .
RUN npm run build

# Production Stage - Serve via Nginx
FROM nginx:alpine

# Remove default nginx static site config
RUN rm -rf /usr/share/nginx/html/*

# Copy built frontend files
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
