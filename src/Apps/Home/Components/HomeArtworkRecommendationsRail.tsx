import {
  ActionType,
  type ClickedArtworkGroup,
  ContextModule,
  OwnerType,
  PageOwnerType,
} from "@artsy/cohesion"
import { Skeleton } from "@artsy/palette"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { Rail } from "Components/Rail/Rail"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { getSignalLabel } from "Utils/getSignalLabel"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import type {
  HomeArtworkRecommendationsRailQuery,
  HomeArtworkRecommendationsRailQuery$data,
} from "__generated__/HomeArtworkRecommendationsRailQuery.graphql"
import { useSystemContext } from "System/Hooks/useSystemContext"

interface HomeArtworkRecommendationsRailProps {
  me: HomeArtworkRecommendationsRailQuery$data["me"]
}

export const HomeArtworkRecommendationsRail: React.FC<
  React.PropsWithChildren<HomeArtworkRecommendationsRailProps>
> = ({ me }) => {
  const { trackEvent } = useTracking()
  const { signals } = useArtworkGridContext()
  const artworks = extractNodes(me?.artworkRecommendations)

  if (artworks.length === 0) {
    return null
  }

  return (
    <Rail
      title="We Think You'll Love"
      viewAllLabel="View All Works"
      viewAllHref="/artwork-recommendations"
      viewAllOnClick={() => {
        const trackingEvent: ClickedArtworkGroup = {
          action: ActionType.clickedArtworkGroup,
          context_module: ContextModule.artworkRecommendationsRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_type:
            OwnerType.artworkRecommendations as PageOwnerType, // TODO: add artworkRecommendations as PageOwnerType to cohesion
          destination_page_owner_id: "artwork-recommendations",
          destination_page_owner_slug: "artwork-recommendations",
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
            // @ts-expect-error TODO: add to the union type of auth context module
            contextModule={ContextModule.artworkRecommendationsRail}
            onClick={() => {
              const trackingEvent: ClickedArtworkGroup = {
                action: ActionType.clickedArtworkGroup,
                context_module: ContextModule.artworkRecommendationsRail,
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
        ))
      }}
    />
  )
}

export const HomeArtworkRecommendationsRailQueryRenderer: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { relayEnvironment, user } = useSystemContext()

  if (!user) {
    return null
  }

  return (
    <SystemQueryRenderer<HomeArtworkRecommendationsRailQuery>
      placeholder={PLACEHOLDER}
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeArtworkRecommendationsRailQuery {
          me {
            artworkRecommendations(first: 10) {
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
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me) {
          return PLACEHOLDER
        }

        if (!props?.me?.artworkRecommendations) {
          return null
        }

        return <HomeArtworkRecommendationsRail me={props.me} />
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="We Think You'll Love"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })
      }}
    />
  </Skeleton>
)
