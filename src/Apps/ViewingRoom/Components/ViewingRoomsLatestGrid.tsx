import { useState } from "react"
import * as React from "react"
import { Button, Card, GridColumns, Column, Box } from "@artsy/palette"
import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import { ViewingRoomsLatestGrid_viewingRooms$data } from "__generated__/ViewingRoomsLatestGrid_viewingRooms.graphql"
import { RouterLink } from "System/Components/RouterLink"
import { cropped } from "Utils/resized"
import { extractNodes } from "Utils/extractNodes"
import { getStatus } from "Apps/ViewingRoom/Utils/getStatus"

export interface ViewingRoomsLatestGridProps {
  relay: RelayPaginationProp
  viewingRooms: ViewingRoomsLatestGrid_viewingRooms$data
}

export const PAGE_SIZE = 12

export const ViewingRoomsLatestGrid: React.FC<ViewingRoomsLatestGridProps> = props => {
  const [loading, setLoading] = useState(false)

  const hasMore = props.relay.hasMore()

  const loadMore = () => {
    if (!hasMore) return

    setLoading(true)

    props.relay.loadMore(PAGE_SIZE, error => {
      if (error) console.error(error)
      setLoading(false)
    })
  }

  const viewingRooms = extractNodes(
    props.viewingRooms?.viewingRoomsConnection
  ).filter(viewingRoom => {
    return viewingRoom.status === "scheduled" || viewingRoom.status === "live"
  })

  if (viewingRooms.length === 0) {
    return null
  }

  return (
    <>
      <GridColumns>
        {viewingRooms.map(viewingRoom => {
          const image = cropped(
            viewingRoom.image?.imageURLs?.normalized as string,
            {
              height: 490,
              width: 490,
            }
          )

          const status = getStatus({
            status: viewingRoom.status,
            distanceToOpen: viewingRoom.distanceToOpen,
            distanceToClose: viewingRoom.distanceToClose,
          })

          return (
            <Column key={viewingRoom.slug} span={3}>
              <RouterLink
                display="block"
                to={`/viewing-room/${viewingRoom.slug}`}
              >
                <Card
                  maxWidth="100%"
                  title={viewingRoom.title}
                  subtitle={viewingRoom.partner?.name}
                  image={image}
                  status={status}
                />
              </RouterLink>
            </Column>
          )
        })}
      </GridColumns>

      {hasMore && (
        <Box textAlign="center" mt={4}>
          <Button
            variant="secondaryBlack"
            size="large"
            onClick={loadMore}
            loading={loading}
          >
            Show More
          </Button>
        </Box>
      )}
    </>
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
