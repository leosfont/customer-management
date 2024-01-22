FROM node:20.8

WORKDIR /var/www

COPY package*.json ./

RUN npm install -g npm@10.3.0

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]