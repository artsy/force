import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"

const AlertApp = loadable(
  () => import(/* webpackChunkName: "alertBundle" */ "./AlertApp"),
  {
    resolveComponent: component => component.AlertApp,
  }
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
