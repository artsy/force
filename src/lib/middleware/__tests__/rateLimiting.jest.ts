import { _rateLimiterMiddleware, BURST_LIMIT_MESSAGE } from "../rateLimiting"

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
    status = jest.fn().mockReturnValue(send)
    res = { status }
    middleware = _rateLimiterMiddleware(burstLimiter, rateLimiter)
  })

  it("should respond with burst limit message if burst limit hit", async () => {
    burstLimiter.consume.mockRejectedValue("")
    await middleware("", res, next)

    expect(send).toHaveBeenCalledWith(BURST_LIMIT_MESSAGE)
    expect(status).toHaveBeenCalledWith(429)
    expect(next).not.toBeCalled()
  })
})
