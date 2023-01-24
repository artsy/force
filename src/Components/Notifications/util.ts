import { NotificationTypesEnum } from "__generated__/NotificationsList_viewer.graphql"
import { DateTime } from "luxon"

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

export const hasNewNotifications = (lastNotificationDatetime: string) => {
  if (!lastNotificationDatetime) {
    return false
  }

  const prevLastNotificationDatetime = window.localStorage.getItem(
    LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY
  )

  if (!prevLastNotificationDatetime) {
    return true
  }

  const prevDate = DateTime.fromISO(prevLastNotificationDatetime)
  const newDate = DateTime.fromISO(lastNotificationDatetime)

  return newDate > prevDate
}
