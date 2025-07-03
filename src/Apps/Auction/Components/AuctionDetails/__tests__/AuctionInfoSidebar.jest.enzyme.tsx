import { AuctionInfoSidebarFragmentContainer } from "Apps/Auction/Components/AuctionDetails/AuctionInfoSidebar"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import type { AuctionInfoSidebarTestQuery } from "__generated__/AuctionInfoSidebarTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("AuctionInfoSidebar", () => {
  const { getWrapper } = setupTestWrapper<AuctionInfoSidebarTestQuery>({
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
    const { wrapper } = getWrapper()
    expect(wrapper.find("LiveAuctionToolTip")).toHaveLength(1)
    expect(wrapper.text()).toContain("How to bid on Artsy")
    expect(wrapper.html()).toContain("/how-auctions-work")
    expect(wrapper.html()).toContain("mailto:specialist@artsy.net")
    expect(wrapper.html()).toContain("/terms")
    expect(wrapper.html()).toContain("/supplemental-cos")
  })

  it("displays updatedTotalRaisedDisplay when totalRaised is present", () => {
    const { wrapper } = getWrapper({
      Sale: () => ({
        hideTotal: false,
        totalRaised: {
          minor: 100,
          display: "$1,000",
        },
      }),
    })
    expect(wrapper.text()).toContain("Bid Total")
    expect(wrapper.text()).toContain("$1,000")
  })

  it("does not display total when hideTotal is true", () => {
    const { wrapper } = getWrapper({
      Sale: () => ({
        hideTotal: true,
        totalRaised: {
          minor: 100,
          display: "$1,000",
        },
      }),
    })
    expect(wrapper.text()).not.toContain("Bid Total")
    expect(wrapper.text()).not.toContain("$1,000")
  })

  it("does not display total when totalRaised minor is 0", () => {
    const { wrapper } = getWrapper({
      Sale: () => ({
        hideTotal: false,
        totalRaised: {
          minor: 0,
          display: "$0",
        },
      }),
    })
    expect(wrapper.text()).not.toContain("Bid Total")
    expect(wrapper.text()).not.toContain("$0")
  })
})
