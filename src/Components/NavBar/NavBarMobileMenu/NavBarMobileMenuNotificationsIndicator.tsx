import { NavBarNotificationIndicator } from "Components/NavBar/NavBarNotificationIndicator"
import { SystemContext } from "System/Contexts/SystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { NavBarMobileMenuNotificationsIndicatorQuery } from "__generated__/NavBarMobileMenuNotificationsIndicatorQuery.graphql"
import type { NavBarMobileMenuNotificationsIndicator_me$data } from "__generated__/NavBarMobileMenuNotificationsIndicator_me.graphql"
import { useContext } from "react"
import { graphql } from "react-relay"
import { createFragmentContainer } from "react-relay"

interface NavBarMobileMenuNotificationsIndicatorProps {
  me?: NavBarMobileMenuNotificationsIndicator_me$data | null
}

export const NavBarMobileMenuNotificationsIndicator: React.FC<
  React.PropsWithChildren<NavBarMobileMenuNotificationsIndicatorProps>
> = ({ me }) => {
  const unreadConversationCount = me?.unreadConversationCount ?? 0
  const unreadNotificationsCount = me?.unreadNotificationsCount ?? 0
  const unseenNotificationsCount = me?.unseenNotificationsCount ?? 0
  const hasConversations = unreadConversationCount > 0
  const hasNotifications = unreadNotificationsCount > 0
  const hasUnseenNotifications = unseenNotificationsCount > 0
  const shouldDisplayIndicator =
    hasConversations || (hasNotifications && hasUnseenNotifications)

  if (!shouldDisplayIndicator) {
    return null
  }

  return (
    <NavBarNotificationIndicator
      position="absolute"
      top="5px"
      right="5px"
      data-testid="notifications-indicator"
    />
  )
}

export const NavBarMobileMenuNotificationsIndicatorFragmentContainer =
  createFragmentContainer(NavBarMobileMenuNotificationsIndicator, {
    me: graphql`
      fragment NavBarMobileMenuNotificationsIndicator_me on Me {
        unreadConversationCount
        unreadNotificationsCount
        unseenNotificationsCount
      }
    `,
  })

export const NavBarMobileMenuNotificationsIndicatorQueryRenderer: React.FC<
  React.PropsWithChildren<{}>
> = () => {
  const { relayEnvironment } = useContext(SystemContext)

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
