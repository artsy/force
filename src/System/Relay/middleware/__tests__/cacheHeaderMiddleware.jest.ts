import { cacheHeaderMiddleware } from "System/Relay/middleware/cacheHeaderMiddleware"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"

jest.mock("System/Router/Utils/routeUtils", () => ({
  findRoutesByPath: jest.fn().mockReturnValue([]),
}))

describe("cacheHeaderMiddleware", () => {
  const mockFindRoutesByPath = findRoutesByPath as jest.Mock
  const next = jest.fn()
  let req

  beforeEach(() => {
    req = {
      fetchOpts: {
        headers: {},
      },
      cacheConfig: { someKey: "someValue" },
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Cache-Control headers", () => {
    describe("allowing a request to be cached by the CDN", () => {
      it("allows caching even when logged in if the @cacheable directive was used", async () => {
        req.operation = {
          text: `
          query ArtistQuery @cacheable {
            artist(id: "andy-warhol) {
              name
            }
          }
        `,
        }

        jest.spyOn(window as any, "location", "get").mockImplementation(() => ({
          pathname: "/artists",
        }))

        next.mockResolvedValue({ status: 200 })

        const middleware = cacheHeaderMiddleware({
          user: { email: "foo" },
          url: "/foo",
        })(next)
        const res = await middleware(req)

        expect(req.fetchOpts.headers["Cache-Control"]).toBeUndefined()
        expect(next).toHaveBeenCalledWith(req)
        expect(res).toEqual({ status: 200 })
      })
    })

    describe("skipping the cache", () => {
      it("skips CDN cache if logged in", async () => {
        jest.spyOn(window as any, "location", "get").mockImplementation(() => ({
          pathname: "/not-found",
        }))

        next.mockResolvedValue({ status: 200 })

        const middleware = cacheHeaderMiddleware({
          user: { email: "foo" },
          url: "/bar",
        })(next)

        const res = await middleware(req)

        expect(req.fetchOpts.headers["Cache-Control"]).toBe("no-cache")
        expect(next).toHaveBeenCalledWith(req)
        expect(res).toEqual({ status: 200 })
      })

      it("skips CDN cache if invalid path", async () => {
        jest.spyOn(window as any, "location", "get").mockImplementation(() => ({
          pathname: "/not-found",
        }))

        next.mockResolvedValue({ status: 200 })

        const middleware = cacheHeaderMiddleware({
          url: null,
          user: null,
        })(next)

        const res = await middleware(req)

        expect(req.fetchOpts.headers["Cache-Control"]).toBeUndefined()
        expect(next).toHaveBeenCalledWith(req)
        expect(res).toEqual({ status: 200 })
      })

      it("skips CDN cache if force: true", async () => {
        req.cacheConfig.force = true

        jest.spyOn(window as any, "location", "get").mockImplementation(() => ({
          pathname: "/not-found",
        }))

        next.mockResolvedValue({ status: 200 })

        const middleware = cacheHeaderMiddleware()(next)
        const res = await middleware(req)

        expect(req.fetchOpts.headers["Cache-Control"]).toBe("no-cache")
        expect(next).toHaveBeenCalledWith(req)
        expect(res).toEqual({ status: 200 })
      })

      it("skips CDN cache if route-level TTL is set to 0", async () => {
        mockFindRoutesByPath.mockReturnValue([
          {
            match: { params: { id: "bar" } },
            route: {
              path: "/foo",
              query: "TestQuery",
              serverCacheTTL: 0,
            },
          },
        ])

        jest.spyOn(window as any, "location", "get").mockImplementation(() => ({
          pathname: "/artists",
        }))

        next.mockResolvedValue({ status: 200 })

        const middleware = cacheHeaderMiddleware()(next)
        const res = await middleware(req)

        expect(req.fetchOpts.headers["Cache-Control"]).toBe("no-cache")
        expect(next).toHaveBeenCalledWith(req)
        expect(res).toEqual({ status: 200 })
      })

      it("skips CDN cache if nocache query param present", async () => {
        req.operation = {
          text: `
          query ArtistQuery @cacheable {
            artist(id: "andy-warhol) {
              name
            }
          }
        `,
        }

        jest.spyOn(window as any, "location", "get").mockImplementation(() => ({
          pathname: "/artists?nocache=1",
        }))

        next.mockResolvedValue({ status: 200 })

        const middleware = cacheHeaderMiddleware({
          user: { email: "foo" },
        })(next)
        const res = await middleware(req)

        expect(req.fetchOpts.headers["Cache-Control"]).toBe("no-cache")
        expect(next).toHaveBeenCalledWith(req)
        expect(res).toEqual({ status: 200 })
      })
    })

    it("sets custom route-level TTLs", async () => {
      mockFindRoutesByPath.mockReturnValue([
        {
          match: { params: { id: "bar" } },
          route: {
            path: "/foo",
            query: "TestQuery",
            serverCacheTTL: 8600,
          },
        },
      ])

      jest.spyOn(window as any, "location", "get").mockImplementation(() => ({
        pathname: "/artists",
      }))

      next.mockResolvedValue({ status: 200 })

      const middleware = cacheHeaderMiddleware()(next)
      const res = await middleware(req)

      expect(req.fetchOpts.headers["Cache-Control"]).toBe("max-age=8600")
      expect(next).toHaveBeenCalledWith(req)
      expect(res).toEqual({ status: 200 })
    })
  })

  it("should return the response from next function", async () => {
    const mockResponse = { status: 200, data: "mockData" }
    next.mockResolvedValue(mockResponse)

    const middleware = cacheHeaderMiddleware()(next)
    const res = await middleware(req)

    expect(res).toEqual(mockResponse)
  })
})
