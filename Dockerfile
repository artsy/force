FROM node:10.13-alpine

WORKDIR /app

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

# Copy files required for installation of application dependencies
COPY package.json yarn.lock ./
COPY patches ./patches

# Install application dependencies
RUN yarn install --frozen-lockfile --quiet

# Copy application code
COPY . ./

# Build application
# Update file/directory permissions
RUN yarn assets && \
    yarn build:server && \
    chown -R deploy:deploy ./

# Switch to less-privileged user
USER deploy

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["yarn", "start"]
