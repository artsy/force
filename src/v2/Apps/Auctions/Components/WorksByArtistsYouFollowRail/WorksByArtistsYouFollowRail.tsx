import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useAnalyticsContext } from "v2/Artsy"
import { WorksByArtistsYouFollowRail_viewer } from "v2/__generated__/WorksByArtistsYouFollowRail_viewer.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import { AUCTION_ARTWORKS_IMAGE_HEIGHT } from "../AuctionArtworksRail/AuctionArtworksRail"
import { useTracking } from "react-tracking"
import { clickedArtworkGroup } from "@artsy/cohesion"
import { tabTypeToContextModuleMap } from "../../Utils/tabTypeToContextModuleMap"
import { Text } from "@artsy/palette"

export interface WorksByArtistsYouFollowRailProps {
  viewer: WorksByArtistsYouFollowRail_viewer
}

const WorksByArtistsYouFollowRail: React.FC<WorksByArtistsYouFollowRailProps> = ({
  viewer,
}) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()
  const contextModule = tabTypeToContextModuleMap.worksByArtistsYouFollow

  if (viewer.saleArtworksConnection.edges.length === 0) {
    return null
  }

  return (
    <>
      <Text as="h3" variant="subtitle" mb={2}>
        Works by artists you follow
      </Text>

      <Carousel arrowHeight={AUCTION_ARTWORKS_IMAGE_HEIGHT}>
        {viewer.saleArtworksConnection.edges.map(({ node }, index) => {
          return (
            <FillwidthItem
              key={index}
              contextModule={contextModule}
              artwork={node}
              imageHeight={AUCTION_ARTWORKS_IMAGE_HEIGHT}
              hidePartnerName
              lazyLoad
              onClick={() => {
                trackEvent(
                  clickedArtworkGroup({
                    contextModule,
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
      </Carousel>
    </>
  )
}

export const WorksByArtistsYouFollowRailFragmentContainer = createFragmentContainer(
  WorksByArtistsYouFollowRail,
  {
    viewer: graphql`
      fragment WorksByArtistsYouFollowRail_viewer on Viewer {
        saleArtworksConnection(
          includeArtworksByFollowedArtists: true
          isAuction: true
          liveSale: true
          first: 50
        ) {
          edges {
            node {
              internalID
              slug
              ...FillwidthItem_artwork
            }
          }
        }
      }
    `,
  }
)
