import { Match } from "found"
import { AppRouteConfig } from "../Route"

export const findCurrentRoute = ({
  route: baseRoute,
  routes,
  routeIndices,
}: Match & { route?: AppRouteConfig }) => {
  if (!routeIndices || routeIndices.length === 0) {
    return baseRoute
  }
  let remainingRouteIndicies = [...routeIndices]
  let route: AppRouteConfig = routes[remainingRouteIndicies.shift()]

  while (remainingRouteIndicies.length > 0) {
    route = route.children[remainingRouteIndicies.shift()]
  }

  if (!route) {
    route = baseRoute
  }

  return route
}
