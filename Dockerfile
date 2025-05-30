# STEP 1: Build the React app
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# STEP 2: Serve the build with nginx
FROM nginx:alpine

# Copy built app to nginx directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config (optional but recommended)
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
