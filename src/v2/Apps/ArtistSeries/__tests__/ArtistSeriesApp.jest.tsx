import React from "react"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { ArtistSeriesAppFragmentContainer } from "../ArtistSeriesApp"
import { graphql } from "react-relay"
import { ArtistSeriesApp_QueryRawResponse } from "v2/__generated__/ArtistSeriesApp_Query.graphql"
import { ArtistSeriesApp_UnfoundTest_QueryRawResponse } from "v2/__generated__/ArtistSeriesApp_UnfoundTest_Query.graphql"
import { Breakpoint } from "@artsy/palette"
import { HeaderImage } from "../Components/ArtistSeriesHeader"
import { useTracking } from "v2/Artsy/Analytics/useTracking"

jest.mock("v2/Artsy/Analytics/useTracking")
jest.unmock("react-relay")
jest.mock("v2/Artsy/Router/useRouter", () => ({
  useIsRouteActive: () => false,
  useRouter: () => ({
    match: {
      params: {
        slug: "pumpkins",
      },
    },
  }),
}))

describe("ArtistSeriesApp", () => {
  let trackEvent
  beforeEach(() => {
    trackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })
  let slug = "pumpkins"

  describe("with a user who has the Artist Series lab feature", () => {
    describe("with a published artist series", () => {
      const getWrapper = async (
        breakpoint: Breakpoint = "lg",
        response: ArtistSeriesApp_QueryRawResponse = ArtistSeriesAppFixture
      ) => {
        return renderRelayTree({
          Component: ({ artistSeries }) => {
            return (
              <MockBoot breakpoint={breakpoint}>
                <ArtistSeriesAppFragmentContainer artistSeries={artistSeries} />
              </MockBoot>
            )
          },
          mockData: response,
          query: graphql`
            query ArtistSeriesApp_Query($slug: ID!) @raw_response_type {
              artistSeries(id: $slug) {
                ...ArtistSeriesApp_artistSeries
              }
            }
          `,
          variables: {
            slug,
          },
        })
      }

      it("renders the correct components", async () => {
        const wrapper = await getWrapper()
        expect(wrapper.find("ArtistSeriesMeta").length).toBe(1)
        expect(wrapper.find("ArtistSeriesHeader").length).toBe(1)
        expect(wrapper.find("ArtistSeriesArtworksFilter").length).toBe(1)
        expect(wrapper.find("ArtistSeriesRail").length).toBe(1)
      })

      describe("ArtistSeriesArtworksFilter", () => {
        it("renders correctly", async () => {
          const wrapper = await getWrapper()
          expect(wrapper.find("ArtworkFilterArtworkGrid").length).toBe(1)
          expect(wrapper.find("GridItem__ArtworkGridItem").length).toBe(2)
        })
      })

      describe("ArtistSeriesHeader", () => {
        describe("desktop", () => {
          describe("with an artist", () => {
            it("renders correctly", async () => {
              const wrapper = await getWrapper()
              expect(wrapper.find("ArtistSeriesHeaderLarge").length).toBe(1)
              expect(wrapper.find("ArtistSeriesHeaderSmall").length).toBe(0)
              expect(wrapper.find("ArtistInfo").length).toBe(1)
              expect(wrapper.find(HeaderImage).length).toBe(1)
            })

            it("includes artwork counts", async () => {
              const wrapper = await getWrapper()
              expect(wrapper.find("ArtistSeriesHeaderLarge").text()).toContain(
                "20 available"
              )
            })

            it("has a correctly sized header image", async () => {
              const wrapper = await getWrapper()
              const expectedUrl =
                "https://test.artsy.net/pumpkins-header-image-sm.jpg"
              expect(wrapper.find(HeaderImage).props().src).toBe(expectedUrl)
            })
          })

          describe("without an artist", () => {
            it("renders the header without artist info", async () => {
              const wrapper = await getWrapper(
                "lg",
                ArtistSeriesWithoutArtistAppFixture
              )
              expect(wrapper.find("ArtistSeriesHeaderLarge").length).toBe(1)
              expect(wrapper.find("ArtistInfo").length).toBe(0)
            })
          })
        })

        describe("mobile", () => {
          describe("with an artist", () => {
            it("renders correctly", async () => {
              const wrapper = await getWrapper("xs")
              expect(wrapper.find("ArtistSeriesHeaderLarge").length).toBe(0)
              expect(wrapper.find("ArtistSeriesHeaderSmall").length).toBe(1)
              expect(wrapper.find("ArtistInfo").length).toBe(1)
              expect(wrapper.find(HeaderImage).length).toBe(1)
            })

            it("has a correctly sized header image", async () => {
              const wrapper = await getWrapper("xs")
              const expectedUrl =
                "https://test.artsy.net/pumpkins-header-image-xs.jpg"
              expect(wrapper.find(HeaderImage).props().src).toBe(expectedUrl)
            })
          })

          describe("without an artist", () => {
            it("renders the header without artist info", async () => {
              const wrapper = await getWrapper(
                "xs",
                ArtistSeriesWithoutArtistAppFixture
              )
              expect(wrapper.find("ArtistSeriesHeaderSmall").length).toBe(1)
              expect(wrapper.find("ArtistInfo").length).toBe(0)
            })
          })
        })
      })

      describe("ArtistSeriesRail", () => {
        describe("with an artist", () => {
          it("renders correctly", async () => {
            const wrapper = await getWrapper()
            expect(wrapper.find("ArtistSeriesRail").length).toBe(1)
            expect(wrapper.find("ArtistSeriesItem").length).toBe(1)
            expect(wrapper.find("ArtistSeriesItem").text()).toContain(
              "Aardvark Series"
            )
            expect(wrapper.find("ArtistSeriesItem").text()).toContain(
              "20 available"
            )
          })
        })
      })
    })
  })

  describe("with an unpublished or unfound artist series", () => {
    const getWrapper = async (
      breakpoint: Breakpoint = "lg",
      response: ArtistSeriesApp_UnfoundTest_QueryRawResponse = UnfoundArtistSeriesAppFixture
    ) => {
      return renderRelayTree({
        Component: ({ artistSeries }) => {
          return (
            <MockBoot breakpoint={breakpoint}>
              <ArtistSeriesAppFragmentContainer artistSeries={artistSeries} />
            </MockBoot>
          )
        },
        mockData: response,
        query: graphql`
          query ArtistSeriesApp_UnfoundTest_Query($slug: ID!)
            @raw_response_type {
            artistSeries(id: $slug) {
              ...ArtistSeriesApp_artistSeries
            }
          }
        `,
        variables: {
          slug: "nonexistent slug",
        },
      })
    }

    it("returns 404 page", async () => {
      const wrapper = await getWrapper()
      const html = wrapper.html()
      expect(html).toContain(
        "Sorry, the page you were looking for doesn’t exist at this URL."
      )
    })
  })
})

