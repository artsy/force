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
  // @ts-expect-error STRICT_NULL_CHECK
  let route: RouteConfig = routes[remainingRouteIndicies.shift()]

  while (remainingRouteIndicies.length > 0) {
    // @ts-expect-error STRICT_NULL_CHECK
    route = route.children[remainingRouteIndicies.shift()]
  }

  if (!route) {
    // @ts-expect-error STRICT_NULL_CHECK
    route = baseRoute
  }

  return route
}
