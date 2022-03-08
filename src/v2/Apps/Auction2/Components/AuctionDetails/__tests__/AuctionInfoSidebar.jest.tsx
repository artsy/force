import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { AuctionInfoSidebarFragmentContainer } from "../AuctionInfoSidebar"
import { AuctionInfoSidebarTestQuery } from "v2/__generated__/AuctionInfoSidebarTestQuery.graphql"

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
    const wrapper = getWrapper()
    expect(wrapper.find("LiveAuctionToolTip")).toHaveLength(1)
    expect(wrapper.text()).toContain("How to bid on Artsy?")
    expect(wrapper.html()).toContain("/how-auctions-work")
    expect(wrapper.html()).toContain("mailto:specialist@artsy.net")
    expect(wrapper.text()).toContain("+1-845-582-3967")
  })
})
