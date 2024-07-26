import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware"
import {
  METAPHYSICS_ENDPOINT,
  ENABLE_GRAPHQL_PROXY,
  GRAPHQL_CACHE_TTL,
} from "Server/config"
import { cache } from "Server/cacheClient"
import { createGunzip } from "zlib"

export const graphqlCacheProxyMiddleware = async (req, res, next) => {
  if (ENABLE_GRAPHQL_PROXY) {
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

  const proxyConfig = {
    target: `${METAPHYSICS_ENDPOINT}/v2`,
    changeOrigin: true,
    on: {
      proxyReq: fixRequestBody,
      proxyRes: async (proxyRes, req, res) => {
        let responseBody = ""

        const gunzip = createGunzip()
        const stream = proxyRes.pipe(gunzip)

        stream.on("data", chunk => {
          responseBody += chunk
        })

        stream.on("end", async () => {
          try {
            if (proxyRes.statusCode === 200) {
              const queryId = req.body?.id
              const variables = req.body?.variables
              const cacheKey = JSON.stringify({ queryId, variables })

              await cache.set(cacheKey, responseBody, "PX", GRAPHQL_CACHE_TTL)

              // await cache.set(cacheKey, JSON.stringify({ json: jsonResponse }));
              console.log(
                "\n[graphqlCacheProxyMiddleware#set] Cache updated",
                cacheKey
              )
            }
          } catch (error) {
            console.error(
              "[graphqlCacheProxyMiddleware#proxyRes] Error:",
              error
            )
          }
        })
      },
    },
  }

  return createProxyMiddleware(proxyConfig)(req, res, next)
}
