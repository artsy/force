import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairFollowedArtists_fair$data } from "v2/__generated__/FairFollowedArtists_fair.graphql"
import { Carousel } from "v2/Components/Carousel"
import FillwidthItem from "v2/Components/Artwork/FillwidthItem"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Box, BoxProps, Text } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { useTracking } from "v2/System/Analytics/useTracking"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"

const IMAGE_HEIGHT = 160

interface FairFollowedArtistsProps extends BoxProps {
  fair: FairFollowedArtists_fair$data
}

export const FairFollowedArtists: React.FC<FairFollowedArtistsProps> = ({
  fair,
  ...rest
}) => {
  const tracking = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const tappedViewTrackingData: ClickedArtworkGroup = {
    context_module: ContextModule.worksByArtistsYouFollowRail,
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    context_page_owner_type: contextPageOwnerType,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    destination_page_owner_type: OwnerType.fair,
    destination_page_owner_id: fair.internalID,
    destination_page_owner_slug: fair.slug,
    type: "viewAll",
    action: ActionType.clickedArtworkGroup,
  }

  const clickedFairArtworkData = ({
    artworkID,
    artworkSlug,
    carouselIndex,
  }): ClickedArtworkGroup => {
    return {
      context_module: ContextModule.worksByArtistsYouFollowRail,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      context_page_owner_type: contextPageOwnerType,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      destination_page_owner_type: OwnerType.artwork,
      destination_page_owner_id: artworkID,
      destination_page_owner_slug: artworkSlug,
      horizontal_slide_position: carouselIndex,
      type: "thumbnail",
      action: ActionType.clickedArtworkGroup,
    }
  }

  if (!fair.followedArtistArtworks?.edges?.length) return null

  return (
    <Box {...rest}>
      <Box display="flex" justifyContent="space-between">
        <Text variant="lg" as="h3" mb={2}>
          Works by artists you follow
        </Text>

        <Text variant="sm">
          <RouterLink
            to={`/fair/${fair.slug}/artworks?include_artworks_by_followed_artists=true`}
            onClick={() => {
              tracking.trackEvent(tappedViewTrackingData)
            }}
          >
            View all
          </RouterLink>
        </Text>
      </Box>

      <Carousel arrowHeight={IMAGE_HEIGHT}>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        {fair.followedArtistArtworks.edges.map(({ artwork }, index) => {
          return (
            <FillwidthItem
              key={artwork.internalID}
              contextModule={ContextModule.fairRail}
              artwork={artwork}
              imageHeight={IMAGE_HEIGHT}
              hidePartnerName
              lazyLoad
              onClick={() =>
                tracking.trackEvent(
                  clickedFairArtworkData({
                    artworkID: artwork.internalID,
                    artworkSlug: artwork.slug,
                    carouselIndex: index,
                  })
                )
              }
            />
          )
        })}
      </Carousel>
    </Box>
  )
}

export const FairFollowedArtistsFragmentContainer = createFragmentContainer(
  FairFollowedArtists,
  {
    fair: graphql`
      fragment FairFollowedArtists_fair on Fair {
        internalID
        slug
        followedArtistArtworks: filterArtworksConnection(
          includeArtworksByFollowedArtists: true
          first: 20
        ) {
          edges {
            artwork: node {
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
