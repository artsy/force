import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtistAuctionResultsRouteProps {
  artist: any
}

const ArtistAuctionResultsRoute: React.FC<ArtistAuctionResultsRouteProps> = props => {
  return <></>
}

export const ArtistAuctionResultsRouteFragmentContainer = createFragmentContainer(
  ArtistAuctionResultsRoute,
  {
    artist: graphql`
      fragment ArtistAuctionResultsRoute_artist on Artist {
        id
      }
    `,
  }
)
