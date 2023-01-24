import { createFragmentContainer } from "react-relay"
import { graphql } from "react-relay"
import { isServer } from "Server/isServer"
import { useContext } from "react"
import { SystemContext } from "System"
import { ActionType } from "@artsy/cohesion"
import { useTracking } from "react-tracking"
import { NavBarMobileMenuItemLink } from "./NavBarMobileMenuItem"
import { NavBarNotificationIndicator } from "Components/NavBar/NavBarNotificationIndicator"
import { Box, Separator } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import styled from "styled-components"
import { NavBarMobileMenuNotificationsQuery } from "__generated__/NavBarMobileMenuNotificationsQuery.graphql"
import { NavBarMobileMenuNotifications_me$data } from "__generated__/NavBarMobileMenuNotifications_me.graphql"
import { NavBarMobileMenuNotifications_viewer$data } from "__generated__/NavBarMobileMenuNotifications_viewer.graphql"
import { useFeatureFlag } from "System/useFeatureFlag"
import { extractNodes } from "Utils/extractNodes"
import {
  shouldDisplayNotification,
  hasNewNotifications,
} from "Components/Notifications/util"

interface NavBarMobileMenuNotificationsProps {
  me?: NavBarMobileMenuNotifications_me$data | null
  viewer?: NavBarMobileMenuNotifications_viewer$data | null
}

export const NavBarMobileMenuNotifications: React.FC<NavBarMobileMenuNotificationsProps> = ({
  me,
  viewer,
}) => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")
  const { trackEvent } = useTracking()
  const unreadConversationCount = me?.unreadConversationCount ?? 0
  const unreadNotificationsCount = me?.unreadNotificationsCount ?? 0
  const hasConversations = unreadConversationCount > 0
  const hasNotifications = unreadNotificationsCount > 0
  const notification = extractNodes(
    viewer?.notificationsConnection
  ).filter(node => shouldDisplayNotification(node))[0]

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
            {hasNotifications &&
              hasNewNotifications(notification?.publishedAt ?? "") && (
                <Indicator />
              )}
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
    viewer: graphql`
      fragment NavBarMobileMenuNotifications_viewer on Viewer {
        notificationsConnection(first: 3) {
          edges {
            node {
              publishedAt
            }
          }
        }
      }
    `,
    me: graphql`
      fragment NavBarMobileMenuNotifications_me on Me {
        unreadConversationCount
        unreadNotificationsCount
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
          viewer {
            ...NavBarMobileMenuNotifications_viewer
          }

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

        if (!props || !props.me || !props.viewer) {
          return <NavBarMobileMenuNotifications />
        }

        return (
          <NavBarMobileMenuNotificationsFragmentContainer
            me={props.me}
            viewer={props.viewer}
          />
        )
      }}
    />
  )
}

const Indicator = styled(NavBarNotificationIndicator)`
  margin-left: 5px;
  margin-top: -15px;
`
