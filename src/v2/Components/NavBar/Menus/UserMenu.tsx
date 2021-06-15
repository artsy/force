import React from "react"
import {
  Box,
  HeartIcon,
  PowerIcon,
  ReceiptIcon,
  Separator,
  SettingsIcon,
  SoloIcon,
} from "@artsy/palette"
import { Menu, MenuItem } from "v2/Components/Menu"
import { AnalyticsSchema, useSystemContext } from "v2/System"
import { useTracking } from "v2/System/Analytics/useTracking"
import { data as sd } from "sharify"
import { userIsAdmin } from "v2/Utils/user"

export const UserMenu: React.FC = () => {
  const { trackEvent } = useTracking()
  const { mediator, user } = useSystemContext()

  const trackClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const link = event.currentTarget

    if (!(link instanceof HTMLAnchorElement)) return

    const text = link.innerText
    const href = link.getAttribute("href")

    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      // @ts-expect-error STRICT_NULL_CHECK
      context_module: AnalyticsSchema.ContextModule.HeaderUserDropdown,
      subject: text,
      // @ts-expect-error STRICT_NULL_CHECK
      destination_path: href,
    })
  }

  const isAdmin = userIsAdmin(user!)
  // @ts-expect-error STRICT_NULL_CHECK
  const hasPartnerAccess = Boolean(user.has_partner_access)

  return (
    <Menu>
      {isAdmin && (
        <MenuItem variant="text" href={sd.ADMIN_URL} onClick={trackClick}>
          Admin
        </MenuItem>
      )}

      {(isAdmin || hasPartnerAccess) && (
        <>
          <MenuItem variant="text" href={sd.CMS_URL} onClick={trackClick}>
            CMS
          </MenuItem>

          <Box my={1} px={2}>
            <Separator />
          </Box>
        </>
      )}

      <MenuItem
        variant="text"
        aria-label="View your purchases"
        href="/user/purchases"
        onClick={trackClick}
      >
        <ReceiptIcon mr={1} aria-hidden="true" /> Order History
      </MenuItem>

      <MenuItem
        variant="text"
        aria-label="View your Saves &amp; Follows"
        href="/user/saves"
        onClick={trackClick}
      >
        <HeartIcon mr={1} aria-hidden="true" /> Saves &amp; Follows
      </MenuItem>

      <MenuItem
        variant="text"
        aria-label="View your Collector Profile"
        href="/profile/edit"
        onClick={trackClick}
      >
        <SoloIcon mr={1} aria-hidden="true" /> Collector Profile
      </MenuItem>

      <MenuItem
        variant="text"
        aria-label="Edit your settings"
        href="/user/edit"
        onClick={trackClick}
      >
        <SettingsIcon mr={1} aria-hidden="true" /> Settings
      </MenuItem>

      <MenuItem
        variant="text"
        aria-label="Log out of your account"
        role="button"
        tabIndex={0}
        onKeyPress={event => {
          if (event.key === "Enter" || event.key === " ") {
            // @ts-expect-error STRICT_NULL_CHECK
            mediator.trigger("auth:logout")
          }
        }}
        onClick={() => {
          // @ts-expect-error STRICT_NULL_CHECK
          mediator.trigger("auth:logout")
        }}
      >
        <PowerIcon mr={1} aria-hidden="true" /> Log out
      </MenuItem>
    </Menu>
  )
}
