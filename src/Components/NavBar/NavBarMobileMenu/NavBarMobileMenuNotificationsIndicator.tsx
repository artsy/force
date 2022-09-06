import { useContext } from "react"
import * as React from "react"
import { graphql } from "relay-runtime"
import { isServer } from "Server/isServer"
import { NavBarMobileMenuNotificationsIndicatorQuery } from "__generated__/NavBarMobileMenuNotificationsIndicatorQuery.graphql"
import { SystemContext } from "System/SystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  getConversationCount,
  getNotificationCount,
  updateConversationCache,
  updateNotificationCache,
} from "../helpers"
import { createFragmentContainer } from "react-relay"
import { NavBarMobileMenuNotificationsIndicator_me } from "__generated__/NavBarMobileMenuNotificationsIndicator_me.graphql"
import { NavBarNotificationIndicator } from "../NavBarNotificationIndicator"

interface NavBarMobileMenuNotificationsIndicatorProps {
  me?: NavBarMobileMenuNotificationsIndicator_me | null
}

export const NavBarMobileMenuNotificationsIndicator: React.FC<NavBarMobileMenuNotificationsIndicatorProps> = ({
  me,
}) => {
  const { unreadConversationCount, unreadNotificationsCount } = me ?? {}
  const conversationCount = unreadConversationCount || getConversationCount()
  const notificationsCount = unreadNotificationsCount || getNotificationCount()
  const hasNotifications = conversationCount > 0 || notificationsCount > 0

  updateConversationCache(unreadConversationCount)
  updateNotificationCache(unreadNotificationsCount)

  if (hasNotifications) {
    return (
      <NavBarNotificationIndicator position="absolute" top="7px" right="4px" />
    )
  }

  return null
}

export const NavBarMobileMenuNotificationsIndicatorFragmentContainer = createFragmentContainer(
  NavBarMobileMenuNotificationsIndicator,
  {
    me: graphql`
      fragment NavBarMobileMenuNotificationsIndicator_me on Me {
        unreadConversationCount
        unreadNotificationsCount
      }
    `,
  }
)

export const NavBarMobileMenuNotificationsIndicatorQueryRenderer: React.FC<{}> = () => {
  const { relayEnvironment } = useContext(SystemContext)

  if (isServer) {
    return <NavBarMobileMenuNotificationsIndicator />
  }

  return (
    <SystemQueryRenderer<NavBarMobileMenuNotificationsIndicatorQuery>
      environment={relayEnvironment}
      query={graphql`
        query NavBarMobileMenuNotificationsIndicatorQuery {
          me {
            ...NavBarMobileMenuNotificationsIndicator_me
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (props?.me) {
          return (
            <NavBarMobileMenuNotificationsIndicatorFragmentContainer
              me={props.me}
            />
          )
        }

        return <NavBarMobileMenuNotificationsIndicator />
      }}
    />
  )
}
