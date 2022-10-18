import { DateTime } from "luxon"
import { NotificationTypesEnum } from "__generated__/NotificationsList_viewer.graphql"

export const getDateLabel = (timestamp: string) => {
  const date = DateTime.fromISO(timestamp)

  if (isToday(date)) {
    return "Today"
  }

  const days = daysAgo(date)

  // It's NOT today and it's been less than 2 days
  if (days <= 1) {
    return "Yesterday"
  }

  return `${days} days ago`
}

const isToday = (date: DateTime) => {
  return date.toISODate() === DateTime.now().toISODate()
}

const daysAgo = (date: DateTime) => {
  return Math.floor(DateTime.now().diff(date, "days").days)
}

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
