import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"

const WorksForYou2App = loadable(
  () =>
    import(/* webpackChunkName: "worksForYou2Bundle" */ "./WorksForYou2App"),
  {
    resolveComponent: component => component.WorksForYou2App,
  }
)

export const worksForYouRoutes: AppRouteConfig[] = [
  {
    path: "/works-for-you2",
    getComponent: () => WorksForYou2App,
  },
]
