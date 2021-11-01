import { match } from "path-to-regexp"
import { getRouteConfig } from "../getRouteConfig"
import { AppRouteConfig } from "../Route"

export const findCurrentRoute = (
  { route: baseRoute, routes, routeIndices }: any /* FIXME: Add type */
): AppRouteConfig => {
  if (!routeIndices || routeIndices.length === 0) {
    return baseRoute
  }
  let remainingRouteIndicies = [...routeIndices]
  let route = routes[remainingRouteIndicies.shift()]

  while (remainingRouteIndicies.length > 0) {
    route = route.children[remainingRouteIndicies.shift()]
  }

  if (!route) {
    route = baseRoute
  }

  return route
}

export const findRoutesByPath = ({ path }): AppRouteConfig[] => {
  const { flatRoutes = [] } = getRouteConfig()

  const foundRoutes = flatRoutes.filter(route => {
    const matcher = match(route.path!, { decode: decodeURIComponent })
    return !!matcher(path)
  })

  return foundRoutes
}
