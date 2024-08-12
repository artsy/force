import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware"
import { createBrotliDecompress, createGunzip } from "zlib"
import { cache } from "Server/cacheClient"
import {
  graphqlProxyMiddleware,
  readCache,
  shouldSkipCache,
  writeCache,
} from "Server/middleware/graphqlProxyMiddleware"
import { ArtsyRequest } from "Server/middleware/artsyExpress"
import {
  RELAY_CACHE_CONFIG_HEADER_KEY,
  RELAY_CACHE_PATH_HEADER_KEY,
} from "System/Relay/middleware/cacheHeaderMiddleware"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"
import { createHash } from "crypto"

jest.mock("Server/config", () => ({
  METAPHYSICS_ENDPOINT: "https://metaphysics.artsy.net",
  GRAPHQL_CACHE_TTL: 3600,
  ENABLE_GRAPHQL_CACHE: true,
}))

jest.mock("http-proxy-middleware", () => ({
  createProxyMiddleware: jest.fn(() => jest.fn()),
  fixRequestBody: jest.fn(),
}))

jest.mock("Server/cacheClient", () => ({
  cache: {
    get: jest.fn(),
    set: jest.fn(),
  },
}))

jest.mock("zlib", () => ({
  createGunzip: jest.fn(() => ({
    pipe: jest.fn().mockReturnThis(),
    on: jest.fn(),
  })),
  createBrotliDecompress: jest.fn(() => ({
    pipe: jest.fn().mockReturnThis(),
    on: jest.fn(),
  })),
}))

jest.mock("System/Router/Utils/routeUtils", () => ({
  findRoutesByPath: jest.fn(),
}))

describe("graphqlProxyMiddleware", () => {
  let req, res, next

  const mockCacheGet = cache.get as jest.Mock

  beforeEach(() => {
    req = { body: {}, headers: {} }
    res = { json: jest.fn(), end: jest.fn() }
    next = jest.fn()
  })

  describe("cache lookup", () => {
    it("should return cached response if available", async () => {
      const cachedResponse = JSON.stringify({ data: "cached", cached: true })
      mockCacheGet.mockResolvedValueOnce(cachedResponse)

      await graphqlProxyMiddleware(req, res, next)

      expect(res.json).toHaveBeenCalledWith(JSON.parse(cachedResponse))
      expect(createProxyMiddleware).not.toHaveBeenCalled()
    })

    it("should not return cached response if cached response contains GraphQL errors", async () => {
      const cachedResponse = JSON.stringify({
        data: "cached",
        errors: ["foo"],
        cached: true,
      })
      mockCacheGet.mockResolvedValueOnce(cachedResponse)

      await graphqlProxyMiddleware(req, res, next)

      expect(res.json).not.toHaveBeenCalled()
      expect(createProxyMiddleware).toHaveBeenCalled()
    })
  })

  it("should call createProxyMiddleware with correct config if no cached response", async () => {
    mockCacheGet.mockResolvedValueOnce(null)

    await graphqlProxyMiddleware(req, res, next)

    expect(createProxyMiddleware).toHaveBeenCalledWith({
      target: `https://metaphysics.artsy.net/v2`,
      changeOrigin: true,
      on: {
        proxyReq: fixRequestBody,
        proxyRes: expect.any(Function),
      },
    })
  })

  it("should call createProxyMiddleware with correct config if user is logged in", async () => {
    req.headers = { "x-access-token": "some-token" }

    await graphqlProxyMiddleware(req, res, next)

    expect(createProxyMiddleware).toHaveBeenCalledWith({
      target: `https://metaphysics.artsy.net/v2`,
      changeOrigin: true,
      on: {
        proxyReq: fixRequestBody,
        proxyRes: expect.any(Function),
      },
    })
  })

  it("should call createProxyMiddleware with correct if shouldSkipCache returns true", async () => {
    req.headers["x-access-token"] = "some-token"
    req.headers["x-relay-cache-config"] = JSON.stringify({ force: true })

    await graphqlProxyMiddleware(req, res, next)

    expect(createProxyMiddleware).toHaveBeenCalledWith({
      target: `https://metaphysics.artsy.net/v2`,
      changeOrigin: true,
      on: {
        proxyReq: fixRequestBody,
        proxyRes: expect.any(Function),
      },
    })
  })
})

