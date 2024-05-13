import { Flex, Image, Join, Spacer, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import {
  ExpiresInTimer,
  shouldDisplayExpiresInTimer,
} from "Components/Notifications/ExpiresInTimer"
import { useNotificationsContext } from "Components/Notifications/Hooks/useNotificationsContext"
import { useNotificationsTracking } from "Components/Notifications/Hooks/useNotificationsTracking"
import { markNotificationAsRead } from "Components/Notifications/Mutations/markNotificationAsRead"
import { SUPPORTED_NOTIFICATION_TYPES } from "Components/Notifications/Notification"
import { RouterLink } from "System/Router/RouterLink"
import { useSystemContext } from "System/useSystemContext"
import createLogger from "Utils/logger"
import { NotificationItem_item$data } from "__generated__/NotificationItem_item.graphql"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { NotificationTypeLabel } from "./NotificationTypeLabel"
import { isArtworksBasedNotification } from "./util"

const logger = createLogger("NotificationItem")

interface NotificationItemProps {
  item: NotificationItem_item$data
}

const UNREAD_INDICATOR_SIZE = 8

const NotificationItem: FC<NotificationItemProps> = ({ item }) => {
  const { tracking } = useNotificationsTracking()
  const { relayEnvironment } = useSystemContext()
  const {
    state: { currentNotificationId },
  } = useNotificationsContext()
  const remainingArtworksCount = item.objectsCount - 4
  const shouldDisplayCounts =
    isArtworksBasedNotification(item.notificationType) &&
    remainingArtworksCount > 0

  const markAsRead = async () => {
    // If the notification is opened as a page, we don't need to mark the notification as read
    // because it's already marked as read when the page is opened.
    if (SUPPORTED_NOTIFICATION_TYPES.includes(item.notificationType)) {
      return
    }
    if (!relayEnvironment) {
      return
    }

    try {
      const response = await markNotificationAsRead(
        relayEnvironment,
        item.id,
        item.internalID
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

  const handlePress = () => {
    markAsRead()

    tracking.clickedActivityPanelNotificationItem(item.notificationType)
  }

  const itemUrl = getNotificationUrl(item)

  const subTitle = getNotificationSubTitle(item)

  return (
    <NotificationItemLink
      to={itemUrl}
      onClick={handlePress}
      backgroundColor={
        currentNotificationId === item.internalID ? "black5" : "white100"
      }
    >
      <Flex flex={1} flexDirection="column">
        {!!item.previewImages.length && (
          <Flex flexDirection="row" alignItems="center" mb={0.5}>
            <Flex flex={1}>
              <Join separator={<Spacer x={1} />}>
                {item.previewImages.map(image => {
                  if (!image.url) return null

                  return (
                    <Image
                      key={image.url}
                      src={image.url}
                      alt={"Activity artwork image"}
                      width={58}
                      height={58}
                      lazyLoad
                      placeHolderURL={image.blurhashDataURL ?? undefined}
                    />
                  )
                })}
              </Join>
            </Flex>

            {shouldDisplayCounts && (
              <Text
                variant="xs"
                color="black60"
                aria-label="Remaining artworks count"
                ml={1}
              >
                + {remainingArtworksCount}
              </Text>
            )}
          </Flex>
        )}

        <Text
          variant="xs"
          color="blue100"
          backgroundColor="blue10"
          px={0.5}
          alignSelf="flex-start"
          borderRadius={3}
        >
          {getNotificationPrelude(item)}
        </Text>

        <Text fontWeight="bold" variant="sm-display">
          {item.headline}
        </Text>

        {!!subTitle && <Text variant="xs">{subTitle}</Text>}

        <Flex flexDirection="row" gap={0.5}>
          <NotificationTypeLabel notification={item} />
          {shouldDisplayExpiresInTimer(item) && (
            <ExpiresInTimer
              expiresAt={item.item?.expiresAt}
              available={item.item?.available}
            />
          )}
        </Flex>
      </Flex>

      {item.isUnread && (
        <Flex
          width={UNREAD_INDICATOR_SIZE}
          height={UNREAD_INDICATOR_SIZE}
          borderRadius={UNREAD_INDICATOR_SIZE / 2}
          ml={1}
          bg="blue100"
          aria-label="Unread notification indicator"
        />
      )}
    </NotificationItemLink>
  )
}

export const NotificationItemFragmentContainer = createFragmentContainer(
  NotificationItem,
  {
    item: graphql`
      fragment NotificationItem_item on Notification {
        id
        internalID
        headline
        message
        targetHref
        isUnread
        notificationType
        objectsCount
        item {
          ... on PartnerOfferCreatedNotificationItem {
            available
            expiresAt
          }
        }
        previewImages(size: 4) {
          blurhashDataURL
          url(version: "thumbnail")
        }
        title
        ...NotificationTypeLabel_notification
      }
    `,
  }
)

const NotificationItemLink = styled(RouterLink)`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    background-color: ${themeGet("colors.black5")};
  }
`

NotificationItemLink.defaultProps = {
  p: 2,
}

/**
 * Until we support all notification types in the new activity panel,
 * we only link to the notification detail page for the supported types.
 */
const getNotificationUrl = (notification: NotificationItem_item$data) => {
  if (SUPPORTED_NOTIFICATION_TYPES.includes(notification.notificationType)) {
    return `/notification/${notification.internalID}`
  }

  return notification.targetHref
}

const getNotificationPrelude = (item: NotificationItem_item$data) => {
  switch (item.notificationType) {
    case "PARTNER_OFFER_CREATED":
      return "Limited-Time Offer"
    default:
      return null
  }
}

const getNotificationSubTitle = (item: NotificationItem_item$data) => {
  switch (item.notificationType) {
    case "ARTICLE_FEATURED_ARTIST":
      return "An artist you follow is featured"
    default:
      return null
  }
}
