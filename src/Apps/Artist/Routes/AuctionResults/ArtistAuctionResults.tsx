import { ContextModule, Intent } from "@artsy/cohesion"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  Box,
  Column,
  Flex,
  GridColumns,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import { allowedAuctionResultFilters } from "Apps/Artist/Utils/allowedAuctionResultFilters"
import {
  paramsToCamelCase,
  updateUrl,
} from "Components/ArtworkFilter/Utils/urlBuilder"
import { useAuthDialog } from "Components/AuthDialog"
import { LoadingArea } from "Components/LoadingArea"
import { PaginationFragmentContainer as Pagination } from "Components/Pagination"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Jump, useJump } from "Utils/Hooks/useJump"
import { usePrevious } from "Utils/Hooks/usePrevious"
import { Media } from "Utils/Responsive"
import { extractNodes } from "Utils/extractNodes"
import createLogger from "Utils/logger"
import { ArtistAuctionResults_artist$data } from "__generated__/ArtistAuctionResults_artist.graphql"
import { isEqual } from "lodash"
import * as React from "react"
import { useContext, useState } from "react"
import { Title, Meta } from "react-head"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import useDeepCompareEffect from "use-deep-compare-effect"
import { ArtistAuctionResultItemFragmentContainer } from "./ArtistAuctionResultItem"
import {
  AuctionResultsFilterContextProvider,
  initialAuctionResultsFilterState,
  SharedAuctionResultsFilterContextProps,
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "./AuctionResultsFilterContext"
import { AuctionFilterMobileActionSheet } from "./Components/AuctionFilterMobileActionSheet"
import { AuctionFilters } from "./Components/AuctionFilters"
import { AuctionResultsControls } from "./Components/AuctionResultsControls"
import { MarketStatsQueryRenderer } from "./Components/MarketStats"
import { SortSelect } from "./Components/SortSelect"
import { TableSidebar } from "./Components/TableSidebar"
import { ArtistAuctionResultsEmptyState } from "./Components/ArtistAuctionResultsEmptyState"
import { ArtworkGridEmptyState } from "Components/ArtworkGrid/ArtworkGridEmptyState"
import { ArtistAuctionResultsRoute_artist$data } from "__generated__/ArtistAuctionResultsRoute_artist.graphql"
import { SystemContext } from "System/Contexts/SystemContext"

const logger = createLogger("ArtistAuctionResults.tsx")

const PAGE_SIZE = 50

interface AuctionResultsProps {
  relay: RelayRefetchProp
  artist: ArtistAuctionResults_artist$data
  aggregations?: NonNullable<
    ArtistAuctionResultsRoute_artist$data["sidebarAggregations"]
  >["aggregations"]
}

const AuctionResultsContainer: React.FC<AuctionResultsProps> = ({
  artist,
  relay,
  aggregations,
}) => {
  const { user } = useContext(SystemContext)

  const { filters, setFilter, resetFilters } = useAuctionResultsFilterContext()

  const selectedFilters = useCurrentlySelectedFiltersForAuctionResults()

  const { pageInfo } = artist.auctionResultsConnection ?? {}
  const { hasNextPage, endCursor } = pageInfo ?? {}

  const results = extractNodes(artist.auctionResultsConnection)
  const upcomingAuctionResults = results.filter(result => result.isUpcoming)
  const pastAuctionResults = results.filter(result => !result.isUpcoming)
  const upcomingAuctionResultsCount =
    artist.upcomingAuctionResults?.totalCount || 0
  const pastAuctionResultsCount = artist.pastAuctionResults?.totalCount || 0
  const showUpcomingAuctionResults = upcomingAuctionResultsCount > 0

  const { match } = useRouter()

  const { scrollToMarketSignals } = paramsToCamelCase(
    match?.location.query
  ) as { scrollToMarketSignals?: boolean }

  const { jumpTo } = useJump()

  const scrollToAuctionResultsTop = () => {
    jumpTo("artistAuctionResultsTop", { offset: 20 })
  }

  const scrollToMarketSignalsTop = () => {
    jumpTo("marketSignalsTop")
  }

  const loadNext = () => {
    const currentPageNumber = filters?.page ?? 0
    const nextPageNum = currentPageNumber + 1

    if (hasNextPage) {
      loadPage(endCursor, nextPageNum)
    }
  }

  const loadPage = (_cursor: string | null | undefined, pageNum: number) => {
    scrollToAuctionResultsTop()
    setFilter?.("page", pageNum)
  }

  const [isLoading, setIsLoading] = useState(false)
  const [showMobileActionSheet, toggleMobileActionSheet] = useState(false)
  const [authShownForFiltering, toggleAuthShowForFiltering] = useState(false)

  const tracking = useTracking()

  const lotsByCreatedYear = aggregations?.find(
    aggregation => aggregation?.slice === "LOTS_BY_CREATED_YEAR"
  )?.counts

  const startAt = lotsByCreatedYear?.[0]?.value || null
  const endAt = lotsByCreatedYear?.[lotsByCreatedYear.length - 1]?.value || null

  const auctionResultsFilterResetState = initialAuctionResultsFilterState({
    startDate: startAt ? parseInt(startAt) : null,
    endDate: endAt ? parseInt(endAt) : null,
  })

  // Is current filter state different from the default (reset) state?
  const filtersAtDefault = isEqual(
    selectedFilters,
    auctionResultsFilterResetState
  )

  const previousFilters = usePrevious(filters) ?? {}

  const { showAuthDialog } = useAuthDialog()

  // TODO: move this and artwork copy to util?
  useDeepCompareEffect(() => {
    Object.entries(filters ?? {}).forEach(([filterKey, currentFilter]) => {
      const previousFilter = previousFilters[filterKey]
      const filtersHaveUpdated = !isEqual(currentFilter, previousFilter)

      if (filtersHaveUpdated) {
        fetchResults()

        // If user is not logged-in, show auth modal, but only if it was never shown before.
        if (!user && !authShownForFiltering) {
          showAuthDialog({
            mode: "SignUp",
            options: {
              title: mode => {
                const action = mode === "SignUp" ? "Sign up" : "Log in"
                return `${action} to see auction results for ${artist.name}`
              },
            },
            analytics: {
              contextModule: ContextModule.auctionResults,
              intent: Intent.viewAuctionResults,
            },
          })

          // Remember to not show auth modal again for this activity.
          toggleAuthShowForFiltering(true)
        }

        tracking.trackEvent({
          action_type:
            DeprecatedAnalyticsSchema.ActionType
              .AuctionResultFilterParamChanged,
          changed: JSON.stringify({
            [filterKey]: filters?.[filterKey],
          }),
          context_page: DeprecatedAnalyticsSchema.PageName.ArtistAuctionResults,
          current: JSON.stringify(filters),
        })
      }
    })
  }, [filters])

  // TODO: move this and artwork copy to util? (pass loading state setter)
  function fetchResults() {
    setIsLoading(true)

    const relayParams = {
      page: filters?.page,
      artistID: artist.slug,
      artistInternalID: artist.internalID,
      before: null,
      first: PAGE_SIZE,
      size: PAGE_SIZE,
      last: null,
    }

    const relayRefetchVariables = {
      ...relayParams,
      ...filters,
      state: filters?.hideUpcoming ? "PAST" : "ALL",
    }

    relay.refetch(relayRefetchVariables, null, error => {
      if (error) {
        logger.error(error)
      }

      setIsLoading(false)
    })
  }

  const handleMarketStatsRendered = (visible: boolean) => {
    // Scroll to auction results if param flag is present
    if (!scrollToMarketSignals) return

    // Scroll to auction results if the market signals section is not visible
    setTimeout(
      visible ? scrollToMarketSignalsTop : scrollToAuctionResultsTop,
      0
    )
  }

  const { title, description } = artist.meta

  if (!artist.statuses?.auctionLots) {
    return (
      <>
        <Title>{title}</Title>
        <Meta name="title" content={title} />
        <Meta name="description" content={description} />

        <Spacer y={[2, 0]} />

        <ArtistAuctionResultsEmptyState />
      </>
    )
  }

  return (
    <>
      <Title>{title}</Title>
      <Meta name="title" content={title} />
      <Meta name="description" content={description} />

      <Jump id="marketSignalsTop" />

      <Spacer y={[2, 0]} />

      <MarketStatsQueryRenderer
        id={artist.internalID}
        onRendered={handleMarketStatsRendered}
      />

      <Spacer y={6} />

      <Jump id="artistAuctionResultsTop" />

      <Text variant={["sm-display", "lg-display"]}>Auction Results</Text>

      <Spacer y={4} />

      {showMobileActionSheet && (
        <AuctionFilterMobileActionSheet
          onClose={() => toggleMobileActionSheet(false)}
        >
          <AuctionFilters
            showUpcomingAuctionResults={showUpcomingAuctionResults}
          />
        </AuctionFilterMobileActionSheet>
      )}

      <Media greaterThan="xs">
        <GridColumns>
          <Column span={9}>
            <Text variant="xs">Filter by</Text>
          </Column>

          <Column span={3}>
            <SortSelect />
          </Column>
        </GridColumns>

        <Spacer y={2} />
      </Media>

      <GridColumns>
        <Column span={3}>
          <Media greaterThan="xs">
            <TableSidebar
              showUpcomingAuctionResults={showUpcomingAuctionResults}
            />
          </Media>
        </Column>

        <Column span={9} data-test={ContextModule.auctionResults}>
          <AuctionResultsControls
            toggleMobileActionSheet={toggleMobileActionSheet}
          />

          <Spacer y={[2, 0]} />

          {results.length === 0 && (
            <ArtworkGridEmptyState
              onClearFilters={() => {
                resetFilters?.()
              }}
            />
          )}

          <LoadingArea isLoading={isLoading}>
            <Flex flexDirection="column" gap={4}>
              {upcomingAuctionResults.length > 0 && (
                <Box>
                  <Text variant="md">Upcoming Auctions</Text>

                  <Text variant="xs" mb={2} color="black60">
                    {upcomingAuctionResultsCount}{" "}
                    {upcomingAuctionResultsCount === 1 ? "result" : "results"}
                  </Text>

                  <Join separator={<Spacer y={2} />}>
                    {upcomingAuctionResults.map((result, index) => {
                      return (
                        <ArtistAuctionResultItemFragmentContainer
                          key={index}
                          auctionResult={result}
                          filtersAtDefault={filtersAtDefault}
                        />
                      )
                    })}
                  </Join>
                </Box>
              )}

              {pastAuctionResults.length > 0 && (
                <Box>
                  <Text variant="md">Past Auctions</Text>

                  <Text variant="xs" mb={2} color="black60">
                    {pastAuctionResultsCount}{" "}
                    {pastAuctionResultsCount === 1 ? "result" : "results"}
                  </Text>

                  <Join separator={<Spacer y={2} />}>
                    {pastAuctionResults.map((result, index) => {
                      return (
                        <ArtistAuctionResultItemFragmentContainer
                          key={index}
                          auctionResult={result}
                          filtersAtDefault={filtersAtDefault}
                        />
                      )
                    })}
                  </Join>
                </Box>
              )}
            </Flex>
          </LoadingArea>

          <Pagination
            getHref={() => ""}
            hasNextPage={Boolean(pageInfo?.hasNextPage)}
            pageCursors={artist.auctionResultsConnection?.pageCursors}
            onClick={loadPage}
            onNext={loadNext}
          />
        </Column>
      </GridColumns>
    </>
  )
}

export const ArtistAuctionResultsRefetchContainer = createRefetchContainer(
  (props: AuctionResultsProps) => {
    const lotsByCreatedYear = props.aggregations?.find(
      aggregation => aggregation?.slice === "LOTS_BY_CREATED_YEAR"
    )?.counts

    const startAt = lotsByCreatedYear?.[0]?.value || null
    const endAt =
      lotsByCreatedYear?.[lotsByCreatedYear.length - 1]?.value || null

    const { match } = useRouter()
    const { userPreferences } = useSystemContext()
    const filters = paramsToCamelCase(match?.location.query)

    return (
      <AuctionResultsFilterContextProvider
        aggregations={
          props.aggregations as SharedAuctionResultsFilterContextProps["aggregations"]
        }
        earliestCreatedYear={startAt ? parseInt(startAt) : null}
        latestCreatedYear={endAt ? parseInt(endAt) : null}
        userPreferredMetric={userPreferences?.metric}
        filters={filters}
        onChange={filterState =>
          updateUrl(allowedAuctionResultFilters(filterState))
        }
      >
        <AuctionResultsContainer {...props} />
      </AuctionResultsFilterContextProvider>
    )
  },
  {
    artist: graphql`
      fragment ArtistAuctionResults_artist on Artist
        @argumentDefinitions(
          sort: { type: "AuctionResultSorts", defaultValue: DATE_DESC }
          first: { type: "Int", defaultValue: 50 }
          last: { type: "Int" }
          page: { type: "Int" }
          size: { type: "Int" }
          before: { type: "String" }
          organizations: { type: "[String]" }
          keyword: { type: "String" }
          priceRange: { type: "String" }
          currency: { type: "String" }
          includeEstimateRange: { type: "Boolean" }
          includeUnknownPrices: { type: "Boolean" }
          saleStartYear: { type: "Int" }
          saleEndYear: { type: "Int" }
          allowUnspecifiedSaleDates: { type: "Boolean" }
          categories: { type: "[String]" }
          sizes: { type: "[ArtworkSizes]" }
          createdAfterYear: { type: "Int" }
          createdBeforeYear: { type: "Int" }
          allowEmptyCreatedDates: { type: "Boolean" }
          state: { type: "AuctionResultsState", defaultValue: ALL }
        ) {
        slug
        internalID
        name
        meta(page: AUCTION_RESULTS) {
          description
          title
        }
        statuses {
          auctionLots
        }
        auctionResultsConnection(
          first: $first
          page: $page
          size: $size
          before: $before
          last: $last
          sort: $sort
          organizations: $organizations
          keyword: $keyword
          categories: $categories
          sizes: $sizes
          priceRange: $priceRange
          currency: $currency
          saleStartYear: $saleStartYear
          saleEndYear: $saleEndYear
          allowUnspecifiedSaleDates: $allowUnspecifiedSaleDates
          includeEstimateRange: $includeEstimateRange
          includeUnknownPrices: $includeUnknownPrices
          earliestCreatedYear: $createdAfterYear
          latestCreatedYear: $createdBeforeYear
          allowEmptyCreatedDates: $allowEmptyCreatedDates
          state: $state
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          totalCount
          edges {
            node {
              ...ArtistAuctionResultItem_auctionResult
              isUpcoming
            }
          }
        }
        pastAuctionResults: auctionResultsConnection(
          state: PAST
          organizations: $organizations
          keyword: $keyword
          categories: $categories
          sizes: $sizes
          priceRange: $priceRange
          currency: $currency
          saleStartYear: $saleStartYear
          saleEndYear: $saleEndYear
          allowUnspecifiedSaleDates: $allowUnspecifiedSaleDates
          includeEstimateRange: $includeEstimateRange
          includeUnknownPrices: $includeUnknownPrices
          earliestCreatedYear: $createdAfterYear
          latestCreatedYear: $createdBeforeYear
          allowEmptyCreatedDates: $allowEmptyCreatedDates
        ) {
          totalCount
        }
        upcomingAuctionResults: auctionResultsConnection(
          state: UPCOMING
          organizations: $organizations
          keyword: $keyword
          categories: $categories
          sizes: $sizes
          priceRange: $priceRange
          currency: $currency
          saleStartYear: $saleStartYear
          saleEndYear: $saleEndYear
          allowUnspecifiedSaleDates: $allowUnspecifiedSaleDates
          includeEstimateRange: $includeEstimateRange
          includeUnknownPrices: $includeUnknownPrices
          earliestCreatedYear: $createdAfterYear
          latestCreatedYear: $createdBeforeYear
          allowEmptyCreatedDates: $allowEmptyCreatedDates
        ) {
          totalCount
        }
      }
    `,
  },
  graphql`
    query ArtistAuctionResultsQuery(
      $first: Int
      $last: Int
      $page: Int
      $size: Int
      $before: String
      $sort: AuctionResultSorts
      $state: AuctionResultsState
      $artistID: String!
      $organizations: [String]
      $keyword: String
      $categories: [String]
      $sizes: [ArtworkSizes]
      $priceRange: String
      $currency: String
      $saleStartYear: Int
      $saleEndYear: Int
      $allowUnspecifiedSaleDates: Boolean
      $includeEstimateRange: Boolean
      $includeUnknownPrices: Boolean
      $createdBeforeYear: Int
      $createdAfterYear: Int
      $allowEmptyCreatedDates: Boolean
    ) {
      artist(id: $artistID) {
        ...ArtistAuctionResults_artist
          @arguments(
            first: $first
            last: $last
            page: $page
            size: $size
            before: $before
            sort: $sort
            state: $state
            organizations: $organizations
            keyword: $keyword
            categories: $categories
            sizes: $sizes
            priceRange: $priceRange
            currency: $currency
            saleStartYear: $saleStartYear
            saleEndYear: $saleEndYear
            allowUnspecifiedSaleDates: $allowUnspecifiedSaleDates
            includeEstimateRange: $includeEstimateRange
            includeUnknownPrices: $includeUnknownPrices
            createdAfterYear: $createdAfterYear
            createdBeforeYear: $createdBeforeYear
            allowEmptyCreatedDates: $allowEmptyCreatedDates
          )
      }
    }
  `
)
