import { ContextModule, Intent } from "@artsy/cohesion"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { ModalType } from "Components/Authentication/Types"
import { compact } from "lodash"
import * as React from "react"
import { useSystemContext } from "System"
import { getMobileAuthLink } from "Utils/openAuthModal"
import { NavBarMobileMenuItemLink } from "./NavBarMobileMenuItem"
import { NavBarMobileSubMenu } from "./NavBarMobileSubMenu"
import { Separator } from "@artsy/palette"
import { useFeatureFlag } from "System/useFeatureFlag"
import { NavBarMobileMenuNotificationsQueryRenderer } from "Components/NavBar/NavBarMobileMenu/NavBarMobileMenuNotifications"
import { trackEvent } from "Server/analytics/helpers"

export const NavBarMobileMenuLoggedIn: React.FC = () => {
  const { mediator } = useSystemContext()
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>
  ) => {
    const node = event.currentTarget
    const text = node.textContent ?? ""
    const href = node.getAttribute("href")!

    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      context_module: DeprecatedAnalyticsSchema.ContextModule.Header,
      flow: "Header",
      subject: text,
      destination_path: href,
    })
  }

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
      {
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
      {isCollectorProfileEnabled ? (
        <>
          <NavBarMobileMenuNotificationsQueryRenderer />
          <NavBarMobileMenuItemLink
            to="/settings/edit-profile"
            color="black60"
            onClick={handleClick}
          >
            Settings
          </NavBarMobileMenuItemLink>
        </>
      ) : (
        <>
          <NavBarMobileSubMenu menu={menu}>{menu.title}</NavBarMobileSubMenu>
          <Separator my={1} />
        </>
      )}

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
