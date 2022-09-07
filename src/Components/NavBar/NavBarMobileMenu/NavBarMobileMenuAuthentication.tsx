import { ContextModule, Intent } from "@artsy/cohesion"
import { Box } from "@artsy/palette"
import { ModalType } from "Components/Authentication/Types"
import { compact } from "lodash"
import * as React from "react"
import { useContext } from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import { isServer } from "Server/isServer"
import { SystemContext, useSystemContext } from "System"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useFeatureFlag } from "System/useFeatureFlag"
import { getMobileAuthLink } from "Utils/openAuthModal"
import { NavBarMobileMenuAuthenticationQuery } from "__generated__/NavBarMobileMenuAuthenticationQuery.graphql"
import { NavBarMobileMenuAuthentication_me } from "__generated__/NavBarMobileMenuAuthentication_me.graphql"
import { getConversationCount, updateConversationCache } from "../helpers"
import { NavBarMobileMenuItemLink } from "./NavBarMobileMenuItem"
import { NavBarMobileSubMenu } from "./NavBarMobileSubMenu"

interface NavBarMobileMenuLoggedInProps {
  me?: NavBarMobileMenuAuthentication_me | null
}

export const NavBarMobileMenuLoggedIn: React.FC<NavBarMobileMenuLoggedInProps> = ({
  me,
}) => {
  const { mediator } = useSystemContext()
  const enableActivityPanel = useFeatureFlag("force-enable-new-activity-panel")
  const isInsightsEnabled = useFeatureFlag("my-collection-web-phase-7-insights")

  const menu = {
    title: "Account",
    links: compact([
      {
        text: "Order history",
        href: "/settings/purchases",
      },
      {
        text: "Alerts",
        href: "/settings/alerts",
      },
      {
        text: "Saves & Follows",
        href: "/settings/saves",
      },
      {
        text: "Auctions",
        href: "/settings/auctions",
      },
      {
        text: "Collector Profile",
        href: "/settings/edit-profile",
      },
      {
        text: "My Collection",
        href: "/settings/my-collection",
      },
      isInsightsEnabled && {
        text: "Insights",
        href: "/settings/insights",
      },
      {
        text: "Settings",
        href: "/settings/edit-settings",
      },
      {
        text: "Payments",
        href: "/settings/payments",
      },
      {
        text: "Shipping",
        href: "/settings/shipping",
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
    ]),
  }

  const conversationCount =
    me?.unreadConversationCount || getConversationCount()

  updateConversationCache(me?.unreadConversationCount)

  return (
    <>
      <NavBarMobileSubMenu menu={menu}>{menu.title}</NavBarMobileSubMenu>

      {enableActivityPanel && (
        <NavBarMobileMenuItemLink to="/notifications">
          Activity
        </NavBarMobileMenuItemLink>
      )}

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
