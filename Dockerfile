FROM node:10.13-alpine

RUN apk add bash curl git \
  make gcc g++ python \
  libsecret-dev glib-dev && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD . /app
WORKDIR /app

# Set up node_modules, sentry for alpine
RUN yarn add @sentry/cli
RUN yarn cache clean && yarn install

# Compile assets
RUN yarn assets
RUN yarn build:server

CMD yarn start
