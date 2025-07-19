import { screen, fireEvent } from "@testing-library/react"
import { MarketStatsFragmentContainer } from "Apps/Artist/Routes/AuctionResults/Components/MarketStats"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { MarketStats_Test_Query } from "__generated__/MarketStats_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("MarketStats", () => {
  const { renderWithRelay } = setupTestWrapperTL<MarketStats_Test_Query>({
    Component: MarketStatsFragmentContainer,
    query: graphql`
      query MarketStats_Test_Query($artistInternalID: ID!)
      @relay_test_operation {
        priceInsightsConnection: priceInsights(
          artistId: $artistInternalID
          sort: ANNUAL_VALUE_SOLD_CENTS_DESC
        ) {
          ...MarketStats_priceInsightsConnection
        }
      }
    `,
    variables: {
      artistInternalID: "test",
    },
  })

  const mockuseTracking = useTracking as jest.Mock
  const trackingSpy = jest.fn()

  beforeAll(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  it("does not render if no price insights", () => {
    const { container } = renderWithRelay({
      PriceInsightConnection: () => ({
        edges: null,
      }),
    })
    expect(container.firstChild).toBeFalsy()
  })

  it("renders correctly", () => {
    const { container } = renderWithRelay({
      PriceInsightConnection: () => priceInsightsConnectionFixture,
    })
    expect(screen.getByText("Market Signals")).toBeInTheDocument()
    expect(screen.getByText("Yearly lots sold")).toBeInTheDocument()
    expect(screen.getByText("6")).toBeInTheDocument()
    expect(screen.getByText("Sell-through rate")).toBeInTheDocument()
    expect(screen.getByText("90.9%")).toBeInTheDocument()
    expect(screen.getByText("Sale price")).toBeInTheDocument()
    expect(screen.getByText("$492K")).toBeInTheDocument()
    expect(screen.getByText("Price over estimate")).toBeInTheDocument()
    expect(container.textContent).toContain("400")
    expect(container.textContent).toContain("%")
  })

  it("tracks correctly", () => {
    renderWithRelay({
      PriceInsightConnection: () => priceInsightsConnectionFixture,
    })

    const infoIcon = screen.getByRole("button")
    fireEvent.click(infoIcon)
    expect(trackingSpy).toHaveBeenCalledWith({
      action_type: "Click",
      context_module: "marketInsights",
      context_page_owner_type: "artist",
      type: "Button",
    })
  })
})

const priceInsightsConnectionFixture = {
  edges: [
    {
      node: {
        medium: "Painting",
        annualLotsSold: 6,
        annualValueSoldCents: "295342000",
        sellThroughRate: 0.909,
        medianSaleOverEstimatePercentage: 400,
      },
    },
    {
      node: {
        medium: "Work on Paper",
        annualLotsSold: 5,
        annualValueSoldCents: "82037000",
        sellThroughRate: 1,
        medianSaleOverEstimatePercentage: 400,
      },
    },
  ],
}
