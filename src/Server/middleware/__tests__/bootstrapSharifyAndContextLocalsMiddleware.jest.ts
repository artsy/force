import { bootstrapSharifyAndContextLocalsMiddleware } from "Server/middleware/bootstrapSharifyAndContextLocalsMiddleware"

describe("locals middleware", () => {
  let res
  let req
  let next

  beforeEach(() => {
    next = jest.fn()
    req = {
      get: jest.fn(),
      session: {},
      url: "localhost:3000",
    }
    res = { locals: { sd: {}, asset: () => {} } }
  })

  it("adds a session id", () => {
    bootstrapSharifyAndContextLocalsMiddleware(req, res, next)
    expect(req.session.id.length).toBeGreaterThan(0)
    expect(res.locals.sd.SESSION_ID).toEqual(req.session.id)
  })

  it("current_path does not include query params", () => {
    req.get.mockReturnValueOnce("foobar")
    req.url = "localhost:3000/foo?bar=baz"
    bootstrapSharifyAndContextLocalsMiddleware(req, res, next)
    expect(res.locals.sd.CURRENT_PATH).toEqual("/foo")
  })

  it("flags eigen", () => {
    req.get.mockReturnValueOnce("Something something Artsy-Mobile")
    req.url = "localhost:3000/foo?bar=baz"
    bootstrapSharifyAndContextLocalsMiddleware(req, res, next)
    expect(res.locals.sd.EIGEN).toBeTruthy()
  })

  it("works if there is no user agent", () => {
    req.get.mockReturnValueOnce(null)
    req.url = ""
    bootstrapSharifyAndContextLocalsMiddleware(req, res, next)
    expect(res.locals.sd.EIGEN).toEqual(false)
  })

  it("sets IS_MOBILE", () => {
    req.get.mockReturnValueOnce(
      "Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"
    )
    bootstrapSharifyAndContextLocalsMiddleware(req, res, next)
    expect(res.locals.sd.IS_MOBILE).toEqual(true)
  })

  it("sets IS_TABLET", () => {
    req.get.mockReturnValueOnce(
      "Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10"
    )
    bootstrapSharifyAndContextLocalsMiddleware(req, res, next)
    expect(res.locals.sd.IS_TABLET).toEqual(true)
  })
})
