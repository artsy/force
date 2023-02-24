import { createFragmentContainer } from "react-relay"
import { graphql } from "react-relay"
import { isServer } from "Server/isServer"
import { useContext } from "react"
import { SystemContext } from "System/SystemContext"
import { ActionType } from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { NavBarMobileMenuItemLink } from "./NavBarMobileMenuItem"
import { NavBarNotificationIndicator } from "Components/NavBar/NavBarNotificationIndicator"
import { Box, Separator } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import styled from "styled-components"
import { NavBarMobileMenuNotificationsQuery } from "__generated__/NavBarMobileMenuNotificationsQuery.graphql"
import { NavBarMobileMenuNotifications_me$data } from "__generated__/NavBarMobileMenuNotifications_me.graphql"
import { useFeatureFlag } from "System/useFeatureFlag"

interface NavBarMobileMenuNotificationsProps {
  me?: NavBarMobileMenuNotifications_me$data | null
}

export const NavBarMobileMenuNotifications: React.FC<NavBarMobileMenuNotificationsProps> = ({
  me,
}) => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")
  const { trackEvent } = useTracking()
  const unreadConversationCount = me?.unreadConversationCount ?? 0
  const unreadNotificationsCount = me?.unreadNotificationsCount ?? 0
  const unseenNotificationsCount = me?.unseenNotificationsCount ?? 0
  const hasConversations = unreadConversationCount > 0
  const hasNotifications = unreadNotificationsCount > 0
  const hasUnseenNotifications = unseenNotificationsCount > 0
  const shouldDisplayBlueDot = hasNotifications && hasUnseenNotifications

  return (
    <>
      {isCollectorProfileEnabled ? (
        <NavBarMobileMenuItemLink
          to="/user/conversations"
          justifyContent="space-between"
        >
          Inbox
          {hasConversations && (
            <Box color="brand">{unreadConversationCount} new</Box>
          )}
        </NavBarMobileMenuItemLink>
      ) : (
        <>
          <NavBarMobileMenuItemLink
            to="/notifications"
            onClick={() => {
              trackEvent({
                action: ActionType.clickedNotificationsBell,
              })
            }}
          >
            Activity
            {shouldDisplayBlueDot && <Indicator />}
          </NavBarMobileMenuItemLink>
          <NavBarMobileMenuItemLink
            to="/user/conversations"
            justifyContent="space-between"
          >
            Inbox
            {hasConversations && (
              <Box color="brand">{unreadConversationCount} new</Box>
            )}
          </NavBarMobileMenuItemLink>
          <Separator my={1} />
        </>
      )}
    </>
  )
}

const NavBarMobileMenuNotificationsFragmentContainer = createFragmentContainer(
  NavBarMobileMenuNotifications,
  {
    me: graphql`
      fragment NavBarMobileMenuNotifications_me on Me {
        unreadNotificationsCount
        unreadConversationCount
        unseenNotificationsCount
      }
    `,
  }
)

export const NavBarMobileMenuNotificationsQueryRenderer: React.FC<{}> = () => {
  const { relayEnvironment } = useContext(SystemContext)

  return isServer ? (
    <NavBarMobileMenuNotificationsFragmentContainer />
  ) : (
    <SystemQueryRenderer<NavBarMobileMenuNotificationsQuery>
      environment={relayEnvironment}
      query={graphql`
        query NavBarMobileMenuNotificationsQuery {
          me {
            ...NavBarMobileMenuNotifications_me
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props.me) {
          return <NavBarMobileMenuNotifications />
        }

        return <NavBarMobileMenuNotificationsFragmentContainer me={props.me} />
      }}
    />
  )
}

const Indicator = styled(NavBarNotificationIndicator)`
  margin-left: 5px;
  margin-top: -15px;
`
