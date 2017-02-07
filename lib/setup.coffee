#
# Sets up intial project settings, middleware, mounted apps, and
# global configuration such as overriding Backbone.sync and
# populating sharify data
#

{
  API_URL,
  APP_URL,
  NODE_ENV,
  ARTSY_ID,
  ARTSY_SECRET,
  SESSION_SECRET,
  SESSION_COOKIE_MAX_AGE,
  MOBILE_URL,
  DEFAULT_CACHE_TIME,
  COOKIE_DOMAIN,
  AUTO_GRAVITY_LOGIN,
  SESSION_COOKIE_KEY,
  API_REQUEST_TIMEOUT,
  FUSION_URL,
  IP_BLACKLIST,
  REQUEST_LIMIT,
  REQUEST_EXPIRE_MS,
  LOGGER_FORMAT,
  OPENREDIS_URL
} = config = require "../config"
{ parse, format } = require 'url'
_ = require 'underscore'
express = require "express"
Backbone = require "backbone"
sharify = require "sharify"
http = require 'http'
path = require 'path'
cors = require 'cors'
artsyPassport = require 'artsy-passport'
artsyEigenWebAssociation = require 'artsy-eigen-web-association'
redirectMobile = require './middleware/redirect_mobile'
proxyGravity = require './middleware/proxy_to_gravity'
proxyReflection = require './middleware/proxy_to_reflection'
localsMiddleware = require './middleware/locals'
ensureSSL = require './middleware/ensure_ssl'
ensureWWW = require './middleware/ensure_www'
escapedFragmentMiddleware = require './middleware/escaped_fragment'
sameOriginMiddleware = require './middleware/same_origin'
hstsMiddleware = require './middleware/hsts'
unsupportedBrowserCheck = require './middleware/unsupported_browser'
flash = require 'connect-flash'
flashMiddleware = require './middleware/flash'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
session = require 'cookie-session'
favicon = require 'serve-favicon'
logger = require 'morgan'
artsyXapp = require 'artsy-xapp'
fs = require 'fs'
artsyError = require 'artsy-error-handler'
cache = require './cache'
timeout = require 'connect-timeout'
bucketAssets = require 'bucket-assets'
splitTestMiddleware = require '../components/split_test/middleware'
hardcodedRedirects = require './routers/hardcoded_redirects'
require './setup_sharify.coffee'
CurrentUser = require '../models/current_user'
downcase = require './middleware/downcase'
ipfilter = require('express-ipfilter').IpFilter

