import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { MyCollectionArtworkArtistMarket_Test_Query } from "__generated__/MyCollectionArtworkArtistMarket_Test_Query.graphql"
import { MyCollectionArtworkArtistMarketFragmentContainer } from "Apps/MyCollection/Routes/MyCollectionArtwork/Components/MyCollectionArtworkArtistMarket"

jest.unmock("react-relay")

describe("MyCollectionArtworkArtistMarket", () => {
  const { renderWithRelay } = setupTestWrapperTL<
    MyCollectionArtworkArtistMarket_Test_Query
  >({
    Component: props => {
      if (props?.artwork?.marketPriceInsights) {
        return (
          <MyCollectionArtworkArtistMarketFragmentContainer
            marketPriceInsights={props.artwork.marketPriceInsights}
          />
        )
      }
      return null
    },
    query: graphql`
      query MyCollectionArtworkArtistMarket_Test_Query @relay_test_operation {
        artwork(id: "foo") {
          marketPriceInsights {
            ...MyCollectionArtworkArtistMarket_marketPriceInsights
          }
        }
      }
    `,
  })

  it("renders the market price insights for an artwork", () => {
    renderWithRelay(mockResolvers)

    expect(screen.getByText("Annual Value Sold")).toBeInTheDocument()
    expect(screen.getByText("$13B")).toBeInTheDocument()
    expect(screen.getByText("Annual Lots Sold")).toBeInTheDocument()
    expect(screen.getByText("123")).toBeInTheDocument()
    expect(screen.getByText("Sell-through Rate")).toBeInTheDocument()
    expect(screen.getByText("13.4%")).toBeInTheDocument()
    expect(screen.getByText("Sale Price to Estimate")).toBeInTheDocument()
    expect(screen.getByText("95%")).toBeInTheDocument()
    expect(screen.getByText("Liquidity")).toBeInTheDocument()
    expect(screen.getByText("Very High")).toBeInTheDocument()
  })
})

const mockResolvers = {
  Artwork: () => ({
    internalID: "artwork-id",
    marketPriceInsights: {
      annualLotsSold: 123,
      annualValueSoldDisplayText: "$13B",
      medianSaleOverEstimatePercentage: 95,
      liquidityRankDisplayText: "Very High",
      sellThroughRate: 0.134,
    },
  }),
}
