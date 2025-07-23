import { LotTimer } from "Apps/Artwork/Components/ArtworkSidebar/LotTimer"
import { render, screen } from "@testing-library/react"
import { DateTime, Settings } from "luxon"
import "jest-styled-components"
import type { LotTimer_saleArtwork$data } from "__generated__/LotTimer_saleArtwork.graphql"

describe("extendedBiddingInfoCopy", () => {
  describe("when extended bidding feature is on", () => {
    it("shows the extended bidding info label", () => {
      const saleArtwork: LotTimer_saleArtwork$data = {
        endAt: Date.now().toString(),
        formattedStartDateTime: "",
        extendedBiddingEndAt: "",
        lotID: "lot-id",
        sale: {
          startAt: "",
          extendedBiddingPeriodMinutes: 2,
          extendedBiddingIntervalMinutes: 2,
          internalID: "sale-id",
        },

        " $fragmentType": "LotTimer_saleArtwork",
      }
      render(<LotTimer saleArtwork={saleArtwork} />)
      expect(
        screen.getByText(
          "*Closure times may be extended to accommodate last-minute bids",
        ),
      ).toBeInTheDocument()
    })

    describe("a bid has extended the auction", () => {
      beforeAll(() => {
        Settings.now = jest.fn(() =>
          new Date("2022-03-08T12:33:37.000Z").getTime(),
        )
      })

      it("shows the extended next to the timer", () => {
        const baseDate = DateTime.local().toMillis()
        const startDate = baseDate - 1000 * 60 * 60 // one hour ago
        const endDate = baseDate + 1000 * 60 // one minute from now
        const extendedEndDate = baseDate + 1000 * 60 * 2 // two minutes from now
        const saleArtwork: LotTimer_saleArtwork$data = {
          endAt: new Date(endDate).toISOString(),
          formattedStartDateTime: "",
          extendedBiddingEndAt: new Date(extendedEndDate).toISOString(),
          lotID: "lot-id",
          sale: {
            startAt: new Date(startDate).toISOString(),
            extendedBiddingPeriodMinutes: 2,
            extendedBiddingIntervalMinutes: 2,
            internalID: "sale-id",
          },

          " $fragmentType": "LotTimer_saleArtwork",
        }
        render(<LotTimer saleArtwork={saleArtwork} />)
        expect(screen.getByText("Extended: 2m 0s")).toBeInTheDocument()
      })
    })

    describe("the auction has not yet been extended", () => {
      it("does not show extended next to the timer", () => {
        const startDate = new Date()
        const startAt = new Date(startDate.setMonth(startDate.getMonth() - 1))
        const endDate = new Date()
        const saleArtwork: LotTimer_saleArtwork$data = {
          endAt: new Date(
            endDate.setMinutes(endDate.getMinutes() + 1),
          ).toISOString(),
          formattedStartDateTime: "",
          extendedBiddingEndAt: "",
          lotID: "lot-id",
          sale: {
            startAt: startAt.toISOString(),
            extendedBiddingPeriodMinutes: 2,
            extendedBiddingIntervalMinutes: 2,
            internalID: "sale-id",
          },

          " $fragmentType": "LotTimer_saleArtwork",
        }
        render(<LotTimer saleArtwork={saleArtwork} />)
        expect(screen.queryByText(/Extended:/)).not.toBeInTheDocument()
      })
    })
  })

  describe("when extended bidding feature is off", () => {
    it("doesn't show the extended bidding info label", () => {
      const saleArtwork: LotTimer_saleArtwork$data = {
        endAt: Date.now().toString(),
        formattedStartDateTime: "",
        extendedBiddingEndAt: "",
        lotID: "lot-id",
        sale: {
          startAt: "",
          extendedBiddingPeriodMinutes: null,
          extendedBiddingIntervalMinutes: null,
          internalID: "sale-id",
        },

        " $fragmentType": "LotTimer_saleArtwork",
      }
      render(<LotTimer saleArtwork={saleArtwork} />)
      expect(
        screen.queryByText(
          "*Closure times may be extended to accommodate last-minute bids",
        ),
      ).not.toBeInTheDocument()
    })
  })
})
