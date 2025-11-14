import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { Rail } from "Components/Rail/Rail"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { getSignalLabel } from "Utils/getSignalLabel"
import {
  ActionType,
  type ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Skeleton } from "@artsy/palette"
import type { HomeEmergingPicksArtworksRail_viewer$data } from "__generated__/HomeEmergingPicksArtworksRail_viewer.graphql"
import type { HomeEmergingPicksArtworksRailQuery } from "__generated__/HomeEmergingPicksArtworksRailQuery.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface HomeEmergingPicksArtworksRailProps {
  viewer: HomeEmergingPicksArtworksRail_viewer$data
}

export const HomeEmergingPicksArtworksRail: React.FC<
  React.PropsWithChildren<HomeEmergingPicksArtworksRailProps>
> = ({ viewer }) => {
  const { trackEvent } = useTracking()
  const { signals } = useArtworkGridContext()
  const artworks = extractNodes(viewer.artworksConnection)

  if (artworks.length === 0) {
    return null
  }

  return (
    <Rail
      title="Curators’ Picks"
      subTitle="Fresh standout works handpicked by our chief curator."
      viewAllLabel="View All Works"
      viewAllHref="/collection/curators-picks-emerging"
      viewAllOnClick={() => {
        const trackingEvent: ClickedArtworkGroup = {
          action: ActionType.clickedArtworkGroup,
          context_module: ContextModule.troveArtworksRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_type: OwnerType.collection,
          destination_page_owner_id: "932d0b13-3cf1-46d1-8e49-18b186230347",
          destination_page_owner_slug: "curators-picks-emerging",
          type: "viewAll",
        }

        trackEvent(trackingEvent)
      }}
      getItems={() => {
        return artworks.map(artwork => (
          <ShelfArtworkFragmentContainer
            artwork={artwork}
            key={artwork.internalID}
            lazyLoad
            // @ts-expect-error TODO: add troveArtworksRail to the union type of auth context module
            contextModule={ContextModule.troveArtworksRail}
            onClick={() => {
              const trackingEvent: ClickedArtworkGroup = {
                action: ActionType.clickedArtworkGroup,
                context_module: ContextModule.troveArtworksRail,
                context_page_owner_type: OwnerType.home,
                destination_page_owner_type: OwnerType.artwork,
                destination_page_owner_id: artwork.internalID,
                destination_page_owner_slug: artwork.slug,
                type: "thumbnail",
                signal_label: getSignalLabel({
                  signals: signals?.[artwork.internalID] ?? [],
                  hideSignals: true,
                }),
                signal_bid_count:
                  artwork.collectorSignals?.auction?.bidCount ?? undefined,
                signal_lot_watcher_count:
                  artwork.collectorSignals?.auction?.lotWatcherCount ??
                  undefined,
              }

              trackEvent(trackingEvent)
            }}
          />
        ))
      }}
    />
  )
}

export const HomeEmergingPicksArtworksRailFragmentContainer =
  createFragmentContainer(HomeEmergingPicksArtworksRail, {
    viewer: graphql`
      fragment HomeEmergingPicksArtworksRail_viewer on Viewer {
        artworksConnection(
          first: 20
          marketingCollectionID: "curators-picks-emerging"
          sort: "-decayed_merch"
        ) {
          edges {
            node {
              internalID
              slug
              href
              collectorSignals {
                primaryLabel
                auction {
                  bidCount
                  lotWatcherCount
                }
              }
              ...ShelfArtwork_artwork
            }
          }
        }
      }
    `,
  })

export const HomeEmergingPicksArtworksRailQueryRenderer: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <SystemQueryRenderer<HomeEmergingPicksArtworksRailQuery>
      placeholder={PLACEHOLDER}
      lazyLoad
      query={graphql`
        query HomeEmergingPicksArtworksRailQuery {
          viewer {
            ...HomeEmergingPicksArtworksRail_viewer
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.viewer) {
          return PLACEHOLDER
        }

        return (
          <HomeEmergingPicksArtworksRailFragmentContainer
            viewer={props.viewer}
          />
        )
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Curators’ Picks"
      subTitle="Fresh standout works handpicked by our chief curator."
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })
      }}
    />
  </Skeleton>
)
