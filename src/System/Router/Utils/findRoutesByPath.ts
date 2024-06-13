import { match } from "path-to-regexp"
import { AppRouteConfig } from "System/Router/Route"
import { getRouteConfig } from "System/Router/Utils/getRouteConfig"

export function findRoutesByPath({ path }): AppRouteConfig[] {
  const { flatRoutes = [] } = getRouteConfig()

  const foundRoutes = flatRoutes.filter(route => {
    const matcher = match(route.path as string, { decode: decodeURIComponent })
    return !!matcher(path)
  })

  return foundRoutes
}
