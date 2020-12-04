import { buildAppRoutes } from "v2/Artsy/Router/buildAppRoutes"
import { RouteConfig } from "found"
import { routes as artistRoutes } from "v2/Apps/Artist/routes"
import { debugRoutes } from "./Debug/debugRoutes"

export function getAppNovoRoutes(): RouteConfig[] {
  return buildAppRoutes([
    {
      routes: artistRoutes.map(route => {
        return {
          ...route,
          path: `/novo${route.path}`,
        }
      }),
    },
    // For debugging baseline app shell stuff
    {
      routes: debugRoutes.map(route => {
        return {
          ...route,
          path: `/novo${route.path}`,
        }
      }),
    },
  ])
}
