import { Flex, Text } from "@artsy/palette"
import { NotificationItem_item$data } from "__generated__/NotificationItem_item.graphql"

interface Props {
  item: NotificationItem_item$data
}

export const NotificationTypeLabel: React.FC<Props> = ({ item }) => {
  const { notificationType } = item

  const getNotificationType = () => {
    if (notificationType === "ARTWORK_ALERT") {
      return "Alert"
    }
    if (notificationType === "ARTICLE_FEATURED_ARTIST") {
      return "Artsy Editorial"
    }
    if (notificationType == "PARTNER_OFFER_CREATED") {
      return "Limited Time Offer"
    }

    return null
  }
  const notificationTypeLabel = getNotificationType()

  let notificationTypeColor
  switch (notificationType) {
    case "ARTWORK_ALERT":
    case "PARTNER_OFFER_CREATED":
      notificationTypeColor = "blue100"
      break
    default:
      notificationTypeColor = "black60"
  }

  return (
    <Flex flex-flexDirection="row" alignItems="center" gap="3px">
      {notificationTypeLabel && (
        <>
          <Text variant="xs" color={notificationTypeColor}>
            {notificationTypeLabel}
          </Text>
          <Text variant="xs" color="black60">
            •
          </Text>
        </>
      )}
      <Text variant="xs" color="black60">
        {item.publishedAt}
      </Text>
    </Flex>
  )
}
