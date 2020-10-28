import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import FairSubApp from "../FairSubApp"
import { graphql } from "react-relay"
import { Title } from "react-head"
import { FairSubApp_QueryRawResponse } from "v2/__generated__/FairSubApp_Query.graphql"

jest.unmock("react-relay")

const FAIR_APP_FIXTURE: FairSubApp_QueryRawResponse = {
  fair: {
    id: "fair12345",
    name: "Miart 2020",
    slug: "miart-2020",
    metaDescription: null,
    metaImage: null,
    profile: {
      __typename: "Profile",
      id: "profile",
    },
  },
}

describe("FairSubApp", () => {
  const getWrapper = async (
    response: FairSubApp_QueryRawResponse = FAIR_APP_FIXTURE
  ) => {
    return renderRelayTree({
      Component: ({ fair }) => {
        return (
          <MockBoot>
            <FairSubApp fair={fair} />
          </MockBoot>
        )
      },
      query: graphql`
        query FairSubApp_Query($slug: String!) @raw_response_type {
          fair(id: $slug) {
            ...FairSubApp_fair
          }
        }
      `,
      variables: {
        slug: "miart-2020",
      },
      mockData: response,
    })
  }

  it("displays a back button", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.html()).toContain("Back to Miart 2020")
  })

  it("sets a title tag", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find(Title).prop("children")).toEqual("Miart 2020 | Artsy")
  })
})
