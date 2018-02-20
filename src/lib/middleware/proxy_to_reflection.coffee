#
# When Google requests _escaped_fragment_ proxy to Reflection
# https://github.com/artsy/reflection
#
httpProxy = require 'http-proxy'
request = require 'superagent'
proxy = httpProxy.createProxyServer()
{ parse } = require 'url'
{ REFLECTION_URL } = process.env

module.exports = (req, res, next) ->
  return next() unless req.query._escaped_fragment_?
  proxyUrl = reflectionProxyUrl(req)
  request.head(proxyUrl).end (err) ->
    return next() if err
    proxy.web req, res,
      target: proxyUrl
      ignorePath: true
      changeOrigin: true

reflectionProxyUrl = (req) ->
  url = parse(req.url)
  dest = REFLECTION_URL + url.pathname
  query = url.query?.replace(/&?_escaped_fragment_=/, '')
  dest += encodeURIComponent("?" + decodeURIComponent(query)) if query?.length
  dest