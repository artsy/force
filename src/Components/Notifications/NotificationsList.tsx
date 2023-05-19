import { Box, Button, Flex, Join, Separator, Text } from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { NotificationsList_viewer$data } from "__generated__/NotificationsList_viewer.graphql"
import {
  NotificationsListQuery,
  NotificationTypesEnum,
} from "__generated__/NotificationsListQuery.graphql"
import { NotificationItemFragmentContainer } from "Components/Notifications/NotificationItem"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useContext, useState } from "react"
import { SystemContext } from "System/SystemContext"
import { NotificationsListScrollSentinel } from "./NotificationsListScrollSentinel"
import { NotificationPaginationType, NotificationType } from "./types"
import { NotificationsEmptyStateByType } from "./NotificationsEmptyStateByType"
import { shouldDisplayNotification } from "./util"
import { NotificationsListPlaceholder } from "./NotificationsListPlaceholder"

interface NotificationsListQueryRendererProps {
  type: NotificationType
  paginationType?: NotificationPaginationType
}

interface NotificationsListProps extends NotificationsListQueryRendererProps {
  viewer: NotificationsList_viewer$data
  relay: RelayPaginationProp
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  viewer,
  relay,
  type,
  paginationType = "showMoreButton",
}) => {
  const [loading, setLoading] = useState(false)
  const [currentPaginationType, setCurrentPaginationType] = useState(
    paginationType
  )
  const nodes = extractNodes(viewer.notifications).filter(node =>
    shouldDisplayNotification(node)
  )

  const handleLoadNext = () => {
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    setLoading(true)

    relay.loadMore(10, err => {
      if (err) console.error(err)

      setLoading(false)

      // Change pagination type to "infinite" when "show more" button was pressed
      if (paginationType === "showMoreButton") {
        setCurrentPaginationType("infinite")
      }
    })
  }

  const renderFooter = () => {
    if (!relay.hasMore()) {
      return
    }

    if (currentPaginationType === "infinite") {
      return <NotificationsListScrollSentinel onNext={handleLoadNext} />
    }

    return (
      <Box textAlign="center" mt={4}>
        <Button
          onClick={handleLoadNext}
          loading={loading}
          size="small"
          variant="secondaryBlack"
        >
          Show More
        </Button>
      </Box>
    )
  }

  if (nodes.length === 0) {
    return <NotificationsEmptyStateByType type={type} />
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

      {renderFooter()}
    </>
  )
}

const NOTIFICATIONS_NEXT_QUERY = graphql`
  query NotificationsListNextQuery(
    $count: Int!
    $cursor: String
    $types: [NotificationTypesEnum]
  ) {
    viewer {
      ...NotificationsList_viewer
        @arguments(count: $count, cursor: $cursor, types: $types)
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
          types: { type: "[NotificationTypesEnum]" }
        ) {
        notifications: notificationsConnection(
          first: $count
          after: $cursor
          notificationTypes: $types
        ) @connection(key: "NotificationsList_notifications", filters: []) {
          edges {
            node {
              internalID
              notificationType
              artworks: artworksConnection {
                totalCount
              }
              ...NotificationItem_item
            }
          }
        }
      }
    `,
  },
  {
    query: NOTIFICATIONS_NEXT_QUERY,
    getConnectionFromProps(props) {
      return props.viewer.notifications
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(_props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        cursor,
      }
    },
  }
)

export const NotificationsListQueryRenderer: React.FC<NotificationsListQueryRendererProps> = ({
  type,
  paginationType,
}) => {
  const { relayEnvironment } = useContext(SystemContext)
  const types = getNotificationTypes(type)

  return (
    <SystemQueryRenderer<NotificationsListQuery>
      environment={relayEnvironment}
      query={graphql`
        query NotificationsListQuery($types: [NotificationTypesEnum]) {
          viewer {
            ...NotificationsList_viewer @arguments(types: $types)
          }
        }
      `}
      variables={{
        types,
      }}
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

        if (!props || !props.viewer) {
          return <NotificationsListPlaceholder />
        }

        return (
          <NotificationsListFragmentContainer
            viewer={props.viewer}
            paginationType={paginationType}
            type={type}
          />
        )
      }}
    />
  )
}

const getNotificationTypes = (
  type: NotificationType
): NotificationTypesEnum[] | undefined => {
  if (type === "alerts") {
    return ["ARTWORK_ALERT"]
  }

  return []
}
