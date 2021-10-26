import React from "react"
import { graphql } from "react-relay"
import { SettingsAuctionsRouteFragmentContainer } from "../SettingsAuctionsRoute"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { UserActiveBids } from "../Components/UserActiveBids"
import { UserBidHistory } from "../Components/UserBidHistory"
import { UserRegistrationAuctions } from "../Components/UserRegistrationAuctions"

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
            cropped: {
              src: "src",
              srcSet: "srcSet",
            },
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
          endAt: "endDate",
          profile: {
            bio: "some sale bio",
          },
        },
      },
    ],
  },
  saleRegistrationsConnection: {
    edges: [
      {
        node: {
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
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Me: () => data,
    })

    expect(wrapper.isEmptyRender()).toBe(false)
  })

  it("renders 3 correct children", () => {
    const wrapper = getWrapper({
      Me: () => data,
    })

    expect(
      wrapper
        .children()
        .contains(<UserActiveBids lotStandings={data.lotStandings} />)
    ).toBe(true)

    expect(
      wrapper.children().contains(<UserBidHistory myBids={data.myBids} />)
    ).toBe(true)

    expect(
      wrapper
        .children()
        .contains(
          <UserRegistrationAuctions
            saleRegistrationsConnection={data.saleRegistrationsConnection}
          />
        )
    ).toBe(true)
  })
})
