# Build only container
FROM node:24-alpine3.21 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps --force

COPY . .
RUN npm run build

# Output only the dist folder
FROM alpine
WORKDIR /dist
COPY --from=build /app/dist .

VOLUME ["/dist"]

CMD ["/bin/true"]