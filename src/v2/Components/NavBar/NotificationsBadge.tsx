import { Box, color, Flex, Sans, space } from "@artsy/palette"
import { NotificationsMenuQueryResponse } from "v2/__generated__/NotificationsMenuQuery.graphql"
import { SystemContext } from "v2/Artsy"
import cookie from "cookies-js"
import React, { useContext } from "react"
import styled from "styled-components"
import { get } from "v2/Utils/get"
import createLogger from "v2/Utils/logger"
import { NotificationsQueryRenderer } from "./Menus"

const logger = createLogger("Components/NavBar")

export const NotificationsBadge: React.FC<{}> = () => {
  const isClient = typeof window !== "undefined"
  return isClient ? (
    <NotificationsQueryRenderer
      render={({
        error,
        props,
      }: {
        error?: Error
        props?: NotificationsMenuQueryResponse
      }) => {
        // If there's an error hide the badge
        if (error) {
          logger.error(error)
          return null
        }

        // Fetching. If there's a notification count stored in a cookie, display it
        if (!props) {
          return <CircularCount />
        }

        // Get the unread notification count from the server
        const totalUnread = get(
          props,
          p => {
            return p.me.unreadNotificationsCount
          },
          0
        )

        const count = totalUnread

        // User has no notifications; clear the cookie
        if (count === 0) {
          cookie.expire("notification-count")
          return null
        }

        const displayCount = count >= 100 ? "99+" : count.toLocaleString()

        // Update the notification bad with the count, and store it in a cookie
        // so that subsequent page views don't need a fetch in order to render
        // the badge.
        if (count > 0) {
          const cachedNotificationCount = Number(
            cookie.get("notification-count")
          )
          if (count !== cachedNotificationCount) {
            // In force, when a request is made to `/notifications` endpoint,
            // sd.NOTIFICATIONS_COUNT is populated by this cookie.
            cookie.set("notification-count", displayCount)
          }
        }

        return (
          <Box>
            <CircularCount count={displayCount} />
          </Box>
        )
      }}
    />
  ) : (
      <CircularCount />
    )
}

const CircularCount: React.FC<{
  /**
   * Formatted count for display
   */
  count?: string
}> = ({ count }) => {
  // Check to see if we've got a value from sharify, populated by a cookie on
  // the server.
  const { notificationCount } = useContext(SystemContext)
  const notificationsLabel = count || notificationCount

  if (!notificationsLabel) {
    return null
  }

  return (
    <Container>
      <Sans size="1" weight="medium" color="white100">
        {notificationsLabel}
      </Sans>
    </Container>
  )
}

const Container = styled(Flex)`
  background-color: ${color("purple100")};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${space(1)}px;
  left: 15px;
`
