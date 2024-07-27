import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware"
import { createGunzip } from "zlib"
import { cache } from "Server/cacheClient"
import {
  graphqlProxyMiddleware,
  readCache,
  writeCache,
} from "Server/middleware/graphqlProxyMiddleware"

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
}))

describe("graphqlProxyMiddleware", () => {
  let req, res, next

  const mockCacheGet = cache.get as jest.Mock

  beforeEach(() => {
    req = { body: {}, user: null }
    res = { json: jest.fn(), end: jest.fn() }
    next = jest.fn()
  })

  it("should return cached response if available", async () => {
    const cachedResponse = JSON.stringify({ data: "cached" })
    mockCacheGet.mockResolvedValueOnce(cachedResponse)

    await graphqlProxyMiddleware(req, res, next)

    expect(res.json).toHaveBeenCalledWith(JSON.parse(cachedResponse))
    expect(createProxyMiddleware).not.toHaveBeenCalled()
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

  it("should call createProxyMiddleware with correct config logged in", async () => {
    req.user = { id: "user" }

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
    req = { body: { id: "test", variables: {} }, user: null }
  })

  it("should return parsed cached response if cache is enabled and hit", async () => {
    const cacheKey = JSON.stringify({ queryId: "test", variables: {} })
    const cachedResponse = JSON.stringify({ data: "cached" })
    mockCacheGet.mockResolvedValueOnce(cachedResponse)

    const result = await readCache(req)
    console.log(readCache)

    expect(mockCacheGet).toHaveBeenCalledWith(cacheKey)
    expect(result).toEqual(JSON.parse(cachedResponse))
  })

  it("should return undefined if cache is not enabled", async () => {
    req.user = { id: "user" }

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

  beforeEach(() => {
    proxyRes = {
      statusCode: 200,
      pipe: jest.fn(),
      headers: { "content-encoding": "gzip" },
    }
    req = { body: { id: "test", variables: {} }, user: null }
    res = { end: jest.fn() }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it("should set cache if cache is enabled and response is 200", async () => {
    const cacheKey = JSON.stringify({ queryId: "test", variables: {} })
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
  })

  it("should not set cache if response is not 200", async () => {
    proxyRes.statusCode = 500

    await writeCache(proxyRes, req, res)

    expect(res.end).toHaveBeenCalled()
    expect(mockCacheSet).not.toHaveBeenCalled()
  })

  it("should not set cache if response is not gzip", async () => {
    proxyRes.statusCode = 200
    proxyRes.headers = { "content-encoding": "br" }

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

    expect(createGunzip).toHaveBeenCalled()
    expect(mockCacheSet).toHaveBeenCalled()
  })
})
