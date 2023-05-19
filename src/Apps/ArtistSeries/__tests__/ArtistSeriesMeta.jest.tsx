import { renderRelayTree } from "DevTools/renderRelayTree"
import { MockBoot } from "DevTools/MockBoot"
import { ArtistSeriesMetaFragmentContainer } from "Apps/ArtistSeries/Components/ArtistSeriesMeta"
import { graphql } from "react-relay"
import { ArtistSeriesMeta_TestQuery$rawResponse } from "__generated__/ArtistSeriesMeta_TestQuery.graphql"

jest.unmock("react-relay")

describe("ArtistSeriesMeta", () => {
  const getWrapper = async (
    response: ArtistSeriesMeta_TestQuery$rawResponse = ArtistSeriesMetaFixture
  ) => {
    return renderRelayTree({
      Component: ({ artistSeries }) => {
        return (
          <MockBoot breakpoint="lg" user={{ lab_features: ["Artist Series"] }}>
            <ArtistSeriesMetaFragmentContainer artistSeries={artistSeries} />
          </MockBoot>
        )
      },
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
      mockData: response,
    })
  }

  it("creates search and social meta tags for title", async () => {
    const wrapper = await getWrapper()
    const expectedTitle = "Yayoi Kusama’s Pumpkins - For Sale on Artsy"
    expect(wrapper.find("Title").text()).toBe(expectedTitle)
    expect(wrapper.find('Meta[property="og:title"]').prop("content")).toBe(
      expectedTitle
    )
    expect(wrapper.find('Meta[property="twitter:title"]').prop("content")).toBe(
      expectedTitle
    )
  })

  it("creates search and social meta tags for description", async () => {
    const wrapper = await getWrapper()
    const expectedDescription =
      "Discover and collect art from Yayoi Kusama’s iconic Pumpkins series and more. Yayoi Kusama's instantly recognizable pumpkins have become fixtures of..."
    expect(wrapper.find('Meta[name="description"]').prop("content")).toBe(
      expectedDescription
    )
    expect(
      wrapper.find('Meta[property="og:description"]').prop("content")
    ).toBe(expectedDescription)
    expect(
      wrapper.find('Meta[property="twitter:description"]').prop("content")
    ).toBe(expectedDescription)
  })

  it("omits the artist name in the title an description when there is no artist", async () => {
    const wrapper = await getWrapper(ArtistSeriesMetaFixtureNoArtist)
    const expectedTitle = "Squashes - For Sale on Artsy"
    const expectedDescription =
      "Discover and collect art from iconic Squashes series and more. Squashes are a lot like pumpkins except that they don't belong to any particular holiday. The..."
    expect(wrapper.find("Title").text()).toBe(expectedTitle)
    expect(wrapper.find('Meta[name="description"]').prop("content")).toBe(
      expectedDescription
    )
  })

  it("creates cannonical tags for the artist series", async () => {
    const wrapper = await getWrapper(ArtistSeriesMetaFixture)
    const expectedHref = "/artist-series/pumpkins"
    expect(wrapper.debug()).toContain(expectedHref)
  })
})

const ArtistSeriesMetaFixture: ArtistSeriesMeta_TestQuery$rawResponse = {
  artistSeries: {
    title: "Pumpkins",
    description:
      "Yayoi Kusama's instantly recognizable pumpkins have become fixtures of contemporary art and popular culture—and have helped make her one of the world’s most expensive living female artists. Kusama began drawing pumpkins as a child in pre-war Japan, where her family owned a plant nursery that farmed kabocha squash. Her obsession only grew with time. Kusama’s signature dotted pumpkins have since appeared as works on paper, handheld figurines, towering sculptures, and in the artist’s immersive infinity room installations. To Kusama, the pumpkins are warm and humorous motifs with figures that, at times, feel human. “I was enchanted by their charming and winsome form,” Kusama once said. “What appealed to me most was the pumpkin's generous unpretentiousness.”",
    slug: "pumpkins",
    artists: [
      {
        name: "Yayoi Kusama",
        id: "abc123",
      },
    ],
  },
}

const ArtistSeriesMetaFixtureNoArtist: ArtistSeriesMeta_TestQuery$rawResponse = {
  artistSeries: {
    title: "Squashes",
    description:
      "Squashes are a lot like pumpkins except that they don't belong to any particular holiday. The most independent gourd, they always remain in style throughout the year.",
    slug: "squashes",
    artists: [],
  },
}
