import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { AuthContextModule } from "@artsy/cohesion"
import { extractNodes } from "v2/Utils/extractNodes"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { tabTypeToContextModuleMap } from "../Utils/tabTypeToContextModuleMap"
import { TrendingLotsRail_viewer } from "v2/__generated__/TrendingLotsRail_viewer.graphql"
import { useAnalyticsContext } from "v2/System"
import { trackHelpers } from "v2/Utils/cohesionHelpers"
import { CuratorialRailsZeroState } from "./CuritorialRailsTabBar"
import { Rail } from "v2/Components/Rail"
export interface TrendingLotsRailProps {
  viewer: TrendingLotsRail_viewer
}

const TrendingLotsRail: React.FC<TrendingLotsRailProps> = ({ viewer }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()
  const contextModule = tabTypeToContextModuleMap.trendingLots as AuthContextModule

  const nodes = extractNodes(viewer.trendingLotsConnection)

  const liveSaleArtworks = nodes.filter(node => {
    return !node.sale?.isClosed
  })

  if (nodes.length === 0 || liveSaleArtworks.length === 0) {
    return <CuratorialRailsZeroState />
  }

  return (
    <Rail
      title="Trending lots"
      subTitle="Works with the most bids today"
      countLabel={liveSaleArtworks.length}
      getItems={() => {
        return liveSaleArtworks.map((node, index) => {
          return (
            <ShelfArtworkFragmentContainer
              artwork={node}
              key={node.slug}
              contextModule={contextModule}
              hidePartnerName
              lazyLoad
              onClick={() => {
                trackEvent(
                  trackHelpers.clickedArtworkGroup(
                    contextModule,
                    contextPageOwnerType!,
                    node.internalID,
                    node.slug,
                    index
                  )
                )
              }}
            />
          )
        })
      }}
    />
  )
}

export const TrendingLotsRailFragmentContainer = createFragmentContainer(
  TrendingLotsRail,
  {
    viewer: graphql`
      fragment TrendingLotsRail_viewer on Viewer {
        trendingLotsConnection: saleArtworksConnection(
          first: 50
          sort: "-bidder_positions_count"
        ) {
          edges {
            counts {
              bidderPositions
            }
            node {
              internalID
              slug
              ...ShelfArtwork_artwork @arguments(width: 325)
              sale {
                isClosed
              }
            }
          }
        }
      }
    `,
  }
)
