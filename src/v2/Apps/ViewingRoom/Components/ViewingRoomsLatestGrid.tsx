import React, { useState } from "react"
import { Box, Button, CSSGrid, Flex, Sans, SmallCard } from "@artsy/palette"
import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import { scrollIntoView } from "v2/Utils/scrollHelpers"
import { ViewingRoomsLatestGrid_viewingRooms } from "v2/__generated__/ViewingRoomsLatestGrid_viewingRooms.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { getTagProps } from "v2/Components/ViewingRoomCard"
import { cropped } from "v2/Utils/resized"

export interface ViewingRoomsLatestGridProps {
  relay: RelayPaginationProp
  viewingRooms: ViewingRoomsLatestGrid_viewingRooms
}

export const PAGE_SIZE = 12

export const ViewingRoomsLatestGrid: React.FC<ViewingRoomsLatestGridProps> = props => {
  const viewingRooms = props.viewingRooms?.viewingRoomsConnection
  const [isLoading, setIsLoading] = useState(false)
  const hasMoreItems = props.relay.hasMore() as boolean

  const loadMore = () => {
    if (hasMoreItems) {
      setIsLoading(true)

      props.relay.loadMore(PAGE_SIZE, error => {
        if (error) {
          console.error(error)
        }
        setIsLoading(false)

        setTimeout(
          () => scrollIntoView({ offset: 60, selector: "#jump--viewingRoom" }),
          100
        )
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
          {viewingRoomsForLatestGrid.map((vr, index) => {
            const {
              slug,
              title,
              status,
              image,
              partner,
              distanceToOpen,
              distanceToClose,
              artworksConnection,
            } = vr
            const heroImageURL = cropped(image?.imageURLs?.normalized, {
              height: 490,
              width: 490,
            })
            const artworksCount = artworksConnection.totalCount
            const artworkImages = artworksConnection.edges.map(({ node }) => {
              return artworksCount < 2 ? node.image.tall : node.image.square
            })
            const tag = getTagProps(status, distanceToOpen, distanceToClose)

            return (
              <RouterLink to={`/viewing-room/${slug}`} key={slug} noUnderline>
                {
                  // Add a css id selector to an empty div above the last list item and scroll to that div when the Show More button is pressed.
                  viewingRoomsForLatestGrid.length - PAGE_SIZE === index && (
                    <div id="jump--viewingRoom" />
                  )
                }
                <SmallCard
                  title={title}
                  subtitle={partner.name}
                  images={[heroImageURL].concat(artworkImages)}
                  tag={tag}
                />
              </RouterLink>
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
              image {
                imageURLs {
                  normalized
                }
              }
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
                      tall: cropped(width: 140, height: 280) {
                        src
                        srcSet
                      }
                      square: cropped(width: 140, height: 140) {
                        src
                        srcSet
                      }
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
