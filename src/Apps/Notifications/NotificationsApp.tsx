import { Join, Separator, Spacer, Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationsApp_notifications } from "__generated__/NotificationsApp_notifications.graphql"
import { extractNodes } from "Utils/extractNodes"
import { NotificationItemFragmentContainer } from "Components/NotificationItem"

interface NotificationsAppProps {
  notifications: NotificationsApp_notifications
}

export const NotificationsApp: React.FC<NotificationsAppProps> = ({
  notifications,
}) => {
  const nodes = extractNodes(notifications)

  return (
    <Box mx={-2}>
      <Spacer mt={1} />

      <Join separator={<Separator mx={2} />}>
        {nodes.map(node => (
          <NotificationItemFragmentContainer
            key={node.internalID}
            item={node}
          />
        ))}
      </Join>
    </Box>
  )
}

export const NotificationsAppFragmentContainer = createFragmentContainer(
  NotificationsApp,
  {
    notifications: graphql`
      fragment NotificationsApp_notifications on NotificationConnection {
        edges {
          node {
            internalID
            ...NotificationItem_item
          }
        }
      }
    `,
  }
)
