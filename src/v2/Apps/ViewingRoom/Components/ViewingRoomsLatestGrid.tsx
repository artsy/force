import React, { useState } from "react"
import {
  Box,
  Button,
  CSSGrid,
  CardTagProps,
  Flex,
  Link,
  Sans,
  SmallCard,
} from "@artsy/palette"
import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"

import { ViewingRoomsLatestGrid_viewingRooms } from "v2/__generated__/ViewingRoomsLatestGrid_viewingRooms.graphql"

export interface ViewingRoomsLatestGridProps {
  relay: RelayPaginationProp
  viewingRooms: ViewingRoomsLatestGrid_viewingRooms
}

export const getTagProps = (
  status: string,
  distanceToOpen: string | null,
  distanceToClose: string | null
): CardTagProps | null => {
  switch (status) {
    case "closed":
      return {
        text: "Closed",
        textColor: "white100",
        color: "black100",
        borderColor: "black100",
      }
    case "live":
      return distanceToClose
        ? {
            text: `${distanceToClose} left`,
            textColor: "black60",
            color: "white100",
            borderColor: "black5",
          }
        : null
    case "scheduled":
      return distanceToOpen
        ? {
            text: "Opening soon",
            textColor: "white100",
            color: "black100",
            borderColor: "black100",
          }
        : null
  }
}

export const PAGE_SIZE = 12

export const ViewingRoomsLatestGrid: React.FC<ViewingRoomsLatestGridProps> = props => {
  const viewingRooms = props.viewingRooms?.viewingRoomsConnection
  const [isLoading, setIsLoading] = useState(false)
  const hasMoreItems = props.relay.hasMore()

  const loadMore = () => {
    if (hasMoreItems) {
      setIsLoading(true)

      props.relay.loadMore(PAGE_SIZE, error => {
        if (error) {
          console.error(error)
        }
        setIsLoading(false)
      })
    }
  }

  if (!viewingRooms?.edges?.length) {
    return null
  }

  const viewingRoomsForLatestGrid = viewingRooms.edges
    .map(vr => {
      if (!vr.node) {
        return null
      }

      if (vr.node.status != "scheduled" && vr.node.status != "live") {
        return null
      }

      return {
        ...vr.node,
      }
    })
    .filter(Boolean)
  const count = viewingRoomsForLatestGrid.length

  return (
    <Box>
      <Sans size="5">Latest</Sans>
      <Box>
        <CSSGrid
          mt={2}
          mb={6}
          gridTemplateColumns={[
            "repeat(1fr)",
            `repeat(${Math.min(count, 2)}, 1fr)`,
            `repeat(${Math.min(count, 3)}, 1fr)`,
          ]}
          gridColumnGap={2}
          gridRowGap={6}
        >
          {viewingRoomsForLatestGrid.map(vr => {
            const {
              slug,
              title,
              status,
              heroImageURL,
              partner,
              distanceToOpen,
              distanceToClose,
              artworksConnection,
            } = vr
            const artworksCount = artworksConnection.totalCount
            const artworkImages = artworksConnection.edges.map(({ node }) =>
              artworksCount < 2 ? node.image.regular : node.image.square
            )
            const tag = getTagProps(status, distanceToOpen, distanceToClose)

            return (
              <Link href={`/viewing-room/${slug}`} key={slug} noUnderline>
                <SmallCard
                  title={title}
                  subtitle={partner.name}
                  images={[heroImageURL].concat(artworkImages)}
                  tag={tag}
                />
              </Link>
            )
          })}
        </CSSGrid>
        {hasMoreItems && (
          <Flex flexDirection="column" alignItems="center">
            <Button
              variant="secondaryOutline"
              size="medium"
              onClick={loadMore}
              loading={isLoading}
            >
              Show more
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  )
}

export const ViewingRoomsLatestGridFragmentContainer = createPaginationContainer(
  ViewingRoomsLatestGrid,
  {
    viewingRooms: graphql`
      fragment ViewingRoomsLatestGrid_viewingRooms on Viewer
        @argumentDefinitions(
          count: { type: "Int" }
          after: { type: "String" }
        ) {
        viewingRoomsConnection(first: $count, after: $after)
          @connection(key: "ViewingRoomsLatestGrid_viewingRoomsConnection") {
          edges {
            node {
              slug
              status
              title
              # TODO: Need to either figure out how to get dimensions here
              # or request a square vervion
              heroImageURL
              distanceToOpen(short: true)
              distanceToClose(short: true)
              partner {
                name
              }
              artworksConnection(first: 2) {
                totalCount
                edges {
                  node {
                    image {
                      square: url(version: "square")
                      regular: url(version: "large")
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.viewingRooms.viewingRoomsConnection
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        ...fragmentVariables,
        count,
        after: cursor,
      }
    },
    query: graphql`
      query ViewingRoomsLatestGrid_ViewingRoomsAppQuery(
        $count: Int!
        $after: String
      ) {
        allViewingRooms: viewer {
          ...ViewingRoomsApp_allViewingRooms
            @arguments(count: $count, after: $after)
        }
      }
    `,
  }
)
