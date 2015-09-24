# Getting Started with Force

*Force* is the codename for the desktop web app found at artsy.net. This doc will assume you've set up XCode and common development tools.

## Install Node.js

It is recommended to use the [nvm](https://github.com/creationix/nvm) tool to manage node versions and install node.

First install NVM

````
curl https://raw.github.com/creationix/nvm/master/install.sh | sh
````

Then install the latest node

````
nvm install 0.10
````

Then tell nvm to use the latest version of node by default and to update your PATH

````
nvm alias default 0.10
````

## Install the Heroku Toolbelt

Visit the [Heroku Toolbelt website](https://toolbelt.heroku.com/) and install the package. This will let you manage staging/production.

## Install [Foreman](https://github.com/ddollar/foreman).
```
gem install foreman
```

## Download the .env file

Force uses a .env file & Foreman to store sensitive config (allowing it to be open source). We have a private force_env.env gist under the Artsy IT Github account. Log in to gists.github.com as Artsy IT to find it, or ask someone on Slack for a link. Once you find the gist write a .env file and copy + paste the env variables into it.

## Install dependencies
```
npm install
```

## Run the Server

Force uses [Gravity](http://github.com/artsy/gravity)'s API. Simply run

````
make ss
````

to start Force pointing to Gravity's staging API.

-------

## Optional

### Global Node Modules

Although not necessary, it's recommended to install mocha and coffeescript globally for debugging.

````
npm install mocha -g
npm install coffee-script -g
````

### Local Gravity

 Follow Gravity's [getting started](https://github.com/artsy/gravity/blob/master/doc/GettingStarted.md) to set it up locally and run on `http://localhost:3000`. Then run Force via `foreman start`.

### Code auto-reloading

Client-side code reloads on refresh, however server-side code doesn't come with the nice auto-code-reload stuff you might be used to in Rails. Node's recommended solution is a watcher tool like [nodemon](https://github.com/remy/nodemon). Use at your own risk/convenience.
