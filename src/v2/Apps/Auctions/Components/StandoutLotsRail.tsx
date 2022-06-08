import { AuthContextModule } from "@artsy/cohesion"
import { graphql } from "lib/graphql"
import * as React from "react"
import { createFragmentContainer } from "react-relay"
import { useTracking } from "react-tracking"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { Rail } from "v2/Components/Rail"
import { useAnalyticsContext } from "v2/System"
import { trackHelpers } from "v2/Utils/cohesionHelpers"
import { extractNodes } from "v2/Utils/extractNodes"
import { StandoutLotsRail_viewer } from "v2/__generated__/StandoutLotsRail_viewer.graphql"
import { tabTypeToContextModuleMap } from "../Utils/tabTypeToContextModuleMap"
import { CuratorialRailsZeroState } from "./CuritorialRailsTabBar"

export interface StandoutLotsRailProps {
  viewer: StandoutLotsRail_viewer
}

const StandoutLotsRail: React.FC<StandoutLotsRailProps> = ({ viewer }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()
  const contextModule = tabTypeToContextModuleMap.standoutLots as AuthContextModule
  const artworks = extractNodes(viewer.standoutLotsRailConnection)

  if (artworks.length === 0) {
    return <CuratorialRailsZeroState />
  } else {
    return (
      <Rail
        title="Current Highlights"
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
                      contextPageOwnerType!,
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
              ...ShelfArtwork_artwork @arguments(width: 325)
            }
          }
        }
      }
    `,
  }
)
