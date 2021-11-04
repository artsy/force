import { useContext } from "react"
import * as React from "react"
import { Box } from "@artsy/palette"
import { isServer } from "lib/isServer"
import { SystemContext, useSystemContext } from "v2/System"
import { NavBarMobileMenuItemLink } from "./NavBarMobileMenuItem"
import { graphql } from "relay-runtime"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { NavBarMobileMenuAuthenticationQuery } from "v2/__generated__/NavBarMobileMenuAuthenticationQuery.graphql"
import { NavBarMobileMenuAuthentication_me } from "v2/__generated__/NavBarMobileMenuAuthentication_me.graphql"
import { getConversationCount, updateConversationCache } from "../helpers"
import { ModalType } from "v2/Components/Authentication/Types"
import { getMobileAuthLink } from "v2/Utils/openAuthModal"
import { ContextModule, Intent } from "@artsy/cohesion"
import { createFragmentContainer } from "react-relay"
import { NavBarMobileSubMenu } from "./NavBarMobileSubMenu"

interface NavBarMobileMenuLoggedInProps {
  me?: NavBarMobileMenuAuthentication_me | null
}

export const NavBarMobileMenuLoggedIn: React.FC<NavBarMobileMenuLoggedInProps> = ({
  me,
}) => {
  const { mediator } = useSystemContext()

  const menu = {
    title: "Account",
    links: [
      {
        text: "Order history",
        href: "/user/purchases",
      },
      {
        text: "Saves & Follows",
        href: "/user/saves",
      },
      {
        text: "Alerts",
        href: "/user/alerts",
      },
      {
        text: "Auctions",
        href: "/user/auctions",
      },
      {
        text: "Collector Profile",
        href: "/profile/edit",
      },
      {
        text: "Settings",
        href: "/user/edit",
      },
      {
        text: "Payments",
        href: "/user/payments",
      },
      {
        text: "Shipping",
        href: "/user/shipping",
      },
      {
        // TODO: Should be a button
        text: "Log out",
        href: "#logout",
        onClick: event => {
          event.preventDefault()
          mediator?.trigger("auth:logout")
        },
      },
    ],
  }

  const conversationCount =
    me?.unreadConversationCount || getConversationCount()

  updateConversationCache(me?.unreadConversationCount)

  return (
    <>
      <NavBarMobileMenuItemLink
        to="/user/conversations"
        justifyContent="space-between"
      >
        Inbox
        {conversationCount > 0 && (
          <Box color="brand">{conversationCount} new</Box>
        )}
      </NavBarMobileMenuItemLink>

      <NavBarMobileMenuItemLink to="/works-for-you">
        Works for you
      </NavBarMobileMenuItemLink>

      <NavBarMobileSubMenu menu={menu}>{menu.title}</NavBarMobileSubMenu>
    </>
  )
}

const NavBarMobileMenuLoggedInFragmentContainer = createFragmentContainer(
  NavBarMobileMenuLoggedIn,
  {
    me: graphql`
      fragment NavBarMobileMenuAuthentication_me on Me {
        unreadNotificationsCount
        unreadConversationCount
      }
    `,
  }
)

export const NavBarMobileMenuLoggedInQueryRenderer: React.FC<{}> = () => {
  const { relayEnvironment } = useContext(SystemContext)

  return isServer ? (
    <NavBarMobileMenuLoggedInFragmentContainer />
  ) : (
    <SystemQueryRenderer<NavBarMobileMenuAuthenticationQuery>
      environment={relayEnvironment}
      query={graphql`
        query NavBarMobileMenuAuthenticationQuery {
          me {
            ...NavBarMobileMenuAuthentication_me
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props.me) {
          return <NavBarMobileMenuLoggedIn />
        }

        return <NavBarMobileMenuLoggedInFragmentContainer me={props.me} />
      }}
    />
  )
}

const NavBarMobileMenuLoggedOut: React.FC = () => {
  const authLink = (type: ModalType) => {
    return getMobileAuthLink(type, {
      intent: Intent[type],
      contextModule: ContextModule.header,
    })
  }

  return (
    <>
      <NavBarMobileMenuItemLink to={authLink(ModalType.signup)}>
        Sign Up
      </NavBarMobileMenuItemLink>

      <NavBarMobileMenuItemLink to={authLink(ModalType.login)}>
        Log In
      </NavBarMobileMenuItemLink>
    </>
  )
}

export const NavBarMobileMenuAuthentication: React.FC = () => {
  const { isLoggedIn } = useSystemContext()

  return isLoggedIn ? (
    <NavBarMobileMenuLoggedInQueryRenderer />
  ) : (
    <NavBarMobileMenuLoggedOut />
  )
}
