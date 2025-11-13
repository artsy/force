import { ArtistAuctionResultsActiveFilters } from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultsActiveFilters"
import {
  ArtistAuctionResultsFilterNav,
  ArtistAuctionResultsFilterNavPlaceholder,
} from "Apps/Artist/Routes/AuctionResults/ArtistAuctionResultsFilterNav"
import { ArtistAuctionResultsExpandableSort } from "Apps/Artist/Routes/AuctionResults/Components/ArtistAuctionResultsExpandableSort"
import { initialAuctionResultsFilterState } from "Apps/Artist/Routes/AuctionResults/initialAuctionResultsFilterState"
import { allowedAuctionResultFilters } from "Apps/Artist/Utils/allowedAuctionResultFilters"
import { paramsToCamelCase } from "Components/ArtworkFilter/Utils/paramsCasing"
import { updateUrlWithNamespace } from "Components/ArtworkFilter/Utils/urlBuilder"
import { ArtworkGridEmptyState } from "Components/ArtworkGrid/ArtworkGridEmptyState"
import { useAuthDialog } from "Components/AuthDialog"
import { LoadingArea } from "Components/LoadingArea"
import { PaginatedMetaTags } from "Components/PaginatedMetaTags"
import { PaginationFragmentContainer as Pagination } from "Components/Pagination"
import { TruncateComponent } from "Components/TruncateComponent"
import { SystemContext } from "System/Contexts/SystemContext"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { useJump } from "Utils/Hooks/useJump"
import { usePrevious } from "Utils/Hooks/usePrevious"
import { useSectionReady } from "Utils/Hooks/useSectionReadiness"
import createLogger from "Utils/logger"
import { ContextModule, Intent } from "@artsy/cohesion"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Box, Flex, Skeleton, Spacer, Stack, Text } from "@artsy/palette"
import type { ArtistAuctionResults_artist$data } from "__generated__/ArtistAuctionResults_artist.graphql"
import type { ArtistAuctionResultsQueryRendererQuery } from "__generated__/ArtistAuctionResultsQueryRendererQuery.graphql"
import type { ArtistAuctionResultsRoute_artist$data } from "__generated__/ArtistAuctionResultsRoute_artist.graphql"
import { isEqual } from "lodash"
import type * as React from "react"
import { useContext, useRef, useState } from "react"
import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp,
} from "react-relay"
import { useTracking } from "react-tracking"
import useDeepCompareEffect from "use-deep-compare-effect"
import {
  ArtistAuctionResultItemFragmentContainer,
  ArtistAuctionResultItemPlaceholder,
} from "./ArtistAuctionResultItem"
import {
  AuctionResultsFilterContextProvider,
  type SharedAuctionResultsFilterContextProps,
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "./AuctionResultsFilterContext"
import { ArtistAuctionResultsEmptyState } from "./Components/ArtistAuctionResultsEmptyState"
import { AuctionFilterMobileActionSheet } from "./Components/AuctionFilterMobileActionSheet"
import { AuctionFilters } from "./Components/AuctionFilters"

const logger = createLogger("ArtistAuctionResults.tsx")

const PAGE_SIZE = 50

interface AuctionResultsProps {
  relay: RelayRefetchProp
  artist: ArtistAuctionResults_artist$data
  aggregations?: NonNullable<
    ArtistAuctionResultsRoute_artist$data["sidebarAggregations"]
  >["aggregations"]
  truncate?: boolean
}

const AuctionResultsContainer: React.FC<
  React.PropsWithChildren<AuctionResultsProps>
> = ({ artist, relay, aggregations, truncate = false }) => {
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

  const { jumpTo } = useJump()

  const scrollToAuctionResultsTop = () => {
    jumpTo("artistAuctionResultsTop", { offset: 20 })
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

  const [mode, setMode] = useState<
    "Idle" | "Loading" | "MobileActionSheet" | "Drawer"
  >("Idle")

  const hasShownAuthDialog = useRef(false)

  const tracking = useTracking()

  const lotsByCreatedYear = aggregations?.find(
    aggregation => aggregation?.slice === "LOTS_BY_CREATED_YEAR"
  )?.counts

  const startAt = lotsByCreatedYear?.[0]?.value || null
  const endAt = lotsByCreatedYear?.[lotsByCreatedYear.length - 1]?.value || null

  const auctionResultsFilterResetState = initialAuctionResultsFilterState({
    startDate: startAt ? Number.parseInt(startAt, 10) : null,
    endDate: endAt ? Number.parseInt(endAt, 10) : null,
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
        if (!user && !hasShownAuthDialog.current) {
          showAuthDialog({
            options: {
              title: `Sign up or log in to see auction results for ${artist.name}`,
            },
            analytics: {
              contextModule: ContextModule.auctionResults,
              intent: Intent.viewAuctionResults,
            },
          })

          // Remember to not show auth modal again for this activity.
          hasShownAuthDialog.current = true
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
    setMode("Loading")

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

      setMode("Idle")
    })
  }

  const { title, description } = artist.meta

  if (!artist.statuses?.auctionLots) {
    return (
      <>
        <PaginatedMetaTags title={title} description={description} />

        <Spacer y={[2, 0]} />

        <ArtistAuctionResultsEmptyState />
      </>
    )
  }

  return (
    <>
      <PaginatedMetaTags title={title} description={description} />

      {mode === "MobileActionSheet" && (
        <AuctionFilterMobileActionSheet onClose={() => setMode("Idle")}>
          <Stack gap={4}>
            <ArtistAuctionResultsExpandableSort />

            <Box>
              <AuctionFilters
                showUpcomingAuctionResults={showUpcomingAuctionResults}
              />
            </Box>
          </Stack>
        </AuctionFilterMobileActionSheet>
      )}

      <ArtistAuctionResultsFilterNav
        showUpcomingAuctionResults={showUpcomingAuctionResults}
        onMobileFilterClick={() => setMode("MobileActionSheet")}
      >
        <Spacer y={2} />

        <ArtistAuctionResultsActiveFilters />

        <Spacer y={[2, 4]} />

        {results.length === 0 ? (
          <ArtworkGridEmptyState
            onClearFilters={() => {
              resetFilters?.()
            }}
          />
        ) : (
          <TruncateComponent enabled={truncate && results.length > 7}>
            <LoadingArea isLoading={mode === "Loading"}>
              <Flex flexDirection="column" gap={4}>
                {upcomingAuctionResults.length > 0 && (
                  <Box>
                    <Text variant="md">Upcoming Auctions</Text>

                    <Text variant="xs" mb={2} color="mono60">
                      {upcomingAuctionResultsCount}{" "}
                      {upcomingAuctionResultsCount === 1 ? "result" : "results"}
                    </Text>

                    <Stack gap={2}>
                      {upcomingAuctionResults.map((result, index) => {
                        return (
                          <ArtistAuctionResultItemFragmentContainer
                            key={index}
                            auctionResult={result}
                            filtersAtDefault={filtersAtDefault}
                          />
                        )
                      })}
                    </Stack>
                  </Box>
                )}

                {pastAuctionResults.length > 0 && (
                  <Box>
                    <Text variant="md">Past Auctions</Text>

                    <Text variant="xs" mb={2} color="mono60">
                      {pastAuctionResultsCount}{" "}
                      {pastAuctionResultsCount === 1 ? "result" : "results"}
                    </Text>

                    <Stack gap={2}>
                      {pastAuctionResults.map((result, index) => {
                        return (
                          <ArtistAuctionResultItemFragmentContainer
                            key={index}
                            auctionResult={result}
                            filtersAtDefault={filtersAtDefault}
                          />
                        )
                      })}
                    </Stack>
                  </Box>
                )}
              </Flex>
            </LoadingArea>

            <Pagination
              hasNextPage={Boolean(pageInfo?.hasNextPage)}
              pageCursors={artist.auctionResultsConnection?.pageCursors}
              onClick={loadPage}
              onNext={loadNext}
            />
          </TruncateComponent>
        )}
      </ArtistAuctionResultsFilterNav>
    </>
  )
}

export const ArtistAuctionResultsPlaceholder: React.FC<
  React.PropsWithChildren<{
    truncate?: boolean
  }>
> = ({ truncate }) => {
  return (
    <Skeleton>
      <ArtistAuctionResultsFilterNavPlaceholder>
        <Spacer y={[2, 4]} />

        <TruncateComponent enabled={truncate} disabled>
          <Stack gap={2}>
            {Array.from({ length: 10 }).map((_, index) => (
              <ArtistAuctionResultItemPlaceholder
                key={index}
                showArtistName={false}
              />
            ))}
          </Stack>
        </TruncateComponent>
      </ArtistAuctionResultsFilterNavPlaceholder>
    </Skeleton>
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
    const filters = paramsToCamelCase(
      // Expect auction results params to be nested under `auction`
      (match?.location.query?.auction as any) ?? {}
    )

    return (
      <AuctionResultsFilterContextProvider
        aggregations={
          props.aggregations as SharedAuctionResultsFilterContextProps["aggregations"]
        }
        earliestCreatedYear={startAt ? Number.parseInt(startAt, 10) : null}
        latestCreatedYear={endAt ? Number.parseInt(endAt, 10) : null}
        userPreferredMetric={userPreferences?.metric}
        filters={filters}
        onChange={filterState =>
          updateUrlWithNamespace(allowedAuctionResultFilters(filterState), {
            namespace: "auction",
          })
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
    ) @cacheable {
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

type ArtistAuctionResultsQueryRendererProps = {
  id: string
  lazyLoad?: boolean
  truncate?: boolean
  onReady?: () => void
}

export const ArtistAuctionResultsQueryRenderer: React.FC<
  ArtistAuctionResultsQueryRendererProps
> = ({ id, lazyLoad, truncate = false, onReady }) => {
  const { match } = useRouter()
  const { handleReady } = useSectionReady({ onReady })

  const urlFilterState = paramsToCamelCase(
    // Expect auction results params to be nested under `auction`
    // Default to empty object if not present (legacy URLs will be redirected).
    (match?.location.query?.auction as any) ?? {}
  )
  const initialInput = {
    ...initialAuctionResultsFilterState({}),
    ...allowedAuctionResultFilters(urlFilterState),
  }

  return (
    <SystemQueryRenderer<ArtistAuctionResultsQueryRendererQuery>
      lazyLoad={lazyLoad}
      placeholder={<ArtistAuctionResultsPlaceholder truncate={truncate} />}
      query={graphql`
        query ArtistAuctionResultsQueryRendererQuery(
          $page: Int
          $state: AuctionResultsState
          $artistID: String!
          $organizations: [String]
          $categories: [String]
          $sizes: [ArtworkSizes]
          $priceRange: String
          $currency: String
          $includeEstimateRange: Boolean
          $includeUnknownPrices: Boolean
          $createdAfterYear: Int
          $createdBeforeYear: Int
          $allowEmptyCreatedDates: Boolean
          $saleStartYear: Int
          $saleEndYear: Int
          $allowUnspecifiedSaleDates: Boolean
        ) @cacheable {
          artist(id: $artistID) {
            ...ArtistAuctionResults_artist
              @arguments(
                page: $page
                state: $state
                organizations: $organizations
                categories: $categories
                sizes: $sizes
                priceRange: $priceRange
                currency: $currency
                includeEstimateRange: $includeEstimateRange
                includeUnknownPrices: $includeUnknownPrices
                createdAfterYear: $createdAfterYear
                createdBeforeYear: $createdBeforeYear
                allowEmptyCreatedDates: $allowEmptyCreatedDates
                saleStartYear: $saleStartYear
                saleEndYear: $saleEndYear
                allowUnspecifiedSaleDates: $allowUnspecifiedSaleDates
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
        }
      `}
      variables={{
        artistID: id,
        page: initialInput.page,
        state: initialInput.hideUpcoming ? "PAST" : "ALL",
        organizations: initialInput.organizations,
        categories: initialInput.categories,
        sizes: initialInput.sizes,
        priceRange: initialInput.priceRange,
        currency: initialInput.currency,
        includeEstimateRange: initialInput.includeEstimateRange,
        includeUnknownPrices: initialInput.includeUnknownPrices,
        createdAfterYear: initialInput.createdAfterYear,
        createdBeforeYear: initialInput.createdBeforeYear,
        allowEmptyCreatedDates: initialInput.allowEmptyCreatedDates,
        saleStartYear: initialInput.saleStartYear,
        saleEndYear: initialInput.saleEndYear,
        allowUnspecifiedSaleDates: initialInput.allowUnspecifiedSaleDates,
      }}
      render={({ error, props }) => {
        if (error) {
          console.error(
            "[ArtistAuctionResults]: Error loading auction results",
            error
          )
          return null
        }

        if (!props || !props.artist) {
          return null
        }

        handleReady()

        const { artist } = props

        return (
          <ArtistAuctionResultsRefetchContainer
            artist={artist}
            aggregations={artist.sidebarAggregations?.aggregations}
            truncate={truncate}
          />
        )
      }}
    />
  )
}

export const useScrollToTopOfAuctionResults = () => {
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

  const handleScrollToTop = (visible: boolean) => {
    // Scroll to auction results if param flag is present
    if (!scrollToMarketSignals) return

    // Scroll to auction results if the market signals section is not visible
    requestAnimationFrame(
      visible ? scrollToMarketSignalsTop : scrollToAuctionResultsTop
    )
  }

  return { handleScrollToTop }
}
