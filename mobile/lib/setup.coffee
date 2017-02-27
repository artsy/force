#
# Sets up intial project settings, middleware, mounted apps, and global configuration
# such as overriding Backbone.sync and populating sharify data
#

{ ARTSY_URL, API_URL, APP_URL, SESSION_SECRET, CLIENT_ID, CLIENT_SECRET,
  MAX_SOCKETS, COOKIE_DOMAIN, SESSION_COOKIE_KEY, OPENREDIS_URL,
  NODE_ENV, SESSION_COOKIE_MAX_AGE, EMBEDLY_KEY,
  API_REQUEST_TIMEOUT, DEFAULT_CACHE_TIME } = config = require '../config'
express = require 'express'
path = require 'path'
http = require 'http'
Backbone = require 'backbone'
uuid = require 'node-uuid'
fs = require 'fs'
_ = require 'underscore'
artsyEigenWebAssociation = require 'artsy-eigen-web-association'
artsyError = require 'artsy-error-handler'
artsyXapp = require 'artsy-xapp'
localsMiddleware = require './middleware/locals'
redirectExternalLinks = require './middleware/redirect_external_links.coffee'
marketingSignupModal = require '../components/marketing_signup_modal/middleware'
artsyPassport = require 'artsy-passport'
ensureSSL = require './middleware/ensure_ssl'
hsts = require './middleware/hsts'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
session = require 'cookie-session'
favicon = require 'serve-favicon'
logger = require 'morgan'
helmet = require 'helmet'
cache = require './cache'
bucketAssets = require 'bucket-assets'
sharify = require 'sharify'

require './setup_sharify.coffee'
CurrentUser = require '../models/current_user'

module.exports = (app) ->

  # Increase max sockets. The goal of this is to improve app -> api
  # performance but the downside is it limits client connection reuse with keep-alive
  if typeof MAX_SOCKETS == 'number' and MAX_SOCKETS > 0
    http.globalAgent.maxSockets = MAX_SOCKETS
  else
    http.globalAgent.maxSockets = Number.MAX_VALUE

  # Override backbone sync for server-side requests & allow Redis caching
  sync = Backbone.sync = require "backbone-super-sync"
  Backbone.sync = (method, model, options) ->
    options.headers ?= {}
    options.headers['X-XAPP-TOKEN'] = artsyXapp.token or ''
    sync method, model, options
  Backbone.sync.timeout = API_REQUEST_TIMEOUT
  Backbone.sync.cacheClient = cache.client
  Backbone.sync.defaultCacheTime = DEFAULT_CACHE_TIME

  # Add upfront middleware
  app.use redirectExternalLinks
  app.use sharify
  app.use ensureSSL
  app.use hsts unless app.get('env') is 'test'
  app.use helmet.frameguard() unless app.get('env') is 'test'
  app.use bucketAssets()
  app.use marketingSignupModal

  # Setup Artsy XAPP & Passport middleware for authentication along with the
  # body/cookie parsing middleware needed for that.
  app.use bodyParser.json()
  app.use bodyParser.urlencoded(extended: true)
  app.use cookieParser()
  app.set 'trust proxy', true
  app.use session
    secret: SESSION_SECRET
    domain: COOKIE_DOMAIN
    maxAge: SESSION_COOKIE_MAX_AGE
    name: SESSION_COOKIE_KEY
    # secure uses req.connection.encrypted, but heroku has nginx terminating SSL
    # secureProxy just sets secure=true
    secure: "production" is NODE_ENV or "staging" is NODE_ENV
  app.use artsyPassport
    FACEBOOK_ID: config.FACEBOOK_APP_ID
    FACEBOOK_SECRET: config.FACEBOOK_APP_SECRET
    TWITTER_KEY: config.TWITTER_CONSUMER_KEY
    TWITTER_SECRET: config.TWITTER_CONSUMER_SECRET
    ARTSY_ID: config.CLIENT_ID
    ARTSY_SECRET: config.CLIENT_SECRET
    ARTSY_URL: config.API_URL
    APP_URL: config.APP_URL
    SEGMENT_WRITE_KEY: config.SEGMENT_WRITE_KEY
    CurrentUser: CurrentUser
    signupRedirect: '/personalize'
    XAPP_TOKEN: artsyXapp.token

  # General settings
  app.use logger('dev')
  app.use localsMiddleware
  app.use artsyError.helpers

  # Test settings
  if app.get('env') is 'test'
    app.use '/__gravity', require('antigravity').server
    app.use '/__positron', require('antigravity').positronServer

  # Development settings
  if app.get('env') is 'development'
    app.use require("stylus").middleware
      src: path.resolve(__dirname, "../")
      dest: path.resolve(__dirname, "../public")
    app.use require("browserify-dev-middleware")
      src: path.resolve(__dirname, "../")
      transforms: [require("jadeify"), require('caching-coffeeify')]
    app.get '/local/*', (req, res, next) ->
      res.redirect API_URL + req.url

  # Mount apps
  app.use require '../apps/auth'
  app.use require '../apps/page'
  app.use require '../apps/home'
  app.use require '../apps/unsubscribe'
  app.use require '../apps/fair_organizer'
  app.use require '../apps/contact'
  app.use require '../apps/how_auctions_work'
  app.use require '../apps/profile'
  app.use require '../apps/user'
  # app.use require '../apps/artwork'
  app.use require '../apps/artwork'
  app.use require '../apps/feature'
  app.use require '../apps/gene'
  app.use require '../apps/artists'
  app.use require '../apps/artist'
  app.use require '../apps/partners'
  app.use require '../apps/articles'
  # TODO: Replace with app or more formal middleware once we launch Magazine
  app.get '/post/:id', (req, res, next) ->
    res.redirect "#{ARTSY_URL}/article/#{req.params.id}"
  app.use require '../apps/fair_organizer'
  app.use require '../apps/fair'
  app.use require '../apps/fair_info'
  app.use require '../apps/order'
  app.use require '../apps/tag'
  app.use require '../apps/search'
  app.use require '../apps/show'
  app.use require "../apps/galleries_institutions"
  app.use require "../apps/gallery_partnerships"
  app.use require '../apps/browse'
  app.use require '../apps/notifications'
  app.use require '../apps/partner_profile'
  app.use require '../apps/personalize'
  app.use require '../apps/favorites_following'
  app.use require '../apps/shortcuts'
  app.use require '../apps/art_fairs'
  app.use require '../apps/auctions'
  app.use require '../apps/shows'
  app.use require '../apps/auction'
  app.use require '../apps/auction_support'
  app.use require '../apps/dev'

  # Route to ping for system up
  app.get '/system/up', (req, res) ->
    res.status(200).send { nodejs: true }

  # More general middleware and error handlers
  fs.readdirSync(path.resolve __dirname, '../apps').forEach (fld) ->
    app.use express.static(path.resolve __dirname, "../apps/#{fld}/public")
  app.use express.static path.resolve __dirname, '../public'
  app.use favicon(path.resolve __dirname, '../public/images/favicon.ico')
  app.use '/apple-app-site-association', artsyEigenWebAssociation
  # Support requests for the .well-known subdirectory as well.
  app.use '/(.well-known/)?apple-app-site-association', artsyEigenWebAssociation
