import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"

const About2App = loadable(
  () => import(/* webpackChunkName: "aboutBundle" */ "./About2App"),
  {
    resolveComponent: component => component.About2App,
  },
)

export const about2Routes: RouteProps[] = [
  {
    path: "/about2",
    getComponent: () => About2App,
  },
]
