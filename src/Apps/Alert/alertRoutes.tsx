import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const AlertApp = loadable(
  () => import(/* webpackChunkName: "AlertBundle" */ "./AlertApp"),
  {
    resolveComponent: component => component.AlertApp,
  }
)

export const alertRoutes: AppRouteConfig[] = [
  {
    path: "/dev/alert",
    getComponent: () => AlertApp,
    onClientSideRender: () => {
      AlertApp.preload()
    },
  },
]
