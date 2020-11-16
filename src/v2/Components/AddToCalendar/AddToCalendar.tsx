import React, { useState } from "react"
import { Box, Clickable, Menu, MenuItem, Text } from "@artsy/palette"
import {
  generateGoogleCalendarUrl,
  generateIcsCalendarUrl,
} from "v2/Components/AddToCalendar/helpers"

export interface CalendarEventProps {
  title: string
  startDate: string
  endDate?: string
  description?: string
  address?: string
  href: string
  liveAuctionUrl?: string
}

export const AddToCalendar: React.FC<CalendarEventProps> = props => {
  const [isVisible, setIsVisible] = useState(false)

  const googleUrl = generateGoogleCalendarUrl(props)
  const icsUrl = generateIcsCalendarUrl(props)

  return (
    <Box display="inline-block">
      <Clickable
        onFocus={() => setIsVisible(true)}
        onMouseEnter={() => setIsVisible(true)}
        onClick={() => setIsVisible(!isVisible)}
      >
        <Text color="black60">+ Add to calendar</Text>
      </Clickable>

      {isVisible && (
        <Box
          position="absolute"
          onMouseLeave={() => setIsVisible(false)}
          onBlur={() => setIsVisible(false)}
        >
          <Menu>
            <MenuItem href={googleUrl} target="_blank">
              Google
            </MenuItem>
            <MenuItem href={icsUrl}>iCal</MenuItem>
            <MenuItem href={icsUrl}>Outlook</MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  )
}
