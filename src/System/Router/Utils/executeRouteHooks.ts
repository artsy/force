import { findRoutesByPath } from "System/Router/Utils/routeUtils"

export const executeRouteHooks = async (req, res, next) => {
  const matchedRoutes = findRoutesByPath({
    path: req.path,
  })

  for await (const route of matchedRoutes) {
    await route.onServerSideRender?.({
      req,
      res,
      next,
      route,
    })
  }
}
