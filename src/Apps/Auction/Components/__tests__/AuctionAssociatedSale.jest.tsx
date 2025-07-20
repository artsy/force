import { AuctionAssociatedSaleFragmentContainer } from "Apps/Auction/Components/AuctionAssociatedSale"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { AuctionAssociatedSaleQuery } from "__generated__/AuctionAssociatedSaleQuery.graphql"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

describe("AuctionAssociatedSale", () => {
  const { renderWithRelay } = setupTestWrapperTL<AuctionAssociatedSaleQuery>({
    Component: (props: any) => {
      return <AuctionAssociatedSaleFragmentContainer {...props} />
    },
    query: graphql`
      query AuctionAssociatedSaleQuery {
        sale(id: "foo") {
          ...AuctionAssociatedSale_sale
        }
      }
    `,
  })

  it("renders correct components", () => {
    renderWithRelay({
      Sale: () => ({
        name: "Sale Name",
        displayTimelyAt: "Starts tomorrow",
      }),
    })

    expect(screen.getByText("Sale Name")).toBeInTheDocument()
    expect(screen.getByText("Starts tomorrow")).toBeInTheDocument()
  })
})
