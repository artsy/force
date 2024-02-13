import { NotificationTypesEnum } from "__generated__/NotificationsList_viewer.graphql"

export const shouldDisplayNotification = notification => {
  if (isArtworksBasedNotification(notification.notificationType)) {
    const artworksCount = notification.artworks?.totalCount ?? 0
    return artworksCount > 0
  }

  if (notification.notificationType === "VIEWING_ROOM_PUBLISHED") {
    const viewingRoomsCount =
      notification.item?.viewingRoomsConnection?.totalCount ?? 0
    return viewingRoomsCount > 0
  }

  if (notification.notificationType === "ARTICLE_FEATURED_ARTIST") {
    return !!notification.item?.article?.internalID
  }

  return true
}

export const isArtworksBasedNotification = (
  notificationType: NotificationTypesEnum
) => {
  return [
    "ARTWORK_ALERT",
    "ARTWORK_PUBLISHED",
    "PARTNER_OFFER_CREATED",
  ].includes(notificationType)
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

  if (parsedDays >= 1 && parsedHours >= 1) {
    copy = `${parsedDays} ${pluralize(
      "day",
      parsedDays
    )} ${parsedHours} ${pluralize("hour", parsedHours)}`
  } else if (parsedDays >= 1) {
    copy = `${parsedDays} ${pluralize("day", parsedDays)}`
  } else if (parsedDays < 1 && parsedHours >= 1) {
    copy = `${parsedHours} ${pluralize("hour", parsedHours)}`
  } else if (parsedHours < 1 && parsedMinutes >= 1) {
    copy = `${parsedMinutes} ${pluralize("minute", parsedMinutes)}`
    textColor = "red100"
  } else if (parsedMinutes < 1) {
    copy = `${parsedSeconds} ${pluralize("second", parsedSeconds)}`
    textColor = "red100"
  }

  return { timerCopy: copy, textColor }
}

const pluralize = (word: string, count: number) => {
  if (count === 1) {
    return word
  }

  return `${word}s`
}
