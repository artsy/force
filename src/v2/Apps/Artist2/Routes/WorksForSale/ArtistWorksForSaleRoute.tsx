import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Artist2ArtworkFilterRefetchContainer } from "./Components/Artist2ArtworkFilter"

interface ArtistWorksForSaleRouteProps {
  artist: any
}

const ArtistWorksForSaleRoute: React.FC<ArtistWorksForSaleRouteProps> = ({
  artist,
}) => {
  return (
    <>
      <Artist2ArtworkFilterRefetchContainer artist={artist} />
    </>
  )
}

export const ArtistWorksForSaleRouteFragmentContainer = createFragmentContainer(
  ArtistWorksForSaleRoute,
  {
    artist: graphql`
      fragment ArtistWorksForSaleRoute_artist on Artist
        @argumentDefinitions(
          aggregations: { type: "[ArtworkAggregation]" }
          input: { type: "FilterArtworksInput" }
          page: { type: "Int" }
          sort: { type: "String" }
        ) {
        ...Artist2ArtworkFilter_artist
          @arguments(
            aggregations: $aggregations
            input: $input
            page: $page
            sort: $sort
          )

        internalID
        slug
        id
      }
    `,
  }
)
