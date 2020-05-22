import { SelectedCareerAchievementsTestQueryRawResponse } from "v2/__generated__/SelectedCareerAchievementsTestQuery.graphql"
import React from "react"
import { storiesOf } from "storybook/storiesOf"
import { Section } from "v2/Utils/Section"
import { SelectedCareerAchievements } from "../SelectedCareerAchievements"

storiesOf("Styleguide/Components", module).add(
  "SelectedCareerAchievements",
  () => {
    return (
      <>
        <Section title="Selected Career Achievements">
          <SelectedCareerAchievements artist={artistResponse as any} />
        </Section>
      </>
    )
  }
)

const artistResponse: SelectedCareerAchievementsTestQueryRawResponse["artist"] = {
  id: "opaque-artist-id",
  insights: [
    {
      type: "COLLECTED",
      label: "Collected by a major institution",
      entities: [
        "Tate",
        "Museum of Modern Art (MoMA)",
        "National Gallery of Art, Washington, D.C.",
        "Indianapolis Museum of Art at Newfields",
        "San Francisco Museum of Modern Art (SFMOMA)",
      ],
    },
    {
      type: "SOLO_SHOW",
      label: "Solo show at a major institution",
      entities: ["Tate"],
    },
    {
      type: "GROUP_SHOW",
      label: "Group show at a major institution",
      entities: ["MoMA PS1"],
    },
    {
      type: "REVIEWED",
      label: "Reviewed by a major art publication",
      entities: ["Art Forum"],
    },
    {
      type: "BIENNIAL",
      label: "Included in a major biennial",
      entities: ["frieze"],
    },
  ],
  highlights: {
    partnersConnection: {
      edges: [
        {
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
          id: "UGFydG5lckFydGlzdEVkZ2U6NTIwM2Y1NWU4N2E1M2ViOWZkMDAwMDcw",
        },
        {
          node: {
            categories: [
              {
                id: "opaque-gene-blue-chip",
                slug: "blue-chip",
              },
            ],
            id: "UGFydG5lcjpnYWxlcmllLXRoYWRkYWV1cy1yb3BhYw==",
          },
          id: "UGFydG5lckFydGlzdEVkZ2U6NTU0YWI2MDg3NzZmNzI1MzQyMDYwMDAw",
        },
        {
          node: {
            categories: [
              {
                id: "opaque-gene-blue-chip",
                slug: "blue-chip",
              },
            ],
            id: "UGFydG5lcjpza2Fyc3RlZHQtZ2FsbGVyeQ==",
          },
          id: "UGFydG5lckFydGlzdEVkZ2U6NTFlNWE4Zjk4YjNiODFlNDQ4MDAwMDc1",
        },
        {
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
          id: "UGFydG5lckFydGlzdEVkZ2U6NTFlNThlZGQyNzViMjRjMzI3MDAwMWNj",
        },
      ],
    },
  },
  auctionResultsConnection: {
    edges: [
      {
        node: {
          price_realized: {
            display: "$63m",
          },
          organization: "Christie's",
          sale_date: "2017",
          id: "QXVjdGlvblJlc3VsdDoxMDkzOQ==",
        },
      },
    ],
  },
}
