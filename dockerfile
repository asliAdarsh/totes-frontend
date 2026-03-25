FROM node:alpine as build

WORKDIR /app

# Accept the API URL argument from docker-compose so Vite can bundle it!
ARG VITE_FASTAPI_URL
ENV VITE_FASTAPI_URL=$VITE_FASTAPI_URL

COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html