FROM node:14-alpine

# ARG NODE_ENV=development

RUN mkdir -p /usr/src/auth/
WORKDIR /usr/src/auth/

# Install Dependencies
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm install

EXPOSE 8080

CMD ["npm", "run", "auth"]
