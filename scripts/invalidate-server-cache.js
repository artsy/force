// @ts-check

require("dotenv/config")

const redis = require("redis")

const redisClient = redis.createClient({
  url: process.env.OPENREDIS_URL,
})

redisClient.flushall(() => {
  console.log("[invalidate-server-cache] Cache invalidated.")
  redisClient.quit()
})
