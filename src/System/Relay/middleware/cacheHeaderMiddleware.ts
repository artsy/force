import { isServer } from "Server/isServer"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"

export const RELAY_CACHE_CONFIG_HEADER_KEY = "x-relay-cache-config"
export const RELAY_CACHE_PATH_HEADER_KEY = "x-relay-cache-path"

interface CacheHeaderMiddlewareProps {
  url: string | null | undefined
  user: User
}

export const shouldSkipCDNCache = (req, user, path) => {
  const isLoggedIn = !!user

  if (isLoggedIn) {
    return true
  }

  if (req.cacheConfig?.force === true) {
    return true
  }

  if (path) {
    const { route } = findRoutesByPath({ path })[0]
    if (route?.serverCacheTTL === 0) {
      return true
    }
  }

  return false
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

    const cacheControlHeader = shouldSkipCDNCache(req, props?.user, url)
      ? { "Cache-Control": "no-cache" }
      : {}

    req.fetchOpts.headers = {
      ...req.fetchOpts.headers,
      ...cacheHeaders,
      ...cacheControlHeader,
    }

    const res = await next(req)

    return res
  }
}
