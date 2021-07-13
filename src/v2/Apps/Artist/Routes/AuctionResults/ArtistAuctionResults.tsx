import React, { useContext, useState } from "react"
import {
  Box,
  Column,
  Flex,
  GridColumns,
  Message,
  Spacer,
  Text,
} from "@artsy/palette"
import { isEqual } from "lodash"
import { Title } from "react-head"
import { useTracking } from "react-tracking"
import useDeepCompareEffect from "use-deep-compare-effect"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { ContextModule, Intent } from "@artsy/cohesion"
import { ModalType } from "v2/Components/Authentication/Types"
import { LoadingArea } from "v2/Components/LoadingArea"
import { PaginationFragmentContainer as Pagination } from "v2/Components/Pagination"
import { AnalyticsSchema, SystemContext } from "v2/System"
import { usePrevious } from "v2/Utils/Hooks/usePrevious"
import createLogger from "v2/Utils/logger"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { Media } from "v2/Utils/Responsive"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { ArtistAuctionResults_artist } from "v2/__generated__/ArtistAuctionResults_artist.graphql"
import { ArtistAuctionResultItemFragmentContainer as AuctionResultItem } from "./ArtistAuctionResultItem"
import {
  AuctionResultsFilterContextProvider,
  initialAuctionResultsFilterState,
  useAuctionResultsFilterContext,
} from "./AuctionResultsFilterContext"
import { AuctionFilterMobileActionSheet } from "./Components/AuctionFilterMobileActionSheet"
import { AuctionFilters } from "./Components/AuctionFilters"
import { KeywordFilter } from "./Components/KeywordFilter"
import { AuctionResultsControls } from "./Components/AuctionResultsControls"
import { MarketStatsQueryRenderer } from "./Components/MarketStats"
import { SortSelect } from "./Components/SortSelect"
import { TableSidebar } from "./Components/TableSidebar"

const logger = createLogger("ArtistAuctionResults.tsx")

const PAGE_SIZE = 10

interface AuctionResultsProps {
  relay: RelayRefetchProp
  artist: ArtistAuctionResults_artist
}

const AuctionResultsContainer: React.FC<AuctionResultsProps> = ({
  artist,
  relay,
}) => {
  const { user, mediator } = useContext(SystemContext)
  const {
    filters,
    setFilter,
    currentlySelectedFilters,
  } = useAuctionResultsFilterContext()
  const { pageInfo } = artist.auctionResultsConnection ?? {}
  const { hasNextPage, endCursor } = pageInfo ?? {}
  const artistName = artist.name

  const loadNext = () => {
    const currentPageNumber = filters?.pageAndCursor?.page ?? 0
    const nextPageNum = currentPageNumber + 1
    if (hasNextPage) {
      loadPage(endCursor, nextPageNum)
    }
  }

  const loadPage = (cursor, pageNum) => {
    scrollIntoView({
      selector: "#scrollTo--artistAuctionResultsTop",
      behavior: "smooth",
      offset: 150,
    })
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
  const auctionResultsFilterResetState = initialAuctionResultsFilterState(
    endAt,
    startAt
  )

  // Is current filter state different from the default (reset) state?
  const filtersAtDefault = isEqual(
    currentlySelectedFilters?.(),
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
        if (!user && !authShownForFiltering) {
          // @ts-expect-error STRICT_NULL_CHECK
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
            AnalyticsSchema.ActionType.AuctionResultFilterParamChanged,
          changed: JSON.stringify({
            [filterKey]: filters?.[filterKey],
          }),
          context_page: AnalyticsSchema.PageName.ArtistAuctionResults,
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

  const auctionResultsLength =
    artist.auctionResultsConnection?.edges?.length ?? 0

  const titleString = `${artist.name} - Auction Results on Artsy`

  return (
    <>
      <Title>{titleString}</Title>

      <Box id="scrollTo--artistAuctionResultsTop" />

      <MarketStatsQueryRenderer
        artistInternalID={artist.internalID}
        environment={relay.environment}
      />

      {showMobileActionSheet && (
        <AuctionFilterMobileActionSheet
          onClose={() => toggleMobileActionSheet(false)}
        >
          <AuctionFilters />
        </AuctionFilterMobileActionSheet>
      )}
      <Media greaterThan="xs">
        <GridColumns>
          <Column span={3} pr={[0, 2]}>
            <Text variant="xs" textTransform="uppercase">
              Filter by
            </Text>
          </Column>
          <Column span={9}>
            <Flex justifyContent="space-between" alignItems="flex-start" pb={4}>
              <Flex flex={1} pr={1} style={{ flexFlow: "column" }}>
                <KeywordFilter />
              </Flex>
              <Flex>
                <SortSelect />
              </Flex>
            </Flex>
          </Column>
        </GridColumns>
      </Media>
      <GridColumns>
        <Column span={3} pr={[0, 2]}>
          <Media greaterThan="xs">
            <TableSidebar />
          </Media>
        </Column>

        <Column span={9} data-test={ContextModule.auctionResults}>
          <AuctionResultsControls
            artist={artist}
            toggleMobileActionSheet={toggleMobileActionSheet}
          />

          <Spacer mt={[2, 0]} />

          {auctionResultsLength > 0 ? (
            <LoadingArea isLoading={isLoading}>
              {/* @ts-expect-error STRICT_NULL_CHECK */}
              {artist.auctionResultsConnection.edges.map(({ node }, index) => {
                return (
                  <React.Fragment key={index}>
                    <AuctionResultItem
                      index={index}
                      auctionResult={node}
                      lastChild={index === auctionResultsLength - 1}
                      filtersAtDefault={filtersAtDefault}
                    />
                  </React.Fragment>
                )
              })}
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
            // @ts-expect-error STRICT_NULL_CHECK
            pageCursors={artist.auctionResultsConnection.pageCursors}
            onClick={(_cursor, page) => loadPage(_cursor, page)}
            onNext={() => loadNext()}
            scrollTo="#jumpto-ArtistHeader"
          />
        </Column>
      </GridColumns>

      <GridColumns>
        <Column>
          <Box></Box>
        </Column>
      </GridColumns>
    </>
  )
}

export const ArtistAuctionResultsRefetchContainer = createRefetchContainer(
  (props: AuctionResultsProps) => {
    const { startAt, endAt } =
      props.artist.auctionResultsConnection?.createdYearRange ?? {}

    return (
      <AuctionResultsFilterContextProvider
        earliestCreatedYear={startAt}
        latestCreatedYear={endAt}
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
          ...ArtistAuctionResultsCount_results
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
              title
              dimension_text: dimensionText
              images {
                thumbnail {
                  url
                }
              }
              description
              date_text: dateText
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
