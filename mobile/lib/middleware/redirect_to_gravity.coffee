#
# Middleware that handles redirecting desktop browsers or unsupported routes to Gravity.
#

_ = require 'underscore'
{ ARTSY_URL } = require '../../config'
qs = require 'querystring'
uaParser = require 'ua-parser'
request = require 'superagent'

module.exports.forUnsupportedRoute = (req, res, next) ->
  r = request.get(ARTSY_URL + req.path)
  r.set('User-Agent', 'Microgravity')
  r.set('X-Access-Token', req.user.get 'accessToken') if req.user?
  r.end (err, sres) ->
    if not err? and sres.status < 400 then res.send(sres.text) else next()

module.exports.forDesktopBrowser = (req, res, next) ->
  ua = req.headers['user-agent']
  if ua and ua.length > 0
    family = uaParser.parseOS(ua).family
    if ua.match(/^twitterbot/i) or ua.match(/^facebookexternalhit/i)
      return res.redirect 301, ARTSY_URL + req.url
    else if family.match(/Mac OS X/) or (family.match(/Windows/) and not family.match(/Phone|Mobile/))
      return res.redirect ARTSY_URL + req.url
    else if uaParser.parseDevice(ua)?.family is 'iPad'
      return res.redirect ARTSY_URL + req.url
  next()
