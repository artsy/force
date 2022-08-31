import { Box, Button, Flex, Join, Separator, Text } from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { NotificationsList_viewer } from "__generated__/NotificationsList_viewer.graphql"
import { NotificationsListQuery } from "__generated__/NotificationsListQuery.graphql"
import { NotificationItemFragmentContainer } from "Components/Notifications/NotificationItem"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useContext, useState } from "react"
import { SystemContext } from "System"

interface NotificationsListProps {
  viewer: NotificationsList_viewer
  relay: RelayPaginationProp
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  viewer,
  relay,
}) => {
  const [loading, setLoading] = useState(false)
  const nodes = extractNodes(viewer.notifications)

  const handleLoadNext = () => {
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    setLoading(true)

    relay.loadMore(10, err => {
      if (err) console.error(err)
      setLoading(false)
    })
  }

  return (
    <>
      <Join separator={<Separator />}>
        {nodes.map(node => (
          <NotificationItemFragmentContainer
            key={node.internalID}
            item={node}
          />
        ))}
      </Join>

      {relay.hasMore() && (
        <Box textAlign="center" mt={4}>
          <Button onClick={handleLoadNext} loading={loading}>
            Show More
          </Button>
        </Box>
      )}
    </>
  )
}

const NOTIFICATIONS_NEXT_QUERY = graphql`
  query NotificationsListNextQuery($count: Int!, $cursor: String) {
    viewer {
      ...NotificationsList_viewer @arguments(count: $count, cursor: $cursor)
    }
  }
`

export const NotificationsListFragmentContainer = createPaginationContainer(
  NotificationsList,
  {
    viewer: graphql`
      fragment NotificationsList_viewer on Viewer
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
        ) {
        notifications: notificationsConnection(first: $count, after: $cursor)
          @connection(key: "NotificationsList_notifications") {
          edges {
            node {
              internalID
              ...NotificationItem_item
            }
          }
        }
      }
    `,
  },
  {
    query: NOTIFICATIONS_NEXT_QUERY,
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(_props, { count, cursor }, fragmentVariables) {
      return { ...fragmentVariables, count, cursor }
    },
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
