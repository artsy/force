import Articles from "desktop/collections/articles"
import moment from "moment"
import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import { cloneDeep } from "lodash"
import { followedArtistSaleArtworks } from "../artwork_browser/__tests__/fixtures/followedArtistSaleArtworks"
import { promotedSaleArtworks } from "../artwork_browser/__tests__/fixtures/promotedSaleArtworks"

const rewire = require("rewire")("../Layout")
const Layout = rewire.default

describe.skip("<Layout />", () => {
  let resetRewire

  beforeEach(() => {
    resetRewire = rewire.__set__("Banner", () => "")
  })

  afterEach(() => {
    resetRewire()
  })

  it("default auction with no user", () => {
    const { wrapper } = renderTestComponent({
      Component: Layout,
      options: { renderMode: "render" },
      data: {
        app: {
          auction: {
            name: "An Auction",
          },
        },
      },
    })

    wrapper
      .find(".auction-AuctionInfo__title")
      .html()
      .should.containEql("An Auction")
    wrapper
      .find(".auction-Registration")
      .html()
      .should.containEql("Register to bid")
    wrapper.find(".auction-MyActiveBids").length.should.eql(0)
  })

  it("preview auction with no user", () => {
    const { wrapper } = renderTestComponent({
      Component: Layout,
      options: { renderMode: "render" },
      data: {
        app: {
          auction: {
            name: "An Auction",
            auction_state: "preview",
            cover_image: "foo.jpg",
          },
          sd: {
            sd: {
              ARTSY_EDITORIAL_CHANNEL: "foo",
            },
          },
        },
      },
    })

    wrapper
      .find(".auction-AuctionInfo__title")
      .html()
      .should.containEql("An Auction")
    wrapper
      .find(".auction-Registration")
      .html()
      .should.containEql("Register to bid")
    wrapper.find(".auction-MyActiveBids").length.should.eql(0)
  })

  it("live auction, open for pre-bidding", () => {
    const { wrapper } = renderTestComponent({
      Component: Layout,
      options: { renderMode: "render" },
      data: {
        app: {
          auction: {
            name: "An Auction",
            auction_state: "open",
            auction_promo: "false",
            live_start_at: moment().add(3, "days"),
          },
        },
      },
    })

    wrapper
      .find(".auction-AuctionInfo__title")
      .text()
      .should.equal("An Auction")
    wrapper
      .find(".auction-Registration")
      .html()
      .should.containEql("Register to bid")
    wrapper.find(".auction-MyActiveBids").length.should.eql(0)
    wrapper
      .find(".auction-AuctionInfo__callout")
      .text()
      .should.containEql("Live bidding begins")
  })

  it("live auction, open for live bidding", () => {
    const { wrapper } = renderTestComponent({
      Component: Layout,
      options: { renderMode: "render" },
      data: {
        app: {
          auction: {
            name: "An Auction",
            auction_state: "open",
            live_start_at: moment().subtract(3, "days"),
          },
        },
      },
    })

    wrapper
      .find(".auction-AuctionInfo__title")
      .text()
      .should.equal("An Auction")
    wrapper.find(".js-register-button").text().should.equal("Register to bid")
    wrapper.find(".auction-MyActiveBids").length.should.eql(0)
    wrapper
      .find(".auction-AuctionInfo__callout")
      .text()
      .should.containEql("Live bidding now open")
  })

  it("default auction with user", () => {
    const { wrapper } = renderTestComponent({
      Component: Layout,
      options: { renderMode: "render" },
      data: {
        app: {
          me: {
            id: "user",
            bidders: [],
          },
          auction: {
            name: "An Auction",
          },
        },
      },
    })

    wrapper
      .find(".auction-AuctionInfo__title")
      .text()
      .should.equal("An Auction")
    wrapper.find(".js-register-button").text().should.equal("Register to bid")
    wrapper
      .find(".auction-Registration__small")
      .text()
      .should.containEql("Registration required to bid")
  })

  it("user with bidder positions", () => {
    const { wrapper } = renderTestComponent({
      Component: Layout,
      options: { renderMode: "render" },
      data: {
        app: {
          me: {
            id: "user",
            bidders: [1],
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
                    is_live_open: false,
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
          auction: {
            name: "An Auction",
            is_open: true,
          },
        },
      },
    })

    wrapper.find(".auction-MyActiveBids").length.should.equal(1)
  })

  it("index, registered to bid but not qualified", () => {
    const { wrapper } = renderTestComponent({
      Component: Layout,
      options: { renderMode: "render" },
      data: {
        app: {
          me: {
            id: "user",
            bidders: [
              {
                qualified_for_bidding: false,
              },
            ],
          },
          auction: {
            name: "An Auction",
          },
        },
      },
    })

    wrapper
      .find(".auction-AuctionInfo__title")
      .text()
      .should.equal("An Auction")
    wrapper
      .find(".auction-Registration")
      .html()
      .should.containEql("Registration pending")
    wrapper
      .find(".auction-Registration")
      .html()
      .should.containEql("Reviewing submitted information")
  })

  it("index, registered to bid and qualified", () => {
    const { wrapper } = renderTestComponent({
      Component: Layout,
      options: { renderMode: "render" },
      data: {
        app: {
          me: {
            id: "user",
            bidders: [
              {
                qualified_for_bidding: true,
              },
            ],
          },
          auction: {
            name: "An Auction",
          },
        },
      },
    })

    wrapper
      .find(".auction-AuctionInfo__title")
      .text()
      .should.equal("An Auction")
    wrapper
      .find(".auction-Registration")
      .html()
      .should.containEql("Approved to Bid")
  })

  it("index, registered to bid but auction closed", () => {
    const { wrapper } = renderTestComponent({
      Component: Layout,
      options: { renderMode: "render" },
      data: {
        app: {
          me: {
            id: "user",
            bidders: [
              {
                qualified_for_bidding: true,
              },
            ],
          },
          auction: {
            name: "An Auction",
            is_closed: true,
            auction_state: "closed",
          },
        },
        artworkBrowser: {
          isClosed: true,
        },
      },
    })

    wrapper
      .find(".auction-AuctionInfo__title")
      .text()
      .should.equal("An Auction")
    wrapper
      .find(".auction-AuctionInfo__callout")
      .text()
      .should.equal("Auction Closed")
  })

  describe("index, registration closed", () => {
    it("renders registration closed", () => {
      const { wrapper } = renderTestComponent({
        Component: Layout,
        options: { renderMode: "render" },
        data: {
          app: {
            auction: {
              name: "An Auction",
              is_auction: true,
              registration_ends_at: moment().subtract(2, "days").format(),
            },
          },
        },
      })

      wrapper
        .find(".auction-Registration")
        .html()
        .should.containEql("Registration closed")
      wrapper
        .find(".auction-Registration__small")
        .html()
        .should.containEql("Registration required to bid")
    })
  })

  describe("auction with no artworks", () => {
    describe("an auction promo", () => {
      it("does not show the footer at all", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data: {
            app: {
              auction: {
                name: "An Auction",
                sale_type: "auction promo",
                eligible_sale_artworks_count: 0,
              },
              articles: new Articles([]),
              sd: {
                sd: {
                  ARTSY_EDITORIAL_CHANNEL: "foo",
                },
              },
            },
          },
        })

        wrapper
          .find(".auction-Footer__auction-app-promo-wrapper")
          .length.should.eql(0)
      })
    })
  })

  describe("footer", () => {
    let article
    beforeEach(() => {
      article = {
        slug: "artsy-editorial-fight-art",
        thumbnail_title: "The Fight to Own Art",
        thumbnail_image: {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/e6rsZcv5h7zCL7gU_4cjXw%2Frose.jpg",
        },
        tier: 1,
        published_at: "2017-01-26T00:26:57.928Z",
        channel_id: "5759e3efb5989e6f98f77993",
        author: {
          id: "54cfdab872616972546e0400",
          name: "Artsy Editorial",
        },
        contributing_authors: [
          {
            id: "abc124",
            name: "Abigail C",
          },
          {
            id: "def456",
            name: "Anna S",
          },
        ],
      }
    })

    describe("no articles", () => {
      it("does not show the footer at all", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data: {
            app: {
              auction: {
                name: "An Auction",
              },
              articles: [],
              sd: {
                sd: {
                  ARTSY_EDITORIAL_CHANNEL: "foo",
                },
              },
            },
          },
        })

        wrapper.find(".auction-Footer").length.should.eql(0)
      })
    })

    describe("articles, auction promo", () => {
      it("shows the footer but not the extra footer item", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data: {
            app: {
              auction: {
                name: "An Auction",
                sale_type: "auction promo",
              },
              articles: [article],
              isMobile: false,
              sd: {
                sd: {
                  ARTSY_EDITORIAL_CHANNEL: "foo",
                },
              },
            },
          },
        })

        wrapper
          .find(".auction-Footer")
          .html()
          .should.containEql("The Fight to Own Art")
        wrapper
          .find(".auction-Footer")
          .html()
          .should.containEql("Artsy Editorial")
        wrapper
          .find(".auction-Footer")
          .html()
          .should.containEql("By Abigail C and Anna S")
        wrapper
          .find(".auction-Footer__auction-app-promo-wrapper")
          .length.should.equal(0)
      })
    })

    describe("articles, not auction promo", () => {
      it("shows the articles and the extra footer item", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data: {
            app: {
              auction: {
                name: "An Auction",
              },
              articles: [article],
              isMobile: false,
              sd: {
                sd: {
                  ARTSY_EDITORIAL_CHANNEL: "foo",
                },
              },
            },
          },
        })

        wrapper
          .find(".auction-Footer")
          .html()
          .should.containEql("The Fight to Own Art")
        wrapper
          .find(".auction-Footer")
          .html()
          .should.containEql("Artsy Editorial")
        wrapper
          .find(".auction-Footer")
          .html()
          .should.containEql("By Abigail C and Anna S")
        wrapper
          .find(".auction-Footer")
          .html()
          .should.containEql("Bid from your phone")
      })
    })
  })

  describe("artwork rails", () => {
    const data = {
      app: {
        isMobile: false,
        auction: {
          name: "An Auction",
          sale_type: "auction promo",
          eligible_sale_artworks_count: 0,
          promoted_sale: {
            saleArtworksConnection: promotedSaleArtworks,
          },
        },
      },
      artworkBrowser: {
        saleArtworksByFollowedArtists: followedArtistSaleArtworks,
      },
    }

    describe("<BuyNowSaleArtworks />", () => {
      it("does not render if there is no data", () => {
        let emptyData = cloneDeep(data)
        emptyData.app.auction.promoted_sale.saleArtworksConnection = null

        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data: emptyData,
        })

        wrapper.html().should.not.containEql("Buy now")
      })

      it("renders a desktop rail", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data,
        })

        wrapper.html().should.containEql("Buy now")
        wrapper
          .html()
          .should.containEql("/artwork/torkil-gudnason-hothouse-flowers")
        wrapper.html().should.containEql("/artwork/piper-oneill-boop")
      })

      it("renders a mobile rail", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data: {
            ...data,
            isMobile: true,
          },
        })

        wrapper.html().should.containEql("Buy now")
        wrapper
          .html()
          .should.containEql("/artwork/torkil-gudnason-hothouse-flowers")
        wrapper.html().should.containEql("/artwork/piper-oneill-boop")
      })
    })

    describe("<ArtworksByFollowedArtists />", () => {
      it("does not render if there is no data", () => {
        let emptyData = cloneDeep(data)
        emptyData.artworkBrowser.saleArtworksByFollowedArtists = null

        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data: emptyData,
        })

        wrapper.html().should.not.containEql("Works By Artists You Follow")
      })

      it("renders a desktop rail", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data,
        })

        wrapper.html().should.containEql("Works By Artists You Follow")
        wrapper
          .html()
          .should.containEql("/artwork/svend-aage-larsen-surrealism")
        wrapper.html().should.containEql("/artwork/emile-gsell-untitled")
      })

      it("renders a mobile rail", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data: {
            ...data,
            isMobile: true,
          },
        })

        wrapper.html().should.containEql("Works By Artists You Follow")
        wrapper
          .html()
          .should.containEql("/artwork/svend-aage-larsen-surrealism")
        wrapper.html().should.containEql("/artwork/emile-gsell-untitled")
      })
    })
  })

  describe("e-commerce sale", () => {
    const data = {
      app: {
        isEcommerceSale: true,
        isMobile: false,
        auction: {
          name: "An Auction",
          sale_type: "auction promo",
          eligible_sale_artworks_count: 0,
          promoted_sale: {
            saleArtworksConnection: promotedSaleArtworks,
          },
        },
      },
    }

    describe("desktop", () => {
      it("removes top timer component", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data,
        })

        wrapper.html().should.not.containEql("clock")
      })

      it("hides registration button", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data,
        })

        wrapper.html().should.not.containEql("auction-Registration")
      })

      it("remove auction-related sort items", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data,
        })

        wrapper.html().should.not.containEql("Lot Number Asc")
        wrapper.html().should.not.containEql("Lot Number Desc")
        wrapper.html().should.not.containEql("Most Bids")
        wrapper.html().should.not.containEql("Least Bids")
      })

      it("does not show active bids", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data,
        })

        wrapper.find(".auction-MyActiveBids").length.should.eql(0)
      })
    })

    describe("mobile", () => {
      const mobileData = cloneDeep(data)
      mobileData.app.isMobile = true

      it("removes top timer component", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data: mobileData,
        })

        wrapper.html().should.not.containEql("clock")
      })

      it("hides registration button", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data: mobileData,
        })

        wrapper.html().should.not.containEql("auction-Registration")
      })

      it("remove auction-related sort items", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data: mobileData,
        })

        wrapper.html().should.not.containEql("Lot Number Asc")
        wrapper.html().should.not.containEql("Lot Number Desc")
        wrapper.html().should.not.containEql("Most Bids")
        wrapper.html().should.not.containEql("Least Bids")
      })

      it("does not show active bids", () => {
        const { wrapper } = renderTestComponent({
          Component: Layout,
          options: { renderMode: "render" },
          data: mobileData,
        })

        wrapper.find(".auction-MyActiveBids").length.should.eql(0)
      })
    })
  })
})
