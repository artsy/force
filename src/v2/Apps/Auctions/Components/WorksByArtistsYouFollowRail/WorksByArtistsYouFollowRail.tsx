import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useAnalyticsContext } from "v2/System"
import { WorksByArtistsYouFollowRail_viewer } from "v2/__generated__/WorksByArtistsYouFollowRail_viewer.graphql"
import { useTracking } from "react-tracking"
import { AuthContextModule } from "@artsy/cohesion"
import { tabTypeToContextModuleMap } from "../../Utils/tabTypeToContextModuleMap"
import { Shelf, Spacer, Text, Sup } from "@artsy/palette"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { extractNodes } from "v2/Utils/extractNodes"
import { CuratorialRailsZeroState } from "../CuratorialRailsZeroState/CuratorialRailsZeroState"
import { trackHelpers } from "v2/Utils/cohesionHelpers"

export interface WorksByArtistsYouFollowRailProps {
  viewer: WorksByArtistsYouFollowRail_viewer
}

const WorksByArtistsYouFollowRail: React.FC<WorksByArtistsYouFollowRailProps> = ({
  viewer,
}) => {
  const { trackEvent } = useTracking()
  const { contextPageOwnerType } = useAnalyticsContext()
  const contextModule = tabTypeToContextModuleMap.worksByArtistsYouFollow as AuthContextModule

  const nodes = extractNodes(viewer.saleArtworksConnection)

  if (nodes.length === 0) {
    return <CuratorialRailsZeroState />
  }

  return (
    <>
      <Text as="h3" variant="lg" color="black100" mt={6}>
        Works for you{" "}
        <Sup color="brand">{viewer.saleArtworksConnection?.edges?.length}</Sup>
      </Text>

      <Text as="h3" variant="lg" color="black60">
        Works at auction by artists you follow
      </Text>

      <Spacer mt={4} />

      <Shelf>
        {nodes.map((node, index) => {
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

export const WorksByArtistsYouFollowRailFragmentContainer = createFragmentContainer(
  WorksByArtistsYouFollowRail,
  {
    viewer: graphql`
      fragment WorksByArtistsYouFollowRail_viewer on Viewer {
        saleArtworksConnection(
          includeArtworksByFollowedArtists: true
          isAuction: true
          liveSale: true
          first: 50
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
