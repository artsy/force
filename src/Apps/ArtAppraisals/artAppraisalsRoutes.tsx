import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"

const ArtAppraisalsApp = loadable(
  () =>
    import(/* webpackChunkName: "artAppraisalsBundle" */ "./ArtAppraisalsApp"),
  {
    resolveComponent: component => component.ArtAppraisalsApp,
  },
)

export const artAppraisalsRoutes: RouteProps[] = [
  {
    path: "/art-appraisals",
    getComponent: () => ArtAppraisalsApp,
  },
]
