FROM node:16.3.0-alpine3.13

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

CMD npm run start
