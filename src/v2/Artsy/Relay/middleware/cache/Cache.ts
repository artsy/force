import { QueryResponseCache } from "relay-runtime"
import createLogger from "v2/Utils/logger"
import RelayQueryResponseCache from "relay-runtime/lib/network/RelayQueryResponseCache"
import { isServer } from "lib/environment"

const logger = createLogger("v2/Artsy/middleware/cache/Cache")

export interface CacheConfig {
  size: number
  ttl: number
}

export class Cache {
  cacheConfig: CacheConfig
  relayCache: RelayQueryResponseCache

  redisCache: {
    get: (key: string) => Promise<string>
    set: (key: string, value: string) => Promise<void>
    del: (key: string) => Promise<void>
    flushall: () => Promise<void>
  }

  constructor(cacheConfig: CacheConfig) {
    this.cacheConfig = cacheConfig
    this.initRelayCache()
    this.initRedisCache()
  }

  initRelayCache() {
    this.relayCache = new QueryResponseCache(this.cacheConfig)
  }

  initRedisCache() {
    if (!isServer) {
      return
    }

    const { promisify } = require("util")
    const redis = require("redis")
    const client = redis.createClient()

    this.redisCache = {
      get: promisify(client.get).bind(client),
      set: promisify(client.set).bind(client),
      del: promisify(client.del).bind(client),
      flushall: promisify(client.flushall).bind(client),
    }
  }

  getCacheKey(query, variables) {
    const cacheKey = JSON.stringify({ query, variables })
    return cacheKey
  }

  async get(queryId, variables) {
    let cachedRes = this.relayCache.get(queryId, variables)

    // No cache in relay store, check redis
    if (isServer && !cachedRes) {
      const cacheKey = this.getCacheKey(queryId, variables)

      try {
        cachedRes = JSON.parse(await this.redisCache.get(cacheKey))
        if (cachedRes) {
          logger.log("\nCache operation: [get]", cacheKey)
        }
      } catch (error) {
        logger.error("Error retrieving cache: [get]", cacheKey, error)
      }
    }

    return cachedRes
  }

  async set(queryId, variables, res) {
    this.relayCache.set(queryId, variables, res)

    // Store in redis during server-side pass
    if (isServer) {
      const cacheKey = this.getCacheKey(queryId, variables)

      try {
        await this.redisCache.set(cacheKey, JSON.stringify(res))
        logger.log("\nCache operation: [set]", cacheKey)
      } catch (error) {
        logger.error("Error setting cache: [set]", cacheKey, error)
      }
    }
  }

  async clear() {
    this.relayCache.clear()

    if (isServer) {
      await this.redisCache.flushall()
    }
  }
}
