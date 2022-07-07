FROM node:16

COPY package*.json ./

RUN npm install

ADD . .

EXPOSE 3000

CMD [ "npm","run","dev" ]
