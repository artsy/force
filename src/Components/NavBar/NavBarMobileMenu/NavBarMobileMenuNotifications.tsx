import { Box } from "@artsy/palette"
import { isServer } from "Server/isServer"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { SystemContext } from "System/Contexts/SystemContext"
import { NavBarMobileMenuNotificationsQuery } from "__generated__/NavBarMobileMenuNotificationsQuery.graphql"
import { NavBarMobileMenuNotifications_me$data } from "__generated__/NavBarMobileMenuNotifications_me.graphql"
import { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { NavBarMobileMenuItemLink } from "./NavBarMobileMenuItem"

interface NavBarMobileMenuNotificationsProps {
  me?: NavBarMobileMenuNotifications_me$data | null
}

export const NavBarMobileMenuNotifications: React.FC<NavBarMobileMenuNotificationsProps> = ({
  me,
}) => {
  const unreadConversationCount = me?.unreadConversationCount ?? 0
  const hasConversations = unreadConversationCount > 0

  return (
    <>
      <NavBarMobileMenuItemLink
        to="/user/conversations"
        justifyContent="space-between"
      >
        Inbox
        {hasConversations && (
          <Box color="brand">{unreadConversationCount} new</Box>
        )}
      </NavBarMobileMenuItemLink>
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
