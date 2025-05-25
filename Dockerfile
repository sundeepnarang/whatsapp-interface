FROM  --platform=linux/amd64 node:22

WORKDIR /usr/src/app

COPY .env .env
COPY package*.json ./

RUN npm install

EXPOSE 3005

CMD [ "node", "bin/www" ]
