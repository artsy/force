import { MockBoot } from "DevTools/MockBoot"
import { FeatureAppFragmentContainer } from "Apps/Feature/FeatureApp"
import { graphql } from "react-relay"
import { FeatureApp_Test_Query } from "__generated__/FeatureApp_Test_Query.graphql"
import { setupTestWrapper } from "DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<FeatureApp_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <FeatureAppFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query FeatureApp_Test_Query @relay_test_operation {
      feature(id: "example") {
        ...FeatureApp_feature
      }
    }
  `,
})

describe("FeatureApp", () => {
  it("renders the correct components", () => {
    const { wrapper } = getWrapper({
      OrderedSet: () => ({ itemType: "Artwork" }),
    })

    expect(wrapper.find("FeatureHeader").length).toBe(1)
    expect(wrapper.find("ArtworkGridItem").length).toBe(1)
  })
})
