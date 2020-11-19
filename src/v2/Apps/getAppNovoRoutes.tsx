import { buildAppRoutes } from "v2/Artsy/Router/buildAppRoutes"
import { RouteConfig } from "found"
import { routes as artistRoutes } from "v2/Apps/Artist/routes"
import { debugRoutes } from "./Debug/debugRoutes"
import { cloneDeep } from "lodash"

export function getAppNovoRoutes(): RouteConfig[] {
  return buildAppRoutes([
    {
      routes: cloneDeep(artistRoutes).map(route => {
        route.path = `/novo${route.path}`
        return route
      }),
    },
    // For debugging baseline app shell stuff
    {
      routes: cloneDeep(debugRoutes).map(route => {
        route.path = `/novo${route.path}`
        return route
      }),
    },
  ])
}
