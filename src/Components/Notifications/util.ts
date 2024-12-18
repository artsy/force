import type {
  NotificationsList_viewer$data,
  NotificationTypesEnum,
} from "__generated__/NotificationsList_viewer.graphql"

export type NotificationNode = NonNullable<
  NonNullable<
    NonNullable<NotificationsList_viewer$data["notifications"]>["edges"]
  >[0]
>["node"]

export const shouldDisplayNotification = (
  notification:
    | Pick<
        NonNullable<NotificationNode>,
        "notificationType" | "artworks" | "item"
      >
    | null
    | undefined
) => {
  if (!notification) return false

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

  if (notification.notificationType === "COLLECTOR_PROFILE_UPDATE_PROMPT") {
    return false
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
  const parsedDays = Number.parseInt(time.days, 10)
  const parsedHours = Number.parseInt(time.hours, 10)
  const parsedMinutes = Number.parseInt(time.minutes, 10)
  const parsedSeconds = Number.parseInt(time.seconds, 10)

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
