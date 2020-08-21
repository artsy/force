import React, { useContext } from "react"
import { Box } from "@artsy/palette/dist/elements/Box"
import { Separator } from "@artsy/palette/dist/elements/Separator"
import { HeartIcon } from "@artsy/palette/dist/svgs/HeartIcon"
import { LogoutIcon } from "@artsy/palette/dist/svgs/LogoutIcon"
import { SettingsIcon } from "@artsy/palette/dist/svgs/SettingsIcon"
import { UserSingleIcon } from "@artsy/palette/dist/svgs/UserSingleIcon"
import { TagIcon } from "@artsy/palette/dist/svgs/TagIcon"
import { Menu, MenuItem } from "v2/Components/Menu"
import { AnalyticsSchema, SystemContext } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { data as sd } from "sharify"
import { userIsAdmin } from "v2/Utils/user"

export const UserMenu: React.FC = () => {
  const { trackEvent } = useTracking()
  const { mediator, user } = useContext(SystemContext)

  const trackClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const link = event.currentTarget

    if (!(link instanceof HTMLAnchorElement)) return

    const text = link.innerText
    const href = link.getAttribute("href")

    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: AnalyticsSchema.ContextModule.HeaderUserDropdown,
      subject: text,
      destination_path: href,
    })
  }

  const isAdmin = userIsAdmin(user)
  const hasPartnerAccess = Boolean(user.has_partner_access)

  return (
    <Menu>
      {isAdmin && (
        <MenuItem variant="small" href={sd.ADMIN_URL} onClick={trackClick}>
          Admin
        </MenuItem>
      )}

      {(isAdmin || hasPartnerAccess) && (
        <>
          <MenuItem variant="small" href={sd.CMS_URL} onClick={trackClick}>
            CMS
          </MenuItem>

          <Box my={1} px={2}>
            <Separator />
          </Box>
        </>
      )}

      {isAdmin && (
        <MenuItem
          variant="small"
          aria-label="View your purchases"
          href="/user/purchases"
          onClick={trackClick}
        >
          <TagIcon mr={1} aria-hidden="true" /> Purchases
        </MenuItem>
      )}

      <MenuItem
        variant="small"
        aria-label="View your Saves &amp; Follows"
        href="/user/saves"
        onClick={trackClick}
      >
        <HeartIcon mr={1} aria-hidden="true" /> Saves &amp; Follows
      </MenuItem>

      <MenuItem
        variant="small"
        aria-label="View your Collector Profile"
        href="/profile/edit"
        onClick={trackClick}
      >
        <UserSingleIcon mr={1} aria-hidden="true" /> Collector Profile
      </MenuItem>

      <MenuItem
        variant="small"
        aria-label="Edit your settings"
        href="/user/edit"
        onClick={trackClick}
      >
        <SettingsIcon mr={1} aria-hidden="true" /> Settings
      </MenuItem>

      <MenuItem
        variant="small"
        aria-label="Log out of your account"
        role="button"
        tabIndex={0}
        onKeyPress={event => {
          if (event.key === "Enter" || event.key === " ") {
            mediator.trigger("auth:logout")
          }
        }}
        onClick={() => {
          mediator.trigger("auth:logout")
        }}
      >
        <LogoutIcon mr={1} aria-hidden="true" /> Log out
      </MenuItem>
    </Menu>
  )
}
