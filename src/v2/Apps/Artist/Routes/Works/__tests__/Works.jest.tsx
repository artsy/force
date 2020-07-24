import { Works_Test_QueryRawResponse } from "v2/__generated__/Works_Test_Query.graphql"
import { ArtistArtworkFilterRefetchContainer as ArtworkFilter } from "v2/Apps/Artist/Routes/Overview/Components/ArtistArtworkFilter"
import { WorksRouteFragmentContainer as WorksRoute } from "v2/Apps/Artist/Routes/Works"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { ReactWrapper } from "enzyme"
import React from "react"
import { graphql } from "react-relay"
import { Breakpoint } from "v2/Utils/Responsive"
import { ArtistTopWorksRailFragmentContainer as ArtistTopWorksRail } from "v2/Apps/Artist/Components/ArtistTopWorksRail/ArtistTopWorksRail"
import { userHasLabFeature } from "v2/Utils/user"

jest.unmock("react-relay")

// Mocking the ArtworkCollectionsRail component because it is tested elsewhere
jest.mock("v2/Apps/Artist/Components/ArtistCollectionsRail", () => ({
  ArtistCollectionsRailContent: () => <div>Mock ArtistCollectionRail</div>,
}))

// Mocking the ArtistRecommendations component because it is tested elsewhere
jest.mock(
  "v2/Apps/Artist/Routes/Overview/Components/ArtistRecommendations",
  () => ({
    ArtistRecommendationsQueryRenderer: () => (
      <div>Mock ArtistRecommendations</div>
    ),
  })
)

describe("Works Route", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (
    breakpoint: Breakpoint = "xl",
    worksMock = defaultWorks,
    user = {}
  ) => {
    return renderRelayTree({
      Component: WorksRoute,
      query: graphql`
        query Works_Test_Query(
          $artistID: String!
          $shouldFetchArtistSeriesData: Boolean!
        ) @raw_response_type {
          artist(id: $artistID) {
            ...Works_artist
              @arguments(
                shouldFetchArtistSeriesData: $shouldFetchArtistSeriesData
              )
          }
        }
      `,
      mockData: worksMock,
      variables: {
        artistID: "pablo-picasso",
        shouldFetchArtistSeriesData: userHasLabFeature(user, "Artist Series"),
      },
      wrapper: children => (
        <MockBoot user={user} breakpoint={breakpoint}>
          {children}
        </MockBoot>
      ),
    })
  }

  describe("general behavior", () => {
    beforeAll(async () => {
      wrapper = await getWrapper()
    })

    it("renders correct sections", () => {
      expect(wrapper.find(ArtworkFilter).length).toEqual(1)
      expect(wrapper.html()).toContain("Mock ArtistRecommendations")
      expect(wrapper.html()).toContain("Mock ArtistCollectionRail")
    })

    it("includes the correct sort options", () => {
      const sortOptions = wrapper
        .find("div[title='Sort'] select option")
        .map(el => el.text())

      expect(sortOptions).toEqual([
        "Default",
        "Price (desc.)",
        "Price (asc.)",
        "Recently updated",
        "Recently added",
        "Artwork year (desc.)",
        "Artwork year (asc.)",
      ])
    })
  })

  describe("Artist Recommendations", () => {
    it("Does not display recommendations if related.artists is empty", async () => {
      wrapper = await getWrapper("xl", {
        artist: {
          ...defaultWorks.artist,
          related: {
            artistsConnection: null,
          },
        },
      })

      expect(wrapper.html()).not.toContain("Mock ArtistRecommendations")
    })

    it("Does not display recommendations if related.artists.edges.length === 0", async () => {
      wrapper = await getWrapper("xl", {
        artist: {
          ...defaultWorks.artist,
          related: {
            artistsConnection: {
              edges: [],
            },
          },
        },
      })

      expect(wrapper.html()).not.toContain("Mock ArtistRecommendations")
    })
  })

  describe("Artist Notable Works", () => {
    it("Displays Notable Works rail", () => {
      expect(wrapper.find(ArtistTopWorksRail).length).toEqual(1)
    })
  })

  describe("Artist Series Rail", () => {
    it("does not display artist series without the lab feature", async () => {
      expect(wrapper.find("ArtistSeriesRail").length).toBe(0)
    })

    it("Displays artist series rail with the lab feature", async () => {
      wrapper = await getWrapper("xl", defaultWorks, {
        lab_features: ["Artist Series"],
      })
      expect(wrapper.find("ArtistSeriesRail").length).toBe(1)
      expect(wrapper.find("ArtistSeriesItem").length).toBe(1)
      expect(wrapper.find("ArtistSeriesItem").text()).toContain(
        "Aardvark Series"
      )
      expect(wrapper.find("ArtistSeriesItem").text()).toContain("20 available")
    })
  })
})

