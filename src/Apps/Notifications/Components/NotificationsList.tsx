import { Join, Separator, Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationItemFragmentContainer } from "Components/NotificationItem"
import { extractNodes } from "Utils/extractNodes"
import { NotificationsList_notifications } from "__generated__/NotificationsList_notifications.graphql"

interface NotificationsListProps {
  notifications: NotificationsList_notifications
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  notifications,
}) => {
  const nodes = extractNodes(notifications)

  return (
    <Join separator={<Separator />}>
      {nodes.map(node => (
        <Box key={node.internalID} mx={-2}>
          <NotificationItemFragmentContainer item={node} />
        </Box>
      ))}
    </Join>
  )
}

export const NotificationsListFragmentContainer = createFragmentContainer(
  NotificationsList,
  {
    notifications: graphql`
      fragment NotificationsList_notifications on NotificationConnection {
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
