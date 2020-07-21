import { Menu, MenuItem } from "v2/Components/Menu"
import { AnalyticsSchema } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import React from "react"
import { userHasLabFeature } from "v2/Utils/user"
import { useSystemContext } from "v2/Artsy"

export const MoreNavMenu: React.FC<{ width?: number }> = ({ width = 160 }) => {
  const { trackEvent } = useTracking()

  const { user } = useSystemContext()
  const viewingRoomsEnabled = userHasLabFeature(user, "Viewing Rooms")

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
      {viewingRoomsEnabled && (
        <MenuItem
          variant="small"
          href="viewing-rooms"
          display={["flex", "flex", "flex", "none"]}
        >
          Viewing Rooms
        </MenuItem>
      )}

      <MenuItem variant="small" href="/galleries">
        Galleries
      </MenuItem>

      <MenuItem variant="small" href="/fairs">
        Fairs
      </MenuItem>

      <MenuItem variant="small" href="/shows">
        Shows
      </MenuItem>

      <MenuItem variant="small" href="/institutions">
        Museums
      </MenuItem>

      <MenuItem variant="small" href="/consign">
        Consign
      </MenuItem>

      <MenuItem variant="small" href="https://partners.artsy.net">
        Artsy for Galleries
      </MenuItem>
    </Menu>
  )
}
