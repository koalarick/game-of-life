FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install && webpack
EXPOSE 3000
CMD ["node", "server/index.js"]