import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { AuctionsRoute_viewer$data } from "__generated__/AuctionsRoute_viewer.graphql"

interface AuctionsRouteProps {
  viewer: AuctionsRoute_viewer$data
}

const AuctionsRoute: React.FC<AuctionsRouteProps> = () => {
  return <>Auctions route</>
}

export const AuctionsRouteFragmentContainer = createFragmentContainer(
  AuctionsRoute,
  {
    viewer: graphql`
      fragment AuctionsRoute_viewer on Viewer {
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
            }
          }
        }
      }
    `,
  }
)
