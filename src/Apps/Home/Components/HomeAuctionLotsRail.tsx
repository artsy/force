import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import {
  ActionType,
  type AuthContextModule,
  type ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Shelf, Skeleton } from "@artsy/palette"
import type { HomeAuctionLotsRail_viewer$data } from "__generated__/HomeAuctionLotsRail_viewer.graphql"
import type { HomeAuctionLotsRailQuery } from "__generated__/HomeAuctionLotsRailQuery.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface HomeAuctionLotsRailProps {
  viewer: HomeAuctionLotsRail_viewer$data
}

const HomeAuctionLotsRail: React.FC<
  React.PropsWithChildren<HomeAuctionLotsRailProps>
> = ({ viewer }) => {
  const { trackEvent } = useTracking()
  const contextModule = ContextModule.topAuctionLotsRail as AuthContextModule

  const artworks = extractNodes(viewer.artworksConnection)

  if (artworks.length === 0) {
    return null
  }

  return (
    <Shelf>
      {artworks.map(artwork => {
        return (
          <ShelfArtworkFragmentContainer
            artwork={artwork}
            key={artwork.slug}
            lazyLoad
            contextModule={contextModule}
            onClick={() => {
              const trackingEvent: ClickedArtworkGroup = {
                action: ActionType.clickedArtworkGroup,
                context_module: ContextModule.topAuctionLotsRail,
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

export const HomeAuctionLotsRailFragmentContainer = createFragmentContainer(
  HomeAuctionLotsRail,
  {
    viewer: graphql`
      fragment HomeAuctionLotsRail_viewer on Viewer {
        artworksConnection(
          forSale: true
          first: 20
          geneIDs: "our-top-auction-lots"
        ) {
          edges {
            node {
              ...ShelfArtwork_artwork
              internalID
              slug
              href
              collectorSignals {
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
  }
)

export const HomeAuctionLotsRailQueryRenderer: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeAuctionLotsRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeAuctionLotsRailQuery {
          viewer {
            ...HomeAuctionLotsRail_viewer
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

        if (props.viewer) {
          return <HomeAuctionLotsRailFragmentContainer viewer={props.viewer} />
        }

        return null
      }}
    />
  )
}
