import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworksRoute_viewer$data } from "__generated__/ArtworksRoute_viewer.graphql"

interface ArtworksRouteProps {
  viewer: ArtworksRoute_viewer$data
}

const ArtworksRoute: React.FC<ArtworksRouteProps> = () => {
  return <>Artworks route</>
}

export const ArtworksRouteFragmentContainer = createFragmentContainer(
  ArtworksRoute,
  {
    viewer: graphql`
      fragment ArtworksRoute_viewer on Viewer {
        salesConnection(
          first: 10
          live: true
          published: true
          sort: TIMELY_AT_NAME_ASC
          auctionState: OPEN
        ) {
          totalCount
          edges {
            node {
              slug
              name
              href
              liveStartAt
              isLiveOpen
              ...AuctionArtworksRail_sale
            }
          }
        }
      }
    `,
  }
)
