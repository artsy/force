#
# When Google requests _escaped_fragement_ proxy to Reflection
# https://github.com/artsy/reflection
#
httpProxy = require 'http-proxy'
proxy = httpProxy.createProxyServer()
{ REFLECTION_URL } = process.env

module.exports = (req, res, next) ->
  if req.query._escaped_fragment_?
    proxy.web req, res, target: REFLECTION_URL, changeOrigin: true
  else
    next()
