import { ActionType } from "@artsy/cohesion"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import EnvelopeIcon from "@artsy/icons/EnvelopeIcon"
import PersonIcon from "@artsy/icons/PersonIcon"
import { Dropdown, Flex, useDidMount } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { ProgressiveOnboardingAlertFind } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertFind"
import { ProgressiveOnboardingFollowFind } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowFind"
import { ProgressiveOnboardingSaveFind } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveFind"
import { FallbackErrorBoundary } from "System/Components/FallbackErrorBoundary"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { getENV } from "Utils/getENV"
import type {
  NavBarLoggedInActionsQuery,
  NavBarLoggedInActionsQuery$data,
} from "__generated__/NavBarLoggedInActionsQuery.graphql"
import type * as React from "react"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { NavBarUserMenu } from "./Menus"
import { NavBarNotifications } from "./Menus/NavBarNotifications"
import { NavBarItemButton, NavBarItemLink } from "./NavBarItem"
import { NavBarNotificationIndicator } from "./NavBarNotificationIndicator"

/** Displays action icons for logged in users such as inbox, profile, and notifications */
export const NavBarLoggedInActions: React.FC<
  React.PropsWithChildren<Partial<NavBarLoggedInActionsQuery$data>>
> = ({ me }) => {
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
        // eslint-disable-next-line react/no-unstable-nested-components
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
            return "/user/conversations"
          }

          if (firstConversation?.internalID) {
            return `/user/conversations/${firstConversation.internalID}`
          }

          return "/user/conversations"
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

export const NavBarLoggedInActionsQueryRenderer: React.FC<
  React.PropsWithChildren<{}>
> = () => {
  const { relayEnvironment, user } = useSystemContext()

  const isClient = useDidMount()

  return !isClient ? (
    <NavBarLoggedInActions />
  ) : (
    <FallbackErrorBoundary FallbackComponent={Placeholder}>
      <SystemQueryRenderer<NavBarLoggedInActionsQuery>
        environment={relayEnvironment}
        placeholder={user ? <Placeholder /> : undefined}
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
    </FallbackErrorBoundary>
  )
}

const Placeholder: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <Flex gap={2} alignItems="center" ml={1}>
      <BellStrokeIcon fill="currentColor" />
      <EnvelopeIcon fill="currentColor" />
      <PersonIcon fill="currentColor" />
    </Flex>
  )
}
