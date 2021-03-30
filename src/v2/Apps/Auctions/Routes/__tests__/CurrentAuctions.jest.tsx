import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import { CurrentAuctionsPaginationContainer } from "../CurrentAuctions"
import { CurrentAuctions_QueryRawResponse } from "v2/__generated__/CurrentAuctions_Query.graphql"
import { graphql } from "react-relay"
import { AuctionArtworksRail } from "../../Components/AuctionArtworksRail/AuctionArtworksRail"

jest.unmock("react-relay")

describe("CurrentAuctons", () => {
  const getWrapper = async (
    response: CurrentAuctions_QueryRawResponse = CURRENT_AUCTIONS_FIXTURE
  ) => {
    return renderRelayTree({
      Component: ({ viewer }) => {
        return (
          <MockBoot>
            <CurrentAuctionsPaginationContainer viewer={viewer} />
          </MockBoot>
        )
      },
      query: graphql`
        query CurrentAuctions_Query @raw_response_type {
          viewer {
            ...CurrentAuctions_viewer
          }
        }
      `,
      variables: { slug: " " },
      mockData: response,
    })
  }

  it("renders current auctions", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find(AuctionArtworksRail).length).toBe(1)
  })

  // TODO: JIRA GRO-263 We need functionality for a zero state with no availale auctions
  // it("skips return auctions if we have no current auctions", async () => {})

  it("renders the Show More Button", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.text()).toContain("Show more")
  })
})

const CURRENT_AUCTIONS_FIXTURE: CurrentAuctions_QueryRawResponse = {
  viewer: {
    salesConnection: {
      totalCount: 5,
      pageInfo: {
        endCursor: "xxx",
        hasNextPage: true,
      },
      edges: [
        {
          cursor: "xxx",
          node: {
            slug: "test-current-auction",
            name: "Test Current Auction",
            href: "/auction/test-current-auction",
            liveStartAt: "xxx",
            isLiveOpen: true,
            internalID: "testid123",
            formattedStartDateTime: "Ends Apr 10 at 8:27pm UTC",
            id: "123",
            __typename: "Sale",
          },
        },
      ],
    },
  },
}
