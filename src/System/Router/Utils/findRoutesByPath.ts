import { match } from "path-to-regexp"
import { getRouteConfig } from "System/Router/getRouteConfig"
import { AppRouteConfig } from "System/Router/Route"

export function findRoutesByPath({ path }): AppRouteConfig[] {
  const { flatRoutes = [] } = getRouteConfig()

  const foundRoutes = flatRoutes.filter(route => {
    const matcher = match(route.path as string, { decode: decodeURIComponent })
    return !!matcher(path)
  })

  return foundRoutes
}
