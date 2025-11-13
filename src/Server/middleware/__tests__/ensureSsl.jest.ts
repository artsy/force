const { ensureSslMiddleware } = require("Server/middleware/ensureSsl")

jest.mock("Server/config", () => {
  return {
    APP_URL: "https://foobart.sy",
  }
})

describe("Ensure SSL middleware", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.req = { params: {}, logout: jest.fn(), url: "/terms" }
    testContext.res = { redirect: jest.fn() }
  })

  it("redirects Heroku http requests to https", () => {
    testContext.req.get = () => "http:"
    ensureSslMiddleware(testContext.req, testContext.res)
    expect(testContext.res.redirect).toHaveBeenCalledWith(
      301,
      "https://foobart.sy/terms"
    )
  })

  it("redirects normal http requests to https", () => {
    testContext.req.get = () => ""
    testContext.req.protocol = "http:"
    ensureSslMiddleware(testContext.req, testContext.res, () => {})
    expect(testContext.res.redirect).toHaveBeenCalledWith(
      301,
      "https://foobart.sy/terms"
    )
  })

  it("does not redirect https to https causing an infinite loop", () => {
    let next
    testContext.req.get = () => "https"
    ensureSslMiddleware(testContext.req, testContext.res, (next = jest.fn()))
    expect(next.mock.calls.length).toBe(1)
  })
})
