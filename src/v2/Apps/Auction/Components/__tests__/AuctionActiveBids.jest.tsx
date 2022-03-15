import { Breakpoint } from "@artsy/palette"
import { graphql } from "react-relay"
import { MockBoot } from "v2/DevTools"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { AuctionActiveBidsRefetchContainer } from "../AuctionActiveBids"
import { AuctionActiveBidsTestQuery } from "v2/__generated__/AuctionActiveBidsTestQuery.graphql"
import { useAuctionTracking } from "v2/Apps/Auction/Hooks/useAuctionTracking"
import { useRouter } from "v2/System/Router/useRouter"

jest.unmock("react-relay")

jest.mock("v2/Apps/Auction/Hooks/useAuctionTracking")
jest.mock("v2/Apps/Auction/Routes/Bid/Components/AuctionLotInfo", () => ({
  AuctionLotInfoFragmentContainer: () => null,
}))

jest.mock("v2/System/Router/useRouter")

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
    return getWrapper
  }

  beforeEach(() => {
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

  afterEach(() => {
    jest.resetAllMocks()
  })

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

    const wrapper = setup("sm")({
      Me: () => ({
        internalID: "me-id",
      }),
      Sale: () => ({
        slug: "auction-slug",
      }),
      SaleArtwork: () => ({
        slug: "sale-artwork-slug",
        saleID: "saleID",
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

    const wrapper = setup("sm")({
      Me: () => ({
        internalID: "me-id",
      }),
      Sale: () => ({
        slug: "auction-slug",
      }),
      SaleArtwork: () => ({
        slug: "sale-artwork-slug",
        saleID: "saleID",
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
