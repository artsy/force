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

    /**
     * We need to dynamically set a path header, because after the SSR pass we
     * only have access to the initial req.url _entrypoint_; from there our
     * client-side SPA intializes, which manages URL updates. Setting headers
     * at the relay network level lets us configure queries to be sent to the
     * graphql proxy (and redis cache).
     */
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
