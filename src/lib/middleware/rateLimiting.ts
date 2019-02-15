import config from "../../config"
import {
  RateLimiterMemory,
  RateLimiterRedis,
  RateLimiterUnion,
  RateLimiterRes,
} from "rate-limiter-flexible"
import requestIp from "request-ip"

const {
  OPENREDIS_URL,
  BURST_REQUEST_LIMIT,
  BURST_REQUEST_EXPIRE,
  BURST_REQUEST_BLOCK_FOR,
  REQUEST_EXPIRE,
  REQUEST_LIMIT,
  REQUEST_PER_INSTANCE_EXPIRE,
  REQUEST_PER_INSTANCE_LIMIT,
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
      inmemoryBlockOnConsumed: REQUEST_PER_INSTANCE_LIMIT,
      inmemoryBlockDuration: REQUEST_PER_INSTANCE_EXPIRE,
      insuranceLimiter: rateLimiterMemory,
    })
  } else {
    console.warn("[Rate Limiting] OPENREDIS_URL or redisClient not valid")
    console.warn("[Rate Limiting] Using local memory limiter")
  }

  const burstLimiter = new RateLimiterMemory({
    keyPrefix: "burst",
    points: BURST_REQUEST_LIMIT,
    duration: BURST_REQUEST_EXPIRE,
    blockDuration: BURST_REQUEST_BLOCK_FOR,
  })

  const combinedRateLimiters = new RateLimiterUnion(burstLimiter, rateLimiter)

  const rateLimiterMiddleware = (req, res, next) => {
    combinedRateLimiters
      .consume(requestIp.getClientIp(req))
      // @ts-ignore (See https://github.com/animir/node-rate-limiter-flexible/pull/19)
      .then(() => next())
      .catch(() => res.status(429).send("Too Many Requests"))
  }

  return rateLimiterMiddleware
}
