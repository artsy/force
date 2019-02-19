import {
  _rateLimiterMiddleware,
  BURST_LIMIT_MESSAGE,
  RATE_LIMIT_MESSAGE,
} from "../rateLimiting"

describe("rate limiting", () => {
  let rateLimiter
  let burstLimiter
  let next
  let res
  let status
  let send
  let middleware

  beforeEach(() => {
    burstLimiter = {
      consume: jest.fn(),
    }
    rateLimiter = {
      consume: jest.fn(),
    }
    next = jest.fn()
    send = jest.fn()
    status = jest.fn().mockReturnValue({ send })
    res = { status }
    middleware = _rateLimiterMiddleware(burstLimiter, rateLimiter)
  })

  it("should respond with burst limit message if burst limit hit", async () => {
    burstLimiter.consume.mockRejectedValue("")
    await middleware("", res, next)

    expect(burstLimiter.consume).toBeCalled()
    expect(rateLimiter.consume).not.toBeCalled()
    expect(send).toHaveBeenCalledWith(BURST_LIMIT_MESSAGE)
    expect(status).toHaveBeenCalledWith(429)
    expect(next).not.toBeCalled()
  })

  it("should respond with the rate limit message if rate limit hit", async () => {
    burstLimiter.consume.mockResolvedValue("")
    rateLimiter.consume.mockRejectedValue("")
    await middleware("", res, next)

    expect(burstLimiter.consume).toBeCalled()
    expect(rateLimiter.consume).toBeCalled()
    expect(send).toHaveBeenCalledWith(RATE_LIMIT_MESSAGE)
    expect(status).toHaveBeenCalledWith(429)
    expect(next).not.toBeCalled()
  })

  it("should call next if no limits are hit", async () => {
    burstLimiter.consume.mockResolvedValue("")
    rateLimiter.consume.mockResolvedValue("")
    await middleware("", res, next)

    expect(burstLimiter.consume).toBeCalled()
    expect(rateLimiter.consume).toBeCalled()
    expect(send).not.toBeCalled()
    expect(next).toBeCalled()
  })
})
