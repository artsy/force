import React from "react"
import { MockBoot, renderRelayTree } from "v2/DevTools"
import FeatureApp from "../FeatureApp"
import { graphql } from "react-relay"
import { FeatureApp_Test_QueryRawResponse } from "v2/__generated__/FeatureApp_Test_Query.graphql"
import { Breakpoint } from "@artsy/palette"
import { FEATURE_APP_FIXTURE } from "./fixtures"

jest.unmock("react-relay")
jest.mock("v2/Artsy/Router/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: {
        slug: "subscription-demo-gg-guy-yanai",
      },
    },
  }),
  useIsRouteActive: () => false,
}))

describe("FeatureApp", () => {
  const slug = "subscription-demo-gg-guy-yanai"

  const getWrapper = async (
    breakpoint: Breakpoint = "lg",
    response: FeatureApp_Test_QueryRawResponse = FEATURE_APP_FIXTURE
  ) => {
    return await renderRelayTree({
      Component: ({ feature }) => {
        return (
          <MockBoot breakpoint={breakpoint}>
            <FeatureApp feature={feature} />
          </MockBoot>
        )
      },
      query: graphql`
        query FeatureApp_Test_Query($slug: ID!) @raw_response_type {
          feature(id: $slug) {
            ...FeatureApp_feature
          }
        }
      `,
      variables: { slug },
      mockData: response,
    })
  }

  it("renders the correct components", async () => {
    const wrapper = await getWrapper()

    expect(wrapper.find("AppContainer").length).toBe(1)
    expect(wrapper.find("FeatureHeader").length).toBe(1)
    expect(wrapper.find("FeatureFeaturedLink").length).toBe(1)
    expect(wrapper.find("ArtworkGridItemContainer").length).toBe(1)
  })
})
