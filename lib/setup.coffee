#
# Sets up intial project settings, middleware, mounted apps, and
# global configuration such as overriding Backbone.sync and
# populating sharify data
#

{ API_URL, NODE_ENV, ARTSY_ID, ARTSY_SECRET, SESSION_SECRET, SESSION_COOKIE_MAX_AGE, PORT, ASSET_PATH,
  FACEBOOK_APP_NAMESPACE, MOBILE_MEDIA_QUERY, MOBILE_URL, APP_URL, REDIS_URL, DEFAULT_CACHE_TIME,
  CANONICAL_MOBILE_URL, IMAGES_URL_PREFIX, SECURE_IMAGES_URL, GOOGLE_ANALYTICS_ID, MIXPANEL_ID,
  COOKIE_DOMAIN, AUTO_GRAVITY_LOGIN, GOOGLE_MAPS_API_KEY, ADMIN_URL, CMS_URL,
  DELTA_HOST, ENABLE_AB_TEST, KIOSK_MODE, KIOSK_PAGE, SUGGESTIONS_AB_TEST, SESSION_COOKIE_KEY } = config = require "../config"

{ parse, format } = require 'url'

_ = require 'underscore'
express = require "express"
Backbone = require "backbone"
sharify = require "sharify"
path = require "path"
artsyPassport = require 'artsy-passport'
artsyXappMiddlware = require 'artsy-xapp-middleware'
backboneCacheSync = require 'backbone-cache-sync'
redirectMobile = require './middleware/redirect_mobile'
proxyGravity = require './middleware/proxy_to_gravity'
proxyReflection = require './middleware/proxy_to_reflection'
proxySitemaps = require './middleware/proxy_sitemaps'
localsMiddleware = require './middleware/locals'
micrositeMiddleware = require './middleware/microsite'
httpCacheMiddleware = require './middleware/http_cache'
helpersMiddleware = require './middleware/helpers'
ensureSSL = require './middleware/ensure_ssl'
errorHandler = require "../components/error_handler"
unsupportedBrowserCheck = require "./middleware/unsupported_browser"
{ notFoundError, loginError } = require('./middleware/errors')
flash = require 'connect-flash'
flashMiddleware = require './middleware/flash'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
session = require 'cookie-session'
favicon = require 'static-favicon'
logger = require 'morgan'
apiCache = require './middleware/api_cache'

# Setup sharify constants & require dependencies that use sharify data
sharify.data =
  JS_EXT: (if ("production" is NODE_ENV or "staging" is NODE_ENV) then ".min.js.cgz" else ".js")
  CSS_EXT: (if ("production" is NODE_ENV or "staging" is NODE_ENV) then ".min.css.cgz" else ".css")
  ASSET_PATH: ASSET_PATH
  APP_URL: APP_URL
  API_URL: API_URL
  NODE_ENV: NODE_ENV
  MOBILE_MEDIA_QUERY: MOBILE_MEDIA_QUERY
  CANONICAL_MOBILE_URL: CANONICAL_MOBILE_URL
  MOBILE_URL: MOBILE_URL
  FACEBOOK_APP_NAMESPACE: FACEBOOK_APP_NAMESPACE
  SECURE_IMAGES_URL: SECURE_IMAGES_URL
  IMAGES_URL_PREFIX: IMAGES_URL_PREFIX
  GOOGLE_ANALYTICS_ID: GOOGLE_ANALYTICS_ID
  MIXPANEL_ID: MIXPANEL_ID
  AUTO_GRAVITY_LOGIN: AUTO_GRAVITY_LOGIN
  GOOGLE_MAPS_API_KEY: GOOGLE_MAPS_API_KEY
  ADMIN_URL: ADMIN_URL
  CMS_URL: CMS_URL
  DELTA_HOST: DELTA_HOST
  ENABLE_AB_TEST: ENABLE_AB_TEST
  KIOSK_PAGE: KIOSK_PAGE
  KIOSK_MODE: KIOSK_MODE
  SUGGESTIONS_AB_TEST: SUGGESTIONS_AB_TEST
CurrentUser = require '../models/current_user'

