import { useContext } from "react"
import { graphql } from "react-relay"
import { NavBarMobileMenuNotificationsIndicatorQuery } from "__generated__/NavBarMobileMenuNotificationsIndicatorQuery.graphql"
import { SystemContext } from "System/SystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { createFragmentContainer } from "react-relay"
import { NavBarMobileMenuNotificationsIndicator_me$data } from "__generated__/NavBarMobileMenuNotificationsIndicator_me.graphql"
import { NavBarNotificationIndicator } from "Components/NavBar/NavBarNotificationIndicator"
import { extractNodes } from "Utils/extractNodes"
import {
  shouldDisplayNotification,
  hasNewNotifications,
} from "Components/Notifications/util"

interface NavBarMobileMenuNotificationsIndicatorProps {
  me?: NavBarMobileMenuNotificationsIndicator_me$data | null
  notificationsConnection?
}

export const NavBarMobileMenuNotificationsIndicator: React.FC<NavBarMobileMenuNotificationsIndicatorProps> = ({
  me,
  notificationsConnection,
}) => {
  const unreadConversationCount = me?.unreadConversationCount ?? 0
  const hasConversations = unreadConversationCount > 0
  const notification = extractNodes(notificationsConnection).filter(node =>
    shouldDisplayNotification(node)
  )[0]

  console.log("[Debug]", "not pub", notification?.publishedAt)
  const shouldDisplayIndicator =
    hasConversations || hasNewNotifications(notification?.publishedAt)

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

export const NavBarMobileMenuNotificationsIndicatorFragmentContainer = createFragmentContainer(
  NavBarMobileMenuNotificationsIndicator,
  {
    me: graphql`
      fragment NavBarMobileMenuNotificationsIndicator_me on Me {
        unreadConversationCount
      }
    `,
  }
)

export const NavBarMobileMenuNotificationsIndicatorQueryRenderer: React.FC<{}> = () => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <SystemQueryRenderer<NavBarMobileMenuNotificationsIndicatorQuery>
      environment={relayEnvironment}
      query={graphql`
        query NavBarMobileMenuNotificationsIndicatorQuery {
          notificationsConnection(first: 1) {
            edges {
              node {
                publishedAt
              }
            }
          }

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
              notificationsConnection={props.notificationsConnection}
            />
          )
        }

        return <NavBarMobileMenuNotificationsIndicator />
      }}
    />
  )
}
