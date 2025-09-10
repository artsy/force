FROM node:22.14.0-alpine as builder-base

WORKDIR /app

RUN apk --no-cache --quiet add \
  bash \
  build-base \
  dumb-init \
  git

# Copy files required to install application dependencies
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY patches ./patches

# Install packages
RUN yarn install --immutable && \
  mv node_modules /opt/node_modules.prod && \
  yarn install --immutable && \
  yarn cache clean

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
FROM node:22.14.0-alpine as production

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
COPY --chown=deploy:deploy --from=builder-base /app/dist ./dist
COPY --chown=deploy:deploy --from=builder-base /app/src ./src
COPY --chown=deploy:deploy --from=builder-base /app/scripts ./scripts
COPY --chown=deploy:deploy --from=builder-base /app/package.json .
COPY --chown=deploy:deploy --from=builder-base /app/yarn.lock .
COPY --chown=deploy:deploy --from=builder-base /app/.yarnrc.yml .
COPY --chown=deploy:deploy --from=builder-base /app/.yarn ./.yarn


ENTRYPOINT ["/usr/bin/dumb-init", "./scripts/load_secrets_and_run.sh"]

ENV NODE_PATH=/app/src

# TODO: Reduce production memory, this is not a concern
CMD ["node", "--max_old_space_size=2048", "--heapsnapshot-signal=SIGUSR2", "--no-experimental-fetch", "-r @swc-node/register", "./src/prod.ts"]
