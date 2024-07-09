import {
  Box,
  Flex,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
} from "@artsy/palette"
import { graphql } from "react-relay"
import { NotificationQuery } from "__generated__/NotificationQuery.graphql"
import { useNotificationsContext } from "Components/Notifications/Hooks/useNotificationsContext"
import { useEffect } from "react"
import { ArtworkPublishedNotification } from "Components/Notifications/ArtworkPublishedNotification"
import { AlertNotification } from "Components/Notifications/AlertNotification"
import { useRouter } from "System/Hooks/useRouter"
import { ArticleFeaturedArtistNotification } from "Components/Notifications/ArticleFeaturedArtistNotification"
import { PartnerOfferCreatedNotification } from "Components/Notifications/PartnerOfferCreatedNotification"
import { CARD_MAX_WIDTH } from "Components/Notifications/constants"
import { ViewingRoomPublishedNotification } from "Components/Notifications/ViewingRoomPublishedNotification"
import { markNotificationAsRead } from "Components/Notifications/Mutations/markNotificationAsRead"
import { useSystemContext } from "System/Hooks/useSystemContext"
import createLogger from "Utils/logger"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { PartnerShowOpenedNotification } from "Components/Notifications/PartnerShowOpenedNotification"
import { DESKTOP_HEIGHT } from "Apps/Notifications/notificationsutils"

const logger = createLogger("NotificationItem")

export const NOTIFICATION_MAX_WIDTH = 600
export const SUPPORTED_NOTIFICATION_TYPES = [
  "ARTWORK_ALERT",
  "ARTWORK_PUBLISHED",
  "ARTICLE_FEATURED_ARTIST",
  "PARTNER_OFFER_CREATED",
  "VIEWING_ROOM_PUBLISHED",
  "PARTNER_SHOW_OPENED",
]

interface NotificationProps {
  notificationId: string
}

export const NotificationWrapper: React.FC = ({ children }) => (
  <Flex
    flexDirection="column"
    height={["auto", DESKTOP_HEIGHT]}
    overflow="auto"
  >
    <Box>{children}</Box>
  </Flex>
)

const Notification: React.FC<NotificationProps> = ({ notificationId }) => {
  const { relayEnvironment } = useSystemContext()
  const { router } = useRouter()

  const { data, loading, error } = useClientQuery<NotificationQuery>({
    query: notificationQuery,
    variables: { internalID: notificationId },
  })

  const notification = data?.me?.notification

  // Redirect user to the notifications targetHref if the notification type is not supported
  useEffect(() => {
    if (
      notification &&
      !SUPPORTED_NOTIFICATION_TYPES.includes(
        notification?.notificationType as string
      )
    ) {
      router.replace(notification?.targetHref as string)
    }
  }, [notification, router])

  useEffect(() => {
    if (!notification) {
      return
    }

    markAsRead()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification])

  const markAsRead = async () => {
    if (!relayEnvironment || !notification) {
      return
    }

    try {
      const response = await markNotificationAsRead(
        relayEnvironment,
        notification.id,
        notification.internalID
      )
      const responseOrError = response.markNotificationAsRead?.responseOrError
      const errorMessage = responseOrError?.mutationError?.message

      if (errorMessage) {
        throw new Error(errorMessage)
      }
    } catch (error) {
      logger.error(error)
    }
  }

  if (loading) {
    return <Placeholder />
  }

  if (error || !notification) {
    logger.error(error)

    return <NotificationErrorMessage />
  }

  switch (notification?.notificationType) {
    case "ARTWORK_ALERT":
      return <AlertNotification notification={data.me?.notification} />
    case "ARTWORK_PUBLISHED":
      return (
        <ArtworkPublishedNotification notification={data.me?.notification} />
      )
    case "ARTICLE_FEATURED_ARTIST":
      return (
        <ArticleFeaturedArtistNotification
          notification={data.me?.notification}
        />
      )
    case "PARTNER_OFFER_CREATED":
      return (
        <PartnerOfferCreatedNotification notification={data.me?.notification} />
      )
    case "PARTNER_SHOW_OPENED":
      return (
        <PartnerShowOpenedNotification notification={data.me?.notification} />
      )
    case "VIEWING_ROOM_PUBLISHED":
      return (
        <ViewingRoomPublishedNotification
          notification={data.me?.notification}
        />
      )
    default:
      return null
  }
}

export const NotificationQueryRenderer: React.FC = props => {
  const { state } = useNotificationsContext()

  if (!state.currentNotificationId) {
    return null
  }

  return (
    <Box mx={[2, 4]} my={2}>
      <Notification notificationId={state.currentNotificationId} {...props} />
    </Box>
  )
}

const notificationQuery = graphql`
  query NotificationQuery($internalID: String!) {
    me {
      notification(id: $internalID) {
        id
        internalID
        notificationType
        targetHref

        ...AlertNotification_notification
        ...ArtworkPublishedNotification_notification
        ...ArticleFeaturedArtistNotification_notification
        ...PartnerOfferCreatedNotification_notification
        ...PartnerShowOpenedNotification_notification
        ...ViewingRoomPublishedNotification_notification
      }
    }
  }
`

export const Placeholder: React.FC = () => (
  <Flex flexDirection="column">
    <Skeleton>
      <SkeletonText variant="xl">Name of the Artist</SkeletonText>

      <SkeletonText variant="xs">Alert - Today</SkeletonText>

      <Spacer y={0.5} />

      <SkeletonBox width={130} height={30} />

      <Spacer y={4} />

      <Flex flexDirection="column" alignItems="center">
        <SkeletonBox
          width={["100%", CARD_MAX_WIDTH]}
          height={CARD_MAX_WIDTH}
          mb={4}
        />
      </Flex>
    </Skeleton>
  </Flex>
)
