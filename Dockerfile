FROM node:10.13-alpine

# Install required libraries
RUN apk --no-cache add bash curl git \
  make gcc g++ python \
  libsecret-dev glib-dev

# Set up deploy user and working directory
RUN adduser -D -g '' deploy
RUN mkdir -p /app
RUN chown deploy:deploy /app

# Set up dumb-init
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64 /usr/local/bin/dumb-init
RUN chown deploy:deploy /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

# Copy required libs and files to /app
ADD . /app
ADD package.json /app
ADD yarn.lock /app
WORKDIR /app

# Set up node_modules
RUN yarn cache clean && yarn install

# Copy over node_modules
ADD --chown=deploy:deploy . /app

# Compile assets
RUN yarn assets
RUN yarn build:server

# Switch to deploy user
USER deploy
ENV USER deploy
ENV HOME /home/deploy

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
CMD ["yarn", "start"]
