import { isServer } from "Server/isServer"
import {
  hasNoCacheParamPresent,
  hasPersonalizedArguments,
  isRequestCacheable,
} from "System/Relay/isRequestCacheable"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"

interface CacheHeaderMiddlewareProps {
  url?: string | null
  user: User
}

export const shouldSkipCDNCache = (req, user, foundRoute, url) => {
  // The order of these checks is important.
  // We always want to skip the cache no matter what if any of:
  //   - `force: true` is specified
  //   - `serverCacheTTL` is set to 0
  //   - `nocache` query param is provided
  //   - a known personalized argument is present in the query
  //     - `include_artworks_by_followed_artists` is a known one
  if (req.cacheConfig?.force === true) {
    return true
  }

  if (foundRoute?.route?.serverCacheTTL === 0) {
    return true
  }

  if (hasNoCacheParamPresent(url)) {
    return true
  }

  if (hasPersonalizedArguments(req.variables)) {
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

  // If none of the above conditions are met, we cache the request.
  return false
}

export const cacheHeaderMiddleware = (props?: CacheHeaderMiddlewareProps) => {
  return next => async req => {
    const url = isServer ? props?.url : window.location.pathname

    const cacheControlHeader = (() => {
      const foundRoute = findRoutesByPath({ path: url ?? "" })[0]

      // In a prefetch context, the custom TTL should come from the found route
      // that is being prefetched, and not the current route.
      // During a prefetch, the custom TTL of that found route, if any, is injected into
      // the metadata. Thus, if metadata is present, we should use that TTL (even if undefined).
      const ttl = req.cacheConfig.metadata
        ? req.cacheConfig.metadata.maxAge
        : foundRoute?.route?.serverCacheTTL

      switch (true) {
        case shouldSkipCDNCache(req, props?.user, foundRoute, url): {
          return { "Cache-Control": "no-cache" }
        }
        case !!ttl: {
          return {
            "Cache-Control": `max-age=${ttl}`,
          }
        }
        default: {
          return {}
        }
      }
    })()

    req.fetchOpts.headers = {
      ...req.fetchOpts.headers,
      ...cacheControlHeader,
    }

    const res = await next(req)

    return res
  }
}
