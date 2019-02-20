import config from "../../config"
import {
  RateLimiterMemory,
  RateLimiterRedis,
  RateLimiterAbstract,
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

export const BURST_LIMIT_MESSAGE = "Too Many Requests (3.1)"
export const RATE_LIMIT_MESSAGE = "Too Many Requests (3.2)"

/**
 * If ddos traffic gets into force this is our first line of defense.
 * Every cycle counts. It processes the burst limiter first which is
 * the most performant and most likely to be tripped by an attack. It
 * goes through the rateLimiter afterwards for a marginally slower, but
 * distributed rate limit.
 */
export const _rateLimiterMiddleware = <
  B extends RateLimiterAbstract,
  R extends RateLimiterAbstract
>(
  burstLimiter: B,
  rateLimiter: R
) => (req, res, next) => {
  const ip = requestIp.getClientIp(req)

  // Ensure promise returns for test purposes
  // Not needed for actual middleware
  return burstLimiter.consume(ip).then(
    () =>
      rateLimiter
        .consume(ip)
        .then(next)
        .catch(() => res.status(429).send(RATE_LIMIT_MESSAGE)),
    () => res.status(429).send(BURST_LIMIT_MESSAGE)
  )
}

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

  /**
   * This limiter governs high volume requests in a short window from a similar
   * IP on one instance of force. If one IP uses more `points` in the specified
   * `duration` it will be rate limited for the `blockDuration`.
   */
  const burstLimiter = new RateLimiterMemory({
    keyPrefix: "burst",
    points: BURST_REQUEST_LIMIT,
    duration: BURST_REQUEST_EXPIRE,
    blockDuration: BURST_REQUEST_BLOCK_FOR,
  })

  return _rateLimiterMiddleware(burstLimiter, rateLimiter)
}
