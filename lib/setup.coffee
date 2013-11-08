# 
# Sets up intial project settings, middleware, mounted apps, and 
# global configuration such as overriding Backbone.sync and 
# populating sharify data
#

{ GRAVITY_URL, NODE_ENV, CLIENT_ID, CLIENT_SECRET, SESSION_SECRET, PORT,
  CDN_URL } = require "../config"
{ parse } = require 'url'
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
  Backbone.sync.editRequest = (req) -> req.set('X-XAPP-TOKEN': sharify.data.GRAVITY_XAPP_TOKEN)
  
  # Setup some initial data for shared modules
  app.use sharify
    GRAVITY_URL: GRAVITY_URL
    JS_EXT: (if "production" is NODE_ENV then ".min.js" else ".js")
    CSS_EXT: (if "production" is NODE_ENV then ".min.css" else ".css")
    CDN_URL: CDN_URL
  
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
    sharifyData: sharify.data
  ) unless app.get('env') is 'test'

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

  # Mount apps
  app.use require "../apps/page"
  
  # More general middleware
  app.use express.static(path.resolve __dirname, "../public")
  
  # Proxy unhandled requests to Gravity using node-http-proxy
  app.use (req, res) ->
    proxy.proxyRequest req, res,
      host: parse(GRAVITY_URL).hostname
      port: parse(GRAVITY_URL).port or 80