const ArtistSeriesAppFixture: ArtistSeriesApp_QueryRawResponse = {
  artistSeries: {
    artists: [
      {
        counts: {
          follows: 0,
        },
        href: "/artist/yayoi-kusama",
        id: "artistabc123",
        image: {
          cropped: { src: "https://test.artsy.net/yayoi-kusama.jpg" },
        },
        internalID: "yyy123",
        is_followed: false,
        name: "Yayoi Kusama",
        slug: "yayoi-kusama",
      },
    ],
    artworksCountMessage: "20 available",
    description: "All of the pumpkins",
    descriptionFormatted: "All of the pumpkins",
    filtered_artworks: {
      edges: [
        {
          id: "nodeidabc",
          node: {
            artists: [
              {
                href: "/artist/yayoi-kusama",
                id: "artistabc123",
                name: "Yayoi Kusama",
              },
            ],
            collecting_institution: null,
            cultural_maker: null,
            date: "2020",
            href: "/artwork/yayoi-kusama-pumpkin-2222222222222222",
            id: "ggg123",
            image: {
              aspect_ratio: 1.27,
              placeholder: "78.76427829698858%",
              url: "https://test.artsy.net/image",
            },
            image_title: "Yayoi Kusama, ‘Pumpkin’, 2222",
            internalID: "zzz123",
            is_biddable: true,
            is_inquireable: true,
            is_saved: false,
            partner: {
              href: "/auction/important-auction-house",
              id: "ahabc123",
              name: "Important Auction House",
              type: "Auction House",
            },
            sale: {
              display_timely_at: "live in 3d",
              id: "saleabc123",
              is_auction: true,
              is_closed: false,
              is_live_open: false,
              is_open: true,
              is_preview: false,
            },
            sale_artwork: {
              counts: {
                bidder_positions: 0,
              },
              highest_bid: {
                display: null,
              },
              id: "idabc123",
              opening_bid: {
                display: "USD $2222",
              },
            },
            sale_message: "Contact For Price",
            slug: "yayoi-kusama-pumpkin-2222222222222222",
            title: "Pumpkin",
          },
        },
        {
          id: "nodeid123",
          node: {
            artists: [
              {
                href: "/artist/yayoi-kusama",
                id: "artistabc123",
                name: "Yayoi Kusama",
              },
            ],
            collecting_institution: null,
            cultural_maker: null,
            date: "2020",
            href: "/artwork/yayoi-kusama-pumpkin-33333333333333333",
            id: "abc123",
            image: {
              aspect_ratio: 1.43,
              placeholder: "69.82024597918638%",
              url: "https://test.artsy.net/image2",
            },
            image_title: "Yayoi Kusama, ‘Pumpkin’, 3333",
            internalID: "xxx123",
            is_biddable: false,
            is_inquireable: true,
            is_saved: false,
            partner: {
              href: "/important-gallery",
              id: "galleryabc123",
              name: "Important Gallery",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            sale_message: "Contact For Price",
            slug: "yayoi-kusama-pumpkin-33333333333333333",
            title: "Pumpkin",
          },
        },
      ],
      id: "filteredartworksabc123",
      pageCursors: {
        around: [
          {
            cursor: "pageOneCursor",
            isCurrent: true,
            page: 1,
          },
          {
            cursor: "pageTwoCursor",
            isCurrent: false,
            page: 2,
          },
        ],
        first: null,
        last: null,
        previous: null,
      },
      pageInfo: {
        endCursor: "endCursor",
        hasNextPage: true,
      },
    },
    sidebarAggregations: {
      id: "sidebar-id",
      aggregations: [
        {
          slice: "MATERIALS_TERMS",
          counts: [
            {
              count: 100,
              value: "cats",
              name: "Cats",
            },
          ],
        },
      ],
    },
    image: {
      sm: {
        url: "https://test.artsy.net/pumpkins-header-image-sm.jpg",
      },
      url: "https://test.artsy.net/pumpkins-header-image.jpg",
      xs: {
        url: "https://test.artsy.net/pumpkins-header-image-xs.jpg",
      },
    },
    internalID: "internal-id",
    railArtist: [
      {
        artistSeriesConnection: {
          edges: [
            {
              node: {
                artworksCountMessage: "20 available",
                featured: true,
                image: {
                  cropped: {
                    url: "/path/to/aardvarks.jpg",
                  },
                },
                internalID: "id",
                slug: "aardvark",
                title: "Aardvark Series",
              },
            },
          ],
        },
        id: "yayoi-kusama",
      },
    ],
    slug: "slug",
    title: "Pumpkins",
  },
}

const ArtistSeriesWithoutArtistAppFixture: ArtistSeriesApp_QueryRawResponse = {
  artistSeries: {
    ...ArtistSeriesAppFixture.artistSeries,
    artists: [],
    railArtist: [],
  },
}

const UnfoundArtistSeriesAppFixture: ArtistSeriesApp_UnfoundTest_QueryRawResponse = {
  artistSeries: null,
}
