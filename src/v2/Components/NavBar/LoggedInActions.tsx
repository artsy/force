import React, { useContext } from "react"
import { NavItem } from "./NavItem"
import { NotificationsMenu, UserMenu } from "./Menus"
import { AnalyticsSchema, SystemContext, useTracking } from "v2/System"
import { BellIcon, EnvelopeIcon, SoloIcon } from "@artsy/palette"
import { graphql } from "relay-runtime"
import { SystemQueryRenderer as QueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  LoggedInActionsQuery,
  LoggedInActionsQueryResponse,
} from "v2/__generated__/LoggedInActionsQuery.graphql"
import { isServer } from "lib/isServer"
import { NotificationOverlay } from "./NotificationOverlay"
import {
  getConversationCount,
  getNotificationCount,
  updateConversationCache,
  updateNotificationCache,
} from "./helpers"

/** Displays action icons for logged in users such as inbox, profile, and notifications */
export const LoggedInActions: React.FC<
  { error?: any } & Partial<LoggedInActionsQueryResponse>
> = ({ me }) => {
  const { trackEvent } = useTracking()
  const hasUnreadNotifications =
    // @ts-expect-error STRICT_NULL_CHECK
    me?.unreadNotificationsCount > 0 || getNotificationCount() > 0
  updateNotificationCache(me?.unreadNotificationsCount)
  const hasUnreadConversations =
    // @ts-expect-error STRICT_NULL_CHECK
    me?.unreadConversationCount > 0 || getConversationCount() > 0
  updateConversationCache(me?.unreadConversationCount)

  return (
    <>
      <NavItem
        href="/works-for-you"
        Menu={NotificationsMenu}
        menuAnchor="right"
        Overlay={() => (
          <NotificationOverlay showOverlay={hasUnreadNotifications} />
        )}
        onClick={() => {
          trackEvent({
            action_type: AnalyticsSchema.ActionType.Click,
            subject: AnalyticsSchema.Subject.NotificationBell,
            new_notification_count: getNotificationCount(),
            destination_path: "/works-for-you",
          })
        }}
      >
        {({ hover }) => {
          return (
            <BellIcon
              fill={hover ? "blue100" : "black80"}
              title="Notifications"
            />
          )
        }}
      </NavItem>
      <NavItem
        href="/user/conversations"
        Overlay={() => (
          <NotificationOverlay showOverlay={hasUnreadConversations} />
        )}
      >
        {({ hover }) => {
          return (
            <EnvelopeIcon title="Inbox" fill={hover ? "blue100" : "black80"} />
          )
        }}
      </NavItem>
      <NavItem Menu={UserMenu} menuAnchor="right">
        {({ hover }) => {
          return (
            <SoloIcon
              fill={hover ? "blue100" : "black80"}
              title="Your account"
            />
          )
        }}
      </NavItem>
    </>
  )
}

export const LoggedInActionsQueryRenderer: React.FC<{}> = () => {
  const { relayEnvironment } = useContext(SystemContext)

  return isServer ? (
    <LoggedInActions />
  ) : (
    <QueryRenderer<LoggedInActionsQuery>
      environment={relayEnvironment}
      query={graphql`
        query LoggedInActionsQuery {
          me {
            unreadNotificationsCount
            unreadConversationCount
            followsAndSaves {
              notifications: bundledArtworksByArtistConnection(
                sort: PUBLISHED_AT_DESC
                first: 10
              ) @connection(key: "WorksForYou_notifications") {
                edges {
                  node {
                    href
                    summary
                    artists
                    published_at: publishedAt(format: "MMM DD")
                    image {
                      resized(height: 40, width: 40) {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        return <LoggedInActions error={error} {...props} />
      }}
    />
  )
}
