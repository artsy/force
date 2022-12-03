import * as React from "react"
import { Join, Spacer, Text } from "@artsy/palette"
import { ViewingRoomsLatestGridFragmentContainer } from "./Components/ViewingRoomsLatestGrid"
import { ViewingRoomsMeta } from "./Components/ViewingRoomsMeta"
import { ViewingRoomsApp_allViewingRooms$data } from "__generated__/ViewingRoomsApp_allViewingRooms.graphql"
import { ViewingRoomsApp_featuredViewingRooms$data } from "__generated__/ViewingRoomsApp_featuredViewingRooms.graphql"
import { ViewingRoomsFeaturedRailFragmentContainer } from "./Components/ViewingRoomsFeaturedRail"
import { createFragmentContainer, graphql } from "react-relay"

interface ViewingRoomsAppProps {
  allViewingRooms: ViewingRoomsApp_allViewingRooms$data
  featuredViewingRooms: ViewingRoomsApp_featuredViewingRooms$data
}

const ViewingRoomsApp: React.FC<ViewingRoomsAppProps> = props => {
  const { allViewingRooms, featuredViewingRooms } = props
  return (
    <>
      <ViewingRoomsMeta />

      <Spacer y={4} />

      <Join separator={<Spacer y={6} />}>
        <Text variant="xl" as="h1">
          Viewing Rooms
        </Text>

        <Text variant="lg-display">Featured</Text>

        <ViewingRoomsFeaturedRailFragmentContainer
          featuredViewingRooms={featuredViewingRooms}
        />

        <Text variant="lg-display">Latest</Text>

        <ViewingRoomsLatestGridFragmentContainer
          viewingRooms={allViewingRooms}
        />
      </Join>
    </>
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
