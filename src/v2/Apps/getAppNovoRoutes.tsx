import { buildAppRoutes } from "v2/Artsy/Router/buildAppRoutes"
import { RouteConfig } from "found"
import { debugRoutes } from "./Debug/debugRoutes"

export function getAppNovoRoutes(): RouteConfig[] {
  return buildAppRoutes([
    // For debugging baseline app shell stuff
    {
      routes: debugRoutes.map(route => {
        route.path = `/novo${route.path}`
        return route
      }),
    },
  ])
}