module.exports = (app) ->

  # Override Backbone to use server-side sync, inject the XAPP token,
  # add redis caching, and augment sync with Q promises.
  Backbone.sync = require "backbone-super-sync"
  Backbone.sync.editRequest = (req) -> req.set('X-XAPP-TOKEN': artsyXappMiddlware.token)
  backboneCacheSync(Backbone.sync, REDIS_URL, DEFAULT_CACHE_TIME, NODE_ENV) if REDIS_URL

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
      transforms: [require("jadeify"), require('caching-coffeeify')]
  if "test" is NODE_ENV
    app.use "/__api", require("../test/helpers/integration.coffee").api
    app.use (req, res, next) ->
      return next() unless req.query['test-login']
      req.user = new CurrentUser(
        require('antigravity').fabricate('user', accessToken: 'footoken')
      )
      next()

  # Body parser has to be after proxy middleware for
  # node-http-proxy to work with POST/PUT/DELETE)
  app.use apiCache if apiCache?
  app.all '/api*', proxyGravity.api

  # Setup Artsy XAPP & Passport middleware for authentication along with the
  # body/cookie parsing middleware needed for that.
  app.use artsyXappMiddlware(
    artsyUrl: API_URL
    clientId: ARTSY_ID
    clientSecret: ARTSY_SECRET
  ) unless app.get('env') is 'test'
  app.use bodyParser()
  app.use cookieParser()
  app.use session
    secret: SESSION_SECRET
    domain: COOKIE_DOMAIN
    key   : SESSION_COOKIE_KEY
    maxage: SESSION_COOKIE_MAX_AGE
  app.use artsyPassport _.extend config,
    CurrentUser: CurrentUser
    SECURE_ARTSY_URL: API_URL

  app.use errorHandler.socialAuthError

  # Proxy / redirect requests before they even have to deal with Force routing
  # (This must be after the auth middleware to be able to proxy auth routes)
  app.use proxyGravity.app
  app.use proxySitemaps.app
  app.use redirectMobile
  app.use proxyReflection
  app.use ensureSSL

  app.use httpCacheMiddleware

  # General helpers and express middleware
  app.use flash()
  app.use flashMiddleware
  app.use localsMiddleware
  app.use micrositeMiddleware
  app.use helpersMiddleware
  app.use favicon(path.resolve __dirname, '../pubic/images/favicon.ico')
  app.use logger('dev')
  app.use unsupportedBrowserCheck

  # Mount apps
  app.use require "../apps/auction"
  app.use require "../apps/home"
  app.use require "../apps/about"
  app.use require "../apps/user"
  # Needs to be above artwork and artist routes to support the /type/:id/* routes
  app.use require "../apps/auction_lots"
  app.use require "../apps/artist"
  app.use require "../apps/artists"
  app.use require "../apps/artwork"
  app.use require "../apps/auth"
  app.use require "../apps/browse"
  app.use require "../apps/feature"
  app.use require "../apps/flash"
  app.use require "../apps/galleries"
  app.use require "../apps/tag"
  app.use require "../apps/gene"
  app.use require "../apps/institutions"
  app.use require "../apps/order"
  app.use require "../apps/personalize"
  app.use require "../apps/page"
  app.use require "../apps/partners"
  app.use require "../apps/search"
  app.use require "../apps/show"
  app.use require "../apps/shows"
  app.use require "../apps/style_guide"
  app.use require "../apps/post"
  app.use require "../apps/posts"
  app.use require "../apps/favorites_follows"
  app.use require "../apps/unsubscribe"
  app.use require "../apps/unsupported_browser"
  # Profile middleware and apps that use profiles
  app.use require "../apps/profile"
  app.use require "../apps/user_profile"
  app.use require "../apps/partner"
  app.use require "../apps/fair"
  # Shortcuts are prioritized last
  app.use require "../apps/shortcuts"

  # Route to ping for system up
  app.get '/system/up', (req, res) ->
    res.send 200, { nodejs: true }

  # Static files middleware
  app.use express.static(path.resolve __dirname, "../public")

  # Finally 404 and error handling middleware when the request wasn't handled
  # successfully by anything above.
  app.use errorHandler.pageNotFound
  app.use '/users/sign_in', loginError
  app.use errorHandler.internalError
