import createLogger from "v2/Utils/logger"

interface RedisCache {
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

let redisClient
let cache: RedisCache

const logger = createLogger("lib/cacheClient")

const safeCacheCommand = async (func, ...args) => {
  try {
    let data
    await new Promise((resolve, reject) => {
      let timeoutId: NodeJS.Timer | null = setTimeout(() => {
        timeoutId = null
        const error = new Error(
          `Timeout of ${process.env.PAGE_CACHE_RETRIEVAL_TIMEOUT_MS}ms, skipping...`
        )
        reject(error)
      }, process.env.PAGE_CACHE_RETRIEVAL_TIMEOUT_MS as any)

      const cb = (_err, resp) => {
        if (!timeoutId) return // Already timed out.

        clearTimeout(timeoutId)

        data = resp

        resolve()
      }

      redisClient[func](...args, cb)
    })
    return data
  } catch (e) {
    console.log(`[cacheClient#${func}]: ${e.message}`)
  }
}

export const setup = (cb: () => void) => {
  const { promisify } = require("util")
  const redis = require("redis")

  redisClient = redis.createClient({
    url: process.env.OPENREDIS_URL,
  })

  redisClient.on("error", err => {
    logger.error("Redis Connection Error", err)
    cb() // TODO: Should this block Force from booting/retry?
  })

  const cacheSet = async (
    key,
    value,
    expirationCommandCode,
    expirationValue
  ) => {
    return await safeCacheCommand(
      "set",
      key,
      value,
      expirationCommandCode,
      expirationValue
    )
  }

  const cacheGet = async key => {
    return await safeCacheCommand("get", key)
  }

  cache = {
    del: promisify(redisClient.del).bind(redisClient),
    expire: promisify(redisClient.expire).bind(redisClient),
    flushall: promisify(redisClient.flushall).bind(redisClient),
    get: cacheGet,
    set: cacheSet,
  }

  cb()
}

export { cache }
