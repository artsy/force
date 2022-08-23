import { Join, Separator, Box, FullBleed } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationsApp_notifications } from "__generated__/NotificationsApp_notifications.graphql"
import { extractNodes } from "Utils/extractNodes"
import { NotificationItemFragmentContainer } from "Components/NotificationItem"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"

interface NotificationsAppProps {
  notifications: NotificationsApp_notifications
}

export const NotificationsApp: React.FC<NotificationsAppProps> = ({
  notifications,
}) => {
  const nodes = extractNodes(notifications)

  return (
    <FullBleed>
      <AppContainer>
        <HorizontalPadding my={1}>
          <Join separator={<Separator />}>
            {nodes.map(node => (
              <Box key={node.internalID} mx={-2}>
                <NotificationItemFragmentContainer item={node} />
              </Box>
            ))}
          </Join>
        </HorizontalPadding>
      </AppContainer>
    </FullBleed>
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
