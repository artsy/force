import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairFollowedArtists_fair$data } from "__generated__/FairFollowedArtists_fair.graphql"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Box, BoxProps, Shelf, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { extractNodes } from "Utils/extractNodes"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"

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
    context_page_owner_type: contextPageOwnerType!,
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
      context_page_owner_type: contextPageOwnerType!,
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

  const artworks = extractNodes(fair.followedArtistArtworks)

  if (artworks.length === 0) return null

  return (
    <Box {...rest}>
      <Box display="flex" justifyContent="space-between">
        <Text variant="lg-display" as="h3">
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

      <Spacer y={4} />

      <Shelf>
        {artworks.map((artwork, index) => {
          return (
            <ShelfArtworkFragmentContainer
              key={artwork.internalID}
              contextModule={ContextModule.fairRail}
              artwork={artwork}
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
      </Shelf>
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
            node {
              ...ShelfArtwork_artwork
              internalID
              slug
            }
          }
        }
      }
    `,
  }
)
