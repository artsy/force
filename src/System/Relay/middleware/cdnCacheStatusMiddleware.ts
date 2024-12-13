import { updateContext } from "Server/middleware/bootstrapSharifyAndContextLocalsMiddleware"

export const cdnCacheStatusCacheKey = (queryName: string, variables: any) => {
  return `cache-status:${queryName}:${JSON.stringify(variables)}`
}

export const cdnCacheStatusMiddleware = () => {
  return next => async req => {
    const res = await next(req)

    const cacheStatus = res._res.headers.get("cf-cache-status") === "HIT"

    const isRouteQuery = /^.*Routes_/.test(req.operation.name as string)

    if (isRouteQuery) {
      updateContext(
        cdnCacheStatusCacheKey(req.operation.name, req.variables),
        cacheStatus
      )
    }

    return res
  }
}
