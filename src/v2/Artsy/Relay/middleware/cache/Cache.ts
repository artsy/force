import { QueryResponseCache } from "relay-runtime"
import createLogger from "v2/Utils/logger"
import RelayQueryResponseCache from "relay-runtime/lib/network/RelayQueryResponseCache"

const logger = createLogger("[v2/Artsy/middleware/cacheMiddleware]")

export interface CacheConfig {
  size: number
  ttl: number
}

export class Cache {
  isServer: boolean
  cacheConfig: CacheConfig
  relayCache: RelayQueryResponseCache

  redisCache: {
    get: (key: string) => Promise<string>
    set: (key: string, value: string) => Promise<void>
    del: (key: string) => Promise<void>
    flushall: () => Promise<void>
  }

  constructor(cacheConfig: CacheConfig) {
    this.isServer = typeof window === "undefined"
    this.cacheConfig = cacheConfig
    this.initRelayCache()
    this.initRedisCache()
  }

  initRelayCache() {
    this.relayCache = new QueryResponseCache(this.cacheConfig)
  }

  initRedisCache() {
    if (!this.isServer) {
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

  lookup(query, variables) {
    const lookupKey = JSON.stringify({ query, variables })
    return lookupKey
  }

  async get(queryId, variables) {
    let cachedRes = this.relayCache.get(queryId, variables)

    // No cache in relay store, check redis
    if (this.isServer && !cachedRes) {
      const lookupKey = this.lookup(queryId, variables)

      try {
        cachedRes = JSON.parse(await this.redisCache.get(lookupKey))
        if (cachedRes) {
          logger.log("\nCache operation: [get]", lookupKey)
        }
      } catch (error) {
        logger.error("Error retrieving cache: [get]", lookupKey, error)
      }
    }

    return cachedRes
  }

  async set(queryId, variables, res) {
    this.relayCache.set(queryId, variables, res)

    // Store in redis during server-side pass
    if (this.isServer) {
      const lookupKey = this.lookup(queryId, variables)

      try {
        await this.redisCache.set(lookupKey, JSON.stringify(res))
        logger.log("\nCache operation: [set]", lookupKey)
      } catch (error) {
        logger.error("Error setting cache: [set]", lookupKey, error)
      }
    }
  }

  async clear() {
    this.relayCache.clear()

    if (this.isServer) {
      await this.redisCache.flushall()
    }
  }
}
