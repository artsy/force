import { Flex, Text } from "@artsy/palette"
import { useFragment, graphql } from "react-relay"
import {
  NotificationTypeLabel_notification$key,
  NotificationTypesEnum,
} from "__generated__/NotificationTypeLabel_notification.graphql"

interface Props {
  notification: NotificationTypeLabel_notification$key
}

export const NotificationTypeLabel: React.FC<Props> = ({ notification }) => {
  const data = useFragment(NotificationTypeLabelFragment, notification)

  const { notificationType, publishedAt } = data

  const notificationTypeLabel = getNotificationTypeLabel(notificationType)

  const getPublishedAt = () => {
    switch (notificationType) {
      case "PARTNER_OFFER_CREATED":
        return null
      default:
        return publishedAt
    }
  }

  const timeDisplayText = getPublishedAt()

  return (
    <Flex flex-flexDirection="row" alignItems="center" gap="3px">
      {!!notificationTypeLabel && (
        <Text
          variant="xs"
          color="black100"
          fontWeight="bold"
          aria-label={`Notification type: ${notificationTypeLabel}`}
        >
          {notificationTypeLabel}
        </Text>
      )}
      {!!timeDisplayText && !!notificationTypeLabel && (
        <Text variant="xs">•</Text>
      )}
      {!!timeDisplayText && <Text variant="xs">{timeDisplayText}</Text>}
    </Flex>
  )
}

const NotificationTypeLabelFragment = graphql`
  fragment NotificationTypeLabel_notification on Notification {
    notificationType
    publishedAt(format: "RELATIVE")
  }
`

const getNotificationTypeLabel = (notificationType: NotificationTypesEnum) => {
  switch (notificationType) {
    case "ARTWORK_PUBLISHED":
      return "Follow"
    case "ARTWORK_ALERT":
      return "Alert"
    case "ARTICLE_FEATURED_ARTIST":
      return "Artsy Editorial"
    case "PARTNER_OFFER_CREATED":
      return "Offer"
    case "PARTNER_SHOW_OPENED":
      return "Show"
    case "VIEWING_ROOM_PUBLISHED":
      return "Viewing Room"
    default:
      return null
  }
}
