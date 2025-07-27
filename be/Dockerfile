# be/Dockerfile

FROM node:20

WORKDIR /app

COPY package*.json package-lock.json ./
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
RUN npm install

COPY . .

EXPOSE 5031
CMD ["node", "server.js"]