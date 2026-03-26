FROM node:alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Debug step (VERY IMPORTANT)
RUN ls -la /app/dist

FROM nginx:alpine

# Remove default config (local changes)
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom config (local changes)
COPY nginx.conf /etc/nginx/conf.d/

# Remove default html (both local and remote)
RUN rm -rf /usr/share/nginx/html/*

# Copy build
COPY --from=build /app/dist /usr/share/nginx/html
