import { AuctionInfoSidebarFragmentContainer } from "Apps/Auction/Components/AuctionDetails/AuctionInfoSidebar"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { AuctionInfoSidebarTestQuery } from "__generated__/AuctionInfoSidebarTestQuery.graphql"
import { graphql } from "react-relay"
import { screen } from "@testing-library/react"

jest.unmock("react-relay")

describe("AuctionInfoSidebar", () => {
  const { renderWithRelay } = setupTestWrapperTL<AuctionInfoSidebarTestQuery>({
    Component: (props: any) => {
      return <AuctionInfoSidebarFragmentContainer {...props} />
    },
    query: graphql`
      query AuctionInfoSidebarTestQuery @relay_test_operation {
        sale(id: "foo") {
          ...AuctionInfoSidebar_sale
        }
      }
    `,
  })

  it("renders correct components", () => {
    const { container } = renderWithRelay()
    expect(screen.getByText("How to bid on Artsy")).toBeInTheDocument()
    expect(container.innerHTML).toContain("/how-auctions-work")
    expect(container.innerHTML).toContain("mailto:specialist@artsy.net")
    expect(container.innerHTML).toContain("/terms")
    expect(container.innerHTML).toContain("/supplemental-cos")
  })

  it("displays updatedTotalRaisedDisplay when totalRaised is present", () => {
    renderWithRelay({
      Sale: () => ({
        hideTotal: false,
        totalRaised: {
          minor: 100,
          display: "$1,000",
        },
      }),
    })
    expect(screen.getByText("Bid Total")).toBeInTheDocument()
    expect(screen.getByText("$1,000")).toBeInTheDocument()
  })

  it("does not display total when hideTotal is true", () => {
    renderWithRelay({
      Sale: () => ({
        hideTotal: true,
        totalRaised: {
          minor: 100,
          display: "$1,000",
        },
      }),
    })
    expect(screen.queryByText("Bid Total")).not.toBeInTheDocument()
    expect(screen.queryByText("$1,000")).not.toBeInTheDocument()
  })

  it("does not display total when totalRaised minor is 0", () => {
    renderWithRelay({
      Sale: () => ({
        hideTotal: false,
        totalRaised: {
          minor: 0,
          display: "$0",
        },
      }),
    })
    expect(screen.queryByText("Bid Total")).not.toBeInTheDocument()
    expect(screen.queryByText("$0")).not.toBeInTheDocument()
  })
})
