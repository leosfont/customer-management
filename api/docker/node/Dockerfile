FROM node:20.8

WORKDIR /var/www

COPY package*.json ./

RUN npm install -g migrate

RUN npm install -g npm@10.3.0

RUN npm install

RUN npm install pg-promise

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
