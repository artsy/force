import loadable from "@loadable/component"
import { RouteProps } from "System/Router/Route"

const ArtAppraisalsApp = loadable(
  () =>
    import(/* webpackChunkName: "artAppraisalsBundle" */ "./ArtAppraisalsApp"),
  {
    resolveComponent: component => component.ArtAppraisalsApp,
  }
)

export const artAppraisalsRoutes: RouteProps[] = [
  {
    path: "/art-appraisals",
    getComponent: () => ArtAppraisalsApp,
  },
]
