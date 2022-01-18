import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"

const SecurityApp = loadable(
  () => import(/* webpackChunkName: "securityBundle" */ "./SecurityApp"),
  {
    resolveComponent: component => component.SecurityApp,
  }
)

export const securityRoutes: AppRouteConfig[] = [
  {
    path: "/security2",
    getComponent: () => SecurityApp,
  },
]
