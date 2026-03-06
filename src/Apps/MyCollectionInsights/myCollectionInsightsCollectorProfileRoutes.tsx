import loadable from "@loadable/component"
import type { RouteProps } from "System/Router/Route"
import { graphql } from "react-relay"

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
  },
)

export const myCollectionInsightsCollectorProfileRoutes: RouteProps[] = [
  {
    path: "/collector-profile/my-collection/median-sale-price-at-auction/:artistID",
    getComponent: () => MyCollectionInsightsMedianSalePriceAtAuction,
    onPreloadJS: () => {
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
    // layout: "ContainerOnly", // TODO: Change layout depending on the conversation with the #design team
  },
]
