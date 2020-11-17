import {
  // @ts-ignore
  PAGE_CACHE_ENABLED,
  // @ts-ignore
  PAGE_CACHE_EXPIRY_SECONDS,
  // @ts-ignore
  PAGE_CACHE_NAMESPACE,
  // @ts-ignore
  PAGE_CACHE_RETRIEVAL_TIMEOUT_MS,
  // @ts-ignore
  PAGE_CACHE_TYPES,
  // @ts-ignore
  PAGE_CACHE_VERSION,
} from "../../config"
import { NextFunction, Request, Response } from "express"
const cache = require("lib/cache")
const runningTests = Object.keys(
  require("desktop/components/split_test/running_tests.coffee")
).sort()
const cacheablePageTypes: string[] = PAGE_CACHE_TYPES.split("|")
import { getContextPageFromReq } from "lib/getContextPage"

// Middleware will `next` and do nothing if any of the following is true:
//
// * page cache feature is disabled.
// * a user is signed in.
// * this isnt a supported cacheable path (there is an allow-list set in ENV).
// * the page content is uncached.
// * the cache errors.
export const pageCacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!PAGE_CACHE_ENABLED) return next()

  // Returns true if the page type corresponding to `url` is configured cacheable.
  const isCacheablePageType = (req: Request) => {
    const { pageType } = getContextPageFromReq(req)

    return cacheablePageTypes.includes(pageType)
  }
  if (!isCacheablePageType(req)) return next()

  // @ts-ignore
  const hasUser = !!req.user
  if (hasUser) return next()

  // Generate cache key that includes all currently running AB tests and outcomes.
  const runningTestsCacheKey = runningTests
    .map(test => {
      const outcome = res.locals.sd[test.toUpperCase()]
      return `${test}:${outcome}`
    })
    .join("|")

  // `key` should be a full URL w/ query params, and not a path.
  // This is to separate URL's like `/collect` and `/collect?acquireable=true`.
  const cacheKey = (key: string) => {
    return [PAGE_CACHE_NAMESPACE, runningTestsCacheKey, PAGE_CACHE_VERSION, key]
      .filter(Boolean)
      .join("|")
  }

  // `key` is the full URL.
  const cacheHtmlForPage = ({ status, key, html }) => {
    if (status !== 200) return

    cache.set(cacheKey(key), html, PAGE_CACHE_EXPIRY_SECONDS)
  }

  const cacheKeyForRequest = cacheKey(req.url)

  // Register callback to write rendered page data to cache.
  res.once("finish", () => {
    if (res.locals.PAGE_CACHE) {
      // eslint-disable-next-line no-console
      console.log(`[Page Cache]: Writing ${cacheKeyForRequest} to cache`)
      cacheHtmlForPage(res.locals.PAGE_CACHE)
    }
  })

  try {
    await new Promise((resolve, reject) => {
      // Cache timeout handler, will reject if hit.
      let timeoutId = setTimeout(() => {
        timeoutId = null
        const error = new Error(
          `Timeout of ${PAGE_CACHE_RETRIEVAL_TIMEOUT_MS}ms, skipping...`
        )
        reject(error)
      }, PAGE_CACHE_RETRIEVAL_TIMEOUT_MS)

      const handleCacheGet = (_err, html) => {
        if (!timeoutId) return // Already timed out.

        clearTimeout(timeoutId)

        if (html) {
          // eslint-disable-next-line no-console
          console.log(`[Page Cache]: Reading ${cacheKeyForRequest} from cache`)
          return res.send(html)
        }

        resolve()
      }

      cache.get(cacheKey(req.url), handleCacheGet)
    })
  } catch (e) {
    console.error(`[Page Cache Middleware]: ${e.message}`)
  } finally {
    next()
  }
}
