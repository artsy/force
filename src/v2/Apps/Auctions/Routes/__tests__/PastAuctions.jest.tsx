import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import { PastAuctionsPaginationContainer } from "../PastAuctions"
import { graphql } from "react-relay"
import { PastAuctions_QueryRawResponse } from "v2/__generated__/PastAuctions_Query.graphql"
import { AuctionArtworksRail } from "../../Components/AuctionArtworksRail/AuctionArtworksRail"

jest.unmock("react-relay")

describe("PastAuctions", () => {
  const getWrapper = async (
    response: PastAuctions_QueryRawResponse = PAST_AUCTIONS_FIXTURE
  ) => {
    return renderRelayTree({
      Component: ({ viewer }) => {
        return (
          <MockBoot>
            <PastAuctionsPaginationContainer viewer={viewer} />
          </MockBoot>
        )
      },
      query: graphql`
        query PastAuctions_Query @raw_response_type {
          viewer {
            ...PastAuctions_viewer
          }
        }
      `,
      mockData: response,
    })
  }

  it("renders past auctions", async () => {
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

const PAST_AUCTIONS_FIXTURE: PastAuctions_QueryRawResponse = {
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
            endAt: "xxx",
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
