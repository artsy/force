#
# Inject common project-wide [view locals](http://expressjs.com/api.html#app.locals).
#

uuid = require 'node-uuid'
{ parse, format } = require 'url'

module.exports = (req, res, next) ->

  # Adjust the asset path based on SSL
  pathObj = parse res.locals.sd.ASSET_PATH
  pathObj.protocol = if req.get('X-Forwarded-Proto') is 'https' then 'https' else 'http'
  res.locals.sd.ASSET_PATH = format(pathObj)

  # Generate a session id to be passed among sharify data
  res.locals.sd.SESSION_ID = req.session?.id ?= uuid.v1()

  # Inject the xapp token in sharify data
  res.locals.sd.GRAVITY_XAPP_TOKEN = res.locals.artsyXappToken

  next()