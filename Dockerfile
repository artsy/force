# syntax=docker/dockerfile:1.3
#              +------------------+
#              |                  |
#              |  builder-base    |
#              |                  |
#              +---------+--------+
#                        ^
#                        |
#                        |
#              +---------+--------+
#              |                  |
#              |  yarn-base       +<------------------------------------------------+
#              |                  |                                                 |
#              +---------+--------+                                                 |
#                        ^                                                          |
#                        |                                                          |
#                        |                                                          |
#              +---------+--------+                                      +----------+-------+
#              |                  |                                      |                  |
#              |  yarn-deps       |                                      |  yarn-deps-prod  |
#              |                  |                                      |                  |
#              +---------+--------+                                      +----------+-------+
#                        ^                                                          ^
#                        |                                                          |
#                        |                                                          |
#              +---------+--------+                                                 |
#              |                  |                                                 |
#              |  builder-src     |<------------------------------+                 |
#              |                  |                               |                 |
#              +---+-----------+--+                               |                 |
#                  ^           ^                                  |                 |
#                  |           |                                  |                 |
#                  |           |                                  |                 |
#  +---------------+--+    +---+--------------+                                     |
#  |                  |    |                  |                                     |
#  |  builder-client  |    |  builder-server  |                                     |
#  |                  |    |                  |                                     |
#  +---------------+--+    +---+--------------+                                     |
#                  ^           ^                                  ^                 |
#                  |           |                                  |                 |
#                  |           |                                  |                 |
#              +---+-----------+--+                               |                 |
#              |                  |-------------------------------+                 |
#              |  builder         +<------------------------------------------+     |
#              |                  |                                           |     |
#              +--------+---------+                                           |     |
#                       ^                                                     |     |
#                       |                                                     |     |
#                       |                                                     |     |
#              +--------+---------+                                       +---+-----+--------+
#              |                  |                                       |                  |
#              |  electron-runner |                                       |  production      |
#              |                  |                                       |                  |
#              +------------------+                                       +------------------+

# ---------------------------------------------------------
# Base build dependencies
# ---------------------------------------------------------
FROM node:18.15.0-alpine3.17 as builder-base

WORKDIR /app

# Install system dependencies
RUN apk --no-cache --quiet add \
  bash \
  build-base \
  curl \
  git

# ---------------------------------------------------------
# Yarn base
# ---------------------------------------------------------
FROM builder-base as yarn-base

# Copy files required for installation of application dependencies
COPY package.json yarn.lock ./
COPY patches ./patches

# ---------------------------------------------------------
# Yarn dependencies
# ---------------------------------------------------------
FROM yarn-base as yarn-deps

RUN --mount=type=cache,id=yarndev,target=/usr/local/share/.cache \
  --mount=type=cache,id=cypress,sharing=locked,target=/root/.cache/Cypress \
  yarn install --frozen-lockfile --quiet

# ---------------------------------------------------------
# Yarn dependencies
# ---------------------------------------------------------
FROM yarn-base as yarn-deps-prod

RUN --mount=type=cache,id=yarnprod,target=/usr/local/share/.cache \
  --mount=type=cache,id=cypress,sharing=locked,target=/root/.cache/Cypress \
  yarn install --production --frozen-lockfile --quiet

# ---------------------------------------------------------
# Builder with source code
# ---------------------------------------------------------
FROM yarn-deps as builder-src

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
  .swcrc.js \
  babel.config.js \
  cypress.config.ts \
  dangerfile.ts \
  jest.config.js \
  package.json \
  relay.config.js \
  tsconfig.json \
  yarn.lock \
  ./

# ---------------------------------------------------------
# Compile client
# ---------------------------------------------------------
FROM builder-src as builder-client

RUN yarn build:client:prod

# ---------------------------------------------------------
# Compile server
# ---------------------------------------------------------
FROM builder-src as builder-server

# Build application
RUN yarn build:server:prod

# ---------------------------------------------------------
# All development assets
# ---------------------------------------------------------
FROM builder-src as builder

# Scripts
COPY ./scripts ./scripts

# Client assets
COPY --from=builder-client /app/manifest.json .
COPY --from=builder-client /app/public ./public
COPY --from=builder-client /app/src ./src

# Server assets
COPY --from=builder-server /app/server.dist.js .
COPY --from=builder-server /app/server.dist.js.map .

# ---------------------------------------------------------
# Image with xvfb to run Electron with a virtual display
# ---------------------------------------------------------
FROM node:18.15.0-bullseye-slim as electron-runner

WORKDIR /app

# Install electron deps
RUN apt-get update && apt-get install -y --no-install-recommends \
  curl \
  libgtk2.0-0 \
  libgtk-3-0 \
  libgbm-dev \
  libnotify-dev \
  libgconf-2-4 \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  xauth \
  xvfb \
  && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app /app

# ---------------------------------------------------------
# Release image
# ---------------------------------------------------------
#
# Release stage. This stage creates the final docker iamge that will be
# released. It contains only production dependencies and artifacts.
#
FROM node:18.15.0-alpine3.17 as production

RUN apk --no-cache --quiet add \
  bash \
  dumb-init \
  && adduser -D -g '' deploy

WORKDIR /app
RUN chown deploy:deploy $(pwd)

USER deploy

# Production node modules.
COPY --chown=deploy:deploy --from=yarn-deps-prod /app/node_modules ./node_modules

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

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

# TODO: Reduce production memory, this is not a concern
CMD ["node", "--max_old_space_size=2048", "--heapsnapshot-signal=SIGUSR2", "--no-experimental-fetch", "./server.dist.js"]
