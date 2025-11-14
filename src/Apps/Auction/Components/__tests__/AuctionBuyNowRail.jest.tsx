import { AuctionBuyNowRailFragmentContainer } from "Apps/Auction/Components/AuctionBuyNowRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { AuctionBuyNowRailQuery } from "__generated__/AuctionBuyNowRailQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("AuctionBuyNowRail", () => {
  const { renderWithRelay } = setupTestWrapperTL<AuctionBuyNowRailQuery>({
    Component: (props: any) => {
      return <AuctionBuyNowRailFragmentContainer {...props} />
    },
    query: graphql`
      query AuctionBuyNowRailQuery {
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
