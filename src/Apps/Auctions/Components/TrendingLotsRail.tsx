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
import type { TrendingLotsRail_viewer$data } from "__generated__/TrendingLotsRail_viewer.graphql"
import type { TrendingLotsRailQuery } from "__generated__/TrendingLotsRailQuery.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { CuratorialRailsZeroState } from "./CuritorialRailsTabBar"
export interface TrendingLotsRailProps {
  viewer: TrendingLotsRail_viewer$data
}

const TrendingLotsRail: React.FC<
  React.PropsWithChildren<TrendingLotsRailProps>
> = ({ viewer }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()
  const contextModule =
    tabTypeToContextModuleMap.trendingLots as AuthContextModule

  const nodes = extractNodes(viewer.trendingLotsConnection)
  const openLots = nodes.filter(node => !node.sale?.isClosed)

  if (openLots.length === 0) {
    return <CuratorialRailsZeroState />
  }

  return (
    <Rail
      title="Trending lots"
      subTitle="Works with the most bids today"
      getItems={() => {
        return openLots.map((node, index) => {
          return (
            <ShelfArtworkFragmentContainer
              artwork={node}
              key={node.slug}
              contextModule={contextModule}
              lazyLoad
              onClick={() => {
                trackEvent(
                  trackHelpers.clickedArtworkGroup(
                    contextModule,
                    contextPageOwnerType,
                    node.internalID,
                    node.slug,
                    index,
                    node.collectorSignals?.auction?.bidCount,
                    node.collectorSignals?.auction?.lotWatcherCount,
                  ),
                )
              }}
            />
          )
        })
      }}
    />
  )
}

export const TrendingLotsRailFragmentContainer = createFragmentContainer(
  TrendingLotsRail,
  {
    viewer: graphql`
      fragment TrendingLotsRail_viewer on Viewer {
        trendingLotsConnection: saleArtworksConnection(
          biddableSale: true
          first: 10
          sort: "-bidder_positions_count"
          estimateRange: "5_000_00-*"
        ) {
          edges {
            counts {
              bidderPositions
            }
            node {
              internalID
              slug
              sale {
                isClosed
              }
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
  },
)

export const TrendingLotsRailQueryRenderer: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<TrendingLotsRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query TrendingLotsRailQuery {
          viewer {
            ...TrendingLotsRail_viewer
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
          return <TrendingLotsRailFragmentContainer viewer={props.viewer} />
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
