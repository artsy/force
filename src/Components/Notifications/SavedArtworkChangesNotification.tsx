import { Spacer, Text } from "@artsy/palette"
import { NotificationArtworkList } from "Components/Notifications/NotificationArtworkList"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"
import { NotificationTypeLabel } from "Components/Notifications/NotificationTypeLabel"
import type { SavedArtworkChangesNotification_notification$key } from "__generated__/SavedArtworkChangesNotification_notification.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface SavedArtworkChangesNotificationProps {
  notification: SavedArtworkChangesNotification_notification$key
}

export const SavedArtworkChangesNotification: FC<
  React.PropsWithChildren<SavedArtworkChangesNotificationProps>
> = ({ notification }) => {
  const notificationData = useFragment(
    SavedArtworkChangesNotificationFragment,
    notification,
  )

  const { artworksConnection, headline } = notificationData

  return (
    <>
      <Text variant="lg-display">{headline}</Text>

      <Spacer y={1} />

      <NotificationTypeLabel notification={notificationData} />

      <Spacer y={4} />

      <NotificationArtworkList artworksConnection={artworksConnection} />
    </>
  )
}

export const SavedArtworkChangesNotificationFragment = graphql`
  fragment SavedArtworkChangesNotification_notification on Notification {
    artworksConnection(first: 10) {
      ...NotificationArtworkList_artworksConnection
      totalCount
    }
    headline
    notificationType
    ...NotificationTypeLabel_notification
  }
`
