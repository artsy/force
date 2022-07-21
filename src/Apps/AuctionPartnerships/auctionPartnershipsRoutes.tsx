import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const AuctionPartnershipsApp = loadable(
  () =>
    import(
      /* webpackChunkName: "auctionPartnershipsBundle" */ "./AuctionPartnershipsApp"
    ),
  {
    resolveComponent: component => component.AuctionPartnershipsApp,
  }
)

export const auctionPartnershipsRoutes: AppRouteConfig[] = [
  {
    path: "/auction-partnerships",
    getComponent: () => AuctionPartnershipsApp,
  },
]
