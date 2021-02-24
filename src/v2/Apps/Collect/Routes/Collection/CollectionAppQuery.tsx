import { graphql } from "react-relay"

// FIXME: Move this back into ./index.tsx once esmodules are enabled
// TODO: Add `@principalField` to below query
// when KAWS returns a 404 in `errors` for non-existent collections.
// Currently it doesn't send any errors so there isn't anything
// for Metaphysics to propagate.
export const CollectionAppQuery = graphql`
  query CollectionAppQuery(
    $acquireable: Boolean
    $aggregations: [ArtworkAggregation]
    $atAuction: Boolean
    $attributionClass: [String]
    $colors: [String]
    $forSale: Boolean
    $additionalGeneIDs: [String]
    $height: String
    $inquireableOnly: Boolean
    $majorPeriods: [String]
    $medium: String
    $offerable: Boolean
    $page: Int
    $priceRange: String
    $sizes: [ArtworkSizes]
    $sort: String
    $slug: String!
    $width: String
    $locationCities: [String]
    $artistNationalities: [String]
  ) {
    collection: marketingCollection(slug: $slug) {
      ...Collection_collection
        @arguments(
          acquireable: $acquireable
          aggregations: $aggregations
          atAuction: $atAuction
          attributionClass: $attributionClass
          colors: $colors
          forSale: $forSale
          additionalGeneIDs: $additionalGeneIDs
          height: $height
          inquireableOnly: $inquireableOnly
          majorPeriods: $majorPeriods
          medium: $medium
          offerable: $offerable
          page: $page
          priceRange: $priceRange
          sizes: $sizes
          sort: $sort
          width: $width
          first: 30
          locationCities: $locationCities
          artistNationalities: $artistNationalities
        )
    }
  }
`
