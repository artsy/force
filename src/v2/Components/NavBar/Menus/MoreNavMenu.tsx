import { Menu, MenuItem } from "@artsy/palette"
import { AnalyticsSchema } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import React from "react"

export const MoreNavMenu: React.FC<{ width?: number }> = ({ width = 160 }) => {
  const { trackEvent } = useTracking()

  const trackClick = event => {
    const link = event.target
    const text = link.innerText
    const href = link.parentNode.parentNode.getAttribute("href")

    trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: AnalyticsSchema.ContextModule.HeaderMoreDropdown,
      subject: text,
      destination_path: href,
    })
  }

  return (
    <Menu onClick={trackClick} width={width}>
      {/*
        Hide nav items at md / lg as they appear in the top nav
      */}
      <MenuItem href="/galleries">Galleries</MenuItem>
      <MenuItem href="/fairs">Fairs</MenuItem>
      <MenuItem href="/shows">Shows</MenuItem>
      <MenuItem href="/institutions">Museums</MenuItem>
      <MenuItem href="/consign">Consign</MenuItem>
      <MenuItem href="https://partners.artsy.net">Artsy for Galleries</MenuItem>
    </Menu>
  )
}
