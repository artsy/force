import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const AboutApp = loadable(
  () => import(/* webpackChunkName: "aboutBundle" */ "./AboutApp2"),
  {
    resolveComponent: component => component.AboutApp2,
  }
)

export const aboutRoutes2: AppRouteConfig[] = [
  {
    path: "/about2",
    getComponent: () => AboutApp,
  },
]
