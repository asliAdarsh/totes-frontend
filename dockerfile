FROM node:alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom config
COPY nginx.conf /etc/nginx/conf.d/

# Remove default html
RUN rm -rf /usr/share/nginx/html/*

# Copy build
COPY --from=build /app/dist /usr/share/nginx/html