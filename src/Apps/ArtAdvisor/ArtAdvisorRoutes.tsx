import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const ArtAdvisorApp = loadable(
  () => import(/* webpackChunkName: "jobsBundle" */ "./ArtAdvisorApp"),
  {
    resolveComponent: component => component.ArtAdvisorApp,
  }
)

export const artAdvisorRoutes: AppRouteConfig[] = [
  {
    path: "/advisor",
    getComponent: () => ArtAdvisorApp,
    onClientSideRender: () => {
      ArtAdvisorApp.preload()
    },
  },
]
