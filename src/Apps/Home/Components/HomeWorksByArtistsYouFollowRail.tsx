import {
  ActionType,
  type ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Shelf, Skeleton } from "@artsy/palette"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { getSignalLabel } from "Utils/getSignalLabel"
import type { HomeWorksByArtistsYouFollowRailQuery } from "__generated__/HomeWorksByArtistsYouFollowRailQuery.graphql"
import type { HomeWorksByArtistsYouFollowRail_homePage$data } from "__generated__/HomeWorksByArtistsYouFollowRail_homePage.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface HomeWorksByArtistsYouFollowRailProps {
  homePage: HomeWorksByArtistsYouFollowRail_homePage$data
}

const HomeWorksByArtistsYouFollowRail: React.FC<
  React.PropsWithChildren<HomeWorksByArtistsYouFollowRailProps>
> = ({ homePage }) => {
  const { trackEvent } = useTracking()
  const { signals } = useArtworkGridContext()

  const results = homePage.artworkModule?.results
  if (!results || results?.length === 0) {
    return null
  }

  return (
    <Shelf>
      {results.map((artwork, index) => {
        if (!artwork) {
          return <></>
        }

        return (
          <ShelfArtworkFragmentContainer
            artwork={artwork}
            key={index}
            contextModule={ContextModule.worksByArtistsYouFollowRail}
            lazyLoad
            onClick={() => {
              const trackingEvent: ClickedArtworkGroup = {
                action: ActionType.clickedArtworkGroup,
                context_module: ContextModule.worksByArtistsYouFollowRail,
                context_page_owner_type: OwnerType.home,
                destination_page_owner_id: artwork.internalID,
                destination_page_owner_slug: artwork.slug,
                destination_page_owner_type: OwnerType.artwork,
                type: "thumbnail",
                signal_label: getSignalLabel({
                  signals: signals?.[artwork.internalID] ?? [],
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

export const HomeWorksByArtistsYouFollowRailFragmentContainer =
  createFragmentContainer(HomeWorksByArtistsYouFollowRail, {
    homePage: graphql`
      fragment HomeWorksByArtistsYouFollowRail_homePage on HomePage {
        artworkModule(key: FOLLOWED_ARTISTS) {
          results {
            internalID
            slug
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
    `,
  })

export const HomeWorksByArtistsYouFollowRailQueryRenderer: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeWorksByArtistsYouFollowRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeWorksByArtistsYouFollowRailQuery {
          homePage {
            ...HomeWorksByArtistsYouFollowRail_homePage
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

        if (props.homePage) {
          return (
            <HomeWorksByArtistsYouFollowRailFragmentContainer
              homePage={props.homePage}
            />
          )
        }

        return null
      }}
    />
  )
}
