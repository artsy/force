import { AuthContextModule } from "@artsy/cohesion"
import { Shelf, Spacer, Sup, Text } from "@artsy/palette"
import { graphql } from "lib/graphql"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { useTracking } from "react-tracking"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { useAnalyticsContext } from "v2/System"
import { trackHelpers } from "v2/Utils/cohesionHelpers"
import { extractNodes } from "v2/Utils/extractNodes"
import { StandoutLots_viewer } from "v2/__generated__/StandoutLots_viewer.graphql"
import { tabTypeToContextModuleMap } from "../../Utils/tabTypeToContextModuleMap"
import { CuratorialRailsZeroState } from "../CuratorialRailsZeroState/CuratorialRailsZeroState"

export interface StandoutLotsProps {
  viewer: StandoutLots_viewer
}

const StandoutLots: React.FC<StandoutLotsProps> = ({ viewer }) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()
  const contextModule = tabTypeToContextModuleMap.standoutLots as AuthContextModule

  const nodes = extractNodes(viewer.standoutLotsConnection)

  const liveSaleArtworks = nodes.filter(node => {
    return !node.sale?.isClosed
  })

  if (nodes.length === 0 || liveSaleArtworks.length === 0) {
    return <CuratorialRailsZeroState />
  }

  return (
    <>
      <Text as="h3" variant="lg" color="black100" mt={6}>
        Standout Lots <Sup color="brand">{liveSaleArtworks.length}</Sup>
      </Text>

      <Text as="h3" variant="lg" color="black60">
        Works that Artsy curators love
      </Text>

      <Spacer mb={4} />

      <Shelf>
        {liveSaleArtworks.map((node, index) => {
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
        })}
      </Shelf>
    </>
  )
}

export const StandoutLotsFragmentContainer = createFragmentContainer(
  StandoutLots,
  {
    viewer: graphql`
      fragment StandoutLots_viewer on Viewer {
        standoutLotsConnection: saleArtworksConnection(
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
