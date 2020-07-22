import React from "react"
import { mount } from "enzyme"
import { HeadProvider } from "react-head"
import { ArtistMetaCanonicalLink_artist } from "v2/__generated__/ArtistMetaCanonicalLink_artist.graphql"
import { ArtistMetaCanonicalLink } from "../ArtistMetaCanonicalLink"

const MISSING_OVERVIEW_ARTIST_FIXTURE: ArtistMetaCanonicalLink_artist = {
  " $refType": "ArtistMetaCanonicalLink_artist",
  slug: "gina-lombardi-bratter",
  statuses: {
    shows: false,
    cv: false,
    articles: false,
    auctionLots: false,
    artworks: true,
  },
  highlights: {
    partnersConnection: {
      edges: [],
    },
  },
  biographyBlurb: {
    text: "",
  },
  related: {
    genes: {
      edges: [],
    },
  },
  insights: [],
}

const OVERVIEW_ARTIST_FIXTURE: ArtistMetaCanonicalLink_artist = {
  " $refType": "ArtistMetaCanonicalLink_artist",
  slug: "damon-zucconi",
  statuses: {
    shows: true,
    cv: true,
    articles: true,
    auctionLots: true,
    artworks: true,
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
  biographyBlurb: {
    text: "",
  },
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
  insights: [
    {
      __typename: "ArtistInsight",
    },
  ],
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
