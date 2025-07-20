import type { Breakpoint } from "@artsy/palette"
import { AuctionActiveBidsRefetchContainer } from "Apps/Auction/Components/AuctionActiveBids"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen, fireEvent } from "@testing-library/react"
import { useRouter } from "System/Hooks/useRouter"
import type { AuctionActiveBidsQuery } from "__generated__/AuctionActiveBidsQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Apps/Auction/Hooks/useAuctionTracking")
jest.mock("Apps/Auction/Routes/Bid/Components/AuctionLotInfo", () => ({
  AuctionLotInfoFragmentContainer: () => (
    <div>AuctionLotInfoFragmentContainer</div>
  ),
}))

jest.mock("System/Hooks/useRouter")

describe("AuctionActiveBids", () => {
  const mockUseRouter = useRouter as jest.Mock
  const mockUseAuctionTracking = useAuctionTracking as jest.Mock

  const setup = (breakpoint: Breakpoint = "lg") => {
    const { renderWithRelay } = setupTestWrapperTL<AuctionActiveBidsQuery>({
      Component: (props: any) => {
        return (
          <MockBoot breakpoint={breakpoint}>
            <AuctionActiveBidsRefetchContainer {...props} />
          </MockBoot>
        )
      },
      query: graphql`
        query AuctionActiveBidsQuery($slug: String!) @relay_test_operation {
          me {
            ...AuctionActiveBids_me @arguments(saleID: $slug)
          }
        }
      `,
      variables: {
        slug: "auction-slug",
      },
    })
    return { renderWithRelay }
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
    const { renderWithRelay } = setup("sm")

    it("renders correct components", () => {
      renderWithRelay({
        Me: () => ({
          lotStandings: [
            {
              saleArtwork: {
                slug: "sale-artwork-slug",
                saleID: "saleID",
                endedAt: null,
              },
            },
          ],
        }),
      })
      expect(screen.getByText("Your Active Bids")).toBeInTheDocument()
      expect(
        screen.getByText("AuctionLotInfoFragmentContainer"),
      ).toBeInTheDocument()
      expect(screen.getByText("Increase Bid")).toBeInTheDocument()
    })
  })

  describe("desktop", () => {
    const { renderWithRelay } = setup("lg")

    it("renders correct components", () => {
      renderWithRelay()
      expect(screen.getByText("Your Active Bids")).toBeInTheDocument()
      expect(
        screen.getByText("AuctionLotInfoFragmentContainer"),
      ).toBeInTheDocument()
    })

    it("shows current bid", () => {
      renderWithRelay({
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

      expect(screen.getByText("$2000")).toBeInTheDocument()
    })

    describe("auction with cascading lots, some closed", () => {
      it("displays bidding closed for a lot that has closed", () => {
        renderWithRelay({
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

        expect(screen.getByText("Bidding Closed")).toBeInTheDocument()
        expect(screen.getByText("Increase Bid")).toBeInTheDocument()
      })
    })

    describe("auction with live bidding that is already started", () => {
      it("displays live bidding in process", () => {
        renderWithRelay({
          Me: () => ({
            lotStandings: [
              {
                saleArtwork: {
                  counts: {
                    bidderPositions: 1,
                  },
                  sale: {
                    slug: "auction-slug",
                    isLiveOpen: true,
                  },
                },
              },
            ],
          }),
        })

        expect(screen.getByText("Bidding live now")).toBeInTheDocument()
      })
    })

    describe("current bid", () => {
      it("shows current bid count", () => {
        renderWithRelay({
          Me: () => ({
            lotStandings: [
              {
                saleArtwork: {
                  counts: {
                    bidderPositions: 1,
                  },
                  slug: "sale-artwork-slug",
                  saleID: "saleID",
                  endedAt: null,
                },
              },
            ],
          }),
        })

        expect(screen.getByText("(1 bid)")).toBeInTheDocument()
      })

      it("handles pluralization", () => {
        renderWithRelay({
          Me: () => ({
            lotStandings: [
              {
                saleArtwork: {
                  counts: {
                    bidderPositions: 2,
                  },
                  slug: "sale-artwork-slug",
                  saleID: "saleID",
                  endedAt: null,
                },
              },
            ],
          }),
        })

        expect(screen.getByText("(2 bids)")).toBeInTheDocument()
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

    setup("sm").renderWithRelay({
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

    fireEvent.click(screen.getByText("Increase Bid"))

    expect(spy).toBeCalledWith(
      "/auction/saleID/bid/sale-artwork-slug?redirectTo=/auction/saleID",
    )
  })

  it("tracks clicks", () => {
    const spy = jest.fn()

    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        clickedActiveBid: spy,
      },
    }))

    setup("sm").renderWithRelay({
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

    fireEvent.click(screen.getByText("Increase Bid"))

    expect(spy).toBeCalledWith({
      artworkSlug: "sale-artwork-slug",
      saleSlug: "auction-slug",
      userID: "me-id",
    })
  })
})
