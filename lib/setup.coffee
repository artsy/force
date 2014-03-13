#
# Sets up intial project settings, middleware, mounted apps, and
# global configuration such as overriding Backbone.sync and
# populating sharify data
#

{ ARTSY_URL, NODE_ENV, ARTSY_ID, ARTSY_SECRET, SESSION_SECRET, PORT, ASSET_PATH,
  FACEBOOK_APP_NAMESPACE, MOBILE_MEDIA_QUERY, MOBILE_URL, APP_URL, REDIS_URL, DEFAULT_CACHE_TIME,
  CANONICAL_MOBILE_URL, IMAGES_URL_PREFIX, SECURE_IMAGES_URL, GOOGLE_ANALYTICS_ID, MIXPANEL_ID,
  COOKIE_DOMAIN, AUTO_GRAVITY_LOGIN, GOOGLE_MAPS_API_KEY, ADMIN_URL, CMS_URL,
  DELTA_HOST } = config = require "../config"
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
localsMiddleware = require './middleware/locals'
micrositeMiddleware = require './middleware/microsite'
helpersMiddleware = require './middleware/helpers'
ensureSSL = require './middleware/ensure_ssl'
errorHandler = require "../components/error_handler"
{ notFoundError, loginError } = require('./middleware/errors')

# Setup sharify constants & require dependencies that use sharify data
sharify.data =
  JS_EXT: (if ("production" is NODE_ENV or "staging" is NODE_ENV) then ".min.js.cgz" else ".js")
  CSS_EXT: (if ("production" is NODE_ENV or "staging" is NODE_ENV) then ".min.css.cgz" else ".css")
  ASSET_PATH: ASSET_PATH
  APP_URL: APP_URL
  ARTSY_URL: ARTSY_URL
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
CurrentUser = require '../models/current_user'

module.exports = (app) ->

  # Override Backbone to use server-side sync, inject the XAPP token,
  # add redis caching, and augment sync with Q promises.
  Backbone.sync = require "backbone-super-sync"
  Backbone.sync.editRequest = (req) -> req.set('X-XAPP-TOKEN': artsyXappMiddlware.token)
  backboneCacheSync(Backbone.sync, REDIS_URL, DEFAULT_CACHE_TIME, NODE_ENV) if REDIS_URL

  # Add up front middleware
  app.use sharify
  app.use redirectMobile
  app.use ensureSSL

  # Setup Artsy XAPP & Passport middleware
  app.use artsyXappMiddlware(
    artsyUrl: ARTSY_URL
    clientId: ARTSY_ID
    clientSecret: ARTSY_SECRET
  ) unless app.get('env') is 'test'
  app.use express.bodyParser()
  app.use express.cookieParser()
  app.use express.cookieSession
    secret: SESSION_SECRET
    cookie: { domain: COOKIE_DOMAIN }
    key   : 'force.sess'
  app.use artsyPassport _.extend config,
    CurrentUser: CurrentUser
    facebookPath: '/force/users/auth/facebook'
    twitterPath: '/force/users/auth/twitter'
    loginPath: '/force/users/sign_in'
    signupPath: '/force/users/invitation/accept'
    twitterCallbackPath: '/force/users/auth/twitter/callback'
    facebookCallbackPath: '/force/users/auth/facebook/callback'
    twitterSignupPath: '/force/users/auth/twitter/email'
  app.use errorHandler.socialAuthError

  # General
  app.use localsMiddleware
  app.use micrositeMiddleware
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
      transforms: [require("jadeify"), require('caching-coffeeify')]

  # Test
  if "test" is NODE_ENV
    app.use "/__api", require("../test/helpers/integration.coffee").api

  # Proxy Google requests to Reflection
  app.use proxyReflection

  # Mount apps
  app.use require "../apps/home"
  app.use require "../apps/about"
  # Neds to be above artwork and artist routes to support the /type/:id/* routes
  app.use require "../apps/auction_lots"
  app.use require "../apps/artist"
  app.use require "../apps/artists"
  app.use require "../apps/artwork"
  app.use require "../apps/auth"
  app.use require "../apps/browse"
  app.use require "../apps/feature"
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
  app.use require "../apps/post"
  app.use require "../apps/posts"
  app.use require "../apps/favorites_follows"
  # The partner routes are handled in the profile router
  app.use require "../apps/fair"
  app.use require "../apps/profile"
  # Shortcuts are prioritezed last
  app.use require "../apps/shortcuts"

  # Route to ping for system up
  app.get '/system/up', (req, res) ->
    res.send 200, { nodejs: true }

  # More general middleware
  app.use express.static(path.resolve __dirname, "../public")

  # Try to proxy unsupported route to Gravity before showing errors
  app.use proxyGravity

  # 404 and error handling middleware
  app.use errorHandler.pageNotFound
  app.use '/force/users/sign_in', loginError
  app.post '/force/javascripterr', errorHandler.javascriptError
  app.use errorHandler.internalError
