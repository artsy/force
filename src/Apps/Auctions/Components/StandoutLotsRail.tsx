import { CuratorialRailsZeroState } from "Apps/Auctions/Components/CuritorialRailsTabBar"
import { tabTypeToContextModuleMap } from "Apps/Auctions/Utils/tabTypeToContextModuleMap"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { Rail } from "Components/Rail/Rail"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { trackHelpers } from "Utils/cohesionHelpers"
import { extractNodes } from "Utils/extractNodes"
import type { AuthContextModule } from "@artsy/cohesion"
import { Skeleton } from "@artsy/palette"
import type { StandoutLotsRail_viewer$data } from "__generated__/StandoutLotsRail_viewer.graphql"
import type { StandoutLotsRailQuery } from "__generated__/StandoutLotsRailQuery.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

export interface StandoutLotsRailProps {
  viewer: StandoutLotsRail_viewer$data
}

export const StandoutLotsRail: React.FC<
  React.PropsWithChildren<StandoutLotsRailProps>
> = ({ viewer }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()
  const contextModule =
    tabTypeToContextModuleMap.standoutLots as AuthContextModule
  const artworks = extractNodes(viewer.standoutLotsRailConnection)

  if (artworks.length === 0) {
    return <CuratorialRailsZeroState />
  } else {
    return (
      <Rail
        title="Curators’ Picks"
        subTitle="Works that Artsy curators love"
        getItems={() => {
          return artworks.map((artwork, index) => {
            return (
              <ShelfArtworkFragmentContainer
                artwork={artwork}
                key={artwork.slug}
                contextModule={contextModule}
                lazyLoad
                onClick={() => {
                  trackEvent(
                    trackHelpers.clickedArtworkGroup(
                      contextModule,
                      contextPageOwnerType,
                      artwork.internalID,
                      artwork.slug,
                      index,
                      artwork.collectorSignals?.auction?.bidCount,
                      artwork.collectorSignals?.auction?.lotWatcherCount
                    )
                  )
                }}
              />
            )
          })
        }}
      />
    )
  }
}

export const StandoutLotsRailFragmentContainer = createFragmentContainer(
  StandoutLotsRail,
  {
    viewer: graphql`
      fragment StandoutLotsRail_viewer on Viewer {
        standoutLotsRailConnection: artworksConnection(
          forSale: true
          first: 50
          geneIDs: ["our-top-auction-lots"]
        ) {
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
      }
    `,
  }
)

export const StandoutLotsRailQueryRenderer: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<StandoutLotsRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query StandoutLotsRailQuery {
          viewer {
            ...StandoutLotsRail_viewer
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
          return <StandoutLotsRailFragmentContainer viewer={props.viewer} />
        }

        return null
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      isLoading
      title="Some title"
      subTitle="Some subtitle"
      getItems={() => {
        return [...new Array(10)].map((_, i) => {
          return <ShelfArtworkPlaceholder key={i} index={i} />
        })
      }}
    />
  </Skeleton>
)
