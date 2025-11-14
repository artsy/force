import { downcaseMiddleware } from "Server/middleware/downcase"

describe("downcase middleware", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.req = { _parsedUrl: { search: null } }
    testContext.res = { redirect: jest.fn() }
    testContext.next = jest.fn()
  })

  it("should not redirect lowercase paths", () => {
    testContext.req._parsedUrl.pathname = "/foo/bar"
    downcaseMiddleware(testContext.req, testContext.res, testContext.next)

    expect(testContext.res.redirect).toBeCalledTimes(0)
    expect(testContext.next).toBeCalled()
  })

  it("should redirect paths with uppercase letters", () => {
    testContext.req._parsedUrl.pathname = "/Foo/Bar"
    downcaseMiddleware(testContext.req, testContext.res, testContext.next)

    expect(testContext.res.redirect).toBeCalled()
    expect(testContext.next).toBeCalledTimes(0)
    expect(testContext.res.redirect).toBeCalledWith(301, "/foo/bar")
  })

  it("should not lowercase the query string", () => {
    testContext.req._parsedUrl.search = "?Bar=Baz"
    testContext.req._parsedUrl.pathname = "/Foo"
    downcaseMiddleware(testContext.req, testContext.res, testContext.next)

    expect(testContext.res.redirect).toBeCalled()
    expect(testContext.next).toBeCalledTimes(0)
    expect(testContext.res.redirect).toBeCalledWith(301, "/foo?Bar=Baz")
  })
})
