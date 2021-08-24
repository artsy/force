import React, { useState } from "react"
import { graphql, createRefetchContainer, RelayRefetchProp } from "react-relay"
import useDeepCompareEffect from "use-deep-compare-effect"
import { isEqual } from "lodash"
import { Box, Flex, Spacer } from "@artsy/palette"
import { FairBooths_fair } from "v2/__generated__/FairBooths_fair.graphql"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import {
  BoothFilterContextProvider,
  useBoothsFilterContext,
} from "../Components/BoothFilterContext"
import { FairBoothsQuery } from "./FairBoothsQuery"
import { LoadingArea } from "v2/Components/LoadingArea"
import { Sticky } from "v2/Components/Sticky"
import { useRouter } from "v2/System/Router/useRouter"
import { Media } from "v2/Utils/Responsive"
import { usePrevious } from "v2/Utils/Hooks/usePrevious"
import createLogger from "v2/Utils/logger"
import { FairBoothRailFragmentContainer as FairBoothRail } from "../Components/FairBoothRail"
import { FairBoothSortFilter } from "../Components/FairBoothSortFilter"
import { PaginationFragmentContainer as Pagination } from "v2/Components/Pagination"

const logger = createLogger("FairBooths.tsx")

const PAGE_SIZE = 15

interface FairBoothsProps {
  fair: FairBooths_fair
  relay: RelayRefetchProp
}

const FairBooths: React.FC<FairBoothsProps> = ({ fair, relay }) => {
  const context = useBoothsFilterContext()

  const [isLoading, setIsLoading] = useState(false)

  const previousFilters = usePrevious(context.filters!)

  const {
    pageInfo: { hasNextPage },
    pageCursors,
  } = fair.exhibitors!

  useDeepCompareEffect(() => {
    const filtersHaveUpdated = Object.entries(context.filters!).some(
      ([filterKey, currentFilter]) => {
        const previousFilter = previousFilters[filterKey]
        return !isEqual(currentFilter, previousFilter)
      }
    )

    if (filtersHaveUpdated) {
      fetchResults()
    }
  }, [context.filters])

  function fetchResults() {
    setIsLoading(true)

    const relayParams = {
      id: fair.slug,
      first: PAGE_SIZE,
    }

    const relayRefetchVariables = {
      ...relayParams,
      ...context.filters,
    }

    relay.refetch(relayRefetchVariables, null, error => {
      if (error) {
        logger.error(error)
      }

      setIsLoading(false)
    })
  }

  function loadPage(page) {
    context.setFilter("page", page)
  }

  function loadNext() {
    if (fair.exhibitors?.pageInfo.hasNextPage) {
      loadPage(context?.filters?.page! + 1)
    }
  }

  return (
    <>
      <Box id="jump--BoothsFilter" />

      <Media at="xs">
        <Sticky>
          {({ stuck }) => {
            return (
              <Flex
                justifyContent="flex-end"
                py={1}
                {...(stuck
                  ? {
                      px: 2,
                      borderBottom: "1px solid",
                      borderColor: "black10",
                    }
                  : {})}
              >
                <FairBoothSortFilter />
              </Flex>
            )
          }}
        </Sticky>
      </Media>

      <Media greaterThan="xs">
        <Flex justifyContent="flex-end">
          <FairBoothSortFilter />
        </Flex>
      </Media>

      <Spacer mt={4} />

      <LoadingArea isLoading={isLoading}>
        {fair.exhibitors?.edges!.map((edge, index) => {
          const show = edge?.node!
          if (!show.isDisplayable) {
            // Skip rendering of booths without artworks
            return null
          }

          return (
            <Box my={6} key={index}>
              <FairBoothRail key={show.id} show={show} />
            </Box>
          )
        })}
      </LoadingArea>

      <Spacer mt={4} />

      <Pagination
        hasNextPage={hasNextPage}
        pageCursors={pageCursors}
        onClick={(_cursor, page) => loadPage(page)}
        onNext={() => loadNext()}
        scrollTo="#jump--BoothsFilter"
      />
    </>
  )
}

const FairBoothsWithContext: React.FC<FairBoothsProps> = ({ ...props }) => {
  const {
    match: { location },
  } = useRouter()
  return (
    <BoothFilterContextProvider
      filters={location.query}
      sortOptions={[
        { text: "Relevance", value: "FEATURED_DESC" },
        { text: "Alphabetical (A-Z)", value: "NAME_ASC" },
      ]}
      onChange={event =>
        updateUrl(event, { defaultValues: { sort: "FEATURED_DESC" } })
      }
    >
      <FairBooths {...props} />
    </BoothFilterContextProvider>
  )
}

export const FairBoothsFragmentContainer = createRefetchContainer(
  FairBoothsWithContext,
  {
    fair: graphql`
      fragment FairBooths_fair on Fair
        @argumentDefinitions(
          sort: { type: "ShowSorts", defaultValue: FEATURED_DESC }
          first: { type: "Int", defaultValue: 15 }
          page: { type: "Int", defaultValue: 1 }
        ) {
        slug
        exhibitors: showsConnection(
          sort: $sort
          first: $first
          page: $page
          totalCount: true
        ) {
          pageInfo {
            hasNextPage
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            node {
              id
              isDisplayable
              ...FairBoothRail_show
            }
          }
        }
      }
    `,
  },
  FairBoothsQuery
)
