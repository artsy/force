import loadable from "@loadable/component"
import { graphql } from "react-relay"
import { AppRouteConfig } from "System/Router/Route"

// TODO: when cleanning up collector-profile ff,
// change the file name to myCollectionInsightsRoutes
// and export name to myCollectionInsightsRoutes

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

export const myCollectionInsightsCollectorProfileRoutes: AppRouteConfig[] = [
  {
    path:
      "/collector-profile/my-collection/median-sale-price-at-auction/:artistID",
    getComponent: () => MyCollectionInsightsMedianSalePriceAtAuction,
    onClientSideRender: () => {
      MyCollectionInsightsMedianSalePriceAtAuction.preload()
    },
    query: graphql`
      query myCollectionInsightsCollectorProfileRoutesQuery(
        $artistID: String!
      ) {
        artist(id: $artistID) @principalField {
          ...MyCollectionInsightsMedianSalePriceAtAuction_artist
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
    // hideNav: true, // TODO: Hide/Unhide depending on the conversation with the #design team
    // hideFooter: true, // TODO: Hide/Unhide depending on the conversation with the #design team
  },
]
