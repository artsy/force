import { useNotificationsContext } from "Components/Notifications/Hooks/useNotificationsContext"
import { NotificationItemFragmentContainer } from "Components/Notifications/NotificationItem"
import type { NotificationListMode } from "Components/Notifications/NotificationsWrapper"
import { SystemContext } from "System/Contexts/SystemContext"
import { useRouter } from "System/Hooks/useRouter"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { getENV } from "Utils/getENV"
import { Flex, Join, Separator, Spinner, Text } from "@artsy/palette"
import type { NotificationsList_viewer$data } from "__generated__/NotificationsList_viewer.graphql"
import type {
  NotificationsListQuery,
  NotificationTypesEnum,
} from "__generated__/NotificationsListQuery.graphql"
import { useContext, useEffect, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  type RelayPaginationProp,
} from "react-relay"
import { NotificationsEmptyStateByType } from "./NotificationsEmptyStateByType"
import { NotificationsListPlaceholder } from "./NotificationsListPlaceholder"
import { NotificationsListScrollSentinel } from "./NotificationsListScrollSentinel"
import type { NotificationType } from "./types"
import { shouldDisplayNotification } from "./util"

interface NotificationsListQueryRendererProps {
  mode: NotificationListMode
  type?: NotificationType
}

interface NotificationsListProps {
  viewer: NotificationsList_viewer$data
  relay: RelayPaginationProp
  mode: NotificationListMode
  type: NotificationType
}

export const NotificationsList: React.FC<
  React.PropsWithChildren<NotificationsListProps>
> = ({ mode, viewer, relay, type }) => {
  const { router, match } = useRouter()
  const [loading, setLoading] = useState(false)

  const nodes = extractNodes(viewer.notifications).filter(node =>
    shouldDisplayNotification(node),
  )

  const { state } = useNotificationsContext()

  const isMobile = getENV("IS_MOBILE")

  const pathname = match?.location?.pathname

  // Set the current notification ID to the first one from the list in case no ID is selected.
  useEffect(() => {
    if (isMobile === null) return
    if (pathname !== "/notifications") return

    const firstNotificationId = nodes[0]?.internalID

    if (
      isMobile ||
      mode !== "page" ||
      state.currentNotificationId ||
      !firstNotificationId
    ) {
      return
    }

    router.replace(`/notification/${firstNotificationId}`)
  }, [isMobile, pathname, mode, nodes, router, state.currentNotificationId])

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

  if (nodes.length === 0) {
    return <NotificationsEmptyStateByType type={type} />
  }

  return (
    <>
      <Join separator={<Separator borderColor="mono5" />}>
        {nodes.map(node => (
          <NotificationItemFragmentContainer
            key={node.internalID}
            notification={node}
            mode={mode}
          />
        ))}
      </Join>

      {loading && <Spinner position="static" m="auto" mt={2} mb={4} />}

      <NotificationsListScrollSentinel onNext={handleLoadNext} />
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
              ...NotificationItem_notification
              item {
                ... on ViewingRoomPublishedNotificationItem {
                  viewingRoomsConnection(first: 1) {
                    totalCount
                  }
                }

                ... on ArticleFeaturedArtistNotificationItem {
                  article {
                    internalID
                  }
                }
              }
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
  },
)

export const NotificationsListQueryRenderer: React.FC<
  React.PropsWithChildren<NotificationsListQueryRendererProps>
> = ({ mode, type }) => {
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
            type={notificationType}
          />
        )
      }}
    />
  )
}

const getNotificationTypes = (
  type: NotificationType,
): NotificationTypesEnum[] | undefined => {
  if (type === "alerts") {
    return ["ARTWORK_ALERT"]
  }
  if (type === "follows") {
    return ["ARTWORK_PUBLISHED"]
  }
  if (type === "offers") {
    return ["PARTNER_OFFER_CREATED"]
  }

  return []
}
