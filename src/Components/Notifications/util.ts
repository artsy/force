import { NotificationTypesEnum } from "__generated__/NotificationsList_viewer.graphql"

export const shouldDisplayNotification = notification => {
  if (!isArtworksBasedNotification(notification.notificationType)) {
    return true
  }

  const artworksCount = notification.artworks?.totalCount ?? 0
  return artworksCount > 0
}

const isArtworksBasedNotification = (
  notificationType: NotificationTypesEnum
) => {
  return ["ARTWORK_ALERT", "ARTWORK_PUBLISHED"].includes(notificationType)
}

export const hasNewNotifications = lastNotificationDatetime => {
  if (!lastNotificationDatetime) {
    return false
  }

  // TODO: where to store constant? (last_seen_notification_published_at is used in several places)
  if (!window.localStorage.getItem("last_seen_notification_published_at")) {
    return true
  }

  return (
    Date.parse(lastNotificationDatetime) >
    Date.parse(
      window.localStorage.getItem("last_seen_notification_published_at")!
    )
  )
}
