import React, { useState } from "react"
import { graphql, createRefetchContainer, RelayRefetchProp } from "react-relay"
import useDeepCompareEffect from "use-deep-compare-effect"
import { isEqual } from "lodash"
import { Match } from "found"
import { Box } from "@artsy/palette"
import { FairExhibitors_fair } from "v2/__generated__/FairExhibitors_fair.graphql"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import {
  ExhibitorFilterContextProvider,
  useExhibitorsFilterContext,
} from "./ExhibitorFilterContext"
import { FairExhibitorsQuery } from "./FairExhibitorsQuery"
import { FairExhibitorRailFragmentContainer as FairExhibitorRail } from "../Components/FairExhibitorRail"
import { LoadingArea } from "v2/Components/LoadingArea"
import { FairExhibitorSortFilter } from "../Components/FairExhibitorSortFilter"
import { usePrevious } from "v2/Utils/Hooks/usePrevious"
import createLogger from "v2/Utils/logger"

const logger = createLogger("FairExhibitors.tsx")

const PAGE_SIZE = 5

interface FairExhibitorsProps {
  fair: FairExhibitors_fair
  match: Match
  relay: RelayRefetchProp
}

const FairExhibitors: React.FC<FairExhibitorsProps> = ({ fair, relay }) => {
  const context = useExhibitorsFilterContext()

  const [isLoading, setIsLoading] = useState(false)

  const previousFilters = usePrevious(context.filters)

  useDeepCompareEffect(() => {
    Object.entries(context.filters).forEach(([filterKey, currentFilter]) => {
      const previousFilter = previousFilters[filterKey]
      const filtersHaveUpdated = !isEqual(currentFilter, previousFilter)

      if (filtersHaveUpdated) {
        fetchResults()
      }
    })
  }, [context.filters])

  function fetchResults() {
    setIsLoading(true)

    const relayParams = {
      id: fair.slug,
      first: PAGE_SIZE,
      after: "",
      sort: context.filters.sort,
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

  return (
    <LoadingArea isLoading={isLoading}>
      <FairExhibitorSortFilter />

      {fair.exhibitors?.edges!.map((edge, index) => {
        const show = edge?.node!
        if (show?.counts?.artworks === 0 || !show?.partner) {
          // Skip rendering of booths without artworks
          return null
        }

        return (
          <Box my={6} key={index}>
            <FairExhibitorRail key={show.id} show={show as any} />
          </Box>
        )
      })}
    </LoadingArea>
  )
}

const FairExhibitorsWithContext: React.FC<any> = ({
  match: { location },
  ...props
}) => {
  return (
    <ExhibitorFilterContextProvider
      filters={location.query}
      sortOptions={[
        { text: "Relevance", value: "FEATURED_DESC" },
        { text: "Alphabetical (A-Z)", value: "NAME_ASC" },
      ]}
      onChange={updateUrl}
    >
      <FairExhibitors {...props} />
    </ExhibitorFilterContextProvider>
  )
}

export const FairExhibitorsFragmentContainer = createRefetchContainer(
  FairExhibitorsWithContext,
  {
    fair: graphql`
      fragment FairExhibitors_fair on Fair
        @argumentDefinitions(
          sort: { type: "ShowSorts", defaultValue: FEATURED_DESC }
          first: { type: "Int", defaultValue: 5 }
          after: { type: "String" }
        ) {
        slug
        exhibitors: showsConnection(
          sort: $sort
          first: $first
          after: $after
          totalCount: true
        ) {
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
              ...FairExhibitorRail_show
            }
          }
        }
      }
    `,
  },
  FairExhibitorsQuery
)
