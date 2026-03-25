FROM node:alpine as build

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

# Debug step (VERY IMPORTANT)
RUN ls -la /app/dist

FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html
