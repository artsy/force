import { graphql } from "react-relay"

// FIXME: Move this back into ./index.tsx once esmodules are enabled
// TODO: Add `@principalField` to below query
// when KAWS returns a 404 in `errors` for non-existent collections.
// Currently it doesn't send any errors so there isn't anything
// for Metaphysics to propagate.
export const CollectionAppQuery = graphql`
  query CollectionAppQuery(
    $input: FilterArtworksInput
    $slug: String!
    $aggregations: [ArtworkAggregation]
  ) {
    collection: marketingCollection(slug: $slug) {
      ...Collection_collection
        @arguments(input: $input, aggregations: $aggregations)
    }
  }
`
