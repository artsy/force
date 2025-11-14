import { ArtistTabs } from "Apps/Artist/Components/ArtistTabs"
import { ArtistAuctionResultsEmptyState } from "Apps/Artist/Routes/AuctionResults/Components/ArtistAuctionResultsEmptyState"
import { MarketStatsQueryRenderer } from "Apps/Artist/Routes/AuctionResults/Components/MarketStats"
import { Jump } from "Utils/Hooks/useJump"
import { Spacer, Text } from "@artsy/palette"
import type { ArtistAuctionResultsRoute_artist$data } from "__generated__/ArtistAuctionResultsRoute_artist.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import {
  ArtistAuctionResultsRefetchContainer,
  useScrollToTopOfAuctionResults,
} from "./ArtistAuctionResults"

export interface AuctionResultsRouteProps {
  artist: ArtistAuctionResultsRoute_artist$data
}

export const ArtistAuctionResultsRoute: React.FC<
  React.PropsWithChildren<AuctionResultsRouteProps>
> = ({ artist }) => {
  const { handleScrollToTop } = useScrollToTopOfAuctionResults()

  const totalCount = artist.sidebarAggregations?.totalCount ?? 0

  return (
    <>
      <ArtistTabs slug={artist.slug} />

      <Spacer y={[2, 4]} />

      {totalCount === 0 ? (
        <>
          <ArtistAuctionResultsEmptyState />
        </>
      ) : (
        <>
          <Jump id="marketSignalsTop" />

          <MarketStatsQueryRenderer
            id={artist.internalID}
            onRendered={handleScrollToTop}
          />

          <Spacer y={6} />

          <Jump id="artistAuctionResultsTop" />

          <Text variant="lg-display" as="h2">
            Auction Results
          </Text>

          <Spacer y={1} />

          <ArtistAuctionResultsRefetchContainer
            artist={artist}
            aggregations={artist.sidebarAggregations?.aggregations}
          />
        </>
      )}
    </>
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
        internalID
        slug
        sidebarAggregations: auctionResultsConnection(
          aggregations: [
            SIMPLE_PRICE_HISTOGRAM
            CURRENCIES_COUNT
            LOTS_BY_SALE_YEAR
            LOTS_BY_CREATED_YEAR
          ]
        ) {
          totalCount
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
  },
)
