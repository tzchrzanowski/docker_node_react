# use Node.js to build react app
FROM node:20 AS build

WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

# serve app using nginx

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]