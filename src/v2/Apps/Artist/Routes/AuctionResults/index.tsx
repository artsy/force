import { AuctionResults_artist } from "v2/__generated__/AuctionResults_artist.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistAuctionResultsRefetchContainer as AuctionResults } from "./ArtistAuctionResults"

export interface AuctionResultsRouteProps {
  artist: AuctionResults_artist
}

export const AuctionResultsRoute = (props: AuctionResultsRouteProps) => {
  return <AuctionResults artist={props.artist} />
}

export const AuctionResultsRouteFragmentContainer = createFragmentContainer(
  AuctionResultsRoute,
  {
    artist: graphql`
      fragment AuctionResults_artist on Artist {
        ...ArtistAuctionResults_artist
      }
    `,
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default AuctionResultsRouteFragmentContainer
