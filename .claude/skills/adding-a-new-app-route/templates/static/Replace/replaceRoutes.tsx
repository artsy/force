import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"

const ReplaceApp = loadable(
  () => import(/* webpackChunkName: "replaceBundle" */ "./ReplaceApp"),
  {
    resolveComponent: component => component.ReplaceApp,
  },
)

export const replaceRoutes: RouteProps[] = [
  {
    path: "/replace",
    getComponent: () => ReplaceApp,
    onPreloadJS: () => {
      ReplaceApp.preload()
    },
  },
]
