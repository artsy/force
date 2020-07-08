# ---------------------------------------------------------
# Base build dependencies
# ---------------------------------------------------------
FROM node:12.14-alpine as builder-base

WORKDIR /app

# Install system dependencies
RUN apk --no-cache --quiet add \
      bash \
      build-base \
      curl \
      git \
      python

# ---------------------------------------------------------
# Yarn base
# ---------------------------------------------------------
FROM builder-base as yarn-base

# Copy files required for installation of application dependencies
COPY package.json yarn.lock ./
COPY patches ./patches

# ---------------------------------------------------------
# Yarn development dependencies
# ---------------------------------------------------------
FROM yarn-base as yarn-development-deps

RUN yarn install --frozen-lockfile --quiet \
 && yarn cache clean --force

# ---------------------------------------------------------
# Yarn production dependencies
# ---------------------------------------------------------
FROM yarn-base as yarn-production-deps

RUN yarn install --production --frozen-lockfile --quiet \
      && yarn cache clean --force

# ---------------------------------------------------------
# Builder with source code
# ---------------------------------------------------------
FROM yarn-development-deps as builder-src

# Copy application code
COPY __mocks__ ./__mocks__
COPY cypress ./cypress
COPY data ./data
COPY patches ./patches
COPY src ./src
COPY webpack ./webpack
COPY .env.oss \
  .env.test \
  .eslintrc.js \
  .nvmrc \
  .prettierignore \
  apollo.config.js \
  babel.config.js \
  coffeelint.json \
  cypress.json \
  dangerfile.ts \
  jest.config.js \
  package.json \
  relay.config.js \
  renovate.json \
  test.config.js \
  test.mocha.js \
  tsconfig.json \
  yarn.lock \
  ./

# ---------------------------------------------------------
# Compile assets
# ---------------------------------------------------------
FROM builder-src as builder-assets

# Build application
RUN yarn assets

# ---------------------------------------------------------
# Compile server
# ---------------------------------------------------------
FROM builder-src as builder-server

# Build application
RUN yarn build:server

# ---------------------------------------------------------
# All development assets
# ---------------------------------------------------------
FROM builder-src as builder

# Scripts
COPY ./scripts ./scripts

# Client assets
COPY --from=builder-assets /app/manifest.json .
COPY --from=builder-assets /app/public ./public
COPY --from=builder-assets /app/src ./src

# Server assets
COPY --from=builder-server /app/server.dist.js .
COPY --from=builder-server /app/server.dist.js.map .

# ---------------------------------------------------------
# Release image
# ---------------------------------------------------------
#
# Release stage. This stage creates the final docker iamge that will be
# released. It contains only production dependencies and artifacts.
#
# TODO: Make the COPY steps more explicit, the iamge still copies in the all raw
# sources and configuration.
#
FROM node:12.14-alpine as release

RUN apk --no-cache --quiet add \
  bash \
  dumb-init \
  && adduser -D -g '' deploy

WORKDIR /app
RUN chown deploy:deploy $(pwd)

USER deploy

# Base code
COPY --chown=deploy:deploy --from=builder /app/data ./data
COPY --chown=deploy:deploy --from=builder /app/package.json .
COPY --chown=deploy:deploy --from=builder /app/scripts ./scripts
COPY --chown=deploy:deploy --from=builder /app/webpack ./webpack
COPY --chown=deploy:deploy --from=builder /app/yarn.lock .

# Client assets
COPY --chown=deploy:deploy --from=builder /app/manifest.json .
COPY --chown=deploy:deploy --from=builder /app/public ./public
COPY --chown=deploy:deploy --from=builder /app/src ./src

# Server assets
COPY --chown=deploy:deploy --from=builder /app/server.dist.js .
COPY --chown=deploy:deploy --from=builder /app/server.dist.js.map .


# Production node modules.
COPY --chown=deploy:deploy --from=yarn-production-deps /app/node_modules ./node_modules

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["yarn", "start"]
