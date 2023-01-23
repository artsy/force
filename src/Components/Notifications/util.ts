import { NotificationTypesEnum } from "__generated__/NotificationsList_viewer.graphql"

export const LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY =
  "last_seen_notification_published_at"

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

export const setLastSeenNotificationDate = date => {
  if (!date) {
    return
  }

  window.localStorage.setItem(LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY, date)
}

export const hasNewNotifications = lastNotificationDatetime => {
  if (!lastNotificationDatetime) {
    return false
  }

  if (!window.localStorage.getItem(LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY)) {
    return true
  }

  return (
    Date.parse(lastNotificationDatetime) >
    Date.parse(
      window.localStorage.getItem(LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY)!
    )
  )
}
