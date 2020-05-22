import loadable from "@loadable/component"
import { RouteConfig } from "found"
import { graphql } from "react-relay"

const FeatureAKGApp = loadable(() => import("./FeatureAKGApp"))

export const routes: RouteConfig[] = [
  {
    path: "/campaign/art-keeps-going",
    getComponent: () => FeatureAKGApp,
    prepare: () => {
      FeatureAKGApp.preload()
    },
    query: graphql`
      query routes_FeatureAKGQuery(
        $articleIDs: [String]!
        $selectedWorksSetID: String!
        $collectionRailItemIDs: [String!]
        $auctionRailItemIDs: [String!]
        $fairRailItemIDs: [String!]
        $hasCollectionRailItems: Boolean!
        $hasAuctionRailItems: Boolean!
        $hasFairRailItems: Boolean!
      ) {
        viewer {
          ...FeatureAKGApp_viewer
            @arguments(
              articleIDs: $articleIDs
              selectedWorksSetID: $selectedWorksSetID
              collectionRailItemIDs: $collectionRailItemIDs
              auctionRailItemIDs: $auctionRailItemIDs
              fairRailItemIDs: $fairRailItemIDs
              hasCollectionRailItems: $hasCollectionRailItems
              hasAuctionRailItems: $hasAuctionRailItems
              hasFairRailItems: $hasFairRailItems
            )
        }
      }
    `,
    prepareVariables: (_params, props) => {
      const data = props.context.injectedData
      const collectionIDs = data?.browse?.collections_rail?.items ?? []
      const fairIDs = data?.browse?.fairs_rail?.items ?? []
      const auctionIDs = data?.browse?.auctions_rail?.items ?? []
      const hasCollectionRailItems = !!collectionIDs.length
      const hasAuctionRailItems = !!auctionIDs.length
      const hasFairRailItems = !!fairIDs.length

      return {
        articleIDs: data?.editorial?.article_ids,
        selectedWorksSetID: data?.selected_works?.set_id,
        collectionRailItemIDs: collectionIDs.map(item => item.id),
        auctionRailItemIDs: auctionIDs.map(item => item.id),
        fairRailItemIDs: fairIDs.map(item => item.id),
        hasCollectionRailItems,
        hasAuctionRailItems,
        hasFairRailItems,
      }
    },
  },
]
