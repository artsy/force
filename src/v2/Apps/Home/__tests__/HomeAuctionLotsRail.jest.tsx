import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { HomeAuctionLotsRailFragmentContainer } from "../Components/HomeAuctionLotsRail"
import { HomeAuctionLotsRail_Test_Query } from "v2/__generated__/HomeAuctionLotsRail_Test_Query.graphql"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<HomeAuctionLotsRail_Test_Query>({
  Component: props => {
    return <HomeAuctionLotsRailFragmentContainer viewer={props.viewer!} />
  },
  query: graphql`
    query HomeAuctionLotsRail_Test_Query {
      viewer {
        ...HomeAuctionLotsRail_viewer
      }
    }
  `,
})

describe("HomeAuctionLotsRail", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Viewer: () => ({
        saleArtworksConnection: {
          edges: [
            {
              node: {
                title: "Test Auction",
                href: "test-href",
                sale: {
                  isClosed: false,
                },
              },
            },
          ],
        },
      }),
    })

    expect(wrapper.text()).toContain("Auction Lots")
    expect(wrapper.text()).toContain("View All Auctions")
    expect(wrapper.text()).toContain("Test Auction")
    expect(wrapper.html()).toContain("test-href")
  })
})
