import { buildAppRoutes } from "v2/Artsy/Router/buildAppRoutes"
import { RouteConfig } from "found"
import { debugNovoRoutes } from "./Debug/debugNovoRoutes"

export function getAppNovoRoutes(): RouteConfig[] {
  return buildAppRoutes([
    // For debugging baseline app shell stuff
    {
      routes: debugNovoRoutes.map(route => {
        route.path = `${route.path}`
        return route
      }),
    },
  ])
}
