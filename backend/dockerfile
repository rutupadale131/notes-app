
FROM node:18-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install --only=production


COPY . .


EXPOSE 5501


CMD ["node", "server.js"]
