FROM node:10.13-alpine

RUN apk add bash curl git \
  make gcc g++ python \
  libsecret-dev glib-dev && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Set up deploy user and working directory
RUN adduser -D -g '' deploy
RUN mkdir -p /app
RUN chown deploy:deploy /app

WORKDIR /app

# Set up node_modules
ADD package.json /app
ADD yarn.lock /app
RUN yarn cache clean && yarn install

# Add the codebase
ADD --chown=deploy:deploy . /app

# Compile assets
RUN yarn assets
RUN yarn build:server

# Switch to deploy user
USER deploy
ENV USER deploy
ENV HOME /home/deploy

CMD yarn start
