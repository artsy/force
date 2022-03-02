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

  const nodes = extractNodes(viewer.StandoutLotsRailConnection)

  const liveSaleArtworks = nodes.filter(node => {
    return !node.sale?.isClosed
  })

  if (nodes.length === 0 || liveSaleArtworks.length === 0) {
    return <CuratorialRailsZeroState />
  }

  return (
    <Rail
      title="Current Highlights"
      subTitle="Works that Artsy curators love"
      getItems={() => {
        return liveSaleArtworks.map((node, index) => {
          return (
            <ShelfArtworkFragmentContainer
              artwork={node}
              key={node.slug}
              contextModule={contextModule}
              hidePartnerName
              lazyLoad
              onClick={() => {
                trackEvent(
                  trackHelpers.clickedArtworkGroup(
                    contextModule,
                    contextPageOwnerType!,
                    node.internalID,
                    node.slug,
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

export const StandoutLotsRailFragmentContainer = createFragmentContainer(
  StandoutLotsRail,
  {
    viewer: graphql`
      fragment StandoutLotsRail_viewer on Viewer {
        StandoutLotsRailConnection: saleArtworksConnection(
          first: 50
          geneIDs: "highlights-at-auction"
        ) {
          edges {
            node {
              internalID
              slug
              ...ShelfArtwork_artwork @arguments(width: 325)
              sale {
                isClosed
              }
            }
          }
        }
      }
    `,
  }
)
