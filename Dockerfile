FROM  --platform=linux/amd64 node:22

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD [ "node", "bin/www" ]
