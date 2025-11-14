import {
  ActionType,
  type ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Box, type BoxProps, Shelf, Spacer, Text } from "@artsy/palette"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { getSignalLabel } from "Utils/getSignalLabel"
import type { FairFollowedArtistsQuery } from "__generated__/FairFollowedArtistsQuery.graphql"
import type { FairFollowedArtists_fair$data } from "__generated__/FairFollowedArtists_fair.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface FairFollowedArtistsProps extends BoxProps {
  fair: FairFollowedArtists_fair$data
}

export const FairFollowedArtists: React.FC<
  React.PropsWithChildren<FairFollowedArtistsProps>
> = ({ fair, ...rest }) => {
  const tracking = useTracking()
  const { signals } = useArtworkGridContext()

  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

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
    signalLabel,
    signalBidCount,
    signalLotWatcherCount,
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
      signal_label: signalLabel,
      signal_bid_count: signalBidCount,
      signal_lot_watcher_count: signalLotWatcherCount,
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
                    signalLabel: getSignalLabel({
                      signals: signals?.[artwork.internalID] ?? [],
                    }),
                    signalBidCount: artwork.collectorSignals?.auction?.bidCount,
                    signalLotWatcherCount:
                      artwork.collectorSignals?.auction?.lotWatcherCount,
                  }),
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
              collectorSignals {
                primaryLabel
                auction {
                  bidCount
                  lotWatcherCount
                }
              }
            }
          }
        }
      }
    `,
  },
)

interface FairFollowedArtistsQueryRendererProps {
  id: string
}

export const FairFollowedArtistsQueryRenderer: React.FC<
  React.PropsWithChildren<FairFollowedArtistsQueryRendererProps>
> = ({ id }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<FairFollowedArtistsQuery>
      environment={relayEnvironment}
      query={graphql`
        query FairFollowedArtistsQuery($id: String!) {
          fair(id: $id) {
            ...FairFollowedArtists_fair
          }
        }
      `}
      variables={{ id }}
      render={({ error, props }) => {
        if (error || !props?.fair) {
          return null
        }

        return <FairFollowedArtistsFragmentContainer fair={props.fair} />
      }}
    />
  )
}
