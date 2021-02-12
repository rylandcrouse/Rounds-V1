FROM node:latest

WORKDIR /app

COPY server/ .
RUN npm install

EXPOSE 8080

ENTRYPOINT ["node", "index.js", "--client", "--io"]
