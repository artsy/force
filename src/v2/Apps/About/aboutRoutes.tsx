import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"

const AboutApp = loadable(
  () => import(/* webpackChunkName: "aboutBundle" */ "./AboutApp"),
  {
    resolveComponent: component => component.AboutApp,
  }
)

export const aboutRoutes: AppRouteConfig[] = [
  {
    path: "/about",
    getComponent: () => AboutApp,
  },
]
