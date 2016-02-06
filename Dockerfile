FROM node

WORKDIR /app

ADD ./package.json /app/package.json

RUN npm install

ADD ./lib /app/lib
ADD ./index.js /app/index.js
