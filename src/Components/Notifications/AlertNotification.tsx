import { Flex, Spacer, Text, Pill } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { FC } from "react"
import { useFragment, graphql } from "react-relay"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { NotificationArtworkList } from "Components/Notifications/NotificationArtworkList"
import { AlertNotification_notification$key } from "__generated__/AlertNotification_notification.graphql"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"
import { NotificationWrapper } from "Components/Notifications/Notification"

interface AlertNotificationProps {
  notification: AlertNotification_notification$key
}

export const AlertNotification: FC<AlertNotificationProps> = ({
  notification,
}) => {
  const notificationData = useFragment(AlertNotificationFragment, notification)

  const { artworksConnection, headline, item } = notificationData

  const alert = item?.alert
  const artist = item?.alert?.artists?.[0]

  if (!alert || !artist) {
    return <NotificationErrorMessage />
  }

  return (
    <NotificationWrapper>
      <Flex width="100%" justifyContent="space-between">
        <Flex flex={1} mr={1}>
          <Text variant="lg-display">{headline}</Text>
        </Flex>
        <RouterLink to={`/favorites/alerts/${alert.internalID}/edit`}>
          <Text variant="xs" mt={0.5}>
            Edit Alert
          </Text>
        </RouterLink>
      </Flex>

      <Spacer y={1} />

      <NotificationTypeLabel notification={notificationData} />

      <Spacer y={1} />

      <Flex flexDirection="row" flexWrap="wrap">
        {alert.labels.map(label => (
          <Pill
            variant="filter"
            mr={1}
            mb={1}
            key={`filter-label-${label?.displayValue}`}
            disabled
            borderColor="black30"
          >
            {label?.displayValue}
          </Pill>
        ))}
      </Flex>

      <Spacer y={4} />

      <NotificationArtworkList artworksConnection={artworksConnection} />

      <Spacer y={4} />

      <RouterLink to={`/artist/${artist?.slug}/works-for-sale`}>
        <Text fontWeight="bold">View all works by {artist.name}</Text>
      </RouterLink>
    </NotificationWrapper>
  )
}

export const AlertNotificationFragment = graphql`
  fragment AlertNotification_notification on Notification {
    artworksConnection(first: 10) {
      ...NotificationArtworkList_artworksConnection
      totalCount
    }
    headline
    item {
      ... on AlertNotificationItem {
        alert {
          internalID
          artists {
            name
            slug
          }
          labels {
            displayValue
          }
        }
      }
    }
    notificationType
    ...NotificationTypeLabel_notification
  }
`
