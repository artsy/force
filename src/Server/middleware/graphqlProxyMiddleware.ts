import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware"
import {
  METAPHYSICS_ENDPOINT,
  GRAPHQL_CACHE_TTL,
  ENABLE_GRAPHQL_CACHE,
} from "Server/config"
import { cache } from "Server/cacheClient"
import { createGunzip } from "zlib"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"
import { NextFunction } from "express"

export const graphqlProxyMiddleware = async (
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) => {
  const isLoggedIn = !!req.user

  if (!isLoggedIn) {
    const cachedResponse = await readCache(req, res, next)

    if (cachedResponse) {
      return res.json(cachedResponse)
    }
  }

  const proxyConfig = {
    target: `${METAPHYSICS_ENDPOINT}/v2`,
    changeOrigin: true,
    on: {
      proxyReq: fixRequestBody,
      proxyRes: (proxyRes, req, res) => {
        if (!isLoggedIn) {
          writeCache(proxyRes, req, res)
        }
      },
    },
  }

  return createProxyMiddleware(proxyConfig)(req, res, next)
}

export const readCache = async (req, res, next) => {
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
        console.log("\n[graphqlProxyMiddleware#get] Success", cacheKey)

        const parsedResponse = JSON.parse(response)

        return parsedResponse
      }
    } catch (error) {
      console.error("[graphqlProxyMiddleware] Cache Error:", error)
    }
  }
}

export const writeCache = async (proxyRes, req, res) => {
  if (ENABLE_GRAPHQL_CACHE) {
    if (proxyRes.statusCode !== 200) {
      return res.end()
    }

    let responseBody = ""

    const gunzip = createGunzip()
    const stream = proxyRes.pipe(gunzip)

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
