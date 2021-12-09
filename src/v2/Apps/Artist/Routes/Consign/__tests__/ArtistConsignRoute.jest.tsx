import { ArtistConsignRoute_Test_QueryRawResponse } from "v2/__generated__/ArtistConsignRoute_Test_Query.graphql"
import { SystemContextProvider } from "v2/System"
import { useTracking } from "v2/System/Analytics/useTracking"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { cloneDeep } from "lodash"
import { graphql } from "relay-runtime"
import { ArtistConsignRouteFragmentContainer } from "../ArtistConsignRoute"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

describe("ConsignRoute", () => {
  const trackEvent = jest.fn()

  const getWrapper = async (
    response: ArtistConsignRoute_Test_QueryRawResponse = ConsignRouteFixture
  ) => {
    return await renderRelayTree({
      Component: ({ artist, artworksByInternalID }) => {
        return (
          <SystemContextProvider>
            <MockBoot user={{ type: "Admin" }}>
              <ArtistConsignRouteFragmentContainer artist={artist} />
            </MockBoot>
          </SystemContextProvider>
        )
      },
      query: graphql`
        query ArtistConsignRoute_Test_Query($artistID: String!)
          @raw_response_type
          @relay_test_operation {
          artist(id: $artistID) {
            ...ArtistConsignRoute_artist

            targetSupply {
              isInMicrofunnel
            }
          }
        }
      `,
      variables: {
        artistID: "alex-katz",
      },
      mockData: response,
    })
  }

  beforeEach(() => {
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("ArtistConsignHeader", () => {
    it("displays artist name in header", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignHeader").text()).toContain("Alex Katz")
    })

    it("links out to consign page", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper.find("ArtistConsignHeader").find("RouterLink").html()
      ).toContain(
        `href="/consign/submission?contextPath=%2Fartist%2Falex-katz%2Fconsign&amp;subject=Request%20a%20price%20estimate"`
      )
    })

    it("tracks event", async () => {
      const wrapper = await getWrapper()
      wrapper.find("ArtistConsignHeader").find("RouterLink").simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "Sell Works by",
        flow: "Consignments",
        subject: "Request a price estimate",
      })
    })
  })

  describe("ArtistConsignRecentlySold", () => {
    it("returns null if no recently sold images", async () => {
      const artistWithoutArtworks = cloneDeep(ConsignRouteFixture) as any
      artistWithoutArtworks.artist.targetSupply.microfunnel.artworks = null
      const wrapper = await getWrapper(artistWithoutArtworks)
      expect(wrapper.find("ArtistConsignRecentlySold")).toEqual({})
    })

    it("includes artist name in recently sold", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper.find("ArtistConsignRecentlySold").find("Subheader").text()
      ).toContain("Alex Katz")
      expect(wrapper.find("ArtistConsignRecentlySold").text()).toContain(
        "Alex Katz"
      )
    })

    it("displays recently sold artworks", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper.find("ArtistConsignRecentlySold").find("FillwidthItem").length
      ).toEqual(4)
    })

    it("appends displays sold for <price> to artwork brick", async () => {
      const wrapper = await getWrapper()
      const html = wrapper.find("ArtistConsignRecentlySold").html()
      const prices = ["$5,000", "$8,500", "$1,300"]
      prices.forEach(price => {
        expect(html).toContain(`Sold for ${price}`)
      })
    })
  })

  describe("ArtistConsignPageViews", () => {
    it("includes artist name in pageview title", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignPageViews").text()).toContain(
        "Alex Katz"
      )
    })

    it("includes pageviews in header", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignPageViews").text()).toContain("3,500")
    })

    it("includes unique visitors in header", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignPageViews").text()).toContain("1,200")
    })
  })

  describe("ArtistConsignMarketTrends", () => {
    it("includes highest realized price in stat", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignMarketTrends").text()).toContain(
        "$4.17M"
      )
    })

    it("includes sell-through rate in stat", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignMarketTrends").text()).toContain("79%")
    })

    it("includes realized price in stat", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignMarketTrends").text()).toContain("177%")
    })

    it("includes button that links out to auction results", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper.find("ArtistConsignMarketTrends").find("RouterLink").html()
      ).toContain(`href="/artist/alex-katz/auction-results"`)
    })

    it("tracks event", async () => {
      const wrapper = await getWrapper()
      wrapper
        .find("ArtistConsignMarketTrends")
        .find("RouterLink")
        .simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        subject: "Explore Auction Results",
      })
    })
  })

  describe("ArtistConsignHowtoSell", () => {
    it("includes button that links out to request estimate", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper.find("ArtistConsignHowtoSell").find("RouterLink").html()
      ).toContain(
        `href="/consign/submission?contextPath=%2Fartist%2Falex-katz%2Fconsign&amp;subject=Request%20a%20price%20estimate"`
      )
    })

    it("tracks event", async () => {
      const wrapper = await getWrapper()
      wrapper
        .find("ArtistConsignHowtoSell")
        .find("RouterLink")
        .simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "How to sell your collection with Artsy",
        flow: "Consignments",
        subject: "Request a price estimate",
      })
    })
  })

  describe("ArtistConsignFAQ", () => {
    it("includes link and contact", async () => {
      const wrapper = await getWrapper()
      expect(wrapper.find("ArtistConsignFAQ").html()).toContain(
        "mailto:consign@artsty.net"
      )
    })

    it("tracks event", async () => {
      const wrapper = await getWrapper()
      wrapper
        .find("ArtistConsignFAQ")
        .find("[data-test='submitOnFAQ']")
        .simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "FAQ",
        subject: "submit works you’re interested in selling here",
      })
    })
  })

  describe("ArtistConsignSellArt", () => {
    it("includes button that links out to request estimate", async () => {
      const wrapper = await getWrapper()
      expect(
        wrapper.find("ArtistConsignSellArt").find("RouterLink").html()
      ).toContain(
        `href="/consign/submission?contextPath=%2Fartist%2Falex-katz%2Fconsign&amp;subject=Request%20a%20price%20estimate"`
      )
    })

    it("tracks event", async () => {
      const wrapper = await getWrapper()
      wrapper.find("ArtistConsignSellArt").find("RouterLink").simulate("click")
      expect(trackEvent).toHaveBeenCalledWith({
        action_type: "Click",
        context_module: "Sell Art From Your Collection",
        flow: "Consignments",
        subject: "Request a price estimate",
      })
    })
  })
})

