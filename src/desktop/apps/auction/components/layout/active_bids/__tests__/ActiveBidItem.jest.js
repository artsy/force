import React from "react"
import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import { test } from "desktop/apps/auction/components/layout/active_bids/ActiveBidItem"

const { ActiveBidItem } = test

xdescribe("auction/components/layout/active_bids/ActiveBidItem.test", () => {
  describe("<ActiveBidItem />", () => {
    const bid = {
      active_bid: {
        id: "596d4f248b3b81036055b070",
      },
      is_leading_bidder: true,
      sale_artwork: {
        id: "warren-de-la-rue-lunar-photograph-executed-ca-1855",
        lot_label: "1",
        reserve_status: "no_reserve",
        counts: {
          bidder_positions: 1,
        },
        sale_id: "sothebys-space-exploration",
        highest_bid: {
          display: "$3,200",
        },
        sale: {
          live_start_at: "2017-07-20T15:00:00+00:00",
          end_at: null,
          is_live_open: false,
          is_closed: false,
        },
        artwork: {
          href: "/artwork/warren-de-la-rue-lunar-photograph-executed-ca-1855",
          title: "LUNAR PHOTOGRAPH, EXECUTED CA. 1855",
          date: "",
          image: {
            url:
              "https://d32dm0rphc51dk.cloudfront.net/qxdtJrW5v-JaxwoPVvrUtw/square.jpg",
          },
          artist: {
            name: "Warren De La Rue",
          },
        },
      },
    }

    const BidStatus = () => <div />

    it("renders and image", () => {
      const { wrapper } = renderTestComponent({
        Component: ActiveBidItem,
        props: {
          BidStatus: () => <div />,
          bid,
          ...bid.sale_artwork,
          isMobile: false,
        },
      })

      expect(wrapper.find("img").html()).toMatch(
        bid.sale_artwork.artwork.image.url
      )
    })

    it("renders a bid status", () => {
      const { wrapper } = renderTestComponent({
        Component: ActiveBidItem,
        props: {
          isMobile: true,
          BidStatus,
          bid,
          ...bid.sale_artwork,
        },
      })

      expect(wrapper.find(BidStatus).length).toBe(1)
    })

    it("renders a desktop highest bid", () => {
      const { wrapper } = renderTestComponent({
        Component: ActiveBidItem,
        props: {
          isMobile: false,
          BidStatus,
          bid,
          ...bid.sale_artwork,
        },
      })

      expect(wrapper.find(".auction-ActiveBidItem__current-bid").length).toBe(1)
      expect(
        wrapper.find(".auction-ActiveBidItem__current-bid").text()
      ).toMatch(`Current Bid: ${bid.sale_artwork.highest_bid.display}`)
    })

    it("renders a mobile highest bid", () => {
      const { wrapper } = renderTestComponent({
        Component: ActiveBidItem,
        props: {
          isMobile: true,
          BidStatus,
          bid,
          ...bid.sale_artwork,
        },
      })

      expect(
        wrapper.find(".auction-ActiveBidItem__current-and-bids").length
      ).toBe(1)
      expect(
        wrapper.find(".auction-ActiveBidItem__current-bid").text()
      ).toMatch(bid.sale_artwork.highest_bid.display)
    })

    it("renders a bid live button", () => {
      const { wrapper } = renderTestComponent({
        Component: ActiveBidItem,
        props: {
          isMobile: false,
          BidStatus,
          bid,
          ...bid.sale_artwork,
          sale: {
            is_live_open: true,
          },
        },
      })

      expect(
        wrapper
          .find("a")
          .last()
          .text()
      ).toMatch("Bid Live")
    })

    it("renders a bid button", () => {
      const { wrapper } = renderTestComponent({
        Component: ActiveBidItem,
        props: {
          isMobile: false,
          BidStatus,
          bid,
          ...bid.sale_artwork,
          sale: {
            is_live_open: false,
          },
        },
      })

      expect(
        wrapper
          .find("a")
          .last()
          .text()
      ).toMatch("Bid")
    })
  })
})
