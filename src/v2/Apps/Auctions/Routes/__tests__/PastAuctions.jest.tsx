import React from "react"
import { PastAuctionsPaginationContainer } from "../PastAuctions"
import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")

describe("PastAuctions", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return (
        <MockBoot>
          <PastAuctionsPaginationContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query PastAuctions_Test_Query {
        viewer {
          ...PastAuctions_viewer
        }
      }
    `,
  })

  it("renders past auctions and correct components", async () => {
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
