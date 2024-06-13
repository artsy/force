import { AppRouteConfig } from "System/Router2/Route"
import { Route } from "found"

export function createRouteConfig(routes): AppRouteConfig[] {
  return routes.map(route => {
    if (route.__proto__ === Object.prototype) {
      return new Route({
        ...route,
        children: route.children && createRouteConfig(route.children),
      })
    } else {
      return route
    }
  })
}
