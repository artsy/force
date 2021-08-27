import { getAppRoutes } from "v2/routes"

export function getCacheableRoutes(): string[] {
  let flatRoutes: string[] = []
  const appRoutes = getAppRoutes()[0]
  if (appRoutes) {
    appRoutes.children?.forEach(route => {
      const childRoutes =
        route.children
          ?.map(child => child.path)
          .filter(route => route !== "/" && route !== "*")
          .map(childPath => route.path + "/" + childPath) || []
      flatRoutes = flatRoutes.concat(childRoutes).concat(route.path || [])
    })
  } else {
    flatRoutes = []
  }

  return flatRoutes
}
