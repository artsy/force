FROM bitnami/node:8

RUN npm install -g yarn@1.5.1

ADD . /app

WORKDIR /app
RUN yarn install

CMD yarn start