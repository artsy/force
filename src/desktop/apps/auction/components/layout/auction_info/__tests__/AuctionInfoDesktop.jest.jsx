import Registration from "desktop/apps/auction/components/layout/auction_info/Registration"
import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import { test } from "../AuctionInfoDesktop"
import { AddToCalendar } from "v2/Components/AddToCalendar/AddToCalendar"

describe("auction/components/layout/auction_info/AuctionInfoDesktop.test", () => {
  describe("<AuctionInfoDesktop />", () => {
    let props
    const Component = test.AuctionInfoDesktop

    beforeEach(() => {
      props = {
        name: "Foo",
        description: "hello description",
        upcomingLabel: "Bar",
        isAuctionPromo: true,
        showAddToCalendar: true,
        liveStartAt: new Date().toISOString(),
        href: "auction-slug",
      }
    })

    it("renders Sale Preview if isAuctionPromo", () => {
      let component = renderTestComponent({ Component, props })
      expect(component.wrapper.text()).toMatch("Sale Preview")

      props.isAuctionPromo = false
      component = renderTestComponent({ Component, props })
      expect(component.wrapper.text()).not.toMatch("Sale Preview")
    })

    it("renders name and upcoming label", () => {
      const { wrapper } = renderTestComponent({ Component, props })

      expect(wrapper.text()).toMatch("Foo")
      expect(wrapper.text()).toMatch("Bar")
    })

    it("renders AddToCalendar if showAddToCalendar is true", () => {
      let component = renderTestComponent({ Component, props })
      expect(component.wrapper.find(AddToCalendar).length).toBe(1)

      props.showAddToCalendar = false
      component = renderTestComponent({ Component, props })
      expect(component.wrapper.find(AddToCalendar).length).toBe(0)
    })

    it("renders Live Auction if liveStartAt exists", () => {
      const { wrapper } = renderTestComponent({ Component, props })
      expect(wrapper.text()).toMatch("Live auction")
    })

    it("renders a description", () => {
      const { wrapper } = renderTestComponent({ Component, props })
      expect(wrapper.text()).toMatch("hello description")
    })

    it("renders a Registration metadata component", () => {
      const { wrapper } = renderTestComponent({ Component, props })
      expect(wrapper.find(Registration).length).toBe(1)
    })

    it("hides upcomingLabel if empty", () => {
      props.upcomingLabel = ""
      const { wrapper } = renderTestComponent({ Component, props })
      expect(wrapper.html()).not.toMatch("AuctionInfoDesktop__upcominigLabel")
    })
  })
})
