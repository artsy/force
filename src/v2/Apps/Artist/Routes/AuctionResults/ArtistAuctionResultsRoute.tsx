import { ArtistAuctionResultsRoute_artist$data } from "v2/__generated__/ArtistAuctionResultsRoute_artist.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistAuctionResultsRefetchContainer } from "./ArtistAuctionResults"

export interface AuctionResultsRouteProps {
  artist: ArtistAuctionResultsRoute_artist$data
}

export const ArtistAuctionResultsRoute: React.FC<AuctionResultsRouteProps> = props => {
  return <ArtistAuctionResultsRefetchContainer artist={props.artist} />
}

export const AuctionResultsRouteFragmentContainer = createFragmentContainer(
  ArtistAuctionResultsRoute,
  {
    artist: graphql`
      fragment ArtistAuctionResultsRoute_artist on Artist
        @argumentDefinitions(
          organizations: { type: "[String]" }
          categories: { type: "[String]" }
          sizes: { type: "[ArtworkSizes]" }
          createdAfterYear: { type: "Int" }
          createdBeforeYear: { type: "Int" }
          allowEmptyCreatedDates: { type: "Boolean" }
        ) {
        ...ArtistAuctionResults_artist
          @arguments(
            organizations: $organizations
            categories: $categories
            sizes: $sizes
            createdAfterYear: $createdAfterYear
            createdBeforeYear: $createdBeforeYear
            allowEmptyCreatedDates: $allowEmptyCreatedDates
          )
      }
    `,
  }
)
