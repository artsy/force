import { routes_ArtistTopLevelQueryRawResponse } from "v2/__generated__/routes_ArtistTopLevelQuery.graphql"
import { routes } from "v2/Apps/Artist/routes"
import { createMockNetworkLayer2 } from "v2/DevTools/createMockNetworkLayer"
import { Resolver } from "found-relay"
import { FarceRedirectResult } from "found/lib/server"
import getFarceResult from "found/lib/server/getFarceResult"
import React from "react"
import { Environment, RecordSource, Store } from "relay-runtime"

describe("Artist/routes", () => {
  async function render(url, mockData: routes_ArtistTopLevelQueryRawResponse) {
    const network = createMockNetworkLayer2({ mockData })
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })
    const user = {}

    const result = await getFarceResult({
      url,
      routeConfig: routes,
      matchContext: { user },
      resolver: new Resolver(environment),
      render: () => <div>hello</div>,
    })

    return result as FarceRedirectResult
  }

  const mockResolver = (
    artist: routes_ArtistTopLevelQueryRawResponse["artist"]
  ) => ({
    artist,
  })

  it("renders the overview page if there is sufficient data", async () => {
    const { redirect } = await render(
      "/artist/juan-gris",
      mockResolver(overviewArtist)
    )

    expect(redirect).toBe(undefined)
  })

  it("redirects trailing a trailing slash on the artist page back to the root", async () => {
    const { redirect } = await render(
      "/artist/juan-gris/",
      mockResolver(overviewArtist)
    )

    expect(redirect.url).toBe("/artist/juan-gris")
  })

  it("doesn't redirect from /auction-results to /works-for-sale if auction-results", async () => {
    const { redirect } = await render(
      "/artist/juan-gris/auction-results",
      mockResolver({
        ...overviewArtist,
        statuses: {
          ...overviewArtist.statuses,
          auctionLots: true,
        },
      })
    )
    expect(redirect).toBe(undefined)
  })

  it("redirects from /overview to /", async () => {
    const { redirect } = await render(
      "/artist/juan-gris/overview",
      mockResolver({
        ...overviewArtist,
      })
    )

    expect(redirect.url).toBe("/artist/juan-gris")
  })

  it("renders the /works-for-sale page if there is no data", async () => {
    const { redirect } = await render(
      "/artist/juan-gris/works-for-sale",
      mockResolver({
        ...overviewArtist,
        highlights: {
          partnersConnection: null,
        },
        statuses: {
          shows: false,
          articles: false,
          cv: false,
          auctionLots: false,
          artworks: false,
        },
        biographyBlurb: {
          text: null,
        },
        related: {
          genes: null,
        },
      })
    )

    expect(redirect).toBe(undefined)
  })

  it("redirects from / to the /works-for-sale page if there is no data", async () => {
    const { redirect } = await render(
      "/artist/juan-gris",
      mockResolver({
        ...overviewArtist,
        highlights: {
          partnersConnection: null,
        },
        statuses: {
          shows: false,
          articles: false,
          cv: false,
          auctionLots: false,
          artworks: false,
        },
        biographyBlurb: {
          text: null,
        },
        related: {
          genes: null,
        },
      })
    )

    expect(redirect.url).toBe("/artist/juan-gris/works-for-sale")
  })

  it("does not redirect from /cv", async () => {
    const { redirect } = await render(
      "/artist/juan-gris/cv",
      mockResolver(overviewArtist)
    )

    expect(redirect).toBe(undefined)
  })

  it("does not redirect from /shows", async () => {
    const { redirect } = await render(
      "/artist/juan-gris/shows",
      mockResolver(overviewArtist)
    )

    expect(redirect).toBe(undefined)
  })

  it("does not redirect from /articles", async () => {
    const { redirect } = await render(
      "/artist/juan-gris/articles",
      mockResolver(overviewArtist)
    )

    expect(redirect).toBe(undefined)
  })

  it("redirects from /cv to the /works-for-sale page if there is no data", async () => {
    const { redirect } = await render(
      "/artist/juan-gris/cv",
      mockResolver({
        ...overviewArtist,
        statuses: {
          shows: false,
          articles: false,
          cv: false,
          auctionLots: false,
          artworks: false,
        },
        biographyBlurb: {
          text: null,
        },
        related: {
          genes: null,
        },
      })
    )

    expect(redirect.url).toBe("/artist/juan-gris/works-for-sale")
  })
})

const overviewArtist: routes_ArtistTopLevelQueryRawResponse["artist"] = {
  id: "opaque-artist-id",
  slug: "juan-gris",
  formattedNationalityAndBirthday: "British, 1890-1970",
  is_followed: false,
  statuses: {
    shows: true,
    articles: true,
    cv: true,
    auctionLots: true,
    artworks: true,
  },
  biographyBlurb: {
    text:
      '<p>Originally trained in math and physics, Juan Gris moved to Paris in 1906, where he met <a href="/artist/pablo-picasso">Pablo Picasso</a> and <a href="/artist/georges-braque">Georges Braque</a> and became involved in the <a href="/gene/cubism">Cubist</a> movement. Gris took a highly mathematical approach to Cubist painting, rendering discrete forms with precision and exactitude, the resulting images almost resembling technical drawings. The composition of <em>Jar, Flask, and Glass</em> (1911), for example, was derived from an underlying grid structure, the different modules depicting different planar perspectives and yielding an overall composition that is both fractured and flattened. Gris also experimented with <a href="/gene/pointillism">Pointillism</a> in works such as <a href="/artwork/juan-gris-newspaper-and-fruit-dish"><em>Newspaper and Fruit Dish</em></a> (1916), and often alluded to earlier artists such as <a href="/artist/jean-baptiste-camille-corot">Jean-Baptiste-Camille Corot</a> and <a href="/artist/paul-cezanne">Paul Cézanne</a> through both style and subject matter.</p>\n',
  },
  related: {
    genes: {
      edges: [
        {
          node: {
            __typename: "Gene",
            id: "opaque-gene-id",
            slug: "cubism",
          },
        },
      ],
    },
  },
  internalID: "4d8b928e4eb68a1b2c000222",
  highlights: {
    partnersConnection: {
      edges: [],
    },
  },
  artistHightlights: {
    partnersConnection: {
      edges: [],
    },
  },
  insights: [],
  name: "Juan Gris",
  nationality: "",
  birthday: "Feb 15",
  gender: "male",
  deathday: null,
  href: "/artist/juan-gris",
  meta: null,
  alternate_names: null,
  image: null,
  counts: {
    artworks: 12,
    follows: 1234,
    forSaleArtworks: 10,
  },
  blurb: "blurb",
  artworks_connection: null,
  auctionResultsConnection: null,
}
