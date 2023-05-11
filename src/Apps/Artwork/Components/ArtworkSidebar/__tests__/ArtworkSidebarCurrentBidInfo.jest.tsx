import { ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse } from "__generated__/ArtworkSidebarCurrentBidInfo_Test_Query.graphql"
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
import { renderRelayTree } from "DevTools/renderRelayTree"
import { graphql } from "react-relay"
import { mockTracking } from "DevTools/mockTracking"
import CheckmarkStrokeIcon from "@artsy/icons/CheckmarkStrokeIcon"
import CloseStrokeIcon from "@artsy/icons/CloseStrokeIcon"

jest.unmock("react-relay")
jest.unmock("react-tracking")

describe("ArtworkSidebarCurrentBidInfo", () => {
  const { Component, dispatch: mockTrack } = mockTracking(
    ArtworkSidebarCurrentBidInfoFragmentContainer
  )
  const getWrapper = async (
    response: ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse["artwork"]
  ) => {
    return renderRelayTree({
      Component,
      query: graphql`
        query ArtworkSidebarCurrentBidInfo_Test_Query
          @raw_response_type
          @relay_test_operation {
          artwork(id: "auction_artwork_estimate_premium") {
            ...ArtworkSidebarCurrentBidInfo_artwork
          }
        }
      `,
      mockData: {
        artwork: response,
      } as ArtworkSidebarCurrentBidInfo_Test_Query$rawResponse,
    })
  }

  describe("analytics", () => {
    it("tracks a click on the buyers premium link", async () => {
      const component = await getWrapper(OpenAuctionReserveMetWithMyWinningBid)

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      component
        .find("button")
        .filterWhere(l => l.text() === "buyer’s premium")
        .first()
        .props()
        .onClick({} as any)

      expect(mockTrack).toBeCalledWith({
        action_type: "Click",
        context_module: "Sidebar",
        subject: "Buyer premium",
        type: "Link",
      })
    })
  })

  describe("for closed auction", () => {
    it("displays Auction Closed", async () => {
      const wrapper = await getWrapper(ClosedAuctionArtwork)

      expect(wrapper.text()).toContain("Bidding closed")
    })
  })

  describe("for closed auction with cascading end time turned on and a lot closed", () => {
    it("displays Auction Closed", async () => {
      const wrapper = await getWrapper(ClosedLotArtwork)

      expect(wrapper.text()).toContain("Bidding closed")
    })
  })

  describe("for live sale in progress", () => {
    it("does not display anything", async () => {
      const wrapper = await getWrapper(LiveAuctionInProgress)

      expect(wrapper.html()).toBeFalsy()
    })
  })

  describe("for auction preview", () => {
    it("displays proper starting bid info", async () => {
      const wrapper = await getWrapper(AuctionPreview)

      expect(wrapper.text()).toContain("Starting bid")
      expect(wrapper.text()).toContain("CHF 4,000")
    })
  })

  describe("for auction preview with no start bid set", () => {
    it("displays nothing if current bid info is unavailable", async () => {
      const wrapper = await getWrapper(AuctionPreviewNoStartingBid)
      expect(wrapper.html()).toBeFalsy()
    })
  })

  describe("for open auction with no reserve and no bids", () => {
    it("displays proper starting bid info", async () => {
      const wrapper = await getWrapper(OpenAuctionNoReserveNoBids)

      expect(wrapper.text()).toContain("Starting bid")
      expect(wrapper.text()).toContain("$500")
    })
  })

  describe("open auction with no reserve with bids present", () => {
    it("displays proper current bid info including bid count", async () => {
      const wrapper = await getWrapper(OpenAuctionNoReserveWithBids)

      expect(wrapper.text()).toContain("Current bid")
      expect(wrapper.text()).toContain("11 bids")
      expect(wrapper.text()).toContain("$850")
    })
  })

  describe("for open auction with reserve and no bids", () => {
    it("displays proper starting bid info and resserve message", async () => {
      const wrapper = await getWrapper(OpenAuctionReserveNoBids)

      expect(wrapper.text()).toContain("Starting bid")
      expect(wrapper.text()).toContain("This work has a reserve.")
      expect(wrapper.text()).toContain("$3,000")
    })
  })

  describe("for open auction with some bids and reserve not met", () => {
    it("displays current bid message inculding reserve warning", async () => {
      const wrapper = await getWrapper(OpenAuctionReserveNotMetWithBids)

      expect(wrapper.text()).toContain("Current bid")
      expect(wrapper.text()).toContain("2 bids, reserve not met.")
      expect(wrapper.text()).toContain("$10,000")
    })
  })

  describe("for open auction with some bids and satisfied reserve", () => {
    it("displays current bid message inculding reserve met", async () => {
      const wrapper = await getWrapper(OpenAuctionReserveMetWithBids)

      expect(wrapper.text()).toContain("Current bid")
      expect(wrapper.text()).toContain("2 bids, reserve met.")
      expect(wrapper.text()).toContain("$500")
    })
  })

  describe("for open auction with my bid winning", () => {
    it("displays max bid and winning indicator", async () => {
      const wrapper = await getWrapper(OpenAuctionReserveMetWithMyWinningBid)

      expect(wrapper.text()).toContain("Your max: $15,000")
      expect(wrapper.find(CheckmarkStrokeIcon).length).toBe(1)
    })

    it("displays buyer's premium information", async () => {
      const wrapper = await getWrapper(OpenAuctionReserveMetWithMyWinningBid)

      expect(wrapper.text()).toContain("This auction has a buyer’s premium.")
      expect(wrapper.text()).toContain(
        "Shipping, taxes, and additional fees may apply."
      )
    })
  })

  describe("for open auction with my bid losing", () => {
    it("displays max bid and losing indicator", async () => {
      const wrapper = await getWrapper(OpenAuctionReserveMetWithMyLosingBid)

      expect(wrapper.text()).toContain("Your max: $400")
      expect(wrapper.find(CloseStrokeIcon).length).toBe(1)
    })
  })

  describe("for open auction with me increasing my max bid while winning", () => {
    it("displays max bid and winning indicator", async () => {
      const wrapper = await getWrapper(OpenAuctionReserveNotMetIncreasingOwnBid)

      expect(wrapper.text()).toContain("Your max: $15,000")
      expect(wrapper.find(CheckmarkStrokeIcon).length).toBe(1)
    })
  })
})
