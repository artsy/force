import { Match, RouteConfig } from "found"

export const findCurrentRoute = ({
  route: baseRoute,
  routes,
  routeIndices,
}: Match & { route?: RouteConfig }) => {
  if (!routeIndices || routeIndices.length === 0) {
    return baseRoute
  }
  let remainingRouteIndicies = [...routeIndices]
  let route: RouteConfig = routes[remainingRouteIndicies.shift()]

  while (remainingRouteIndicies.length > 0) {
    route = route.children[remainingRouteIndicies.shift()]
  }

  if (!route) {
    route = baseRoute
  }

  return route
}
