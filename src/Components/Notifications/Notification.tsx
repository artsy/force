import {
  Flex,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Notification_me$data } from "__generated__/Notification_me.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { NotificationQuery } from "__generated__/NotificationQuery.graphql"
import { useNotificationsContext } from "Components/Notifications/useNotificationsContext"

export const SUPPORTED_NOTIFICATION_TYPES = [
  "ARTWORK_ALERT",
  "ARTWORK_PUBLISHED",
]

interface NotificationProps {
  me: Notification_me$data
}

const Notification: React.FC<NotificationProps> = ({ me }) => {
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
export const NotificationFragmentContainer = createFragmentContainer(
  Notification,
  {
    me: graphql`
      fragment Notification_me on Me
        @argumentDefinitions(notificationId: { type: "String!" }) {
        notification(id: $notificationId) {
          title
        }
      }
    `,
  }
)

const QUERY = graphql`
  query NotificationQuery($id: String!) {
    me {
      ...Notification_me @arguments(notificationId: $id)
    }
  }
`

export const NotificationQueryRenderer: React.FC = () => {
  const { state } = useNotificationsContext()

  if (!state.currentNotificationId) {
    return null
  }

  return (
    <SystemQueryRenderer<NotificationQuery>
      query={QUERY}
      variables={{
        id: state.currentNotificationId,
      }}
      placeholder={<Placeholder />}
      cacheConfig={{ force: true }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (props?.me) {
          return <NotificationFragmentContainer me={props.me} />
        }

        return <Placeholder />
      }}
    />
  )
}

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
