import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Title } from "react-head"
import { ContextModule, Intent } from "@artsy/cohesion"
import {
  Column,
  GridColumns,
  Join,
  Message,
  Spacer,
  Text,
} from "@artsy/palette"
import { isEqual } from "lodash"
import { useContext, useState } from "react"
import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { useTracking } from "react-tracking"
import useDeepCompareEffect from "use-deep-compare-effect"
import {
  paramsToCamelCase,
  updateUrl,
} from "Components/ArtworkFilter/Utils/urlBuilder"
import { ModalType } from "Components/Authentication/Types"
import { LoadingArea } from "Components/LoadingArea"
import { PaginationFragmentContainer as Pagination } from "Components/Pagination"
import { SystemContext, useSystemContext } from "System"
import { useRouter } from "System/Router/useRouter"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { usePrevious } from "Utils/Hooks/usePrevious"
import createLogger from "Utils/logger"
import { openAuthModal } from "Utils/openAuthModal"
import { Media } from "Utils/Responsive"
import { ArtistAuctionResults_artist$data } from "__generated__/ArtistAuctionResults_artist.graphql"
import { allowedAuctionResultFilters } from "Apps/Artist/Utils/allowedAuctionResultFilters"
import { ArtistAuctionResultItemFragmentContainer } from "./ArtistAuctionResultItem"
import {
  AuctionResultsFilterContextProvider,
  initialAuctionResultsFilterState,
  useAuctionResultsFilterContext,
  useCurrentlySelectedFiltersForAuctionResults,
} from "./AuctionResultsFilterContext"
import { AuctionFilterMobileActionSheet } from "./Components/AuctionFilterMobileActionSheet"
import { AuctionFilters } from "./Components/AuctionFilters"
import { AuctionResultsControls } from "./Components/AuctionResultsControls"
import { KeywordFilter } from "./Components/KeywordFilter"
import { MarketStatsQueryRenderer } from "./Components/MarketStats"
import { SortSelect } from "./Components/SortSelect"
import { TableSidebar } from "./Components/TableSidebar"
import { extractNodes } from "Utils/extractNodes"
import { Jump, useJump } from "Utils/Hooks/useJump"

const logger = createLogger("ArtistAuctionResults.tsx")

const PAGE_SIZE = 10

interface AuctionResultsProps {
  relay: RelayRefetchProp
  artist: ArtistAuctionResults_artist$data
}

