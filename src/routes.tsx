import { debugRoutes } from "Apps/Debug/debugRoutes"
import { RouteProps } from "System/Router/Route"
import { buildAppRoutes } from "System/Router/Utils/buildAppRoutes"

const ROUTES = buildAppRoutes([debugRoutes])

export const getAppRoutes = (): RouteProps[] => {
  return ROUTES
}
