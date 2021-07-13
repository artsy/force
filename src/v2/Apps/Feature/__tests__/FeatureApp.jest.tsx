import React from "react"
import { MockBoot } from "v2/DevTools"
import { FeatureAppFragmentContainer } from "../FeatureApp"
import { graphql } from "react-relay"
import { FeatureApp_Test_Query } from "v2/__generated__/FeatureApp_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<FeatureApp_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        <FeatureAppFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query FeatureApp_Test_Query {
      feature(id: "example") {
        ...FeatureApp_feature
      }
    }
  `,
})

describe("FeatureApp", () => {
  it("renders the correct components", () => {
    const wrapper = getWrapper({
      OrderedSet: () => ({ itemType: "Artwork" }),
    })

    expect(wrapper.find("FeatureHeader").length).toBe(1)
    expect(wrapper.find("ArtworkGridItem").length).toBe(1)
  })
})
