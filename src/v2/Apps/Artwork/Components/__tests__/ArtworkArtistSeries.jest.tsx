import { MockBoot, renderRelayTree } from "v2/DevTools"
import { graphql } from "react-relay"
import { ArtworkArtistSeries_QueryRawResponse } from "v2/__generated__/ArtworkArtistSeries_Query.graphql"
import { Breakpoint } from "@artsy/palette"
import { useTracking } from "react-tracking"
import { ArtworkArtistSeriesFragmentContainer } from "../ArtworkArtistSeries"

jest.mock("react-tracking")
jest.unmock("react-relay")

describe("ArtworkArtistSeries", () => {
  let trackEvent
  beforeEach(() => {
    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const getWrapper = async (
    breakpoint: Breakpoint = "lg",
    response: ArtworkArtistSeries_QueryRawResponse = ArtworkArtistSeriesFixture
  ) => {
    return renderRelayTree({
      Component: ({ artwork }) => {
        return (
          <MockBoot breakpoint={breakpoint}>
            <ArtworkArtistSeriesFragmentContainer artwork={artwork} />
          </MockBoot>
        )
      },
      query: graphql`
        query ArtworkArtistSeries_Query($slug: String!)
          @raw_response_type
          @relay_test_operation {
          artwork(id: $slug) {
            ...ArtworkArtistSeries_artwork
          }
        }
      `,
      variables: {
        slug: "pumpkin",
      },
      mockData: response,
    })
  }

  it("includes both rails when there is data", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("ArtistSeriesRail").length).toBe(1)
    expect(wrapper.find("ArtistSeriesArtworkRail").length).toBe(1)
  })

  it("includes just the series rail if there are no artworks", async () => {
    const noArtworksData: ArtworkArtistSeries_QueryRawResponse = {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      artwork: {
        ...ArtworkArtistSeriesFixture.artwork,
        seriesForCounts: {
          edges: [
            {
              node: {
                artworksCount: 0,
              },
            },
          ],
        },
      },
    }
    const wrapper = await getWrapper("xl", noArtworksData)
    expect(wrapper.find("ArtistSeriesRail").length).toBe(1)
    expect(wrapper.find("ArtistSeriesArtworkRail").length).toBe(0)
  })

  it("includes just series if the artist has any", async () => {
    const noSeriesData: ArtworkArtistSeries_QueryRawResponse = {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      artwork: {
        ...ArtworkArtistSeriesFixture.artwork,
        artistSeriesConnection: null,
        seriesForCounts: null,
      },
    }
    const wrapper = await getWrapper("xl", noSeriesData)
    expect(wrapper.find("ArtistSeriesRail").length).toBe(1)
    expect(wrapper.find("ArtistSeriesArtworkRail").length).toBe(0)
  })

  it("is null if there is no series or artworks", async () => {
    const noSeriesData: ArtworkArtistSeries_QueryRawResponse = {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      artwork: {
        ...ArtworkArtistSeriesFixture.artwork,
        artistSeriesConnection: null,
        seriesForCounts: null,
        seriesArtist: {
          id: "series-artist-relay",
          artistSeriesConnection: {
            edges: [],
          },
        },
      },
    }
    const wrapper = await getWrapper("xl", noSeriesData)
    expect(wrapper.find("ArtistSeriesRail").length).toBe(0)
    expect(wrapper.find("ArtistSeriesArtworkRail").length).toBe(0)
  })
})

const ArtworkArtistSeriesFixture: ArtworkArtistSeries_QueryRawResponse = {
  artwork: {
    id: "relayrelay",
    internalID: "abc124",
    slug: "pumpkin",
    seriesArtist: {
      id: "series-artist-relay",
      artistSeriesConnection: {
        edges: [
          {
            node: {
              internalID: "abc123445",
              slug: "yayoi-kusama-pumpkins",
              featured: true,
              title: "Yayoi Kusama: Pumpkins",
              artworksCountMessage: "12 available",
              image: {
                cropped: {
                  src: "pumpkin.jpg",
                  srcSet: "pumpkin.jpg",
                  width: 100,
                  height: 100,
                },
              },
            },
          },
        ],
      },
    },
    seriesForCounts: {
      edges: [
        {
          node: {
            artworksCount: 124,
          },
        },
      ],
    },
    artistSeriesConnection: {
      edges: [
        {
          node: {
            internalID: "artwork1234",
            slug: "yayoi-kusama-pumpkins",
            filterArtworksConnection: {
              id: "filter-artworks-relay-id",
              edges: [
                {
                  node: {
                    id: "ggg123",
                    slug: "yayoi-kusama-pumpkin-2222222222222222",
                    href: "/artwork/yayoi-kusama-pumpkin-2222222222222222",
                    internalID: "zzz123",
                    image: {
                      resized: {
                        src: "pumpkins.jpg",
                        srcSet: "pumpkins.jpg",
                        width: 100,
                        height: 100,
                      },
                      aspectRatio: 1,
                      height: 100,
                    },
                    imageTitle: "Pumpkin",
                    title: "Pumpkin",
                    date: "2020",
                    sale_message: "Contact For Price",
                    cultural_maker: null,
                    artists: [
                      {
                        id: "artistabc123",
                        href: "/artist/yayoi-kusama",
                        name: "Yayoi Kusama",
                      },
                    ],
                    collecting_institution: null,
                    partner: {
                      name: "Important Auction House",
                      href: "/auction/important-auction-house",
                      id: "ahabc123",
                      type: "Auction House",
                    },
                    sale: {
                      is_auction: true,
                      is_closed: false,
                      id: "saleabc123",
                      is_live_open: false,
                      is_open: true,
                      is_preview: false,
                      display_timely_at: "live in 3d",
                    },
                    sale_artwork: {
                      counts: {
                        bidder_positions: 0,
                      },
                      highest_bid: {
                        display: null,
                      },
                      opening_bid: {
                        display: "USD $2222",
                      },
                      id: "idabc123",
                    },
                    is_inquireable: true,
                    is_saved: false,
                    is_biddable: true,
                  },
                },
              ],
            },
          },
        },
      ],
    },
  },
}
