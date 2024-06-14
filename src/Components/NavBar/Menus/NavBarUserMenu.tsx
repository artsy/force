import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Box, BoxProps, Separator, Text } from "@artsy/palette"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { logout } from "Utils/auth"
import { getENV } from "Utils/getENV"
import { userIsAdmin } from "Utils/user"
import * as React from "react"
import { useTracking } from "react-tracking"
import { NavBarMenuItemButton, NavBarMenuItemLink } from "./NavBarMenuItem"
import { ProgressiveOnboardingSaveHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveHighlight"
import { ProgressiveOnboardingFollowHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowHighlight"
import { ProgressiveOnboardingAlertHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertHighlight"
import { BASE_SAVES_PATH } from "Apps/CollectorProfile/constants"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import ArtworkIcon from "@artsy/icons/ArtworkIcon"
import GraphIcon from "@artsy/icons/GraphIcon"
import GroupIcon from "@artsy/icons/GroupIcon"
import HeartStrokeIcon from "@artsy/icons/HeartStrokeIcon"
import LogoutIcon from "@artsy/icons/LogoutIcon"
import SettingsIcon from "@artsy/icons/SettingsIcon"
import LockIcon from "@artsy/icons/LockIcon"
import BagIcon from "@artsy/icons/BagIcon"
import {
  NavBarUserMenuAvatar,
  NavBarUserMenuAvatarSkeleton,
} from "Components/NavBar/Menus/NavBarUserMenuAvatar"
import { Suspense } from "react"
import CheckmarkStrokeIcon from "@artsy/icons/CheckmarkStrokeIcon"

interface NavBarUserMenuProps extends BoxProps {}

export const NavBarUserMenu: React.FC<NavBarUserMenuProps> = props => {
  const { trackEvent } = useTracking()

  const { user } = useSystemContext()

  const trackClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const link = event.currentTarget

    if (!(link instanceof HTMLAnchorElement)) return

    const text = link.innerText
    const href = link.getAttribute("href")

    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      context_module:
        DeprecatedAnalyticsSchema.ContextModule.HeaderUserDropdown,
      subject: text,
      destination_path: href,
    })
  }

  const isAdmin = userIsAdmin(user)
  const hasPartnerAccess = Boolean(user?.has_partner_access)

  const handleLogout = async () => {
    await logout()
    window.location.reload()
  }

  return (
    <Text variant="sm" py={1} {...props}>
      {user && (
        <NavBarMenuItemLink
          aria-label="View your collected artworks"
          to="/collector-profile/my-collection"
          onClick={trackClick}
          gap={1}
        >
          <Suspense fallback={<NavBarUserMenuAvatarSkeleton />}>
            <NavBarUserMenuAvatar />
          </Suspense>

          <Box>
            {user.name}

            <Text
              variant="xs"
              color="black60"
              style={{ textDecoration: "underline" }}
            >
              View profile
            </Text>
          </Box>
        </NavBarMenuItemLink>
      )}

      <Text variant="xxs" color="black60" px={2} pt={1} pb={0.5}>
        My Collection
      </Text>

      <NavBarMenuItemLink
        aria-label="View your collected artworks"
        to="/collector-profile/my-collection"
        onClick={trackClick}
      >
        <ArtworkIcon mr={1} aria-hidden="true" /> Artworks
      </NavBarMenuItemLink>

      <NavBarMenuItemLink
        aria-label="View your collected artists"
        to="/collector-profile/artists"
        onClick={trackClick}
      >
        <GroupIcon mr={1} aria-hidden="true" /> Artists
      </NavBarMenuItemLink>

      <NavBarMenuItemLink
        aria-label="View your collection's insights"
        to="/collector-profile/insights"
        onClick={trackClick}
      >
        <GraphIcon mr={1} aria-hidden="true" /> Insights
      </NavBarMenuItemLink>

      <Separator my={1} />

      <Text variant="xxs" color="black60" px={2} pt={1} pb={0.5}>
        Favorites
      </Text>

      <ProgressiveOnboardingSaveHighlight
        position={{ top: "3.5px", left: "9.5px" }}
      >
        <NavBarMenuItemLink
          aria-label="View your Saves"
          to={BASE_SAVES_PATH}
          onClick={trackClick}
        >
          <HeartStrokeIcon mr={1} aria-hidden="true" /> Saves
        </NavBarMenuItemLink>
      </ProgressiveOnboardingSaveHighlight>

      <ProgressiveOnboardingFollowHighlight
        position={{ top: "3.5px", left: "9.5px" }}
      >
        <NavBarMenuItemLink
          aria-label="View your Follows"
          to="/favorites/follows"
          onClick={trackClick}
        >
          <CheckmarkStrokeIcon mr={1} aria-hidden="true" /> Follows
        </NavBarMenuItemLink>
      </ProgressiveOnboardingFollowHighlight>

      <ProgressiveOnboardingAlertHighlight
        position={{ top: "3.5px", left: "9.5px" }}
      >
        <NavBarMenuItemLink
          aria-label="View your alerts"
          to="/favorites/alerts"
          onClick={trackClick}
        >
          <BellStrokeIcon mr={1} aria-hidden="true" /> Alerts
        </NavBarMenuItemLink>
      </ProgressiveOnboardingAlertHighlight>

      <Separator my={1} />

      {isAdmin && (
        <NavBarMenuItemLink to={getENV("ADMIN_URL")} onClick={trackClick}>
          <LockIcon mr={1} aria-hidden="true" />
          Admin
        </NavBarMenuItemLink>
      )}

      {(isAdmin || hasPartnerAccess) && (
        <NavBarMenuItemLink to={getENV("CMS_URL")} onClick={trackClick}>
          <LockIcon mr={1} aria-hidden="true" />
          CMS
        </NavBarMenuItemLink>
      )}

      <NavBarMenuItemLink
        aria-label="Edit your settings"
        to="/settings/edit-profile"
        onClick={trackClick}
      >
        <SettingsIcon mr={1} aria-hidden="true" /> Settings
      </NavBarMenuItemLink>

      <NavBarMenuItemLink
        aria-label="View your purchases"
        to="/settings/purchases"
        onClick={trackClick}
      >
        <BagIcon mr={1} aria-hidden="true" />
        Order History
      </NavBarMenuItemLink>

      <NavBarMenuItemButton
        aria-label="Log out of your account"
        onClick={handleLogout}
      >
        <LogoutIcon mr={1} aria-hidden="true" /> Log out
      </NavBarMenuItemButton>
    </Text>
  )
}
