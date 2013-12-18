#
# Sets up intial project settings, middleware, mounted apps, and
# global configuration such as overriding Backbone.sync and
# populating sharify data
#

{ ARTSY_URL, NODE_ENV, ARTSY_ID, ARTSY_SECRET, SESSION_SECRET, PORT, ASSET_PATH,
  FACEBOOK_APP_NAMESPACE, MOBILE_MEDIA_QUERY, MOBILE_URL, APP_URL, REDIS_URL, DEFAULT_CACHE_TIME,
  SECURE_APP_URL, CANONICAL_MOBILE_URL, IMAGES_URL_PREFIX, SECURE_IMAGES_URL } = config = require "../config"
{ parse, format } = require 'url'
_ = require 'underscore'
express = require "express"
Backbone = require "backbone"
sharify = require "sharify"
path = require "path"
artsyPassport = require 'artsy-passport'
artsyXappMiddlware = require 'artsy-xapp-middleware'
httpProxy = require 'http-proxy'
proxy = new httpProxy.RoutingProxy()
CurrentUser = require '../models/current_user'
backboneCacheSync = require 'backbone-cache-sync'
redirectMobile = require './middleware/redirect_mobile'
localsMiddleware = require './middleware/locals'
helpersMiddleware = require './middleware/helpers'
cors = require 'cors'

module.exports = (app) ->

  # Override Backbone to use server-side sync, inject the XAPP token,
  # add redis caching, and augment sync with Q promises.
  Backbone.sync = require "backbone-super-sync"
  Backbone.sync.editRequest = (req) -> req.set('X-XAPP-TOKEN': artsyXappMiddlware.token)
  backboneCacheSync(Backbone.sync, REDIS_URL, DEFAULT_CACHE_TIME, NODE_ENV) if REDIS_URL
  require('./deferred_sync.coffee')(Backbone, require 'q')

  # Add up front middleware such as redirecting to Martsy and CORS support for login
  app.use redirectMobile

  # Enable CORS with module
  # corsOpts =
  #   origin: [
  #     'http://force.artsy.net'
  #     'https://force.artsy.net'
  #     'http://artsy.net'
  #     'https://artsy.net'
  #     'http://localhost:3003'
  #     'https://localhost:3003'
  #     'http://local.artsy.net:3003'
  #     'https://local.artsy.net:3003'
  #   ]
  # app.options '/users/sign_in', cors(corsOpts)
  # app.use '/users/sign_in', cors(corsOpts)

  # Manual CORS (-__-)
  enableCORS = (req, res, next) ->
    res.set "Access-Control-Allow-Origin", "*"
    res.set "Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"
    res.set "Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With, X-XAPP-TOKEN"
    if "OPTIONS" is req.method
      res.send 200
    else
      next()
  app.use enableCORS

  # Setup Artsy XAPP middleware
  app.use artsyXappMiddlware(
    artsyUrl: ARTSY_URL
    clientId: ARTSY_ID
    clientSecret: ARTSY_SECRET
  ) unless app.get('env') is 'test'

  # Setup Sharify
  app.use sharify
    JS_EXT: (if "production" is NODE_ENV then ".min.js.gz" else ".js")
    CSS_EXT: (if "production" is NODE_ENV then ".min.css.gz" else ".css")
    ASSET_PATH: ASSET_PATH
    APP_URL: APP_URL
    ARTSY_URL: ARTSY_URL
    NODE_ENV: NODE_ENV
    MOBILE_MEDIA_QUERY: MOBILE_MEDIA_QUERY
    CANONICAL_MOBILE_URL: CANONICAL_MOBILE_URL
    MOBILE_URL: MOBILE_URL
    FACEBOOK_APP_NAMESPACE: FACEBOOK_APP_NAMESPACE
    SECURE_APP_URL: SECURE_APP_URL
    SECURE_IMAGES_URL: SECURE_IMAGES_URL
    IMAGES_URL_PREFIX: IMAGES_URL_PREFIX

  # Setup Artsy Passport
  app.use express.cookieParser(SESSION_SECRET)
  app.use express.cookieSession()
  app.use express.bodyParser()
  app.use artsyPassport _.extend(config, CurrentUser: CurrentUser)

  # General
  app.use localsMiddleware
  app.use helpersMiddleware
  app.use express.favicon()
  app.use express.logger('dev')

  # Development
  if "development" is NODE_ENV
    app.use express.errorHandler()
    app.use require("stylus").middleware
      src: path.resolve(__dirname, "../")
      dest: path.resolve(__dirname, "../public")
    app.use require("browserify-dev-middleware")
      src: path.resolve(__dirname, "../")
      transforms: [require("jadeify2"), require('caching-coffeeify')]

  # Test
  if "test" is NODE_ENV
    app.use "/__api", require("../test/helpers/integration.coffee").api

  # Mount apps
  app.use require "../apps/page"
  app.use require "../apps/artist"
  app.use require "../apps/auth"
  app.use require "../apps/about"
  app.use require "../apps/browse"
  app.use require "../apps/order"
  app.use require "../apps/auction_lots"

  # Route to ping for system up
  app.get '/system/up', (req, res) ->
    res.send 200, { nodejs: true }

  # More general middleware
  app.use express.static(path.resolve __dirname, "../public")

  # Proxy unhandled requests to Gravity using node-http-proxy
  app.use (req, res) ->
    proxy.proxyRequest req, res,
      host: parse(ARTSY_URL).hostname
      port: parse(ARTSY_URL).port or 80
