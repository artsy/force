import { useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Box } from "@artsy/palette"
import { compact } from "lodash"

import { useSystemContext } from "v2/System"
import { useRouter } from "v2/System/Router/useRouter"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { PaginationFragmentContainer } from "v2/Components/Pagination"
import { LoadingArea } from "v2/Components/LoadingArea"
import createLogger from "v2/Utils/logger"

import { ViewingRoomsPaginatedPlaceholder } from "./ViewingRoomsPaginatedPlaceholder"
import { ViewingRoomsFragmentContainer } from "./ViewingRooms"
import { ViewingRoomsPaginatedRendererQuery } from "v2/__generated__/ViewingRoomsPaginatedRendererQuery.graphql"
import { ViewingRoomsPaginated_partner } from "v2/__generated__/ViewingRoomsPaginated_partner.graphql"

const logger = createLogger("ViewingRoomsPaginated.tsx")

interface ViewingRoomsProps {
  relay: RelayRefetchProp
  partner: ViewingRoomsPaginated_partner
  scrollTo: string
  eventTitle: string
  offset: number
  paramsPage?: number
}

const ViewingRoomsPaginated: React.FC<ViewingRoomsProps> = ({
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

  if (!partner?.viewingRoomsList) {
    return null
  }

  const { viewingRoomsList, slug } = partner
  const { edges: viewingRooms, pageInfo, pageCursors } = viewingRoomsList
  const { hasNextPage, endCursor } = pageInfo

  const handleClick = (cursor: string, page: number) => {
    if (paramsPage === page) return

    setIsLoading(true)

    relay.refetch(
      {
        first: 40,
        statuses: ["closed"],
        after: cursor,
        partnerID: slug,
        before: null,
        last: null,
      },
      null,
      error => {
        if (error) {
          logger.error(error)
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
    if (!endCursor) return
    handleClick(endCursor, page)
  }

  return (
    <Box id={scrollTo.substring(1)}>
      <LoadingArea isLoading={isLoading}>
        <ViewingRoomsFragmentContainer
          edges={compact(viewingRooms)}
          eventTitle={eventTitle}
        />
      </LoadingArea>

      {pageCursors && (
        <Box mt={6}>
          <PaginationFragmentContainer
            hasNextPage={hasNextPage}
            pageCursors={pageCursors}
            onClick={handleClick}
            onNext={handleNext}
            scrollTo={scrollTo}
            offset={offset}
          />
        </Box>
      )}
    </Box>
  )
}

export const ViewingRoomsRefetchContainer = createRefetchContainer(
  ViewingRoomsPaginated,
  {
    partner: graphql`
      fragment ViewingRoomsPaginated_partner on Partner
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 40 }
          after: { type: "String" }
        ) {
        slug
        viewingRoomsList: viewingRoomsConnection(
          first: $first
          after: $after
          statuses: [closed]
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            ...ViewingRooms_edges
          }
        }
      }
    `,
  },
  graphql`
    query ViewingRoomsPaginatedQuery(
      $partnerId: String!
      $first: Int
      $after: String
    ) {
      partner(id: $partnerId) @principalField {
        ...ViewingRoomsPaginated_partner
          @arguments(first: $first, after: $after)
      }
    }
  `
)

interface ViewingRoomsPaginatedRendererProps {
  partnerId: string
}

export const ViewingRoomsPaginatedRenderer: React.FC<
  Omit<ViewingRoomsProps, "partner" | "relay"> &
    ViewingRoomsPaginatedRendererProps
> = ({ partnerId, paramsPage, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ViewingRoomsPaginatedRendererQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query ViewingRoomsPaginatedRendererQuery(
          $partnerId: String!
          $first: Int
          $after: String
        ) {
          partner(id: $partnerId) @principalField {
            ...ViewingRoomsPaginated_partner
              @arguments(first: $first, after: $after)
          }
        }
      `}
      placeholder={<ViewingRoomsPaginatedPlaceholder count={4} {...rest} />}
      variables={{ partnerId, first: 40, after: null }}
      render={({ error, props }) => {
        if (error || !props)
          return <ViewingRoomsPaginatedPlaceholder count={4} {...rest} />

        return (
          <ViewingRoomsRefetchContainer
            {...rest}
            partner={props.partner!}
            paramsPage={paramsPage!}
          />
        )
      }}
    />
  )
}
