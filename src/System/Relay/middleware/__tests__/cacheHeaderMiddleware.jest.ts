import { cacheHeaderMiddleware } from "System/Relay/middleware/cacheHeaderMiddleware"

describe("cacheHeaderMiddleware", () => {
  const next = jest.fn()
  const req = {
    fetchOpts: {
      headers: {},
    },
    cacheConfig: { someKey: "someValue" },
  }

  beforeEach(() => {
    next.mockClear()
  })

  it("should add x-relay-cache-config header", async () => {
    next.mockResolvedValue({ status: 200 })

    const middleware = cacheHeaderMiddleware()(next)
    const res = await middleware(req)

    expect(req.fetchOpts.headers["x-relay-cache-config"]).toBe(
      JSON.stringify(req.cacheConfig)
    )
    expect(next).toHaveBeenCalledWith(req)
    expect(res).toEqual({ status: 200 })
  })

  it("should add x-relay-cache-path header", async () => {
    jest.spyOn(window as any, "location", "get").mockImplementation(() => ({
      pathname: "/foo",
    }))

    next.mockResolvedValue({ status: 200 })

    const middleware = cacheHeaderMiddleware()(next)
    const res = await middleware(req)

    expect(req.fetchOpts.headers["x-relay-cache-path"]).toBe("/foo")
    expect(next).toHaveBeenCalledWith(req)
    expect(res).toEqual({ status: 200 })
  })

  it("should return the response from next function", async () => {
    const mockResponse = { status: 200, data: "mockData" }
    next.mockResolvedValue(mockResponse)

    const middleware = cacheHeaderMiddleware()(next)
    const res = await middleware(req)

    expect(res).toEqual(mockResponse)
  })
})
