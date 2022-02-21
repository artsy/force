import { mount } from "enzyme"
import { HeadProvider } from "react-head"
import { ArtistMetaCanonicalLink_artist$data } from "v2/__generated__/ArtistMetaCanonicalLink_artist.graphql"
import {
  ArtistMetaCanonicalLink,
  computeCanonicalPath,
} from "../ArtistMetaCanonicalLink"

jest.mock("v2/System/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: {
        pathname: "anything",
      },
    },
  }),
  useIsRouteActive: () => false,
}))

const MISSING_OVERVIEW_ARTIST_FIXTURE: ArtistMetaCanonicalLink_artist$data = {
  " $fragmentType": "ArtistMetaCanonicalLink_artist",
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

const OVERVIEW_ARTIST_FIXTURE: ArtistMetaCanonicalLink_artist$data = {
  " $fragmentType": "ArtistMetaCanonicalLink_artist",
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

    const canonicalUrl = wrapper.find("link[rel='canonical']").prop("href")
    expect(canonicalUrl).toEqual(
      "https://www.artsy-test.net/artist/damon-zucconi"
    )
  })

  it("correctly handles artists that lack overview pages", () => {
    const wrapper = mount(
      <HeadProvider>
        <ArtistMetaCanonicalLink artist={MISSING_OVERVIEW_ARTIST_FIXTURE} />
      </HeadProvider>
    )

    const canonicalUrl = wrapper.find("link[rel='canonical']").prop("href")
    expect(canonicalUrl).toEqual(
      "https://www.artsy-test.net/artist/gina-lombardi-bratter/works-for-sale"
    )
  })
})

describe("computeCanonicalPath", () => {
  it("appends consign for those pages", () => {
    const appUrl = "https://www.artsy.net"
    const artistSlug = "damon-zucconi"
    const canShowOverview = true
    const path = "/artist/damon-zucconi/consign"

    const canonicalUrl = computeCanonicalPath(
      appUrl,
      artistSlug,
      path,
      canShowOverview
    )

    expect(canonicalUrl).toMatch("consign")
  })
})
