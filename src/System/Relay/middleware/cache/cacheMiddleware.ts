import createLogger from "Utils/logger"
import { Cache, CacheConfig } from "./Cache"
import { isFunction } from "lodash"

const logger = createLogger("System/middleware/cache/cacheMiddleware")

interface CacheMiddlewareOpts extends CacheConfig {
  onInit?: (cache: Cache) => any
  allowMutations?: boolean
  allowFormData?: boolean
  clearOnMutation?: boolean
  cacheErrors?: boolean
  disableServerSideCache?: boolean
}

/**
 * Adapted from `react-relay-network-modern`.
 * @see https://github.com/relay-tools/react-relay-network-modern/tree/master/src/middlewares
 */
export function cacheMiddleware(opts?: CacheMiddlewareOpts) {
  const {
    size,
    ttl,
    onInit,
    allowMutations,
    allowFormData,
    clearOnMutation,
    cacheErrors,
    disableServerSideCache = true,
  } = opts || {}

  const cache = new Cache({
    size: size || 100, // 100 requests
    ttl: ttl || 15 * 60 * 1000, // 15 minutes
    disableServerSideCache,
  })

  if (isFunction(onInit)) {
    onInit(cache)
  }

  return next => async req => {
    const isServer = typeof window === "undefined"

    if (req.isMutation()) {
      if (clearOnMutation) {
        await cache.clear()
      }
      if (!allowMutations) {
        return next(req)
      }
    }

    if (req.isFormData() && !allowFormData) {
      return next(req)
    }

    if (
      (isServer && disableServerSideCache) ||
      (req.cacheConfig && req.cacheConfig.force)
    ) {
      return next(req)
    }

    try {
      const queryId = req.getID()
      const variables = req.getVariables()

      const cachedRes = await cache.get(queryId, variables)
      if (cachedRes) {
        return cachedRes
      }

      const res = await next(req)
      if (!res.errors || (res.errors && cacheErrors)) {
        await cache.set(queryId, variables, res, {
          cacheConfig: req.cacheConfig,
        })
      }

      return res
    } catch (error) {
      logger.error(error)
    }

    return next(req)
  }
}
