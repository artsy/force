import { QueryResponseCache } from "relay-runtime"
import createLogger from "v2/Utils/logger"
import RelayQueryResponseCache from "relay-runtime/lib/network/RelayQueryResponseCache"
import { isDevelopment, isServer } from "lib/environment"
import { once } from "lodash"

const logger = createLogger("v2/Artsy/middleware/cache/Cache")

export interface CacheConfig {
  size: number
  ttl: number
  disableServerSideCache?: boolean
}

export class Cache {
  cacheConfig: CacheConfig
  enableServerSideCaching: boolean
  relayCache: RelayQueryResponseCache

  redisCache: {
    del: (key: string) => Promise<void>
    expire: (key: string, ttl: number) => Promise<void>
    flushall: () => Promise<void>
    get: (key: string) => Promise<string>
    set: (key: string, value: string) => Promise<void>
  }

  constructor(cacheConfig: CacheConfig) {
    this.cacheConfig = cacheConfig
    this.enableServerSideCaching =
      isServer && !this.cacheConfig.disableServerSideCache
    this.initRelayCache()
    this.initRedisCache()
  }

  initRelayCache() {
    this.relayCache = new QueryResponseCache(this.cacheConfig)
  }

  initRedisCache() {
    if (!this.enableServerSideCaching) {
      return
    }

    const { promisify } = require("util")
    const redis = require("redis")

    const client = redis.createClient({
      url: isDevelopment ? null : process.env.OPENREDIS_URL,
      retry_strategy: this.handleRedisRetry,
    })

    this.redisCache = {
      del: promisify(client.del).bind(client),
      expire: promisify(client.expire).bind(client),
      flushall: promisify(client.flushall).bind(client),
      get: promisify(client.get).bind(client),
      set: promisify(client.set).bind(client),
    }

    client.on(
      "error",
      once(error => {
        logger.error("REDIS_CONNECTION_ERROR", error)
        this.enableServerSideCaching = false
      })
    )
  }

  handleRedisRetry(retryOptions) {
    if (retryOptions.error && retryOptions.error.code === "ECONNREFUSED") {
      return new Error("The server refused the connection")
    }
    if (
      retryOptions.total_retry_time >
      process.env.PAGE_CACHE_RETRIEVAL_TIMEOUT_MS
    ) {
      return new Error(
        `Retry time exhausted: ${process.env.PAGE_CACHE_RETRIEVAL_TIMEOUT_MS}ms`
      )
    }

    // End reconnecting with built in error
    if (retryOptions.attempt > 10) {
      return undefined
    }

    const reconnectAfter = Math.min(retryOptions.attempt * 100, 3000)
    return reconnectAfter
  }

  getCacheKey(queryId, variables) {
    const cacheKey = JSON.stringify({ queryId, variables })
    return cacheKey
  }

  async get(queryId, variables) {
    let cachedRes = this.relayCache.get(queryId, variables)

    // No cache in relay store, check redis
    if (this.enableServerSideCaching && !cachedRes) {
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

  async set(queryId, variables, res, { cacheConfig }) {
    this.relayCache.set(queryId, variables, res)

    // Store in redis during server-side pass
    if (this.enableServerSideCaching && !cacheConfig.force) {
      const cacheKey = this.getCacheKey(queryId, variables)

      try {
        await this.redisCache.set(cacheKey, JSON.stringify(res))
        await this.redisCache.expire(cacheKey, this.cacheConfig.ttl)
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
