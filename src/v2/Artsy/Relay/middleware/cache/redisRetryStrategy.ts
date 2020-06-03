import { RetryStrategyOptions } from "redis"
import createLogger from "v2/Utils/logger"

const logger = createLogger("v2/Artsy/middleware/cache/redisRetryStrategy")

export function redisRetryStrategy(retryOptions: RetryStrategyOptions) {
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
