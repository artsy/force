import { compact, isObject, isString, uniq } from "lodash"
import { RouteProps } from "System/Router/Route"
import { match } from "path-to-regexp"
import { LocationDescriptor, LocationDescriptorObject } from "found"

export function getRoutes(): {
  routes: RouteProps[]
  routePaths: string[]
  flatRoutes: RouteProps[]
} {
  // Avoid circular dep
  const routes = require("routes").getAppRoutes()

  // Store all routes, including `children` routes, in a flat array. Useful for
  // lookup and other forms of introspection.
  const flatRoutes: RouteProps[] = []

  const filterRoutes = (acc, route: RouteProps, basePath = "") => {
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
      return route.children.map(childRoute =>
        filterRoutes(acc, childRoute, path)
      )
    }
  }

  const routePaths = routes.reduce((acc, route) => {
    filterRoutes(acc, route)
    return uniq(acc)
  }, [])

  return {
    routes,
    routePaths,
    flatRoutes,
  }
}

export const findCurrentRoute = (match): RouteProps => {
  if (!match) {
    return {}
  }

  const { route: baseRoute, routes, routeIndices } = match

  if (!routeIndices || routeIndices.length === 0) {
    return baseRoute
  }
  let remainingRouteIndicies = [...routeIndices]
  let route = routes[remainingRouteIndicies.shift()]

  while (remainingRouteIndicies.length > 0) {
    route = route.children[remainingRouteIndicies.shift()]
  }

  if (!route) {
    route = baseRoute
  }

  return route
}

interface FindRoutesByPathProps {
  path: string
}

export function findRoutesByPath({
  path,
}: FindRoutesByPathProps): RouteProps[] {
  const { flatRoutes = [] } = getRoutes()

  const foundRoutes = flatRoutes.filter(route => {
    const matcher = match(route.path as string, { decode: decodeURIComponent })
    return !!matcher(path)
  })

  return foundRoutes
}

export function getRouteForPreloading(
  to: LocationDescriptor
): RouteProps | null {
  const path = (() => {
    switch (true) {
      case isString(to):
        return to
      case isObject(to):
        return ((to as unknown) as LocationDescriptorObject).pathname
      default:
        return ""
    }
  })()

  if (!path) {
    return null
  }

  const route = findRoutesByPath({ path })[0]

  if (!route) {
    return null
  }

  return route
}
