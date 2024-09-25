import { isServer } from "Server/isServer"

/**
 * Logs whether the response was cached at the Metaphysics proxy level.
 *
 * @see src/Server/middleware/graphqlProxyMiddleware.ts
 */
export const cacheLoggerMiddleware = () => {
  return next => async req => {
    const res = await next(req)

    // If cached, log out the GraphQL query ID
    if (res.json?.cached && !isServer) {
      console.log("[Force] Cached Response:", req.id)
    }

    return res
  }
}
