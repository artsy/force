import React, { useContext } from "react"
import { NavItem } from "./NavItem"
import { NotificationsMenu, UserMenu } from "./Menus"
import { NotificationsBadge } from "./NotificationsBadge"
import {
  AnalyticsSchema,
  SystemContext,
  useSystemContext,
  useTracking,
} from "v2/Artsy"
import { BellIcon, EnvelopeIcon, SoloIcon } from "@artsy/palette"
import { graphql } from "relay-runtime"
import {
  LoadProgressRenderer,
  renderWithLoadProgress,
} from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import { LoggedInActionsQuery } from "v2/__generated__/LoggedInActionsQuery.graphql"
import { userHasLabFeature } from "v2/Utils/user"
import cookie from "cookies-js"

const getNotificationCount = () => cookie.get("notification-count") || 0

export const LoggedInActions: React.FC<{}> = () => {
  const { trackEvent } = useTracking()
  const { user } = useSystemContext()
  const conversationsEnabled = userHasLabFeature(
    user,
    "User Conversations View"
  )
  return (
    <>
      <NavItem
        href="/works-for-you"
        Menu={NotificationsMenu}
        Overlay={NotificationsBadge}
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
          if (hover) {
            trackEvent({
              action_type: AnalyticsSchema.ActionType.Hover,
              subject: AnalyticsSchema.Subject.NotificationBell,
              new_notification_count: getNotificationCount(),
            })
          }
          return <BellIcon fill={hover ? "purple100" : "black80"} />
        }}
      </NavItem>
      {conversationsEnabled && (
        <NavItem href="/user/conversations">
          {({ hover }) => {
            return <EnvelopeIcon fill={hover ? "purple100" : "black80"} />
          }}
        </NavItem>
      )}
      <NavItem Menu={UserMenu}>
        {({ hover }) => {
          if (hover) {
            trackEvent({
              action_type: AnalyticsSchema.ActionType.Hover,
              subject: "User",
            })
          }
          return <SoloIcon fill={hover ? "purple100" : "black80"} />
        }}
      </NavItem>
    </>
  )
}

export const LoggedInActionsQueryRenderer: React.FC<{
  render: LoadProgressRenderer<any>
}> = ({ render }) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<LoggedInActionsQuery>
      environment={relayEnvironment}
      query={graphql`
        query LoggedInActionsQuery {
          me {
            unreadNotificationsCount
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
      render={() => {
        return (
          <LoggedInActionsQueryRenderer
            render={renderWithLoadProgress(
              LoggedInActions,
              {},
              {},
              { size: "small" }
            )}
          />
        )
      }}
    />
  )
}
