import { ArtistSeriesMetaFragmentContainer } from "Apps/ArtistSeries/Components/ArtistSeriesMeta"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistSeriesMetaTestQuery$rawResponse } from "__generated__/ArtistSeriesMetaTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const mockRouter = {
  match: {
    location: {
      pathname: "/artist-series/pumpkins",
      query: {},
    },
  },
}

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => mockRouter,
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => (
    <MockBoot breakpoint="lg" user={{ lab_features: ["Artist Series"] }}>
      <ArtistSeriesMetaFragmentContainer artistSeries={props.artistSeries} />
    </MockBoot>
  ),
  query: graphql`
    query ArtistSeriesMetaTestQuery($slug: ID!)
    @raw_response_type
    @relay_test_operation {
      artistSeries(id: $slug) {
        ...ArtistSeriesMeta_artistSeries
      }
    }
  `,
  variables: {
    slug: "pumpkins",
  },
})

describe("ArtistSeriesMeta", () => {
  it("creates search and social meta tags for title", () => {
    renderWithRelay({
      ArtistSeries: () => ArtistSeriesMetaFixture.artistSeries,
    })
    // Check that title tag exists with mock data
    expect(document.querySelector("title")).toHaveTextContent(
      /For Sale on Artsy/,
    )
    expect(
      document.querySelector('meta[property="og:title"]'),
    ).toBeInTheDocument()
    expect(
      document.querySelector('meta[property="twitter:title"]'),
    ).toBeInTheDocument()
  })

  it("creates search and social meta tags for description", () => {
    renderWithRelay({
      ArtistSeries: () => ArtistSeriesMetaFixture.artistSeries,
    })
    // Check that description meta tags exist
    expect(
      document.querySelector('meta[name="description"]'),
    ).toBeInTheDocument()
    expect(
      document.querySelector('meta[property="og:description"]'),
    ).toBeInTheDocument()
    expect(
      document.querySelector('meta[property="twitter:description"]'),
    ).toBeInTheDocument()
  })

  it("omits the artist name in the title an description when there is no artist", () => {
    renderWithRelay({
      ArtistSeries: () => ArtistSeriesMetaFixtureNoArtist.artistSeries,
    })
    // Check that title tag exists
    expect(document.querySelector("title")).toHaveTextContent(
      /For Sale on Artsy/,
    )
    expect(
      document.querySelector('meta[name="description"]'),
    ).toBeInTheDocument()
  })

  it("creates cannonical tags for the artist series", () => {
    renderWithRelay({
      ArtistSeries: () => ArtistSeriesMetaFixture.artistSeries,
    })
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      expect.stringContaining("/artist-series/"),
    )
  })

  describe("canonical URL", () => {
    it("renders basic canonical URL for artist series", () => {
      renderWithRelay({
        ArtistSeries: () => ArtistSeriesMetaFixture.artistSeries,
      })

      const canonicalLink = document.querySelector('link[rel="canonical"]')
      expect(canonicalLink).toHaveAttribute("href", "/artist-series/pumpkins")
    })

    it("strips filter query parameters from canonical URL (cursor-based pagination)", () => {
      mockRouter.match.location.query = {
        sort: "recently_updated",
        price_range: "1000-5000",
      }

      renderWithRelay({
        ArtistSeries: () => ArtistSeriesMetaFixture.artistSeries,
      })

      const canonicalLink = document.querySelector('link[rel="canonical"]')
      expect(canonicalLink).toHaveAttribute("href", "/artist-series/pumpkins")
      expect(canonicalLink?.getAttribute("href")).not.toContain("sort=")
      expect(canonicalLink?.getAttribute("href")).not.toContain("price_range=")
    })

    it("preserves page parameter in canonical URL (page-based pagination)", () => {
      mockRouter.match.location.query = { page: "2" }

      renderWithRelay({
        ArtistSeries: () => ArtistSeriesMetaFixture.artistSeries,
      })

      const canonicalLink = document.querySelector('link[rel="canonical"]')
      expect(canonicalLink).toHaveAttribute(
        "href",
        "/artist-series/pumpkins?page=2",
      )
    })

    it("strips filter parameters but preserves page parameter", () => {
      mockRouter.match.location.query = {
        sort: "recently_updated",
        category: "painting",
        page: "2",
        medium: "prints",
      }

      renderWithRelay({
        ArtistSeries: () => ArtistSeriesMetaFixture.artistSeries,
      })

      const canonicalLink = document.querySelector('link[rel="canonical"]')
      expect(canonicalLink).toHaveAttribute(
        "href",
        "/artist-series/pumpkins?page=2",
      )
      expect(canonicalLink?.getAttribute("href")).not.toContain("sort=")
      expect(canonicalLink?.getAttribute("href")).not.toContain("category=")
      expect(canonicalLink?.getAttribute("href")).not.toContain("medium=")
      expect(canonicalLink?.getAttribute("href")).toContain("page=2")
    })

    it("includes page number in title for paginated pages", () => {
      mockRouter.match.location.query = { page: "3" }

      renderWithRelay({
        ArtistSeries: () => ArtistSeriesMetaFixture.artistSeries,
      })

      const titleElement = document.querySelector("title")
      expect(titleElement?.textContent).toContain(
        "Pumpkins - For Sale on Artsy - Page 3",
      )
    })
  })
})

const ArtistSeriesMetaFixture: ArtistSeriesMetaTestQuery$rawResponse = {
  artistSeries: {
    id: "123",
    title: "Pumpkins",
    description:
      "Yayoi Kusama's instantly recognizable pumpkins have become fixtures of contemporary art and popular culture—and have helped make her one of the world's most expensive living female artists. Kusama began drawing pumpkins as a child in pre-war Japan, where her family owned a plant nursery that farmed kabocha squash. Her obsession only grew with time. Kusama's signature dotted pumpkins have since appeared as works on paper, handheld figurines, towering sculptures, and in the artist's immersive infinity room installations. To Kusama, the pumpkins are warm and humorous motifs with figures that, at times, feel human. \"I was enchanted by their charming and winsome form,\" Kusama once said. \"What appealed to me most was the pumpkin's generous unpretentiousness.\"",
    slug: "pumpkins",
    artists: [
      {
        name: "Yayoi Kusama",
        id: "abc123",
      },
    ],
  },
}

const ArtistSeriesMetaFixtureNoArtist: ArtistSeriesMetaTestQuery$rawResponse = {
  artistSeries: {
    id: "123",
    title: "Squashes",
    description:
      "Squashes are a lot like pumpkins except that they don't belong to any particular holiday. The most independent gourd, they always remain in style throughout the year.",
    slug: "squashes",
    artists: [],
  },
}