const ConsignRouteFixture: ArtistConsignRoute_Test_QueryRawResponse = {
  artist: {
    href: "/artist/alex-katz",
    id: "QXJ0aXN0OjRkOGQxMjBjODc2YzY5N2FlMTAwMDA0Ng==",
    name: "Alex Katz",
    targetSupply: {
      isInMicrofunnel: true,
      microfunnel: {
        artworksConnection: {
          edges: [
            {
              node: {
                artists: [
                  {
                    href: "/artist/alex-katz",
                    id: "QXJ0aXN0OjRkOGQxMjBjODc2YzY5N2FlMTAwMDA0Ng==",
                    name: "Alex Katz",
                  },
                ],
                collecting_institution: null,
                cultural_maker: null,
                date: "1973",
                href: "/artwork/alex-katz-luna-park-2-maravell-67-schroder-68",
                id: "QXJ0d29yazo1ZDljYTZmZThmMWFlZTAwMTE0NzVjZjc=",
                image: {
                  aspectRatio: 0.75,
                  imageURL:
                    "https://d32dm0rphc51dk.cloudfront.net/JB8GqSuSHtsDHDIQ9nyPUw/medium.jpg",
                  resized: {
                    height: 395,
                    url:
                      "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fit&width=296&height=395&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FJB8GqSuSHtsDHDIQ9nyPUw%2Flarge.jpg",
                    width: 296,
                  },
                  url:
                    "https://d32dm0rphc51dk.cloudfront.net/JB8GqSuSHtsDHDIQ9nyPUw/large.jpg",
                },
                imageTitle: "This Image Has a Title, A. Artist, 2020",
                internalID: "5d9ca6fe8f1aee0011475cf7",
                is_biddable: false,
                is_inquireable: false,
                is_saved: false,
                partner: {
                  href: "/auction/partner-595e64cdcd530e765d529647",
                  id: "UGFydG5lcjo1OTVlNjRjZGNkNTMwZTc2NWQ1Mjk2NDc=",
                  name: "Doyle",
                  type: "Auction House",
                },
                realizedPrice: "$1,300",
                sale: {
                  display_timely_at: "live 6M ago",
                  id: "U2FsZTo1ZDliNjY2YjI4ZWVkYTAwMTJmZGQzMTc=",
                  is_auction: true,
                  is_closed: true,
                  is_live_open: false,
                  is_open: false,
                  is_preview: false,
                },
                sale_artwork: {
                  counts: {
                    bidder_positions: 13,
                  },
                  highest_bid: {
                    display: "$5,000",
                  },
                  id: "U2FsZUFydHdvcms6NWQ5Y2E3MDNiNjk1MmQwMDEyNzk5YmI2",
                  opening_bid: {
                    display: "$1,000",
                  },
                },
                sale_message: null,
                slug: "alex-katz-luna-park-2-maravell-67-schroder-68",
                title: "Luna Park 2 (Maravell 67; Schröder 68)",
              },
            },
            {
              node: {
                artists: [
                  {
                    href: "/artist/alex-katz",
                    id: "QXJ0aXN0OjRkOGQxMjBjODc2YzY5N2FlMTAwMDA0Ng==",
                    name: "Alex Katz",
                  },
                ],
                collecting_institution: null,
                cultural_maker: null,
                date: "2019",
                href: "/artwork/alex-katz-rose-bud-30",
                id: "QXJ0d29yazo1ZDEyNmY5YmJhNDZiYTAwMTJjMzEzNGY=",
                image: {
                  aspectRatio: 0.75,
                  imageURL:
                    "https://d32dm0rphc51dk.cloudfront.net/NcjBjx9Xz_pTqQp1G0gXWQ/medium.jpg",
                  resized: {
                    height: 394,
                    url:
                      "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fit&width=294&height=394&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FNcjBjx9Xz_pTqQp1G0gXWQ%2Flarge.jpg",
                    width: 294,
                  },
                  url:
                    "https://d32dm0rphc51dk.cloudfront.net/NcjBjx9Xz_pTqQp1G0gXWQ/large.jpg",
                },
                imageTitle: "This Image Has a Title, A. Artist, 2020",
                internalID: "5d126f9bba46ba0012c3134f",
                is_biddable: false,
                is_inquireable: false,
                is_saved: false,
                partner: {
                  href: "/adamar-fine-arts",
                  id: "UGFydG5lcjo1NGI0MGEzNzc3NmY3MjBlNDU5ZDA1MDA=",
                  name: "Adamar Fine Arts",
                  type: "Gallery",
                },
                realizedPrice: "$5,000",
                sale: null,
                sale_artwork: null,
                sale_message: "$11,000",
                slug: "alex-katz-rose-bud-30",
                title: "Rose Bud",
              },
            },
            {
              node: {
                artists: [
                  {
                    href: "/artist/alex-katz",
                    id: "QXJ0aXN0OjRkOGQxMjBjODc2YzY5N2FlMTAwMDA0Ng==",
                    name: "Alex Katz",
                  },
                ],
                collecting_institution: null,
                cultural_maker: null,
                date: "1994",
                href:
                  "/artwork/alex-katz-fog-and-night-from-the-northern-landscapes-series",
                id: "QXJ0d29yazo1Y2ZmZGRmZjQwNDkxODAwMGVjODliZWI=",
                image: {
                  aspectRatio: 1.7,
                  imageURL:
                    "https://d32dm0rphc51dk.cloudfront.net/2PzNL_vTOOx3Py9zfe7upw/medium.jpg",
                  resized: {
                    height: 395,
                    url:
                      "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fit&width=672&height=395&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F2PzNL_vTOOx3Py9zfe7upw%2Flarge.jpg",
                    width: 672,
                  },
                  url:
                    "https://d32dm0rphc51dk.cloudfront.net/2PzNL_vTOOx3Py9zfe7upw/large.jpg",
                },
                imageTitle: "This Image Has a Title, A. Artist, 2020",
                internalID: "5cffddff404918000ec89beb",
                is_biddable: false,
                is_inquireable: false,
                is_saved: false,
                partner: {
                  href: "/auction/partner-595e68c9275b24129e961234",
                  id: "UGFydG5lcjo1OTVlNjhjOTI3NWIyNDEyOWU5NjEyMzQ=",
                  name: "Rago",
                  type: "Auction House",
                },
                realizedPrice: "$8,500",
                sale: {
                  display_timely_at: "ends in 10M",
                  id: "U2FsZTo1Y2ZlOTk5ZDcwODY1ZTAwMGU5ODgxNzM=",
                  is_auction: true,
                  is_closed: true,
                  is_live_open: false,
                  is_open: false,
                  is_preview: false,
                },
                sale_artwork: {
                  counts: {
                    bidder_positions: 3,
                  },
                  highest_bid: {
                    display: "$1,300",
                  },
                  id: "U2FsZUFydHdvcms6NWNmZmRlMDE0MDQ5MTgwMDBlYzg5YmYy",
                  opening_bid: {
                    display: "$800",
                  },
                },
                sale_message: null,
                slug:
                  "alex-katz-fog-and-night-from-the-northern-landscapes-series",
                title: "Fog and Night from the Northern Landscapes series",
              },
            },
            {
              node: {
                artists: [
                  {
                    href: "/artist/alex-katz",
                    id: "QXJ0aXN0OjRkOGQxMjBjODc2YzY5N2FlMTAwMDA0Ng==",
                    name: "Alex Katz",
                  },
                ],
                collecting_institution: null,
                cultural_maker: null,
                date: "2017",
                href: "/artwork/alex-katz-laura-1-49",
                id: "QXJ0d29yazo1YWEyZTkwZDc2MjJkZDQ5ZGM4YjM1NmM=",
                image: {
                  aspectRatio: 0.66,
                  imageURL:
                    "https://d32dm0rphc51dk.cloudfront.net/WNHtB_gQLN3HxPW4nNGAjA/medium.jpg",
                  resized: {
                    height: 395,
                    url:
                      "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fit&width=261&height=395&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FWNHtB_gQLN3HxPW4nNGAjA%2Flarge.jpg",
                    width: 261,
                  },
                  url:
                    "https://d32dm0rphc51dk.cloudfront.net/WNHtB_gQLN3HxPW4nNGAjA/large.jpg",
                },
                imageTitle: "This Image Has a Title, A. Artist, 2020",
                internalID: "5aa2e90d7622dd49dc8b356c",
                is_biddable: false,
                is_inquireable: false,
                is_saved: false,
                partner: {
                  href: "/kenneth-a-friedman-and-co",
                  id: "UGFydG5lcjo1NDFiMzU4ZjcyNjE2OTdiOTcyYTAwMDA=",
                  name: "Kenneth A. Friedman & Co.",
                  type: "Gallery",
                },
                realizedPrice: "$1,300",
                sale: null,
                sale_artwork: null,
                sale_message: "$7,500",
                slug: "alex-katz-laura-1-49",
                title: "Laura 1",
              },
            },
          ],
        },
        metadata: {
          highestRealized: "$4.17M",
          realized: "177%",
          roundedUniqueVisitors: "1,200",
          roundedViews: "3,500",
          str: "79%",
        },
      },
    },
  },
}
