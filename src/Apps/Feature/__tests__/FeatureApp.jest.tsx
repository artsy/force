import { FeatureAppFragmentContainer } from "Apps/Feature/FeatureApp"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { FeatureApp_Test_Query } from "__generated__/FeatureApp_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<FeatureApp_Test_Query>({
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
    renderWithRelay({
      OrderedSet: () => ({ itemType: "Artwork" }),
    })

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(screen.getAllByRole("link")).toHaveLength(2)
  })
})
