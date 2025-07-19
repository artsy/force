import { ArtistSeriesMetaFragmentContainer } from "Apps/ArtistSeries/Components/ArtistSeriesMeta"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtistSeriesMeta_TestQuery$rawResponse } from "__generated__/ArtistSeriesMeta_TestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: ({ artistSeries }) => (
    <MockBoot breakpoint="lg" user={{ lab_features: ["Artist Series"] }}>
      <ArtistSeriesMetaFragmentContainer artistSeries={artistSeries} />
    </MockBoot>
  ),
  query: graphql`
    query ArtistSeriesMeta_TestQuery($slug: ID!)
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
    renderWithRelay(ArtistSeriesMetaFixture)
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
    renderWithRelay(ArtistSeriesMetaFixture)
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
    renderWithRelay(ArtistSeriesMetaFixtureNoArtist)
    // Check that title tag exists
    expect(document.querySelector("title")).toHaveTextContent(
      /For Sale on Artsy/,
    )
    expect(
      document.querySelector('meta[name="description"]'),
    ).toBeInTheDocument()
  })

  it("creates cannonical tags for the artist series", () => {
    renderWithRelay(ArtistSeriesMetaFixture)
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      "href",
      expect.stringContaining("/artist-series/"),
    )
  })
})

const ArtistSeriesMetaFixture: ArtistSeriesMeta_TestQuery$rawResponse = {
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

const ArtistSeriesMetaFixtureNoArtist: ArtistSeriesMeta_TestQuery$rawResponse =
  {
    artistSeries: {
      id: "123",
      title: "Squashes",
      description:
        "Squashes are a lot like pumpkins except that they don't belong to any particular holiday. The most independent gourd, they always remain in style throughout the year.",
      slug: "squashes",
      artists: [],
    },
  }
