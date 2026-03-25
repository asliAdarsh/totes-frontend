FROM node:alpine as build

WORKDIR /app
<<<<<<< HEAD
=======

>>>>>>> 3fdd2a70a47e842d98e557cae32fb754818a89c2
COPY . .
RUN npm install
RUN npm run build

# Debug step (VERY IMPORTANT)
RUN ls -la /app/dist

FROM nginx:alpine

<<<<<<< HEAD
# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom config
COPY nginx.conf /etc/nginx/conf.d/

# Remove default html
RUN rm -rf /usr/share/nginx/html/*

# Copy build
COPY --from=build /app/dist /usr/share/nginx/html
=======
# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html
>>>>>>> 3fdd2a70a47e842d98e557cae32fb754818a89c2
