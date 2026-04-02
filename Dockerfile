# Stage 1: build the application
FROM node:18-alpine AS builder

# set workdir
WORKDIR /app

# copy package definitions and install deps first for better caching
COPY package.json package-lock.json* yarn.lock* ./

# install dependencies
RUN npm ci --production=false

# copy all source files
COPY . .

# build the static assets
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:alpine

# remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# expose port (default nginx listens on 80)
EXPOSE 80

# healthcheck (optional)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

# run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
