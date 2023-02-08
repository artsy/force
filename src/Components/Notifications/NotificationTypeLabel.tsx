import { Box } from "@artsy/palette"

interface Props {
  notificationType: string
}

export const NotificationTypeLabel: React.FC<Props> = ({
  notificationType,
}) => {
  const getNotificationType = () => {
    if (notificationType === "ARTWORK_ALERT") {
      return "Alert"
    }
    if (notificationType === "ARTICLE_FEATURED_ARTIST") {
      return "Artsy Editorial"
    }

    return null
  }
  const notificationTypeLabel = getNotificationType()
  const notificationTypeColor =
    notificationType == "ARTWORK_ALERT" ? "blue100" : "black60"

  return (
    <Box
      as="span"
      aria-label={`Notification type: ${notificationTypeLabel}`}
      color={notificationTypeColor}
    >
      {notificationTypeLabel} •{" "}
    </Box>
  )
}
