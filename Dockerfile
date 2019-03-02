FROM node:10.13.0

# The key bits here are making sure we install, libsecret-1-dev libglib2.0-dev
RUN apt-get update -qq && apt-get install -y \
  libsecret-1-dev libglib2.0-dev && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD . /app
WORKDIR /app

RUN rm -f /usr/local/bin/yarn && \
  curl -o- -L https://yarnpkg.com/install.sh | bash && \
  chmod +x ~/.yarn/bin/yarn && \
  ln -s ~/.yarn/bin/yarn /usr/local/bin/yarn

RUN yarn install

RUN yarn assets

# FIXME: Reenable for server-side compilation
# RUN yarn build:server

CMD yarn start
