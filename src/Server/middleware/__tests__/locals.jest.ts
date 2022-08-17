import { localsMiddleware } from "Server/middleware/locals"

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
})
