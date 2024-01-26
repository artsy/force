import { NotificationTypesEnum } from "__generated__/NotificationsList_viewer.graphql"

export const shouldDisplayNotification = notification => {
  if (!isArtworksBasedNotification(notification.notificationType)) {
    return true
  }

  const artworksCount = notification.artworks?.totalCount ?? 0
  return artworksCount > 0
}

export const isArtworksBasedNotification = (
  notificationType: NotificationTypesEnum
) => {
  return ["ARTWORK_ALERT", "ARTWORK_PUBLISHED"].includes(notificationType)
}

export const formattedTimeLeft = (time: {
  days: string
  hours: string
  minutes: string
  seconds: string
}) => {
  const parsedDays = parseInt(time.days, 10)
  const parsedHours = parseInt(time.hours, 10)
  const parsedMinutes = parseInt(time.minutes, 10)
  const parsedSeconds = parseInt(time.seconds, 10)

  let textColor = "blue100"
  let copy

  if (parsedDays >= 1) {
    copy = `${parsedDays} days`
  } else if (parsedDays < 1 && parsedHours >= 1) {
    copy = `${parsedHours} hours`
  } else if (parsedHours < 1 && parsedMinutes >= 1) {
    copy = `${parsedMinutes} minutes`
    textColor = "red100"
  } else if (parsedMinutes < 1) {
    copy = `${parsedSeconds} seconds`
    textColor = "red100"
  }

  return { timerCopy: copy, textColor }
}
