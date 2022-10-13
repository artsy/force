import { DateTime } from "luxon"
import { extractNodes } from "Utils/extractNodes"

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
  if (!isArtworksBasedNotification(notification)) {
    return true
  }

  return extractNodes(notification.artworksConnection).length > 0
}

const isArtworksBasedNotification = notification => {
  return ["ARTWORK_ALERT", "ARTWORK_PUBLISHED"].includes(
    notification.notificationType
  )
}
