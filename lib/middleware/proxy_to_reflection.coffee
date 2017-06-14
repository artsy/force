#
# When Google requests _escaped_fragement_ proxy to Reflection
# https://github.com/artsy/reflection
#
httpProxy = require 'http-proxy'
request = require 'superagent'
proxy = httpProxy.createProxyServer()
{ REFLECTION_URL } = process.env

module.exports = (req, res, next) ->
  return next() unless req.query._escaped_fragment_?
  request.head(REFLECTION_URL + req.url).end (err) ->
    return next() if err
    proxy.web req, res, target: REFLECTION_URL, changeOrigin: true