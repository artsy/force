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

  it("adds the user agent", () => {
    req.get.mockReturnValueOnce("foobar<script>omg</script>")
    localsMiddleware(req, res, next)
    expect(res.locals.userAgent).toEqual("foobar%3Cscript%3Eomg%3C/script%3E")
  })

  it('adds the referrer "medium"', () => {
    req = {
      get() {
        return "https://www.google.com/"
      },
      url: "localhost:3000",
    }
    localsMiddleware(req, res, next)
    expect(res.locals.sd.MEDIUM).toEqual("search")
  })

  it("flags reflection", () => {
    req.get.mockReturnValueOnce("Artsy/Reflection")
    localsMiddleware(req, res, next)
    expect(res.locals.sd.REFLECTION).toBeTruthy()
  })
})
