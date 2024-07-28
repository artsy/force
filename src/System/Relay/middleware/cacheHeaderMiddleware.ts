/**
 * Store individual relay query cache configs as a header, so that we can
 * ensure that certain queries aren't cached at the redis level, in the proxy.
 */

export const RELAY_CACHE_CONFIG_HEADER_KEY = "x-relay-cache-config"

export const cacheHeaderMiddleware = () => {
  return next => async req => {
    req.fetchOpts.headers = {
      ...req.fetchOpts.headers,
      [RELAY_CACHE_CONFIG_HEADER_KEY]: JSON.stringify(req.cacheConfig),
    }

    const res = await next(req)

    return res
  }
}
