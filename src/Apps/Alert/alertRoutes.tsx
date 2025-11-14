import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"

const AlertApp = loadable(
  () => import(/* webpackChunkName: "alertBundle" */ "./AlertApp"),
  {
    resolveComponent: component => component.AlertApp,
  },
)

export const alertRoutes: RouteProps[] = [
  {
    path: "/dev/alert",
    getComponent: () => AlertApp,
    onPreloadJS: () => {
      AlertApp.preload()
    },
  },
]
