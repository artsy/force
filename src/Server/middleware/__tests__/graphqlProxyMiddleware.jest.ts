import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware"
import { graphqlProxyMiddleware } from "Server/middleware/graphqlProxyMiddleware"

jest.mock("Server/config", () => ({
  METAPHYSICS_ENDPOINT: "https://metaphysics.artsy.net",
}))

jest.mock("http-proxy-middleware", () => ({
  createProxyMiddleware: jest.fn(() => jest.fn()),
  fixRequestBody: jest.fn(),
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

  beforeEach(() => {
    req = { body: {}, headers: {} }
    res = { json: jest.fn(), end: jest.fn() }
    next = jest.fn()
  })

  it("should call createProxyMiddleware with correct config if no cached response", async () => {
    await graphqlProxyMiddleware(req, res, next)

    expect(createProxyMiddleware).toHaveBeenCalledWith({
      target: `https://metaphysics.artsy.net/v2`,
      changeOrigin: true,
      on: {
        proxyReq: fixRequestBody,
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
      },
    })
  })

  it("should call createProxyMiddleware with correct", async () => {
    req.headers["x-access-token"] = "some-token"
    req.headers["x-relay-cache-config"] = JSON.stringify({ force: true })

    await graphqlProxyMiddleware(req, res, next)

    expect(createProxyMiddleware).toHaveBeenCalledWith({
      target: `https://metaphysics.artsy.net/v2`,
      changeOrigin: true,
      on: {
        proxyReq: fixRequestBody,
      },
    })
  })
})
