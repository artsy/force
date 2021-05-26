import { graphql } from "react-relay"

// FIXME: Move this back into ./index.tsx once esmodules are enabled
export const CollectionAppQuery = graphql`
  query CollectionAppQuery(
    $input: FilterArtworksInput
    $slug: String!
    $aggregations: [ArtworkAggregation]
  ) {
    collection: marketingCollection(slug: $slug) @principalField {
      ...Collection_collection
        @arguments(input: $input, aggregations: $aggregations)
    }
  }
`
