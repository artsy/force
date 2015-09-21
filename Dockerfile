FROM node:0.12

RUN mkdir /app
COPY package.json /app/package.json
RUN cd /app && npm install

RUN apt-get update -qq && apt-get install -y rubygems
RUN gem install foreman

COPY . /app

EXPOSE 5000

WORKDIR /app
