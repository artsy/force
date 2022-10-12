// test rending
// test returning null

import { screen } from "@testing-library/react"
import { InsightsMedianSalePriceFragmentContainer } from "Apps/Settings/Routes/Insights/Components/InsightsMedianSalePrice"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { InsightsMedianSalePriceTestQuery } from "__generated__/InsightsMedianSalePriceTestQuery.graphql"

jest.unmock("react-relay")

describe("InsightsMedianSalePrice", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    InsightsMedianSalePriceTestQuery
  >({
    Component: InsightsMedianSalePriceFragmentContainer,
    query: graphql`
      query InsightsMedianSalePriceTestQuery @relay_test_operation {
        me {
          ...InsightsMedianSalePrice_me
        }
      }
    `,
  })

  describe("when there are market price insights data", () => {
    it("renders correctly", () => {
      renderWithRelay(mockResolver, false)

      expect(
        screen.getByText("Median Auction Price in the Last 3 Years")
      ).toBeInTheDocument()

      expect(screen.getByText("Takashi Murakami")).toBeInTheDocument()
      expect(screen.getByText("Japanese, b. 1962")).toBeInTheDocument()
      expect(screen.getByText("Photography")).toBeInTheDocument()
      expect(screen.getByText("US$3,750")).toBeInTheDocument()

      expect(screen.getByText("Andy Warhol")).toBeInTheDocument()
      expect(screen.getByText("American, 1928–1987")).toBeInTheDocument()
      expect(screen.getByText("Print")).toBeInTheDocument()
      expect(screen.getByText("US$39,930")).toBeInTheDocument()
    })
  })

  describe("when there are no market price insights data", () => {
    it("renders nothing", () => {
      renderWithRelay(mockEmptyResolver, false)

      expect(
        screen.queryByText("Median Auction Price in the Last 3 Years")
      ).not.toBeInTheDocument()
    })
  })
})

const mockEmptyResolver = {
  Me: () => ({
    medianSalePrices: {
      edges: [],
    },
  }),
}

const mockResolver = {
  Me: () => ({
    medianSalePrices: {
      edges: [
        {
          node: {
            mediumType: { name: "Print" },
            artist: {
              internalID: "takashi-murakami",
              name: "Takashi Murakami",
              formattedNationalityAndBirthday: "Japanese, b. 1962",
            },
            marketPriceInsights: { medianSalePriceDisplayText: "US$3,750" },
          },
        },
        {
          node: {
            mediumType: { name: "Photography" },
            artist: {
              internalID: "andy-warhol",
              name: "Andy Warhol",
              formattedNationalityAndBirthday: "American, 1928–1987",
            },
            marketPriceInsights: { medianSalePriceDisplayText: "US$39,930" },
          },
        },
      ],
    },
  }),
}
