import { ContextModule } from "@artsy/cohesion"
import { mount } from "enzyme"
import { AddToCalendar, PopoverLinks } from "../AddToCalendar"

jest.mock("v2/Apps/Auction2/Hooks/useAuctionTracking", () => ({
  useAuctionTracking: () => ({
    tracking: jest.fn(),
  }),
}))

describe("AddToCalendar", () => {
  const props = {
    title: "title",
    startDate: "2020-01-01",
    endDate: "2020-01-02",
    description: "description",
    address: "address",
    href: "href",
    liveAuctionUrl: "liveAuctionUrl",
    contextModule: ContextModule.aboutTheWork,
  }

  it("rendes correct components", () => {
    const getWrapper = () => {
      return mount(<AddToCalendar {...props} />)
    }

    const wrapper = getWrapper()
    expect(wrapper.find("Popover").length).toBe(1)
    expect(wrapper.find("Button").length).toBe(1)
    expect(wrapper.text()).toContain("Add to Calendar")
  })

  it("computs correct links", () => {
    const getWrapper = () => {
      return mount(<PopoverLinks {...props} />)
    }
    const wrapper = getWrapper()
    expect(wrapper.find("a").length).toBe(3)
    expect(wrapper.text()).toContain("Google")
    expect(wrapper.text()).toContain("iCal")
    expect(wrapper.text()).toContain("Outlook")
  })
})
