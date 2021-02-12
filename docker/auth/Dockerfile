FROM node:15-alpine

# ARG NODE_ENV=development

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

COPY . .
RUN npm install

EXPOSE 8080

CMD ["node", "server/index.js", "--auth"]
