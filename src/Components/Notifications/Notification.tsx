import { Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { Notification_me$data } from "__generated__/Notification_me.graphql"

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
