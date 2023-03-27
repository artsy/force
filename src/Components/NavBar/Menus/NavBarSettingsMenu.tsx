import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Box, Separator, Text } from "@artsy/palette"
import EditIcon from "@artsy/icons/EditIcon"
import FilterIcon from "@artsy/icons/FilterIcon"
import BellStrokeIcon from "@artsy/icons/BellStrokeIcon"
import ReceiptIcon from "@artsy/icons/ReceiptIcon"
import GavelIcon from "@artsy/icons/GavelIcon"
import MoneyBackIcon from "@artsy/icons/MoneyBackIcon"
import MapPinIcon from "@artsy/icons/MapPinIcon"
import LogoutIcon from "@artsy/icons/LogoutIcon"
import { SystemContext } from "System/SystemContext"
import { logout } from "Utils/auth"
import { getENV } from "Utils/getENV"
import { userIsAdmin } from "Utils/user"
import * as React from "react"
import { useContext } from "react"
import { useTracking } from "react-tracking"
import { NavBarMenuItemButton, NavBarMenuItemLink } from "./NavBarMenuItem"

export const NavBarSettingsMenu: React.FC = () => {
  const { trackEvent } = useTracking()
  const { user } = useContext(SystemContext)

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
      <Box px={2} py={1}>
        Account
      </Box>

      <Box px={2} my={1}>
        <Separator as="hr" color="black60" />
      </Box>

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

          <Box px={2}>
            <Separator as="hr" my={1} color="black60" />
          </Box>
        </>
      )}

      <NavBarMenuItemLink
        to="/settings/edit-profile"
        aria-label="Edit Your Profile"
        onClick={trackClick}
      >
        <EditIcon mr={1} aria-hidden="true" />
        Edit Profile
      </NavBarMenuItemLink>

      <NavBarMenuItemLink
        to="/settings/edit-settings"
        aria-label="Edit Your Account Settings"
        onClick={trackClick}
      >
        <FilterIcon mr={1} aria-hidden="true" />
        Account Settings
      </NavBarMenuItemLink>

      <NavBarMenuItemLink
        to="/settings/alerts"
        aria-label="Saved Alerts"
        onClick={trackClick}
      >
        <BellStrokeIcon mr={1} aria-hidden="true" />
        Saved Alerts
      </NavBarMenuItemLink>

      <NavBarMenuItemLink
        to="/settings/purchases"
        aria-label="Order History"
        onClick={trackClick}
      >
        <ReceiptIcon mr={1} aria-hidden="true" />
        Order History
      </NavBarMenuItemLink>

      <NavBarMenuItemLink
        to="/settings/auctions"
        aria-label="Bids"
        onClick={trackClick}
      >
        <GavelIcon mr={1} aria-hidden="true" />
        Bids
      </NavBarMenuItemLink>

      <NavBarMenuItemLink
        to="/settings/payments"
        aria-label="Payments"
        onClick={trackClick}
      >
        <MoneyBackIcon mr={1} aria-hidden="true" />
        Payments
      </NavBarMenuItemLink>

      <NavBarMenuItemLink
        to="/settings/shipping"
        aria-label="Shipping"
        onClick={trackClick}
      >
        <MapPinIcon mr={1} aria-hidden="true" />
        Shipping
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
