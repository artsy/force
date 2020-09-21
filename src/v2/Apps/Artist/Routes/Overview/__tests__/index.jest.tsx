import { Button, Text, Theme } from "@artsy/palette"
import { routes_OverviewQueryRawResponse } from "v2/__generated__/routes_OverviewQuery.graphql"
import { SystemContextProvider } from "v2/Artsy"
import { useTracking } from "v2/Artsy/Analytics/useTracking"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { mount } from "enzyme"
import React from "react"
import { ArtistRecommendationsQueryRenderer as ArtistRecommendations } from "../Components/ArtistRecommendations"
import { ArtistTopWorksRailFragmentContainer as ArtistTopWorksRail } from "v2/Apps/Artist/Components/ArtistTopWorksRail/ArtistTopWorksRail"
import { FeaturedArticlesItem, OverviewRoute } from "../index"

jest.mock("v2/Artsy/Analytics/useTracking")

describe("OverviewRoute", () => {
  function getWrapper(artistData, user: User = {}) {
    return mount(
      <SystemContextProvider user={user}>
        <Theme>
          <OverviewRoute artist={artistData} />
        </Theme>
      </SystemContextProvider>
    )
  }

  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("Content", () => {
    it("Displays articles and shows", () => {
      const wrapper = getWrapper(defaultArtist)

      expect(
        wrapper
          .find(Text)
          .filterWhere(t => t.text() === "Articles Featuring Juan Gris")
      ).toHaveLength(1)

      expect(wrapper.find(FeaturedArticlesItem).length).toEqual(4)

      expect(
        wrapper
          .find(Text)
          .filterWhere(t => t.text() === "Shows Featuring Juan Gris")
      ).toHaveLength(1)
    })

    it("Includes a link to the /cv page", () => {
      const wrapper = getWrapper(defaultArtist)

      const CVButton = wrapper
        .find(RouterLink)
        .filterWhere(t => t.text() === "See all past shows and fair booths")
      expect(CVButton.length).toEqual(2) // renders 2 because of multiple breakpoints
      expect(CVButton.first().prop("to")).toEqual("/artist/juan-gris/cv")

      CVButton.first().simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        destination_path: "/artist/juan-gris/cv",
        subject: "See all past shows and fair booths",
      })
      expect(trackEvent).toHaveBeenCalledTimes(1)
    })

    it("doesn't include a link to the /cv page if there is no cv", () => {
      const wrapper = getWrapper({
        ...defaultArtist,
        statuses: {
          cv: false,
        },
      })

      const CVButton = wrapper
        .find(RouterLink)
        .filterWhere(t => t.text() === "See all past shows and fair booths")
      expect(CVButton.length).toEqual(0) // renders 2 because of multiple breakpoints
    })

    it("Includes a link to the /shows page", () => {
      const wrapper = getWrapper(defaultArtist)

      const ShowsButton = wrapper
        .find(RouterLink)
        .filterWhere(t => t.text() === "See all current and upcoming shows")
      expect(ShowsButton.length).toEqual(1)
      expect(ShowsButton.prop("to")).toEqual("/artist/juan-gris/shows")

      ShowsButton.simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        destination_path: "/artist/juan-gris/shows",
        subject: "See all current and upcoming shows",
      })
      expect(trackEvent).toHaveBeenCalledTimes(1)
    })

    it("Includes a link to the /articles page", () => {
      const wrapper = getWrapper(defaultArtist)

      const ArticlesButton = wrapper
        .find(RouterLink)
        .filterWhere(t => t.text() === "See all articles")
      expect(ArticlesButton.length).toEqual(1)
      expect(ArticlesButton.prop("to")).toEqual("/artist/juan-gris/articles")

      ArticlesButton.simulate("click")

      expect(trackEvent).toBeCalledWith({
        action_type: "Click",
        destination_path: "/artist/juan-gris/articles",
        subject: "See all articles",
      })
      expect(trackEvent).toHaveBeenCalledTimes(1)
    })

    it("displays a different button label if the artist has no for sale works", () => {
      const wrapper = getWrapper({
        ...defaultArtist,
        counts: {
          forSaleArtworks: 0,
        },
      })

      expect(
        wrapper.find(Button).filterWhere(t => t.text() === "Browse all works")
          .length
      ).toEqual(1)
    })

    it("Takes you to the /works-for-sale page if you click the big button", () => {
      const wrapper = getWrapper(defaultArtist)

      const browseButton = wrapper
        .find(RouterLink)
        .filterWhere(t => t.text() === "Browse all works for sale (20)")
      expect(browseButton.length).toEqual(1)
      expect(browseButton.prop("to")).toEqual(
        "/artist/juan-gris/works-for-sale"
      )
    })

    it("does not display a big button if the artist has no works", () => {
      const wrapper = getWrapper({
        ...defaultArtist,
        statuses: {
          ...defaultArtist.statuses,
          artworks: false,
        },
      })

      expect(
        wrapper
          .find(Button)
          .filterWhere(t => t.text().includes("Browse all works for sale (20)"))
          .length
      ).toEqual(0)
    })

    it("does not display the articles section if the artist has no articles", () => {
      const wrapper = getWrapper({
        ...defaultArtist,
        articlesConnection: null,
      })

      expect(wrapper.text()).not.toContain("Articles Featuring Juan Gris")
    })

    it("does not display the articles section if the artist zero articles edges", () => {
      const wrapper = getWrapper({
        ...defaultArtist,
        articlesConnection: {
          edges: [],
        },
      })

      expect(wrapper.text()).not.toContain("Articles Featuring Juan Gris")
    })

    it("does not display the shows section if the artist has no shows", () => {
      const wrapper = getWrapper({
        ...defaultArtist,
        showsConnection: null,
      })

      expect(wrapper.text()).not.toContain("Shows Featuring Juan Gris")
    })

    it("does not display the shows section if the artist zero shows edges", () => {
      const wrapper = getWrapper({
        ...defaultArtist,
        showsConnection: {
          edges: [],
        },
      })

      expect(wrapper.text()).not.toContain("Shows Featuring Juan Gris")
    })
  })

  describe("ConsignButton", () => {
    it("shows a default consign button", () => {
      const wrapper = getWrapper({
        ...defaultArtist,
      })
      expect(wrapper.find("ArtistConsignButton").length).toEqual(2)
    })
  })

  describe("Artist Recommendations", () => {
    it("Does not display recommendations if related.artists is empty", () => {
      const wrapper = getWrapper(defaultArtist)

      expect(wrapper.find(ArtistRecommendations).length).toEqual(0)
    })

    it("Does not display recommendations if related.artists.edges.length === 0", () => {
      const wrapper = getWrapper({
        ...defaultArtist,
        related: {
          ...defaultArtist.related,
          artists: {
            edges: [],
          },
        },
      })

      expect(wrapper.find(ArtistRecommendations).length).toEqual(0)
    })

    it("Displays recommendations if there are related artists", () => {
      const wrapper = getWrapper(artistWithRelatedArtists)

      expect(wrapper.find(ArtistRecommendations).length).toEqual(1)
    })
  })

  describe("Artist Notable Works Rail", () => {
    it("Displays Notable Works rail", () => {
      const wrapper = getWrapper(defaultArtist)

      expect(wrapper.find(ArtistTopWorksRail).length).toEqual(2) // renders 2 because of multiple breakpoints
    })
  })

  it("Takes you to the /works-for-sale page if you click 'View All Works'", () => {
    const wrapper = getWrapper(defaultArtist)

    const viewAllWorksButton = wrapper
      .find("[data-test='link-to-works-for-sale']")
      .first()

    expect(viewAllWorksButton.length).toEqual(1)
    expect(viewAllWorksButton.prop("to")).toEqual(
      "/artist/juan-gris/works-for-sale"
    )
  })
})

