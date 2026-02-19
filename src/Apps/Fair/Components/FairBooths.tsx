import { Flex, FullBleed, Join, Spacer, Text } from "@artsy/palette"
import { defaultSort, isValidSort } from "Apps/Fair/Utils/IsValidSort"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { LoadingArea } from "Components/LoadingArea"
import { PaginationFragmentContainer as Pagination } from "Components/Pagination"
import { Sticky } from "Components/Sticky"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Jump } from "Utils/Hooks/useJump"
import { usePrevious } from "Utils/Hooks/usePrevious"
import { Media } from "Utils/Responsive"
import { extractNodes } from "Utils/extractNodes"
import createLogger from "Utils/logger"
import type { FairBoothsContainerQuery } from "__generated__/FairBoothsContainerQuery.graphql"
import type { FairBooths_fair$data } from "__generated__/FairBooths_fair.graphql"
import { isEqual } from "es-toolkit"
import { useState } from "react"
import type * as React from "react"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"
import useDeepCompareEffect from "use-deep-compare-effect"
import {
  BoothFilterContextProvider,
  initialBoothFilterState,
  useBoothsFilterContext,
} from "./BoothFilterContext"
import { FairBoothRailFragmentContainer as FairBoothRail } from "./FairBoothRail"
import { FairBoothSortFilter } from "./FairBoothSortFilter"

const logger = createLogger("FairBooths.tsx")

const PAGE_SIZE = 15

interface FairBoothsProps {
  fair: FairBooths_fair$data
  relay: RelayRefetchProp
}

const FairBooths: React.FC<React.PropsWithChildren<FairBoothsProps>> = ({
  fair,
  relay,
}) => {
  const context = useBoothsFilterContext()

  const [isLoading, setIsLoading] = useState(false)

  const previousFilters = usePrevious(context.filters!)

  const shows = extractNodes(fair.exhibitors).filter(show => {
    // Skip rendering of booths without artworks
    return !((show.counts?.artworks ?? 0) === 0 || !show.partner)
  })

  useDeepCompareEffect(() => {
    const filtersHaveUpdated = Object.entries(context.filters!).some(
      ([filterKey, currentFilter]) => {
        const previousFilter = previousFilters[filterKey]
        return !isEqual(currentFilter, previousFilter)
      },
    )

    if (filtersHaveUpdated) {
      fetchResults()
    }
  }, [context.filters])

  const fetchResults = () => {
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

  const loadPage = (page: number) => {
    context.setFilter("page", page)
  }

  const loadNext = () => {
    if (fair.exhibitors?.pageInfo.hasNextPage) {
      loadPage(context?.filters?.page! + 1)
    }
  }

  if (shows.length === 0) {
    return null
  }

  return (
    <>
      <Jump id="BoothsFilter" />

      <Media at="xs">
        <Sticky>
          {({ stuck }) => {
            return (
              <FullBleed
                backgroundColor="mono0"
                py={1}
                px={2}
                {...(stuck
                  ? { borderBottom: "1px solid", borderColor: "mono10" }
                  : {})}
              >
                <Flex justifyContent="flex-end">
                  <FairBoothSortFilter />
                </Flex>
              </FullBleed>
            )
          }}
        </Sticky>
      </Media>

      <Media greaterThan="xs">
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Text variant="lg-display">Booths</Text>

          <FairBoothSortFilter />
        </Flex>
      </Media>

      <Spacer y={4} />

      <LoadingArea isLoading={isLoading}>
        <Join separator={<Spacer y={6} />}>
          {shows.map(show => {
            return <FairBoothRail key={show.id} show={show} />
          })}
        </Join>
      </LoadingArea>

      <Spacer y={4} />

      <Pagination
        hasNextPage={!!fair.exhibitors?.pageInfo.hasNextPage}
        pageCursors={fair.exhibitors?.pageCursors}
        onClick={(_cursor, page) => loadPage(page)}
        onNext={loadNext}
        scrollTo="BoothsFilter"
      />
    </>
  )
}

const FairBoothsWithContext: React.FC<
  React.PropsWithChildren<FairBoothsProps>
> = ({ ...props }) => {
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
        updateUrl(event, { defaultValues: initialBoothFilterState })
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
              counts {
                artworks
              }
              partner {
                ... on Partner {
                  id
                }
                ... on ExternalPartner {
                  id
                }
              }
              ...FairBoothRail_show
            }
          }
        }
      }
    `,
  },
  graphql`
    query FairBoothsQuery(
      $id: String!
      $first: Int
      $page: Int
      $sort: ShowSorts
    ) {
      fair(id: $id) {
        ...FairBooths_fair @arguments(first: $first, page: $page, sort: $sort)
      }
    }
  `,
)

export const FairBoothsQueryRenderer: React.FC<
  React.PropsWithChildren<{ slug: string }>
> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()
  const {
    match: { location },
  } = useRouter()

  const getVariables = () => {
    let { sort, page } = location.query
    if (!isValidSort(sort)) {
      sort = defaultSort
    }
    return { sort, page, slug }
  }

  return (
    <SystemQueryRenderer<FairBoothsContainerQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query FairBoothsContainerQuery(
          $slug: String!
          $page: Int
          $sort: ShowSorts
        ) {
          fair(id: $slug) @principalField {
            ...FairBooths_fair @arguments(sort: $sort, page: $page)
          }
        }
      `}
      variables={getVariables()}
      render={({ error, props }) => {
        if (error) {
          return null
        }

        if (props?.fair) {
          return <FairBoothsFragmentContainer fair={props.fair!} />
        }

        return null
      }}
    />
  )
}
