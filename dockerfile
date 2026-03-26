# Stage 1: Build stage
FROM node:alpine as build

# 1. Declare ARG at the top so it's available for all steps
ARG VITE_API_URL
# 2. Assign it to ENV so the 'npm run build' process picks it up
ENV VITE_API_URL=$VITE_API_URL

WORKDIR /app

# Debug step: This will print the URL in your GitHub Action logs
RUN echo "THE API URL IS: $VITE_API_URL"

# Install dependencies separately to leverage Docker caching
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Now run build—Vite will bake the ENV variable into the JS files
RUN npm run build

# Stage 2: Serve stage
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]