import { TagAppFragmentContainer } from "Apps/Tag/TagApp"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { TagApp_Test_Query } from "__generated__/TagApp_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("../Components/TagArtworkFilter", () => ({
  TagArtworkFilterQueryRenderer: () => <div />,
}))

const { renderWithRelay } = setupTestWrapperTL<TagApp_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <TagAppFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query TagApp_Test_Query @relay_test_operation {
      tag(id: "example") {
        ...TagApp_tag
      }
    }
  `,
})

describe("TagApp", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Tag: () => ({
        name: "Example Tag",
      }),
    })

    expect(screen.getByText("Example Tag")).toBeInTheDocument()
  })
})
