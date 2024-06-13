import { screen, fireEvent } from "@testing-library/react"
import { InsightsMedianSalePriceFragmentContainer } from "Apps/Settings/Routes/Insights/Components/InsightsMedianSalePrice"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { InsightsMedianSalePriceTestQuery } from "__generated__/InsightsMedianSalePriceTestQuery.graphql"

jest.unmock("react-relay")

const mockPush = jest.fn()

jest.mock("System/Hooks/useSystemContext")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    router: {
      push: mockPush,
    },
  }),
}))

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

  beforeAll(() => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => ({
      featureFlags: {
        "my-collection-web-phase-7-median-sale-price-graph": {
          flagEnabled: false,
        },
      },
    }))
  })

  describe("when there are market price insights data", () => {
    describe("Median auction price in the last 3 years", () => {
      it("renders the median auction price in the last 3 years", () => {
        renderWithRelay(mockResolver)

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

    it("navigates to the median auction price screen when the feature flag is enabled", () => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => ({
        featureFlags: {
          "my-collection-web-phase-7-median-sale-price-graph": {
            flagEnabled: true,
          },
        },
      }))

      renderWithRelay(mockResolver)

      const artistRow = screen.getByText("Takashi Murakami")

      fireEvent.click(artistRow)

      expect(mockPush).toHaveBeenCalledWith(
        "/collector-profile/my-collection/median-sale-price-at-auction/takashi-murakami-id?medium=Print"
      )
    })

    it("navigates to the median auction price screen when the median-sale-price-graph and collecto-profile feature flags are enabled", () => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => ({
        featureFlags: {
          "my-collection-web-phase-7-median-sale-price-graph": {
            flagEnabled: true,
          },
        },
      }))

      renderWithRelay(mockResolver)

      const artistRow = screen.getByText("Takashi Murakami")

      fireEvent.click(artistRow)

      expect(mockPush).toHaveBeenCalledWith(
        "/collector-profile/my-collection/median-sale-price-at-auction/takashi-murakami-id?medium=Print"
      )
    })
  })

  describe("when there are no market price insights data", () => {
    it("renders nothing", () => {
      renderWithRelay(mockEmptyResolver)

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
              internalID: "takashi-murakami-id",
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
