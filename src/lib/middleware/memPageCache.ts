import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

import { setTimingHeader } from "./timingHeaders"
import { MemoryCache } from "lib/nodeCache"
import config from "../../config"

const ENABLED_AB_TESTS = Object.keys(
  require("desktop/components/split_test/running_tests.coffee")
).sort()

const {
  ENABLE_MEMORY_PAGE_CACHE,
  MEMORY_PAGE_CACHE_TTL_MINUTES,
  MEMORY_PAGE_CACHE_LIMIT,
} = config

const memCache = new MemoryCache({
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
export async function memCacheMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  // if (!ENABLE_MEMORY_PAGE_CACHE) return next()

  // Only cache GETS
  if (req.method.toLowerCase() !== "get") {
    console.log(
      `[Mem Cache]: Skipping method not GET ${req.method.toLowerCase()}`
    )
    return next()
  }

  // Skip authenticated users.
  if (!!req.user) {
    console.log("[Mem Cache]: Skipping authenticated")
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
  const cachedRes = memCache.has(cacheKey)
    ? memCache.get<Buffer>(cacheKey)
    : undefined

  let sentCachedResponse = false
  const chunks: Buffer[] = []
  if (!cachedRes) {
    const defaultWrite = res.write
    const defaultEnd = res.end

    // @ts-ignore
    res.write = (...restArgs) => {
      if (restArgs[0]) {
        chunks.push(new Buffer(restArgs[0]))
      }
      defaultWrite.apply(res, restArgs)
    }

    // @ts-ignore
    res.end = (...restArgs) => {
      if (restArgs.length > 1 && restArgs[0]) {
        chunks.push(new Buffer(restArgs[0]))
      }
      defaultEnd.apply(res, restArgs)
    }
  }

  // Register callback to write rendered page data to cache.
  res.once("finish", () => {
    if (res._headers["content-type"] !== "text/html; charset=utf-8") {
      return
    }
    if (res.statusCode !== 200) {
      return
    }

    if (!sentCachedResponse) {
      console.log(`[Mem Cache]: Writing to cache ${cacheKey}`)
      const body = Buffer.concat(chunks)
      memCache.set(cacheKey, body)
      memCache.logStats()
    } else {
      console.log(`[Mem Cache]: Refreshing cache ${cacheKey}`)
      memCache.refresh(cacheKey)
    }
  })

  if (cachedRes) {
    console.log(`[Mem Cache]: Reading from cache ${cacheKey}`)
    sentCachedResponse = true
    setTimingHeader(res, "cacheHit")
    return res.send(cachedRes.toString("utf-8"))
  }
  setTimingHeader(res, "cacheMiss")
  next()
}
