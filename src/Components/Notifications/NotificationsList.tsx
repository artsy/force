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
import { useContext, useEffect, useState } from "react"
import { SystemContext } from "System/SystemContext"
import { NotificationsListScrollSentinel } from "./NotificationsListScrollSentinel"
import { NotificationPaginationType, NotificationType } from "./types"
import { NotificationsEmptyStateByType } from "./NotificationsEmptyStateByType"
import { shouldDisplayNotification } from "./util"
import { NotificationsListPlaceholder } from "./NotificationsListPlaceholder"
import { useNotificationsContext } from "Components/Notifications/useNotificationsContext"
import { NotificationListMode } from "Components/Notifications/NotificationsTabs"
import { useRouter } from "System/Router/useRouter"

interface NotificationsListQueryRendererProps {
  mode: NotificationListMode
  type?: NotificationType
  paginationType?: NotificationPaginationType
}

interface NotificationsListProps {
  viewer: NotificationsList_viewer$data
  relay: RelayPaginationProp
  mode: NotificationListMode
  type: NotificationType
  paginationType?: NotificationPaginationType
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  mode,
  viewer,
  relay,
  type,
  paginationType = "showMoreButton",
}) => {
  const { router } = useRouter()
  const [loading, setLoading] = useState(false)
  const [currentPaginationType, setCurrentPaginationType] = useState(
    paginationType
  )
  const nodes = extractNodes(viewer.notifications).filter(node =>
    shouldDisplayNotification(node)
  )

  const { state } = useNotificationsContext()

  // Set the current notification ID to the first one from the list in case no ID is selected.
  useEffect(() => {
    const firstNotificationId = nodes[0]?.internalID

    if (
      mode !== "page" ||
      state.currentNotificationId ||
      !firstNotificationId
    ) {
      return
    }

    router.replace(`/notification/${firstNotificationId}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <Box textAlign="center" my={4}>
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
      <Join separator={<Separator borderColor="black5" />}>
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
  mode,
  type,
  paginationType,
}) => {
  const { relayEnvironment } = useContext(SystemContext)
  const { state } = useNotificationsContext()

  // TODO: Remove this prop once we remove the code for the tabs
  const notificationType = type || state.currentNotificationFilterType
  const types = getNotificationTypes(notificationType)

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
            mode={mode}
            viewer={props.viewer}
            paginationType={paginationType}
            type={notificationType}
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
  if (type === "following") {
    return ["ARTWORK_PUBLISHED"]
  }

  return []
}
