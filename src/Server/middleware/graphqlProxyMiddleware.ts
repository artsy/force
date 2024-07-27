import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware"
import {
  METAPHYSICS_ENDPOINT,
  GRAPHQL_CACHE_TTL,
  ENABLE_GRAPHQL_CACHE,
} from "Server/config"
import { cache } from "Server/cacheClient"
import { createGunzip } from "zlib"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"

export const graphqlProxyMiddleware = async (
  req: ArtsyRequest,
  res: ArtsyResponse,
  next
) => {
  const cachedResponse = await readCache(req, res, next)

  if (cachedResponse) {
    return res.json(cachedResponse)
  }

  const proxyConfig = {
    target: `${METAPHYSICS_ENDPOINT}/v2`,
    changeOrigin: true,
    on: {
      proxyReq: fixRequestBody,
      proxyRes: writeCache,
    },
  }

  return createProxyMiddleware(proxyConfig)(req, res, next)
}

export const readCache = async (req, res, next) => {
  const CACHE_ENABLED = ENABLE_GRAPHQL_CACHE && !req.user

  if (CACHE_ENABLED) {
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
  const CACHE_ENABLED = ENABLE_GRAPHQL_CACHE && !req.user

  if (CACHE_ENABLED) {
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
