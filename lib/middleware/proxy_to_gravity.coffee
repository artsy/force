#
# Try to proxy unhandled requests to Gravity using node-http-proxy
# If the req can be handled by Gravity, proxy it to G
# If not, simply pass it to the next middleware
#

{ ARTSY_URL, REFLECTION_URL } = require '../../config'
httpProxy = require 'http-proxy'
proxy = httpProxy.createProxyServer()
express = require 'express'

app = module.exports = express()

for route in ['/post', '/oauth2*', '/api/*', '/robots.txt', '/humans.txt', '/sitemap*', "/users/sign_in", "/users/sign_out", "/user/delete", "/user/edit", "/profile/edit"]
  app.all route, (req, res) ->
    proxy.web req, res, { target: ARTSY_URL }
