import { NavBarMobileMenuNotificationsQueryRenderer } from "Components/NavBar/NavBarMobileMenu/NavBarMobileMenuNotifications"
import { ProgressiveOnboardingAlertHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertHighlight"
import { trackEvent } from "Server/analytics/helpers"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { ContextModule, Intent } from "@artsy/cohesion"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import type * as React from "react"
import { NavBarMobileMenuItemLink } from "./NavBarMobileMenuItem"

export const NavBarMobileMenuLoggedIn: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
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

  return (
    <>
      <NavBarMobileMenuNotificationsQueryRenderer />

      <ProgressiveOnboardingAlertHighlight
        position={{ top: "2.5px", left: "23px" }}
      >
        <NavBarMobileMenuItemLink to="/favorites/alerts">
          Alerts
        </NavBarMobileMenuItemLink>
      </ProgressiveOnboardingAlertHighlight>

      <NavBarMobileMenuItemLink
        to="/settings/edit-profile"
        onClick={handleClick}
      >
        Settings
      </NavBarMobileMenuItemLink>

      <NavBarMobileMenuItemLink to="/works-for-you">
        Works for you
      </NavBarMobileMenuItemLink>
    </>
  )
}

const NavBarMobileMenuLoggedOut: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <>
      <NavBarMobileMenuItemLink
        to={`/signup?intent=${Intent.signup}&contextModule=${ContextModule.header}`}
      >
        Sign Up
      </NavBarMobileMenuItemLink>

      <NavBarMobileMenuItemLink
        to={`/login?intent=${Intent.login}&contextModule=${ContextModule.header}`}
      >
        Log In
      </NavBarMobileMenuItemLink>
    </>
  )
}

export const NavBarMobileMenuAuthentication: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { isLoggedIn } = useSystemContext()

  return isLoggedIn ? (
    <NavBarMobileMenuLoggedIn />
  ) : (
    <NavBarMobileMenuLoggedOut />
  )
}
