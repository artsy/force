FROM node:12.14-alpine

# Install system dependencies
# Add deploy user
RUN apk --no-cache --quiet add \
      bash \
      build-base \
      curl \
      dumb-init \
      git \
      python && \
      adduser -D -g '' deploy

WORKDIR /app

# Set the correct owner on the /app
RUN chown deploy:deploy $(pwd)

# Switch to less-privileged user, do this early to ensure files are created
# with proper ownership.
USER deploy

# Copy files required for installation of application dependencies
COPY --chown=deploy:deploy package.json yarn.lock ./
COPY --chown=deploy:deploy patches ./patches

# Install application dependencies
RUN yarn install --frozen-lockfile --quiet && \
  yarn cache clean --force

# Copy application code
COPY --chown=deploy:deploy . ./

# Build application
RUN yarn assets && \
    yarn build:server

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["yarn", "start"]
