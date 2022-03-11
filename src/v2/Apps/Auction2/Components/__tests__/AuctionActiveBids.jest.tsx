import { Breakpoint } from "@artsy/palette"
import { graphql } from "react-relay"
import { MockBoot } from "v2/DevTools"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { AuctionActiveBidsRefetchContainer } from "../AuctionActiveBids"
import { AuctionActiveBidsTestQuery } from "v2/__generated__/AuctionActiveBidsTestQuery.graphql"

jest.unmock("react-relay")

jest.mock("v2/Apps/Auction2/Routes/Bid/Components/AuctionLotInfo", () => ({
  AuctionLotInfoFragmentContainer: () => null,
}))

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: {
        slug: "auction-slug",
      },
    },
  }),
}))

describe("AuctionActiveBids", () => {
  const setup = (breakpoint: Breakpoint = "lg") => {
    const { getWrapper } = setupTestWrapper<AuctionActiveBidsTestQuery>({
      Component: (props: any) => {
        return (
          <MockBoot breakpoint={breakpoint}>
            <AuctionActiveBidsRefetchContainer {...props} />
          </MockBoot>
        )
      },
      query: graphql`
        query AuctionActiveBidsTestQuery($slug: String!) @relay_test_operation {
          me {
            ...AuctionActiveBids_me @arguments(saleID: $slug)
          }
        }
      `,
      variables: {
        slug: "auction-slug",
      },
    })
    return getWrapper
  }

  describe("mobile", () => {
    const getWrapper = setup("sm")

    it("renders correct components", () => {
      const wrapper = getWrapper()
      expect(wrapper.text()).toContain("Your Active Bids")
      expect(
        wrapper.find("AuctionLotInfoFragmentContainer").exists()
      ).toBeTruthy()
      expect(wrapper.find("BidStatus").exists()).toBeTruthy()
      expect(wrapper.find("BidButton").exists()).toBeTruthy()
    })
  })

  describe("desktop", () => {
    const getWrapper = setup("lg")

    it("renders correct components", () => {
      const wrapper = getWrapper()
      expect(wrapper.text()).toContain("Your Active Bids")
      expect(
        wrapper.find("AuctionLotInfoFragmentContainer").exists()
      ).toBeTruthy()
    })

    it("shows current bid", () => {
      const wrapper = getWrapper({
        Me: () => ({
          lotStandings: [
            {
              saleArtwork: {
                currentBid: {
                  display: "$2000",
                },
              },
            },
          ],
        }),
      })

      expect(wrapper.text()).toContain("$2000")
    })

    describe("current bid", () => {
      it("shows current bid count", () => {
        const wrapper = getWrapper({
          Me: () => ({
            lotStandings: [
              {
                saleArtwork: {
                  counts: {
                    bidderPositions: 1,
                  },
                },
              },
            ],
          }),
        })

        expect(wrapper.text()).toContain("1 bid")
      })

      it("handles pluralization", () => {
        const wrapper = getWrapper({
          Me: () => ({
            lotStandings: [
              {
                saleArtwork: {
                  counts: {
                    bidderPositions: 2,
                  },
                },
              },
            ],
          }),
        })

        expect(wrapper.text()).toContain("2 bids")
      })
    })
  })
})
