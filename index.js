require('coffee-script/register')

// Merge sharify data
const sharify = require('sharify')
require('./mobile/lib/setup_sharify')
const mobileSD = Object.assign({}, sharify.data)
require('./desktop/lib/setup_sharify')
const desktopSD = Object.assign({}, sharify.data)
const sd = Object.assign({}, mobileSD, desktopSD)
sharify.data = sd

// Require dependencies
const path = require('path')
const express = require('express')
const newrelic = require('artsy-newrelic')
const artsyXapp = require('artsy-xapp')
const artsyPassport = require('artsy-passport')
const glob = require('glob')
const setupDesktop = require('./desktop/lib/setup')
const setupMobile = require('./mobile/lib/setup')
const desktop = require('./desktop')
const mobile = require('./mobile')
const mobileMiddleware = require('./desktop/lib/middleware/redirect_mobile.coffee')
const cache = require('./lib/cache')
const MergedUser = require('./lib/current_user')
const artsyError = require('artsy-error-handler')

const app = express()
const { API_URL, CLIENT_ID, CLIENT_SECRET, PORT, NODE_ENV } = process.env

// Combine user models from desktop and mobile
artsyPassport.options.CurrentUser = MergedUser

// Middleware to direct to mobile or desktop apps
const isResponsive = (url) => {
  const stack = mobileMiddleware.stack.slice(0, -1)
  return stack.filter((route) => route.regexp.test(url)).length > 0
}

const determineDevice = (req, res, next) => {
  const ua = req.get('user-agent')
  const isPhone = Boolean(
    (ua.match(/iPhone/i) && !ua.match(/iPad/i)) ||
    (ua.match(/Android/i) && ua.match(/Mobile/i)) ||
    (ua.match(/Windows Phone/i)) ||
    (ua.match(/BB10/i)) ||
    (ua.match(/BlackBerry/i))
  )
  req.isMobile = isPhone && !isResponsive(req.url)
  next()
}

const routeApp = (req, res, next) => {
  req.isMobile ? mobile(req, res, next) : desktop(req, res, next)
}

// Mount static assets first so responsive pages don't get confused
if (NODE_ENV === 'development') {
  app.use(require('stylus').middleware({
    src: path.resolve(__dirname, 'desktop'),
    dest: path.resolve(__dirname, 'desktop/public')
  }))
  app.use(require('browserify-dev-middleware')({
    src: path.resolve(__dirname, 'desktop'),
    transforms: [require('jadeify'), require('caching-coffeeify'), require('babelify')]
  }))
  app.use(require('stylus').middleware({
    src: path.resolve(__dirname, 'mobile'),
    dest: path.resolve(__dirname, 'mobile/public')
  }))
  app.use(require('browserify-dev-middleware')({
    src: path.resolve(__dirname, 'mobile'),
    transforms: [require('jadeify'), require('caching-coffeeify'), require('babelify')]
  }))
}
glob.sync('desktop/**/public/')
  .concat(glob.sync('mobile/**/public/'))
  .forEach((fld) => app.use(express.static(fld)))

// Mount root-level middleware
app.use(newrelic)
app.use(determineDevice)
app.use(routeApp)
artsyError.handlers(app, {
  template: path.resolve(
    __dirname,
    'desktop/components/main_layout/templates/error.jade'
  )
})

// Connect to Redis
cache.setup(() => {
  // Setup apps
  setupDesktop(desktop)
  setupMobile(mobile)
  // Get an xapp token
  artsyXapp.init({ url: API_URL, id: CLIENT_ID, secret: CLIENT_SECRET }, () => {
    // Start the server
    app.listen(PORT, () => {
      console.log(`Force listening on port ${PORT}`)
    })
  })
})
