import { Col, Row, Flex, Text, Message } from "@artsy/palette"
import { ArtistAuctionResults_artist } from "v2/__generated__/ArtistAuctionResults_artist.graphql"
import { PaginationFragmentContainer as Pagination } from "v2/Components/Pagination"
import React, { useContext, useState } from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import useDeepCompareEffect from "use-deep-compare-effect"
import { ArtistAuctionResultItemFragmentContainer as AuctionResultItem } from "./ArtistAuctionResultItem"
import { TableSidebar } from "./Components/TableSidebar"
import { ContextModule, Intent } from "@artsy/cohesion"
import { Box, Spacer } from "@artsy/palette"
import { AnalyticsSchema, SystemContext } from "v2/System"
import { LoadingArea } from "v2/Components/LoadingArea"
import { isEqual } from "lodash"
import { useTracking } from "react-tracking"
import { usePrevious } from "v2/Utils/Hooks/usePrevious"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"
import {
  AuctionResultsFilterContextProvider,
  useAuctionResultsFilterContext,
} from "./AuctionResultsFilterContext"
import { AuctionFilterMobileActionSheet } from "./Components/AuctionFilterMobileActionSheet"
import { AuctionFilters } from "./Components/AuctionFilters"
import { AuctionResultsControls } from "./Components/AuctionResultsControls"
import { auctionResultsFilterResetState } from "./AuctionResultsFilterContext"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { ModalType } from "v2/Components/Authentication/Types"
import { Title } from "react-head"
import { SortSelect } from "./Components/SortSelect"
import { scrollIntoView } from "v2/Utils/scrollHelpers"

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
  const filterContext = useAuctionResultsFilterContext()
  // @ts-expect-error STRICT_NULL_CHECK
  const { pageInfo } = artist.auctionResultsConnection
  const { hasNextPage, endCursor } = pageInfo
  const artistName = artist.name

  const loadNext = () => {
    // @ts-expect-error STRICT_NULL_CHECK
    const nextPageNum = filterContext.filters.pageAndCursor.page + 1
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
    filterContext.setFilter("pageAndCursor", { cursor: cursor, page: pageNum })
  }

  const [isLoading, setIsLoading] = useState(false)
  const [showMobileActionSheet, toggleMobileActionSheet] = useState(false)
  const [authShownForFiltering, toggleAuthShowForFiltering] = useState(false)

  const tracking = useTracking()

  // Is current filter state different from the default (reset) state?
  const filtersAtDefault = isEqual(
    filterContext.filters,
    auctionResultsFilterResetState
  )

  const previousFilters = usePrevious(filterContext.filters)

  // TODO: move this and artwork copy to util?
  useDeepCompareEffect(() => {
    // @ts-expect-error STRICT_NULL_CHECK
    Object.entries(filterContext.filters).forEach(
      ([filterKey, currentFilter]) => {
        // @ts-expect-error STRICT_NULL_CHECK
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
              // @ts-expect-error STRICT_NULL_CHECK
              [filterKey]: filterContext.filters[filterKey],
            }),
            context_page: AnalyticsSchema.PageName.ArtistAuctionResults,
            current: JSON.stringify(filterContext.filters),
          })
        }
      }
    )
  }, [filterContext.filters])

  // TODO: move this and artwork copy to util? (pass loading state setter)
  function fetchResults() {
    setIsLoading(true)

    const relayParams = {
      // @ts-expect-error STRICT_NULL_CHECK
      after: filterContext.filters.pageAndCursor.cursor,
      artistID: artist.slug,
      before: null,
      first: PAGE_SIZE,
      last: null,
    }

    const relayRefetchVariables = {
      ...relayParams,
      ...filterContext.filters,
    }

    relay.refetch(relayRefetchVariables, null, error => {
      if (error) {
        logger.error(error)
      }

      setIsLoading(false)
    })
  }

  // @ts-expect-error STRICT_NULL_CHECK
  const auctionResultsLength = artist.auctionResultsConnection.edges.length

  const titleString = `${artist.name} - Auction Results on Artsy`

  return (
    <>
      <Title>{titleString}</Title>

      <Box id="scrollTo--artistAuctionResultsTop" />

      {showMobileActionSheet && (
        <AuctionFilterMobileActionSheet
          onClose={() => toggleMobileActionSheet(false)}
        >
          <AuctionFilters />
        </AuctionFilterMobileActionSheet>
      )}
      <Media greaterThan="xs">
        <Flex justifyContent="space-between" alignItems="flex-start" pb={4}>
          <Text variant="xs" textTransform="uppercase">
            Filter by
          </Text>
          <SortSelect />
        </Flex>
      </Media>
      <Row>
        <Col sm={3} pr={[0, 2]}>
          <Media greaterThan="xs">
            <TableSidebar />
          </Media>
        </Col>

        <Col sm={9} data-test={ContextModule.auctionResults}>
          <AuctionResultsControls
            artist={artist}
            toggleMobileActionSheet={toggleMobileActionSheet}
          />

          <Spacer mt={3} />

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
            hasNextPage={pageInfo.hasNextPage}
            // @ts-expect-error STRICT_NULL_CHECK
            pageCursors={artist.auctionResultsConnection.pageCursors}
            onClick={(_cursor, page) => loadPage(_cursor, page)}
            onNext={() => loadNext()}
            scrollTo="#jumpto-ArtistHeader"
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Box></Box>
        </Col>
      </Row>
    </>
  )
}

export const ArtistAuctionResultsRefetchContainer = createRefetchContainer(
  (props: AuctionResultsProps) => {
    const { startAt, endAt } =
      // @ts-expect-error STRICT_NULL_CHECK
      props.artist.auctionResultsConnection.createdYearRange ?? {}
    return (
      <AuctionResultsFilterContextProvider
        filters={{
          // @ts-expect-error STRICT_NULL_CHECK
          earliestCreatedYear: startAt,
          // @ts-expect-error STRICT_NULL_CHECK
          latestCreatedYear: endAt,
        }}
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
          categories: { type: "[String]" }
          sizes: { type: "[ArtworkSizes]" }
          createdAfterYear: { type: "Int" }
          createdBeforeYear: { type: "Int" }
          allowEmptyCreatedDates: { type: "Boolean" }
        ) {
        slug
        name
        auctionResultsConnection(
          first: $first
          after: $after
          before: $before
          last: $last
          sort: $sort
          organizations: $organizations
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
