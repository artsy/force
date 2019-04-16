import React from "react"
import Registration from "desktop/apps/auction/components/layout/auction_info/Registration"
import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import { test } from "../AuctionInfoDesktop"

jest.mock("desktop/components/add_to_calendar/react", () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn().mockImplementation(() => ({
    render: () => <div />,
  })),
}))

const AddToCalendarView = require("desktop/components/add_to_calendar/react")
  .default

// FIXME: Add required props
xdescribe("auction/components/layout/auction_info/AuctionInfoDesktop.test", () => {
  describe("<AuctionInfoDesktop />", () => {
    it("renders Sale Preview if isAuctionPromo", () => {
      let component = renderTestComponent({
        Component: test.AuctionInfoDesktop,
        props: {
          isAuctionPromo: true,
        },
      })

      expect(component.wrapper.text()).toMatch("Sale Preview")

      component = renderTestComponent({
        Component: test.AuctionInfoDesktop,
        props: {
          isAuctionPromo: false,
        },
      })

      expect(component.wrapper.text()).not.toMatch("Sale Preview")
    })

    it("renders name and upcoming label", () => {
      const { wrapper } = renderTestComponent({
        Component: test.AuctionInfoDesktop,
        props: {
          name: "Foo",
          upcomingLabel: "Bar",
        },
      })

      expect(wrapper.text()).toMatch("Foo")
      expect(wrapper.text()).toMatch("Bar")
    })

    it("renders AddToCalendarView if showAddToCalendar is true", () => {
      let component = renderTestComponent({
        Component: test.AuctionInfoDesktop,
        props: {
          showAddToCalendar: true,
        },
      })

      component.wrapper.find(AddToCalendarView).length.should.eql(1)

      component = renderTestComponent({
        Component: test.AuctionInfoDesktop,
        props: {
          showAddToCalendar: false,
        },
      })

      expect(component.wrapper.find(AddToCalendarView).length).toBe(0)
    })

    it("renders Live Auction if liveStartAt exists", () => {
      const { wrapper } = renderTestComponent({
        Component: test.AuctionInfoDesktop,
        props: {
          liveStartAt: "foo",
        },
      })

      expect(wrapper.text()).toMatch("Live auction")
    })

    it("renders a description", () => {
      const { wrapper } = renderTestComponent({
        Component: test.AuctionInfoDesktop,
        props: {
          description: "hello description",
        },
      })

      expect(wrapper.text()).toMatch("hello description")
    })

    it("renders a Registration metadata component", () => {
      const { wrapper } = renderTestComponent({
        Component: test.AuctionInfoDesktop,
      })

      expect(wrapper.find(Registration).length).toBe(1)
    })

    it("hides upcomingLabel if empty", () => {
      const { wrapper } = renderTestComponent({
        Component: test.AuctionInfoDesktop,
        props: {
          upcomingLabel: "",
        },
      })

      expect(wrapper.html()).not.toMatch("AuctionInfoDesktop__upcominigLabel")
    })
  })
})
