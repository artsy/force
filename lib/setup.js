//
// Sets up intial project settings, middleware, mounted apps, and
// global configuration such as overriding Backbone.sync and
// populating sharify data
//
import _ from 'underscore'
import artsyError from 'artsy-error-handler'
import artsyPassport from 'artsy-passport'
import artsyXapp from 'artsy-xapp'
import Backbone from 'backbone'
import bodyParser from 'body-parser'
import bucketAssets from 'bucket-assets'
import cookieParser from 'cookie-parser'
import express from 'express'
import favicon from 'serve-favicon'
import glob from 'glob'
import helmet from 'helmet'
import logger from 'artsy-morgan'
import path from 'path'
import session from 'cookie-session'
import sharify from 'sharify'
import siteAssociation from 'artsy-eigen-web-association'
import superSync from 'backbone-super-sync'
import { IpFilter as ipfilter } from 'express-ipfilter'
import timeout from 'connect-timeout'
import './setup_sharify'
import cache from './cache'
import downcase from './middleware/downcase'
import ensureSSL from './middleware/ensure_ssl'
import escapedFragmentMiddleware from './middleware/escaped_fragment'
import hardcodedRedirects from './middleware/hardcoded_redirects'
import hstsMiddleware from './middleware/hsts'
import localsMiddleware from './middleware/locals'
import proxyGravity from './middleware/proxy_to_gravity'
import proxyReflection from './middleware/proxy_to_reflection'
import sameOriginMiddleware from './middleware/same_origin'
import unsupportedBrowserCheck from './middleware/unsupported_browser'
import CurrentUser from './current_user'
import splitTestMiddleware from '../desktop/components/split_test/middleware'
import config from '../config'

const {
  API_REQUEST_TIMEOUT,
  API_URL,
  COOKIE_DOMAIN,
  DEFAULT_CACHE_TIME,
  IP_BLACKLIST,
  NODE_ENV,
  OPENREDIS_URL,
  REQUEST_EXPIRE_MS,
  REQUEST_LIMIT,
  SESSION_COOKIE_KEY,
  SESSION_COOKIE_MAX_AGE,
  SESSION_SECRET,
  APP_TIMEOUT
} = config

