FROM node:18.15-alpine as builder-base

WORKDIR /app

RUN apk --no-cache --quiet add \
  bash \
  build-base \
  dumb-init \
  git

# Copy files required to install application dependencies
COPY package.json yarn.lock ./
COPY patches ./patches

# Install packages
RUN yarn install --production --frozen-lockfile --quiet && \
  mv node_modules /opt/node_modules.prod && \
  yarn install --frozen-lockfile --quiet && \
  yarn cache clean --force

# Copy application code
COPY  . ./

RUN yarn build

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
COPY --chown=deploy:deploy --from=builder-base /opt/node_modules.prod ./node_modules

# Base code
COPY --chown=deploy:deploy --from=builder-base /app/data ./data
COPY --chown=deploy:deploy --from=builder-base /app/package.json .
COPY --chown=deploy:deploy --from=builder-base /app/scripts ./scripts
COPY --chown=deploy:deploy --from=builder-base /app/webpack ./webpack
COPY --chown=deploy:deploy --from=builder-base /app/yarn.lock .

# Client assets
COPY --chown=deploy:deploy --from=builder-base /app/manifest.json .
COPY --chown=deploy:deploy --from=builder-base /app/public ./public
COPY --chown=deploy:deploy --from=builder-base /app/src ./src

# Server assets
COPY --chown=deploy:deploy --from=builder-base /app/server.dist.js .
COPY --chown=deploy:deploy --from=builder-base /app/server.dist.js.map .

ENTRYPOINT ["/usr/bin/dumb-init", "./load_secrets_and_run.sh"]

# TODO: Reduce production memory, this is not a concern
CMD ["node", "--max_old_space_size=2048", "--heapsnapshot-signal=SIGUSR2", "--no-experimental-fetch", "./server.dist.js"]
