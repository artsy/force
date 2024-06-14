import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { AuthContextModule } from "@artsy/cohesion"
import { extractNodes } from "Utils/extractNodes"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { tabTypeToContextModuleMap } from "Apps/Auctions/Utils/tabTypeToContextModuleMap"
import { TrendingLotsRail_viewer$data } from "__generated__/TrendingLotsRail_viewer.graphql"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { trackHelpers } from "Utils/cohesionHelpers"
import { CuratorialRailsZeroState } from "./CuritorialRailsTabBar"
import { Rail } from "Components/Rail/Rail"
export interface TrendingLotsRailProps {
  viewer: TrendingLotsRail_viewer$data
}

const TrendingLotsRail: React.FC<TrendingLotsRailProps> = ({ viewer }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()
  const contextModule = tabTypeToContextModuleMap.trendingLots as AuthContextModule

  const nodes = extractNodes(viewer.trendingLotsConnection)
  const openLots = nodes.filter(node => !node.sale?.isClosed)

  if (openLots.length === 0) {
    return <CuratorialRailsZeroState />
  }

  return (
    <Rail
      title="Trending lots"
      subTitle="Works with the most bids today"
      getItems={() => {
        return openLots.map((node, index) => {
          return (
            <ShelfArtworkFragmentContainer
              artwork={node}
              key={node.slug}
              contextModule={contextModule}
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
          biddableSale: true
          first: 10
          sort: "-bidder_positions_count"
          estimateRange: "5_000_00-*"
        ) {
          edges {
            counts {
              bidderPositions
            }
            node {
              internalID
              slug
              sale {
                isClosed
              }
              ...ShelfArtwork_artwork
            }
          }
        }
      }
    `,
  }
)
