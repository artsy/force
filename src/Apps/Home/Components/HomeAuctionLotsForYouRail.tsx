import {
  ActionType,
  type AuthContextModule,
  type ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Box, Shelf, Skeleton } from "@artsy/palette"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { useRailImpressionTracking } from "Components/RailImpression/useRailImpressionTracking"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

import { extractNodes } from "Utils/extractNodes"
import type { HomeAuctionLotsForYouRailQuery } from "__generated__/HomeAuctionLotsForYouRailQuery.graphql"
import type { HomeAuctionLotsForYouRail_artworksForUser$data } from "__generated__/HomeAuctionLotsForYouRail_artworksForUser.graphql"

interface HomeAuctionLotsForYouRailProps {
  artworksForUser: HomeAuctionLotsForYouRail_artworksForUser$data
  railPositionY?: number
}

const HomeAuctionLotsForYouRail: React.FC<
  React.PropsWithChildren<HomeAuctionLotsForYouRailProps>
> = ({ artworksForUser, railPositionY }) => {
  const { trackEvent } = useTracking()
  const contextModule = ContextModule.lotsForYouRail as AuthContextModule
  const { railImpressionRef } = useRailImpressionTracking({
    contextModule: ContextModule.lotsForYouRail,
    positionY: railPositionY,
  })

  const artworks = extractNodes(artworksForUser)

  if (!artworks || artworks?.length === 0) {
    return null
  }

  return (
    <Box ref={railImpressionRef} width="100%">
      <Shelf>
        {artworks.map((artwork, index) => {
          if (!artwork) {
            return <></>
          }

          return (
            <ShelfArtworkFragmentContainer
              artwork={artwork}
              key={index}
              lazyLoad
              contextModule={contextModule}
              onClick={() => {
                const trackingEvent: ClickedArtworkGroup = {
                  action: ActionType.clickedArtworkGroup,
                  context_module: ContextModule.lotsForYouRail,
                  context_page_owner_type: OwnerType.home,
                  destination_page_owner_id: artwork.internalID,
                  destination_page_owner_slug: artwork.slug,
                  destination_page_owner_type: OwnerType.artwork,
                  type: "thumbnail",
                  signal_bid_count: artwork.collectorSignals?.auction?.bidCount,
                  signal_lot_watcher_count:
                    artwork.collectorSignals?.auction?.lotWatcherCount,
                }
                trackEvent(trackingEvent)
              }}
            />
          )
        })}
      </Shelf>
    </Box>
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Shelf>
      {[...new Array(8)].map((_, i) => {
        return <ShelfArtworkPlaceholder key={i} index={i} />
      })}
    </Shelf>
  </Skeleton>
)

export const HomeAuctionLotsForYouRailFragmentContainer =
  createFragmentContainer(HomeAuctionLotsForYouRail, {
    artworksForUser: graphql`
      fragment HomeAuctionLotsForYouRail_artworksForUser on ArtworkConnection {
        edges {
          node {
            internalID
            slug
            collectorSignals {
              auction {
                bidCount
                lotWatcherCount
              }
            }
            ...ShelfArtwork_artwork
          }
        }
      }
    `,
  })

export const HomeAuctionLotsForYouRailQueryRenderer: React.FC<
  React.PropsWithChildren<{ railPositionY?: number }>
> = ({ railPositionY }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeAuctionLotsForYouRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeAuctionLotsForYouRailQuery {
          artworksForUser(
            includeBackfill: true
            first: 20
            onlyAtAuction: true
          ) {
            ...HomeAuctionLotsForYouRail_artworksForUser
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        if (props.artworksForUser) {
          return (
            <HomeAuctionLotsForYouRailFragmentContainer
              artworksForUser={props.artworksForUser}
              railPositionY={railPositionY}
            />
          )
        }

        return null
      }}
    />
  )
}
