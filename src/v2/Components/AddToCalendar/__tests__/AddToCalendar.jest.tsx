import React from "react"
import { mount } from "enzyme"
import { AddToCalendar, CalendarEventProps } from "../AddToCalendar"
import { MenuItem } from "@artsy/palette"

describe("AddToCalendar", () => {
  let props: CalendarEventProps

  beforeEach(() => {
    props = {
      endDate: new Date("2024-01-11").toISOString(),
      href: "http://artsy.net/auction/auction-slug",
      startDate: new Date("2024-01-10").toISOString(),
      title: "Heritage: Signature Urban Art",
      description: "Artsy presents an auction.",
    }
  })

  const getWrapper = (passedProps = props) =>
    mount(<AddToCalendar {...passedProps} />)

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
})