const AuctionResultsContainer: React.FC<AuctionResultsProps> = ({
  artist,
  relay,
}) => {
  const { user, mediator } = useContext(SystemContext)

  const { filters, setFilter } = useAuctionResultsFilterContext()

  const selectedFilters = useCurrentlySelectedFiltersForAuctionResults()

  const { pageInfo } = artist.auctionResultsConnection ?? {}
  const { hasNextPage, endCursor } = pageInfo ?? {}
  const artistName = artist.name

  const results = extractNodes(artist.auctionResultsConnection)

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
    const currentPageNumber = filters?.pageAndCursor?.page ?? 0
    const nextPageNum = currentPageNumber + 1
    if (hasNextPage) {
      loadPage(endCursor, nextPageNum)
    }
  }

  const loadPage = (cursor, pageNum) => {
    scrollToAuctionResultsTop()
    setFilter?.("pageAndCursor", {
      cursor: cursor,
      page: pageNum,
    })
  }

  const [isLoading, setIsLoading] = useState(false)
  const [showMobileActionSheet, toggleMobileActionSheet] = useState(false)
  const [authShownForFiltering, toggleAuthShowForFiltering] = useState(false)

  const tracking = useTracking()

  const { startAt, endAt } =
    artist.auctionResultsConnection?.createdYearRange ?? {}
  const auctionResultsFilterResetState = initialAuctionResultsFilterState({
    startDate: startAt,
    endDate: endAt,
  })

  // Is current filter state different from the default (reset) state?
  const filtersAtDefault = isEqual(
    selectedFilters,
    auctionResultsFilterResetState
  )

  const previousFilters = usePrevious(filters) ?? {}

  // TODO: move this and artwork copy to util?
  useDeepCompareEffect(() => {
    Object.entries(filters ?? {}).forEach(([filterKey, currentFilter]) => {
      const previousFilter = previousFilters[filterKey]
      const filtersHaveUpdated = !isEqual(currentFilter, previousFilter)

      if (filtersHaveUpdated) {
        fetchResults()

        // If user is not logged-in, show auth modal, but only if it was never shown before.
        if (!user && !authShownForFiltering && mediator) {
          openAuthModal(mediator, {
            contextModule: ContextModule.auctionResults,
            copy: `Sign up to see auction results for ${artistName}`,
            intent: Intent.viewAuctionResults,
            mode: ModalType.signup,
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
      after: filters?.pageAndCursor?.cursor,
      artistID: artist.slug,
      artistInternalID: artist.internalID,
      before: null,
      first: PAGE_SIZE,
      last: null,
    }

    const relayRefetchVariables = {
      ...relayParams,
      ...filters,
    }

    relay.refetch(relayRefetchVariables, null, error => {
      if (error) {
        logger.error(error)
      }

      setIsLoading(false)
    })
  }

  const titleString = `${artistName} - Auction Results on Artsy`

  const handleMarketStatsRendered = (visible: boolean) => {
    // Scroll to auction results if param flag is present
    if (!scrollToMarketSignals) return

    // Scroll to auction results if the market signals section is not visible
    setTimeout(
      visible ? scrollToMarketSignalsTop : scrollToAuctionResultsTop,
      0
    )
  }

  return (
    <>
      <Title>{titleString}</Title>

      <Jump id="marketSignalsTop" />

      <MarketStatsQueryRenderer
        artistInternalID={artist.internalID}
        environment={relay.environment}
        onRendered={handleMarketStatsRendered}
      />

      <Jump id="artistAuctionResultsTop" />

      <Text variant={["sm-display", "lg-display"]}>Auction Results</Text>

      <Spacer y={2} />

      {showMobileActionSheet && (
        <AuctionFilterMobileActionSheet
          onClose={() => toggleMobileActionSheet(false)}
        >
          <AuctionFilters />
        </AuctionFilterMobileActionSheet>
      )}

      <Media greaterThan="xs">
        <GridColumns>
          <Column span={3}>
            <Text variant="xs">Filter by</Text>
          </Column>

          <Column span={6}>
            <KeywordFilter />
          </Column>

          <Column span={3}>
            <SortSelect />
          </Column>
        </GridColumns>

        <Spacer y={4} />
      </Media>

      <GridColumns>
        <Column span={3}>
          <Media greaterThan="xs">
            <TableSidebar />
          </Media>
        </Column>

        <Column span={9} data-test={ContextModule.auctionResults}>
          <AuctionResultsControls
            toggleMobileActionSheet={toggleMobileActionSheet}
          />

          <Spacer y={[2, 0]} />

          {results.length > 0 ? (
            <LoadingArea isLoading={isLoading}>
              <Join separator={<Spacer y={2} />}>
                {results.map((result, index) => {
                  return (
                    <ArtistAuctionResultItemFragmentContainer
                      key={index}
                      auctionResult={result}
                      filtersAtDefault={filtersAtDefault}
                    />
                  )
                })}
              </Join>
            </LoadingArea>
          ) : (
            <Message>
              There aren’t any auction results available by the artist at this
              time.
            </Message>
          )}

          <Pagination
            getHref={() => ""}
            hasNextPage={Boolean(pageInfo?.hasNextPage)}
            pageCursors={artist.auctionResultsConnection?.pageCursors}
            onClick={(_cursor, page) => loadPage(_cursor, page)}
            onNext={() => loadNext()}
          />
        </Column>
      </GridColumns>
    </>
  )
}

export const ArtistAuctionResultsRefetchContainer = createRefetchContainer(
  (props: AuctionResultsProps) => {
    const { startAt, endAt } =
      props.artist.auctionResultsConnection?.createdYearRange ?? {}

    const { match } = useRouter()
    const { userPreferences } = useSystemContext()
    const filters = paramsToCamelCase(match?.location.query)

    return (
      <AuctionResultsFilterContextProvider
        earliestCreatedYear={startAt}
        latestCreatedYear={endAt}
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
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          organizations: { type: "[String]" }
          keyword: { type: "String" }
          categories: { type: "[String]" }
          sizes: { type: "[ArtworkSizes]" }
          createdAfterYear: { type: "Int" }
          createdBeforeYear: { type: "Int" }
          allowEmptyCreatedDates: { type: "Boolean" }
        ) {
        slug
        internalID
        name
        auctionResultsConnection(
          first: $first
          after: $after
          before: $before
          last: $last
          sort: $sort
          organizations: $organizations
          keyword: $keyword
          categories: $categories
          sizes: $sizes
          earliestCreatedYear: $createdAfterYear
          latestCreatedYear: $createdBeforeYear
          allowEmptyCreatedDates: $allowEmptyCreatedDates
        ) {
          createdYearRange {
            startAt
            endAt
          }
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
            }
          }
        }
      }
    `,
  },
  graphql`
    query ArtistAuctionResultsQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $sort: AuctionResultSorts
      $artistID: String!
      $organizations: [String]
      $keyword: String
      $categories: [String]
      $sizes: [ArtworkSizes]
      $createdBeforeYear: Int
      $createdAfterYear: Int
      $allowEmptyCreatedDates: Boolean
    ) {
      artist(id: $artistID) {
        ...ArtistAuctionResults_artist
          @arguments(
            first: $first
            last: $last
            after: $after
            before: $before
            sort: $sort
            organizations: $organizations
            keyword: $keyword
            categories: $categories
            sizes: $sizes
            createdAfterYear: $createdAfterYear
            createdBeforeYear: $createdBeforeYear
            allowEmptyCreatedDates: $allowEmptyCreatedDates
          )
      }
    }
  `
)
