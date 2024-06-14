import { useContext } from "react"
import * as React from "react"
import { NavBarUserMenu } from "./Menus"
import { SystemContext } from "System/Contexts/SystemContext"
import { Dropdown, Flex } from "@artsy/palette"
import EnvelopeIcon from "@artsy/icons/EnvelopeIcon"
import PersonIcon from "@artsy/icons/PersonIcon"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import { graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  NavBarLoggedInActionsQuery,
  NavBarLoggedInActionsQuery$data,
} from "__generated__/NavBarLoggedInActionsQuery.graphql"
import { isServer } from "Server/isServer"
import { NavBarItemButton, NavBarItemLink } from "./NavBarItem"
import { Z } from "Apps/Components/constants"
import { NavBarNotifications } from "./Menus/NavBarNotifications"
import { NavBarNotificationIndicator } from "./NavBarNotificationIndicator"
import { useTracking } from "react-tracking"
import { ActionType } from "@artsy/cohesion"
import { ProgressiveOnboardingFollowFind } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowFind"
import { ProgressiveOnboardingSaveFind } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveFind"
import { ProgressiveOnboardingAlertFind } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertFind"
import { extractNodes } from "Utils/extractNodes"
import { getENV } from "Utils/getENV"

/** Displays action icons for logged in users such as inbox, profile, and notifications */
export const NavBarLoggedInActions: React.FC<Partial<
  NavBarLoggedInActionsQuery$data
>> = ({ me }) => {
  const { trackEvent } = useTracking()
  const unreadNotificationsCount = me?.unreadNotificationsCount ?? 0
  const unreadConversationCount = me?.unreadConversationCount ?? 0
  const unseenNotificationsCount = me?.unseenNotificationsCount ?? 0
  const hasConversations = unreadConversationCount > 0
  const hasNotifications = unreadNotificationsCount > 0
  const hasUnseenNotifications = unseenNotificationsCount > 0
  const shouldDisplayBlueDot = hasNotifications && hasUnseenNotifications

  const firstConversation = extractNodes(me?.firstConversationConnection)[0]

  return (
    <>
      <Dropdown
        zIndex={Z.dropdown}
        dropdown={({ onHide }) => {
          return (
            <NavBarNotifications
              unreadCounts={unreadNotificationsCount}
              onHide={onHide}
            />
          )
        }}
        placement="bottom-end"
        offset={0}
        openDropdownByClick
      >
        {({ anchorRef, anchorProps, visible }) => (
          <NavBarItemButton
            ref={anchorRef as any}
            active={visible}
            {...anchorProps}
            aria-label={
              hasNotifications
                ? `${me?.unreadNotificationsCount} unread notifications`
                : "Notifications"
            }
            onClick={event => {
              anchorProps.onClick?.(event)

              if (!visible) {
                trackEvent({
                  action: ActionType.clickedNotificationsBell,
                })
              }
            }}
          >
            <BellStrokeIcon fill="currentColor" />

            {shouldDisplayBlueDot && (
              <NavBarNotificationIndicator
                position="absolute"
                top="15px"
                right="9px"
              />
            )}
          </NavBarItemButton>
        )}
      </Dropdown>

      <NavBarItemLink
        href={(() => {
          if (getENV("IS_MOBILE")) {
            return `/user/conversations`
          }

          if (firstConversation?.internalID) {
            return `/user/conversations/${firstConversation.internalID}`
          } else {
            return "/user/conversations"
          }
        })()}
        aria-label={
          hasConversations
            ? `${me?.unreadConversationCount} unread conversations`
            : "Conversations"
        }
      >
        <EnvelopeIcon fill="currentColor" />

        {hasConversations && (
          <NavBarNotificationIndicator
            position="absolute"
            top="15px"
            right="5px"
          />
        )}
      </NavBarItemLink>

      <Dropdown
        zIndex={Z.dropdown}
        dropdown={<NavBarUserMenu width={230} />}
        placement="bottom-end"
        offset={0}
        openDropdownByClick
      >
        {({ anchorRef, anchorProps, visible }) => (
          // Offset to accomodate hit area padding on right side of icon
          <Flex mr={-1}>
            <ProgressiveOnboardingSaveFind>
              <ProgressiveOnboardingFollowFind>
                <ProgressiveOnboardingAlertFind>
                  <NavBarItemButton
                    ref={anchorRef as any}
                    active={visible}
                    aria-label="Your account"
                    {...anchorProps}
                  >
                    <PersonIcon fill="currentColor" />
                  </NavBarItemButton>
                </ProgressiveOnboardingAlertFind>
              </ProgressiveOnboardingFollowFind>
            </ProgressiveOnboardingSaveFind>
          </Flex>
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
            unseenNotificationsCount
            unreadConversationCount

            firstConversationConnection: conversationsConnection(first: 1) {
              edges {
                node {
                  internalID
                }
              }
            }

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
