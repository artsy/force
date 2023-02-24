import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import {
  ArtworkIcon,
  BellIcon,
  GraphIcon,
  GroupIcon,
  HeartIcon,
  PowerIcon,
  ReceiptIcon,
  Separator,
  SettingsIcon,
  SoloIcon,
  Text,
} from "@artsy/palette"
import * as React from "react"
import { useContext } from "react"
import { useTracking } from "react-tracking"
import { SystemContext } from "System/SystemContext"
import { useFeatureFlag } from "System/useFeatureFlag"
import { logout } from "Utils/auth"
import { getENV } from "Utils/getENV"
import { userIsAdmin } from "Utils/user"
import { NavBarMenuItemButton, NavBarMenuItemLink } from "./NavBarMenuItem"

export const NavBarUserMenu: React.FC = () => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")
  const isSeparateSavesAndFollowsEnabled = useFeatureFlag(
    "collector-profile-separating-saves-and-follows"
  )

  const { trackEvent } = useTracking()
  const { user } = useContext(SystemContext)

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

      {isCollectorProfileEnabled ? (
        <>
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

          {!isSeparateSavesAndFollowsEnabled ? (
            <NavBarMenuItemLink
              aria-label="View your Saves &amp; Follows"
              to="/collector-profile/saves"
              onClick={trackClick}
            >
              <HeartIcon mr={1} aria-hidden="true" /> Saves &amp; Follows
            </NavBarMenuItemLink>
          ) : (
            <>
              <NavBarMenuItemLink
                aria-label="View your Saves"
                to="/collector-profile/saves"
                onClick={trackClick}
              >
                <HeartIcon mr={1} aria-hidden="true" /> Saves
              </NavBarMenuItemLink>
              <NavBarMenuItemLink
                aria-label="View your Follows"
                to="/collector-profile/follows"
                onClick={trackClick}
              >
                <GroupIcon mr={1} aria-hidden="true" /> Follows
              </NavBarMenuItemLink>
            </>
          )}

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
        </>
      ) : (
        <>
          <NavBarMenuItemLink
            aria-label="View your purchases"
            to="/settings/purchases"
            onClick={trackClick}
          >
            <ReceiptIcon mr={1} aria-hidden="true" /> Order History
          </NavBarMenuItemLink>

          <NavBarMenuItemLink
            aria-label="View your alerts"
            to="/settings/alerts"
            onClick={trackClick}
          >
            <BellIcon mr={1} aria-hidden="true" /> Alerts
          </NavBarMenuItemLink>

          <NavBarMenuItemLink
            aria-label="View your Saves &amp; Follows"
            to="/settings/saves"
            onClick={trackClick}
          >
            <HeartIcon mr={1} aria-hidden="true" /> Saves &amp; Follows
          </NavBarMenuItemLink>

          <NavBarMenuItemLink
            aria-label="View your Collector Profile"
            to="/settings/edit-profile"
            onClick={trackClick}
          >
            <SoloIcon mr={1} aria-hidden="true" /> Collector Profile
          </NavBarMenuItemLink>

          <NavBarMenuItemLink
            aria-label="View your Collection"
            to="/settings/my-collection"
            onClick={trackClick}
          >
            <ArtworkIcon mr={1} aria-hidden="true" /> My Collection
          </NavBarMenuItemLink>

          <NavBarMenuItemLink
            aria-label="View your Collection's Insights"
            to="/settings/insights"
            onClick={trackClick}
          >
            <GraphIcon mr={1} aria-hidden="true" /> Insights
          </NavBarMenuItemLink>

          <NavBarMenuItemLink
            aria-label="Edit your settings"
            to="/settings/edit-settings"
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
        </>
      )}
    </Text>
  )
}
