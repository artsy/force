FROM node:6.10
RUN apt-get update -qq && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Set up working directory
RUN mkdir /app

# Set up node modules
WORKDIR /tmp
ADD package.json package.json
ADD yarn.lock yarn.lock
RUN npm i yarn -g
RUN yarn install
RUN cp -a /tmp/node_modules /app/

# Finally, add the rest of our app's code
# (this is done at the end so that changes to our app's code
# don't bust Docker's cache)
ADD . /app
WORKDIR /app

ENV PORT 5000
EXPOSE 5000

CMD yarn start
