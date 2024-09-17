import { isServer } from "Server/isServer"
import { isRequestCacheable } from "System/Relay/isRequestCacheable"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"

export const RELAY_CACHE_CONFIG_HEADER_KEY = "x-relay-cache-config"
export const RELAY_CACHE_PATH_HEADER_KEY = "x-relay-cache-path"

interface CacheHeaderMiddlewareProps {
  url: string | null | undefined
  user: User
}

export const shouldSkipCDNCache = (req, user, foundRoute) => {
  // The order of these checks is important.
  // We always want to skip the cache no matter what if:
  //   - `force: true` is specified
  //   - `serverCacheTTL` is set to 0

  if (req.cacheConfig?.force === true) {
    return true
  }

  if (foundRoute?.route?.serverCacheTTL === 0) {
    return true
  }

  // Then, we want to cache if the request is cacheable (based on the opt-in `@cacheable` directive).
  if (isRequestCacheable(req)) {
    return false
  }

  // Finally as a catch-all, we skip the cache if the user is logged in.
  const isLoggedIn = !!user
  if (isLoggedIn) {
    return true
  }
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

    const cacheControlHeader = (() => {
      const foundRoute = findRoutesByPath({ path: url ?? "" })[0]

      switch (true) {
        case shouldSkipCDNCache(req, props?.user, foundRoute): {
          return { "Cache-Control": "no-cache" }
        }
        case !!foundRoute?.route?.serverCacheTTL: {
          return {
            "Cache-Control": `max-age=${foundRoute.route.serverCacheTTL}`,
          }
        }
        default: {
          return {}
        }
      }
    })()

    req.fetchOpts.headers = {
      ...req.fetchOpts.headers,
      ...cacheHeaders,
      ...cacheControlHeader,
    }

    const res = await next(req)

    return res
  }
}
