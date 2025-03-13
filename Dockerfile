FROM cypress/browsers

WORKDIR /angular-app

COPY . .

RUN npm install

