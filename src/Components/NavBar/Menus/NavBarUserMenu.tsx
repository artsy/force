import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  ArtworkIcon,
  GraphIcon,
  GroupIcon,
  HeartIcon,
  PowerIcon,
  Separator,
  SettingsIcon,
  Text,
} from "@artsy/palette"
import { SystemContext } from "System/SystemContext"
import { logout } from "Utils/auth"
import { getENV } from "Utils/getENV"
import { userIsAdmin } from "Utils/user"
import * as React from "react"
import { useContext } from "react"
import { useTracking } from "react-tracking"
import { NavBarMenuItemButton, NavBarMenuItemLink } from "./NavBarMenuItem"
import { ProgressiveOnboardingSavesHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSavesHighlight"
import { ProgressiveOnboardingFollowsHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowsHighlight"
import { useFeatureFlag } from "System/useFeatureFlag"

export const NavBarUserMenu: React.FC = () => {
  const { trackEvent } = useTracking()
  const { user } = useContext(SystemContext)
  const isArtworksListEnabled = useFeatureFlag("force-enable-artworks-list")

  const savesHref = isArtworksListEnabled
    ? "/collector-profile/saves2"
    : "/collector-profile/saves"

  const trackClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const link = event.currentTarget

    if (!(link instanceof HTMLAnchorElement)) return

    const text = link.innerText
    const href = link.getAttribute("href")

    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      // @ts-ignore
      context_module:
        DeprecatedAnalyticsSchema.ContextModule.HeaderUserDropdown,
      subject: text,
      destination_path: href!,
    })
  }

  const isAdmin = userIsAdmin(user)
  const hasPartnerAccess = Boolean(user?.has_partner_access)

  const handleLogout = async () => {
    await logout()
    window.location.reload()
  }

  return (
    <Text variant="sm" py={1} width={230}>
      {isAdmin && (
        <NavBarMenuItemLink to={getENV("ADMIN_URL")} onClick={trackClick}>
          Admin
        </NavBarMenuItemLink>
      )}

      {(isAdmin || hasPartnerAccess) && (
        <>
          <NavBarMenuItemLink to={getENV("CMS_URL")} onClick={trackClick}>
            CMS
          </NavBarMenuItemLink>

          <NavBarMenuItemLink
            aria-label="View your purchases"
            to="/settings/purchases"
            onClick={trackClick}
          >
            Order History
          </NavBarMenuItemLink>

          <Separator as="hr" my={1} />
        </>
      )}

      <NavBarMenuItemLink
        aria-label="View your Collection"
        to="/collector-profile/my-collection"
        onClick={trackClick}
      >
        <ArtworkIcon mr={1} aria-hidden="true" /> My Collection
      </NavBarMenuItemLink>

      <NavBarMenuItemLink
        aria-label="View your Collection's Insights"
        to="/collector-profile/insights"
        onClick={trackClick}
      >
        <GraphIcon mr={1} aria-hidden="true" /> Insights
      </NavBarMenuItemLink>

      <ProgressiveOnboardingSavesHighlight
        position={{ top: "3.5px", left: "9.5px" }}
      >
        <NavBarMenuItemLink
          aria-label="View your Saves"
          to={savesHref}
          onClick={trackClick}
        >
          <HeartIcon mr={1} aria-hidden="true" /> Saves
        </NavBarMenuItemLink>
      </ProgressiveOnboardingSavesHighlight>

      <ProgressiveOnboardingFollowsHighlight
        position={{ top: "3.5px", left: "9.5px" }}
      >
        <NavBarMenuItemLink
          aria-label="View your Follows"
          to="/collector-profile/follows"
          onClick={trackClick}
        >
          <GroupIcon mr={1} aria-hidden="true" /> Follows
        </NavBarMenuItemLink>
      </ProgressiveOnboardingFollowsHighlight>

      <NavBarMenuItemLink
        aria-label="Edit your settings"
        to="/settings/edit-profile"
        onClick={trackClick}
      >
        <SettingsIcon mr={1} aria-hidden="true" /> Settings
      </NavBarMenuItemLink>

      <NavBarMenuItemButton
        aria-label="Log out of your account"
        onClick={handleLogout}
      >
        <PowerIcon mr={1} aria-hidden="true" /> Log out
      </NavBarMenuItemButton>
    </Text>
  )
}
