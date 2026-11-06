import { isServer } from "Server/isServer"
import {
  hasNoCacheParamPresent,
  hasPersonalizedArguments,
  isRequestCacheable,
} from "System/Relay/isRequestCacheable"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"

const PAGE_PATH_HEADER = "X-Artsy-Page-Path"

interface CacheHeaderMiddlewareProps {
  url?: string | null
  user: User
}

export const shouldSkipCDNCache = (req, user, ttl, url) => {
  /**
   * The order of these checks is important.
   * We always want to skip the cache no matter what if any of:
   *   - `force: true` is specified
   *   - `serverCacheTTL` is explicitly set to 0
   *   - `nocache` query param is provided
   *   - a known personalized argument is present in the query
   *   - `include_artworks_by_followed_artists` is a known one
   */
  if (req.cacheConfig?.force === true) {
    return true
  }

  if (ttl === 0) {
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
    const url = isServer
      ? props?.url
      : `${window.location.pathname}${window.location.search}`

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
        case shouldSkipCDNCache(req, props?.user, ttl, url): {
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

    // The metaphysics-cdn Worker tags cached responses with this path so Forque can purge one page.
    // During a prefetch, the path comes from the prefetched route, like the TTL above.
    const pagePath = getPathname(req.cacheConfig.metadata?.pagePath ?? url)
    const pagePathHeader = pagePath ? { [PAGE_PATH_HEADER]: pagePath } : {}

    req.fetchOpts.headers = {
      ...req.fetchOpts.headers,
      ...cacheControlHeader,
      ...pagePathHeader,
    }

    const res = await next(req)

    return res
  }
}

const getPathname = (url?: string | null): string | null => {
  const pathname = url?.split(/[?#]/)[0]

  if (!pathname?.startsWith("/")) {
    return null
  }

  return pathname
}
