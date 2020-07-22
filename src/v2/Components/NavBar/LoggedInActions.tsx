import React, { useContext } from "react"
import { NavItem } from "./NavItem"
import { NotificationsMenu, UserMenu } from "./Menus"
import {
  AnalyticsSchema,
  SystemContext,
  useSystemContext,
  useTracking,
} from "v2/Artsy"
import { BellIcon, EnvelopeIcon, SoloIcon } from "@artsy/palette"
import { graphql } from "relay-runtime"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import {
  LoggedInActionsQuery,
  LoggedInActionsQueryResponse,
} from "v2/__generated__/LoggedInActionsQuery.graphql"
import { userHasLabFeature } from "v2/Utils/user"
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
> = ({ error, me }) => {
  const { trackEvent } = useTracking()
  const { user } = useSystemContext()
  const hasUnreadNotifications =
    me?.unreadNotificationsCount > 0 || getNotificationCount() > 0
  updateNotificationCache(me?.unreadNotificationsCount)
  const conversationsEnabled = userHasLabFeature(
    user,
    "User Conversations View"
  )
  const hasUnreadConversations =
    (conversationsEnabled && me?.unreadConversationCount > 0) ||
    getConversationCount() > 0
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
              fill={hover ? "purple100" : "black80"}
              title="Notifications"
            />
          )
        }}
      </NavItem>
      {conversationsEnabled && (
        <NavItem
          href="/user/conversations"
          Overlay={() => (
            <NotificationOverlay showOverlay={hasUnreadConversations} />
          )}
        >
          {({ hover }) => {
            return (
              <EnvelopeIcon
                title="Inbox"
                fill={hover ? "purple100" : "black80"}
              />
            )
          }}
        </NavItem>
      )}
      <NavItem Menu={UserMenu} menuAnchor="right">
        {({ hover }) => {
          return (
            <SoloIcon
              fill={hover ? "purple100" : "black80"}
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
