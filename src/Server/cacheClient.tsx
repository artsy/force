import { isServer } from "Server/isServer"
import createLogger from "Utils/logger"
import { RedisClient } from "redis"

interface RedisCache {
  get: (key: string) => Promise<string>
  set: (
    key: string,
    value: string,
    expirationCommandCode?: string,
    expirationValue?: string | number
  ) => Promise<void>
  redisClient: RedisClient
}

let redisClient

const logger = createLogger("Server/cacheClient")

const cacheAccessTimeoutMs =
  process.env.PAGE_CACHE_RETRIEVAL_TIMEOUT_MS || "200"

const cacheCommandWithTimeout = async (func: "get" | "set", ...args: any[]) => {
  try {
    let data: unknown

    await new Promise<void>((resolve, reject) => {
      // Will reject promise after configured timeout if the cache command has
      // not completed yet.
      let timeoutId: NodeJS.Timeout | null = setTimeout(() => {
        timeoutId = null

        const error = new Error(
          `Timeout of ${cacheAccessTimeoutMs}ms, skipping...`
        )

        reject(error)
      }, parseInt(cacheAccessTimeoutMs))

      /**
       * Callback to the cache command.
       *
       * - Will clear the timer monitoring the overall length of time.
       * - Will assign the cache response to be returned.
       * - Resolves the promise.
       */
      const onComplete = (_err, response) => {
        if (!timeoutId) {
          return // Already timed out.
        }

        clearTimeout(timeoutId)
        data = response
        resolve()
      }

      // Invoke cache command, passing a callback.
      redisClient[func](...args, onComplete)
    })

    return data
  } catch (e) {
    logger.error(`[cacheClient#${func}]: ${e.message}`)
  }
}

const redisCacheSetup = () => {
  if (!isServer) {
    return
  }

  const redis = require("redis")

  redisClient = redis.createClient({
    url: process.env.OPENREDIS_URL,
  })

  redisClient.on("error", err => {
    logger.error("[cacheClient#setup]", err)
  })

  const cacheSet = async (
    key,
    value,
    expirationCommandCode,
    expirationValue
  ) => {
    return await cacheCommandWithTimeout(
      "set",
      key,
      value,
      expirationCommandCode,
      expirationValue
    )
  }

  const cacheGet = async key => {
    return await cacheCommandWithTimeout("get", key)
  }

  return {
    get: cacheGet,
    set: cacheSet,
    redisClient,
  }
}

export const cache = redisCacheSetup() as RedisCache
