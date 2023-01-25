import { NotificationTypesEnum } from "__generated__/NotificationsList_viewer.graphql"
import { DateTime } from "luxon"
import { useCallback, useEffect, useState } from "react"

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

export const hasNewNotifications = (
  lastNotificationDateTime: string | undefined
) => {
  if (!lastNotificationDateTime) {
    return false
  }

  const prevLastNotificationDatetime = window.localStorage.getItem(
    LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY
  )

  if (!prevLastNotificationDatetime) {
    return true
  }

  const prevDate = DateTime.fromISO(prevLastNotificationDatetime)
  const newDate = DateTime.fromISO(lastNotificationDateTime)

  return newDate > prevDate
}

export const getRecentNotification = <T extends object>(
  notificationsNodes: T[]
): T | undefined => {
  const nodes = notificationsNodes.filter(node =>
    shouldDisplayNotification(node)
  )

  return nodes[0]
}

export const useUnseenNotificationsIndicator = (
  datetime: string | undefined
) => {
  const [canDisplayUnseenIndicator, setCanDisplayUnseenIndicator] = useState(
    false
  )

  useEffect(() => {
    setCanDisplayUnseenIndicator(hasNewNotifications(datetime))
  }, [datetime])

  const setLastSeenNotificationDateTime = useCallback(
    (lastDateTime: string) => {
      window.localStorage.setItem(
        LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY,
        lastDateTime
      )
      setCanDisplayUnseenIndicator(false)
    },
    [setCanDisplayUnseenIndicator]
  )

  return { canDisplayUnseenIndicator, setLastSeenNotificationDateTime }
}
