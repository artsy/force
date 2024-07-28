/**
 * Store individual relay query cache configs as a header, so that we can
 * ensure that certain queries aren't cached at the redis level, in the proxy.
 */

import { isServer } from "Server/isServer"

export const RELAY_CACHE_CONFIG_HEADER_KEY = "x-relay-cache-config"
export const RELAY_CACHE_PATH_HEADER_KEY = "x-relay-cache-path"

interface CacheHeaderMiddlewareProps {
  url?: string
}

export const cacheHeaderMiddleware = (props?: CacheHeaderMiddlewareProps) => {
  return next => async req => {
    const url = isServer ? props?.url : window.location.pathname

    const cacheHeaders = {
      [RELAY_CACHE_CONFIG_HEADER_KEY]: JSON.stringify(req.cacheConfig),
    }

    if (url) {
      cacheHeaders[RELAY_CACHE_PATH_HEADER_KEY] = url
    }

    req.fetchOpts.headers = {
      ...req.fetchOpts.headers,
      ...cacheHeaders,
    }

    const res = await next(req)

    return res
  }
}
