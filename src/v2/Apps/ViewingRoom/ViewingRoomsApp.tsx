import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { Box, Sans, breakpoints } from "@artsy/palette"
import { ViewingRoomsApp_viewingRooms } from "v2/__generated__/ViewingRoomsApp_viewingRooms.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface ViewingRoomsAppProps {
  viewingRooms: ViewingRoomsApp_viewingRooms
}

const ViewingRoomsApp: React.FC<ViewingRoomsAppProps> = props => {
  const viewingRooms = props.viewingRooms

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

  return (
    <AppContainer maxWidth="100%">
      <Box maxWidth={breakpoints.xl} mx="auto" width="100%">
        <Sans size="10" my={3}>
          Viewing Rooms
        </Sans>
        <Box>
          <Sans size="5">Latest</Sans>
          <Box>
            {viewingRoomsForLatestGrid.map(vr => {
              return (
                <Sans size="3t" key={vr.slug}>
                  {vr.title}
                </Sans>
              )
            })}
          </Box>
        </Box>
      </Box>
    </AppContainer>
  )
}

export const ViewingRoomsAppFragmentContainer = createFragmentContainer(
  ViewingRoomsApp,
  {
    viewingRooms: graphql`
      fragment ViewingRoomsApp_viewingRooms on ViewingRoomConnection {
        edges {
          node {
            slug
            status
            title
          }
        }
      }
    `,
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default ViewingRoomsAppFragmentContainer
