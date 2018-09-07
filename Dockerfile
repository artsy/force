FROM node:8.11.3
ARG commit_hash

# The key bits here are making sure we install, libsecret-1-dev libglib2.0-dev
RUN apt-get update -qq && apt-get install -y \
  libsecret-1-dev libglib2.0-dev && \
  rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD . /app
WORKDIR /app

RUN echo ${commit_hash} > COMMIT_HASH.txt

RUN rm -f /usr/local/bin/yarn && \
  curl -o- -L https://yarnpkg.com/install.sh | bash && \
  chmod +x ~/.yarn/bin/yarn && \
  ln -s ~/.yarn/bin/yarn /usr/local/bin/yarn
RUN yarn install

CMD yarn start
