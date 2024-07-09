import { Flex, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { FC } from "react"
import { useFragment, graphql } from "react-relay"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { ViewingRoomPublishedNotification_notification$key } from "__generated__/ViewingRoomPublishedNotification_notification.graphql"
import { ContextModule } from "@artsy/cohesion"
import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"
import { NotificationViewingRoomsList } from "Components/Notifications/NotificationViewingRoomsList"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"
import { NotificationWrapper } from "Components/Notifications/Notification"

interface ViewingRoomPublishedNotificationProps {
  notification: ViewingRoomPublishedNotification_notification$key
}

export const ViewingRoomPublishedNotification: FC<ViewingRoomPublishedNotificationProps> = ({
  notification,
}) => {
  const notificationData = useFragment(
    ViewingRoomPublishedNotificationFragment,
    notification
  )

  const { headline, item } = notificationData

  const partner = item?.partner
  const profile = partner?.profile

  if (!profile) {
    return <NotificationErrorMessage />
  }

  return (
    <NotificationWrapper>
      <Flex width="100%" justifyContent="space-between">
        <Flex flex={1}>
          <Text variant="lg-display">{headline}</Text>
        </Flex>
      </Flex>

      <Spacer y={1} />

      <NotificationTypeLabel notification={notificationData} />

      <Spacer y={1} />

      <Flex flexDirection="row" gap={1} alignItems="center">
        <FollowProfileButtonQueryRenderer
          id={profile.internalID}
          contextModule={ContextModule.activity}
          size="small"
        />

        <RouterLink to={partner.href} textDecoration="none">
          <Text variant="xs">{partner.name}</Text>
        </RouterLink>
      </Flex>

      <Spacer y={4} />

      <Flex flexDirection="column" alignItems="center">
        <NotificationViewingRoomsList
          viewingRoomsConnection={item?.viewingRoomsConnection}
        />
      </Flex>
    </NotificationWrapper>
  )
}

export const ViewingRoomPublishedNotificationFragment = graphql`
  fragment ViewingRoomPublishedNotification_notification on Notification {
    headline
    item {
      ... on ViewingRoomPublishedNotificationItem {
        partner {
          name
          href
          profile {
            internalID
          }
        }
        viewingRoomsConnection(first: 10) {
          ...NotificationViewingRoomsList_viewingRoomsConnection
        }
      }
    }
    notificationType
    ...NotificationTypeLabel_notification
  }
`
