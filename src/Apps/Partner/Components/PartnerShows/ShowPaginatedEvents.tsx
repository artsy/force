import { Text, Column, GridColumns, Spacer } from "@artsy/palette"
import { useState } from "react"
import * as React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { PaginationFragmentContainer } from "Components/Pagination"
import { LoadingArea } from "Components/LoadingArea"
import { useRouter } from "System/Hooks/useRouter"
import { ShowPaginatedEventsRendererQuery } from "__generated__/ShowPaginatedEventsRendererQuery.graphql"
import { ShowPaginatedEvents_partner$data } from "__generated__/ShowPaginatedEvents_partner.graphql"
import { EventStatus } from "__generated__/ShowPaginatedEventsRendererQuery.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Jump } from "Utils/Hooks/useJump"
import { extractNodes } from "Utils/extractNodes"
import { CellShowFragmentContainer } from "Components/Cells/CellShow"

interface ShowEventsProps {
  relay: RelayRefetchProp
  partner: ShowPaginatedEvents_partner$data
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
}) => {
  const {
    match: { location },
    router,
  } = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  if (!partner.showsConnection) {
    return null
  }

  const {
    showsConnection,
    showsConnection: {
      pageInfo: { hasNextPage, endCursor },
      pageCursors,
    },
    slug,
  } = partner

  const shows = extractNodes(showsConnection)

  const handleClick = (cursor: string | null | undefined, page: number) => {
    if (paramsPage === page) return

    setIsLoading(true)

    relay.refetch(
      { first: 40, after: cursor, partnerID: slug },
      null,
      error => {
        if (error) {
          console.error(error)
        }

        const query = page === 1 ? {} : { ...location.query, page }

        router.push({ pathname: location.pathname, query })

        setIsLoading(false)
      }
    )
  }

  const handleNext = (page: number) => {
    handleClick(endCursor, page)
  }

  return (
    <Jump id={scrollTo}>
      <LoadingArea isLoading={isLoading}>
        <Text variant="lg-display" mb={6}>
          {eventTitle}
        </Text>

        <GridColumns mb={6} gridRowGap={[2, 4]}>
          {shows.map(show => {
            return (
              <Column key={show.internalID} span={[6, 6, 3, 3]}>
                <CellShowFragmentContainer
                  show={show}
                  mode="GRID"
                  displayKind
                  displayPartner={false}
                />
              </Column>
            )
          })}
        </GridColumns>
      </LoadingArea>

      <Spacer y={6} />

      <PaginationFragmentContainer
        hasNextPage={hasNextPage}
        pageCursors={pageCursors}
        onClick={handleClick}
        onNext={handleNext}
        scrollTo={scrollTo}
        offset={offset}
      />
    </Jump>
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
        showsConnection(
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
            node {
              ...CellShow_show
              internalID
            }
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
  return (
    <SystemQueryRenderer<ShowPaginatedEventsRendererQuery>
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
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            partner={props.partner!}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            paramsPage={page!}
          />
        )
      }}
    />
  )
}
