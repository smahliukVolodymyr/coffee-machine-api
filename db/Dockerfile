FROM node:16

WORKDIR /app

COPY ./dbInit.js .
COPY ./package.json .
RUN npm install

CMD [ "npm","start" ]
