import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"

const HowAuctionsWorkApp = loadable(
  () =>
    import(
      /* webpackChunkName: "howAuctionsWorkBundle" */ "./HowAuctionsWorkApp"
    ),
  {
    resolveComponent: component => component.HowAuctionsWorkApp,
  }
)

export const howAuctionsWorkRoutes: AppRouteConfig[] = [
  {
    path: "how-auctions-work2",
    getComponent: () => HowAuctionsWorkApp,
  },
]
