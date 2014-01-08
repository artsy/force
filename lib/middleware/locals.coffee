#
# Inject common project-wide [view locals](http://expressjs.com/api.html#app.locals).
#

uuid = require 'node-uuid'
{ parse, format } = require 'url'

module.exports = (req, res, next) ->

  # Inject some project-wide sharify data such as the session id, the current path
  # and the xapp token.
  res.locals.sd.SESSION_ID = req.session?.id ?= uuid.v1()
  res.locals.sd.CURRENT_PATH = req.url
  res.locals.sd.ARTSY_XAPP_TOKEN = res.locals.artsyXappToken
  res.locals.sd.HIDE_HEADER = req.cookies?['hide-force-header']?

  next()