const defaultWorks: Works_Test_QueryRawResponse = {
  artist: {
    slug: "slug-of-the-artist",
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
    filterArtworksConnection: {
      edges: [
        {
          node: {
            id: "QXJ0d29yazo1ZGVjZDRiYjNjN2NiMTAwMTAwYWQzNmQ=",
            slug: "andy-warhol-roy-lichtenstein-authenticated-3",
            href: "/artwork/andy-warhol-roy-lichtenstein-authenticated-3",
            image: {
              href: "/artwork/andy-warhol-roy-lichtenstein-authenticated-3",
              imageAspectRatio: 0.78,
              resized: {
                width: 100,
                height: 200,
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/JS5CsvkO_SpL1Vg7R-h_Zw/large.jpg",
              },
              aspect_ratio: 1.0,
              url:
                "https://d32dm0rphc51dk.cloudfront.net/JS5CsvkO_SpL1Vg7R-h_Zw/large.jpg",
            },
            imageTitle: "This Image Has a Title, A. Artist, 2020",
            internalID: "5decd4bb3c7cb100100ad36d",
            title: "Roy Lichtenstein (Authenticated)",
            date: "1975",
            sale_message: "$11,995",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Alpha 137 Gallery",
              href: "/alpha-137-gallery",
              id: "UGFydG5lcjo1NzQ4ZDE1M2NkNTMwZTJkNTEwMDAzMWM=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
      ],
      id: "12345-abde",
    },
    internalID: "4d8b92b34eb68a1b2c0003f4",
    related: {
      artistsConnection: {
        edges: [
          {
            node: {
              id: "relatedConnection123",
            },
          },
        ],
      },
    },
    sidebarAggregations: {
      aggregations: [],
      id:
        "ZmlsdGVyQXJ0d29ya3NDb25uZWN0aW9uOnsiYWdncmVnYXRpb25zIjpbInRvdGFsIl0sImFydGlzdF9pZCI6IjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNCIsInBhZ2UiOjEsInNpemUiOjMwLCJzb3J0IjoiLXBhcnRuZXJfdXBkYXRlZF9hdCJ9",
    },
    is_followed: true,
    counts: {
      partner_shows: 701,
      for_sale_artworks: 2396,
      ecommerce_artworks: 294,
      auction_artworks: 3,
      artworks: 4995,
      has_make_offer_artworks: true,
    },
    filtered_artworks: {
      id:
        "ZmlsdGVyQXJ0d29ya3NDb25uZWN0aW9uOnsiYWdncmVnYXRpb25zIjpbInRvdGFsIl0sImFydGlzdF9pZCI6IjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNCIsInBhZ2UiOjEsInNpemUiOjMwLCJzb3J0IjoiLXBhcnRuZXJfdXBkYXRlZF9hdCJ9",
      aggregations: [],
      pageInfo: {
        hasNextPage: true,
        endCursor: "YXJyYXljb25uZWN0aW9uOjI5",
      },
      pageCursors: {
        around: [
          {
            cursor: "YXJyYXljb25uZWN0aW9uOi0x",
            page: 1,
            isCurrent: true,
          },
          {
            cursor: "YXJyYXljb25uZWN0aW9uOjI5",
            page: 2,
            isCurrent: false,
          },
          {
            cursor: "YXJyYXljb25uZWN0aW9uOjU5",
            page: 3,
            isCurrent: false,
          },
          {
            cursor: "YXJyYXljb25uZWN0aW9uOjg5",
            page: 4,
            isCurrent: false,
          },
        ],
        first: null,
        last: {
          cursor: "YXJyYXljb25uZWN0aW9uOjI5Njk=",
          page: 100,
          isCurrent: false,
        },
        previous: null,
      },
      edges: [
        {
          id: "edge1",
          node: {
            id: "QXJ0d29yazo1ZGVjZDRiYjNjN2NiMTAwMTAwYWQzNmQ=",
            slug: "andy-warhol-roy-lichtenstein-authenticated-3",
            href: "/artwork/andy-warhol-roy-lichtenstein-authenticated-3",
            image: {
              aspect_ratio: 0.78,
              placeholder: "127.67567567567568%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/JS5CsvkO_SpL1Vg7R-h_Zw/large.jpg",
            },
            internalID: "5decd4bb3c7cb100100ad36d",
            title: "Roy Lichtenstein (Authenticated)",
            image_title:
              "Andy Warhol, ‘Roy Lichtenstein (Authenticated)’, 1975",
            date: "1975",
            sale_message: "$11,995",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Alpha 137 Gallery",
              href: "/alpha-137-gallery",
              id: "UGFydG5lcjo1NzQ4ZDE1M2NkNTMwZTJkNTEwMDAzMWM=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge2",
          node: {
            id: "QXJ0d29yazo1ZGNmN2VmYmJmMTVhNDAwMGUxZDBlMTI=",
            slug: "andy-warhol-gems-ii-dot-189-3",
            href: "/artwork/andy-warhol-gems-ii-dot-189-3",
            image: {
              aspect_ratio: 1.39,
              placeholder: "71.89988623435723%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/Mg_Szq4pq3bmkEXwEnjmuA/large.jpg",
            },
            internalID: "5dcf7efbbf15a4000e1d0e12",
            title: "Gems II.189",
            image_title: "Andy Warhol, ‘Gems II.189’, 1978",
            date: "1978",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Upsilon Gallery",
              href: "/upsilon-gallery",
              id: "UGFydG5lcjo1NzgzYmRhNjc2MjJkZDY1ZWQwMDAzNTU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge3",
          node: {
            id: "QXJ0d29yazo1ODExMDQxZTEzOWIyMTUyNGIwMDBjNGI=",
            slug: "andy-warhol-jacqueline-kennedy-iii-jackie-iii-ii-dot-15",
            href:
              "/artwork/andy-warhol-jacqueline-kennedy-iii-jackie-iii-ii-dot-15",
            image: {
              aspect_ratio: 0.74,
              placeholder: "135.50135501355015%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/3qTI5_FhJ5ifPO7irXMbNQ/large.jpg",
            },
            internalID: "5811041e139b21524b000c4b",
            title: "Jacqueline Kennedy III (Jackie III), II.15",
            image_title:
              "Andy Warhol, ‘Jacqueline Kennedy III (Jackie III), II.15’, 1966",
            date: "1966",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge4",
          node: {
            id: "QXJ0d29yazo1ODExMDA0ZDhiMGMxNDFkZDQwMDBiNjE=",
            slug: "andy-warhol-cow-ii-dot-12-31",
            href: "/artwork/andy-warhol-cow-ii-dot-12-31",
            image: {
              aspect_ratio: 0.69,
              placeholder: "145.83333333333331%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/TggVGbEkp8GPrxSRYyUrVw/large.jpg",
            },
            internalID: "5811004d8b0c141dd4000b61",
            title: "Cow, II.12",
            image_title: "Andy Warhol, ‘Cow, II.12’, 1971",
            date: "1971",
            sale_message: "$32,500",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge5",
          node: {
            id: "QXJ0d29yazo1ODExMDU2OWM5ZGMyNDM0YWMwMDBhMjk=",
            slug: "andy-warhol-myths-dracula-ii-dot-264",
            href: "/artwork/andy-warhol-myths-dracula-ii-dot-264",
            image: {
              aspect_ratio: 1,
              placeholder: "100%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/c_aIRDHlJCwgB2dG_eF_PQ/large.jpg",
            },
            internalID: "58110569c9dc2434ac000a29",
            title: "Myths: Dracula, II.264",
            image_title: "Andy Warhol, ‘Myths: Dracula, II.264’, 1981",
            date: "1981",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge6",
          node: {
            id: "QXJ0d29yazo1ODIxMTAwNTc2MjJkZDIzNGEwMDA0MmE=",
            slug: "andy-warhol-brooklyn-bridge-ii-dot-290-3",
            href: "/artwork/andy-warhol-brooklyn-bridge-ii-dot-290-3",
            image: {
              aspect_ratio: 1,
              placeholder: "100%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/HMGsaVK6Qtbk_K1fYHorLA/large.jpg",
            },
            internalID: "582110057622dd234a00042a",
            title: "Brooklyn Bridge, II.290",
            image_title: "Andy Warhol, ‘Brooklyn Bridge, II.290’, 1983",
            date: "1983",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge7",
          node: {
            id: "QXJ0d29yazo1ODIxMTAwNmM5ZGMyNDc5ZjkwMDA0MTA=",
            slug: "andy-warhol-camouflage-ii-dot-407-1",
            href: "/artwork/andy-warhol-camouflage-ii-dot-407-1",
            image: {
              aspect_ratio: 0.99,
              placeholder: "101.35135135135135%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/DRa8DoEBuc0kpCQyGMoNKQ/large.jpg",
            },
            internalID: "58211006c9dc2479f9000410",
            title: "Camouflage, II.407",
            image_title: "Andy Warhol, ‘Camouflage, II.407’, 1987",
            date: "1987",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge8",
          node: {
            id: "QXJ0d29yazo1ODI0Y2Y0NjljMThkYjMzM2IwMDAyNjk=",
            slug: "andy-warhol-ads-mobil-ii-dot-350",
            href: "/artwork/andy-warhol-ads-mobil-ii-dot-350",
            image: {
              aspect_ratio: 1,
              placeholder: "100%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/Oca3XCWSXV8Y69wsea4syg/large.jpg",
            },
            internalID: "5824cf469c18db333b000269",
            title: "Ads: Mobil, II.350",
            image_title: "Andy Warhol, ‘Ads: Mobil, II.350’, 1985",
            date: "1985",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge9",
          node: {
            id: "QXJ0d29yazo1ODJmNTQ0Y2IyMDJhMzY1OTEwMDA0NDY=",
            slug: "andy-warhol-c-and-i-general-custer-ii-dot-379",
            href: "/artwork/andy-warhol-c-and-i-general-custer-ii-dot-379",
            image: {
              aspect_ratio: 0.97,
              placeholder: "103.09278350515463%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/ns63fftmvkNS20XPzw8tkA/large.jpg",
            },
            internalID: "582f544cb202a36591000446",
            title: "C & I: General Custer, II.379",
            image_title: "Andy Warhol, ‘C & I: General Custer, II.379’, 1986",
            date: "1986",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge10",
          node: {
            id: "QXJ0d29yazo1ODJmNTQ0NGIyMDJhMzY1OTEwMDA0M2Q=",
            slug: "andy-warhol-ingrid-bergman-herself-ii-dot-313",
            href: "/artwork/andy-warhol-ingrid-bergman-herself-ii-dot-313",
            image: {
              aspect_ratio: 1,
              placeholder: "100.06253908692932%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/60V9tKyNbvyoB6Ig9kIyzg/large.jpg",
            },
            internalID: "582f5444b202a3659100043d",
            title: "Ingrid Bergman - Herself, II.313",
            image_title:
              "Andy Warhol, ‘Ingrid Bergman - Herself, II.313’, 1983",
            date: "1983",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge11",
          node: {
            id: "QXJ0d29yazo1ODJmNTQ0YzEzOWIyMTFlMzMwMDBiNzY=",
            slug: "andy-warhol-c-and-i-plains-indian-shield",
            href: "/artwork/andy-warhol-c-and-i-plains-indian-shield",
            image: {
              aspect_ratio: 1,
              placeholder: "100%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/MUu9c36ksrSjuIb11blZ8Q/large.jpg",
            },
            internalID: "582f544c139b211e33000b76",
            title: "C & I: Plains Indian Shield",
            image_title: "Andy Warhol, ‘C & I: Plains Indian Shield’, 1986",
            date: "1986",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge12",
          node: {
            id: "QXJ0d29yazo1ODUwNThkMjc2MjJkZDBmZWMwMDAwN2Q=",
            slug: "andy-warhol-querelle-iiia-dot-27-1",
            href: "/artwork/andy-warhol-querelle-iiia-dot-27-1",
            image: {
              aspect_ratio: 1,
              placeholder: "100%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/k5wi4CQMBFoRoHCqnhbwWQ/large.jpg",
            },
            internalID: "585058d27622dd0fec00007d",
            title: "Querelle (IIIA.27)",
            image_title: "Andy Warhol, ‘Querelle (IIIA.27)’, ca. 1982",
            date: "ca. 1982",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge13",
          node: {
            id: "QXJ0d29yazo1ODUwNThkMmEwOWE2Nzc0NGIwMDAwNzU=",
            slug: "andy-warhol-love-variants",
            href: "/artwork/andy-warhol-love-variants",
            image: {
              aspect_ratio: 0.75,
              placeholder: "132.89036544850498%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/6HDNXBUYiBCtsDuMx07X9g/large.jpg",
            },
            internalID: "585058d2a09a67744b000075",
            title: "Love Variants",
            image_title: "Andy Warhol, ‘Love Variants’, ca. 1982",
            date: "ca. 1982",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge14",
          node: {
            id: "QXJ0d29yazo1ODUwNThkMzhiM2I4MTdkMTgwMDAwYTU=",
            slug: "andy-warhol-poinsettias-10",
            href: "/artwork/andy-warhol-poinsettias-10",
            image: {
              aspect_ratio: 0.69,
              placeholder: "144.72361809045228%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/Uwn8oJOY3PXtl2KJUgSxNg/large.jpg",
            },
            internalID: "585058d38b3b817d180000a5",
            title: "Poinsettias",
            image_title: "Andy Warhol, ‘Poinsettias’, ca. 1983",
            date: "ca. 1983",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge15",
          node: {
            id: "QXJ0d29yazo1ODUwNThkNTJhODkzYTMxM2IwMDAwOTI=",
            slug: "andy-warhol-poinsettias-15",
            href: "/artwork/andy-warhol-poinsettias-15",
            image: {
              aspect_ratio: 0.7,
              placeholder: "142%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/HrFQNiXkDcINNfv6xS0EUw/large.jpg",
            },
            internalID: "585058d52a893a313b000092",
            title: "Poinsettias",
            image_title: "Andy Warhol, ‘Poinsettias’, ca. 1983",
            date: "ca. 1983",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge16",
          node: {
            id: "QXJ0d29yazo1ODUwNThlM2IyMDJhMzJjZGYwMDAwOWM=",
            slug: "andy-warhol-magazine-in-history-ii-dot-304a",
            href: "/artwork/andy-warhol-magazine-in-history-ii-dot-304a",
            image: {
              aspect_ratio: 0.82,
              placeholder: "122.19959266802445%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/csnOxZVPddRFlw4QdPu6KQ/large.jpg",
            },
            internalID: "585058e3b202a32cdf00009c",
            title: "Magazine In History, II.304A",
            image_title: "Andy Warhol, ‘Magazine In History, II.304A’, 1983",
            date: "1983",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge17",
          node: {
            id: "QXJ0d29yazo1ODUwNThmMjI3NWIyNDE0ZmMwMDAwYWY=",
            slug: "andy-warhol-kiku-312",
            href: "/artwork/andy-warhol-kiku-312",
            image: {
              aspect_ratio: 1.26,
              placeholder: "79.08256880733944%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/Gi2KbjDgNeWwJHXgN5_jtg/large.jpg",
            },
            internalID: "585058f2275b2414fc0000af",
            title: "Kiku",
            image_title: "Andy Warhol, ‘Kiku’, 1983",
            date: "1983",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge18",
          node: {
            id: "QXJ0d29yazo1ODUwNThkNWM5ZGMyNDY1NzEwMDAwNjk=",
            slug: "andy-warhol-sidewalk-ii-dot-304-21",
            href: "/artwork/andy-warhol-sidewalk-ii-dot-304-21",
            image: {
              aspect_ratio: 1.49,
              placeholder: "67.33333333333333%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/3767S8k6yWy9H5kPW069kA/large.jpg",
            },
            internalID: "585058d5c9dc246571000069",
            title: "Sidewalk, II.304",
            image_title: "Andy Warhol, ‘Sidewalk, II.304’, 1983",
            date: "1983",
            sale_message: "Sold",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge19",
          node: {
            id: "QXJ0d29yazo1ODUwNThlYTc2MjJkZDBmYzQwMDAwOTA=",
            slug: "andy-warhol-fish-iii-dot-39",
            href: "/artwork/andy-warhol-fish-iii-dot-39",
            image: {
              aspect_ratio: 0.7,
              placeholder: "143.1980906921241%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/F-5uuDFFarXNBLrBBrCUdQ/large.jpg",
            },
            internalID: "585058ea7622dd0fc4000090",
            title: "Fish, III.39",
            image_title: "Andy Warhol, ‘Fish, III.39’, 1983",
            date: "1983",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge20",
          node: {
            id: "QXJ0d29yazo1ODdmZjM2NjhiM2I4MTQyNDgwMDExMmE=",
            slug: "andy-warhol-hammer-and-sickle-164",
            href: "/artwork/andy-warhol-hammer-and-sickle-164",
            image: {
              aspect_ratio: 1.33,
              placeholder: "75.33333333333333%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/cVksFVMa8Dmq_5nr6IbBww/large.jpg",
            },
            internalID: "587ff3668b3b81424800112a",
            title: "Hammer & Sickle (164)",
            image_title: "Andy Warhol, ‘Hammer & Sickle (164)’, 1977",
            date: "1977",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
        {
          id: "edge21",
          node: {
            id: "QXJ0d29yazo1ODdmZjM2Njc2MjJkZDIxZTQwMDExOWI=",
            slug: "andy-warhol-hammer-and-sickle-169",
            href: "/artwork/andy-warhol-hammer-and-sickle-169",
            image: {
              aspect_ratio: 1.56,
              placeholder: "63.980582524271846%",
              url:
                "https://d32dm0rphc51dk.cloudfront.net/PBh3AUieRMnyEwmyJy8Q2g/large.jpg",
            },
            internalID: "587ff3667622dd21e400119b",
            title: "Hammer & Sickle",
            image_title: "Andy Warhol, ‘Hammer & Sickle’, 1977",
            date: "1977",
            sale_message: "Contact For Price",
            cultural_maker: null,
            artists: [
              {
                id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
                href: "/artist/andy-warhol",
                name: "Andy Warhol",
              },
            ],
            collecting_institution: null,
            partner: {
              name: "Hamilton-Selway Fine Art",
              href: "/hamilton-selway-fine-art",
              id: "UGFydG5lcjo1MTc1NmRkOTUxMDljZGNmOGMwMDAwNzU=",
              type: "Gallery",
            },
            sale: null,
            sale_artwork: null,
            is_inquireable: true,
            is_saved: false,
            is_biddable: false,
          },
        },
      ],
    },
    id: "QXJ0aXN0OjRkOGI5MmIzNGViNjhhMWIyYzAwMDNmNA==",
  },
}
