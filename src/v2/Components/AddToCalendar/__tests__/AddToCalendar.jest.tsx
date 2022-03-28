import { mount } from "enzyme"
import { AddToCalendar, CalendarEventProps } from "../AddToCalendar"
import { MenuItem } from "@artsy/palette"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { AnalyticsContextProvider } from "v2/System/Analytics/AnalyticsContext"
import { useTracking } from "react-tracking"

describe("AddToCalendar", () => {
  let props: CalendarEventProps
  let trackEvent

  beforeEach(() => {
    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    props = {
      contextModule: ContextModule.auctionHome,
      description: "Artsy presents an auction.",
      endDate: new Date("2024-01-11").toISOString(),
      href: "http://artsy.net/auction/auction-slug",
      startDate: new Date("2024-01-10").toISOString(),
      title: "Heritage: Signature Urban Art",
    }
  })

  const getWrapper = (passedProps = props) =>
    mount(
      <AnalyticsContextProvider
        value={{
          contextPageOwnerId: "context-page-owner-id",
          contextPageOwnerSlug: "context-page-owner-slug",
          contextPageOwnerType: OwnerType.artist,
        }}
      >
        <AddToCalendar {...passedProps} />
      </AnalyticsContextProvider>
    )

  it("Open/closes menu", () => {
    const wrapper = getWrapper()
    expect(wrapper.find(MenuItem).length).toBe(0)
    wrapper.find("button").simulate("mouseEnter")
    expect(wrapper.find(MenuItem).length).toBe(3)
    wrapper.find(MenuItem).first().simulate("blur")
    expect(wrapper.find(MenuItem).length).toBe(0)
  })

  it("Displays google calendar links", () => {
    const wrapper = getWrapper()
    wrapper.find("button").simulate("click")
    const { children, href, target } = wrapper
      .find(MenuItem)
      .at(0)
      .getElement().props

    expect(children).toBe("Google")
    expect(href).toBe(
      "https://www.google.com/calendar/render?action=TEMPLATE&text=Heritage:%20Signature%20Urban%20Art&dates=20240110T000000Z/20240111T000000Z&details=Artsy%20presents%20an%20auction.%3Cp%3E%3Ca%20href='http://artsy.net/auction/auction-slug'%3Ehttp://artsy.net/auction/auction-slug%3C/a%3E%3C/p%3E&location="
    )
    expect(target).toBe("_blank")
  })

  it("Displays iCal links", () => {
    const wrapper = getWrapper()
    wrapper.find("button").simulate("click")
    const { children, href } = wrapper.find(MenuItem).at(1).getElement().props

    expect(children).toBe("iCal")
    expect(href).toContain(
      "ADTSTART:20240110T000000Z%0ADTEND:20240111T000000Z%0ASUMMARY:Heritage:%20Signature%20Urban%20Art%0AURL:http://artsy.net/auction/auction-slug%0AURL:%0ADESCRIPTION:Artsy%20presents%20an%20auction.%0ALOCATION:%0AEND:VEVENT%0AEND:VCALENDAR"
    )
  })

  it("Displays outlook links", () => {
    const wrapper = getWrapper()
    wrapper.find("button").simulate("click")
    const { children, href } = wrapper.find(MenuItem).at(2).getElement().props

    expect(children).toBe("Outlook")
    expect(href).toContain(
      "ADTSTART:20240110T000000Z%0ADTEND:20240111T000000Z%0ASUMMARY:Heritage:%20Signature%20Urban%20Art%0AURL:http://artsy.net/auction/auction-slug%0AURL:%0ADESCRIPTION:Artsy%20presents%20an%20auction.%0ALOCATION:%0AEND:VEVENT%0AEND:VCALENDAR"
    )
  })

  it("tracks link clicks", () => {
    const wrapper = getWrapper()
    wrapper.find("button").simulate("click")
    wrapper.find(MenuItem).at(0).simulate("click")
    expect(trackEvent).toBeCalledWith({
      action: "addToCalendar",
      context_module: "auctionHome",
      context_owner_id: "context-page-owner-id",
      context_owner_slug: "context-page-owner-slug",
      context_owner_type: "artist",
      subject: "google",
    })
  })
})
