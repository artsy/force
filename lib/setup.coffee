#
# Sets up intial project settings, middleware, mounted apps, and
# global configuration such as overriding Backbone.sync and
# populating sharify data
#

{ GRAVITY_URL, NODE_ENV, CLIENT_ID, CLIENT_SECRET, SESSION_SECRET, PORT,
  ASSET_PATH, FACEBOOK_APP_NAMESPACE, MOBILE_MEDIA_QUERY, CANONICAL_MOBILE_URL } = require "../config"
{ parse, format } = require 'url'
express = require "express"
Backbone = require "backbone"
sharify = require "sharify"
path = require "path"
artsyXappMiddlware = require 'artsy-xapp-middleware'
httpProxy = require 'http-proxy'
proxy = new httpProxy.RoutingProxy()

module.exports = (app) ->

  # Override Backbone to use server-side sync
  Backbone.sync = require "backbone-super-sync"
  Backbone.sync.editRequest = (req) -> req.set('X-XAPP-TOKEN': artsyXappMiddlware.token)
  # Augment sync with Q promises
  require('./deferred-sync.coffee')(Backbone, require 'q')

  # General settings
  app.use express.favicon()
  app.use express.logger('dev')
  app.use express.bodyParser()
  app.use express.cookieParser(SESSION_SECRET)
  app.use express.cookieSession()
  app.use artsyXappMiddlware(
    artsyUrl: GRAVITY_URL
    clientId: CLIENT_ID
    clientSecret: CLIENT_SECRET
  ) unless app.get('env') is 'test'

  # Setup some initial data for shared modules
  app.use sharify
    GRAVITY_URL: GRAVITY_URL
    JS_EXT: (if "production" is NODE_ENV then ".min.js.gz" else ".js")
    CSS_EXT: (if "production" is NODE_ENV then ".min.css.gz" else ".css")
    ASSET_PATH: ASSET_PATH
    MOBILE_MEDIA_QUERY: MOBILE_MEDIA_QUERY
    CANONICAL_MOBILE_URL: CANONICAL_MOBILE_URL
    FACEBOOK_APP_NAMESPACE: FACEBOOK_APP_NAMESPACE

  # Development only
  if "development" is NODE_ENV
    app.use express.errorHandler()
    # Compile assets on request in development
    app.use require("stylus").middleware
      src: path.resolve(__dirname, "../")
      dest: path.resolve(__dirname, "../public")
    app.use require("browserify-dev-middleware")
      src: path.resolve(__dirname, "../")
      transforms: [require("jadeify2"), require('caching-coffeeify')]

  # Test only
  if "test" is NODE_ENV
    # Mount fake API server
    app.use "/__api", require("../test/helpers/integration.coffee").api

  # Router helper methods
  app.use (req, res, next) ->
    res.backboneError = (m, e) -> next e.text
    next()

  # Adjust the asset path if the request came from SSL
  app.use (req, res, next) ->
    pathObj = parse res.locals.sd.ASSET_PATH
    pathObj.protocol = if req.get('X-Forwarded-Proto') is 'https' then 'https' else 'http'
    res.locals.sd.ASSET_PATH = format(pathObj)
    next()

  # Set the xapp token in locals
  app.use (req, res, next) ->
    res.locals.sd.GRAVITY_XAPP_TOKEN = res.locals.artsyXappToken
    next()

  # Mount apps
  app.use require "../apps/page"
  app.use require "../apps/artist"
  # app.use require "../apps/auth"
  app.use require "../apps/about"
  app.use require "../apps/browse"

  # More general middleware
  app.use express.static(path.resolve __dirname, "../public")

  app.get '/system/up', (req, res) ->
    res.send 200, { status: 'OK' }

  # Proxy unhandled requests to Gravity using node-http-proxy
  app.use (req, res) ->
    proxy.proxyRequest req, res,
      host: parse(GRAVITY_URL).hostname
      port: parse(GRAVITY_URL).port or 80
