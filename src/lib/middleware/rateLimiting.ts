import config from "../../config"
import { RateLimiterMemory, RateLimiterRedis } from "rate-limiter-flexible"

const {
  OPENREDIS_URL,
  REQUEST_EXPIRES,
  REQUEST_LIMIT,
  REQUEST_PER_INSTANCE_FALLBACK,
} = config

export const rateLimiterMiddlewareFactory = redisClient => {
  /**
   * Used as a per process limiter if for whatever reason
   * redis becomes unavailable
   */
  const rateLimiterMemory = new RateLimiterMemory({
    points: REQUEST_PER_INSTANCE_FALLBACK,
    duration: REQUEST_EXPIRES,
  })

  let rateLimiter = rateLimiterMemory

  if (OPENREDIS_URL && redisClient) {
    rateLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      points: REQUEST_LIMIT,
      duration: REQUEST_EXPIRES,
      inmemoryBlockOnConsumed: REQUEST_LIMIT + 1,
      inmemoryBlockDuration: REQUEST_EXPIRES,
      insuranceLimiter: rateLimiterMemory,
    })
  }

  const rateLimiterMiddleware = (req, _res, next) => {
    rateLimiter
      .consume(req.connection.remoteAddress)
      .then(() => {
        next()
      })
      .catch(res => {
        const secs = Math.round(res.msBeforeNext / 1000) || 1
        res.set("Retry-After", String(secs))
        res.status(429).send("Too Many Requests")
      })
  }
}
