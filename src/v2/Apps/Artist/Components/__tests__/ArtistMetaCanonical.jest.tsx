import React from "react"
import { mount } from "enzyme"
import { HeadProvider } from "react-head"
import { ArtistMetaCanonicalLink_artist } from "v2/__generated__/ArtistMetaCanonicalLink_artist.graphql"
import { ArtistMetaCanonicalLink } from "../ArtistMetaCanonicalLink"

jest.mock("v2/Artsy/Router/useRouter", () => ({
  useIsRouteActive: () => false,
  useRouter: () => ({
    match: {
      location: {
        pathname: "anything",
      },
    },
  }),
}))

const MISSING_OVERVIEW_ARTIST_FIXTURE: ArtistMetaCanonicalLink_artist = {
  " $refType": "ArtistMetaCanonicalLink_artist",
  biographyBlurb: {
    text: "",
  },
  highlights: {
    partnersConnection: {
      edges: [],
    },
  },
  insights: [],
  related: {
    genes: {
      edges: [],
    },
  },
  slug: "gina-lombardi-bratter",
  statuses: {
    articles: false,
    artworks: true,
    auctionLots: false,
    cv: false,
    shows: false,
  },
}

const OVERVIEW_ARTIST_FIXTURE: ArtistMetaCanonicalLink_artist = {
  " $refType": "ArtistMetaCanonicalLink_artist",
  biographyBlurb: {
    text: "",
  },
  highlights: {
    partnersConnection: {
      edges: [
        {
          __typename: "PartnerArtistEdge",
        },
      ],
    },
  },
  insights: [
    {
      __typename: "ArtistInsight",
    },
  ],
  related: {
    genes: {
      edges: [
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
        {
          node: {
            __typename: "Gene",
          },
        },
      ],
    },
  },
  slug: "damon-zucconi",
  statuses: {
    articles: true,
    artworks: true,
    auctionLots: true,
    cv: true,
    shows: true,
  },
}

jest.mock("sharify", () => ({
  data: { APP_URL: "https://www.artsy-test.net" },
}))

describe("ArtistMetaCanonicalLink", () => {
  it("correctly handles artists with overview pages", () => {
    const wrapper = mount(
      <HeadProvider>
        <ArtistMetaCanonicalLink artist={OVERVIEW_ARTIST_FIXTURE} />
      </HeadProvider>
    )

    expect(wrapper.html()).toEqual(
      '<link rel="canonical" href="https://www.artsy-test.net/artist/damon-zucconi">'
    )
  })

  it("correctly handles artists that lack overview pages", () => {
    const wrapper = mount(
      <HeadProvider>
        <ArtistMetaCanonicalLink artist={MISSING_OVERVIEW_ARTIST_FIXTURE} />
      </HeadProvider>
    )

    expect(wrapper.html()).toEqual(
      '<link rel="canonical" href="https://www.artsy-test.net/artist/gina-lombardi-bratter/works-for-sale">'
    )
  })
})
