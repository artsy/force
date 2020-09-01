import { renderRelayTree } from "v2/DevTools"
import React from "react"
import { FairExhibitorsFragmentContainer } from "../FairExhibitors"
import { graphql } from "react-relay"
import { FairExhibitors_QueryRawResponse } from "v2/__generated__/FairExhibitors_Query.graphql"
import { FairExhibitorRail } from "../../Components/FairExhibitorRail"

jest.unmock("react-relay")

describe("FairExhibitors", () => {
  const getWrapper = async (
    response: FairExhibitors_QueryRawResponse = FAIR_EXHIBITORS_FIXTURE
  ) => {
    return renderRelayTree({
      Component: ({ fair }) => {
        return <FairExhibitorsFragmentContainer fair={fair} />
      },
      query: graphql`
        query FairExhibitors_Query($slug: String!) @raw_response_type {
          fair(id: $slug) {
            ...FairExhibitors_fair
          }
        }
      `,
      variables: { slug: "miart-2020" },
      mockData: response,
    })
  }

  it("renders the rails from exhibitors that have artworks", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find(FairExhibitorRail).length).toBe(2)
    const text = wrapper.text()
    expect(text).toContain("First Partner Has Artworks")
    expect(text).toContain("Second Partner Has Artworks")
  })

  it("skips over any partners with no artworks", async () => {
    const wrapper = await getWrapper()
    const text = wrapper.text()
    expect(text).not.toContain("Partner Without Artworks")
  })
})

const FAIR_EXHIBITORS_FIXTURE: FairExhibitors_QueryRawResponse = {
  fair: {
    id: "xxx",
    exhibitors: {
      edges: [
        {
          show: {
            id: "xxx-1",
            internalID: "xxx-1",
            counts: { artworks: 0 },
            href: "/show/example-1",
            partner: {
              __typename: "Partner",
              id: "example-1",
              name: "Partner Without Artworks",
            },
          },
        },
        {
          show: {
            id: "xxx-2",
            internalID: "xxx-2",
            counts: { artworks: 10 },
            href: "/show/example-2",
            partner: {
              __typename: "Partner",
              id: "example-2",
              name: "First Partner Has Artworks",
            },
          },
        },
        {
          show: {
            id: "xxx-3",
            internalID: "xxx-3",
            counts: { artworks: 10 },
            href: "/show/example-3",
            partner: {
              __typename: "Partner",
              id: "example-3",
              name: "Second Partner Has Artworks",
            },
          },
        },
      ],
    },
  },
}
