import createLogger from "v2/Utils/logger"
import RelayQueryResponseCache from "relay-runtime/lib/network/RelayQueryResponseCache"
import { isServer } from "lib/environment"
import { RetryStrategyOptions } from "redis"

import {
  GraphQLResponse,
  QueryResponseCache,
  CacheConfig as RelayCacheConfig,
  Variables as RelayVariables,
} from "relay-runtime"

const logger = createLogger("v2/Artsy/middleware/cache/Cache")

export interface CacheConfig {
  size: number
  ttl: number
  disableServerSideCache?: boolean
}

export class Cache {
  cacheConfig: CacheConfig
  enableServerSideCache: boolean
  relayCache: RelayQueryResponseCache

  redisCache: {
    del: (key: string) => Promise<void>
    expire: (key: string, ttl: number) => Promise<void>
    flushall: () => Promise<void>
    get: (key: string) => Promise<string>
    set: (
      key: string,
      value: string,
      expirationCommandCode?: string,
      expirationValue?: string | number
    ) => Promise<void>
  }

  constructor(cacheConfig: CacheConfig) {
    this.cacheConfig = cacheConfig
    this.enableServerSideCache =
      isServer && !this.cacheConfig.disableServerSideCache
    this.initRelayCache()
    this.initRedisCache()
  }

  initRelayCache() {
    this.relayCache = new QueryResponseCache(this.cacheConfig)
  }

  initRedisCache() {
    if (!this.enableServerSideCache) {
      return
    }

    const { promisify } = require("util")
    const redis = require("redis")

    const client = redis.createClient({
      url: process.env.OPENREDIS_URL,
      retry_strategy: this.handleRedisError,
    })

    this.redisCache = {
      del: promisify(client.del).bind(client),
      expire: promisify(client.expire).bind(client),
      flushall: promisify(client.flushall).bind(client),
      get: promisify(client.get).bind(client),
      set: promisify(client.set).bind(client),
    }
  }

  handleRedisError(retryOptions: RetryStrategyOptions) {
    const TIMEOUT = Number(process.env.PAGE_CACHE_RETRIEVAL_TIMEOUT_MS)
    const MAX_RETRIES = 10

    const logAndError = errorMsg => {
      logger.error(errorMsg)
      return new Error(errorMsg)
    }

    switch (true) {
      case retryOptions.error &&
        (retryOptions.error.code === "ECONNREFUSED" ||
          retryOptions.error.code === "NR_CLOSED"): {
        return logAndError(
          "[Redis] The server refused the connection. Retrying..."
        )
      }
      case retryOptions.total_retry_time > TIMEOUT: {
        return logAndError(`[Redis] Retry time exhausted: ${TIMEOUT}ms`)
      }
      case retryOptions.attempt > MAX_RETRIES: {
        return logAndError(`[Redis] Retry attempts exceeded: ${MAX_RETRIES}`)
      }
    }

    const reconnectBackoffTime = Math.min(retryOptions.attempt * 100, 3000)
    return reconnectBackoffTime
  }

  getCacheKey(queryId: string, variables: RelayVariables) {
    const cacheKey = JSON.stringify({ queryId, variables })
    return cacheKey
  }

  async get(queryId: string, variables: RelayVariables) {
    let cachedRes = this.relayCache.get(queryId, variables)

    // No cache in relay store, check redis
    if (this.enableServerSideCache && !cachedRes) {
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

  async set(
    queryId: string,
    variables: RelayVariables,
    res: GraphQLResponse,
    options: { cacheConfig: RelayCacheConfig }
  ) {
    this.relayCache.set(queryId, variables, res)

    // Store in redis during server-side pass
    if (this.enableServerSideCache && !options?.cacheConfig?.force) {
      const cacheKey = this.getCacheKey(queryId, variables)

      try {
        /**
         * Set a value with an expiry in MS.
         * @see https://redis.io/commands/set
         * @see https://github.com/NodeRedis/node-redis/issues/1000#issuecomment-193155582
         */
        await this.redisCache.set(
          cacheKey,
          JSON.stringify(res),
          "PX",
          this.cacheConfig.ttl
        )
        logger.log("\nCache operation: [set]", cacheKey)
      } catch (error) {
        logger.error("Error setting cache: [set]", cacheKey, error)
      }
    }
  }

  async clear() {
    this.relayCache.clear()

    if (isServer) {
      // TODO: How should we handle clear's here?
      // await this.redisCache.flushall()
    }
  }
}
