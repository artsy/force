//
// When Google requests _escaped_fragment_ proxy to Reflection
// https://github.com/artsy/reflection
//
const httpProxy = require("http-proxy")
const request = require("superagent")
const proxy = httpProxy.createProxyServer()
const { parse } = require("url")

let ignoreList = null

/**
 * Provides a set of paths to ignore from reflection for testing purposes. This
 * is called only on the first middleware execution to avoid unnecessary
 * recalculations.
 */
function setIgnoreList() {
  // Destructured here so it can actually be mocked in tests
  const { REFLECTION_IGNORE } = process.env
  ignoreList =
    typeof REFLECTION_IGNORE === "string" ? REFLECTION_IGNORE.split(",") : []
}

module.exports = function proxyToReflection(req, res, next) {
  if (req.query._escaped_fragment_ == null) {
    return next()
  }

  // Initialize the ignore list if this hasn't already happened
  if (!ignoreList) setIgnoreList()

  const url = parse(req.url)
  if (ignoreList.includes(url.pathname)) {
    return next()
  }

  const proxyUrl = reflectionProxyUrl(url)
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

const reflectionProxyUrl = function (url) {
  let dest = process.env.REFLECTION_URL + url.pathname
  const query =
    url.query != null
      ? url.query.replace(/&?_escaped_fragment_=/, "")
      : undefined
  if (query != null ? query.length : undefined) {
    dest += encodeURIComponent("?" + decodeURIComponent(query))
  }
  return dest
}
