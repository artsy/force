import { Flex, Spacer, Text, Box, Pill } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { FC } from "react"
import { useFragment, graphql } from "react-relay"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import { NotificationArtworkList } from "Components/Notifications/NotificationArtworkList"
import { AlertNotification_notification$key } from "__generated__/AlertNotification_notification.graphql"

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
    return (
      <Text variant="lg" m={4}>
        Sorry, something went wrong.
      </Text>
    )
  }

  return (
    <Box mx={4} my={4}>
      <Flex width="100%" justifyContent="space-between">
        <Flex flex={1}>
          <Text fontWeight="bold" variant="xl">
            {headline}
          </Text>
        </Flex>
        <RouterLink to={`/settings/alerts/${alert.internalID}/edit`}>
          <Text>Edit Alert</Text>
        </RouterLink>
      </Flex>

      <Spacer y={1} />

      <NotificationTypeLabel item={notificationData} />

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
    </Box>
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
    publishedAt(format: "RELATIVE")
  }
`
