import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { MarketStats_Test_Query } from "v2/__generated__/MarketStats_Test_Query.graphql"
import { MarketStatsFragmentContainer } from "../Components/MarketStats"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("MarketStats", () => {
  const { getWrapper } = setupTestWrapper<MarketStats_Test_Query>({
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

  beforeEach(() => {
    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  it("does not render if no price insights", () => {
    const wrapper = getWrapper({
      PriceInsightConnection: () => ({
        edges: null,
      }),
    })
    expect(wrapper.html()).toBeFalsy()
  })

  it("renders correctly", () => {
    const wrapper = getWrapper({
      PriceInsightConnection: () => priceInsightsConnectionFixture,
    })
    expect(wrapper.text()).toContain("Market Signals")
    expect(wrapper.text()).toContain("Yearly lots sold6")
    expect(wrapper.text()).toContain("Sell-through rate90.9%")
    expect(wrapper.text()).toContain("Sale price$492k")
    expect(wrapper.text()).toContain("Price over estimate↑ 400%")
  })

  it("tracks correctly", () => {
    const wrapper = getWrapper({
      PriceInsightConnection: () => priceInsightsConnectionFixture,
    })

    wrapper.find("InfoCircleIcon").simulate("click")
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