const defaultArtist: routes_OverviewQueryRawResponse["artist"] = {
  targetSupply: {
    isInMicrofunnel: false,
    isTargetSupply: false,
  },
  id: "opaque-artist-id",
  slug: "juan-gris",
  name: "Juan Gris",
  counts: {
    follows: 42,
    partner_shows: 11,
    forSaleArtworks: 20,
    ecommerce_artworks: 30,
    auction_artworks: 40,
    artworks: 50,
    has_make_offer_artworks: true,
  },
  filterArtworksConnection: {
    id: "12345-abde",
    edges: [
      {
        node: {
          imageTitle: "This Image Has a Title, A. Artist, 2020",
          id: "QXJ0d29yazo1ZGVjZDRiYjNjN2NiMTAwMTAwYWQzNmQ=",
          slug: "andy-warhol-roy-lichtenstein-authenticated-3",
          href: "/artwork/andy-warhol-roy-lichtenstein-authenticated-3",
          image: {
            aspectRatio: 1.0,
            url:
              "https://d32dm0rphc51dk.cloudfront.net/JS5CsvkO_SpL1Vg7R-h_Zw/large.jpg",
          },
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
  },
  image: {
    cropped: {
      url: "/some/image.jpg",
    },
  },
  articlesConnection: {
    edges: [
      {
        node: {
          href: "/article/artsy-editorial-us-china-trade-war-art-market",
          thumbnailTitle:
            "What the U.S.–China Trade War Means for the Art Market",
          publishedAt: "Jul 23rd, 2018",
          thumbnailImage: {
            cropped: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=width&width=300&quality=80&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F0wcjPCKn9wQg_DRvywHDsQ%252FGettyImages-997234250-1200.jpg",
            },
          },
          id: "QXJ0aWNsZTo1YjU2Mjk0OTMyMjliNDAwMmU0NmZhMjQ=",
        },
      },
      {
        node: {
          href: "/article/artsy-editorial-picassos-muses-art-markets-darling",
          thumbnailTitle:
            "Which of Picasso’s Muses Is the Art Market’s Darling?",
          publishedAt: "Jun 22nd, 2018",
          thumbnailImage: {
            cropped: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=width&width=300&quality=80&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FXsyUiT-8FinACaBkvMXGhA%252Fpicassomag.jpg",
            },
          },
          id: "QXJ0aWNsZTo1YjJiYmNiZmQ3YTNiMDAwNDI5MGM0Mzc=",
        },
      },
      {
        node: {
          href: "/article/artsy-editorial-2018-picassos-billion-dollar-year",
          thumbnailTitle: "Why 2018 Could Be Picasso’s Billion Dollar Year",
          publishedAt: "Apr 10th, 2018",
          thumbnailImage: {
            cropped: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=width&width=300&quality=80&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2F8VtjX1i3z4kT-Nbw_lBdbQ%252Fcustom-Custom_Size___Picasso%252C%2BLe%2BRepos%2B%25281932%2529%2B%25281%2529.jpg",
            },
          },
          id: "QXJ0aWNsZTo1YWNiZDM3ZjVmMDFmMDAwMmU3YzM4Mzg=",
        },
      },
      {
        node: {
          href:
            "/article/artsy-editorial-1127-million-picasso-spending-spree-buoys-big-sales-christies-sothebys-london",
          thumbnailTitle:
            "A £112.7 Million Picasso Spending Spree Buoys Big Sales at Christie’s and Sotheby’s in London",
          publishedAt: "Mar 1st, 2018",
          thumbnailImage: {
            cropped: {
              url:
                "https://d7hftxdivxxvm.cloudfront.net?resize_to=width&width=300&quality=80&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FAXNlAM9edEcFLSh932x4GA%252FCMD_6770.jpg",
            },
          },
          id: "QXJ0aWNsZTo1YTk3MzI1M2M1M2RkODAwMjk4ODY4MDY=",
        },
      },
    ],
  },
  showsConnection: {
    edges: [
      {
        node: {
          name: "Traditions & Reflections",
          href: "/show/r-s-johnson-fine-art-traditions-and-reflections",
          exhibitionPeriod: "Sep 1, 2019 – Jan 31, 2020",
          coverImage: {
            cropped: {
              url:
                "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=220&height=140&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FCoWwm5cwPQe-cuMfnd1L_Q%2Flarge.jpg",
              width: 220,
              height: 140,
            },
          },
          id: "U2hvdzo1ZDc2YWQ3M2IzYWVkNzAwMGRiZWJjYjI=",
        },
      },
      {
        node: {
          name: "A Christmas Tree from Vallauris",
          href: "/show/bailly-gallery-a-christmas-tree-from-vallauris-1",
          exhibitionPeriod: "Dec 1, 2019 – Jan 31, 2020",
          coverImage: {
            cropped: {
              url:
                "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=220&height=140&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FCoWwm5cwPQe-cuMfnd1L_Q%2Flarge.jpg",
              width: 220,
              height: 140,
            },
          },
          id: "U2hvdzo1ZGQ3Y2QzMmYyMDgwYjAwMTY5MjZlNWQ=",
        },
      },
      {
        node: {
          name: "Seeing Picasso: Maker of the Modern",
          href: "/show/pace-gallery-seeing-picasso-maker-of-the-modern",
          exhibitionPeriod: "Nov 2, 2019 – Feb 16, 2020",
          coverImage: {
            cropped: {
              url:
                "https://d196wkiy8qx2u5.cloudfront.net?resize_to=fill&width=220&height=140&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FCoWwm5cwPQe-cuMfnd1L_Q%2Flarge.jpg",
              width: 220,
              height: 140,
            },
          },
          id: "U2hvdzo1ZGIzNDQ4ZTZmYjUzYjAwMTEwZDExOWU=",
        },
      },
    ],
  },
  artworksConnection: null,
  statuses: {
    artworks: true,
    cv: true,
  },
  is_followed: true,
  href: "/artist/juan-gris",
  biographyBlurb: {
    text:
      '<p>Originally trained in math and physics, Juan Gris moved to Paris in 1906, where he met <a href="/artist/pablo-picasso">Pablo Picasso</a> and <a href="/artist/georges-braque">Georges Braque</a> and became involved in the <a href="/gene/cubism">Cubist</a> movement. Gris took a highly mathematical approach to Cubist painting, rendering discrete forms with precision and exactitude, the resulting images almost resembling technical drawings. The composition of <em>Jar, Flask, and Glass</em> (1911), for example, was derived from an underlying grid structure, the different modules depicting different planar perspectives and yielding an overall composition that is both fractured and flattened. Gris also experimented with <a href="/gene/pointillism">Pointillism</a> in works such as <a href="/artwork/juan-gris-newspaper-and-fruit-dish"><em>Newspaper and Fruit Dish</em></a> (1916), and often alluded to earlier artists such as <a href="/artist/jean-baptiste-camille-corot">Jean-Baptiste-Camille Corot</a> and <a href="/artist/paul-cezanne">Paul Cézanne</a> through both style and subject matter.</p>\n',
  },
  currentEvent: null,
  related: {
    genes: {
      edges: [
        {
          node: {
            id: "opaque-gene-id",
            slug: "cubism",
            name: "Cubism",
            href: "/gene/cubism",
          },
        },
      ],
    },
    artistsConnection: null,
  },
  internalID: "4d8b928e4eb68a1b2c000222",
  collections: [
    "Tate",
    "Museum of Modern Art (MoMA)",
    "National Gallery of Art, Washington, D.C.",
  ],
  highlights: {
    partnersConnection: {
      edges: [],
    },
  },
  insights: [],
  auctionResultsConnection: null,
}

const artistWithRelatedArtists: routes_OverviewQueryRawResponse["artist"] = {
  ...defaultArtist,
  related: {
    ...defaultArtist.related,
    artistsConnection: {
      edges: [
        {
          node: {
            id: "123",
          },
        },
      ],
    },
  },
}
