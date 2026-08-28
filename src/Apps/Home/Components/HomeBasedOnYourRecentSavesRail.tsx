import {
  ActionType,
  type AuthContextModule,
  type ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Skeleton } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { HomeArtworkItemImpression } from "Apps/Home/Components/HomeArtworkItemImpression"
import type { HomeRailTrackingProps } from "Apps/Home/homeRailPositionY"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { useArtworkGridContext } from "Components/ArtworkGrid/ArtworkGridContext"
import { Rail } from "Components/Rail/Rail"
import { useRailImpressionTracking } from "Components/RailImpression/useRailImpressionTracking"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { getSignalLabel } from "Utils/getSignalLabel"
import type { HomeBasedOnYourRecentSavesRailQuery } from "__generated__/HomeBasedOnYourRecentSavesRailQuery.graphql"
import type { HomeBasedOnYourRecentSavesRail_me$key } from "__generated__/HomeBasedOnYourRecentSavesRail_me.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

export const BASED_ON_YOUR_RECENT_SAVES_TITLE =
  "Inspired by Your Saved Artworks"

interface HomeBasedOnYourRecentSavesRailProps extends HomeRailTrackingProps {
  me: HomeBasedOnYourRecentSavesRail_me$key
}

export const HomeBasedOnYourRecentSavesRail: React.FC<
  React.PropsWithChildren<HomeBasedOnYourRecentSavesRailProps>
> = ({ me, railPositionY }) => {
  const { trackEvent } = useTracking()
  const { signals } = useArtworkGridContext()
  const { railImpressionRef } = useRailImpressionTracking({
    contextModule: ContextModule.basedOnYourRecentSavesRail,
    positionY: railPositionY,
  })
  const data = useFragment(FRAGMENT, me)

  const artworks = extractNodes(data?.basedOnUserSaves)

  if (artworks.length === 0) {
    return null
  }

  return (
    <Rail
      ref={railImpressionRef}
      title={BASED_ON_YOUR_RECENT_SAVES_TITLE}
      viewAllLabel="View All Works"
      viewAllHref="/inspired-by-your-saves"
      viewAllOnClick={() => {
        const trackingEvent: ClickedArtworkGroup = {
          action: ActionType.clickedArtworkGroup,
          context_module: ContextModule.basedOnYourRecentSavesRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_type: OwnerType.basedOnYourRecentSaves,
          destination_page_owner_id: "inspired-by-your-saves",
          destination_page_owner_slug: "inspired-by-your-saves",
          type: "viewAll",
        }

        trackEvent(trackingEvent)
      }}
      getItems={() => {
        return artworks.map((artwork, index) => (
          <HomeArtworkItemImpression
            artworkID={artwork.internalID}
            contextModule={ContextModule.basedOnYourRecentSavesRail}
            disabled={railPositionY === undefined}
            key={artwork.internalID}
            position={index}
          >
            <ShelfArtworkFragmentContainer
              artwork={artwork}
              lazyLoad
              contextModule={
                ContextModule.basedOnYourRecentSavesRail as AuthContextModule
              }
              onClick={() => {
                const trackingEvent: ClickedArtworkGroup = {
                  action: ActionType.clickedArtworkGroup,
                  context_module: ContextModule.basedOnYourRecentSavesRail,
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
          </HomeArtworkItemImpression>
        ))
      }}
    />
  )
}

const FRAGMENT = graphql`
  fragment HomeBasedOnYourRecentSavesRail_me on Me {
    basedOnUserSaves(first: 10) {
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

export const HomeBasedOnYourRecentSavesRailQueryRenderer: React.FC<
  React.PropsWithChildren<HomeRailTrackingProps>
> = ({ railPositionY }) => {
  const { relayEnvironment, user } = useSystemContext()
  const isEnabled = useFlag("onyx-inspired_by_your_saves_on_web")

  // Gated before the query fires so the rollout does not add load to the
  // underlying recommendation search for users outside the rollout.
  if (!isEnabled || !user) {
    return null
  }

  return (
    <SystemQueryRenderer<HomeBasedOnYourRecentSavesRailQuery>
      placeholder={PLACEHOLDER}
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeBasedOnYourRecentSavesRailQuery {
          me {
            ...HomeBasedOnYourRecentSavesRail_me
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

        return (
          <HomeBasedOnYourRecentSavesRail
            me={props.me}
            railPositionY={railPositionY}
          />
        )
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title={BASED_ON_YOUR_RECENT_SAVES_TITLE}
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })
      }}
    />
  </Skeleton>
)
