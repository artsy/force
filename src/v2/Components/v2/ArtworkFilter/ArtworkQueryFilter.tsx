import { graphql } from "react-relay"

export const ArtworkQueryFilter = graphql`
  query ArtworkQueryFilterQuery(
    $acquireable: Boolean
    $aggregations: [ArtworkAggregation] = [TOTAL]
    $artistID: String
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
    $partnerID: ID
    $partnerIDs: [String]
    $priceRange: String
    $sizes: [ArtworkSizes]
    $sort: String
    $keyword: String
    $width: String
    $locationCities: [String]
  ) @raw_response_type {
    viewer {
      ...ArtworkFilter_viewer
        @arguments(
          acquireable: $acquireable
          aggregations: $aggregations
          artistID: $artistID
          atAuction: $atAuction
          attributionClass: $attributionClass
          colors: $colors
          forSale: $forSale
          additionalGeneIDs: $additionalGeneIDs
          height: $height
          inquireableOnly: $inquireableOnly
          keyword: $keyword
          majorPeriods: $majorPeriods
          medium: $medium
          offerable: $offerable
          page: $page
          partnerID: $partnerID
          partnerIDs: $partnerIDs
          priceRange: $priceRange
          sizes: $sizes
          sort: $sort
          width: $width
          locationCities: $locationCities
        )
    }
  }
`
