import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware"
import { METAPHYSICS_ENDPOINT, ENABLE_REDIS_GRAPHQL_CACHE } from "Server/config"
import { cache } from "Server/cacheClient"

export const graphqlCacheProxyMiddleware = async (req, res, next) => {
  if (ENABLE_REDIS_GRAPHQL_CACHE) {
    try {
      const queryId = req.body?.id
      const variables = req.body?.variables
      const cacheKey = JSON.stringify({ queryId, variables })
      const response = await cache.get(cacheKey)

      if (response) {
        console.log("\n[graphqlCacheProxyMiddleware#get] Success", cacheKey)

        const parsed = JSON.parse(response).json

        return res.json(parsed)
      }
    } catch (error) {
      console.error("[graphqlCacheProxyMiddleware] Error:", error)
    }
  }

  return createProxyMiddleware({
    target: `${METAPHYSICS_ENDPOINT}/v2`,
    changeOrigin: true,
    on: {
      proxyReq: fixRequestBody,
    },
  })(req, res, next)
}
