#
# Try to proxy unhandled requests to Gravity using node-http-proxy
# If the req can be handled by Gravity, proxy it to G
# If not, simply pass it to the next middleware
#

{ ARTSY_URL } = require '../../config'
httpProxy = require 'http-proxy'
proxy = httpProxy.createProxyServer()
express = require 'express'

app = module.exports.app = express()

ROUTES = [
  '/oauth2*', '/sitemap*'
]
AUTH_ROUTES = [
  '/post', "/profile/edit", "/user/edit", "/user/delete"
]
for route in ROUTES
  app.all route, (req, res) ->
    proxy.web req, res, { target: ARTSY_URL }
for route in AUTH_ROUTES
  app.all route, (req, res, next) ->
    return next() unless req.user
    req.headers['X-ACCESS-TOKEN'] = req.user.get('accessToken')
    proxy.web req, res, { target: ARTSY_URL }

module.exports.api = (req, res) ->
  proxy.web req, res, { target: ARTSY_URL }
