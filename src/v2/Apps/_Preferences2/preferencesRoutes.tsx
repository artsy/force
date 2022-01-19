import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"

const PreferencesApp = loadable(
  () => import(/* webpackChunkName: "aboutBundle" */ "./PreferencesApp"),
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
