import { Flex, Image, Join, Spacer, Text } from "@artsy/palette"
import { ExpiresInTimer } from "Components/Notifications/ExpiresInTimer"
import { useNotificationsContext } from "Components/Notifications/Hooks/useNotificationsContext"
import { useNotificationsTracking } from "Components/Notifications/Hooks/useNotificationsTracking"
import { useMarkNotificationAsRead } from "Components/Notifications/Mutations/markNotificationAsRead"
import { SUPPORTED_NOTIFICATION_TYPES } from "Components/Notifications/Notification"
import { RouterLink } from "System/Components/RouterLink"
import createLogger from "Utils/logger"
import { NotificationItem_notification$data } from "__generated__/NotificationItem_notification.graphql"
import { FC, useCallback } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationTypeLabel } from "./NotificationTypeLabel"
import { isArtworksBasedNotification } from "./util"
import { NotificationListMode } from "Components/Notifications/NotificationsWrapper"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"
import { Media } from "Utils/Responsive"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { NotificationItemCollectorProfileUpdatePrompt } from "Components/Notifications/NotificationItemCollectorProfileUpdatePrompt"
import { NotificationItemUnreadIndicator } from "Components/Notifications/NotificationItemUnreadIndicator"

const logger = createLogger("NotificationItem")

interface NotificationItemProps {
  notification: NotificationItem_notification$data
  mode?: NotificationListMode
}

const NotificationItem: FC<NotificationItemProps> = ({
  notification,
  mode,
}) => {
  const {
    state: { currentNotificationId },
  } = useNotificationsContext()
  const { tracking } = useNotificationsTracking()
  const { markAsRead } = useMarkNotificationAsRead()

  const handleClick = () => {
    markAsRead({
      id: notification.id,
      internalID: notification.internalID,
    }).catch(logger.error)

    tracking.clickedActivityPanelNotificationItem(notification.notificationType)
  }

  const isActive = currentNotificationId === notification.internalID

  if (!notification.item) return null

  switch (notification.item.__typename) {
    case "CollectorProfileUpdatePromptNotificationItem": {
      return (
        <NotificationItemCollectorProfileUpdatePrompt
          isActive={isActive}
          isUnread={notification.isUnread}
          notificationItem={notification.item}
          onClick={handleClick}
        />
      )
    }

    // FIXME: Simplify by returning unique components for each notification type
    default: {
      const remainingArtworksCount = notification.objectsCount - 4
      const shouldDisplayCounts =
        isArtworksBasedNotification(notification.notificationType) &&
        remainingArtworksCount > 0

      const subTitle = getNotificationSubTitle(notification)

      return (
        <NotificationItemWrapper
          item={notification}
          mode={mode}
          onClick={handleClick}
        >
          <Flex
            flex={1}
            flexDirection={
              notification.notificationType === "PARTNER_OFFER_CREATED"
                ? "row"
                : "column"
            }
          >
            {!!notification.previewImages.length && (
              <Flex flexDirection="row" alignItems="center" mb={0.5}>
                <Flex flex={1}>
                  <Join separator={<Spacer x={1} />}>
                    {notification.previewImages.map(image => {
                      if (!image.url) return null

                      return (
                        <Image
                          key={image.url}
                          src={image.url}
                          alt=""
                          width={58}
                          height={58}
                          lazyLoad
                          placeHolderURL={image.blurhashDataURL ?? undefined}
                        />
                      )
                    })}
                  </Join>
                  <Spacer x={1} />
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

            <Flex flexDirection="column">
              <Text
                variant="xs"
                color="blue100"
                backgroundColor="blue10"
                px={0.5}
                alignSelf="flex-start"
                borderRadius={3}
              >
                {getNotificationPrelude(notification)}
              </Text>

              <Text fontWeight="bold" variant="sm-display">
                {notification.headline}
              </Text>

              {!!subTitle && <Text variant="xs">{subTitle}</Text>}

              <Flex flexDirection="row" gap={0.5}>
                <NotificationTypeLabel notification={notification} />
                {notification.item?.__typename ===
                  "PartnerOfferCreatedNotificationItem" &&
                  notification.item.expiresAt && (
                    <ExpiresInTimer
                      expiresAt={notification.item.expiresAt}
                      available={notification.item.available}
                    />
                  )}
              </Flex>
            </Flex>
          </Flex>

          {notification.isUnread && <NotificationItemUnreadIndicator ml={1} />}
        </NotificationItemWrapper>
      )
    }
  }
}

export const NotificationItemFragmentContainer = createFragmentContainer(
  NotificationItem,
  {
    notification: graphql`
      fragment NotificationItem_notification on Notification {
        id
        internalID
        headline
        message
        targetHref
        isUnread
        notificationType
        objectsCount
        item {
          ...NotificationItemCollectorProfileUpdatePrompt_notificationItem
          __typename
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

interface NotificationItemWrapperProps {
  item: NotificationItem_notification$data
  mode?: NotificationListMode
  children: React.ReactNode
  onClick: () => void
}

export const NotificationItemWrapper: FC<NotificationItemWrapperProps> = ({
  item,
  mode,
  children,
  onClick,
}) => {
  const {
    state: { currentNotificationId },
  } = useNotificationsContext()

  const itemUrl = useCallback((item, mode) => {
    return getNotificationUrl(item, mode)
  }, [])

  const backgroundColor =
    currentNotificationId === item.internalID ? "black5" : "white100"

  return (
    <>
      <Media at="xs">
        <NotificationItemLink
          to={itemUrl(item, "dropdown")}
          onClick={onClick}
          backgroundColor={backgroundColor}
        >
          {children}
        </NotificationItemLink>
      </Media>

      <Media greaterThan="xs">
        <NotificationItemLink
          to={itemUrl(item, mode)}
          onClick={onClick}
          backgroundColor={backgroundColor}
        >
          {children}
        </NotificationItemLink>
      </Media>
    </>
  )
}

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
const getNotificationUrl = (
  notification: NotificationItem_notification$data,
  mode: NotificationListMode = "page"
) => {
  // Notification response has targetHref field (computed on backend), which for
  // most notifications accounts for "objectsCount". If there is only one object,
  // targetHref usually points to the object URL (/artwork/:id, /show/:id, etc.).
  // In dropdown mode, when there is only one object, we want to link directly to
  // the object URL. Otherwise, we link to the notification detail page.
  if (
    mode === "dropdown" &&
    notification.objectsCount === 1 &&
    notification.notificationType !== "PARTNER_OFFER_CREATED"
  ) {
    return notification.targetHref
  }

  if (SUPPORTED_NOTIFICATION_TYPES.includes(notification.notificationType)) {
    return `/notification/${notification.internalID}`
  }

  return notification.targetHref
}

const getNotificationPrelude = (item: NotificationItem_notification$data) => {
  switch (item.notificationType) {
    case "PARTNER_OFFER_CREATED":
      return "Limited-Time Offer"
    default:
      return null
  }
}

const getNotificationSubTitle = (item: NotificationItem_notification$data) => {
  switch (item.notificationType) {
    case "ARTICLE_FEATURED_ARTIST":
      return "An artist you follow is featured"
    default:
      return null
  }
}
