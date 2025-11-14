import type { RouteProps } from "System/Router/Route"
import loadable from "@loadable/component"
import { graphql } from "react-relay"

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

export const myCollectionInsightsRoutes: RouteProps[] = [
  {
    path: "/my-collection/median-sale-price-at-auction/:artistID",
    getComponent: () => MyCollectionInsightsMedianSalePriceAtAuction,
    onPreloadJS: () => {
      MyCollectionInsightsMedianSalePriceAtAuction.preload()
    },
    query: graphql`
      query myCollectionInsightsRoutesQuery($artistID: String!) {
        artist(id: $artistID) @principalField {
          ...MyCollectionInsightsMedianSalePriceAtAuction_artist
        }
      }
    `,
    cacheConfig: {
      force: true,
    },
    // layout: "ContainerOnly", // TODO: Switch layout depending on the conversation with the #design team
  },
]
