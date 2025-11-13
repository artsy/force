import {
  AuctionPreview,
  AuctionPreviewNoStartingBid,
  ClosedAuctionArtwork,
  ClosedLotArtwork,
  LiveAuctionInProgress,
  OpenAuctionNoReserveNoBids,
  OpenAuctionNoReserveWithBids,
  OpenAuctionReserveMetWithBids,
  OpenAuctionReserveMetWithMyLosingBid,
  OpenAuctionReserveMetWithMyWinningBid,
  OpenAuctionReserveNoBids,
  OpenAuctionReserveNotMetIncreasingOwnBid,
  OpenAuctionReserveNotMetWithBids,
} from "Apps/__tests__/Fixtures/Artwork/ArtworkSidebar/ArtworkSidebarCurrentBidInfo"
import { ArtworkSidebarCurrentBidInfoFragmentContainer } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarCurrentBidInfo"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/react"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")

describe("ArtworkSidebarCurrentBidInfo", () => {
  const mockUseTracking = useTracking as jest.Mock
  const mockTrack = jest.fn()

  beforeEach(() => {
    mockTrack.mockClear()
    mockUseTracking.mockImplementation(() => ({ trackEvent: mockTrack }))
  })

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <ArtworkSidebarCurrentBidInfoFragmentContainer
        artwork={props.artwork!}
        currentBidChanged={false}
      />
    ),
    query: graphql`
      query ArtworkSidebarCurrentBidInfoTestQuery
      @raw_response_type
      @relay_test_operation {
        artwork(id: "auction_artwork_estimate_premium") {
          ...ArtworkSidebarCurrentBidInfo_artwork
        }
      }
    `,
  })

  const getWrapper = (artworkData: any) => {
    return renderWithRelay({
      Artwork: () => artworkData,
    })
  }

  describe("analytics", () => {
    it("tracks a click on the buyers premium link", () => {
      getWrapper(OpenAuctionReserveMetWithMyWinningBid)

      // The button is rendered with underlined text "buyer's premium"
      const buyersPremiumButton = screen.getByRole("button")
      fireEvent.click(buyersPremiumButton)

      expect(mockTrack).toBeCalledWith({
        action_type: "Click",
        context_module: "Sidebar",
        subject: "Buyer premium",
        type: "Link",
      })
    })
  })

  describe("for closed auction", () => {
    it("displays Auction Closed", () => {
      getWrapper(ClosedAuctionArtwork)

      expect(screen.getByText("Bidding closed")).toBeInTheDocument()
    })
  })

  describe("for closed auction with cascading end time turned on and a lot closed", () => {
    it("displays Auction Closed", () => {
      getWrapper(ClosedLotArtwork)

      expect(screen.getByText("Bidding closed")).toBeInTheDocument()
    })
  })

  describe("for live sale in progress", () => {
    it("does not display anything", () => {
      const { container } = getWrapper(LiveAuctionInProgress)

      expect(container.innerHTML).toBe("")
    })
  })

  describe("for auction preview", () => {
    it("displays proper starting bid info", () => {
      getWrapper(AuctionPreview)

      expect(screen.getByText("Starting bid")).toBeInTheDocument()
      expect(screen.getByText("CHF 4,000")).toBeInTheDocument()
    })
  })

  describe("for auction preview with no start bid set", () => {
    it("displays nothing if current bid info is unavailable", () => {
      const { container } = getWrapper(AuctionPreviewNoStartingBid)
      expect(container.innerHTML).toBe("")
    })
  })

  describe("for open auction with no reserve and no bids", () => {
    it("displays proper starting bid info", () => {
      getWrapper(OpenAuctionNoReserveNoBids)

      expect(screen.getByText("Starting bid")).toBeInTheDocument()
      expect(screen.getByText("$500")).toBeInTheDocument()
    })
  })

  describe("open auction with no reserve with bids present", () => {
    it("displays proper current bid info including bid count", () => {
      getWrapper(OpenAuctionNoReserveWithBids)

      expect(screen.getByText("Current bid")).toBeInTheDocument()
      expect(screen.getByText("11 bids")).toBeInTheDocument()
      expect(screen.getByText("$850")).toBeInTheDocument()
    })
  })

  describe("for open auction with reserve and no bids", () => {
    it("displays proper starting bid info and resserve message", () => {
      getWrapper(OpenAuctionReserveNoBids)

      expect(screen.getByText("Starting bid")).toBeInTheDocument()
      expect(screen.getByText("This work has a reserve.")).toBeInTheDocument()
      expect(screen.getByText("$3,000")).toBeInTheDocument()
    })
  })

  describe("for open auction with some bids and reserve not met", () => {
    it("displays current bid message inculding reserve warning", () => {
      getWrapper(OpenAuctionReserveNotMetWithBids)

      expect(screen.getByText("Current bid")).toBeInTheDocument()
      expect(screen.getByText("2 bids, reserve not met.")).toBeInTheDocument()
      expect(screen.getByText("$10,000")).toBeInTheDocument()
    })
  })

  describe("for open auction with some bids and satisfied reserve", () => {
    it("displays current bid message inculding reserve met", () => {
      getWrapper(OpenAuctionReserveMetWithBids)

      expect(screen.getByText("Current bid")).toBeInTheDocument()
      expect(screen.getByText("2 bids, reserve met.")).toBeInTheDocument()
      expect(screen.getByText("$500")).toBeInTheDocument()
    })
  })

  describe("for open auction with my bid winning", () => {
    it("displays max bid and winning indicator", () => {
      getWrapper(OpenAuctionReserveMetWithMyWinningBid)

      expect(screen.getByText("Your max: $15,000")).toBeInTheDocument()
      // Icon has title "Winning Bid"
      expect(screen.getByTitle("Winning Bid")).toBeInTheDocument()
    })

    it("displays buyer's premium information", () => {
      getWrapper(OpenAuctionReserveMetWithMyWinningBid)

      // Text is split across elements so we use partial text matching
      expect(screen.getByText(/This auction has a/)).toBeInTheDocument()
      expect(screen.getByRole("button")).toBeInTheDocument() // The buyer's premium button
      expect(
        screen.getByText(/Shipping, taxes, and additional fees may apply/)
      ).toBeInTheDocument()
    })
  })

  describe("for open auction with my bid losing", () => {
    it("displays max bid and losing indicator", () => {
      getWrapper(OpenAuctionReserveMetWithMyLosingBid)

      expect(screen.getByText("Your max: $400")).toBeInTheDocument()
      // Icon has title "Losing Bid"
      expect(screen.getByTitle("Losing Bid")).toBeInTheDocument()
    })
  })

  describe("for open auction with me increasing my max bid while winning", () => {
    it("displays max bid and winning indicator", () => {
      getWrapper(OpenAuctionReserveNotMetIncreasingOwnBid)

      expect(screen.getByText("Your max: $15,000")).toBeInTheDocument()
      // Icon has title "Winning Bid"
      expect(screen.getByTitle("Winning Bid")).toBeInTheDocument()
    })
  })
})
