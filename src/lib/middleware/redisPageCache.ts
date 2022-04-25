import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import { setTimingHeader } from "./serverTimingHeaders"
import { getContextPageFromReq } from "../getContextPage"
import { cache } from "../cache"
import {
  PAGE_CACHE_ENABLED,
  PAGE_CACHE_EXPIRY_SECONDS,
  PAGE_CACHE_NAMESPACE,
  PAGE_CACHE_RETRIEVAL_TIMEOUT_MS,
  PAGE_CACHE_TYPES,
  PAGE_CACHE_VERSION,
} from "../../config"
import { RequestRecorder } from "./requestRecorder"
import util from "util"
import { createFeatureFlagsCachePrefix } from "./featureFlagMiddleware"

const debugLog = util.debuglog("redisCache")

const cacheablePageTypes: string[] = PAGE_CACHE_TYPES.split("|")

// Middleware will `next` and do nothing if any of the following is true:
//
// - A page is not a GET request
// - A user is signed in
// - The page type is not enabled.
//
// If the page is cachable there are two flows:
//
// If the page is not in the cache, then the response will be recorded for the
// next request.
//
// If the page is in the cache, then an attempt to retrieve serve the response
// from redis will be made and if successful then the response will be served.
// Otherwise it will be recored.
export function redisPageCacheMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  if (!PAGE_CACHE_ENABLED) return next()

  // Only cache GETS
  if (req.method.toLowerCase() !== "get") {
    debugLog(`[Redis Page Cache]: Skipping method not GET ${req.method}`)
    return next()
  }

  // Skip authenticated users.
  if (!!req.user) {
    debugLog("[Redis Page Cache]: Skipping authenticated")
    return next()
  }

  // Returns true if the page type corresponding to `url` is configured cacheable.
  const isCacheablePageType = (req: ArtsyRequest) => {
    const { pageType } = getContextPageFromReq(req)
    return cacheablePageTypes.includes(pageType)
  }
  if (!isCacheablePageType(req)) return next()

  // Generate cache key that indlues all currently enabled featureFlags and
  // variants
  const featureFlagsCachePrefix = createFeatureFlagsCachePrefix(
    res.locals.sd.FEATURE_FLAGS
  )

  // `key` should be a full URL w/ query params, and not a path.
  // This is to separate URL's like `/collect` and `/collect?acquireable=true`.
  const cacheKey = (key: string) => {
    return [
      PAGE_CACHE_NAMESPACE,
      featureFlagsCachePrefix,
      PAGE_CACHE_VERSION,
      key,
    ]
      .filter(Boolean)
      .join("|")
  }

  const cacheKeyForRequest = cacheKey(req.url)

  // Ensure the response is recored and Rregister callback to write page data
  // to the cache.
  let cachedResponseServed = false
  const recorder = new RequestRecorder()
  recorder.attachResponseRecorder(res)
  recorder.attachResponseHandler(res, (body: Buffer, res: ArtsyResponse) => {
    // Do not recache a cached response.
    // TODO: Possibly refresh the ttl
    if (cachedResponseServed) {
      return
    }

    if (res._headers["content-type"] !== "text/html; charset=utf-8") {
      return
    }
    if (res.statusCode !== 200) {
      return
    }

    debugLog(`[Redis Page Cache]: Writing ${cacheKeyForRequest} to cache`)
    cache.set(cacheKeyForRequest, body, PAGE_CACHE_EXPIRY_SECONDS)
  })

  new Promise<void>((resolve, reject) => {
    // Cache timeout handler, will reject if hit.
    let timeoutId: NodeJS.Timeout | null = setTimeout(() => {
      timeoutId = null
      setTimingHeader(res, "redisCacheMiss")
      const error = new Error(
        `Timeout of ${PAGE_CACHE_RETRIEVAL_TIMEOUT_MS}ms, skipping...`
      )
      reject(error)
    }, PAGE_CACHE_RETRIEVAL_TIMEOUT_MS)

    // Redis callback
    const handleCacheGet = (err, html) => {
      if (err) {
        setTimingHeader(res, "redisCacheMiss")
        reject(err)
        return
      }

      // Already timed out.
      if (!timeoutId) {
        return
      }

      clearTimeout(timeoutId)

      if (html) {
        debugLog(`[Redis Page Cache]: Reading ${cacheKeyForRequest} from cache`)
        cachedResponseServed = true
        setTimingHeader(res, "redisCacheHit")
        res.locals.cachedPageAvailable = true
        res.locals.cachedPageData = html.toString("utf-8")
        next()
        return
      }

      setTimingHeader(res, "redisCacheMiss")
      resolve()
    }

    cache.get(cacheKeyForRequest, handleCacheGet)
  })
    .catch(e => {
      debugLog(`[Redis Page Cache Middleware]: ${e.message}`)
    })
    .finally(() => {
      next()
    })
}
