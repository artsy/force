import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const RetrospectiveApp = loadable(
  () =>
    import(/* webpackChunkName: "retrospectiveBundle" */ "./RetrospectiveApp"),
  {
    resolveComponent: component => component.RetrospectiveApp,
  }
)

export const retrospectiveRoutes: AppRouteConfig[] = [
  {
    path: "/retrospective",
    getComponent: () => RetrospectiveApp,
    onClientSideRender: () => {
      RetrospectiveApp.preload()
    },
  },
]
