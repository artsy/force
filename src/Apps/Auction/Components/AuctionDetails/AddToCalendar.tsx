import type { AddToCalendar as AddToCalendarEvent } from "@artsy/cohesion"
import { Box, Button, Dropdown, Text } from "@artsy/palette"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { NavBarMenuItemLink } from "Components/NavBar/Menus/NavBarMenuItem"
import { generateGoogleCalendarUrl, generateIcsCalendarUrl } from "./helpers"

export interface AddToCalendarProps {
  title: string
  startDate: string
  endDate?: string | null
  description?: string | null
  address?: string | null
  href: string
  liveAuctionUrl?: string
}

export const AddToCalendar: React.FC<
  React.PropsWithChildren<AddToCalendarProps>
> = props => {
  return (
    <Dropdown
      dropdown={<AddToCalendarLinks {...props} />}
      placement="bottom"
      openDropdownByClick
    >
      {({ onVisible, anchorRef }) => {
        return (
          <Button
            variant="secondaryBlack"
            size="small"
            onClick={onVisible}
            ref={anchorRef}
          >
            <Text variant="xs">+ Add to Calendar</Text>
          </Button>
        )
      }}
    </Dropdown>
  )
}

export const AddToCalendarLinks: React.FC<
  React.PropsWithChildren<AddToCalendarProps>
> = props => {
  const googleUrl = generateGoogleCalendarUrl(props)
  const icsUrl = generateIcsCalendarUrl(props)

  const { tracking } = useAuctionTracking()

  const trackClick = (subject: AddToCalendarEvent["subject"]) => {
    tracking.addToCalendar({ subject })
  }

  return (
    <Box minWidth={200}>
      <NavBarMenuItemLink
        to={googleUrl}
        onClick={() => trackClick("google")}
        target="_blank"
      >
        Google
      </NavBarMenuItemLink>

      <NavBarMenuItemLink to={icsUrl} onClick={() => trackClick("iCal")}>
        iCal
      </NavBarMenuItemLink>

      <NavBarMenuItemLink to={icsUrl} onClick={() => trackClick("outlook")}>
        Outlook
      </NavBarMenuItemLink>
    </Box>
  )
}
