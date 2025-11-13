import { ExpiresInTimer } from "Components/Notifications/ExpiresInTimer"
import { useNotificationsContext } from "Components/Notifications/Hooks/useNotificationsContext"
import { useNotificationsTracking } from "Components/Notifications/Hooks/useNotificationsTracking"
import { useMarkNotificationAsRead } from "Components/Notifications/Mutations/markNotificationAsRead"
import { SUPPORTED_NOTIFICATION_TYPES } from "Components/Notifications/Notification"
import { NotificationItemUnreadIndicator } from "Components/Notifications/NotificationItemUnreadIndicator"
import type { NotificationListMode } from "Components/Notifications/NotificationsWrapper"
import { RouterLink } from "System/Components/RouterLink"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import {
  Flex,
  HorizontalOverflow,
  Image,
  Spacer,
  Stack,
  Text,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import type { NotificationItem_notification$data } from "__generated__/NotificationItem_notification.graphql"
import { type FC, useCallback, useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { NotificationTypeLabel } from "./NotificationTypeLabel"
import { isArtworksBasedNotification } from "./util"

const logger = createLogger("NotificationItem")

interface NotificationItemProps {
  notification: NotificationItem_notification$data
  mode?: NotificationListMode
}

const NotificationItem: FC<React.PropsWithChildren<NotificationItemProps>> = ({
  notification,
  mode,
}) => {
  const { tracking } = useNotificationsTracking()
  const { markAsRead } = useMarkNotificationAsRead()

  const handleClick = () => {
    markAsRead({
      id: notification.id,
      internalID: notification.internalID,
    }).catch(logger.error)

    tracking.clickedActivityPanelNotificationItem(notification.notificationType)
  }

  if (!notification.item) return null

  const remainingArtworksCount = notification.objectsCount - 4
  const shouldDisplayCounts =
    isArtworksBasedNotification(notification.notificationType) &&
    remainingArtworksCount > 0

  const subTitle = getNotificationSubTitle(notification)

  const images = useMemo(
    () =>
      notification.previewImages.filter(
        image => image.resized?.width && image.resized?.height
      ),
    [notification.previewImages]
  )

  return (
    <NotificationItemWrapper
      item={notification}
      mode={mode}
      onClick={handleClick}
    >
      <Flex
        flex={1}
        minWidth={0}
        {...(notification.notificationType === "PARTNER_OFFER_CREATED"
          ? { flexDirection: "row", gap: 1 }
          : { flexDirection: "column" })}
      >
        {images.length > 0 && (
          <Stack flexDirection="row" alignItems="center" mb={0.5} gap={1}>
            <HorizontalOverflow height={58} width="100%">
              <Stack gap={1} flexDirection="row">
                {images.map((image, index) => {
                  if (!image.resized) return null

                  return (
                    <Image
                      key={index}
                      src={image.resized.src}
                      srcSet={image.resized.srcSet}
                      width={image.resized.width}
                      height="100%"
                      lazyLoad
                      alt=""
                    />
                  )
                })}
              </Stack>

              {shouldDisplayCounts && (
                <>
                  <Spacer x={1} />

                  <Text
                    variant="xs"
                    color="mono60"
                    aria-label="Remaining artworks count"
                    display="flex"
                    alignItems="center"
                  >
                    + {remainingArtworksCount}
                  </Text>
                </>
              )}
            </HorizontalOverflow>
          </Stack>
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
          __typename
          ... on PartnerOfferCreatedNotificationItem {
            available
            expiresAt
          }
        }
        previewImages(size: 4) {
          internalID
          resized(
            height: 58
            version: ["main", "normalized", "larger", "large"]
          ) {
            src
            srcSet
            height
            width
          }
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

export const NotificationItemWrapper: FC<
  React.PropsWithChildren<NotificationItemWrapperProps>
> = ({ item, mode, children, onClick }) => {
  const {
    state: { currentNotificationId },
  } = useNotificationsContext()

  const itemUrl = useCallback((item, mode) => {
    return getNotificationUrl(item, mode)
  }, [])

  const backgroundColor =
    currentNotificationId === item.internalID ? "mono5" : "mono0"

  return (
    <>
      <Media at="xs">
        <NotificationItemLink
          to={itemUrl(item, "dropdown")}
          onClick={onClick}
          backgroundColor={backgroundColor}
          enablePrefetch={false}
        >
          {children}
        </NotificationItemLink>
      </Media>

      <Media greaterThan="xs">
        <NotificationItemLink
          to={itemUrl(item, mode)}
          onClick={onClick}
          backgroundColor={backgroundColor}
          enablePrefetch={false}
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
  overflow: hidden;

  &:hover {
    background-color: ${themeGet("colors.mono5")};
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
