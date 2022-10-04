import { LotTimer } from "Apps/Artwork/Components/ArtworkSidebar/LotTimer"
import { DateTime, Settings } from "luxon"
import { mount } from "enzyme"
import "jest-styled-components"
import { LotTimer_saleArtwork$data } from "__generated__/LotTimer_saleArtwork.graphql"

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
      const wrapper = mount(<LotTimer saleArtwork={saleArtwork} />)
      const text = wrapper.text()
      expect(text).toContain(
        "*Closure times may be extended to accommodate last-minute bids"
      )
    })
    describe("a bid has extended the auction", () => {
      beforeAll(() => {
        Settings.now = jest.fn(() =>
          new Date("2022-03-08T12:33:37.000Z").getTime()
        )
      })
      it("shows the extended next to the timer", () => {
        let baseDate = DateTime.local().toMillis()
        let startDate = baseDate - 1000 * 60 * 60 // one hour ago
        let endDate = baseDate + 1000 * 60 // one minute from now
        let extendedEndDate = baseDate + 1000 * 60 * 2 // two minutes from now
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
        const wrapper = mount(<LotTimer saleArtwork={saleArtwork} />)
        const text = wrapper.text()
        expect(text).toContain("Extended: 2m 0s")
      })
    })
    describe("the auction has not yet been extended", () => {
      it("does not show extended next to the timer", () => {
        let startDate = new Date()
        const startAt = new Date(startDate.setMonth(startDate.getMonth() - 1))
        let endDate = new Date()
        const saleArtwork: LotTimer_saleArtwork$data = {
          endAt: new Date(
            endDate.setMinutes(endDate.getMinutes() + 1)
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
        const wrapper = mount(<LotTimer saleArtwork={saleArtwork} />)
        const text = wrapper.text()
        expect(text).not.toContain("Extended:")
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
      const wrapper = mount(<LotTimer saleArtwork={saleArtwork} />)
      const text = wrapper.text()
      expect(text).not.toContain(
        "*Closure times may be extended to accommodate last-minute bids"
      )
    })
  })
})