export default function (app) {
  // Timeout middleware
  if (NODE_ENV === 'production') app.use(timeout(APP_TIMEOUT || '29s'))

  // Blacklist IPs
  app.use(ipfilter(IP_BLACKLIST.split(','), { log: false, mode: 'deny' }))

  // Rate limiting
  if (OPENREDIS_URL && cache.client) {
    const limiter = require('express-limiter')(app, cache.client)
    limiter({
      path: '*',
      method: 'all',
      lookup: ['headers.x-forwarded-for'],
      total: REQUEST_LIMIT,
      expire: REQUEST_EXPIRE_MS,
      onRateLimited (req, res, next) {
        console.log('Rate limit exceeded for', req.headers['x-forwarded-for'])
        return next()
      }
    })
  }

  // Blank page used by Eigen for caching web views.
  // See: https://github.com/artsy/microgravity-private/pull/1138
  app.use(require('../desktop/apps/blank'))

  // Make sure we're using SSL and prevent clickjacking
  app.use(ensureSSL)
  app.use(hstsMiddleware)
  if (!NODE_ENV === 'test') app.use(helmet.frameguard())

  // Override Backbone to use server-side sync, inject the XAPP token,
  // add redis caching, and timeout for slow responses.
  superSync.timeout = API_REQUEST_TIMEOUT
  superSync.cacheClient = cache.client
  superSync.defaultCacheTime = DEFAULT_CACHE_TIME
  Backbone.sync = function (method, model, options) {
    if (options.headers == null) { options.headers = {} }
    options.headers['X-XAPP-TOKEN'] = artsyXapp.token || ''
    return superSync(method, model, options)
  }

  // Inject sharify data before any app code
  app.use(sharify)

  // Cookie and session middleware
  app.use(cookieParser())
  app.set('trust proxy', true)
  app.use(session({
    secret: SESSION_SECRET,
    domain: COOKIE_DOMAIN,
    name: SESSION_COOKIE_KEY,
    maxAge: SESSION_COOKIE_MAX_AGE,
    secure: (NODE_ENV === 'production') || (NODE_ENV === 'staging')
  }))

  // Body parser has to be after proxy middleware for
  // node-http-proxy to work with POST/PUT/DELETE
  app.use('/api', proxyGravity.api)
  app.use(proxyReflection)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Passport middleware for authentication.
  app.use(artsyPassport(_.extend({}, config, {
    CurrentUser: CurrentUser,
    ARTSY_URL: API_URL,
    userKeys: [
      'collector_level',
      'default_profile_id',
      'email',
      'has_partner_access',
      'id',
      'lab_features',
      'name',
      'paddle_number',
      'phone',
      'type'
    ]
  })))

  // Static assets
  if (NODE_ENV === 'development' || NODE_ENV === 'test') {
    app.use(require('stylus').middleware({
      src: path.resolve(__dirname, '../desktop'),
      dest: path.resolve(__dirname, '../desktop/public')
    }))
    app.use(require('browserify-dev-middleware')({
      src: path.resolve(__dirname, '../desktop'),
      transforms: [
        require('babelify'),
        require('caching-coffeeify'),
        require('jadeify')
      ],
      insertGlobals: true,
      debug: true
    }))
    app.use(require('stylus').middleware({
      src: path.resolve(__dirname, '../mobile'),
      dest: path.resolve(__dirname, '../mobile/public')
    }))
    app.use(require('browserify-dev-middleware')({
      src: path.resolve(__dirname, '../mobile'),
      transforms: [
        require('babelify'),
        require('caching-coffeeify'),
        require('jadeify')
      ],
      insertGlobals: true,
      debug: true
    }))
  }
  glob.sync(path.resolve(__dirname, '../') + '/desktop/**/public/')
    .concat(glob.sync(path.resolve(__dirname, '../') + '/mobile/**/public/'))
    .forEach((fld) => app.use(express.static(fld)))
  app.use(favicon(
    path.resolve(__dirname, '../mobile/public/images/favicon.ico')
  ))
  app.use('/(.well-known/)?apple-app-site-association', siteAssociation)

  // Redirect requests before they even have to deal with Force routing
  app.use(downcase)
  app.use(hardcodedRedirects)

  // General helpers and express middleware
  app.use(bucketAssets())
  app.use(localsMiddleware)
  app.use(artsyError.helpers)
  app.use(sameOriginMiddleware)
  app.use(escapedFragmentMiddleware)
  app.use(logger)
  app.use(unsupportedBrowserCheck)
  app.use(splitTestMiddleware)

  // Direct mobile devices to the mobile app, otherwise fall through to
  // the desktop app
  app.use((req, res, next) => {
    if (res.locals.sd.IS_MOBILE) require('../mobile')(req, res, next)
    else next()
  })
  app.use(require('../desktop'))

  // Routes for pinging system time and up
  app.get('/system/time', (req, res) => res.send(200, { time: Date.now() }))
  app.get('/system/up', (req, res) => res.send(200, { nodejs: true }))

  // Ensure CurrentUser is set for Artsy Passport
  // TODO: Investigate race condition b/t reaction-force's use of AP
  artsyPassport.options.CurrentUser = CurrentUser

  // 404 handler
  app.get('*', (req, res, next) => {
    const err = new Error()
    err.status = 404
    err.message = 'Not Found'
    next(err)
  })

  // Error handler at the end
  const dir = path.resolve(__dirname, '../desktop/components/error_handler')
  app.set('view engine', 'jade')
  app.set('views', dir)
  app.use((err, req, res, next) => {
    const code = req.timedout ? 504 : (err.status || 500)
    const message = err.message || err.text || err.toString()
    res.status(code).render('index', { message, stack: err.stack, code })
  })
}
