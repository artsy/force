import { Breakpoint } from "@artsy/palette"
import { graphql } from "react-relay"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { AuctionActiveBidsRefetchContainer } from "Apps/Auction/Components/AuctionActiveBids"
import { AuctionActiveBidsTestQuery } from "__generated__/AuctionActiveBidsTestQuery.graphql"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { useRouter } from "System/Hooks/useRouter"

jest.unmock("react-relay")

jest.mock("Apps/Auction/Hooks/useAuctionTracking")
jest.mock("Apps/Auction/Routes/Bid/Components/AuctionLotInfo", () => ({
  AuctionLotInfoFragmentContainer: () => null,
}))

jest.mock("System/Hooks/useRouter")

describe("AuctionActiveBids", () => {
  const mockUseRouter = useRouter as jest.Mock
  const mockUseAuctionTracking = useAuctionTracking as jest.Mock

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
    return { getWrapper }
  }

  beforeAll(() => {
    mockUseRouter.mockImplementation(() => ({
      match: {
        params: {
          slug: "auction-slug",
        },
      },
      router: {
        push: jest.fn(),
      },
    }))

    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        clickedActiveBid: jest.fn(),
      },
    }))
  })

  describe("mobile", () => {
    const { getWrapper } = setup("sm")

    it("renders correct components", () => {
      const { wrapper } = getWrapper()
      expect(wrapper.text()).toContain("Your Active Bids")
      expect(
        wrapper.find("AuctionLotInfoFragmentContainer").exists()
      ).toBeTruthy()
      expect(wrapper.find("BidStatus").exists()).toBeTruthy()
      expect(wrapper.find("BidButton").exists()).toBeTruthy()
    })
  })

  describe("desktop", () => {
    const { getWrapper } = setup("lg")

    it("renders correct components", () => {
      const { wrapper } = getWrapper()
      expect(wrapper.text()).toContain("Your Active Bids")
      expect(
        wrapper.find("AuctionLotInfoFragmentContainer").exists()
      ).toBeTruthy()
    })

    it("shows current bid", () => {
      const { wrapper } = getWrapper({
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

    describe("auction with cascading lots, some closed", () => {
      it("displays bidding closed for a lot that has closed", () => {
        const { wrapper } = getWrapper({
          Me: () => ({
            lotStandings: [
              {
                saleArtwork: {
                  counts: {
                    bidderPositions: 1,
                  },
                  endedAt: "2021-01-01T00:00:00.000Z",
                },
              },
              {
                saleArtwork: {
                  counts: {
                    bidderPositions: 2,
                  },
                  endedAt: null,
                },
              },
            ],
          }),
        })

        expect(wrapper.text()).toContain("Bidding Closed")
        expect(wrapper.text()).toContain("Increase Bid")
      })
    })

    describe("current bid", () => {
      it("shows current bid count", () => {
        const { wrapper } = getWrapper({
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
        const { wrapper } = getWrapper({
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

  it("redirects to bid form on click", () => {
    const spy = jest.fn()

    mockUseRouter.mockImplementation(() => ({
      match: {
        params: {
          slug: "auction-slug",
        },
      },
      router: {
        push: spy,
      },
    }))

    const { wrapper } = setup("sm").getWrapper({
      Me: () => ({
        internalID: "me-id",
      }),
      Sale: () => ({
        slug: "auction-slug",
      }),
      SaleArtwork: () => ({
        slug: "sale-artwork-slug",
        saleID: "saleID",
        endedAt: null,
      }),
    })

    wrapper.find("Button").simulate("click")

    expect(spy).toBeCalledWith(
      "/auction/saleID/bid/sale-artwork-slug?redirectTo=/auction/saleID"
    )
  })

  it("tracks clicks", () => {
    const spy = jest.fn()

    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        clickedActiveBid: spy,
      },
    }))

    const { wrapper } = setup("sm").getWrapper({
      Me: () => ({
        internalID: "me-id",
      }),
      Sale: () => ({
        slug: "auction-slug",
      }),
      SaleArtwork: () => ({
        slug: "sale-artwork-slug",
        saleID: "saleID",
        endedAt: null,
      }),
    })

    wrapper.find("Button").simulate("click")

    expect(spy).toBeCalledWith({
      artworkSlug: "sale-artwork-slug",
      saleSlug: "auction-slug",
      userID: "me-id",
    })
  })
})
