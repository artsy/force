import { Button, Join, Popover, Spacer, Text } from "@artsy/palette"
import {
  AddToCalendar as AddToCalendarEvent,
  ContextModule,
} from "@artsy/cohesion"
import {
  generateGoogleCalendarUrl,
  generateIcsCalendarUrl,
} from "v2/Components/AddToCalendar/helpers"
import { useAuctionTracking } from "../../Hooks/useAuctionTracking"

export interface AddToCalendarProps {
  title: string
  startDate: string
  endDate?: string
  description?: string
  address?: string
  href: string
  liveAuctionUrl?: string
  contextModule: ContextModule
}

export const AddToCalendar: React.FC<AddToCalendarProps> = props => {
  return (
    <Popover placement="bottom" popover={<PopoverLinks {...props} />}>
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
    </Popover>
  )
}

export const PopoverLinks: React.FC<AddToCalendarProps> = props => {
  const googleUrl = generateGoogleCalendarUrl(props)
  const icsUrl = generateIcsCalendarUrl(props)

  const { tracking } = useAuctionTracking()

  const trackClick = (subject: AddToCalendarEvent["subject"]) => {
    tracking.addToCalendar({ subject })
  }

  return (
    <Text variant="xs" width={300}>
      <Join separator={<Spacer mb={1} />}>
        <a
          href={googleUrl}
          onClick={() => trackClick("google")}
          target="_blank"
        >
          Google
        </a>
        <a href={icsUrl} onClick={() => trackClick("iCal")}>
          iCal
        </a>
        <a href={icsUrl} onClick={() => trackClick("outlook")}>
          Outlook
        </a>
      </Join>
    </Text>
  )
}
