import {
  ArtworkSidebarAuctionProgressBar,
  ArtworkSidebarAuctionProgressBarProps,
} from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionProgressBar"
import { mount } from "enzyme"
import "jest-styled-components"

describe("ArtworkSidebarAuctionProgressBar", () => {
  describe("when the lot hasn't been extended and isn't within the extended bidding period", () => {
    it("doesn't show a progress bar", () => {
      const props: ArtworkSidebarAuctionProgressBarProps = {
        time: {
          days: "0",
          hours: "0",
          minutes: "3",
          seconds: "0",
        },
        extendedBiddingPeriodMinutes: 2,
        hasBeenExtended: false,
        extendedBiddingIntervalMinutes: 2,
      }

      const wrapper = mount(<ArtworkSidebarAuctionProgressBar {...props} />)
      const html = wrapper.html()
      expect(html).toBeNull()
    })
  })

  describe("when the lot has been extended", () => {
    it("shows a progress bar", () => {
      const props: ArtworkSidebarAuctionProgressBarProps = {
        time: {
          days: "0",
          hours: "0",
          minutes: "1",
          seconds: "59",
        },
        extendedBiddingPeriodMinutes: 2,
        hasBeenExtended: true,
        extendedBiddingIntervalMinutes: 2,
      }

      const wrapper = mount(<ArtworkSidebarAuctionProgressBar {...props} />)
      expect(wrapper.find("div[role='progressbar']").length).toBe(1)
    })
  })

  describe("when the lot hasn't been extended and is within the extended bidding period", () => {
    it("shows a progress bar", () => {
      const props: ArtworkSidebarAuctionProgressBarProps = {
        time: {
          days: "0",
          hours: "0",
          minutes: "1",
          seconds: "59",
        },
        extendedBiddingPeriodMinutes: 2,
        hasBeenExtended: false,
        extendedBiddingIntervalMinutes: 2,
      }

      const wrapper = mount(<ArtworkSidebarAuctionProgressBar {...props} />)
      expect(wrapper.find("div[role='progressbar']").length).toBe(1)
    })
  })
})
