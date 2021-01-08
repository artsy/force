import { proxyReflectionMiddleware } from "../../../lib/middleware/proxyReflection"
import httpProxy from "http-proxy"
import request from "superagent"

jest.mock("superagent", () => {
  return jest.fn()
})

jest.mock("http-proxy", () => {
  const _proxy = { web: jest.fn() }
  return {
    createProxyServer: jest.fn(() => {
      return _proxy
    }),
    _proxy,
  }
})

describe("proxyToReflection", () => {
  let testContext

  beforeEach(() => {
    testContext = {}
  })

  beforeEach(() => {
    testContext.req = { query: {} }
    testContext.res = {}
    testContext.next = jest.fn()
    request.head = jest.fn(() => request)
    request.end = jest.fn(() => request)
    httpProxy._proxy.web = jest.fn()
  })

  it("passes through when there is no escaped fragment query param", () => {
    testContext.req.query._escaped_fragment_ = null
    proxyReflectionMiddleware(
      testContext.req,
      testContext.res,
      testContext.next
    )
    expect(testContext.next).toBeCalled()
  })

  it("passes through if reflection fails", () => {
    testContext.req.url = "test"
    testContext.req.query._escaped_fragment_ = ""
    const err = new Error("Unauthorized") as any
    err.status = 403
    request.end.mockImplementationOnce(cb => {
      cb(err)
    })
    proxyReflectionMiddleware(
      testContext.req,
      testContext.res,
      testContext.next
    )
    expect(testContext.next).toBeCalled()
  })

  describe("with _escaped_fragment_", () => {
    const paths = {
      "/artwork/foo-bar?_escaped_fragment_=": "/artwork/foo-bar",
      "/artwork/foo-bar?a=b&c=d&_escaped_fragment_=":
        "/artwork/foo-bar%3Fa%3Db%26c%3Dd",
      "/artwork/foo-bar?a=b&c=d%3Ae&_escaped_fragment_=":
        "/artwork/foo-bar%3Fa%3Db%26c%3Dd%3Ae",
    }

    for (let source in paths) {
      let dest = paths[source]
      it(`proxies ${source} to ${dest}`, () => {
        testContext.req.url = source
        testContext.req.query._escaped_fragment_ = ""
        request.end.mockImplementationOnce(cb => {
          cb()
        })
        proxyReflectionMiddleware(
          testContext.req,
          testContext.res,
          testContext.next
        )
        const options = httpProxy._proxy.web.mock.calls[0][2]
        expect(options.target).toContain(dest)
        expect(options.target.endsWith(dest)).toBeTruthy()
      })
    }
  })
})
