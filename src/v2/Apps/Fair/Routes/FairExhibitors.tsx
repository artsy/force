import React, { useState } from "react"
import { useTracking } from "react-tracking"
import {
  graphql,
  createPaginationContainer,
  RelayPaginationProp,
} from "react-relay"
import useDeepCompareEffect from "use-deep-compare-effect"
import { isEqual } from "lodash"
import { Box, Button, Column, Flex, GridColumns, Spacer } from "@artsy/palette"
import { ActionType, ClickedShowMore, ContextModule } from "@artsy/cohesion"
import { FairExhibitors_fair } from "v2/__generated__/FairExhibitors_fair.graphql"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import {
  ExhibitorFilterContextProvider,
  useExhibitorsFilterContext,
} from "./ExhibitorFilterContext"
import { FairExhibitorsQuery } from "./FairExhibitorsQuery"
import { LoadingArea } from "v2/Components/LoadingArea"
import { Sticky } from "v2/Components/Sticky"
import { useRouter } from "v2/System/Router/useRouter"
import { Media } from "v2/Utils/Responsive"
import { usePrevious } from "v2/Utils/Hooks/usePrevious"
import createLogger from "v2/Utils/logger"
import { FairExhibitorRailFragmentContainer as FairExhibitorRail } from "../Components/FairExhibitorRail"
import { FairExhibitorSortFilter } from "../Components/FairExhibitorSortFilter"

const logger = createLogger("FairExhibitors.tsx")

const PAGE_SIZE = 15

interface FairExhibitorsProps {
  fair: FairExhibitors_fair
  relay: RelayPaginationProp
}

const FairExhibitors: React.FC<FairExhibitorsProps> = ({ fair, relay }) => {
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const clickShowMoreTrackingData: ClickedShowMore = {
    action: ActionType.clickedShowMore,
    context_module: ContextModule.exhibitorsTab,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    context_page_owner_type: contextPageOwnerType!,
    subject: "Show More",
  }

  const context = useExhibitorsFilterContext()

  const [isGridLoading, setIsGridLoading] = useState(false)
  const [isButtonLoading, setIsButtonLoading] = useState(false)

  const previousFilters = usePrevious(context.filters!)

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
    setIsGridLoading(true)

    relay.refetchConnection(
      PAGE_SIZE,
      err => {
        setIsGridLoading(false)
        if (err) {
          logger.error(err)
        }
      },
      {
        first: PAGE_SIZE,
        ...context.filters,
      }
    )
  }

  const handleClick = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    tracking.trackEvent(clickShowMoreTrackingData)

    setIsButtonLoading(true)

    const previousScrollY = window.scrollY

    relay.loadMore(PAGE_SIZE, err => {
      setIsButtonLoading(false)

      if (window.scrollY > previousScrollY) {
        window.scrollTo({
          behavior: "auto",
          top: previousScrollY,
        })
      }

      if (err) {
        logger.error(err)
      }
    })
  }

  return (
    <>
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
                <FairExhibitorSortFilter />
              </Flex>
            )
          }}
        </Sticky>
      </Media>

      <Media greaterThan="xs">
        <Flex justifyContent="flex-end">
          <FairExhibitorSortFilter />
        </Flex>
      </Media>

      <Spacer mt={4} />

      <LoadingArea isLoading={isGridLoading}>
        {fair.exhibitors?.edges!.map((edge, index) => {
          const show = edge?.node!
          if (show?.counts?.artworks === 0 || !show?.partner) {
            // Skip rendering of booths without artworks
            return null
          }

          return (
            <Box my={6} key={index}>
              <FairExhibitorRail key={show.id} show={show} />
            </Box>
          )
        })}
      </LoadingArea>

      <Spacer mt={4} />

      <GridColumns>
        <Column span={6} start={4}>
          <Button
            width="100%"
            variant="secondaryGray"
            onClick={handleClick}
            loading={isButtonLoading}
            disabled={!relay.hasMore()}
          >
            Show more
          </Button>
        </Column>
      </GridColumns>
    </>
  )
}

const FairExhibitorsWithContext: React.FC<FairExhibitorsProps> = ({
  ...props
}) => {
  const {
    match: { location },
  } = useRouter()
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

export const FairExhibitorsFragmentContainer = createPaginationContainer(
  FairExhibitorsWithContext,
  {
    fair: graphql`
      fragment FairExhibitors_fair on Fair
        @argumentDefinitions(
          sort: { type: "ShowSorts", defaultValue: FEATURED_DESC }
          first: { type: "Int", defaultValue: 15 }
          after: { type: "String" }
        ) {
        slug
        exhibitors: showsConnection(
          sort: $sort
          first: $first
          after: $after
          totalCount: true
        ) @connection(key: "FairExhibitorsQuery_exhibitors") {
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
  {
    direction: "forward",
    getVariables({ fair: { slug: id } }, { cursor: after }, { first, sort }) {
      return { after, first, sort, id }
    },
    query: FairExhibitorsQuery,
  }
)
