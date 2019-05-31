FROM node:10.13-alpine

WORKDIR /app

RUN apk --no-cache --quiet add \
      bash \
      build-base \
      curl \
      dumb-init \
      git \
      python && \
      adduser -D -g '' deploy

COPY package.json yarn.lock ./
COPY patches ./patches

RUN yarn install --frozen-lockfile --quiet

COPY . ./

RUN yarn assets && \
    yarn build:server && \
    chown -R deploy:deploy ./

USER deploy

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["yarn", "start"]
