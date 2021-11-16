import { useState } from "react"
import * as React from "react"
import { Box, Clickable, Menu, MenuItem, Text } from "@artsy/palette"
import {
  generateGoogleCalendarUrl,
  generateIcsCalendarUrl,
} from "v2/Components/AddToCalendar/helpers"
import {
  AddToCalendar as AddToCalendarEvent,
  addToCalendar,
  ContextModule,
} from "@artsy/cohesion"
import { useTracking } from "v2/System"
import { useAnalyticsContext } from "v2/System/Analytics/AnalyticsContext"

export interface CalendarEventProps {
  title: string
  startDate: string
  endDate?: string
  description?: string
  address?: string
  href: string
  liveAuctionUrl?: string
  contextModule: ContextModule
}

export const AddToCalendar: React.FC<CalendarEventProps> = props => {
  const [isVisible, setIsVisible] = useState(false)
  const { trackEvent } = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()
  const googleUrl = generateGoogleCalendarUrl(props)
  const icsUrl = generateIcsCalendarUrl(props)

  const trackClick = (subject: AddToCalendarEvent["subject"]) => {
    trackEvent(
      addToCalendar({
        context_module: props.contextModule,
        context_owner_id: contextPageOwnerId,
        context_owner_slug: contextPageOwnerSlug,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        context_owner_type: contextPageOwnerType,
        subject,
      })
    )
  }

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
            <MenuItem
              href={googleUrl}
              onClick={() => trackClick("google")}
              target="_blank"
            >
              Google
            </MenuItem>
            <MenuItem href={icsUrl} onClick={() => trackClick("iCal")}>
              iCal
            </MenuItem>
            <MenuItem href={icsUrl} onClick={() => trackClick("outlook")}>
              Outlook
            </MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  )
}
