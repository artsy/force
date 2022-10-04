import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { AuctionBuyersPremiumDialogFragmentContainer } from "Components/AuctionBuyersPremiumDialog"
import { AuctionBuyersPremiumDialog_Test_Query } from "__generated__/AuctionBuyersPremiumDialog_Test_Query.graphql"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  AuctionBuyersPremiumDialog_Test_Query
>({
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
      renderWithRelay({
        Sale: () => ({
          buyersPremium: [{ amount: "$0", cents: 0, percent: 0.2 }],
        }),
      })

      expect(screen.getByText("20% on the hammer price")).toBeInTheDocument()
    })
  })

  describe("two points", () => {
    it("renders the schedule correctly", () => {
      renderWithRelay({
        Sale: () => ({
          buyersPremium: [
            { amount: "$0", cents: 0, percent: 0.25 },
            { amount: "$500,000", cents: 50000000, percent: 0.2 },
          ],
        }),
      })

      expect(
        screen.getByText(
          "On the hammer price up to and including $500,000: 25%"
        )
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          "On the portion of the hammer price in excess of $500,000: 20%"
        )
      ).toBeInTheDocument()
    })
  })

  describe("three or more points", () => {
    it("renders the schedule correctly", () => {
      renderWithRelay({
        Sale: () => ({
          buyersPremium: [
            { amount: "$0", cents: 0, percent: 0.25 },
            { amount: "$250,000", cents: 25000000, percent: 0.2 },
            { amount: "$2,500,000", cents: 250000000, percent: 0.12 },
          ],
        }),
      })

      expect(
        screen.getByText(
          "On the hammer price up to and including $250,000: 25%"
        )
      ).toBeInTheDocument()

      expect(
        screen.getByText(
          "On the hammer price in excess of $250,000 up to and including $2,500,000: 20%"
        )
      ).toBeInTheDocument()

      expect(
        screen.getByText(
          "On the portion of the hammer price in excess of $2,500,000: 12%"
        )
      ).toBeInTheDocument()
    })

    describe("with a percentage that isn't a whole number", () => {
      it("rounds to a single decimal place", () => {
        renderWithRelay({
          Sale: () => ({
            buyersPremium: [{ amount: "$0", cents: 0, percent: 0.225 }],
          }),
        })

        expect(
          screen.getByText("22.5% on the hammer price")
        ).toBeInTheDocument()
      })
    })
  })
})
