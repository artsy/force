import { AlertNotification } from "Components/Notifications/AlertNotification"
import { ArticleFeaturedArtistNotification } from "Components/Notifications/ArticleFeaturedArtistNotification"
import { ArtworkPublishedNotification } from "Components/Notifications/ArtworkPublishedNotification"
import { CARD_MAX_WIDTH } from "Components/Notifications/constants"
import { useNotificationsContext } from "Components/Notifications/Hooks/useNotificationsContext"
import { markNotificationAsRead } from "Components/Notifications/Mutations/markNotificationAsRead"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"
import { PartnerOfferCreatedNotification } from "Components/Notifications/PartnerOfferCreatedNotification"
import { PartnerShowOpenedNotification } from "Components/Notifications/PartnerShowOpenedNotification"
import { ViewingRoomPublishedNotification } from "Components/Notifications/ViewingRoomPublishedNotification"
import { ErrorBoundary } from "System/Components/ErrorBoundary"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import createLogger from "Utils/logger"
import {
  Box,
  Flex,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
} from "@artsy/palette"
import type {
  NotificationQuery,
  NotificationTypesEnum,
} from "__generated__/NotificationQuery.graphql"
import { error } from "console"
import { Suspense, useEffect } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"

const logger = createLogger("NotificationItem")

// FIXME: Should probably be a column span
export const NOTIFICATION_MAX_WIDTH = 600
export const SUPPORTED_NOTIFICATION_TYPES: NotificationTypesEnum[] = [
  "ARTWORK_ALERT",
  "ARTWORK_PUBLISHED",
  "ARTICLE_FEATURED_ARTIST",
  "PARTNER_OFFER_CREATED",
  "VIEWING_ROOM_PUBLISHED",
  "PARTNER_SHOW_OPENED",
  "COLLECTOR_PROFILE_UPDATE_PROMPT",
]

interface NotificationProps {
  notificationId: string
}

const Notification: React.FC<React.PropsWithChildren<NotificationProps>> = ({
  notificationId,
}) => {
  const { relayEnvironment } = useSystemContext()
  const { router } = useRouter()

  const data = useLazyLoadQuery<NotificationQuery>(notificationQuery, {
    internalID: notificationId,
  })

  const notification = data?.me?.notification

  // Redirect user to the notifications targetHref if the notification type is not supported
  useEffect(() => {
    if (
      notification &&
      !SUPPORTED_NOTIFICATION_TYPES.includes(notification?.notificationType)
    ) {
      router.push(notification?.targetHref as string)
    }
  }, [notification, router])

  useEffect(() => {
    if (!notification) return

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

    markAsRead()
  }, [notification, relayEnvironment])

  if (!notification) {
    logger.error(error)

    return <NotificationErrorMessage />
  }

  switch (notification?.notificationType) {
    case "ARTWORK_ALERT": {
      return <AlertNotification notification={notification} />
    }

    case "ARTWORK_PUBLISHED":
      return <ArtworkPublishedNotification notification={notification} />

    case "ARTICLE_FEATURED_ARTIST":
      return <ArticleFeaturedArtistNotification notification={notification} />

    case "PARTNER_OFFER_CREATED":
      return <PartnerOfferCreatedNotification notification={notification} />

    case "PARTNER_SHOW_OPENED":
      return <PartnerShowOpenedNotification notification={notification} />

    case "VIEWING_ROOM_PUBLISHED":
      return <ViewingRoomPublishedNotification notification={notification} />

    default:
      return null
  }
}

export const NotificationQueryRenderer: React.FC<
  React.PropsWithChildren<unknown>
> = props => {
  const { state } = useNotificationsContext()

  if (!state.currentNotificationId) {
    return null
  }

  return (
    // FIXME: Should not have external margins
    <Box mx={[2, 4]} my={2}>
      <ErrorBoundary>
        <Suspense fallback={<Placeholder />}>
          <Notification
            notificationId={state.currentNotificationId}
            {...props}
          />
        </Suspense>
      </ErrorBoundary>
    </Box>
  )
}

const notificationQuery = graphql`
  query NotificationQuery($internalID: String!) {
    me {
      notification(id: $internalID) {
        ...AlertNotification_notification
        ...ArtworkPublishedNotification_notification
        ...ArticleFeaturedArtistNotification_notification
        ...PartnerOfferCreatedNotification_notification
        ...PartnerShowOpenedNotification_notification
        ...ViewingRoomPublishedNotification_notification
        id
        internalID
        notificationType
        targetHref
      }
    }
  }
`

export const Placeholder: React.FC<React.PropsWithChildren<unknown>> = () => (
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
