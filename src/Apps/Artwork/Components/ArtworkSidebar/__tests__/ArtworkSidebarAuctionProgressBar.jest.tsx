import {
  ArtworkSidebarAuctionProgressBar,
  type ArtworkSidebarAuctionProgressBarProps,
} from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarAuctionProgressBar"
import { render, screen } from "@testing-library/react"
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

      const { container } = render(
        <ArtworkSidebarAuctionProgressBar {...props} />
      )
      expect(container.firstChild).toBeNull()
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

      render(<ArtworkSidebarAuctionProgressBar {...props} />)
      expect(screen.getByRole("progressbar")).toBeInTheDocument()
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

      render(<ArtworkSidebarAuctionProgressBar {...props} />)
      expect(screen.getByRole("progressbar")).toBeInTheDocument()
    })
  })
})
