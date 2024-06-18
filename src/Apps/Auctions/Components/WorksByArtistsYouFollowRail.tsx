import { createFragmentContainer, graphql } from "react-relay"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { WorksByArtistsYouFollowRail_viewer$data } from "__generated__/WorksByArtistsYouFollowRail_viewer.graphql"
import { useTracking } from "react-tracking"
import { AuthContextModule } from "@artsy/cohesion"
import { tabTypeToContextModuleMap } from "Apps/Auctions/Utils/tabTypeToContextModuleMap"
import { ShelfArtworkFragmentContainer } from "Components/Artwork/ShelfArtwork"
import { extractNodes } from "Utils/extractNodes"
import { trackHelpers } from "Utils/cohesionHelpers"
import { CuratorialRailsZeroState } from "./CuritorialRailsTabBar"
import { Rail } from "Components/Rail/Rail"

export interface WorksByArtistsYouFollowRailProps {
  viewer: WorksByArtistsYouFollowRail_viewer$data
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
      title="Auction Lots for You Ending Soon"
      viewAllLabel="View all"
      viewAllHref="/auctions/lots-for-you-ending-soon"
      getItems={() => {
        return nodes.map((node, index) => {
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
          totalCount
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
