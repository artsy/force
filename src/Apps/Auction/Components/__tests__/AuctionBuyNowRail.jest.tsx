import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { AuctionBuyNowRailFragmentContainer } from "Apps/Auction/Components/AuctionBuyNowRail"
import { AuctionBuyNowRailTestQuery } from "__generated__/AuctionBuyNowRailTestQuery.graphql"

jest.unmock("react-relay")

describe("AuctionBuyNowRail", () => {
  const { getWrapper } = setupTestWrapper<AuctionBuyNowRailTestQuery>({
    Component: (props: any) => {
      return <AuctionBuyNowRailFragmentContainer {...props} />
    },
    query: graphql`
      query AuctionBuyNowRailTestQuery {
        sale(id: "foo") {
          ...AuctionBuyNowRail_sale
        }
      }
    `,
  })

  it("renders correct components", () => {
    const { wrapper } = getWrapper()
    expect(wrapper.find("Rail")).toHaveLength(1)
  })

  it("renders correct title", () => {
    const { wrapper } = getWrapper()
    expect(wrapper.text()).toContain("Buy Now")
  })
})
