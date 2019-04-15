import React from "react"
import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import moment from "moment"
import { test as Banner } from "../Banner"

jest.mock("desktop/components/clock/react", () => ({
  __esModule: true,
  namedExport: jest.fn(),
  default: jest.fn().mockImplementation(() => ({
    render: () => <div className="auction-clock" />,
  })),
}))

describe("auction/components/layout/Banner.test", () => {
  describe("<Banner />", () => {
    it('tracks a click on the "Enter Live Auction" button', () => {
      const liveAuctionUrl = "live.artsy.net/some-auction-url"
      const mockTrack = jest.fn()
      window.analytics = { track: mockTrack }
      const { wrapper } = renderTestComponent({
        Component: Banner.Banner,
        props: {
          hasEndTime: true,
          isAuction: true,
          isLiveOpen: true,
          liveAuctionUrl,
          auction: {},
          coverImage: "coverImage",
          isClosed: false,
          isMobile: false,
          name: "string",
        },
      })

      wrapper.find("a").simulate("click")
      expect(mockTrack).toBeCalledWith("click", {
        context_module: "auction banner",
        destination_path: "live.artsy.net/some-auction-url",
        flow: "auctions",
        label: "enter live auction",
        type: "button",
      })
    })

    it("renders a clock if the auction has yet to open for live bidding", () => {
      const { wrapper } = renderTestComponent({
        Component: Banner.Banner,
        props: {
          auction: { live_start_at: moment().add(2, "days") },
          isAuction: true,
          hasEndTime: false,
          isLiveOpen: false,
          coverImage: "coverImage",
          isClosed: false,
          isMobile: false,
          name: "string",
        },
      })

      expect(wrapper.find(".auction-clock").length).toBe(1)
    })

    it("renders a clock if the auction hasn't started yet", () => {
      const { wrapper } = renderTestComponent({
        Component: Banner.Banner,
        props: {
          auction: {
            live_start_at: moment().add(4, "days"),
            start_at: moment().add(2, "days"),
          },
          isAuction: true,
          hasEndTime: false,
          isLiveOpen: false,
          coverImage: "coverImage",
          isClosed: false,
          isMobile: false,
          name: "string",
        },
      })

      expect(wrapper.find(".auction-clock").length).toBe(1)
    })

    it("renders an Enter Live Auction banner if isLiveOpen", () => {
      const liveAuctionUrl = "live.artsy.net/some-auction-url"

      const { wrapper } = renderTestComponent({
        Component: Banner.Banner,
        props: {
          auction: {},
          isAuction: true,
          hasEndTime: true,
          isLiveOpen: true,
          liveAuctionUrl,
          coverImage: "coverImage",
          isClosed: false,
          isMobile: false,
          name: "string",
        },
      })

      expect(wrapper.text()).toMatch("Live Bidding Now Open")
      expect(wrapper.find("a").html()).toMatch(liveAuctionUrl)
    })

    it("renders a normal banner if not live", () => {
      const { wrapper } = renderTestComponent({
        Component: Banner.Banner,
        props: {
          auction: {},
          isAuction: true,
          hasEndTime: true,
          isLiveOpen: false,
          coverImage: "coverImage",
          isClosed: false,
          isMobile: false,
          name: "string",
        },
        options: {
          renderMode: "render",
        },
      })

      expect(wrapper.find(".auction-clock").length).toBe(1)
    })

    it("hides clock if no end_at", () => {
      const { wrapper } = renderTestComponent({
        Component: Banner.Banner,
        props: {
          auction: {},
          isAuction: false,
          hasEndTime: false,
          isLiveOpen: false,
          isMobile: false,
          isClosed: false,
          name: "string",
          coverImage: "coverImage",
        },
        options: {
          renderMode: "render",
        },
      })

      expect(wrapper.find(".auction-clock").length).toBe(0)
    })
  })
})
