import { localsMiddleware } from "lib/middleware/locals"

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

  it("adds a session id", () => {
    localsMiddleware(req, res, next)
    req.session.id.length.should.be.above(0)
    res.locals.sd.SESSION_ID.should.equal(req.session.id)
  })

  it("adds the user agent", () => {
    req.get.mockReturnValueOnce("foobar<script>omg</script>")
    localsMiddleware(req, res, next)
    res.locals.userAgent.should.equal("foobar%3Cscript%3Eomg%3C/script%3E")
  })

  it("current_path does not include query params", () => {
    req.get.mockReturnValueOnce("foobar")
    req.url = "localhost:3000/foo?bar=baz"
    localsMiddleware(req, res, next)
    res.locals.sd.CURRENT_PATH.should.equal("/foo")
  })

  it("flags eigen", () => {
    req.get.mockReturnValueOnce("Something something Artsy-Mobile")
    req.url = "localhost:3000/foo?bar=baz"
    localsMiddleware(req, res, next)
    res.locals.sd.EIGEN.should.be.ok()
  })

  it('adds the referrer "medium"', () => {
    req = {
      get() {
        return "https://www.google.com/"
      },
      url: "localhost:3000",
    }
    localsMiddleware(req, res, next)
    res.locals.sd.MEDIUM.should.equal("search")
  })

  it("flags reflection", () => {
    req.get.mockReturnValueOnce("Artsy/Reflection")
    localsMiddleware(req, res, next)
    res.locals.sd.REFLECTION.should.be.ok()
  })

  it("works if there is no user agent", () => {
    req.get.mockReturnValueOnce(null)
    req.url = ""
    localsMiddleware(req, res, next)
    res.locals.sd.EIGEN.should.equal(false)
  })
})
