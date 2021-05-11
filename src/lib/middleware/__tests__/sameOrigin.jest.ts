import { sameOriginMiddleware } from "lib/middleware/sameOrigin"

describe("Same origin middleware", () => {
  let headers = []
  let req
  let res
  let next

  beforeEach(() => {
    req = {
      get: jest.fn().mockReturnValue("http:"),
    }
    res = {
      headers,
      set(name, value) {
        // @ts-expect-error STRICT_NULL_CHECK
        return (headers[name] = value)
      },
    }
    next = jest.fn()
  })

  it("adds x-frame-options header", () => {
    sameOriginMiddleware(req, res, next)
    res.headers["X-Frame-Options"].should.equal("SAMEORIGIN")
  })
})
