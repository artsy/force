import { Breakpoint } from "@artsy/palette"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import React from "react"
import FairApp from "../FairApp"
import { graphql } from "react-relay"
import { FairApp_QueryRawResponse } from "v2/__generated__/FairApp_Query.graphql"

jest.unmock("react-relay")

describe("FairApp", () => {
  const getWrapper = async (
    breakpoint: Breakpoint = "lg",
    response: FairApp_QueryRawResponse = FairAppFixture
  ) => {
    return renderRelayTree({
      Component: ({ fair }) => {
        return (
          <MockBoot breakpoint={breakpoint}>
            <FairApp fair={fair} />
          </MockBoot>
        )
      },
      query: graphql`
        query FairApp_Query($slug: String!) @raw_response_type {
          fair(id: $slug) {
            ...FairApp_fair
          }
        }
      `,
      variables: {
        slug: "miart-2020",
      },
      mockData: response,
    })
  }

  it("displays basic information about the fair", async () => {
    const wrapper = await getWrapper()
    expect(wrapper.find("AppContainer").length).toBe(1)
  })
})

const FairAppFixture: FairApp_QueryRawResponse = {
  fair: {
    id: "fair12345",
  },
}
