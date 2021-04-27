import { Box } from "@artsy/palette"
import React, { useState } from "react"
import {
  createRefetchContainer,
  graphql,
  QueryRenderer,
  RelayRefetchProp,
} from "react-relay"
import { PaginationFragmentContainer } from "v2/Components/Pagination"
import { LoadingArea } from "v2/Components/LoadingArea"
import { ShowEventsFragmentContainer } from "v2/Apps/Partner/Components/PartnerShows/ShowEvents"
import { useSystemContext } from "v2/Artsy"
import { useRouter } from "v2/Artsy/Router/useRouter"
import { ShowPaginatedEventsQuery } from "v2/__generated__/ShowPaginatedEventsQuery.graphql"
import { ShowPaginatedEvents_partner } from "v2/__generated__/ShowPaginatedEvents_partner.graphql"
import { EventStatus } from "v2/__generated__/ShowPaginatedEventsRendererQuery.graphql"

interface ShowEventsProps {
  relay: RelayRefetchProp
  partner: ShowPaginatedEvents_partner
  scrollTo: string
  eventTitle: string
  offset: number
}

const ShowPaginatedEvents: React.FC<ShowEventsProps> = ({
  eventTitle,
  relay,
  partner,
  scrollTo,
  offset,
}): JSX.Element => {
  const {
    match: { location },
    router,
  } = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  if (!partner.showsList) {
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
    setIsLoading(true)

    relay.refetch(
      {
        first: 24,
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
        setIsLoading(false)

        router.push({
          pathname: location.pathname,
          query: { ...location.query, page },
        })
      }
    )
  }

  const handleNext = (page: number) => {
    handleClick(endCursor, page)
  }

  return (
    <Box id={scrollTo.substring(1)}>
      <LoadingArea isLoading={isLoading}>
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
          first: { type: "Int", defaultValue: 24 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          status: { type: "EventStatus", defaultValue: CLOSED }
        ) {
        slug
        showsList: showsConnection(
          first: $first
          last: $last
          after: $after
          before: $before
          status: $status
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
}

export const ShowPaginatedEventsRenderer: React.FC<ShowPaginatedEventsRendererProps> = ({
  partnerId,
  first,
  status,
  ...rest
}) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <QueryRenderer<ShowPaginatedEventsQuery>
      environment={relayEnvironment}
      query={graphql`
        query ShowPaginatedEventsRendererQuery(
          $partnerId: String!
          $first: Int
          $status: EventStatus
        ) {
          partner(id: $partnerId) @principalField {
            ...ShowPaginatedEvents_partner
              @arguments(first: $first, status: $status)
          }
        }
      `}
      variables={{ partnerId, first, status }}
      render={({ error, props }) => {
        if (error || !props) return null

        return <ShowEventsRefetchContainer {...rest} {...props} />
      }}
    />
  )
}
