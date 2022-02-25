import * as React from "react"
import { Join, Spacer, Text } from "@artsy/palette"
import { ViewingRoomsLatestGridFragmentContainer } from "./Components/ViewingRoomsLatestGrid"
import { ViewingRoomsMeta } from "./Components/ViewingRoomsMeta"
import { ViewingRoomsApp_allViewingRooms } from "v2/__generated__/ViewingRoomsApp_allViewingRooms.graphql"
import { ViewingRoomsApp_featuredViewingRooms } from "v2/__generated__/ViewingRoomsApp_featuredViewingRooms.graphql"
import { ViewingRoomsFeaturedRailFragmentContainer } from "./Components/ViewingRoomsFeaturedRail"
import { createFragmentContainer, graphql } from "react-relay"

interface ViewingRoomsAppProps {
  allViewingRooms: ViewingRoomsApp_allViewingRooms
  featuredViewingRooms: ViewingRoomsApp_featuredViewingRooms
}

const ViewingRoomsApp: React.FC<ViewingRoomsAppProps> = props => {
  const { allViewingRooms, featuredViewingRooms } = props
  return (
    <>
      <ViewingRoomsMeta />

      <Spacer mt={4} />

      <Join separator={<Spacer mt={6} />}>
        <Text variant="xl" as="h1">
          Viewing Rooms
        </Text>

        <Text variant="lg">Featured</Text>

        <ViewingRoomsFeaturedRailFragmentContainer
          featuredViewingRooms={featuredViewingRooms}
        />

        <Text variant="lg">Latest</Text>

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
