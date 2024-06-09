FROM node:16

WORKDIR /app2

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "start"]
