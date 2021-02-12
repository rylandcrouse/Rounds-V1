FROM node:alpine

FROM node:15-alpine

WORKDIR /app

COPY . .
RUN npm install
RUN npm install -g server

EXPOSE 8080

CMD ["npm", "run", "build", "&&", "npm", "run", "serve"]
