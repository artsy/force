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

export const shouldDisplayNotificationTypeLabel = (
  notificationType: string
) => {
  return ["ARTWORK_ALERT", "ARTICLE_FEATURED_ARTIST"].includes(notificationType)
}
