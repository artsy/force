import { Button, Join, Popover, Spacer, Text } from "@artsy/palette"
import {
  addToCalendar,
  AddToCalendar as AddToCalendarEvent,
  ContextModule,
} from "@artsy/cohesion"
import {
  generateGoogleCalendarUrl,
  generateIcsCalendarUrl,
} from "v2/Components/AddToCalendar/helpers"
import { useAnalyticsContext, useTracking } from "v2/System"

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
        context_owner_type: contextPageOwnerType!,
        subject,
      })
    )
  }

  return (
    <Popover
      placement="bottom"
      popover={
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
      }
    >
      {({ onVisible, anchorRef }) => {
        return (
          <Button
            variant="secondaryOutline"
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
