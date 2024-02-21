import { Flex, Text } from "@artsy/palette"
import { NotificationTypesEnum } from "__generated__/NotificationItem_item.graphql"

interface Props {
  item: {
    notificationType: NotificationTypesEnum
    publishedAt: string
  }
}

export const NotificationTypeLabel: React.FC<Props> = ({ item }) => {
  const { notificationType } = item

  const notificationTypeLabel = getNotificationTypeLabel(notificationType)

  const showPublishedAt = notificationType !== "PARTNER_OFFER_CREATED"

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
      {showPublishedAt && !!notificationTypeLabel && (
        <Text variant="xs">•</Text>
      )}
      {showPublishedAt && <Text variant="xs">{item.publishedAt}</Text>}
    </Flex>
  )
}

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
