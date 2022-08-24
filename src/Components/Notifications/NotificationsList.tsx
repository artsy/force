import { Join, Separator, Box } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { NotificationsList_viewer } from "__generated__/NotificationsList_viewer.graphql"
import { NotificationItemFragmentContainer } from "Components/Notifications/NotificationItem"

interface NotificationsListProps {
  viewer: NotificationsList_viewer
}

const NotificationsList: React.FC<NotificationsListProps> = ({ viewer }) => {
  const nodes = extractNodes(viewer.notifications)

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
    viewer: graphql`
      fragment NotificationsList_viewer on Viewer {
        notifications: notificationsConnection(first: 10) {
          edges {
            node {
              internalID
              ...NotificationItem_item
            }
          }
        }
      }
    `,
  }
)
