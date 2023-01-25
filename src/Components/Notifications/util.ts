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

export const hasNewNotifications = (lastNotificationDatetime: string) => {
  if (!lastNotificationDatetime) {
    console.log("[debug] step 1")
    return false
  }

  const prevLastNotificationDatetime = window.localStorage.getItem(
    LAST_SEEN_NOTIFICATION_PUBLISHED_AT_KEY
  )

  if (!prevLastNotificationDatetime) {
    console.log("[debug] step 2")
    return true
  }

  const prevDate = DateTime.fromISO(prevLastNotificationDatetime)
  const newDate = DateTime.fromISO(lastNotificationDatetime)
  console.log("[debug] step 3", newDate > prevDate)

  return newDate > prevDate
}

export const useCustomHookName = (datetime: string) => {
  const [canDisplayUnseenIndicator, setCanDisplayUnseenIndicator] = useState(
    false
  )

  useEffect(() => {
    setCanDisplayUnseenIndicator(hasNewNotifications(datetime))
  }, [datetime])

  const setLastSeenNotificationDateTime = useCallback(
    (lastDateTime: string) => {
      console.log("[debug] setLastSeenNotificationDateTime")

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
