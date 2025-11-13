import { Join, Spacer, Text } from "@artsy/palette"
import type { ViewingRoomsApp_allViewingRooms$data } from "__generated__/ViewingRoomsApp_allViewingRooms.graphql"
import type { ViewingRoomsApp_featuredViewingRooms$data } from "__generated__/ViewingRoomsApp_featuredViewingRooms.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomsFeaturedRailFragmentContainer } from "./Components/ViewingRoomsFeaturedRail"
import { ViewingRoomsLatestGridFragmentContainer } from "./Components/ViewingRoomsLatestGrid"
import { ViewingRoomsMeta } from "./Components/ViewingRoomsMeta"

interface ViewingRoomsAppProps {
  allViewingRooms: ViewingRoomsApp_allViewingRooms$data
  featuredViewingRooms: ViewingRoomsApp_featuredViewingRooms$data
}

const ViewingRoomsApp: React.FC<
  React.PropsWithChildren<ViewingRoomsAppProps>
> = props => {
  const { allViewingRooms, featuredViewingRooms } = props
  return (
    <>
      <ViewingRoomsMeta />

      <Spacer y={4} />

      <Join separator={<Spacer y={6} />}>
        <Text variant="xl" as="h1">
          Viewing Rooms
        </Text>

        <ViewingRoomsFeaturedRailFragmentContainer
          featuredViewingRooms={featuredViewingRooms}
        />

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
      @argumentDefinitions(count: { type: "Int" }, after: { type: "String" }) {
        ...ViewingRoomsLatestGrid_viewingRooms
          @arguments(count: $count, after: $after)
      }
    `,
    featuredViewingRooms: graphql`
      fragment ViewingRoomsApp_featuredViewingRooms on ViewingRoomsConnection {
        ...ViewingRoomsFeaturedRail_featuredViewingRooms
      }
    `,
  }
)
