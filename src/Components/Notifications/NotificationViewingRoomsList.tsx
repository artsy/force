import { ContextModule } from "@artsy/cohesion"
import { Flex } from "@artsy/palette"
import { extractNodes } from "Utils/extractNodes"
import { FC } from "react"
import { useFragment, graphql } from "react-relay"
import { NotificationViewingRoomsList_viewingRoomsConnection$key } from "__generated__/NotificationViewingRoomsList_viewingRoomsConnection.graphql"
import { NotificationViewingRoom } from "Components/Notifications/NotificationViewingRoom"

interface NotificationViewingRoomListProps {
  viewingRoomsConnection?: NotificationViewingRoomsList_viewingRoomsConnection$key | null
}

export const NotificationViewingRoomsList: FC<NotificationViewingRoomListProps> = props => {
  const viewingRoomsConnection = useFragment(
    notificationViewingRoomsListFragment,
    props.viewingRoomsConnection
  )

  const viewingRooms = extractNodes(viewingRoomsConnection)

  return (
    <Flex flexDirection="column" alignItems="center">
      {viewingRooms.map(viewingRoom => (
        <NotificationViewingRoom
          key={viewingRoom.internalID}
          viewingRoom={viewingRoom}
          contextModule={ContextModule.activity}
        />
      ))}
    </Flex>
  )
}

export const notificationViewingRoomsListFragment = graphql`
  fragment NotificationViewingRoomsList_viewingRoomsConnection on ViewingRoomsConnection {
    edges {
      node {
        ...NotificationViewingRoom_viewingRoom
        internalID
      }
    }
  }
`
