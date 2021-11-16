import { match } from "path-to-regexp"
import { getRouteConfig } from "../getRouteConfig"
import { AppRouteConfig } from "../Route"

export function findRoutesByPath({ path }): AppRouteConfig[] {
  const { flatRoutes = [] } = getRouteConfig()

  const foundRoutes = flatRoutes.filter(route => {
    const matcher = match(route.path!, { decode: decodeURIComponent })
    return !!matcher(path)
  })

  return foundRoutes
}
