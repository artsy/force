import React from "react"
import { Box } from "@artsy/palette"
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

export const ViewingRoomsLatestGrid: React.FC<ViewingRoomsLatestGridProps> = props => {
  console.log("!!!!!!!!!!!!!!!!!")
  console.log(props)
  console.log("!!!!!!!!!!!!!!!!!")
  return <Box>Hello World</Box>
}

export const ViewingRoomsLatestGridFragmentContainer = createPaginationContainer(
  ViewingRoomsLatestGrid,
  {
    viewingRooms: graphql`
      fragment ViewingRoomsLatestGrid_viewingRooms on Query
        @argumentDefinitions(
          count: { type: "Int" }
          after: { type: "String" }
        ) {
        viewingRooms(first: $count, after: $after)
          @connection(key: "ViewingRoomsLatestGrid_viewingRooms") {
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
      return props.viewingRooms
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
        ...ViewingRoomsApp_allViewingRooms
          @arguments(count: $count, after: $after)
      }
    `,
  }
)
