import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware"
import {
  METAPHYSICS_ENDPOINT,
  GRAPHQL_CACHE_TTL,
  ENABLE_GRAPHQL_CACHE,
} from "Server/config"
import { cache } from "Server/cacheClient"
import { createGunzip } from "zlib"
import { isEmpty } from "lodash"
import { getUser } from "Utils/user"

export const graphqlProxyMiddleware = async (req, res, next) => {
  const user = getUser(req.user)

  if (!user && ENABLE_GRAPHQL_CACHE) {
    try {
      const queryId = req.body?.id
      const variables = req.body?.variables
      const cacheKey = JSON.stringify({
        queryId,
        variables: isEmpty(variables) ? null : variables,
      })

      const response = await cache.get(cacheKey)

      if (response) {
        console.log("\n[graphqlCacheProxyMiddleware#get] Success", cacheKey)

        const parsed = JSON.parse(response)

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
                variables: isEmpty(variables) ? null : variables,
              })

              await cache.set(
                cacheKey,
                JSON.stringify(JSON.parse(responseBody)),
                "PX",
                GRAPHQL_CACHE_TTL
              )

              console.log(
                "\n[graphqlCacheProxyMiddleware#set] Cache updated",
                cacheKey
              )
            } catch (error) {
              console.error(
                "[graphqlCacheProxyMiddleware#proxyRes] Error:",
                error
              )
            }
          })
        }
      },
    },
  }

  return createProxyMiddleware(proxyConfig)(req, res, next)
}
