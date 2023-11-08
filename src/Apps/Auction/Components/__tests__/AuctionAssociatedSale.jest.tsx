import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { AuctionAssociatedSaleFragmentContainer } from "Apps/Auction/Components/AuctionAssociatedSale"
import { AuctionAssociatedSaleTestQuery } from "__generated__/AuctionAssociatedSaleTestQuery.graphql"

jest.unmock("react-relay")

describe("AuctionAssociatedSale", () => {
  const { getWrapper } = setupTestWrapper<AuctionAssociatedSaleTestQuery>({
    Component: (props: any) => {
      return <AuctionAssociatedSaleFragmentContainer {...props} />
    },
    query: graphql`
      query AuctionAssociatedSaleTestQuery {
        sale(id: "foo") {
          ...AuctionAssociatedSale_sale
        }
      }
    `,
  })

  it("renders correct components", () => {
    const { wrapper } = getWrapper({
      Sale: () => ({
        name: "Sale Name",
        displayTimelyAt: "Starts tomorrow",
      }),
    })

    expect(wrapper.find("Image")).toHaveLength(1)
    expect(wrapper.text()).toContain("Sale Name")
    expect(wrapper.text()).toContain("Starts tomorrow")
  })
})
