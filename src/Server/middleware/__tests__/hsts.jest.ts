import { hstsMiddleware } from "Server/middleware/hsts"

jest.mock("Server/config", () => {
  return {
    APP_URL: "https://foobart.sy",
  }
})

describe("HTTP strict transport security middleware", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.req = {}
    testContext.res = {
      headers: [],
      set(name, value) {
        this.headers[name] = value
      },
    }
    testContext.next = jest.fn()
  })

  it("adds Strict-Transport-Security header", () => {
    testContext.req.get = () => "https"
    hstsMiddleware(testContext.req, testContext.res, testContext.next)
    expect(testContext.res.headers["Strict-Transport-Security"]).toEqual(
      "max-age=31536000"
    )
  })
})
