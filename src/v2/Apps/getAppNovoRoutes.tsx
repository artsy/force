import { buildAppRoutes } from "v2/Artsy/Router/buildAppRoutes"
import { RouteConfig } from "found"
import { routes as artistRoutes } from "v2/Apps/Artist/routes"
import { debugNovoRoutes } from "./Debug/debugNovoRoutes"

export function getAppNovoRoutes(): RouteConfig[] {
  return buildAppRoutes([
    {
      routes: artistRoutes.map(route => {
        route.path = `/novo${route.path}`
        return route
      }),
    },
    // For debugging baseline app shell stuff
    {
      routes: debugNovoRoutes.map(route => {
        route.path = `${route.path}`
        return route
      }),
    },
  ])
}
