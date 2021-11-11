import { Box } from "@artsy/palette"
import { useState } from "react"
import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { PaginationFragmentContainer } from "v2/Components/Pagination"
import { LoadingArea } from "v2/Components/LoadingArea"
import { ShowEventsFragmentContainer } from "v2/Apps/Partner/Components/PartnerShows/ShowEvents"
import { useSystemContext } from "v2/System"
import { useRouter } from "v2/System/Router/useRouter"
import { ShowPaginatedEventsRendererQuery } from "v2/__generated__/ShowPaginatedEventsRendererQuery.graphql"
import { ShowPaginatedEvents_partner } from "v2/__generated__/ShowPaginatedEvents_partner.graphql"
import { EventStatus } from "v2/__generated__/ShowPaginatedEventsRendererQuery.graphql"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

interface ShowEventsProps {
  relay: RelayRefetchProp
  partner: ShowPaginatedEvents_partner
  scrollTo: string
  eventTitle: string
  offset: number
  paramsPage: number
}

const ShowPaginatedEvents: React.FC<ShowEventsProps> = ({
  eventTitle,
  relay,
  partner,
  scrollTo,
  offset,
  paramsPage,
}): JSX.Element => {
  const {
    match: { location },
    router,
  } = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  if (!partner.showsList) {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    return null
  }

  const {
    showsList: {
      edges: shows,
      pageInfo: { hasNextPage, endCursor },
      pageCursors,
    },
    slug,
  } = partner

  const handleClick = (cursor: string, page: number) => {
    const canRefetch = paramsPage !== page

    canRefetch && setIsLoading(true)

    canRefetch &&
      relay.refetch(
        {
          first: 40,
          after: cursor,
          partnerID: slug,
          before: null,
          last: null,
        },
        null,
        error => {
          if (error) {
            console.error(error)
          }

          const query = page === 1 ? {} : { ...location.query, page }

          router.push({
            pathname: location.pathname,
            query,
          })

          setIsLoading(false)
        }
      )
  }

  const handleNext = (page: number) => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    handleClick(endCursor, page)
  }

  return (
    <Box id={scrollTo.substring(1)}>
      <LoadingArea isLoading={isLoading}>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <ShowEventsFragmentContainer edges={shows} eventTitle={eventTitle} />
      </LoadingArea>

      <Box mt={9}>
        <PaginationFragmentContainer
          hasNextPage={hasNextPage}
          pageCursors={pageCursors}
          onClick={handleClick}
          onNext={handleNext}
          scrollTo={scrollTo}
          offset={offset}
        />
      </Box>
    </Box>
  )
}

export const ShowEventsRefetchContainer = createRefetchContainer(
  ShowPaginatedEvents,
  {
    partner: graphql`
      fragment ShowPaginatedEvents_partner on Partner
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 40 }
          last: { type: "Int" }
          page: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          status: { type: "EventStatus", defaultValue: CLOSED }
          isDisplayable: { type: "Boolean", defaultValue: true }
        ) {
        slug
        showsList: showsConnection(
          first: $first
          last: $last
          after: $after
          before: $before
          status: $status
          page: $page
          isDisplayable: $isDisplayable
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            ...ShowEvents_edges
          }
        }
      }
    `,
  },
  graphql`
    query ShowPaginatedEventsQuery(
      $partnerId: String!
      $first: Int
      $last: Int
      $after: String
      $before: String
      $status: EventStatus
    ) {
      partner(id: $partnerId) @principalField {
        ...ShowPaginatedEvents_partner
          @arguments(
            first: $first
            last: $last
            after: $after
            before: $before
            status: $status
          )
      }
    }
  `
)

interface ShowPaginatedEventsRendererProps {
  partnerId: string
  first: number
  status: EventStatus
  eventTitle: string
  scrollTo: string
  offset: number
  page?: number
}

export const ShowPaginatedEventsRenderer: React.FC<ShowPaginatedEventsRendererProps> = ({
  partnerId,
  first,
  status,
  page,
  ...rest
}) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ShowPaginatedEventsRendererQuery>
      environment={relayEnvironment}
      query={graphql`
        query ShowPaginatedEventsRendererQuery(
          $partnerId: String!
          $first: Int
          $page: Int
          $status: EventStatus
        ) {
          partner(id: $partnerId) @principalField {
            ...ShowPaginatedEvents_partner
              @arguments(first: $first, status: $status, page: $page)
          }
        }
      `}
      variables={{ partnerId, first, status, page }}
      render={({ error, props }) => {
        if (error || !props) return null

        return (
          <ShowEventsRefetchContainer
            {...rest}
            partner={props.partner!}
            paramsPage={page!}
          />
        )
      }}
    />
  )
}
