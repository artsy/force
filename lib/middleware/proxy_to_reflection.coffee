#
# When Google requests _escaped_fragement_ proxy to Reflection
# https://github.com/artsy/reflection
#

{ REFLECTION_URL } = require '../../config'
httpProxy = require 'http-proxy'
proxy = httpProxy.createProxyServer()

module.exports = (req, res, next) ->
  return next() unless req.query._escaped_fragment_?
  proxy.web req, res, { target: REFLECTION_URL + req.url }