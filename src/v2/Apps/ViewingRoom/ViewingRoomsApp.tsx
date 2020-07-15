import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { Box, Sans, Separator, breakpoints } from "@artsy/palette"
import { ViewingRoomsLatestGridFragmentContainer as ViewingRoomsLatestGrid } from "./Components/ViewingRoomsLatestGrid"
import { Footer } from "v2/Components/Footer"
import { ViewingRoomsApp_viewingRooms } from "v2/__generated__/ViewingRoomsApp_viewingRooms.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface ViewingRoomsAppProps {
  viewingRooms: ViewingRoomsApp_viewingRooms
}

const ViewingRoomsApp: React.FC<ViewingRoomsAppProps> = props => {
  const viewingRooms = props.viewingRooms
  return (
    <AppContainer maxWidth="100%">
      <Box maxWidth={breakpoints.xl} mx="auto" width="100%">
        <Box mx={2}>
          <Sans size="10" my={3}>
            Viewing Rooms
          </Sans>
          <ViewingRoomsLatestGrid viewingRooms={viewingRooms} />
        </Box>
      </Box>
      <Box mx={2}>
        <Separator mt={6} mb={3} />
        <Footer />
      </Box>
    </AppContainer>
  )
}

export const ViewingRoomsAppFragmentContainer = createFragmentContainer(
  ViewingRoomsApp,
  {
    viewingRooms: graphql`
      fragment ViewingRoomsApp_viewingRooms on ViewingRoomConnection {
        ...ViewingRoomsLatestGrid_viewingRooms
      }
    `,
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default ViewingRoomsAppFragmentContainer
