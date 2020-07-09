import React, { useContext } from "react"

import {
  Box,
  Flex,
  HeartIcon,
  PowerIcon,
  Separator,
  SettingsIcon,
  SoloIcon,
  TagIcon,
} from "@artsy/palette"

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
        <MenuItem href={sd.ADMIN_URL} onClick={trackClick}>
          Admin
        </MenuItem>
      )}

      {(isAdmin || hasPartnerAccess) && (
        <>
          <MenuItem href={sd.CMS_URL} onClick={trackClick}>
            CMS
          </MenuItem>

          <Flex width="100%" justifyContent="center" my={1}>
            <Box width="90%">
              <Separator />
            </Box>
          </Flex>
        </>
      )}

      {isAdmin && (
        <MenuItem href="/user/purchases" onClick={trackClick}>
          <TagIcon mr={1} title="View your purchases" /> Purchases
        </MenuItem>
      )}

      <MenuItem href="/user/saves" onClick={trackClick}>
        <HeartIcon mr={1} title="View your Saves &amp; Follows" /> Saves &amp;
        Follows
      </MenuItem>

      <MenuItem href="/profile/edit" onClick={trackClick}>
        <SoloIcon mr={1} title="View your Collector Profile" /> Collector
        Profile
      </MenuItem>

      <MenuItem href="/user/edit" onClick={trackClick}>
        <SettingsIcon mr={1} title="Edit your settings" /> Settings
      </MenuItem>

      <MenuItem
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
        <PowerIcon mr={1} title="Log out of your account" /> Log out
      </MenuItem>
    </Menu>
  )
}
