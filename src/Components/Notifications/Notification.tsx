import {
  Flex,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { graphql, useLazyLoadQuery } from "react-relay"
import { NotificationQuery } from "__generated__/NotificationQuery.graphql"
import { useNotificationsContext } from "Components/Notifications/useNotificationsContext"
import { Suspense, useEffect } from "react"
import { ArtworkPublishedNotification } from "Components/Notifications/ArtworkPublishedNotification"
import { AlertNotification } from "Components/Notifications/AlertNotification"
import { useRouter } from "System/Router/useRouter"

export const SUPPORTED_NOTIFICATION_TYPES = [
  "ARTWORK_ALERT",
  "ARTWORK_PUBLISHED",
]

interface NotificationProps {
  notificationId: string
}

const Notification: React.FC<NotificationProps> = ({ notificationId }) => {
  const { router } = useRouter()

  const data = useLazyLoadQuery<NotificationQuery>(notificationQuery, {
    internalID: notificationId,
  })

  const notification = data.me?.notification

  // Redirect user to the notifications targetHref if the notification type is not supported
  useEffect(() => {
    if (
      !SUPPORTED_NOTIFICATION_TYPES.includes(
        notification?.notificationType as string
      )
    ) {
      router.replace(notification?.targetHref as string)
    }
  }, [notification, router])

  if (!data.me?.notification) {
    return (
      <Text variant="lg" m={4}>
        Sorry, something went wrong.
      </Text>
    )
  }

  switch (notification?.notificationType) {
    case "ARTWORK_ALERT":
      return <AlertNotification notification={data.me?.notification} />
    case "ARTWORK_PUBLISHED":
      return (
        <ArtworkPublishedNotification notification={data.me?.notification} />
      )
    default:
      return null
  }
}

export const NotificationQueryRenderer: React.FC = props => {
  const { state } = useNotificationsContext()

  if (!state.currentNotificationId) {
    return null
  }

  return (
    <Suspense fallback={<Placeholder />}>
      <Notification notificationId={state.currentNotificationId} {...props} />
    </Suspense>
  )
}

const notificationQuery = graphql`
  query NotificationQuery($internalID: String!) {
    me {
      notification(id: $internalID) {
        notificationType
        targetHref

        ...AlertNotification_notification
        ...ArtworkPublishedNotification_notification
      }
    }
  }
`

export const Placeholder: React.FC = () => (
  <Flex flexDirection="column" m={4}>
    <Skeleton>
      <SkeletonText variant="xs">Alert - Today</SkeletonText>

      <SkeletonText variant="xl">Name of the Artist</SkeletonText>

      <Spacer y={4} />

      <Flex flexDirection="column" alignItems="center">
        <SkeletonBox width={600} height={600} mb={4} />
        <SkeletonBox width={600} height={600} mb={4} />
        <SkeletonBox width={600} height={600} mb={4} />
      </Flex>
    </Skeleton>
  </Flex>
)
