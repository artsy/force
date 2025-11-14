import { SystemContext } from "System/Contexts/SystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Box, useDidMount } from "@artsy/palette"
import type { NavBarMobileMenuNotifications_me$data } from "__generated__/NavBarMobileMenuNotifications_me.graphql"
import type { NavBarMobileMenuNotificationsQuery } from "__generated__/NavBarMobileMenuNotificationsQuery.graphql"
import { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { NavBarMobileMenuItemLink } from "./NavBarMobileMenuItem"

interface NavBarMobileMenuNotificationsProps {
  me?: NavBarMobileMenuNotifications_me$data | null
}

export const NavBarMobileMenuNotifications: React.FC<
  React.PropsWithChildren<NavBarMobileMenuNotificationsProps>
> = ({ me }) => {
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
  },
)

export const NavBarMobileMenuNotificationsQueryRenderer: React.FC<
  React.PropsWithChildren<{}>
> = () => {
  const { relayEnvironment } = useContext(SystemContext)

  const isClient = useDidMount()

  return !isClient ? (
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
