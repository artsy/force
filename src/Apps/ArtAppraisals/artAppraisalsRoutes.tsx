import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router2/Route"

const ArtAppraisalsApp = loadable(
  () =>
    import(/* webpackChunkName: "artAppraisalsBundle" */ "./ArtAppraisalsApp"),
  {
    resolveComponent: component => component.ArtAppraisalsApp,
  }
)

export const artAppraisalsRoutes: AppRouteConfig[] = [
  {
    path: "/art-appraisals",
    getComponent: () => ArtAppraisalsApp,
  },
]
