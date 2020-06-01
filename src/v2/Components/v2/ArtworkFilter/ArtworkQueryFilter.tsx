import { graphql } from "react-relay"

export const ArtworkQueryFilter = graphql`
  query ArtworkQueryFilterQuery(
    $acquireable: Boolean
    $aggregations: [ArtworkAggregation] = [TOTAL]
    $artistID: String
    $atAuction: Boolean
    $attributionClass: [String]
    $color: String
    $forSale: Boolean
    $height: String
    $inquireableOnly: Boolean
    $majorPeriods: [String]
    $medium: String
    $offerable: Boolean
    $page: Int
    $partnerID: ID
    $priceRange: String
    $sizes: [ArtworkSizes]
    $sort: String
    $keyword: String
    $width: String
  ) @raw_response_type {
    viewer {
      ...ArtworkFilter_viewer
        @arguments(
          acquireable: $acquireable
          aggregations: $aggregations
          artistID: $artistID
          atAuction: $atAuction
          attributionClass: $attributionClass
          color: $color
          forSale: $forSale
          height: $height
          inquireableOnly: $inquireableOnly
          keyword: $keyword
          majorPeriods: $majorPeriods
          medium: $medium
          offerable: $offerable
          page: $page
          partnerID: $partnerID
          priceRange: $priceRange
          sizes: $sizes
          sort: $sort
          width: $width
        )
    }
  }
`
