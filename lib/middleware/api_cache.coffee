#
# Expirmental middleware that proxies and caches certain API routes on the
# client-side specified in the CLIENT_CACHE_ROUTES config var.
#

_ = require 'underscore'
express = require 'express'
{ CLIENT_CACHE_ROUTES, API_URL } = require '../../config'
cache = require '../cache'
request = require 'superagent'

unless _.isArray(CLIENT_CACHE_ROUTES) and CLIENT_CACHE_ROUTES.length > 0
  return module.exports = null

app = module.exports = express()

overrideAPIUrl = (req, res, next) ->
  console.log 'OVER'
  res.locals.sd.API_URL = ''
  next()

cacheRoute = (req, res, next) ->
  url = API_URL + req.url
  key = 'client-api-cache:' + url
  cache.get key, (err, json) ->
    return res.send(JSON.parse json) if json
    request.get(url)
      .set('X-XAPP-TOKEN': req.header 'X-XAPP-TOKEN')
      .end (r) ->
        return next r.error if r.error
        cache.set key, r.text
        res.send r.body

app.use overrideAPIUrl
console.log 'mount', (route for route in CLIENT_CACHE_ROUTES)
app.get(CLIENT_CACHE_ROUTES, cacheRoute) for route in CLIENT_CACHE_ROUTES