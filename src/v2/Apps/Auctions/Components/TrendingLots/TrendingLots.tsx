import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

import { Box, Shelf, Spacer, Text } from "@artsy/palette"
import { AuthContextModule, clickedArtworkGroup } from "@artsy/cohesion"

import { extractNodes } from "v2/Utils/extractNodes"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { tabTypeToContextModuleMap } from "../../Utils/tabTypeToContextModuleMap"
import { TrendingLots_viewer } from "v2/__generated__/TrendingLots_viewer.graphql"
import { useAnalyticsContext } from "v2/System"
export interface TrendingLotsProps {
  viewer: TrendingLots_viewer
}

const TrendingLots: React.FC<TrendingLotsProps> = ({ viewer }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()
  const contextModule = tabTypeToContextModuleMap.trendingLots as AuthContextModule

  const nodes = extractNodes(viewer.trendingLotsConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <>
      <Box>
        <Text as="h3" variant="lg" color="black100">
          Trending lots{" "}
          <sup>
            <Text as="span" variant="xs" color="brand">
              {/* @ts-expect-error STRICT_NULL_CHECK */}
              {viewer.trendingLotsConnection.edges.length}
            </Text>
          </sup>
        </Text>

        <Text as="h3" variant="lg" color="black60" mb={2}>
          Works with the most bids today
        </Text>
      </Box>

      <Spacer mb={4} />

      <Shelf>
        {nodes.map((node, index) => {
          return (
            <ShelfArtworkFragmentContainer
              artwork={node}
              key={node.slug}
              contextModule={contextModule}
              hidePartnerName
              lazyLoad
              onClick={() => {
                trackEvent(
                  clickedArtworkGroup({
                    contextModule,
                    // @ts-expect-error STRICT_NULL_CHECK
                    contextPageOwnerType,
                    artworkID: node.internalID,
                    artworkSlug: node.slug,
                    horizontalSlidePosition: index,
                  })
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
            }
          }
        }
      }
    `,
  }
)
