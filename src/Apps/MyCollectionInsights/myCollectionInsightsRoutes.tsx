import loadable from "@loadable/component"
import { AppRouteConfig } from "System/Router/Route"

const MyCollectionInsightsMedianSalePriceAtAuction = loadable(
  () =>
    import(
      /* webpackChunkName: "myCollectionInsightsBundle" */ "./Routes/MyCollectionInsightsMedianSalePriceAtAuction/MyCollectionInsightsMedianSalePriceAtAuction"
    ),
  {
    resolveComponent: component =>
      component.MyCollectionInsightsMedianSalePriceAtAuction,
  }
)

export const myCollectionInsightsRoutes: AppRouteConfig[] = [
  {
    path: "/my-collection/median-sale-price-at-auction/:artistID",
    getComponent: () => MyCollectionInsightsMedianSalePriceAtAuction,
    // hideNav: true, // TODO: Hide/Unhide depending on the conversation with the #design team
    // hideFooter: true, // TODO: Hide/Unhide depending on the conversation with the #design team
  },
]
