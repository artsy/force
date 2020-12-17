import React from "react"
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
      mockData: response,
      query: graphql`
        query ArtworkArtistSeries_Query($slug: String!) @raw_response_type {
          artwork(id: $slug) {
            ...ArtworkArtistSeries_artwork
          }
        }
      `,
      variables: {
        slug: "pumpkin",
      },
    })
  }

  it("includes both rails when there is data", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("ArtistSeriesRail").length).toBe(1)
    expect(wrapper.find("ArtistSeriesArtworkRail").length).toBe(1)
  })

  it("includes just the series rail if there are no artworks", async () => {
    const noArtworksData: ArtworkArtistSeries_QueryRawResponse = {
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
      artwork: {
        ...ArtworkArtistSeriesFixture.artwork,
        artistSeriesConnection: null,
        seriesArtist: {
          artistSeriesConnection: {
            edges: [],
          },
          id: "series-artist-relay",
        },
        seriesForCounts: null,
      },
    }
    const wrapper = await getWrapper("xl", noSeriesData)
    expect(wrapper.find("ArtistSeriesRail").length).toBe(0)
    expect(wrapper.find("ArtistSeriesArtworkRail").length).toBe(0)
  })
})

const ArtworkArtistSeriesFixture: ArtworkArtistSeries_QueryRawResponse = {
  artwork: {
    artistSeriesConnection: {
      edges: [
        {
          node: {
            filterArtworksConnection: {
              edges: [
                {
                  node: {
                    href: "/artwork/yayoi-kusama-pumpkin-2222222222222222",
                    id: "ggg123",
                    image: {
                      url: "pumpkins.jpg",
                      aspectRatio: 12,
                    },
                    slug: "yayoi-kusama-pumpkin-2222222222222222",
                    imageTitle: "Pumpkin",
                    internalID: "zzz123",
                    date: "2020",
                    cultural_maker: null,
                    title: "Pumpkin",
                    artists: [
                      {
                        href: "/artist/yayoi-kusama",
                        id: "artistabc123",
                        name: "Yayoi Kusama",
                      },
                    ],
                    sale_message: "Contact For Price",
                    collecting_institution: null,
                    partner: {
                      href: "/auction/important-auction-house",
                      id: "ahabc123",
                      name: "Important Auction House",
                      type: "Auction House",
                    },
                    is_inquireable: true,
                    sale: {
                      is_auction: true,
                      id: "saleabc123",
                      is_closed: false,
                      is_live_open: false,
                      is_open: true,
                      display_timely_at: "live in 3d",
                      is_preview: false,
                    },
                    is_biddable: true,
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
                    is_saved: false,
                  },
                },
              ],
              id: "filter-artworks-relay-id",
            },
            internalID: "artwork1234",
            slug: "yayoi-kusama-pumpkins",
          },
        },
      ],
    },
    id: "relayrelay",
    internalID: "abc124",
    seriesArtist: {
      artistSeriesConnection: {
        edges: [
          {
            node: {
              artworksCountMessage: "12 available",
              featured: true,
              image: {
                cropped: {
                  url: "pumpkin.jpg",
                },
              },
              internalID: "abc123445",
              slug: "yayoi-kusama-pumpkins",
              title: "Yayoi Kusama: Pumpkins",
            },
          },
        ],
      },
      id: "series-artist-relay",
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
    slug: "pumpkin",
  },
}
