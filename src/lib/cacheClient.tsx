import createLogger from "v2/Utils/logger"

interface RedisCache {
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
const cacheAccessTimeoutMs =
  process.env.PAGE_CACHE_RETRIEVAL_TIMEOUT_MS || "200"

const safeCacheCommand = async (func, ...args) => {
  try {
    let data
    await new Promise((resolve, reject) => {
      // Will reject promise after configured timeout if the
      // cache command has not completed yet.
      let timeoutId = setTimeout(() => {
        timeoutId = null
        const error = new Error(
          `Timeout of ${cacheAccessTimeoutMs}ms, skipping...`
        )
        reject(error)
      }, parseInt(cacheAccessTimeoutMs))

      // Callback to the cache command.
      // * Will clear the timer monitoring the overall length of time.
      // * Will assign the cache response to be returned.
      // * Resolves the promise.
      const cb = (_err, resp) => {
        if (!timeoutId) return // Already timed out.

        clearTimeout(timeoutId)
        data = resp
        resolve()
      }

      // Invoke cache command, passing a callback.
      redisClient[func](...args, cb)
    })

    return data
  } catch (e) {
    logger.error(`[cacheClient#${func}]: ${e.message}`)
  }
}

export const setup = (cb: () => void) => {
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
    get: cacheGet,
    set: cacheSet,
  }

  cb()
}

export { cache }
