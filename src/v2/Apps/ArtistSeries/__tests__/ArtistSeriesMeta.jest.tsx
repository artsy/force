import React from "react"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import { ArtistSeriesMetaFragmentContainer } from "../Components/ArtistSeriesMeta"
import { graphql } from "react-relay"
import { ArtistSeriesMeta_TestQueryRawResponse } from "v2/__generated__/ArtistSeriesMeta_TestQuery.graphql"

jest.unmock("react-relay")

describe("ArtistSeriesMeta", () => {
  const getWrapper = async (
    response: ArtistSeriesMeta_TestQueryRawResponse = ArtistSeriesMetaFixture
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
        query ArtistSeriesMeta_TestQuery($slug: ID!) @raw_response_type {
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
})

const ArtistSeriesMetaFixture = {
  artistSeries: {
    title: "Pumpkins",
    description:
      "Yayoi Kusama's instantly recognizable pumpkins have become fixtures of contemporary art and popular culture—and have helped make her one of the world’s most expensive living female artists. Kusama began drawing pumpkins as a child in pre-war Japan, where her family owned a plant nursery that farmed kabocha squash. Her obsession only grew with time. Kusama’s signature dotted pumpkins have since appeared as works on paper, handheld figurines, towering sculptures, and in the artist’s immersive infinity room installations. To Kusama, the pumpkins are warm and humorous motifs with figures that, at times, feel human. “I was enchanted by their charming and winsome form,” Kusama once said. “What appealed to me most was the pumpkin's generous unpretentiousness.”",
    artists: [
      {
        name: "Yayoi Kusama",
        id: "abc123",
      },
    ],
  },
}
