#
# Inject common project-wide [view locals](http://expressjs.com/api.html#app.locals).
#

uuid = require 'node-uuid'
{ parse, format } = require 'url'
_ = require 'underscore'
_s = require 'underscore.string'
moment = require 'moment'
{ NODE_ENV } = require '../../config'
helpers = require '../template_helpers'
templateModules = require '../template_modules'
artsyXapp = require 'artsy-xapp'
Referrer = require 'referer-parser'

module.exports = (req, res, next) ->

  # Attach libraries to locals
  res.locals._s = _s
  res.locals.moment = moment
  res.locals.helpers = helpers
  res.locals[key] = helper for key, helper of templateModules

  # Cache views if production or staging
  res.locals.cache = true if NODE_ENV is 'production' or NODE_ENV is 'staging'

  # Pass the user agent into locals for data-useragent device detection
  res.locals.userAgent = req.get('user-agent')

  # Inject some project-wide sharify data such as the session id, the current path
  # and the xapp token.
  res.locals.sd.SESSION_ID = req.session?.id ?= uuid.v1()
  res.locals.sd.CURRENT_PATH = parse(req.url).pathname
  res.locals.sd.ARTSY_XAPP_TOKEN = artsyXapp.token
  res.locals.sd.REFERRER = referrer = req.get 'Referrer'
  res.locals.sd.MEDIUM = new Referrer(referrer).medium if referrer
  res.locals.sd.EIGEN = req.headers?['user-agent']?.match('Artsy-Mobile')?
  res.locals.sd.REFLECTION = req.headers?['user-agent']?.match('PhantomJS')?
  res.locals.sd.REQUEST_TIMESTAMP = Date.now()
  res.locals.sd.NOTIFICATION_COUNT = req.cookies?['notification-count']

  next()
