import { ArtistAuctionResultsRoute_artist$data } from "__generated__/ArtistAuctionResultsRoute_artist.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistAuctionResultsRefetchContainer } from "./ArtistAuctionResults"

export interface AuctionResultsRouteProps {
  artist: ArtistAuctionResultsRoute_artist$data
}

export const ArtistAuctionResultsRoute: React.FC<AuctionResultsRouteProps> = props => {
  return (
    <ArtistAuctionResultsRefetchContainer
      artist={props.artist}
      aggregations={props.artist.sidebarAggregations?.aggregations}
    />
  )
}

export const AuctionResultsRouteFragmentContainer = createFragmentContainer(
  ArtistAuctionResultsRoute,
  {
    artist: graphql`
      fragment ArtistAuctionResultsRoute_artist on Artist
        @argumentDefinitions(
          page: { type: "Int" }
          state: { type: "AuctionResultsState", defaultValue: ALL }
          organizations: { type: "[String]" }
          categories: { type: "[String]" }
          sizes: { type: "[ArtworkSizes]" }
          priceRange: { type: "String" }
          currency: { type: "String" }
          saleEndYear: { type: "Int" }
          saleStartYear: { type: "Int" }
          allowUnspecifiedSaleDates: { type: "Boolean" }
          includeEstimateRange: { type: "Boolean" }
          includeUnknownPrices: { type: "Boolean" }
          createdAfterYear: { type: "Int" }
          createdBeforeYear: { type: "Int" }
          allowEmptyCreatedDates: { type: "Boolean" }
        ) {
        ...ArtistAuctionResults_artist
          @arguments(
            page: $page
            state: $state
            organizations: $organizations
            categories: $categories
            sizes: $sizes
            priceRange: $priceRange
            currency: $currency
            saleEndYear: $saleEndYear
            saleStartYear: $saleStartYear
            allowUnspecifiedSaleDates: $allowUnspecifiedSaleDates
            includeEstimateRange: $includeEstimateRange
            includeUnknownPrices: $includeUnknownPrices
            createdAfterYear: $createdAfterYear
            createdBeforeYear: $createdBeforeYear
            allowEmptyCreatedDates: $allowEmptyCreatedDates
          )
        sidebarAggregations: auctionResultsConnection(
          aggregations: [
            SIMPLE_PRICE_HISTOGRAM
            CURRENCIES_COUNT
            LOTS_BY_SALE_YEAR
            LOTS_BY_CREATED_YEAR
          ]
        ) {
          aggregations {
            slice
            counts {
              name
              value
              count
            }
          }
        }
      }
    `,
  }
)
