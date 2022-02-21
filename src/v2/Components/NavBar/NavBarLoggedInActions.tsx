import { useContext } from "react"
import * as React from "react"
import { NavBarNotificationsQueryRenderer, NavBarUserMenu } from "./Menus"
import { AnalyticsSchema, SystemContext, useTracking } from "v2/System"
import {
  BellIcon,
  Dropdown,
  EnvelopeIcon,
  Flex,
  SoloIcon,
} from "@artsy/palette"
import { graphql } from "relay-runtime"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  NavBarLoggedInActionsQuery,
  NavBarLoggedInActionsQuery$data,
} from "v2/__generated__/NavBarLoggedInActionsQuery.graphql"
import { isServer } from "lib/isServer"
import {
  getConversationCount,
  getNotificationCount,
  updateConversationCache,
  updateNotificationCache,
} from "./helpers"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import {
  NavBarItemButton,
  NavBarItemLink,
  NavBarItemUnfocusableAnchor,
} from "./NavBarItem"
import { Z } from "v2/Apps/Components/constants"

/** Displays action icons for logged in users such as inbox, profile, and notifications */
export const NavBarLoggedInActions: React.FC<Partial<
  NavBarLoggedInActionsQuery$data
>> = ({ me }) => {
  const { trackEvent } = useTracking()

  const hasUnreadNotifications =
    (me?.unreadNotificationsCount ?? 0) > 0 || getNotificationCount() > 0
  const hasUnreadConversations =
    (me?.unreadConversationCount ?? 0) > 0 || getConversationCount() > 0

  updateNotificationCache(me?.unreadNotificationsCount)
  updateConversationCache(me?.unreadConversationCount)

  return (
    <>
      <Dropdown
        zIndex={Z.dropdown}
        dropdown={<NavBarNotificationsQueryRenderer />}
        placement="bottom-end"
        offset={0}
      >
        {({ anchorRef, anchorProps, visible }) => (
          <NavBarItemButton
            ref={anchorRef as any}
            active={visible}
            {...anchorProps}
          >
            <NavBarItemUnfocusableAnchor
              href="/works-for-you"
              onClick={() => {
                trackEvent({
                  action_type: AnalyticsSchema.ActionType.Click,
                  subject: AnalyticsSchema.Subject.NotificationBell,
                  new_notification_count: getNotificationCount(),
                  destination_path: "/works-for-you",
                })
              }}
            />

            <BellIcon
              title="Notifications"
              // @ts-ignore
              fill="currentColor"
            />

            {hasUnreadNotifications && (
              <NavBarLoggedInActionsNotificationIndicator />
            )}
          </NavBarItemButton>
        )}
      </Dropdown>

      <NavBarItemLink href="/user/conversations">
        <EnvelopeIcon
          title="Inbox"
          // @ts-ignore
          fill="currentColor"
        />

        {hasUnreadConversations && (
          <NavBarLoggedInActionsNotificationIndicator />
        )}
      </NavBarItemLink>

      <Dropdown
        zIndex={Z.dropdown}
        dropdown={<NavBarUserMenu />}
        placement="bottom-end"
        offset={0}
      >
        {({ anchorRef, anchorProps, visible }) => (
          <NavBarItemButton
            ref={anchorRef as any}
            px={0}
            pl={1}
            active={visible}
            {...anchorProps}
          >
            <SoloIcon
              title="Your account"
              // @ts-ignore
              fill="currentColor"
            />
          </NavBarItemButton>
        )}
      </Dropdown>
    </>
  )
}

export const NavBarLoggedInActionsQueryRenderer: React.FC<{}> = () => {
  const { relayEnvironment } = useContext(SystemContext)

  return isServer ? (
    <NavBarLoggedInActions />
  ) : (
    <SystemQueryRenderer<NavBarLoggedInActionsQuery>
      environment={relayEnvironment}
      query={graphql`
        query NavBarLoggedInActionsQuery {
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
      render={({ props }) => {
        return <NavBarLoggedInActions {...props} />
      }}
    />
  )
}

export const NavBarLoggedInActionsNotificationIndicator = styled(Flex).attrs({
  bg: "red100",
})`
  border-radius: 50%;
  width: 6px;
  height: 6px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${themeGet("space.2")};
  right: 5px;
`
