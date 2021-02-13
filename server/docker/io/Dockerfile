FROM node:14-alpine

RUN mkdir -p /usr/src/io/
WORKDIR /usr/src/io/

# Install Dependencies
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "io"]
