import { redisRetryStrategy } from "../redisRetryStrategy"

describe("redis errors", () => {
  it("throws error if ECONNREFUSED", () => {
    const err = redisRetryStrategy({
      error: {
        code: "ECONNREFUSED",
      },
    } as any) as Error
    expect(err.message).toContain("The server refused the connection")
  })

  it("throws error if retrieval time exceeds PAGE_CACHE_RETRIEVAL_TIME", () => {
    process.env.PAGE_CACHE_RETRIEVAL_TIMEOUT_MS = "10"
    const err = redisRetryStrategy({
      total_retry_time: 100000,
    } as any) as Error
    expect(err.message).toContain("Retry time exhausted")
  })

  it("throws error if number of attempts exceeds MAX_RETRIES", () => {
    const err = redisRetryStrategy({
      attempt: 11,
    } as any) as Error
    expect(err.message).toContain("Retry attempts exceeded")
  })

  it("returns a retry time that backs off", () => {
    ;[...new Array(10)].forEach(index => {
      const retryTime = redisRetryStrategy({
        attempt: index,
      } as any) as Error
      expect(retryTime).toEqual(index * 100)
    })
  })
})
