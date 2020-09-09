//
// When Google requests _escaped_fragment_ proxy to Reflection
// https://github.com/artsy/reflection
//
const httpProxy = require("http-proxy")
const request = require("superagent")
const proxy = httpProxy.createProxyServer()
const { parse } = require("url")
const { REFLECTION_URL } = process.env

module.exports = function proxyToReflection(req, res, next) {
  if (req.query._escaped_fragment_ == null) {
    return next()
  }

  const proxyUrl = reflectionProxyUrl(req)
  request.head(proxyUrl).end(function (err) {
    if (err) {
      return next()
    }
    return proxy.web(req, res, {
      target: proxyUrl,
      ignorePath: true,
      changeOrigin: true,
    })
  })
}

const reflectionProxyUrl = function (req) {
  const url = parse(req.url)
  let dest = REFLECTION_URL + url.pathname
  const query =
    url.query != null
      ? url.query.replace(/&?_escaped_fragment_=/, "")
      : undefined
  if (query != null ? query.length : undefined) {
    dest += encodeURIComponent("?" + decodeURIComponent(query))
  }
  return dest
}
