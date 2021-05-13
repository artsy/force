import { artistRoutes_ArtistTopLevelQueryRawResponse } from "v2/__generated__/artistRoutes_ArtistTopLevelQuery.graphql"
import { artistRoutes } from "v2/Apps/Artist/artistRoutes"
import { createMockNetworkLayer2 } from "v2/DevTools/createMockNetworkLayer"
import { Resolver } from "found-relay"
import { FarceRedirectResult, getFarceResult } from "found/server"
import React from "react"
import { Environment, RecordSource, Store } from "relay-runtime"

describe("Artist/routes", () => {
  async function render(
    url,
    mockData: artistRoutes_ArtistTopLevelQueryRawResponse
  ) {
    const network = createMockNetworkLayer2({ mockData })
    const source = new RecordSource()
    const store = new Store(source)
    const environment = new Environment({ network, store })
    const user = {}

    const result = await getFarceResult({
      matchContext: { user },
      render: () => <div>hello</div>,
      resolver: new Resolver(environment),
      routeConfig: artistRoutes,
      url,
    })

    return result as FarceRedirectResult
  }

  const mockResolver = (
    artist: artistRoutes_ArtistTopLevelQueryRawResponse["artist"]
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
    await expect(
      render("/artist/juan-gris/", mockResolver(overviewArtist))
    ).resolves.toEqual({
      redirect: {
        url: "/artist/juan-gris",
      },
      status: 301,
    })
  })

  it("doesn't redirect from /auction-results to /works-for-sale if auction-results", async () => {
    const { redirect } = await render(
      "/artist/juan-gris/auction-results",
      mockResolver({
        ...overviewArtist,
        // @ts-expect-error STRICT_NULL_CHECK
        statuses: {
          // @ts-expect-error STRICT_NULL_CHECK
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
      // @ts-expect-error STRICT_NULL_CHECK
      mockResolver({
        ...overviewArtist,
      })
    )

    expect(redirect.url).toBe("/artist/juan-gris")
  })

  it("renders the /works-for-sale page if there is no data", async () => {
    const { redirect } = await render(
      "/artist/juan-gris/works-for-sale",
      // @ts-expect-error STRICT_NULL_CHECK
      mockResolver({
        ...overviewArtist,
        biographyBlurb: {
          text: null,
        },
        highlights: {
          partnersConnection: null,
        },
        related: {
          genes: null,
        },
        statuses: {
          articles: false,
          artworks: false,
          auctionLots: false,
          cv: false,
          shows: false,
        },
      })
    )

    expect(redirect).toBe(undefined)
  })

  it("redirects from / to the /works-for-sale page if there is no data", async () => {
    await expect(
      render(
        "/artist/juan-gris",
        // @ts-expect-error STRICT_NULL_CHECK
        mockResolver({
          ...overviewArtist,
          biographyBlurb: {
            text: null,
          },
          highlights: {
            partnersConnection: null,
          },
          related: {
            genes: null,
          },
          statuses: {
            articles: false,
            artworks: false,
            auctionLots: false,
            cv: false,
            shows: false,
          },
        })
      )
    ).resolves.toEqual({
      redirect: {
        url: "/artist/juan-gris/works-for-sale",
      },
      status: 301,
    })
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
    await expect(
      render(
        "/artist/juan-gris/cv",
        // @ts-expect-error STRICT_NULL_CHECK
        mockResolver({
          ...overviewArtist,
          biographyBlurb: {
            text: null,
          },
          related: {
            genes: null,
          },
          statuses: {
            articles: false,
            artworks: false,
            auctionLots: false,
            cv: false,
            shows: false,
          },
        })
      )
    ).resolves.toEqual({
      redirect: { url: "/artist/juan-gris/works-for-sale" },
      status: 301,
    })
  })
})

const overviewArtist: artistRoutes_ArtistTopLevelQueryRawResponse["artist"] = {
  alternate_names: null,
  artistHighlights: {
    partnersConnection: {
      edges: [],
    },
  },
  artworks_connection: null,
  auctionResultsConnection: null,
  biographyBlurb: {
    text:
      '<p>Originally trained in math and physics, Juan Gris moved to Paris in 1906, where he met <a href="/artist/pablo-picasso">Pablo Picasso</a> and <a href="/artist/georges-braque">Georges Braque</a> and became involved in the <a href="/gene/cubism">Cubist</a> movement. Gris took a highly mathematical approach to Cubist painting, rendering discrete forms with precision and exactitude, the resulting images almost resembling technical drawings. The composition of <em>Jar, Flask, and Glass</em> (1911), for example, was derived from an underlying grid structure, the different modules depicting different planar perspectives and yielding an overall composition that is both fractured and flattened. Gris also experimented with <a href="/gene/pointillism">Pointillism</a> in works such as <a href="/artwork/juan-gris-newspaper-and-fruit-dish"><em>Newspaper and Fruit Dish</em></a> (1916), and often alluded to earlier artists such as <a href="/artist/jean-baptiste-camille-corot">Jean-Baptiste-Camille Corot</a> and <a href="/artist/paul-cezanne">Paul Cézanne</a> through both style and subject matter.</p>\n',
  },
  birthday: "Feb 15",
  blurb: "blurb",
  counts: {
    artworks: 12,
    follows: 1234,
    forSaleArtworks: 10,
  },
  deathday: null,
  formattedNationalityAndBirthday: "British, 1890-1970",
  gender: "male",
  highlights: {
    partnersConnection: {
      edges: [],
    },
  },
  href: "/artist/juan-gris",
  id: "opaque-artist-id",
  image: null,
  insights: [],
  internalID: "4d8b928e4eb68a1b2c000222",
  is_followed: false,
  meta: null,
  name: "Juan Gris",
  nationality: "",
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
  slug: "juan-gris",
  statuses: {
    articles: true,
    artworks: true,
    auctionLots: true,
    cv: true,
    shows: true,
  },
}
