import { graphql } from "react-relay"

export const ArtworkQueryFilter = graphql`
  query ArtworkQueryFilterQuery($input: FilterArtworksInput)
    @raw_response_type {
    viewer {
      ...ArtworkFilter_viewer @arguments(input: $input)
    }
  }
`
