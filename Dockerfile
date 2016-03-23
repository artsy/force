FROM node:0.12

RUN apt-get update -qq && apt-get install -y rubygems \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY . /app

EXPOSE 5000

WORKDIR /app
RUN npm install

CMD node_modules/.bin/nf start
