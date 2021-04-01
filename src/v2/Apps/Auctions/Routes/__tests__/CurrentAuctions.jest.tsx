import React from "react"
import { CurrentAuctionsPaginationContainer } from "../CurrentAuctions"
import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")

describe("CurrentAuctions", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <MockBoot>
          <CurrentAuctionsPaginationContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query CurrentAuctions_Test_Query {
        viewer {
          ...CurrentAuctions_viewer
        }
      }
    `,
  })

  it("renders current auctions and correct components", async () => {
    const wrapper = getWrapper({
      SaleConnection: () => ({
        totalCount: 5,
        pageInfo: {
          endCursor: "xxx",
          hasNextPage: false,
        },
      }),
    })
    expect(wrapper.find("AuctionArtworksRailFragmentContainer")).toBeDefined()
    expect(wrapper.find("Button")).toBeDefined()
    expect(wrapper.text()).toContain("Show more")
  })
})

// TODO: JIRA GRO-263 We need functionality for a zero state with no availale auctions
// it("skips return auctions if we have no current auctions", async () => {})
