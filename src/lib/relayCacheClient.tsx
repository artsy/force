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

const logger = createLogger("lib/relayCacheClient")

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

  cache = {
    del: promisify(redisClient.del).bind(redisClient),
    expire: promisify(redisClient.expire).bind(redisClient),
    flushall: promisify(redisClient.flushall).bind(redisClient),
    get: promisify(redisClient.get).bind(redisClient),
    set: promisify(redisClient.set).bind(redisClient),
  }

  cb()
}

export { cache }
