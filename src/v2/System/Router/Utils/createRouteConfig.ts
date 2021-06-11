import { AppRouteConfig } from "v2/System/Router/Route"
import { Route } from "../Route"

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
