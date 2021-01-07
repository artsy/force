import { sharifyLocalsMiddleware } from "lib/middleware/sharifyLocals"

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
    res = { locals: { sd: {} } }
  })

  it("current_path does not include query params", () => {
    req.get.mockReturnValueOnce("foobar")
    req.url = "localhost:3000/foo?bar=baz"
    sharifyLocalsMiddleware(req, res, next)
    res.locals.sd.CURRENT_PATH.should.equal("/foo")
  })

  it("flags eigen", () => {
    req.get.mockReturnValueOnce("Something something Artsy-Mobile")
    req.url = "localhost:3000/foo?bar=baz"
    sharifyLocalsMiddleware(req, res, next)
    res.locals.sd.EIGEN.should.be.ok()
  })

  it("works if there is no user agent", () => {
    req.get.mockReturnValueOnce(null)
    req.url = ""
    sharifyLocalsMiddleware(req, res, next)
    res.locals.sd.EIGEN.should.equal(false)
  })
})
