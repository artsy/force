import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import httpProxy from "http-proxy"
import { parse } from "url"

// TODO: Required for rewire
const request = require("superagent")

const { REFLECTION_URL } = process.env
const proxy = httpProxy.createProxyServer()

/**
 * When Google requests _escaped_fragment_ proxy to Reflection
 * https://github.com/artsy/reflection
 */
export function proxyReflectionMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  if (req.query._escaped_fragment_ == null) {
    return next()
  }

  const proxyUrl = reflectionProxyUrl(req)
  request.head(proxyUrl).end(function (err) {
    if (err) {
      return next()
    }
    return proxy.web(req, res, {
      changeOrigin: true,
      ignorePath: true,
      target: proxyUrl,
    })
  })
}

const reflectionProxyUrl = function (req: ArtsyRequest) {
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
