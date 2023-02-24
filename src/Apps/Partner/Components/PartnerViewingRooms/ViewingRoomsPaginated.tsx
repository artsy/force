import { useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Box } from "@artsy/palette"
import { compact } from "lodash"
import { useSystemContext } from "System/useSystemContext"
import { useRouter } from "System/Router/useRouter"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { PaginationFragmentContainer } from "Components/Pagination"
import { LoadingArea } from "Components/LoadingArea"
import createLogger from "Utils/logger"
import { ViewingRoomsPaginatedPlaceholder } from "./ViewingRoomsPaginatedPlaceholder"
import { ViewingRoomsFragmentContainer } from "./ViewingRooms"
import { ViewingRoomsPaginatedRendererQuery } from "__generated__/ViewingRoomsPaginatedRendererQuery.graphql"
import { ViewingRoomsPaginated_partner$data } from "__generated__/ViewingRoomsPaginated_partner.graphql"
import { Jump } from "Utils/Hooks/useJump"

const logger = createLogger("ViewingRoomsPaginated.tsx")

interface ViewingRoomsProps {
  relay: RelayRefetchProp
  partner: ViewingRoomsPaginated_partner$data
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
    <Jump id={scrollTo}>
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
    </Jump>
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
