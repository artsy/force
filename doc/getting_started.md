# Getting Started with Force

*Force* is the codename for the desktop web app found at artsy.net.

Before you can set up Force for development you will want to set up [Gravity](https://github.com/artsy/gravity) which will provide the Artsy API Force consumes. This doc will assume you've set up XCode and common development tools after getting started with Gravity.

## Ezel

Read up on [Ezel](http://ezeljs.com/) and familarize yourself with Force concepts by understanding the foundation it was built on.

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

## Install Node Modules

````
npm install
````

Although not necessary, it's recommended to install mocha and coffeescript globally for debugging.

````
npm install mocha -g
npm install coffee-script -g
````

## Run the Server

Make sure Gravity is running on localhost:3000, then run the server, and open force at [localhost:3004](http://localhost:3004).

````
make s
````

Client-side code and templates will automatically reload on page refresh, but server-side code will not automatically reload without restarting the server. If you would like to watch for file changes and restart the server nodemon is a very popular tool.

````
npm install coffeee-script -g
npm install nodemon -g
nodemon index.coffee
````