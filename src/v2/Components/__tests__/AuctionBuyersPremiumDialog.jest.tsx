import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { AuctionBuyersPremiumDialogFragmentContainer } from "../AuctionBuyersPremiumDialog"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: AuctionBuyersPremiumDialogFragmentContainer,
  query: graphql`
    query AuctionBuyersPremiumDialog_Test_Query @relay_test_operation {
      sale(id: "example") {
        ...AuctionBuyersPremiumDialog_sale
      }
    }
  `,
})

describe("AuctionBuyersPremiumDialog", () => {
  describe("one point", () => {
    it("renders the schedule correctly", () => {
      const wrapper = getWrapper({
        Sale: () => ({
          buyersPremium: [{ amount: "$0", cents: 0, percent: 0.2 }],
        }),
      })

      const text = wrapper.text()

      expect(text).toContain("20% on the hammer price")
    })
  })

  describe("two points", () => {
    it("renders the schedule correctly", () => {
      const wrapper = getWrapper({
        Sale: () => ({
          buyersPremium: [
            { amount: "$0", cents: 0, percent: 0.25 },
            { amount: "$500,000", cents: 50000000, percent: 0.2 },
          ],
        }),
      })

      const text = wrapper.text()

      expect(text).toContain(
        "On the hammer price up to and including $500,000: 25%"
      )
      expect(text).toContain(
        "On the portion of the hammer price in excess of $500,000: 20%"
      )
    })
  })

  describe("three or more points", () => {
    it("renders the schedule correctly", () => {
      const wrapper = getWrapper({
        Sale: () => ({
          buyersPremium: [
            { amount: "$0", cents: 0, percent: 0.25 },
            { amount: "$250,000", cents: 25000000, percent: 0.2 },
            { amount: "$2,500,000", cents: 250000000, percent: 0.12 },
          ],
        }),
      })

      const text = wrapper.text()

      expect(text).toContain(
        "On the hammer price up to and including $250,000: 25%"
      )
      expect(text).toContain(
        "On the hammer price in excess of $250,000 up to and including $2,500,000: 20%"
      )
      expect(text).toContain(
        "On the portion of the hammer price in excess of $2,500,000: 12%"
      )
    })
  })
})
