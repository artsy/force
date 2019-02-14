import config from "../../config"
import { RateLimiterMemory, RateLimiterRedis } from "rate-limiter-flexible"
import requestIp from "request-ip"

const {
  OPENREDIS_URL,
  REQUEST_EXPIRE,
  REQUEST_LIMIT,
  REQUEST_PER_INSTANCE_FALLBACK,
  ENABLE_RATE_LIMITING,
} = config

export const rateLimiterMiddlewareFactory = redisClient => {
  if (ENABLE_RATE_LIMITING) {
    console.log("[Rate Limiting] Rate limiting enabled")
    console.log(
      `[Rate Limiting] Clients have ${REQUEST_LIMIT} per ${REQUEST_EXPIRE}s`
    )
  } else {
    console.warn("[Rate Limiting] Rate limiting disabled")
    return (_req, _res, next) => next()
  }

  /**
   * Used as a per process limiter if for whatever reason
   * redis becomes unavailable
   */
  const rateLimiterMemory = new RateLimiterMemory({
    points: REQUEST_PER_INSTANCE_FALLBACK,
    duration: REQUEST_EXPIRE,
  })

  let rateLimiter = rateLimiterMemory

  if (OPENREDIS_URL && redisClient) {
    console.log("[Rate Limiting] Using Redis limiter")
    rateLimiter = new RateLimiterRedis({
      storeClient: redisClient,
      points: REQUEST_LIMIT,
      duration: REQUEST_EXPIRE,
      inmemoryBlockOnConsumed: REQUEST_LIMIT + 1,
      inmemoryBlockDuration: REQUEST_EXPIRE,
      insuranceLimiter: rateLimiterMemory,
    })
  } else {
    console.warn("[Rate Limiting] OPENREDIS_URL or redisClient not valid")
    console.warn("[Rate Limiting] Using local memory limiter")
  }

  const rateLimiterMiddleware = (req, res, next) => {
    rateLimiter
      .consume(requestIp.getClientIp(req))
      .then(() => next())
      .catch(limiterResults => {
        const secs = Math.round(limiterResults.msBeforeNext / 1000) || 1
        res.set("Retry-After", String(secs))
        res.status(429).send("Too Many Requests")
      })
  }

  return rateLimiterMiddleware
}
