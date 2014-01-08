#
# Try to proxy unhandled requests to Gravity using node-http-proxy
# If the req can be handled by Gravity, proxy it to G
# If not, simply pass it to the next middleware
#

{ ARTSY_URL } = require '../../config'
http      = require 'http'
httpProxy = require 'http-proxy'
proxy     = new httpProxy.RoutingProxy()
url       = require 'url'

module.exports = exports = (req, res, next) ->
  urlObj = url.parse(ARTSY_URL + req.url)
  options =
    host: urlObj.hostname
    path: urlObj.path
    port: urlObj.port or 80

  # Ping Gravity first, if the url is supported,
  # proxy the req to it. Otherwise, pass it.
  pingReq = http.get options, (pingRes) ->
    if pingRes.statusCode < 400
      proxy.proxyRequest req, res,
        host: url.parse(ARTSY_URL).hostname
        port: url.parse(ARTSY_URL).port or 80
    else
      next()

  # On errors or timeout, simply pass it.
  pingReq.on 'error', (e) ->
    next()
  pingReq.setTimeout 2000, ->
    pingReq.abort() # abort () emits an Error
