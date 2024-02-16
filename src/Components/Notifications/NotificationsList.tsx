import { Flex, Join, Separator, Spinner, THEME, Text } from "@artsy/palette"
import { graphql, usePaginationFragment } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { NotificationsList_viewer$key } from "__generated__/NotificationsList_viewer.graphql"
import {
  NotificationsListQuery,
  NotificationTypesEnum,
} from "__generated__/NotificationsListQuery.graphql"
import { NotificationItemFragmentContainer } from "Components/Notifications/NotificationItem"
import { useEffect } from "react"
import { NotificationsListScrollSentinel } from "./NotificationsListScrollSentinel"
import { NotificationPaginationType, NotificationType } from "./types"
import { NotificationsEmptyStateByType } from "./NotificationsEmptyStateByType"
import { shouldDisplayNotification } from "./util"
import { NotificationsListPlaceholder } from "./NotificationsListPlaceholder"
import { useNotificationsContext } from "Components/Notifications/useNotificationsContext"
import { NotificationListMode } from "Components/Notifications/NotificationsTabs"
import { useRouter } from "System/Router/useRouter"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { useClientQuery } from "Utils/Hooks/useClientQuery"

const INITIAL_LOADING_SIZE = 10

interface NotificationsListQueryRendererProps {
  mode: NotificationListMode
  type?: NotificationType
  paginationType?: NotificationPaginationType
}

interface NotificationsListProps {
  viewer: NotificationsList_viewer$key
  mode: NotificationListMode
  type: NotificationType
  paginationType?: NotificationPaginationType
}

export const NotificationsList: React.FC<NotificationsListProps> = ({
  mode,
  viewer,
  type,
}) => {
  const {
    data: { notifications },
    loadNext,
    hasNext,
    isLoadingNext,
  } = usePaginationFragment(
    graphql`
      fragment NotificationsList_viewer on Viewer
        @refetchable(queryName: "NotificationsListPaginationQuery")
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
    viewer
  )
  const { router } = useRouter()

  const nodes = extractNodes(notifications).filter(node =>
    shouldDisplayNotification(node)
  )

  const { state } = useNotificationsContext()

  const xs = __internal__useMatchMedia(THEME.mediaQueries.xs)
  const sm = __internal__useMatchMedia(THEME.mediaQueries.sm)
  const isMobile = xs || sm

  // Set the current notification ID to the first one from the list in case no ID is selected.
  useEffect(() => {
    if (isMobile === null) return

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  const handleLoadNext = () => {
    if (!hasNext || isLoadingNext) {
      return
    }

    loadNext(10, {
      onComplete: err => {
        if (err) console.error(err)
      },
    })
  }

  // This is needed because `totalCount` and therefor `relay.hasMore()` doesn't work reliably
  // TODO: Remove this once we have a reliable `totalCount`
  const isLoading = isLoadingNext && nodes.length >= INITIAL_LOADING_SIZE

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

      {isLoading && <Spinner position="static" m="auto" mt={2} mb={4} />}

      <NotificationsListScrollSentinel onNext={handleLoadNext} />
    </>
  )
}

export const NotificationsListQueryRenderer: React.FC<NotificationsListQueryRendererProps> = ({
  mode,
  type,
  paginationType,
}) => {
  const { state } = useNotificationsContext()

  // TODO: Remove this prop once we remove the code for the tabs
  const notificationType = type || state.currentNotificationFilterType
  const types = getNotificationTypes(notificationType)

  const { data, loading, error } = useClientQuery<NotificationsListQuery>({
    query: graphql`
      query NotificationsListQuery($types: [NotificationTypesEnum]) {
        viewer {
          ...NotificationsList_viewer @arguments(types: $types)
        }
      }
    `,
    variables: {
      types,
    },
  })

  if (loading) return <NotificationsListPlaceholder />

  if (error || !data?.viewer) {
    return (
      <Flex justifyContent="center">
        <Text variant="xs" color="red100">
          Sorry, something went wrong...
        </Text>
      </Flex>
    )
  }

  return (
    <NotificationsList
      mode={mode}
      viewer={data?.viewer}
      paginationType={paginationType}
      type={notificationType}
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
  if (type === "offers") {
    return ["PARTNER_OFFER_CREATED"]
  }

  return []
}
