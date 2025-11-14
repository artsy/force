import {
  ActionType,
  type AuthContextModule,
  type ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Skeleton } from "@artsy/palette"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { Rail } from "Components/Rail/Rail"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { getSignalLabel } from "Utils/getSignalLabel"
import type { HomeArtworkRecommendationsRailQuery } from "__generated__/HomeArtworkRecommendationsRailQuery.graphql"
import type { HomeArtworkRecommendationsRail_me$key } from "__generated__/HomeArtworkRecommendationsRail_me.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface HomeArtworkRecommendationsRailProps {
  me: HomeArtworkRecommendationsRail_me$key
}

export const HomeArtworkRecommendationsRail: React.FC<
  React.PropsWithChildren<HomeArtworkRecommendationsRailProps>
> = ({ me }) => {
  const { trackEvent } = useTracking()
  const { signals } = useArtworkGridContext()
  const data = useFragment(FRAGMENT, me)

  const artworks = extractNodes(data?.artworkRecommendations)

  if (artworks.length === 0) {
    return null
  }

  return (
    <Rail
      title="We Think You’ll Love"
      viewAllLabel="View All Works"
      viewAllHref="/recommendations/artworks"
      viewAllOnClick={() => {
        const trackingEvent: ClickedArtworkGroup = {
          action: ActionType.clickedArtworkGroup,
          context_module: ContextModule.artworkRecommendationsRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_type: OwnerType.artworkRecommendations,
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
            contextModule={
              ContextModule.artworkRecommendationsRail as AuthContextModule
            }
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

const FRAGMENT = graphql`
  fragment HomeArtworkRecommendationsRail_me on Me {
    artworkRecommendations(first: 10) {
      edges {
        node {
          internalID
          slug
          href
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
  }
`

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
            ...HomeArtworkRecommendationsRail_me
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

        return <HomeArtworkRecommendationsRail me={props.me} />
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="We Think You’ll Love"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })
      }}
    />
  </Skeleton>
)
