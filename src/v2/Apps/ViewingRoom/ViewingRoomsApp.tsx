import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { Box, Sans, Separator, breakpoints } from "@artsy/palette"
import { ViewingRoomsLatestGridFragmentContainer as ViewingRoomsLatestGrid } from "./Components/ViewingRoomsLatestGrid"
import { Footer } from "v2/Components/Footer"
import { ViewingRoomsApp_allViewingRooms } from "v2/__generated__/ViewingRoomsApp_allViewingRooms.graphql"
import { ViewingRoomsApp_featuredViewingRooms } from "v2/__generated__/ViewingRoomsApp_featuredViewingRooms.graphql"
import { ViewingRoomsFeaturedRailFragmentContainer as ViewingRoomsFeaturedRail } from "./Components/ViewingRoomsFeaturedRail"
import { createFragmentContainer, graphql } from "react-relay"

interface ViewingRoomsAppProps {
  allViewingRooms: ViewingRoomsApp_allViewingRooms
  featuredViewingRooms: ViewingRoomsApp_featuredViewingRooms
}

const ViewingRoomsApp: React.FC<ViewingRoomsAppProps> = props => {
  const { allViewingRooms, featuredViewingRooms } = props
  return (
    <AppContainer maxWidth="100%">
      <Box maxWidth={breakpoints.xl} mx="auto" width="100%">
        <Box mx={2}>
          <Sans size="10" my={3}>
            Viewing Rooms
          </Sans>
          <ViewingRoomsFeaturedRail
            featuredViewingRooms={featuredViewingRooms}
          />
          <ViewingRoomsLatestGrid viewingRooms={allViewingRooms} />
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
    allViewingRooms: graphql`
      fragment ViewingRoomsApp_allViewingRooms on Viewer
        @argumentDefinitions(
          count: { type: "Int" }
          after: { type: "String" }
        ) {
        ...ViewingRoomsLatestGrid_viewingRooms
          @arguments(count: $count, after: $after)
      }
    `,
    featuredViewingRooms: graphql`
      fragment ViewingRoomsApp_featuredViewingRooms on ViewingRoomConnection {
        ...ViewingRoomsFeaturedRail_featuredViewingRooms
      }
    `,
  }
)

// Top-level route needs to be exported for bundle splitting in the router
export default ViewingRoomsAppFragmentContainer
