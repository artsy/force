import MyActiveBids from "desktop/apps/auction/components/layout/active_bids/MyActiveBids"
import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import { initialState } from "desktop/apps/auction/reducers"
const { Auction } = require("desktop/models/auction")
const CurrentUser = require("desktop/models/current_user")

// FIXME: Add required props
xdescribe("apps/auction/components/layout/active_bids/MyActiveBids", () => {
  let baseData

  beforeEach(() => {
    baseData = {
      auction: new Auction(),
      viewHelpers: { getLiveAuctionUrl: () => "placeholderauctionurl.com" },
      me: {
        lot_standings: [],
      },
    }
  })

  function setup(data = {}) {
    const { wrapper } = renderTestComponent({
      Component: MyActiveBids,
      options: {
        renderMode: "render",
      },
      data: {
        app: {
          ...baseData,
          ...data,
        },
        artworkBrowser: initialState,
      },
    })

    return wrapper
  }

  describe("<MyActiveBids />", () => {
    it("displays an outbid bid status", () => {
      const wrapper = setup({
        isMobile: false,
        me: {
          lot_standings: [
            {
              is_leading_bidder: false,
              sale_artwork: {
                id: "imhuge-brillo-condensed-soap",
                lot_label: "2",
                reserve_status: "no_reserve",
                counts: {
                  bidder_positions: 1,
                },
                sale_id:
                  "juliens-auctions-street-and-contemporary-art-day-sale",
                highest_bid: {
                  display: "$750",
                },
                sale: {
                  end_at: "2016-10-31T04:28:00+00:00",
                },
                artwork: {
                  href: "/artwork/imhuge-brillo-condensed-soap",
                  title: "Brillo Condensed Soap",
                  date: "2016",
                  image: {
                    url:
                      "https://d32dm0rphc51dk.cloudfront.net/G5tbqHUjuiGvjwDtCVlsGQ/square.jpg",
                  },
                  artist: {
                    name: "Imhuge",
                  },
                },
              },
            },
          ],
        },
        user: new CurrentUser({ id: "user" }),
      })

      expect(wrapper.find("h2").length).toBe(1)
      expect(wrapper.find(".bid-status").length).toBe(1)
      expect(wrapper.find(".bid-status").text()).toMatch("Outbid")
      expect(wrapper.find(".auction-ActiveBidItem__bid-button").length).toBe(1)
      expect(wrapper.find(".auction-ActiveBidItem__bid-button").text()).toMatch(
        "Bid"
      )
    })

    it("displays a Bid Live button if is_live_open", () => {
      const wrapper = setup({
        isMobile: false,
        me: {
          lot_standings: [
            {
              is_leading_bidder: false,
              sale_artwork: {
                id: "imhuge-brillo-condensed-soap",
                lot_label: "2",
                reserve_status: "no_reserve",
                counts: {
                  bidder_positions: 1,
                },
                sale_id:
                  "juliens-auctions-street-and-contemporary-art-day-sale",
                highest_bid: {
                  display: "$750",
                },
                sale: {
                  end_at: "2016-10-31T04:28:00+00:00",
                  is_live_open: true,
                },
                artwork: {
                  href: "/artwork/imhuge-brillo-condensed-soap",
                  title: "Brillo Condensed Soap",
                  date: "2016",
                  image: {
                    url:
                      "https://d32dm0rphc51dk.cloudfront.net/G5tbqHUjuiGvjwDtCVlsGQ/square.jpg",
                  },
                  artist: {
                    name: "Imhuge",
                  },
                },
              },
            },
          ],
        },
        user: new CurrentUser({ id: "user" }),
      })

      expect(wrapper.find("h2").length).toBe(1)
      expect(wrapper.find(".bid-status").length).toBe(0)
      expect(
        wrapper.find(".auction-ActiveBidItem__bid-live-button").length
      ).toBe(1)
      expect(
        wrapper.find(".auction-ActiveBidItem__bid-live-button").text()
      ).toMatch("Bid Live")
    })
  })
})
