import { AuctionBuyNowRailFragmentContainer } from "Apps/Auction/Components/AuctionBuyNowRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { AuctionBuyNowRailTestQuery } from "__generated__/AuctionBuyNowRailTestQuery.graphql"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

describe("AuctionBuyNowRail", () => {
  const { renderWithRelay } = setupTestWrapperTL<AuctionBuyNowRailTestQuery>({
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
    expect(() => renderWithRelay()).not.toThrow()
  })

  it("renders correct title", () => {
    renderWithRelay()
    expect(screen.getByText("Inquire")).toBeInTheDocument()
  })
})
