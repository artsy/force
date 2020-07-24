import React from "react"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import ArtistSeriesApp from "../ArtistSeriesApp"
import { graphql } from "react-relay"
import { ArtistSeriesApp_QueryRawResponse } from "v2/__generated__/ArtistSeriesApp_Query.graphql"
import { ArtistSeriesApp_UnfoundTest_QueryRawResponse } from "v2/__generated__/ArtistSeriesApp_UnfoundTest_Query.graphql"
import { Breakpoint } from "@artsy/palette"
import { HeaderImage } from "../Components/ArtistSeriesHeader"

jest.unmock("react-relay")
jest.mock("v2/Artsy/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: {
        slug: "pumpkins",
      },
    },
  }),
  useIsRouteActive: () => false,
}))

describe("ArtistSeriesApp", () => {
  let slug = "pumpkins"

  describe("with a user who has the Artist Series lab feature", () => {
    let user = { lab_features: ["Artist Series"] }

    describe("with a published artist series", () => {
      const getWrapper = async (
        breakpoint: Breakpoint = "lg",
        response: ArtistSeriesApp_QueryRawResponse = ArtistSeriesAppFixture
      ) => {
        return renderRelayTree({
          Component: ({ artistSeries }) => {
            return (
              <MockBoot breakpoint={breakpoint} user={user}>
                <ArtistSeriesApp artistSeries={artistSeries} />
              </MockBoot>
            )
          },
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
          mockData: response,
        })
      }

      it("renders the correct components", async () => {
        const wrapper = await getWrapper()
        expect(wrapper.find("AppContainer").length).toBe(1)
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

            it("has a correctly sized header image", async () => {
              const wrapper = await getWrapper()
              const expectedUrl =
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=height&src=https%3A%2F%2Ftest.artsy.net%2Fpumpkins-header-image.jpg&height=400&quality=80"
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
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&src=https%3A%2F%2Ftest.artsy.net%2Fpumpkins-header-image.jpg&width=180&height=180&quality=80"
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
              <ArtistSeriesApp artistSeries={artistSeries} />
            </MockBoot>
          )
        },
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
        mockData: response,
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
    railArtist: [
      {
        id: "yayoi-kusama",
        artistSeriesConnection: {
          edges: [
            {
              node: {
                internalID: "id",
                slug: "aardvark",
                forSaleArtworksCount: 20,
                image: {
                  cropped: {
                    url: "/path/to/aardvarks.jpg",
                  },
                },
                title: "Aardvark Series",
              },
            },
          ],
        },
      },
    ],
    title: "Pumpkins",
    description: "All of the pumpkins",
    image: {
      url: "https://test.artsy.net/pumpkins-header-image.jpg",
    },
    artists: [
      {
        name: "Yayoi Kusama",
        image: {
          url: "https://test.artsy.net/yayoi-kusama.jpg",
        },
        href: "/artist/yayoi-kusama",
        slug: "yayoi-kusama",
        id: "artistabc123",
        internalID: "yyy123",
        is_followed: false,
        counts: {
          follows: 0,
        },
      },
    ],
    filtered_artworks: {
      id: "filteredartworksabc123",
      aggregations: [
        {
          slice: "INSTITUTION",
          counts: [],
        },
        {
          slice: "MEDIUM",
          counts: [
            {
              value: "sculpture",
              name: "Sculpture",
              count: 22222,
            },
          ],
        },
        {
          slice: "MAJOR_PERIOD",
          counts: [
            {
              value: "2020",
              name: "2020",
              count: 1,
            },
          ],
        },
        {
          slice: "GALLERY",
          counts: [
            {
              value: "important-gallery",
              name: "Important Gallery",
              count: 4,
            },
          ],
        },
      ],
      pageInfo: {
        hasNextPage: true,
        endCursor: "endCursor",
      },
      pageCursors: {
        around: [
          {
            cursor: "pageOneCursor",
            page: 1,
            isCurrent: true,
          },
          {
            cursor: "pageTwoCursor",
            page: 2,
            isCurrent: false,
          },
        ],
        first: null,
        last: null,
        previous: null,
      },
      edges: [
        {
          node: {
            id: "ggg123",
            slug: "yayoi-kusama-pumpkin-2222222222222222",
            href: "/artwork/yayoi-kusama-pumpkin-2222222222222222",
            internalID: "zzz123",
            image: {
              aspect_ratio: 1.27,
              placeholder: "78.76427829698858%",
              url: "https://test.artsy.net/image",
            },
            title: "Pumpkin",
            image_title: "Yayoi Kusama, ‘Pumpkin’, 2222",
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
          id: "nodeidabc",
        },
        {
          node: {
            id: "abc123",
            slug: "yayoi-kusama-pumpkin-33333333333333333",
            href: "/artwork/yayoi-kusama-pumpkin-33333333333333333",
            internalID: "xxx123",
            image: {
              aspect_ratio: 1.43,
              placeholder: "69.82024597918638%",
              url: "https://test.artsy.net/image2",
            },
            title: "Pumpkin",
            image_title: "Yayoi Kusama, ‘Pumpkin’, 3333",
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
              name: "Important Gallery",
              href: "/important-gallery",
              id: "galleryabc123",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
          id: "nodeid123",
        },
      ],
    },
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
