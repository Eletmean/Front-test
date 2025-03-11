FROM node:18

WORKDIR /angular-app

COPY . .

RUN npm install