import { useContext } from "react"
import * as React from "react"
import { NavBarNotificationsQueryRenderer, NavBarUserMenu } from "./Menus"
import { useSystemContext, SystemContext } from "System"
import {
  BellIcon,
  Dropdown,
  EnvelopeIcon,
  Flex,
  SoloIcon,
} from "@artsy/palette"
import { graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  NavBarLoggedInActionsQuery,
  NavBarLoggedInActionsQuery$data,
} from "__generated__/NavBarLoggedInActionsQuery.graphql"
import { isServer } from "Server/isServer"
import { checkAndSyncIndicatorsCount } from "./helpers"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { NavBarItemButton, NavBarItemLink } from "./NavBarItem"
import { Z } from "Apps/Components/constants"
import { useFeatureFlag } from "System/useFeatureFlag"
import { NavBarNewNotifications } from "./Menus/NavBarNewNotifications"
import { NavBarNotificationIndicator } from "./NavBarNotificationIndicator"
import { useTracking } from "react-tracking"
import { ActionType } from "@artsy/cohesion"

/** Displays action icons for logged in users such as inbox, profile, and notifications */
export const NavBarLoggedInActions: React.FC<Partial<
  NavBarLoggedInActionsQuery$data
>> = ({ me }) => {
  const { trackEvent } = useTracking()
  const { user } = useSystemContext()
  const enableActivityPanel = useFeatureFlag("force-enable-new-activity-panel")
  const { hasConversations, hasNotifications } = checkAndSyncIndicatorsCount({
    notifications: me?.unreadNotificationsCount,
    conversations: me?.unreadConversationCount,
  })

  return (
    <>
      <Dropdown
        zIndex={Z.dropdown}
        dropdown={
          enableActivityPanel ? (
            <NavBarNewNotifications
              unreadCounts={me?.unreadNotificationsCount ?? 0}
            />
          ) : (
            <NavBarNotificationsQueryRenderer />
          )
        }
        placement="bottom-end"
        offset={0}
        openDropdownByClick
      >
        {({ anchorRef, anchorProps, visible }) => (
          <NavBarItemButton
            ref={anchorRef as any}
            active={visible}
            {...anchorProps}
            onClick={event => {
              anchorProps.onClick?.(event)

              if (!visible) {
                trackEvent({
                  action: ActionType.clickedNotificationsBell,
                  user_id: user?.id,
                })
              }
            }}
          >
            <BellIcon
              title="Notifications"
              // @ts-ignore
              fill="currentColor"
            />

            {hasNotifications &&
              (enableActivityPanel ? (
                <NavBarNotificationIndicator
                  position="absolute"
                  top="15px"
                  right="9px"
                />
              ) : (
                <NavBarLoggedInActionsNotificationIndicator />
              ))}
          </NavBarItemButton>
        )}
      </Dropdown>

      <NavBarItemLink href="/user/conversations">
        <EnvelopeIcon
          title="Inbox"
          // @ts-ignore
          fill="currentColor"
        />

        {hasConversations && <NavBarLoggedInActionsNotificationIndicator />}
      </NavBarItemLink>

      <Dropdown
        zIndex={Z.dropdown}
        dropdown={<NavBarUserMenu />}
        placement="bottom-end"
        offset={0}
        openDropdownByClick
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