describe("readCache", () => {
  let req

  const mockCacheGet = cache.get as jest.Mock

  beforeEach(() => {
    req = { body: { id: "test", query: "", variables: {} } }
  })

  it("should return parsed cached response if cache is enabled and hit", async () => {
    const cacheKey = JSON.stringify({
      queryId: "test",
      digest: createHash("sha1").update("").digest("hex"),
      variables: {},
    })
    const cachedResponse = JSON.stringify({ data: "cached", cached: true })
    mockCacheGet.mockResolvedValueOnce(cachedResponse)

    const result = await readCache(req)

    expect(mockCacheGet).toHaveBeenCalledWith(cacheKey)
    expect(result).toEqual(JSON.parse(cachedResponse))
  })

  it("should return undefined if cache is not enabled", async () => {
    req["x-access-token"] = "some-token"

    const result = await readCache(req)

    expect(result).toBeUndefined()
  })

  it("should return undefined if ENABLE_GRAPHQL_CACHE is false", async () => {
    jest.mock("Server/config", () => ({
      ENABLE_GRAPHQL_CACHE: false,
    }))

    const result = await readCache(req)

    expect(result).toBeUndefined()
  })
})

describe("writeCache", () => {
  let proxyRes, req, res

  const mockCacheSet = cache.set as jest.Mock
  const mockCreateGunzip = createGunzip as jest.Mock
  const mockCreateBrotliDecompress = createBrotliDecompress as jest.Mock
  const mockFindRoutesByPath = findRoutesByPath as jest.Mock

  beforeEach(() => {
    proxyRes = {
      statusCode: 200,
      pipe: jest.fn(),
      headers: { "content-encoding": "gzip" },
    }
    req = { body: { id: "test", query: "", variables: {} }, headers: {} }
    res = { end: jest.fn() }

    mockFindRoutesByPath.mockReturnValue([])
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("should set cache if cache is enabled and response is 200", async () => {
    const cacheKey = JSON.stringify({
      queryId: "test",
      digest: createHash("sha1").update("").digest("hex"),
      variables: {},
    })
    const responseBody = '{"data":"response"}'

    proxyRes = {
      ...proxyRes,
      statusCode: 200,
      pipe: jest.fn().mockReturnThis(),
      on: (event, callback) => {
        if (event === "data") {
          callback(responseBody)
        }
        if (event === "end") {
          callback()
        }
        return this
      },
    }

    await writeCache(proxyRes, req, res)

    expect(mockCreateGunzip).toHaveBeenCalled()
    expect(cache.set).toHaveBeenCalledWith(
      cacheKey,
      JSON.stringify(JSON.parse(responseBody)),
      "PX",
      3600
    )
    expect(res.end).toHaveBeenCalled()
  })

  it("should set cache with route-level cache config TTLs", async () => {
    const cacheKey = JSON.stringify({
      queryId: "test",
      digest: createHash("sha1").update("").digest("hex"),
      variables: {},
    })
    const responseBody = '{"data":"response"}'

    proxyRes = {
      ...proxyRes,
      statusCode: 200,
      pipe: jest.fn().mockReturnThis(),
      on: (event, callback) => {
        if (event === "data") {
          callback(responseBody)
        }
        if (event === "end") {
          callback()
        }
        return this
      },
    }

    req.headers = {
      [RELAY_CACHE_PATH_HEADER_KEY]: "/collect",
    }

    mockFindRoutesByPath.mockReturnValue([
      { path: "/collect", serverCacheTTL: 1000 },
    ])

    await writeCache(proxyRes, req, res)

    expect(mockCreateGunzip).toHaveBeenCalled()
    expect(cache.set).toHaveBeenCalledWith(
      cacheKey,
      JSON.stringify(JSON.parse(responseBody)),
      "PX",
      1000
    )
    expect(res.end).toHaveBeenCalled()
  })

  it("should set cache if response is br", async () => {
    proxyRes.statusCode = 200
    proxyRes.headers = { "content-encoding": "br" }
    const responseBody = '{"data":"response"}'

    proxyRes = {
      ...proxyRes,
      pipe: jest.fn().mockReturnThis(),
      on: (event, callback) => {
        if (event === "data") {
          callback(responseBody)
        }
        if (event === "end") {
          callback()
        }
        return this
      },
    }

    await writeCache(proxyRes, req, res)

    expect(mockCreateBrotliDecompress).toHaveBeenCalled()
    expect(mockCacheSet).toHaveBeenCalled()
    expect(res.end).toHaveBeenCalled()
  })

  it("should set cache if response is uncompressed", async () => {
    proxyRes.statusCode = 200
    proxyRes.headers = {}
    const responseBody = '{"data":"response"}'

    proxyRes = {
      ...proxyRes,
      pipe: jest.fn().mockReturnThis(),
      on: (event, callback) => {
        if (event === "data") {
          callback(responseBody)
        }
        if (event === "end") {
          callback()
        }
        return this
      },
    }

    await writeCache(proxyRes, req, res)

    expect(mockCreateGunzip).not.toHaveBeenCalled()
    expect(mockCreateBrotliDecompress).not.toHaveBeenCalled()
    expect(mockCacheSet).toHaveBeenCalled()
    expect(res.end).toHaveBeenCalled()
  })

  it("should not set cache if response is not 200", async () => {
    proxyRes.statusCode = 500

    await writeCache(proxyRes, req, res)

    expect(res.end).toHaveBeenCalled()
    expect(mockCacheSet).not.toHaveBeenCalled()
  })

  it("should not set cache if response is not gzip or br", async () => {
    proxyRes.statusCode = 200
    proxyRes.headers = { "content-encoding": "foo" }

    await writeCache(proxyRes, req, res)

    expect(res.end).toHaveBeenCalled()
    expect(mockCacheSet).not.toHaveBeenCalled()
  })

  it("should not set cache if graphql response contains errors", async () => {
    const responseBody = '{"data":"response", "errors": [{"message": "error"}]}'

    proxyRes = {
      ...proxyRes,
      statusCode: 200,
      pipe: jest.fn().mockReturnThis(),
      on: (event, callback) => {
        if (event === "data") {
          callback(responseBody)
        }
        if (event === "end") {
          callback()
        }
        return this
      },
    }

    await writeCache(proxyRes, req, res)

    expect(res.end).toHaveBeenCalled()
    expect(mockCacheSet).not.toHaveBeenCalled()
  })

  it("should handle cache set errors gracefully", async () => {
    const responseBody = '{"data":"response"}'
    const cacheError = new Error("Cache set error")

    proxyRes = {
      ...proxyRes,
      statusCode: 200,
      pipe: jest.fn().mockReturnThis(),
      on: (event, callback) => {
        if (event === "data") {
          callback(responseBody)
        }
        if (event === "end") {
          callback()
        }
        return this
      },
    }

    mockCacheSet.mockRejectedValueOnce(cacheError)

    await writeCache(proxyRes, req, res)

    expect(mockCacheSet).toHaveBeenCalled()
    expect(res.end).toHaveBeenCalled()
  })
})

describe("shouldSkipCache", () => {
  it("should return true if relayCacheConfig.force is true", () => {
    const req = ({
      headers: {
        [RELAY_CACHE_CONFIG_HEADER_KEY]: JSON.stringify({ force: true }),
      },
    } as unknown) as ArtsyRequest

    const result = shouldSkipCache(req)
    expect(result).toBe(true)
  })

  it("should return false if relayCacheConfig.force is not true", () => {
    const req = ({
      headers: {
        [RELAY_CACHE_CONFIG_HEADER_KEY]: JSON.stringify({ force: false }),
      },
    } as unknown) as ArtsyRequest

    const result = shouldSkipCache(req)
    expect(result).toBe(false)
  })

  it("should return false if there is no relayCacheConfig header", () => {
    const req = {
      headers: {},
    } as ArtsyRequest

    const result = shouldSkipCache(req)
    expect(result).toBe(false)
  })

  it("should return false if relayCacheConfig header is not a valid JSON string", () => {
    const req = ({
      headers: {
        [RELAY_CACHE_CONFIG_HEADER_KEY]: "invalid-json",
      },
    } as unknown) as ArtsyRequest

    const result = shouldSkipCache(req)
    expect(result).toBe(false)
  })
})
