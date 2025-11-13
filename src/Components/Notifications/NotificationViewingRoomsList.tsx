import { NotificationViewingRoom } from "Components/Notifications/NotificationViewingRoom"
import { extractNodes } from "Utils/extractNodes"
import { ContextModule } from "@artsy/cohesion"
import { Flex } from "@artsy/palette"
import type { NotificationViewingRoomsList_viewingRoomsConnection$key } from "__generated__/NotificationViewingRoomsList_viewingRoomsConnection.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface NotificationViewingRoomListProps {
  viewingRoomsConnection?: NotificationViewingRoomsList_viewingRoomsConnection$key | null
}

export const NotificationViewingRoomsList: FC<
  React.PropsWithChildren<NotificationViewingRoomListProps>
> = props => {
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
