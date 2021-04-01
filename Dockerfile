FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install && npm build
EXPOSE 3000
CMD ["node", "server/index.js"]