FROM bitnami/node:8

#install_packages procps git openssh

RUN npm install -g yarn@1.5.1

ADD . /app

WORKDIR /app
RUN yarn install

CMD yarn start
