import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"

const AlertApp = loadable(
  () => import(/* webpackChunkName: "AlertBundle" */ "./AlertApp"),
  {
    resolveComponent: component => component.AlertApp,
  }
)

export const alertRoutes: RouteProps[] = [
  {
    path: "/dev/alert",
    getComponent: () => AlertApp,
    onClientSideRender: () => {
      AlertApp.preload()
    },
  },
]
