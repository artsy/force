import { Flex, Spacer, Text, Box } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { FC } from "react"
import { useFragment, graphql } from "react-relay"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { ViewingRoomPublishedNotification_notification$key } from "__generated__/ViewingRoomPublishedNotification_notification.graphql"
import { ContextModule } from "@artsy/cohesion"
import { FollowProfileButtonQueryRenderer } from "Components/FollowButton/FollowProfileButton"
import { NotificationViewingRoomsList } from "Components/Notifications/NotificationViewingRoomsList"

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
    return (
      <Text variant="lg" m={4}>
        Sorry, something went wrong.
      </Text>
    )
  }

  return (
    <Box m={4}>
      <Flex width="100%" justifyContent="space-between">
        <Flex flex={1}>
          <Text variant="lg-display">{headline}</Text>
        </Flex>
      </Flex>

      <Spacer y={1} />

      <NotificationTypeLabel item={notificationData} />

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
    </Box>
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
    publishedAt(format: "RELATIVE")
  }
`