module.exports = (app) ->
  app.use ipfilter([IP_BLACKLIST.split(',')], log: false, mode: 'deny')

  # rate limited
  if OPENREDIS_URL
    limiter = require('express-limiter')(app, cache.client)
    limiter
      path: '*'
      method: 'all'
      lookup: ['headers.x-forwarded-for']
      total: REQUEST_LIMIT
      expire: REQUEST_EXPIRE_MS
      onRateLimited: (req, res, next) ->
        console.log 'Rate limit exceeded for', req.headers['x-forwarded-for']
        next()

  app.use require '../apps/blank'

  # Increase max sockets. The goal of this is to improve app -> api
  # performance but the downside is it limits client connection reuse with keep-alive
  if typeof MAX_SOCKETS == 'number' and MAX_SOCKETS > 0
    http.globalAgent.maxSockets = MAX_SOCKETS
  else
    http.globalAgent.maxSockets = Number.MAX_VALUE

  # Override Backbone to use server-side sync, inject the XAPP token,
  # add redis caching, and augment sync with Q promises.
  sync = require "backbone-super-sync"
  sync.timeout = API_REQUEST_TIMEOUT
  sync.cacheClient = cache.client
  sync.defaultCacheTime = DEFAULT_CACHE_TIME
  Backbone.sync = (method, model, options) ->
    options.headers ?= {}
    options.headers['X-XAPP-TOKEN'] = artsyXapp.token or ''
    sync method, model, options

  # Inject sharify data before anything
  app.use sharify

  # Development / Test only middlewares that compile assets, mount antigravity, and
  # allow a back door to log in for tests.
  if "development" is NODE_ENV
    app.use require("stylus").middleware
      src: path.resolve(__dirname, "../")
      dest: path.resolve(__dirname, "../public")
    app.use require("browserify-dev-middleware")
      src: path.resolve(__dirname, "../")
      transforms: [require("jadeify"), require('caching-coffeeify'), require('babelify')]
      insertGlobals: true
  if "test" is NODE_ENV
    app.use (req, res, next) ->
      return next() unless req.query['test-login']
      req.user = new CurrentUser(
        require('antigravity').fabricate('user', accessToken: 'footoken')
      )
      next()
    app.use "/__gravity", require("antigravity").server

  # Body parser has to be after proxy middleware for
  # node-http-proxy to work with POST/PUT/DELETE
  app.all '/api*', proxyGravity.api

  # Setup Passport middleware for authentication along with the
  # body/cookie parsing middleware needed for that.
  app.use bodyParser.json()
  app.use bodyParser.urlencoded(extended: true)
  app.use cookieParser()
  app.use session
    cookie: secure: true
    secret: SESSION_SECRET
    domain: COOKIE_DOMAIN
    key: SESSION_COOKIE_KEY
    maxage: SESSION_COOKIE_MAX_AGE
    # secure uses req.connection.encrypted, but heroku has nginx terminating SSL
    # secureProxy just sets secure=true
    secureProxy: "production" is NODE_ENV or "staging" is NODE_ENV

  # We want the user to be able to log-in to force via the microgravity subdomain
  # the initial use case being the professional buyer application
  # (this is specific to responsive pages that require log-in)
  app.use cors origin: [APP_URL, MOBILE_URL, /\.artsy\.net$/]

  app.use artsyPassport _.extend config,
    CurrentUser: CurrentUser
    ARTSY_URL: API_URL
    userKeys:[
      'id', 'type', 'name', 'email', 'phone', 'lab_features',
      'default_profile_id', 'has_partner_access', 'collector_level', 'paddle_number'
    ]

  # Static file middleware above apps & redirects to ensure we don't try to
  # fetch /assets/:pkg.js in an attempt to check for profile or redirect assets
  # fetches to the mobile website for responsive pages.
  fs.readdirSync(path.resolve __dirname, '../apps').forEach (fld) ->
    app.use express.static(path.resolve __dirname, "../apps/#{fld}/public")
  fs.readdirSync(path.resolve __dirname, '../components').forEach (fld) ->
    app.use express.static(path.resolve __dirname, "../components/#{fld}/public")
  app.use favicon(path.resolve __dirname, '../public/images/favicon.ico')
  app.use express.static(path.resolve __dirname, '../public')
  app.use '/(.well-known/)?apple-app-site-association', artsyEigenWebAssociation

  # Proxy / redirect requests before they even have to deal with Force routing
  # (This must be after the auth middleware to be able to proxy auth routes)
  app.use downcase
  app.use hardcodedRedirects
  app.use redirectMobile
  app.use proxyReflection
  app.use ensureSSL
  app.use ensureWWW

  # General helpers and express middleware
  app.use bucketAssets()
  app.use flash()
  app.use flashMiddleware
  app.use localsMiddleware
  app.use artsyError.helpers
  app.use sameOriginMiddleware
  app.use hstsMiddleware
  app.use escapedFragmentMiddleware
  app.use logger LOGGER_FORMAT
  app.use unsupportedBrowserCheck
  app.use splitTestMiddleware

  # Mount apps

  # Apps with hardcoded routes or "RESTful" routes
  app.use require "../apps/home"
  app.use require "../apps/editorial_features"
  app.use require "../apps/apply"
  app.use require "../apps/auctions"
  app.use require "../apps/artist"
  app.use require "../apps/artists"
  app.use require "../apps/auction_lots"
  app.use require "../apps/artwork_purchase"
  app.use require "../apps/artwork"
  app.use require "../apps/about"
  app.use require "../apps/collect"
  app.use require "../apps/categories"
  app.use require "../apps/categories2"
  app.use require "../apps/consignments"
  app.use require "../apps/contact"
  app.use require "../apps/eoy_2016"
  app.use require "../apps/how_auctions_work"
  app.use require "../apps/inquiry"
  app.use require "../apps/fairs"
  app.use require "../apps/flash"
  app.use require "../apps/partnerships"
  app.use require "../apps/gene"
  app.use require "../apps/geo"
  app.use require "../apps/jobs"
  app.use require "../apps/notifications"
  app.use require "../apps/order"
  app.use require "../apps/personalize"
  app.use require "../apps/press"
  app.use require "../apps/pro_buyer"
  app.use require "../apps/search"
  app.use require "../apps/show"
  app.use require "../apps/shows"
  app.use require "../apps/tag"
  app.use require "../apps/unsubscribe"
  app.use require "../apps/unsupported_browser"
  app.use require "../apps/style_guide"
  app.use require "../apps/auth"
  app.use require "../apps/static"
  app.use require "../apps/clear_cache"
  app.use require "../apps/sitemaps"
  app.use require "../apps/rss"
  app.use require '../apps/dev'
  app.use require "../apps/article"

  # Non-profile dynamic vanity url apps
  app.use require "../apps/galleries_institutions"
  app.use require "../apps/articles"
  app.use require "../apps/page"
  app.use require "../apps/shortcuts"

  # Apps that need to fetch a profile
  app.use require "../apps/profile"
  app.use require "../apps/partner2"
  app.use require "../apps/partner"
  app.use require "../apps/fair"
  app.use require "../apps/fair_info"
  app.use require "../apps/fair_organizer"
  app.use require "../apps/auction"
  app.use require "../apps/auction2"
  app.use require "../apps/auction_support"
  app.use require "../apps/feature"

  # Last but not least user profiles
  app.use require "../apps/user"

  # route to ping for system time
  app.get '/system/time', timeout('25s'), (req, res)->
    res.send 200, {time: Date.now()}

  # Route to ping for system up
  app.get '/system/up', (req, res) ->
    res.send 200, { nodejs: true }

  # Finally 404 and error handling middleware when the request wasn't handled
  # successfully by anything above.
  artsyError.handlers app,
    template: path.resolve(__dirname, '../components/main_layout/templates/error.jade')
