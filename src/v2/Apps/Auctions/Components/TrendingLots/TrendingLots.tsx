import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

import { Shelf, Spacer, Sup, Text } from "@artsy/palette"
import { AuthContextModule } from "@artsy/cohesion"

import { extractNodes } from "v2/Utils/extractNodes"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { tabTypeToContextModuleMap } from "../../Utils/tabTypeToContextModuleMap"
import { TrendingLots_viewer } from "v2/__generated__/TrendingLots_viewer.graphql"
import { useAnalyticsContext } from "v2/System"
import { CuratorialRailsZeroState } from "../CuratorialRailsZeroState/CuratorialRailsZeroState"
import { trackHelpers } from "v2/Utils/cohesionHelpers"
export interface TrendingLotsProps {
  viewer: TrendingLots_viewer
}

const TrendingLots: React.FC<TrendingLotsProps> = ({ viewer }) => {
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
    <>
      <Text as="h3" variant="lg" color="black100" mt={6}>
        Trending lots <Sup color="brand">{liveSaleArtworks?.length}</Sup>
      </Text>

      <Text as="h3" variant="lg" color="black60">
        Works with the most bids today
      </Text>

      <Spacer mb={4} />

      <Shelf>
        {liveSaleArtworks.map((node, index) => {
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
        })}
      </Shelf>
    </>
  )
}

export const TrendingLotsFragmentContainer = createFragmentContainer(
  TrendingLots,
  {
    viewer: graphql`
      fragment TrendingLots_viewer on Viewer {
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
