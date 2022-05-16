import { Column, GridColumns, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomCardFragmentContainer } from "./ViewingRoomCard"
import { ViewingRooms_edges } from "v2/__generated__/ViewingRooms_edges.graphql"

interface ViewingRoomsProps {
  edges: ViewingRooms_edges
  eventTitle: string
}

const ViewingRooms: React.FC<ViewingRoomsProps> = ({ edges, eventTitle }) => {
  return (
    <>
      <Text color="black" variant="lg-display" mb={6}>
        {eventTitle}
      </Text>

      <GridColumns mb={6} gridRowGap={[2, 4]}>
        {edges.map(({ node: viewingRoom }) => {
          if (!viewingRoom) return
          return (
            <Column key={viewingRoom.internalID} span={[6, 6, 3, 3]}>
              <ViewingRoomCardFragmentContainer viewingRoom={viewingRoom} />
            </Column>
          )
        })}
      </GridColumns>
    </>
  )
}

export const ViewingRoomsFragmentContainer = createFragmentContainer(
  ViewingRooms,
  {
    edges: graphql`
      fragment ViewingRooms_edges on ViewingRoomsEdge @relay(plural: true) {
        node {
          internalID
          ...ViewingRoomCard_viewingRoom
        }
      }
    `,
  }
)
