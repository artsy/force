import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"

const PreferencesApp = loadable(
  () => import(/* webpackChunkName: "preferencesBundle" */ "./PreferencesApp"),
  {
    resolveComponent: component => component.PreferencesApp,
  }
)

export const preferencesRoutes: AppRouteConfig[] = [
  {
    path: "/preferences2",
    getComponent: () => PreferencesApp,
  },
]
