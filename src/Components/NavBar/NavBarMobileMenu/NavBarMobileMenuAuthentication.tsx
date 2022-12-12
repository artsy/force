import { ContextModule, Intent } from "@artsy/cohesion"
import { ModalType } from "Components/Authentication/Types"
import { compact } from "lodash"
import * as React from "react"
import { useSystemContext } from "System"
import { useFeatureFlag } from "System/useFeatureFlag"
import { getMobileAuthLink } from "Utils/openAuthModal"
import { NavBarMobileMenuItemLink } from "./NavBarMobileMenuItem"
import { NavBarMobileSubMenu } from "./NavBarMobileSubMenu"
import { Separator } from "@artsy/palette"

export const NavBarMobileMenuLoggedIn: React.FC = () => {
  const { mediator } = useSystemContext()
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

  return (
    <>
      <NavBarMobileSubMenu menu={menu}>{menu.title}</NavBarMobileSubMenu>

      <Separator my={1} />

      <NavBarMobileMenuItemLink to="/works-for-you">
        Works for you
      </NavBarMobileMenuItemLink>
    </>
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
    <NavBarMobileMenuLoggedIn />
  ) : (
    <NavBarMobileMenuLoggedOut />
  )
}
