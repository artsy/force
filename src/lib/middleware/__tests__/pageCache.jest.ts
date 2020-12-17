import { pageCacheMiddleware } from "../pageCache"

const cache = require("lib/cache")

jest.mock("lib/cache", () => ({
  get: jest.fn().mockResolvedValue(true),
  set: jest.fn(),
}))

jest.mock("config", () => ({
  PAGE_CACHE_ENABLED: true,
  PAGE_CACHE_EXPIRY_SECONDS: 600,
  PAGE_CACHE_NAMESPACE: "page-cache",
  PAGE_CACHE_RETRIEVAL_TIMEOUT_MS: 400,
  PAGE_CACHE_TYPES: "artist",
  PAGE_CACHE_VERSION: "1",
}))

describe("pageCacheMiddleware", () => {
  let req
  let res
  let next
  beforeEach(() => {
    req = {
      path: "/artist/test-artist",
      url: "https://artsy.net/artist/test-artist",
    }
    res = {
      locals: {
        PAGE_CACHE: {
          html: "html",
          key: "key",
          status: 200,
        },
      },
      once: jest.fn((_e, cb) => cb()),
    }
    next = jest.fn()
    cache.get.mockClear()
    cache.set.mockClear()
  })

  it("sets up cache for valid pageTypes", async () => {
    await pageCacheMiddleware(req, res, next)
    expect(cache.set).toBeCalledWith("page-cache|1|key", "html", 600)
    expect(cache.get.mock.calls[0][0]).toBe(
      "page-cache|1|https://artsy.net/artist/test-artist"
    )
    expect(next).toBeCalled()
  })

  it("skips cache for invalid pageTypes", async () => {
    req = {
      path: "/artist-series/test-artist",
      url: "https://artsy.net/artist-series/test-artist",
    }
    await pageCacheMiddleware(req, res, next)
    expect(cache.set).not.toBeCalled()
    expect(cache.get).not.toBeCalled()
    expect(next).toBeCalled()
  })
})
