import { Artist2AuctionResultsRoute_artist } from "v2/__generated__/Artist2AuctionResultsRoute_artist.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Artist2AuctionResultsRefetchContainer } from "./Artist2AuctionResults"

export interface AuctionResultsRouteProps {
  artist: Artist2AuctionResultsRoute_artist
}

export const Artist2AuctionResultsRoute: React.FC<AuctionResultsRouteProps> = props => {
  return <Artist2AuctionResultsRefetchContainer artist={props.artist} />
}

export const AuctionResultsRouteFragmentContainer = createFragmentContainer(
  Artist2AuctionResultsRoute,
  {
    artist: graphql`
      fragment Artist2AuctionResultsRoute_artist on Artist {
        ...Artist2AuctionResults_artist
      }
    `,
  }
)
