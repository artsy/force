import { getAppRoutes } from "routes"
import { compact, uniq } from "lodash"
import { AppRouteConfig } from "System/Router/Route"

export function getRouteConfig(): {
  routes: AppRouteConfig[]
  routePaths: string[]
  flatRoutes: AppRouteConfig[]
} {
  const routes = getAppRoutes()

  // Store all routes, including `children` routes, in a flat array. Useful for
  // lookup and other forms of introspection.
  const flatRoutes: AppRouteConfig[] = []

  const getRoutes = (acc, route: AppRouteConfig, basePath = "") => {
    const path = compact([basePath, route.path]).join("/")

    const INVALID_PATHS = ["/", "*"]

    const isInvalid = INVALID_PATHS.some(
      invalidPath => route.path === invalidPath
    )

    if (!isInvalid) {
      acc.push(path)
      flatRoutes.push({
        ...route,
        path: path,
      })
    }

    if (route.children) {
      return route.children.map(childRoute => getRoutes(acc, childRoute, path))
    }
  }

  const routePaths = routes.reduce((acc, route) => {
    getRoutes(acc, route)
    return uniq(acc)
  }, [])

  return {
    routes,
    routePaths,
    flatRoutes,
  }
}
