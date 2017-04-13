#
# Inject common project-wide [view locals](http://expressjs.com/api.html#app.locals).
#

_ = require 'underscore'
_s = require 'underscore.string'
artsyXapp = require 'artsy-xapp'
moment = require 'moment'
Referrer = require 'referer-parser'
uuid = require 'node-uuid'
{ parse, format } = require 'url'
helpers = require '../template_helpers'
templateModules = require '../../desktop/lib/template_modules'
{ NODE_ENV } = require '../../config'

module.exports = (req, res, next) ->

  # Attach libraries to locals
  res.locals._s = _s
  res.locals.moment = moment
  res.locals.helpers = helpers
  res.locals[key] = helper for key, helper of templateModules

  # Cache views if production or staging
  res.locals.cache = true if NODE_ENV is 'production' or NODE_ENV is 'staging'

  # HTML class middleware used by mobile
  res.locals.htmlClass = if ua?.match(/Artsy-Mobile/) then 'layout-artsy-mobile-app' else ''
  res.locals.htmlClass += ' layout-logged-in' if req.user?

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
  res.locals.sd.USER_AGENT = res.locals.userAgent = req.get('user-agent')
  ua = req.get('user-agent')
  res.locals.sd.IS_MOBILE = Boolean(
    (ua.match(/iPhone/i) && !ua.match(/iPad/i)) ||
    (ua.match(/Android/i) && ua.match(/Mobile/i)) ||
    (ua.match(/Windows Phone/i)) ||
    (ua.match(/BB10/i)) ||
    (ua.match(/BlackBerry/i))
  )

  next()
