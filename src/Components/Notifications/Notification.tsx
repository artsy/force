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
import { Suspense } from "react"

export const SUPPORTED_NOTIFICATION_TYPES = [
  "ARTWORK_ALERT",
  "ARTWORK_PUBLISHED",
]

interface NotificationProps {
  notificationId: string
}

const Notification: React.FC<NotificationProps> = ({ notificationId }) => {
  const { me } = useLazyLoadQuery<NotificationQuery>(notificationQuery, {
    id: notificationId,
  })

  if (!me) {
    return null
  }

  const { notification } = me

  if (!notification) {
    return (
      <Text variant="sm-display" px={2} py={4}>
        There is nothing to show.
      </Text>
    )
  }

  return (
    <Flex flexDirection="column" m={4}>
      <Text variant="xl" mb={2}>
        {notification.title}
      </Text>

      {/* TODO: Please remove me. I'm just here to test scrolling. */}
      <Flex height={2000} />
    </Flex>
  )
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
  query NotificationQuery($id: String!) {
    me {
      notification(id: $id) {
        title
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
