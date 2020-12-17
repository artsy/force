import { Sans } from "@artsy/palette"
import { SelectedCareerAchievementsTestQueryRawResponse } from "v2/__generated__/SelectedCareerAchievementsTestQuery.graphql"
import { renderRelayTree } from "v2/DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { Breakpoint } from "v2/Utils/Responsive"
import { SelectedCareerAchievementsFragmentContainer as SelectedCareerAchievements } from "../SelectedCareerAchievements"

jest.unmock("react-relay")

describe("SelectedCareerAchievements", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (
    artistData: SelectedCareerAchievementsTestQueryRawResponse["artist"],
    breakpoint: Breakpoint = "xl"
  ) => {
    return await renderRelayTree({
      Component: SelectedCareerAchievements,
      mockData: {
        artist: artistData,
      } as SelectedCareerAchievementsTestQueryRawResponse,
      query: graphql`
        query SelectedCareerAchievementsTestQuery @raw_response_type {
          artist(id: "pablo-picasso") {
            ...SelectedCareerAchievements_artist
          }
        }
      `,
    })
  }

  const careerHighlightsText = (currentWrapper: ReactWrapper) => {
    return currentWrapper.find(Sans).map(t => t.text())
  }

  it("renders selected career achievements", async () => {
    wrapper = await getWrapper(artistResponse)

    const text = careerHighlightsText(wrapper)

    expect(text).toContain("Blue chip representation")
    expect(text).toContain("High auction record")
    expect(text).toContain("Collected by a major institution")
    expect(text).toContain("Solo show at a major institution")
    expect(text).toContain("Group show at a major institution")
    expect(text).toContain("Reviewed by a major art publication")
    expect(text).toContain("Included in a major biennial")
  })

  it("renders selected career achievements if no auction results or partner highlights", async () => {
    wrapper = await getWrapper({
      ...artistResponse,
      auctionResultsConnection: null,
      highlights: {
        ...artistResponse.highlights,
        partnersConnection: null,
      },
    })

    const text = careerHighlightsText(wrapper)

    expect(text).toContain("Collected by a major institution")
    expect(text).toContain("Solo show at a major institution")
    expect(text).toContain("Group show at a major institution")
    expect(text).toContain("Reviewed by a major art publication")
    expect(text).toContain("Included in a major biennial")
  })

  // TODO
  it("doesn't render selected career achievements if no auction results, partner highlights, or insights", async () => {
    wrapper = await getWrapper({
      ...artistResponse,
      auctionResultsConnection: null,
      highlights: {
        ...artistResponse.highlights,
        partnersConnection: null,
      },
      insights: [],
    })
    const text = careerHighlightsText(wrapper)

    expect(text.length).toEqual(0)
  })

  // TODO
  it("doesn't render selected career achievements if no auction results or partner highlights and insights is null", async () => {
    wrapper = await getWrapper({
      ...artistResponse,
      auctionResultsConnection: null,
      highlights: {
        ...artistResponse.highlights,
        partnersConnection: null,
      },
      insights: null,
    })
    const text = careerHighlightsText(wrapper)

    expect(text.length).toEqual(0)
  })
})

const artistResponse: SelectedCareerAchievementsTestQueryRawResponse["artist"] = {
  auctionResultsConnection: {
    edges: [
      {
        node: {
          id: "QXVjdGlvblJlc3VsdDoxMDkzOQ==",
          organization: "Christie's",
          price_realized: {
            display: "$63m",
          },
          sale_date: "2017",
        },
      },
    ],
  },
  highlights: {
    partnersConnection: {
      edges: [
        {
          id: "UGFydG5lckFydGlzdEVkZ2U6NTIwM2Y1NWU4N2E1M2ViOWZkMDAwMDcw",
          node: {
            categories: [
              {
                id: "opaque-gene-contemporary",
                slug: "contemporary",
              },
              {
                id: "opaque-gene-established",
                slug: "established",
              },
              {
                id: "opaque-gene-modern",
                slug: "modern",
              },
              {
                id: "opaque-gene-painting",
                slug: "painting",
              },
              {
                id: "opaque-gene-blue-chip",
                slug: "blue-chip",
              },
            ],
            id: "UGFydG5lcjpnYWdvc2lhbg==",
          },
        },
        {
          id: "UGFydG5lckFydGlzdEVkZ2U6NTU0YWI2MDg3NzZmNzI1MzQyMDYwMDAw",
          node: {
            categories: [
              {
                id: "opaque-gene-blue-chip",
                slug: "blue-chip",
              },
            ],
            id: "UGFydG5lcjpnYWxlcmllLXRoYWRkYWV1cy1yb3BhYw==",
          },
        },
        {
          id: "UGFydG5lckFydGlzdEVkZ2U6NTFlNWE4Zjk4YjNiODFlNDQ4MDAwMDc1",
          node: {
            categories: [
              {
                id: "opaque-gene-blue-chip",
                slug: "blue-chip",
              },
            ],
            id: "UGFydG5lcjpza2Fyc3RlZHQtZ2FsbGVyeQ==",
          },
        },
        {
          id: "UGFydG5lckFydGlzdEVkZ2U6NTFlNThlZGQyNzViMjRjMzI3MDAwMWNj",
          node: {
            categories: [
              {
                id: "opaque-gene-contemporary",
                slug: "contemporary",
              },
              {
                id: "opaque-gene-established",
                slug: "established",
              },
              {
                id: "opaque-gene-top-established",
                slug: "top-established",
              },
            ],
            id: "UGFydG5lcjphbnRvbi1rZXJuLWdhbGxlcnk=",
          },
        },
      ],
    },
  },
  id: "opaque-artist-id",
  insights: [
    {
      entities: [
        "Tate",
        "Museum of Modern Art (MoMA)",
        "National Gallery of Art, Washington, D.C.",
        "Indianapolis Museum of Art at Newfields",
        "San Francisco Museum of Modern Art (SFMOMA)",
      ],
      label: "Collected by a major institution",
      type: "COLLECTED",
    },
    {
      entities: ["Tate"],
      label: "Solo show at a major institution",
      type: "SOLO_SHOW",
    },
    {
      entities: ["MoMA PS1"],
      label: "Group show at a major institution",
      type: "GROUP_SHOW",
    },
    {
      entities: ["Art Forum"],
      label: "Reviewed by a major art publication",
      type: "REVIEWED",
    },
    {
      entities: ["frieze"],
      label: "Included in a major biennial",
      type: "BIENNIAL",
    },
  ],
}
