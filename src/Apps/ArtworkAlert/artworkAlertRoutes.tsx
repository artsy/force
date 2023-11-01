import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const ArtworkAlertApp = loadable(
  () =>
    import(/* webpackChunkName: "ArtworkAlertBundle" */ "./ArtworkAlertApp"),
  {
    resolveComponent: component => component.ArtworkAlertApp,
  }
)

export const artworkAlertRoutes: AppRouteConfig[] = [
  {
    path: "/dev/alert",
    getComponent: () => ArtworkAlertApp,
    onClientSideRender: () => {
      ArtworkAlertApp.preload()
    },
  },
]
