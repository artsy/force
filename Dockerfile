FROM node:8.8.1

# Set up deploy user and working directory
RUN adduser --disabled-password --gecos '' deploy
RUN mkdir -p /app

RUN npm i yarn@1.2.1 -g

# Set up node_modules
WORKDIR /tmp
ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn install
RUN mv /tmp/node_modules /app/

# Set up /app and node modules for deploy user
ADD . /app
WORKDIR /app
RUN chown -R deploy:deploy /app

# Switch to deploy user
USER deploy

ENV PORT 5000
EXPOSE 5000

CMD yarn start
