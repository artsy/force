FROM node:0.12

RUN apt-get update -qq && apt-get install -y rubygems \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN gem install foreman

COPY . /app

EXPOSE 5000

WORKDIR /app
RUN npm install

CMD foreman start
