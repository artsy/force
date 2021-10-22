import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay"
import { useAnalyticsContext } from "v2/System"
import { WorksByArtistsYouFollowRail_viewer } from "v2/__generated__/WorksByArtistsYouFollowRail_viewer.graphql"
import { useTracking } from "react-tracking"
import { AuthContextModule } from "@artsy/cohesion"
import { tabTypeToContextModuleMap } from "../Utils/tabTypeToContextModuleMap"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { extractNodes } from "v2/Utils/extractNodes"
import { trackHelpers } from "v2/Utils/cohesionHelpers"
import { CuratorialRailsZeroState } from "./CuritorialRailsTabBar"
import { Rail } from "v2/Components/Rail"

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
    <Rail
      title="Works for you"
      subTitle="Works at auction by artists you follow"
      getItems={() => {
        return nodes.map((node, index) => {
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
