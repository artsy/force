import { Join, Separator, Box, Flex, Text } from "@artsy/palette"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationItemFragmentContainer } from "Components/NotificationItem"
import { extractNodes } from "Utils/extractNodes"
import { NotificationsListQuery } from "__generated__/NotificationsListQuery.graphql"
import { NotificationsList_viewer } from "__generated__/NotificationsList_viewer.graphql"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useContext } from "react"
import { SystemContext } from "System"

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

export const NotificationsListQueryRenderer = () => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <SystemQueryRenderer<NotificationsListQuery>
      environment={relayEnvironment}
      query={graphql`
        query NotificationsListQuery {
          viewer {
            ...NotificationsList_viewer
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          return (
            <Flex justifyContent="center">
              <Text variant="xs" color="red100">
                {error.message}
              </Text>
            </Flex>
          )
        }

        // TODO: Style loading state
        if (!props || !props.viewer) {
          return (
            <Flex justifyContent="center">
              <Text variant="xs">Loading</Text>
            </Flex>
          )
        }

        return <NotificationsListFragmentContainer viewer={props.viewer} />
      }}
    />
  )
}
