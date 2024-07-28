import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware"
import {
  METAPHYSICS_ENDPOINT,
  GRAPHQL_CACHE_TTL,
  ENABLE_GRAPHQL_CACHE,
} from "Server/config"
import { cache } from "Server/cacheClient"
import { createBrotliDecompress, createGunzip } from "zlib"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import { NextFunction } from "express"
import { IncomingMessage } from "http"
import { RELAY_CACHE_CONFIG_HEADER_KEY } from "System/Relay/middleware/cacheHeaderMiddleware"

export const graphqlProxyMiddleware = async (
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) => {
  const isLoggedIn = !!req.user
  const skipCache = isLoggedIn || shouldSkipCache(req)

  if (!skipCache) {
    const cachedResponse = await readCache(req)

    if (cachedResponse) {
      return res.json(cachedResponse)
    }
  }

  return createProxyMiddleware({
    target: `${METAPHYSICS_ENDPOINT}/v2`,
    changeOrigin: true,
    on: {
      // Fix proxy incompatability with express.js body-parser middleware
      proxyReq: fixRequestBody,
      proxyRes: (
        proxyRes: IncomingMessage,
        req: ArtsyRequest,
        res: ArtsyResponse
      ) => {
        if (!skipCache) {
          writeCache(proxyRes, req, res)
        }
      },
    },
  })(req, res, next)
}

export const readCache = async (req: ArtsyRequest) => {
  if (ENABLE_GRAPHQL_CACHE) {
    try {
      const queryId = req.body?.id
      const variables = req.body?.variables
      const cacheKey = JSON.stringify({
        queryId,
        variables,
      })

      const response = await cache.get(cacheKey)

      if (response) {
        console.log("\n[graphqlProxyMiddleware#get] Cache hit", cacheKey)

        const parsedResponse = JSON.parse(response)

        return parsedResponse
      }
    } catch (error) {
      console.error("[graphqlProxyMiddleware] Cache Error:", error)
    }
  }
}

export const writeCache = async (
  proxyRes: IncomingMessage,
  req: ArtsyRequest,
  res: ArtsyResponse
) => {
  if (ENABLE_GRAPHQL_CACHE) {
    if (proxyRes.statusCode !== 200) {
      res.end()
      return
    }

    const contentEncoding = proxyRes.headers["content-encoding"]

    let decompressStream

    if (contentEncoding === "gzip") {
      decompressStream = createGunzip()
    } else if (contentEncoding === "br") {
      decompressStream = createBrotliDecompress()
    } else {
      res.end()
      return
    }

    let responseBody = ""

    const stream = proxyRes.pipe(decompressStream)

    stream.on("error", error => {
      console.log(
        "\n[graphqlProxyMiddleware # writeCache] Decompression Error:",
        error
      )

      res.end()
    })

    stream.on("data", chunk => {
      responseBody += chunk
    })

    stream.on("end", async () => {
      try {
        const queryId = req.body?.id
        const variables = req.body?.variables
        const cacheKey = JSON.stringify({
          queryId,
          variables,
        })

        await cache.set(
          cacheKey,
          JSON.stringify(JSON.parse(responseBody)),
          "PX",
          GRAPHQL_CACHE_TTL
        )

        console.log("\n[graphqlProxyMiddleware # writeCache]", cacheKey)
      } catch (error) {
        console.error(
          "[graphqlProxyMiddleware # writeCache] Cache error:",
          error
        )

        res.end()
      }
    })
  }
}

export const shouldSkipCache = (req: ArtsyRequest) => {
  const relayCacheHeader = req.headers[RELAY_CACHE_CONFIG_HEADER_KEY] as string

  if (!relayCacheHeader) {
    return false
  }

  try {
    const relayCacheConfig = JSON.parse(relayCacheHeader)

    return relayCacheConfig.force === true
  } catch {
    return false
  }
}
