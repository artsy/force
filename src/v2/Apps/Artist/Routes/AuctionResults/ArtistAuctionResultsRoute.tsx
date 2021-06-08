import { ArtistAuctionResultsRoute_artist } from "v2/__generated__/ArtistAuctionResultsRoute_artist.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistAuctionResultsRefetchContainer } from "./ArtistAuctionResults"

export interface AuctionResultsRouteProps {
  artist: ArtistAuctionResultsRoute_artist
}

export const ArtistAuctionResultsRoute: React.FC<AuctionResultsRouteProps> = props => {
  return <ArtistAuctionResultsRefetchContainer artist={props.artist} />
}

export const AuctionResultsRouteFragmentContainer = createFragmentContainer(
  ArtistAuctionResultsRoute,
  {
    artist: graphql`
      fragment ArtistAuctionResultsRoute_artist on Artist {
        ...ArtistAuctionResults_artist
      }
    `,
  }
)
