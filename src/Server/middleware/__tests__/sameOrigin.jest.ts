import { sameOriginMiddleware } from "Server/middleware/sameOrigin"

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
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        return (headers[name] = value)
      },
    }
    next = jest.fn()
  })

  it("adds x-frame-options header", () => {
    sameOriginMiddleware(req, res, next)
    expect(res.headers["X-Frame-Options"]).toEqual("SAMEORIGIN")
  })
})
