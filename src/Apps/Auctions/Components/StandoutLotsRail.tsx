import { AuthContextModule } from "@artsy/cohesion"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { Rail } from "Components/Rail/Rail"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { trackHelpers } from "Utils/cohesionHelpers"
import { extractNodes } from "Utils/extractNodes"
import { StandoutLotsRailQuery } from "__generated__/StandoutLotsRailQuery.graphql"
import { StandoutLotsRail_viewer$data } from "__generated__/StandoutLotsRail_viewer.graphql"
import { tabTypeToContextModuleMap } from "Apps/Auctions/Utils/tabTypeToContextModuleMap"
import { CuratorialRailsZeroState } from "Apps/Auctions/Components/CuritorialRailsTabBar"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Skeleton } from "@artsy/palette"

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
                      index
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
