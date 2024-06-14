import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"

const AboutApp = loadable(
  () => import(/* webpackChunkName: "aboutBundle" */ "./AboutApp"),
  {
    resolveComponent: component => component.AboutApp,
  }
)

export const aboutRoutes: RouteProps[] = [
  {
    path: "/about",
    getComponent: () => AboutApp,
  },
]
