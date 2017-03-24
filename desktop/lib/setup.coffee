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
  IP_BLACKLIST,
  REQUEST_LIMIT,
  REQUEST_EXPIRE_MS,
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
proxyToMerged = require './middleware/proxy_to_merged'
localsMiddleware = require './middleware/locals'
ensureSSL = require './middleware/ensure_ssl'
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
logFormat = require '../../lib/logger_format'
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
  # Blacklist IPs
  app.use ipfilter([IP_BLACKLIST.split(',')], log: false, mode: 'deny')

  # Rate limited
  if OPENREDIS_URL and cache.client
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

  # Blank page apparently used by Eigen?
  app.use require '../apps/blank'

  # Make sure we're using SSL
  app.use ensureSSL
  app.use hstsMiddleware

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
      transforms: [
        require("jadeify"),
        require('caching-coffeeify'),
        require('babelify')
      ]
      insertGlobals: true

      # FIXME: Follow up with Craig re sourcemaps
      debug: true

  if "test" is NODE_ENV
    app.use (req, res, next) ->
      return next() unless req.query['test-login']
      req.user = new CurrentUser(
        require('antigravity').fabricate('user', accessToken: 'footoken')
      )
      next()
    app.use "/__gravity", require("antigravity").server

  # Cookie and session middleware
  app.use cookieParser()
  app.set 'trust proxy', true
  app.use session
    secret: SESSION_SECRET
    domain: COOKIE_DOMAIN
    name: SESSION_COOKIE_KEY
    maxAge: SESSION_COOKIE_MAX_AGE
    # secure uses req.connection.encrypted, but heroku has nginx terminating SSL
    # secureProxy just sets secure=true
    secure: "production" is NODE_ENV or "staging" is NODE_ENV

  # Body parser has to be after proxy middleware for
  # node-http-proxy to work with POST/PUT/DELETE
  app.use proxyToMerged
  app.use '/api', proxyGravity.api
  app.use proxyReflection
  app.use bodyParser.json()
  app.use bodyParser.urlencoded(extended: true)

  # Passport middleware for authentication. CORS middleware above that because
  # we want the user to be able to log-in to force via the microgravity subdomain
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

  # Redirect requests before they even have to deal with Force routing
  app.use downcase
  app.use hardcodedRedirects
  app.use redirectMobile

  # General helpers and express middleware
  app.use bucketAssets()
  app.use flash()
  app.use flashMiddleware
  app.use localsMiddleware
  app.use artsyError.helpers
  app.use sameOriginMiddleware
  app.use escapedFragmentMiddleware
  if NODE_ENV is 'prod'
    app.use logger 'dev'
  else
    logger.token 'type', (req, res) -> 'DESKTOP'
    app.use logger logFormat
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
  app.use require "../apps/collect_art"
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
  app.use require "../apps/loyalty"
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
  app.use require "../apps/artsy_primer"

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
