import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"
import util from "util"

import { setTimingHeader } from "./serverTimingHeaders"
import { MemoryCache } from "lib/memoryCache"
import {
  MEMORY_PAGE_CACHE_ENABLED,
  MEMORY_PAGE_CACHE_TTL_MINUTES,
  MEMORY_PAGE_CACHE_LIMIT,
} from "../../config"
import { RequestRecorder } from "./requestRecorder"

const debugLog = util.debuglog("memoryCache")

const ENABLED_AB_TESTS = Object.keys(
  require("desktop/components/split_test/running_tests.coffee")
).sort()

const memoryCache = new MemoryCache({
  maxKeys: MEMORY_PAGE_CACHE_LIMIT,
  stdTTL: MEMORY_PAGE_CACHE_TTL_MINUTES,
})

// TODO: Is it possible to cache the compressed response?
// TODO: Is it possible to cache headers with Express?
// TODO: Cache sharing with Redis or other.

// Middleware will `next` and do nothing if any of the following is true:
//
// * page cache feature is disabled.
// * a user is signed in.
// * this isnt a supported cacheable path (there is an allow-list set in ENV).
// * the page content is uncached.
// * the cache errors.
export function memoryPageCacheMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  if (!MEMORY_PAGE_CACHE_ENABLED) return next()

  // Only cache GETS
  if (req.method.toLowerCase() !== "get") {
    debugLog(`[Mem Cache]: Skipping method not GET ${req.method.toLowerCase()}`)
    return next()
  }

  // Skip authenticated users.
  if (!!req.user) {
    debugLog("[Mem Cache]: Skipping authenticated")
    return next()
  }

  // AB Test Prefix
  const abTestPrefix =
    ENABLED_AB_TESTS.map(
      test => `${test}:${res.locals.sd[test.toUpperCase()]}`
    ).join(",") || "none"

  // originalUrl includes the request parameters.
  // http://expressjs.com/en/api.html#req.originalUrl
  const cacheKey = `${abTestPrefix},${req.originalUrl}`
  const cachedRes = memoryCache.has(cacheKey)
    ? memoryCache.get<Buffer>(cacheKey)
    : undefined

  let sentCachedResponse = false
  const recorder = new RequestRecorder()
  if (!cachedRes) {
    recorder.attachResponseRecorder(res)
  }

  // Register callback to write rendered page data to cache.
  recorder.attachResponseHandler(res, (body, res) => {
    if (res._headers["content-type"] !== "text/html; charset=utf-8") {
      return
    }
    if (res.statusCode !== 200) {
      return
    }

    if (!sentCachedResponse) {
      debugLog(`[Mem Cache]: Writing to cache ${cacheKey}`)
      memoryCache.set(cacheKey, body)
      memoryCache.logStats()
    } else {
      debugLog(`[Mem Cache]: Refreshing cache ${cacheKey}`)
      memoryCache.refresh(cacheKey)
    }
  })

  if (cachedRes) {
    debugLog(`[Mem Cache]: Reading from cache ${cacheKey}`)
    sentCachedResponse = true
    setTimingHeader(res, "memoryCacheHit")
    return res.send(cachedRes.toString("utf-8"))
  }
  setTimingHeader(res, "memoryCacheMiss")
  next()
}
