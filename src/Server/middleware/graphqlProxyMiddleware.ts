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
import {
  RELAY_CACHE_CONFIG_HEADER_KEY,
  RELAY_CACHE_PATH_HEADER_KEY,
} from "System/Relay/middleware/cacheHeaderMiddleware"
import { findRoutesByPath } from "System/Router/Utils/routeUtils"
import { getENV } from "Utils/getENV"
import { createHash } from "crypto"

const isDevelopment = getENV("NODE_ENV") === "development"

export const graphqlProxyMiddleware = async (
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) => {
  const skipCache = shouldSkipCache(req)

  if (!skipCache) {
    const cachedResponse = await readCache(req)

    if (cachedResponse && !cachedResponse?.errors?.length) {
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
      const query = req.body?.query
      const variables = req.body?.variables

      const cacheKey = getCacheKey({
        queryId,
        query,
        variables,
      })

      const response = await cache.get(cacheKey)

      if (response) {
        if (isDevelopment) {
          console.log(
            "\n[graphqlProxyMiddleware # get] Cache hit: \n",
            "[cacheKey]:",
            cacheKey,
            "\n"
          )
        }

        const parsedResponse = JSON.parse(response)

        // Add debug log flag to response
        // TODO: Remove this once cache layer stabilizes
        parsedResponse.cached = true

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
    } else if (!contentEncoding) {
      decompressStream = null // Handle uncompressed response
    } else {
      res.end()
      return
    }

    let responseBody = ""

    // TODO: Sometimes responses come back from MP uncompressed. Why?
    const stream = decompressStream ? proxyRes.pipe(decompressStream) : proxyRes

    stream.on("error", error => {
      console.log(
        "\n[graphqlProxyMiddleware # writeCache] General Error:",
        error
      )

      res.end()
    })

    stream.on("data", chunk => {
      responseBody += chunk
    })

    stream.on("end", async () => {
      try {
        // Check to see if we're using a custom cache TTL for this route
        const TTL = (() => {
          const path = req.headers[RELAY_CACHE_PATH_HEADER_KEY] as string
          const route = findRoutesByPath({ path })[0]

          // Use route TTL or fall back to default
          return route?.serverCacheTTL ?? GRAPHQL_CACHE_TTL
        })()

        const queryId = req.body?.id
        const query = req.body?.query
        const variables = req.body?.variables

        const cacheKey = getCacheKey({
          queryId,
          query,
          variables,
        })

        const response = JSON.parse(responseBody)

        // Don't cache responses that contain errors from MP
        if (response.errors?.length) {
          throw new Error(
            "Skipping write due to GraphQL response containing errors: " +
              JSON.stringify(response.errors)
          )
        }

        await cache.set(
          cacheKey,
          JSON.stringify(JSON.parse(responseBody)),
          "PX",
          TTL
        )

        if (isDevelopment) {
          console.log(
            "\n[graphqlProxyMiddleware # writeCache] \n",
            "[cacheKey]:",
            cacheKey,
            "\n",
            "[TTL]:",
            TTL,
            "\n"
          )
        }
      } catch (error) {
        console.error(
          "[graphqlProxyMiddleware # writeCache] Cache error:",
          error
        )

        res.end()
      } finally {
        res.end()
      }
    })
  }
}

interface GetCacheKeyProps {
  queryId: string
  query: string
  variables: Record<string, unknown>
}

const getCacheKey = (props: GetCacheKeyProps) => {
  const fallbackCacheKey = "" // Falsy value for redis

  try {
    const digest = createHash("sha1").update(props.query).digest("hex")
    const cacheKey = JSON.stringify({
      queryId: props.queryId,
      digest,
      variables: props.variables,
    })

    return cacheKey
  } catch {
    return fallbackCacheKey
  }
}

export const shouldSkipCache = (req: ArtsyRequest) => {
  const isLoggedIn = req.headers["x-access-token"]

  if (isLoggedIn) {
    return true
  }

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
