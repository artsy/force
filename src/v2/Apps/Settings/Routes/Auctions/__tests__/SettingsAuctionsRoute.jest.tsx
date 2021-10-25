import { graphql } from "react-relay"
import { SettingsAuctionsRouteFragmentContainer } from "../SettingsAuctionsRoute"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: SettingsAuctionsRouteFragmentContainer,
  query: graphql`
    query SettingsAuctionsRouteTestQuery {
      me {
        ...SettingsAuctionsRoute_me
      }
    }
  `,
})

const data = {
  name: "test",
  lotStandings: [
    {
      isLeadingBidder: true,
      activeBid: {
        id: "activeBid-id",
      },
      saleArtwork: {
        lotLabel: "xxx",
        highestBid: {
          display: "$1000",
        },
        counts: {
          bidderPositions: 5,
        },
        artwork: {
          title: "mist",
          href: "/mist",
          image: {
            url: "someMockImageUrl",
          },
          artist: {
            name: "Caspar",
          },
        },
      },
    },
  ],
  myBids: {
    closed: [
      {
        sale: {
          name: "mockSaleName",
          href: "/mockSaleName",
        },
      },
    ],
  },
  saleRegistrationsConnection: {
    edges: [
      {
        node: {
          isRegistered: false,
          sale: {
            name: "saleName",
            href: "/saleName",
            id: "1234",
            isClosed: false,
            startAt: "yyy",
          },
        },
      },
    ],
  },
}

describe("SettingsAuctionsRoute", () => {
  it("renders correctly with 3 sections", () => {
    const wrapper = getWrapper({
      Me: () => data,
    })

    expect(wrapper.isEmptyRender()).toBe(false)
  })

  it("renders with 3 section titles", () => {
    const wrapper = getWrapper({
      Me: () => data,
    })

    expect(wrapper.html()).toContain("Active Bids")
    expect(wrapper.html()).toContain("Bid History")
    expect(wrapper.html()).toContain("Registration for Upcoming Auctions")
  })
})
